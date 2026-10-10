"use client";

import React, {useEffect, useMemo, useRef, useState} from 'react'
import {AppWindow, Archive, ArrowUpRight, BadgeCheck, CircleCheck, Clock, FolderCode, Globe, LifeBuoy, RefreshCw, Rocket} from "lucide-react";
import type {LucideIcon} from "lucide-react";

import {Badge} from "@/components/ui/badge";
import AppSettings from "@/utils/AppSettings";
import SectionHeader from "@/components/site/shared/section-header";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {
    Pagination,
    PaginationContent,
    PaginationEllipsis,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import Image, {getImageProps} from "next/image";
import {caseImagePath, imageKitLoader} from "@/lib/imagekit";
import type {Theme} from "@/lib/imagekit";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

type CaseType =
    | "Website"
    | "Web Application Development"
    | "Custom Software"
    | "MVP Development"
    | "Support and maintenance"
    | "Legacy System Modernisation";

type CaseStatus = "Active" | "In progress" | "Completed" | "Deprecated";

export interface CaseStudy {
    id: number;
    slug: string;
    clientSlug: string;
    clientName: string;
    clientAvatar?: string;
    clientInitials: string;
    summary: string;
    type: CaseType;
    status: CaseStatus;
    featured?: boolean;
}

/* -------------------------------------------------------------------------- */
/*  Image size - every case study image uses the same dimensions              */
/* -------------------------------------------------------------------------- */

const IMAGE_WIDTH = 380;
const IMAGE_HEIGHT = 200;

const getCaseImage = (study: CaseStudy, theme: Theme) =>
    caseImagePath(study.clientSlug, study.slug, theme);

/* -------------------------------------------------------------------------- */
/*  Mock data (replace with your API / CMS call later)                        */
/* -------------------------------------------------------------------------- */

const ALL_CASE_STUDIES: CaseStudy[] = [
    {
        id: 1,
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
    },
];

const MAX_FEATURED = 3;
// Only the first 3 featured items stay featured and go to the front.
// Any other "featured" items drop to normal cards, keeping their original order.
const CASE_STUDIES: CaseStudy[] = (() => {
    const featured = ALL_CASE_STUDIES.filter((s) => s.featured).slice(0, MAX_FEATURED);
    const rest = ALL_CASE_STUDIES
        .filter((s) => !featured.includes(s))
        .map((s) => ({...s, featured: false}));

    return [...featured, ...rest];
})();
/* -------------------------------------------------------------------------- */
/*  Badge styling helpers                                                     */
/* -------------------------------------------------------------------------- */

const TYPE_ICONS: Record<CaseType, LucideIcon> = {
    "Website": Globe,
    "Web Application Development": AppWindow,
    "Custom Software": FolderCode,
    "MVP Development": Rocket,
    "Support and maintenance": LifeBuoy,
    "Legacy System Modernisation": RefreshCw,
};

const STATUS_ICONS: Record<CaseStatus, LucideIcon> = {
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

const TYPE_STYLES: Record<CaseType, string> = {
    "Website": CYAN_TAG,
    "Web Application Development": INDIGO_TAG,
    "Custom Software": FUCHSIA_TAG,
    "MVP Development": ORANGE_TAG,
    "Support and maintenance": TEAL_TAG,
    "Legacy System Modernisation": SLATE_TAG,
};

const STATUS_STYLES: Record<CaseStatus, string> = {
    "Active": GREEN_TAG,
    "In progress": AMBER_TAG,
    "Completed": BLUE_TAG,
    "Deprecated": RED_TAG,
};

/* -------------------------------------------------------------------------- */
/*  Pagination helper                                                         */
/* -------------------------------------------------------------------------- */

type PageToken = number | "ellipsis-start" | "ellipsis-end";

const getPageTokens = (current: number, total: number): PageToken[] => {
    if (total <= 5) return Array.from({length: total}, (_, i) => i + 1);

    const tokens: PageToken[] = [1];
    const start = Math.max(2, current - 1);
    const end = Math.min(total - 1, current + 1);

    if (start > 2) tokens.push("ellipsis-start");
    for (let p = start; p <= end; p++) tokens.push(p);
    if (end < total - 1) tokens.push("ellipsis-end");

    tokens.push(total);
    return tokens;
};

/* -------------------------------------------------------------------------- */
/*  Image prefetch                                                            */
/* -------------------------------------------------------------------------- */

// Warms the browser cache with the exact optimised URL next/image will request,
// so the image is already there when the card renders or the theme flips.
const prefetchImage = (src: string) => {
    const {props} = getImageProps({
        src,
        width: IMAGE_WIDTH,
        height: IMAGE_HEIGHT,
        alt: '',
        quality: 100,
        loader: imageKitLoader,
    });
    const preloader = new window.Image();
    if (props.srcSet) preloader.srcset = props.srcSet;
    preloader.src = props.src;
};

/* -------------------------------------------------------------------------- */
/*  Card                                                                      */
/* -------------------------------------------------------------------------- */

// Shared by both theme images: slow zoom on card hover (skipped for reduced motion)
const IMAGE_CLASSES = 'h-full w-full object-fit transition-transform duration-500 ease-in-out group-hover:scale-105 motion-reduce:transition-none motion-reduce:group-hover:scale-100';

const CaseStudyCard = ({study, priority}: {study: CaseStudy; priority: boolean}) => {
    const TypeIcon = TYPE_ICONS[study.type];
    const StatusIcon = STATUS_ICONS[study.status];

    return (
        <Link
            href={`/cases/${study.slug}`}
            className={'relative group h-full w-full flex flex-col rounded-sm overflow-hidden border border-dashed border-border'}
        >
            {study.featured && (
                <Badge variant="secondary" className={'absolute top-2 right-2 z-10 bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300'}>
                    <BadgeCheck data-icon="inline-start" />
                    Featured
                </Badge>
            )}

            {/*
              Reserved box: the aspect ratio holds the exact 380x200 space and the
              muted background shows while the image loads, so nothing jumps.
            */}
            <div
                className={'relative w-full overflow-hidden bg-muted'}
                style={{aspectRatio: `${IMAGE_WIDTH} / ${IMAGE_HEIGHT}`}}
            >
                <Image
                    loader={imageKitLoader}
                    src={getCaseImage(study, "light")}
                    width={IMAGE_WIDTH}
                    height={IMAGE_HEIGHT}
                    alt={`${study.clientName} case study`}
                    quality={100}
                    priority={priority}
                    loading={priority ? undefined : "eager"}
                    className={`${IMAGE_CLASSES} dark:hidden`}
                />
                <Image
                    loader={imageKitLoader}
                    src={getCaseImage(study, "dark")}
                    width={IMAGE_WIDTH}
                    height={IMAGE_HEIGHT}
                    alt={`${study.clientName} case study`}
                    quality={100}
                    priority={priority}
                    loading={priority ? undefined : "eager"}
                    className={`hidden ${IMAGE_CLASSES} dark:block`}
                />

                {/* Hover: soft shade fades in and an arrow button slides up */}
                <div
                    aria-hidden
                    className={'pointer-events-none absolute inset-0 bg-linear-to-t from-black/50 via-transparent to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100 motion-reduce:transition-none'}
                />
                <span
                    aria-hidden
                    className={'pointer-events-none absolute bottom-3 right-3 flex size-9 translate-y-2 items-center justify-center rounded-full bg-background text-foreground opacity-0 shadow-md transition-all duration-500 ease-out group-hover:translate-y-0 group-hover:opacity-100 motion-reduce:transition-none'}
                >
                    <ArrowUpRight className={'size-4'} />
                </span>
            </div>

            <div className="via-primary/20 mx-auto h-px w-4/5 bg-linear-to-r from-transparent to-transparent"></div>

            <div className={'flex flex-1 flex-col justify-between gap-4 p-3'}>
                <div className={'flex gap-2'}>
                    <Avatar size="lg">
                        {study.clientAvatar && <AvatarImage src={study.clientAvatar} alt={study.clientName} />}
                        <AvatarFallback>{study.clientInitials}</AvatarFallback>
                    </Avatar>
                    <div className={'flex flex-col'}>
                        <span className="text-lg font-semibold tracking-tight">
                            {study.clientName}
                        </span>
                        <div className={'text-sm text-muted-foreground'}>
                            {study.summary}{' '}
                            {/*<span className={'underline-offset-2 underline inline-flex gap-2 items-center'}>Read more</span>*/}
                        </div>
                    </div>
                </div>

                <div className={'flex items-center ms-12 divider-x divider-dashed gap-4'}>
                    <Badge variant="secondary" className={TYPE_STYLES[study.type]}>
                        <TypeIcon data-icon="inline-start" />
                        {study.type}
                    </Badge>
                    <Badge variant="secondary" className={STATUS_STYLES[study.status]}>
                        <StatusIcon data-icon="inline-start" />
                        {study.status}
                    </Badge>
                </div>
            </div>
        </Link>
    );
};

/* -------------------------------------------------------------------------- */
/*  Section                                                                   */
/* -------------------------------------------------------------------------- */

const CasesShowcase = () => {
    const sectionRef = useRef<HTMLElement>(null);
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = Math.max(1, AppSettings.CASE_STUDY_ITEMS_PER_PAGE);
    const totalPages = Math.max(1, Math.ceil(CASE_STUDIES.length / itemsPerPage));

    const visibleStudies = useMemo(() => {
        const start = (currentPage - 1) * itemsPerPage;
        return CASE_STUDIES.slice(start, start + itemsPerPage);
    }, [currentPage, itemsPerPage]);

    const prefetched = useRef<Set<string>>(new Set());

    // Light + dark images of the NEXT page are fetched while the browser is idle,
    // so paging forward and switching theme never trigger a fresh download.
    useEffect(() => {
        const nextPage = currentPage + 1;
        if (nextPage > totalPages) return;

        const start = (nextPage - 1) * itemsPerPage;
        const upcoming = CASE_STUDIES.slice(start, start + itemsPerPage);

        const run = () => {
            upcoming.forEach((study) => {
                (["light", "dark"] as const).forEach((theme) => {
                    const src = getCaseImage(study, theme);
                    if (prefetched.current.has(src)) return;
                    prefetched.current.add(src);
                    prefetchImage(src);
                });
            });
        };

        if ('requestIdleCallback' in window) {
            const id = window.requestIdleCallback(run);
            return () => window.cancelIdleCallback(id);
        }
        const timeout = setTimeout(run, 200);
        return () => clearTimeout(timeout);
    }, [currentPage, itemsPerPage, totalPages]);

    const pageTokens = useMemo(() => getPageTokens(currentPage, totalPages), [currentPage, totalPages]);

    const goToPage = (page: number) => (e: React.MouseEvent) => {
        e.preventDefault();
        if (page < 1 || page > totalPages || page === currentPage) return;
        setCurrentPage(page);
        sectionRef.current?.scrollIntoView({behavior: 'smooth', block: 'start'});
    };

    const isFirst = currentPage === 1;
    const isLast = currentPage === totalPages;

    return (
        <section
            ref={sectionRef}
            id="solutions"
            className="flex flex-col items-center justify-center space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle={`Our Work at ${AppSettings.COMPANY_NAME}`}
                title="Ideas Turned Into Digital Solutions"
                markedWord="Digital Solutions"
                desc={`Explore our projects, from websites and web applications to custom software solutions, built to solve real challenges, improve experiences, and help businesses move forward.`}
            />

            <div className="via-primary/20 mx-auto h-px w-4/5 bg-linear-to-r from-transparent to-transparent"></div>

            <div className={'grid grid-cols-1 sm:grid-cols-3 gap-4 items-stretch justify-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8'}>
                {visibleStudies.map((study, index) => (
                    <CaseStudyCard
                        key={study.id}
                        study={study}
                        priority={currentPage === 1 && index < 3}
                    />
                ))}
            </div>

            {totalPages > 1 && (
                <Pagination>
                    <PaginationContent>
                        <PaginationItem>
                            <PaginationPrevious
                                href="#"
                                onClick={goToPage(currentPage - 1)}
                                aria-disabled={isFirst}
                                className={isFirst ? 'pointer-events-none opacity-50' : undefined}
                            />
                        </PaginationItem>

                        {pageTokens.map((token) => (
                            <PaginationItem key={token}>
                                {typeof token === 'number' ? (
                                    <PaginationLink
                                        href="#"
                                        isActive={token === currentPage}
                                        onClick={goToPage(token)}
                                    >
                                        {token}
                                    </PaginationLink>
                                ) : (
                                    <PaginationEllipsis />
                                )}
                            </PaginationItem>
                        ))}

                        <PaginationItem>
                            <PaginationNext
                                href="#"
                                onClick={goToPage(currentPage + 1)}
                                aria-disabled={isLast}
                                className={isLast ? 'pointer-events-none opacity-50' : undefined}
                            />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>

            )}

            {/* A note on our portfolio */}
            <div className="flex flex-col gap-6 border-y border-dashed px-4 py-10 sm:px-6 lg:px-8 w-full">
            <span className="font-kalam text-center text-lg font-medium underline underline-offset-2">
                A note on our portfolio
            </span>

                <div className="text-muted-foreground mx-auto max-w-4xl text-center text-lg">
                    The projects featured here represent only a selection of our work.
                    Out of respect for our clients, their privacy, and any confidentiality
                    agreements, we showcase projects only when we have the necessary
                    permission. Some projects may remain private, but every engagement
                    receives the same care, attention, and commitment to quality.
                </div>
            </div>
        </section>
    )
}
export default CasesShowcase