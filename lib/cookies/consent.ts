import * as CookieConsent from "vanilla-cookieconsent";

export type CookieCategory = "necessary" | "preferences" | "analytics" | "marketing";

export const COOKIE_CATEGORIES: CookieCategory[] = [
    "necessary",
    "preferences",
    "analytics",
    "marketing",
];

/** Returns true if the user has already made a consent choice */
export function hasValidConsent(): boolean {
    if (typeof window === "undefined") return false;
    return CookieConsent.validConsent();
}

/** Check if a specific category is currently accepted */
export function hasConsent(category: CookieCategory): boolean {
    if (typeof window === "undefined") return category === "necessary";
    return CookieConsent.acceptedCategory(category);
}

/** Accept all categories */
export function acceptAll(): void {
    CookieConsent.acceptCategory("all");
}

/** Accept only necessary (reject optional) */
export function rejectOptional(): void {
    CookieConsent.acceptCategory([]);
}

/** Accept a custom list of categories (necessary is always included by the library) */
export function acceptCategories(categories: CookieCategory[]): void {
    CookieConsent.acceptCategory(categories);
}

/** Get currently accepted categories */
export function getAcceptedCategories(): CookieCategory[] {
    if (typeof window === "undefined") return ["necessary"];
    const prefs = CookieConsent.getUserPreferences();
    return (prefs.acceptedCategories as CookieCategory[]) ?? ["necessary"];
}