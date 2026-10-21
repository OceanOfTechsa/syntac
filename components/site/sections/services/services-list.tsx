"use client";

import Link from "next/link";
import React, { useEffect, useRef } from "react";
import {
    Globe,
    Rocket,
    RefreshCw,
    LifeBuoy,
    Headphones,
    Workflow, ShieldCheck, Blocks, GitPullRequest, UserCog, CloudCog, PlugZap,
    GitBranch, Activity, Bug, DatabaseZap, ChartNoAxesCombined, Building2, Images, ShoppingCart, Puzzle, PanelsTopLeft,
    UsersRound, LayoutDashboard, MoveRight,
    FolderCode,
} from "lucide-react";

import {cn} from "@/lib/utils";
import { gsap } from "@/lib/gsap";
import AppSettings from "@/utils/AppSettings";
import {FADED_DOTTED_BG} from "@/components/site/shared-classes";
import SectionHeader from "@/components/site/shared/section-header";

type ServicePoint = { icon: React.ElementType; title: string; description: string };

type Service = {
    id: string;
    label: string;
    description: string;
    icon: React.ElementType;
    points: ServicePoint[];
    href: string
};

/* ---- the five services we actually offer ---- */
const SERVICES_LIST: Service[] = [
    {
        href: "/services/web-development",
        id: "web-development",
        label: "Web Development",
        description:
            "Build fast, modern websites and web experiences that communicate your brand, engage your audience, and support your business goals.",
        icon: Globe,
        points: [
            {
                icon: Building2,
                title: "Business Websites",
                description:
                    "Professional websites that present your business, services, offerings and brand clearly online.",
            },
            {
                icon: Images,
                title: "Portfolios & Content",
                description:
                    "Content-driven websites for portfolios, blogs, news, publications and growing content libraries.",
            },
            {
                icon: ShoppingCart,
                title: "Online Stores",
                description:
                    "E-commerce experiences that showcase products, support payments and make selling online simple.",
            },
            {
                icon: Puzzle,
                title: "Connected Experiences",
                description:
                    "Booking, client areas, forms and integrations that connect your website to the tools you use.",
            },
        ],
    },

    {
        href: "/services/mvp-development",
        id: "mvp-development",
        label: "MVP Development",
        description:
            "Turn your idea into a working product that can be tested, validated, and prepared for future growth.",
        icon: Rocket,
        points: [
            {
                icon: PanelsTopLeft,
                title: "Web Applications",
                description:
                    "Build focused web products that give users a complete experience through the browser.",
            },
            {
                icon: UsersRound,
                title: "Customer Portals",
                description:
                    "Create secure spaces where customers can manage accounts, access information and complete tasks.",
            },
            {
                icon: LayoutDashboard,
                title: "Dashboards & Admin",
                description:
                    "Give teams the tools to manage users, data, workflows and day-to-day operations.",
            },
            {
                icon: Blocks,
                title: "SaaS Products",
                description:
                    "Build subscription-based products with accounts, permissions, billing and multiple customer spaces.",
            },
        ],
    },

    {
        href: "/services/custom-software-development",
        id: "custom-software-development",
        label: "Custom Software Development",
        description:
            "Purpose-built software designed around your unique processes, requirements, workflows, and business goals.",
        icon: FolderCode,
        points: [
            {
                icon: Workflow,
                title: "Built Around Your Workflow",
                description:
                    "Systems designed around how your team actually works across sales, finance, HR, operations or inventory.",
            },
            {
                icon: GitPullRequest,
                title: "Workflows & Approvals",
                description:
                    "Automate requests, approvals, document handling and other processes from start to finish.",
            },
            {
                icon: ChartNoAxesCombined,
                title: "Reporting & Insights",
                description:
                    "Dashboards and reports that turn operational data into clear, useful business insights.",
            },
            {
                icon: UserCog,
                title: "Roles & Access Control",
                description:
                    "Role-based access, permissions and administration tools that keep your system under control.",
            },
        ],
    },

    {
        href: "/services/legacy-system-modernisation",
        id: "legacy-system-modernisation",
        label: "Legacy System Modernisation",
        description:
            "Modernise ageing systems, improve performance, and evolve your technology without disrupting the business.",
        icon: RefreshCw,
        points: [
            {
                icon: DatabaseZap,
                title: "Modernise Your Data",
                description:
                    "Clean, migrate and validate existing data while moving away from outdated technologies and systems.",
            },
            {
                icon: CloudCog,
                title: "Move to Modern Platforms",
                description:
                    "Re-platform applications, databases and hosting to supported technologies and modern infrastructure.",
            },
            {
                icon: PlugZap,
                title: "Connect Existing Systems",
                description:
                    "Add APIs and integrations so older systems can work with newer tools without rebuilding everything.",
            },
            {
                icon: GitBranch,
                title: "Phased & Low-Risk",
                description:
                    "Replace or upgrade modules step-by-step while keeping essential business operations running.",
            },
        ],
    },

    {
        href: "/services/support-maintenance",
        id: "support-maintenance",
        label: "Support & Maintenance",
        description:
            "Keep your software secure, reliable, and ready for what comes next with ongoing technical support and maintenance.",
        icon: LifeBuoy,
        points: [
            {
                icon: ShieldCheck,
                title: "Security & Updates",
                description:
                    "Keep software updated with security patches, dependency updates and routine technical maintenance.",
            },
            {
                icon: Activity,
                title: "Monitoring & Backups",
                description:
                    "Monitor system health and maintain reliable backups so issues can be identified before they escalate.",
            },
            {
                icon: Bug,
                title: "Fixes & Improvements",
                description:
                    "Handle bugs, small changes and ongoing improvements to keep your website or system running smoothly.",
            },
            {
                icon: Headphones,
                title: "Responsive Support",
                description:
                    "Get clear support options and priority assistance when something needs attention or urgent fixing.",
            },
        ],
    },
];

