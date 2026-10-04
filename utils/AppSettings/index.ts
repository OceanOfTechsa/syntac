
/**
 * Central configuration class for the Ocean of Tech application.
 * Contains static constants, environment variables, company information,
 * social links, reviews, navigation, and contact details.
 *
 * @remarks
 * All properties are static and should be accessed directly via `Index.<property>`.
 * Sensitive values such as ports and URLs are sourced from environment variables.
 *
 * @example
 * ```ts
 * const companyName = Index.COMPANY_NAME;
 * const email = Index.CompanyContacts.Email;
 * ```
 */
export default class AppSettings {
    public static readonly ENVIRONMENT_PORT: string =
        process.env.ENVIRONMENT_PORT as string;
    public static readonly NEXT_PUBLIC_BASE_URL: string =
        process.env.NEXT_PUBLIC_BASE_URL as string;
    public static readonly COMPANY_NAME: string = "Syntac";
    public static readonly FULL_COMPANY_NAME: string = `${AppSettings.COMPANY_NAME} Software`;
    public static readonly SITE_DESCRIPTION: string = `${AppSettings.COMPANY_NAME} is a leading software company in South Africa, offering website design, development, hosting, UI/UX design, SEO, and business email solutions. We create innovative, custom software and web solutions to help businesses in Durban and across South Africa succeed online.`;
    public static readonly HIRING: boolean = true;
    public static readonly SHOW_BANNER: boolean = true;
    public static CASE_STUDY_ITEMS_PER_PAGE: number = 6;
    public static readonly COMPANY_DOMAIN: string = "oceanoftechsa.com";
    public static NODE_ENVS = {
        PRODUCTION: "production",
        PREVIEW: "review",
        DEVELOPMENT: "development",
    };

    public static LOAD_LOGO(
        folder: string,
        type: string,
        name: string,
        extension: string
    ): string {
        return `/brand/syntac-brand-kit/logos/${folder}/${type}/${name}.${extension}`;
    }

    public static LOAD_ASSET_IMAGE(
        folder: string,
        type: string,
        name: string,
        extension: string
    ): string {
        return `/brand/syntac-brand-kit/logos/${folder}/${type}/${name}.${extension}`;
    }

    public static CompanyContacts = {
        Email: `info@syntac.co.za`,
        Phone: "+27 72 627 2521",
        Address: "44 Isaiah Ntshangase Rd, Stamford Hill, Durban, 4023",
        WorkingHours: "Time: 9am to 5pm (Weekdays)",
        Domain: "oceanoftechsa.com",
    };
}
