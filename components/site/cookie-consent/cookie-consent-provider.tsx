"use client";

import {
    createContext,
    useCallback,
    useContext,
    useEffect,
    useRef,
    useState,
} from "react";
import * as CookieConsent from "vanilla-cookieconsent";
import { cookieConsentConfig } from "@/lib/cookies/config";
import {
    acceptAll,
    rejectOptional,
    acceptCategories,
    type CookieCategory,
} from "@/lib/cookies/consent";
import CookieBanner from "@/components/site/cookie-consent/cookie-banner";
import CookieSettings from "@/components/site/cookie-consent/cookie-settings";


type CookieConsentContextValue = {
    openSettings: () => void;
    ready: boolean;
};

const CookieConsentContext = createContext<CookieConsentContextValue>({
    openSettings: () => {},
    ready: false,
});

export function useCookieConsent() {
    return useContext(CookieConsentContext);
}

export function CookieConsentProvider({
                                          children,
                                      }: {
    children: React.ReactNode;
}) {
    const [ready, setReady] = useState(false);
    const [bannerOpen, setBannerOpen] = useState(false);
    const [settingsOpen, setSettingsOpen] = useState(false);

    // Once the user makes a choice this session, never show the banner again
    const dismissedRef = useRef(false);

    const closeBanner = useCallback(() => {
        dismissedRef.current = true;
        setBannerOpen(false);
        setSettingsOpen(false);

        // Also hide any library UI if it was shown
        try {
            CookieConsent.hide();
            CookieConsent.hidePreferences();
        } catch {
            // ignore if not ready
        }
    }, []);

    useEffect(() => {
        let cancelled = false;

        const init = async () => {
            await CookieConsent.run({
                ...cookieConsentConfig,
                onFirstConsent: () => {
                    if (!cancelled) closeBanner();
                },
                onConsent: () => {
                    if (!cancelled) closeBanner();
                },
                onChange: () => {
                    if (!cancelled) closeBanner();
                },
            });

            if (cancelled) return;

            setReady(true);

            // Only open if consent is missing AND user hasn't just dismissed
            if (!dismissedRef.current && !CookieConsent.validConsent()) {
                setBannerOpen(true);
            } else {
                setBannerOpen(false);
            }
        };

        init();

        return () => {
            cancelled = true;
        };
    }, [closeBanner]);

    const openSettings = useCallback(() => {
        setSettingsOpen(true);
        setBannerOpen(false);
    }, []);

    const handleAcceptAll = useCallback(() => {
        // Close UI immediately (don't wait for library callback)
        closeBanner();
        acceptAll();
    }, [closeBanner]);

    const handleRejectOptional = useCallback(() => {
        closeBanner();
        rejectOptional();
    }, [closeBanner]);

    const handleSave = useCallback(
        (categories: CookieCategory[]) => {
            closeBanner();
            acceptCategories(categories);
        },
        [closeBanner]
    );

    return (
        <CookieConsentContext.Provider value={{ openSettings, ready }}>
            {children}

            <CookieBanner
                open={bannerOpen && !dismissedRef.current}
                onAcceptAll={handleAcceptAll}
                onRejectOptional={handleRejectOptional}
                onOpenSettings={openSettings}
            />

            <CookieSettings
                open={settingsOpen}
                onClose={() => setSettingsOpen(false)}
                onSave={handleSave}
                onAcceptAll={handleAcceptAll}
                onRejectOptional={handleRejectOptional}
            />
        </CookieConsentContext.Provider>
    );
}