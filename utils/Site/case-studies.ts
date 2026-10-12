import {
    AppWindow, Archive,
    BadgeCheck,
    CircleCheck,
    Clock,
    FolderCode,
    Globe,
    LifeBuoy,
    LucideIcon,
    RefreshCw,
    Rocket
} from "lucide-react";


import type {CaseFaqs} from "@/data/faqs";
import {chain, FlowNode} from "@/components/gsap/animations/shared/flow";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export type CaseType =
    | "Website"
    | "Web Application Development"
    | "Custom Software"
    | "MVP Development"
    | "Support and maintenance"
    | "Legacy System Modernisation";

export type CaseStatus = "Active" | "In progress" | "Completed" | "Deprecated";

/** Facts panel on the Challenge section. Client name and project title come from the study itself. */
export interface CaseDetails {
    headquarters?: string;
    industry?: string;
    timeline?: string;
}

export interface CaseChallenge {
    /** The larger lead sentence */
    headline: string;
    /** Supporting paragraphs */
    paragraphs: string[];
    /** The numbered "Primary Bottlenecks" list */
    bottlenecks: string[];
}

export interface CaseSolutionStep {
    title: string;
    description: string;
}

export interface CaseSolution {
    summary: string;
    steps: CaseSolutionStep[];
}

export type ImpactIcon = "user" | "sparkles" | "zap" | "trending-up" | "clock" | "shield";

/** One column of the Impact section (1 to 3 cards fit the layout) */
export interface ImpactCard {
    heading: string;
    icon?: ImpactIcon;
    metricLabel: string;
    metricValue: string;
    metricUnit?: string;
    points: string[];
    footerLabel?: string;
    footerValue?: string;
}

export interface CaseImpact {
    cards: ImpactCard[];
}

export interface CaseFeedback {
    quote: string;
    author: {
        name: string;
        role: string;
        image: string;
        linkedInUrl: string;
    };
}

/** A flow / system map. Direction "horizontal" suits systems, "vertical" suits simple sitemaps. */
export interface CaseFlow {
    root: FlowNode;
    direction?: "vertical" | "horizontal";
    preTitle?: string;
    title?: string;
    markedWord?: string;
    desc?: string;
}

export type CaseFaq = (typeof CaseFaqs)[number];

export interface CaseStudy {
    id: number;
    title: string;
    slug: string;
    clientSlug: string;
    clientName: string;
    clientAvatar?: string;
    clientInitials: string;
    summary: string;
    type: CaseType;
    status: CaseStatus;
    featured?: boolean;
    /** Public link, shown as "View Project" on the hero */
    liveUrl?: string;
    /** Number of images in ImageKit under .../gallery/01-light.png, 02-light.png ... */
    galleryCount?: number;

    /* Every block below is optional: a section only renders when its data exists */
    details?: CaseDetails;
    challenge?: CaseChallenge;
    solution?: CaseSolution;
    impact?: CaseImpact;
    flow?: CaseFlow;
    feedback?: CaseFeedback;
    /** Falls back to the shared CaseFaqs when omitted */
    faqs?: CaseFaq[];
}

/* -------------------------------------------------------------------------- */
/*  Data                                                                      */
/* -------------------------------------------------------------------------- */

