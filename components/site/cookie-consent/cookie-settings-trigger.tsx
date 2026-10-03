// components/site/cookie-consent/cookie-settings-trigger.tsx
"use client";



import {useCookieConsent} from "@/components/site/cookie-consent/cookie-consent-provider";

interface CookieSettingsTriggerProps {
    children?: React.ReactNode;
    className?: string;
}

/**
 * Drop this anywhere (footer, settings page, etc.)
 * to reopen the cookie preferences UI.
 */
export function CookieSettingsTrigger({ children = "Cookie preferences", className }: CookieSettingsTriggerProps) {
    const { openSettings } = useCookieConsent();

    return (
        <span
            role="button"
            tabIndex={0}
            onClick={openSettings}
            onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    openSettings();
                }
            }}
            className={
                className ??
                "cursor-pointer underline underline-offset-4 transition-colors hover:text-neutral-900 dark:hover:text-white"
            }
        >
      {children}
    </span>
    );
}