export interface Company {
    name: string;
    /** Public path to the logo. Omitted when no logo file is registered, so the tile falls back to the name. */
    logo?: string;
}

export interface SpotlightEntry {
    /** Must match a technology id in technologyCatalog, e.g. "react" */
    id: string;
    /** Well-known companies that use this technology (keep to 4 so the grid stays even) */
    companies: Company[];
}

/* -------------------------------------------------------------------------- */
/* Company logos                                                              */
/* -------------------------------------------------------------------------- */

const LOGO_DIR = "/assets/site/technologies/companies";

/**
 * Add a slug here once its file exists at /public/brand/companies/<slug>.svg.
 * Slugs are the company name in lowercase with dashes: "Stack Overflow" -> "stack-overflow".
 * Anything not listed renders as a text tile, so you can add logos one at a time.
 *
 * Use single-colour or transparent-background SVGs: the component renders them
 * black in light mode and white in dark mode.
 */
const AVAILABLE_LOGOS = new Set<string>([
    "meta",
    "netflix",
    "airbnb",
    "dropbox",
    "microsoft",
    "stack-overflow",
    "ups",
    "tiktok",
    "hulu",
    "nike",
    "twitch",
    "apple",
    "instagram",
    "spotify",
    "reddit",
    "slack",
    "google",
    "paypal",
    "linkedin",
    "walmart",
    "github",
    "snapchat",
    "twitter",
    "unilever",
    "porsche",
    "netlify",
    "IKEA",
    "bing"
]);

const slugify = (name: string) => name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

const company = (name: string): Company => {
    const slug = slugify(name);
    return AVAILABLE_LOGOS.has(slug) ? { name, logo: `${LOGO_DIR}/${slug}.svg` } : { name };
};

/* -------------------------------------------------------------------------- */
/* Spotlight                                                                  */
/* -------------------------------------------------------------------------- */

/**
 * Order matters: the component starts at the first entry and cycles through the list.
 * The mix is front end, back end, then databases, so the rotation shows range.
 *
 * Check each company against a public source (the technology's own showcase or
 * customer page, or the company's engineering blog) before publishing.
 */
export const technologySpotlight: SpotlightEntry[] = [
    { id: "react", companies: ["Meta", "Netflix", "Airbnb", "Dropbox"].map(company) },
    { id: "netcore", companies: ["Microsoft", "Stack Overflow", "UPS", "Bing"].map(company) },
    { id: "nextjs", companies: ["TikTok", "Hulu", "Nike", "Twitch"].map(company) },
    { id: "postgresql", companies: ["Apple", "Instagram", "Spotify", "Reddit"].map(company) },
    { id: "ts", companies: ["Microsoft", "Slack", "Airbnb", "Google"].map(company) },
    { id: "nodejs", companies: ["Netflix", "PayPal", "LinkedIn", "Walmart"].map(company) },
    { id: "redis", companies: ["GitHub", "Snapchat", "Twitter", "Stack Overflow"].map(company) },
    { id: "astro", companies: ["Unilever", "Porsche", "Netlify", "IKEA"].map(company) },
];