export const ALL_CASE_STUDIES: CaseStudy[] = [
    {
        id: 1,
        title: "Website Development",
        slug: "ocean-of-tech-website",
        clientSlug: "ocean-of-tech",
        clientName: "Ocean of Tech",
        clientInitials: "OT",
        summary:
            "A business website presenting digital services, web development, hosting, and business email solutions.",
        type: "Website",
        status: "Active",
        featured: true,
        clientAvatar: "/assets/site/clients/logos/ocean-of-tech.png",
        liveUrl: "https://www.oceanoftech.co.za/",
        galleryCount: 5,
        details: {
            industry: "Digital Services & Technology",
            headquarters: "South Africa",
        },

        challenge: {
            headline:
                "Ocean of Tech needed a professional online presence to communicate its services and help businesses understand how technology could support their goals.",
            paragraphs: [
                "As a digital services brand offering website development, web applications, hosting, and business email, Ocean of Tech needed a central place to present its capabilities and establish a consistent online identity.",
                "The website needed to communicate its services clearly, create a professional first impression, and give prospective clients a straightforward way to explore offerings and make enquiries.",
            ],
            bottlenecks: [
                "Presenting multiple digital services through one cohesive online presence.",
                "Communicating service offerings clearly to prospective clients.",
                "Establishing a consistent brand identity across the website.",
                "Making it easier for visitors to understand the available solutions.",
                "Providing a clear path for prospective clients to get in touch.",
            ],
        },

        solution: {
            summary:
                "Developed a business website that brings Ocean of Tech's digital services together in a clear, accessible, and professional online experience.",
            steps: [
                {
                    title: "Service Structure & Content",
                    description:
                        "Organised the website around the business's core offerings, helping visitors understand its services and identify relevant solutions.",
                },
                {
                    title: "Brand Identity & Interface",
                    description:
                        "Applied a consistent visual direction and structured page layouts to present the business professionally and create a cohesive browsing experience.",
                },
                {
                    title: "Responsive Website Development",
                    description:
                        "Built the website to present its content and service information across different screen sizes and devices.",
                },
                {
                    title: "Service Discovery & Enquiries",
                    description:
                        "Structured the visitor journey to help prospective clients explore available services and find a way to contact the business.",
                },
            ],
        },

        impact: {
            cards: [
                {
                    heading: "Digital Presence",
                    icon: "sparkles",
                    metricLabel: "Online",
                    metricValue: "1",
                    metricUnit: "business presence",
                    points: [
                        "A dedicated website for the brand.",
                        "A central place to present digital services.",
                        "A professional destination for prospective clients.",
                    ],
                    footerLabel: "Primary focus",
                    footerValue: "Brand visibility",
                },
                {
                    heading: "Service Discovery",
                    icon: "user",
                    metricLabel: "Core focus",
                    metricValue: "Clear",
                    metricUnit: "service presentation",
                    points: [
                        "Services presented in one place.",
                        "Clearer communication of business offerings.",
                        "A more direct path to making enquiries.",
                    ],
                    footerLabel: "Primary focus",
                    footerValue: "Client enquiries",
                },
            ],
        },

        feedback: {
            quote:
                "The website gave Ocean of Tech a dedicated online presence to showcase its services, communicate its capabilities, and connect with businesses looking for digital solutions. It also laid the foundation for the brand's continued evolution into SYNTAC.",
            author: {
                image: "https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-1.png",
                role: "Founder",
                name: "Sithuliso Zulu",
                linkedInUrl: "",
            },
        },

        flow: {
            direction: "horizontal",
            preTitle: "Site Map",
            title: "How the Platform Fits Together",
            markedWord: "Fits Together",
            root: chain(
                [{label: "Start", variant: "start"}, {label: "Home", variant: "gate"}],
                [
                    {
                        label: "About us",
                        variant: "gate",
                        children: [
                            {label: "About", variant: "page"},
                            {label: "Our Story", variant: "page"},
                            {label: "Our Team", variant: "page"},
                        ],
                    },
                    {
                        label: "Services",
                        variant: "page",
                        children: [{label: "Service Details", variant: "detail"}],
                    },
                    {
                        label: "Cases",
                        variant: "page",
                        children: [{label: "Case Study Details", variant: "detail"}],
                    },
                    {label: "How we work", variant: "page"},
                    {
                        label: "Legal",
                        variant: "gate",
                        children: [
                            {label: "Public Offer Agreement", variant: "page"},
                            {label: "Privacy Policy", variant: "page"},
                            {label: "Use of AI", variant: "page"},
                        ],
                    },
                    {
                        label: "Resources",
                        variant: "gate",
                        children: [
                            {
                                label: "Blog",
                                variant: "page",
                                children: [{label: "Blog Details", variant: "detail"}],
                            },
                            {label: "Change Log", variant: "page"},
                            {label: "FAQ", variant: "page"},
                        ],
                    },
                    {label: "Estimate project", variant: "cta"},
                ]
            ),
        },
    },
    // {
    //     id: 2,
    //     title: "Website Design & Development",
    //     slug: "syntac-software",
    //     clientSlug: "syntac-software",
    //     clientName: "Syntac Software",
    //     clientInitials: "SS",
    //     summary: "Website redesign and development for for digital services, web development, and technology solutions company.",
    //     type: "Website",
    //     status: "In progress",
    //     clientAvatar: '/brand/syntac-brand-kit/logos/icon/svg/syntac-icon-green-circle.svg',
    //
    //     flow: {
    //         direction: "horizontal",
    //         preTitle: "System Map",
    //         title: "How the Platform Fits Together",
    //         markedWord: "Fits",
    //         root: chain(
    //             [{label: "Start", variant: "start"}, {label: "Home", variant: "gate"}],
    //             [
    //                 {
    //                     label: "About us",
    //                     variant: "gate",
    //                     children: [
    //                         {label: "About", variant: "page"},
    //                         {label: "Our Story", variant: "page"},
    //                         {label: "Our Team", variant: "page"},
    //                     ],
    //                 },
    //                 {
    //                     label: "Services",
    //                     variant: "page",
    //                     children: [{label: "Service Details", variant: "detail"}],
    //                 },
    //                 {
    //                     label: "Cases",
    //                     variant: "page",
    //                     children: [{label: "Case Study Details", variant: "detail"}],
    //                 },
    //                 {label: "How we work", variant: "page"},
    //                 {
    //                     label: "Legal",
    //                     variant: "gate",
    //                     children: [
    //                         {label: "Public Offer Agreement", variant: "page"},
    //                         {label: "Privacy Policy", variant: "page"},
    //                         {label: "Use of AI", variant: "page"},
    //                     ],
    //                 },
    //                 {
    //                     label: "Resources",
    //                     variant: "gate",
    //                     children: [
    //                         {
    //                             label: "Blog",
    //                             variant: "page",
    //                             children: [{label: "Blog Details", variant: "detail"}],
    //                         },
    //                         {label: "Change Log", variant: "page"},
    //                         {label: "FAQ", variant: "page"},
    //                     ],
    //                 },
    //                 {label: "Estimate project", variant: "cta"},
    //             ]
    //         ),
    //     },
    //
    //     challenge: {
    //         headline:
    //             "The client needed to completely digitize their massive logistics network to eliminate operational liabilities and support rapid industrial growth.",
    //         paragraphs: [
    //             "Managing an extensive fleet of over 700 specialized commercial vehicles and hundreds of cross-border drivers requires handling massive amounts of highly sensitive operational data. The client was restricted by traditional backend structures where decentralized records across country borders caused severe information delays, and manual verification loops created significant operational liabilities.",
    //             "Furthermore, unlinked asset tracking led to critical visibility gaps, while disconnected subcontractor data flows resulted in invoicing delays and inefficient empty-leg transit routes. To sustain growth and align with enterprise resource planning (ERP) systems, they required a major custom web application overhaul to digitize their entire operational backbone.",
    //         ],
    //         bottlenecks: [
    //             "Decentralized records across country borders causing massive information delays.",
    //             "Manual verification loops creating severe operational liabilities and risks.",
    //             "Unlinked asset tracking telemetries causing major operational visibility gaps.",
    //             "Disconnected subcontractor data flows resulting in severe invoicing delays.",
    //             "Traditional backend structures restricting integration with enterprise resource systems.",
    //         ],
    //     },
    //
    //     // TODO: the hard-coded section repeated this one step four times. Add this project's real steps.
    //     solution: {
    //         summary:
    //             "We executed a full-stack modernization of the ecosystem, transitioning the core infrastructure to a decoupled, high-availability architecture. We optimized the search algorithms and engineered scalable integration tools.",
    //         steps: [
    //             {
    //                 title: "Decoupled Architecture & Migration",
    //                 description:
    //                     "We transitioned the core website to an optimized WordPress CMS and migrated records into a highly secure Amazon RDS instance, giving editors complete publishing control.",
    //             },
    //         ],
    //     },
    // },
    // {
    //     id: 3,
    //     title: "Custom Field Service Management (FSM)",
    //     slug: "field-service-management",
    //     clientSlug: "syntac-software",
    //     clientName: "Syntac Software",
    //     clientInitials: "SS",
    //     summary:
    //         "Custom field service management platform for managing service jobs and operational workflows.",
    //     type: "Custom Software",
    //     status: "In progress",
    //     clientAvatar:
    //         "/brand/syntac-brand-kit/logos/icon/svg/syntac-icon-green-circle.svg",
    //     featured: true,
    //     galleryCount: 2,
    //
    //     details: {
    //         headquarters: "Kloof, Durban",
    //         industry: "Logistics & Supply Chain",
    //         timeline: "6 Months",
    //     },
    //
    //     // TODO: this copy was moved over from the hard-coded sections. Replace it with this project's real story.
    //     challenge: {
    //         headline:
    //             "The client needed to completely digitize their massive logistics network to eliminate operational liabilities and support rapid industrial growth.",
    //         paragraphs: [
    //             "Managing an extensive fleet of over 700 specialized commercial vehicles and hundreds of cross-border drivers requires handling massive amounts of highly sensitive operational data. The client was restricted by traditional backend structures where decentralized records across country borders caused severe information delays, and manual verification loops created significant operational liabilities.",
    //             "Furthermore, unlinked asset tracking led to critical visibility gaps, while disconnected subcontractor data flows resulted in invoicing delays and inefficient empty-leg transit routes. To sustain growth and align with enterprise resource planning (ERP) systems, they required a major custom web application overhaul to digitize their entire operational backbone.",
    //         ],
    //         bottlenecks: [
    //             "Decentralized records across country borders causing massive information delays.",
    //             "Manual verification loops creating severe operational liabilities and risks.",
    //             "Unlinked asset tracking telemetries causing major operational visibility gaps.",
    //             "Disconnected subcontractor data flows resulting in severe invoicing delays.",
    //             "Traditional backend structures restricting integration with enterprise resource systems.",
    //         ],
    //     },
    //
    //     // TODO: the hard-coded section repeated this one step four times. Add this project's real steps.
    //     solution: {
    //         summary:
    //             "We executed a full-stack modernization of the ecosystem, transitioning the core infrastructure to a decoupled, high-availability architecture. We optimized the search algorithms and engineered scalable integration tools.",
    //         steps: [
    //             {
    //                 title: "Decoupled Architecture & Migration",
    //                 description:
    //                     "We transitioned the core website to an optimized WordPress CMS and migrated records into a highly secure Amazon RDS instance, giving editors complete publishing control.",
    //             },
    //         ],
    //     },
    //
    //     // impact:   add real, verifiable numbers for this project (the section stays hidden until then)
    //     // feedback: add a real client quote, with their permission (the section stays hidden until then)
    // },
    // {
    //     id: 4, // was a second id: 3, which clashes with the FSM entry
    //     title: "Website Development",
    //     slug: "phanitime",
    //     clientSlug: "phanitime",
    //     clientName: "Phanitime",
    //     clientInitials: "PT",
    //     summary:
    //         "Custom field service management platform for managing service jobs and operational workflows.",
    //     type: "Web Application Development",
    //     status: "Active",
    //     liveUrl: "https://www.phanitime.co.za/"
    // },
];

