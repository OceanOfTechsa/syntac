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
import AppSettings from "@/utils/AppSettings";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import {FADED_DOTTED_BG} from "@/components/site/shared-classes";
import SectionHeader from "@/components/site/shared/section-header";

/* ---- stack tuning ---- */
const OFFSET_Y = 12;          // px each buried card is lifted so its top edge peeks out
const SCALE_STEP = 0.03;      // scale lost per card stacked on top
const HOLD = 0.9;             // pause so each card can be read fully
const SCROLL_PER_UNIT = 0.55; // viewport heights of scroll per timeline unit
const ENTER_BLUR = 6;         // px blur on a card as it slides in
const LEAVE_BLUR = 3;         // px blur on a card once it is buried

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
    const cardsRef = useRef<(HTMLAnchorElement | null)[]>([]);

    const peekSpace = (SERVICES_LIST.length - 1) * OFFSET_Y;

    useEffect(() => {
        const cards = cardsRef.current.filter(Boolean) as HTMLAnchorElement[];
        if (!cards.length) return;

        const ctx = gsap.context(() => {
            const inners = cards.map((c) => c.querySelector(".card-inner") as HTMLElement);

            cards.forEach((card, i) => {
                gsap.set(card, {
                    zIndex: i + 1,
                    yPercent: i === 0 ? 0 : 100,
                    y: 0,
                    scale: 1,
                    borderRadius: 0,
                    borderLeftWidth: 0,
                    borderRightWidth: 0,
                    transformOrigin: "center top",
                });
                gsap.set(inners[i], {
                    filter: i === 0 ? "blur(0px)" : `blur(${ENTER_BLUR}px)`,
                });
            });

            const tl = gsap.timeline({ defaults: { ease: "none" } });

            tl.to({}, { duration: HOLD });

            for (let i = 1; i < cards.length; i++) {
                tl.to(cards[i], { yPercent: 0, duration: 1 });

                // new card's content de-blurs as it lands
                tl.to(inners[i], { filter: "blur(0px)", duration: 0.7 }, "<");

                // buried cards: pushed back, rounded, small dashed border on all sides
                tl.to(
                    cards.slice(0, i),
                    {
                        scale: (idx: number) => 1 - (i - idx) * SCALE_STEP,
                        y: (idx: number) => -(i - idx) * OFFSET_Y,
                        borderRadius: 6,
                        borderLeftWidth: 1,
                        borderRightWidth: 1,
                        duration: 1,
                    },
                    "<"
                );

                // buried cards' content gets the soft blur (border stays crisp)
                tl.to(inners.slice(0, i), { filter: `blur(${LEAVE_BLUR}px)`, duration: 1 }, "<");

                tl.to({}, { duration: HOLD });
            }

            ScrollTrigger.create({
                trigger: sectionRef.current,
                start: "top top",
                end: () => `+=${tl.duration() * window.innerHeight * SCROLL_PER_UNIT}`,
                pin: true,
                pinSpacing: true,
                scrub: 0.6,
                animation: tl,
                invalidateOnRefresh: true,
            });

            // Animated glow: gentle breathing + slow drift, desynced per card
            gsap.utils.toArray<HTMLElement>(".service-glow").forEach((glow, i) => {
                gsap.fromTo(
                    glow,
                    // x-6
                    { scale: 0.85, opacity: 0.6, x: 0, y: 4 },
                    {
                        scale: 1.1,
                        opacity: 1,
                        // x-6
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
            // Exactly one viewport tall: header + cards always fit on screen
            className="relative flex h-[100svh] flex-col bg-background overflow-hidden"
        >
            {/* Header (stays pinned with the section) */}
            <div className="shrink-0 pt-24 pb-6 sm:pt-28 sm:pb-8">
                <SectionHeader
                    preTitle="What we do"
                    title="Services Built for Real Business Needs"
                    markedWord="Real Business"
                    desc={`${AppSettings.COMPANY_NAME} helps businesses design, build and maintain technology that actually supports the way they work, from websites and web applications to custom systems and ongoing support.`}
                />
            </div>

            {/* Cards area: fills the remaining viewport height, with a bottom margin */}
            <div className="relative mb-6 min-h-0 flex-1 overflow-hidden">
                {SERVICES_LIST.map((service, index) => {
                    const Icon = service.icon;

                    return (
                        <Link
                            href={service.href}
                            title={service.label}
                            key={service.id}
                            ref={(el) => {
                                cardsRef.current[index] = el;
                            }}
                            draggable={false}
                            className="group absolute inset-x-0 bottom-0 block overflow-hidden bg-white text-inherit no-underline dark:bg-[#0a0a0a] border-y border-dashed will-change-transform"
                            style={{ top: peekSpace }}
                        >
                            <div className="card-inner grid h-full md:grid-cols-2">
                                {/* Left */}
                                <div className={cn("relative flex items-center justify-center px-6 max-md:hidden lg:px-10", FADED_DOTTED_BG)}>
                                    {/* isolate keeps the glow behind the content but above the card background */}
                                    <div className="relative isolate flex items-start gap-5">
                                        {/* Glow: sits behind the icon and the start of the text.
                                            Dark in light mode, soft light in dark mode (animated) */}
                                        <div
                                            aria-hidden
                                            className="pointer-events-none absolute left-5 rounded-full top-7 -z-10 -translate-x-1/2 -translate-y-1/2"
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
                                            <p className='text-muted-foreground mt-1.5 max-w-xs text-xs leading-relaxed flex gap-2 items-center'>
                                                Learn more
                                                <MoveRight size={18} className='group-hover:translate-x-1 transition-transform duration-500 ease-in-out' />
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                <div className="flex min-h-0 flex-col divide-y divide-dashed border-dashed md:border-l overflow-y-auto">
                                    <div className="flex items-center gap-4 px-4 py-4 md:hidden sm:px-6">
                                        <div className="bg-muted flex size-11 shrink-0 items-center justify-center rounded-lg">
                                            <Icon className="text-primary size-5" strokeWidth={1.8} />
                                        </div>
                                        <div>
                                            <h3 className="text-xl font-semibold">{service.label}</h3>
                                            <p className="text-muted-foreground text-sm">{service.description}</p>
                                        </div>
                                    </div>

                                    {/* Right */}
                                    {service.points.map((point) => {
                                        const PointIcon = point.icon;
                                        return (
                                            <div
                                                key={point.title}
                                                className="flex flex-1 flex-col justify-center space-y-2 px-4 py-4 sm:px-6 lg:px-8"
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
                        </Link>
                    );
                })}
            </div>
        </section>
    );
};

export default ServicesSection;