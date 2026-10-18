import type { CookieConsentConfig } from "vanilla-cookieconsent";

/**
 * We disable the library's built-in UI (autoShow: false)
 * and use our own React components instead.
 * The library is used purely as the consent-state / cookie layer.
 */
export const cookieConsentConfig: CookieConsentConfig = {
    // Do not show the default modals
    autoShow: false,

    // Clear cookies belonging to rejected categories
    autoClearCookies: true,

    // Manage <script type="text/plain" data-category="..."> tags
    // (useful later when you add analytics scripts)
    manageScriptTags: true,

    // Hide from bots / crawlers
    hideFromBots: true,

    categories: {
        necessary: {
            enabled: true,
            readOnly: true,
        },
        preferences: {
            enabled: false,
            readOnly: false,
        },
        analytics: {
            enabled: false,
            readOnly: false,
            // Example autoClear – add real cookie names when you integrate analytics
            // autoClear: {
            //   cookies: [{ name: /^_ga/ }, { name: "_gid" }],
            // },
        },
        marketing: {
            enabled: false,
            readOnly: false,
        },
    },

    // Language is required by the library even when UI is custom
    language: {
        default: "en",
        translations: {
            en: {
                consentModal: {
                    title: "Cookies on SYNTAC",
                    description:
                        "We use cookies to improve your experience, understand how our website is used, and support essential functionality.",
                    acceptAllBtn: "Accept All",
                    acceptNecessaryBtn: "Reject Optional",
                    showPreferencesBtn: "Cookie Settings",
                },
                preferencesModal: {
                    title: "Cookie Settings",
                    acceptAllBtn: "Accept All",
                    acceptNecessaryBtn: "Reject Optional",
                    savePreferencesBtn: "Save preferences",
                    sections: [
                        {
                            title: "Necessary",
                            description:
                                "These cookies are required for the website to function and cannot be disabled.",
                            linkedCategory: "necessary",
                        },
                        {
                            title: "Preferences",
                            description:
                                "These cookies remember choices and preferences such as theme or language.",
                            linkedCategory: "preferences",
                        },
                        {
                            title: "Analytics",
                            description:
                                "These cookies help us understand how visitors use our website.",
                            linkedCategory: "analytics",
                        },
                        {
                            title: "Marketing",
                            description:
                                "These cookies may be used for advertising and conversion tracking.",
                            linkedCategory: "marketing",
                        },
                    ],
                },
            },
        },
    },
};