const ServicesSection = () => {
    const sectionRef = useRef<HTMLElement>(null);

    // Animated glow: gentle breathing, desynced per card (skipped for reduced motion)
    useEffect(() => {
        if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

        const ctx = gsap.context(() => {
            gsap.utils.toArray<HTMLElement>(".service-glow").forEach((glow, i) => {
                gsap.fromTo(
                    glow,
                    { scale: 0.85, opacity: 0.6, x: 0, y: 4 },
                    {
                        scale: 1.1,
                        opacity: 1,
                        x: 0,
                        y: -4,
                        duration: 2.8,
                        ease: "sine.inOut",
                        repeat: -1,
                        yoyo: true,
                        delay: i * 0.35,
                    }
                );
            });
        }, sectionRef);

        return () => ctx.revert();
    }, []);

    return (
        <section
            ref={sectionRef}
            id="services"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="What we do"
                title="Services Built for Real Business Needs"
                markedWord="Real Business"
                desc={`${AppSettings.COMPANY_NAME} helps businesses design, build and maintain technology that actually supports the way they work, from websites and web applications to custom systems and ongoing support.`}
            />

            {/* Cards flow normally, one after another, with a gap between them */}
            <div className="flex flex-col gap-16 sm:gap-20">
                {SERVICES_LIST.map((service, index) => {
                    const Icon = service.icon;
                    // Every second card swaps sides so the rhythm alternates while reading down the page
                    const reversed = index % 2 === 1;

                    return (
                        <Link
                            href={service.href}
                            title={service.label}
                            key={service.id}
                            draggable={false}
                            className="group relative block border-y border-dashed bg-background text-inherit no-underline"
                        >
                            <div className="grid md:grid-cols-2">
                                {/* Left */}
                                <div
                                    className={cn(
                                        "relative flex items-center justify-center px-6 py-12 max-md:hidden lg:px-10",
                                        FADED_DOTTED_BG,
                                        reversed && "md:order-2"
                                    )}
                                >
                                    {/* isolate keeps the glow behind the content but above the card background */}
                                    <div className="relative isolate flex items-start gap-5">
                                        {/* Glow: dark in light mode, soft light in dark mode */}
                                        <div
                                            aria-hidden
                                            className="pointer-events-none absolute left-5 top-7 -z-20 -translate-x-1/2 -translate-y-1/2 rounded-full"
                                        >
                                            <div className="service-glow h-24 w-24 rounded-full bg-neutral-900/40 blur-2xl dark:h-18 dark:w-18 dark:bg-white/[0.07]" />
                                        </div>

                                        <div className="bg-muted flex size-14 shrink-0 items-center justify-center rounded-md">
                                            <Icon className="text-primary size-7" strokeWidth={1.6} />
                                        </div>
                                        <div>
                                            <h3 className="text-3xl font-semibold tracking-tight">
                                                {service.label}
                                            </h3>
                                            <p className="text-muted-foreground mt-1.5 max-w-xs text-sm leading-relaxed">
                                                {service.description}
                                            </p>
                                            <p className="text-muted-foreground mt-1.5 flex max-w-xs items-center gap-2 text-xs leading-relaxed">
                                                Learn more
                                                <MoveRight
                                                    size={18}
                                                    className="transition-transform duration-500 ease-in-out group-hover:translate-x-1"
                                                />
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Right */}
                                <div
                                    className={cn(
                                        "flex flex-col divide-y divide-dashed border-dashed",
                                        reversed && "md:order-1"
                                    )}
                                >
                                    {/* Mobile header (the left panel is hidden on mobile) */}
                                    <div className="flex items-center gap-4 px-4 py-4 sm:px-6 md:hidden">
                                        <div className="bg-muted flex size-11 shrink-0 items-center justify-center rounded-lg">
                                            <Icon className="text-primary size-5" strokeWidth={1.8} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">{service.label}</h3>
                                            <p className="text-muted-foreground text-sm">{service.description}</p>
                                        </div>
                                    </div>

                                    {service.points.map((point) => {
                                        const PointIcon = point.icon;
                                        return (
                                            <div
                                                key={point.title}
                                                className="flex flex-1 flex-col justify-center space-y-2 px-4 py-5 sm:px-6 lg:px-8"
                                            >
                                                <div className="flex items-center gap-3">
                                                    <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg">
                                                        <PointIcon size={18} strokeWidth={1.8} />
                                                    </div>
                                                    <h4 className="text-lg font-medium">{point.title}</h4>
                                                </div>
                                                <p className="text-muted-foreground text-sm leading-relaxed">
                                                    {point.description}
                                                </p>
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>

                            {/* Column divider: drawn on its own layer so the dotted panel's mask can never fade it */}
                            <span
                                aria-hidden="true"
                                className="pointer-events-none absolute inset-y-0 left-1/2 hidden border-l border-dashed md:block"
                            />
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default ServicesSection;