/* -------------------------------------------------------------------------- */
/*  Badge styling helpers                                                     */
/* -------------------------------------------------------------------------- */

export const TYPE_ICONS: Record<CaseType, LucideIcon> = {
    "Website": Globe,
    "Web Application Development": AppWindow,
    "Custom Software": FolderCode,
    "MVP Development": Rocket,
    "Support and maintenance": LifeBuoy,
    "Legacy System Modernisation": RefreshCw,
};

export const STATUS_ICONS: Record<CaseStatus, LucideIcon> = {
    "Active": CircleCheck,
    "In progress": Clock,
    "Completed": BadgeCheck,
    "Deprecated": Archive,
};


const TAG_BASE = 'border-none h-6 rounded-sm focus-visible:outline-none';

const GREEN_TAG = `${TAG_BASE} bg-green-600/10 text-green-600 focus-visible:ring-green-600/20 dark:bg-green-400/10 dark:text-green-400 dark:focus-visible:ring-green-400/40 [a&]:hover:bg-green-600/5 dark:[a&]:hover:bg-green-400/5`;
const AMBER_TAG = `${TAG_BASE} bg-amber-600/10 text-amber-600 focus-visible:ring-amber-600/20 dark:bg-amber-400/10 dark:text-amber-400 dark:focus-visible:ring-amber-400/40 [a&]:hover:bg-amber-600/5 dark:[a&]:hover:bg-amber-400/5`;
const BLUE_TAG = `${TAG_BASE} bg-blue-600/10 text-blue-600 focus-visible:ring-blue-600/20 dark:bg-blue-400/10 dark:text-blue-400 dark:focus-visible:ring-blue-400/40 [a&]:hover:bg-blue-600/5 dark:[a&]:hover:bg-blue-400/5`;

