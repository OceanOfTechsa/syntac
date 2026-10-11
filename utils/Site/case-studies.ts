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

export type CaseType =
    | "Website"
    | "Web Application Development"
    | "Custom Software"
    | "MVP Development"
    | "Support and maintenance"
    | "Legacy System Modernisation";

export type CaseStatus = "Active" | "In progress" | "Completed" | "Deprecated";

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
    galleryCount? : number;
}


export const ALL_CASE_STUDIES: CaseStudy[] = [
    {
        id: 1,
        title: "Website Development",
        slug: "ocean-of-tech-website",
        clientSlug: "ocean-of-tech",
        clientName: "Ocean of Tech",
        clientInitials: "OT",
        summary:
            "Business website for digital services, web development, and technology solutions.",
        type: "Website",
        status: "Active",
        featured: true,
        clientAvatar: "/assets/site/clients/logos/ocean-of-tech.png",
    },
    {
        id: 2,
        title: "Website Design & Development",
        slug: "syntac-software",
        clientSlug: "syntac-software",
        clientName: "Syntac Software",
        clientInitials: "SS",
        summary: "Website redesign and development for for digital services, web development, and technology solutions company.",
        type: "Website",
        status: "In progress",
        clientAvatar: '/brand/syntac-brand-kit/logos/icon/svg/syntac-icon-green-circle.svg'
    },
    {
        id: 3,
        title: "Custom Field Service Management (FSM)",
        slug: "field-service-management",
        clientSlug: "syntac-software",
        clientName: "Syntac Software",
        clientInitials: "SS",
        summary:
            "Custom field service management platform for managing service jobs and operational workflows.",
        type: "Custom Software",
        status: "In progress",
        clientAvatar:
            "/brand/syntac-brand-kit/logos/icon/svg/syntac-icon-green-circle.svg",
        featured: true,
        galleryCount:2
    },
    {
        id: 3,
        title: "Website Development",
        slug: "phanitime",
        clientSlug: "phanitime",
        clientName: "Phanitime",
        clientInitials: "PT",
        summary:
            "Custom field service management platform for managing service jobs and operational workflows.",
        type: "Web Application Development",
        status: "Active",
    },
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