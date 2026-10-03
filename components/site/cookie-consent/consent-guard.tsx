// components/site/cookie-consent/consent-guard.tsx
"use client";

import { useEffect, useRef } from "react";
import { hasConsent } from "@/lib/cookies/consent";

type ConsentGuardProps = {
    /** Google Analytics measurement ID, e.g. G-XXXXXXXX */
    gaId?: string;
    /** Google Tag Manager container ID, e.g. GTM-XXXXXXX */
    gtmId?: string;
    /** Sentry DSN */
    sentryDsn?: string;
    /** Optional Sentry environment */
    sentryEnvironment?: string;
};

/**
 * Loads third-party scripts only after the matching cookie category is accepted.
 * - analytics  → GA / GTM
 * - preferences → (extend as needed)
 * - marketing  → ads / pixels (extend as needed)
 *
 * If the user rejects optional cookies, nothing is loaded or collected.
 */
export function ConsentGuard({
                                 gaId,
                                 gtmId,
                                 sentryDsn,
                                 sentryEnvironment = process.env.NODE_ENV,
                             }: ConsentGuardProps) {
    const loaded = useRef({
        ga: false,
        gtm: false,
        sentry: false,
    });


    const loadGoogleAnalytics = (id: string) => {
        if (loaded.current.ga || typeof window === "undefined") return;
        loaded.current.ga = true;

        // gtag bootstrap
        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtag/js?id=${id}`;
        document.head.appendChild(script);

        window.dataLayer = window.dataLayer || [];
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        function gtag(...args: any[]) {
            window.dataLayer.push(args);
        }

        window.gtag = gtag;

        gtag("js", new Date());
        gtag("config", id, {
            anonymize_ip: true,
            send_page_view: true,
        });
    };

    const loadGTM = (id: string) => {
        if (loaded.current.gtm || typeof window === "undefined") return;
        loaded.current.gtm = true;

        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
            "gtm.start": new Date().getTime(),
            event: "gtm.js",
        });

        const script = document.createElement("script");
        script.async = true;
        script.src = `https://www.googletagmanager.com/gtm.js?id=${id}`;
        document.head.appendChild(script);
    };

    // const loadSentry = async (dsn: string) => {
    //     if (loaded.current.sentry || typeof window === "undefined") return;
    //     loaded.current.sentry = true;
    //
    //     // Dynamic import so Sentry is never in the bundle until consent is given
    //     const Sentry = await import("@sentry/nextjs");
    //
    //     Sentry.init({
    //         dsn,
    //         environment: sentryEnvironment,
    //         tracesSampleRate: 0.1,
    //         // Avoid sending PII by default
    //         sendDefaultPii: false,
    //     });
    // };

    const applyConsent = () => {
        const analyticsAllowed = hasConsent("analytics");
        const marketingAllowed = hasConsent("marketing");

        // ── Analytics category ──────────────────────────────────────────
        if (analyticsAllowed) {
            if (gaId) loadGoogleAnalytics(gaId);
            if (gtmId) loadGTM(gtmId);
            // Sentry is often treated as performance/error monitoring → analytics
            // if (sentryDsn) void loadSentry(sentryDsn);
        }

        // ── Marketing category (example placeholder) ────────────────────
        if (marketingAllowed) {
            // e.g. load Meta Pixel, LinkedIn Insight, etc.
            // loadMetaPixel(process.env.NEXT_PUBLIC_META_PIXEL_ID)
        }

        // If analytics is revoked later, we do not unload scripts mid-session
        // (browser limitation). New page loads will simply not inject them.
    };

    useEffect(() => {
        // Run once on mount (returning visitors with existing consent)
        applyConsent();

        // Re-run when consent is first given or changed
        const onConsent = () => applyConsent();
        const onChange = () => applyConsent();

        window.addEventListener("cc:onConsent", onConsent);
        window.addEventListener("cc:onChange", onChange);

        return () => {
            window.removeEventListener("cc:onConsent", onConsent);
            window.removeEventListener("cc:onChange", onChange);
        };
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [gaId, gtmId, sentryDsn, sentryEnvironment]);

    return null;
}

// Minimal typing for dataLayer / gtag
declare global {
    interface Window {
        dataLayer: unknown[];
        gtag?: (...args: unknown[]) => void;
    }
}