const RED_TAG = `${TAG_BASE} bg-red-600/10 text-red-600 focus-visible:ring-red-600/20 dark:bg-red-400/10 dark:text-red-400 dark:focus-visible:ring-red-400/40 [a&]:hover:bg-red-600/5 dark:[a&]:hover:bg-red-400/5`;

const CYAN_TAG = `${TAG_BASE} bg-cyan-600/10 text-cyan-600 focus-visible:ring-cyan-600/20 dark:bg-cyan-400/10 dark:text-cyan-400 dark:focus-visible:ring-cyan-400/40 [a&]:hover:bg-cyan-600/5 dark:[a&]:hover:bg-cyan-400/5`;
const INDIGO_TAG = `${TAG_BASE} bg-indigo-600/10 text-indigo-600 focus-visible:ring-indigo-600/20 dark:bg-indigo-400/10 dark:text-indigo-400 dark:focus-visible:ring-indigo-400/40 [a&]:hover:bg-indigo-600/5 dark:[a&]:hover:bg-indigo-400/5`;
const FUCHSIA_TAG = `${TAG_BASE} bg-fuchsia-600/10 text-fuchsia-600 focus-visible:ring-fuchsia-600/20 dark:bg-fuchsia-400/10 dark:text-fuchsia-400 dark:focus-visible:ring-fuchsia-400/40 [a&]:hover:bg-fuchsia-600/5 dark:[a&]:hover:bg-fuchsia-400/5`;
const ORANGE_TAG = `${TAG_BASE} bg-orange-600/10 text-orange-600 focus-visible:ring-orange-600/20 dark:bg-orange-400/10 dark:text-orange-400 dark:focus-visible:ring-orange-400/40 [a&]:hover:bg-orange-600/5 dark:[a&]:hover:bg-orange-400/5`;
const TEAL_TAG = `${TAG_BASE} bg-teal-600/10 text-teal-600 focus-visible:ring-teal-600/20 dark:bg-teal-400/10 dark:text-teal-400 dark:focus-visible:ring-teal-400/40 [a&]:hover:bg-teal-600/5 dark:[a&]:hover:bg-teal-400/5`;
const SLATE_TAG = `${TAG_BASE} bg-slate-600/10 text-slate-600 focus-visible:ring-slate-600/20 dark:bg-slate-400/10 dark:text-slate-400 dark:focus-visible:ring-slate-400/40 [a&]:hover:bg-slate-600/5 dark:[a&]:hover:bg-slate-400/5`;


export const TYPE_STYLES: Record<CaseType, string> = {
    "Website": CYAN_TAG,
    "Web Application Development": INDIGO_TAG,
    "Custom Software": FUCHSIA_TAG,
    "MVP Development": ORANGE_TAG,
    "Support and maintenance": TEAL_TAG,
    "Legacy System Modernisation": SLATE_TAG,
};

export const STATUS_STYLES: Record<CaseStatus, string> = {
    "Active": GREEN_TAG,
    "In progress": AMBER_TAG,
    "Completed": BLUE_TAG,
    "Deprecated": RED_TAG,
};