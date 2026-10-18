
"use client";

import {
    BriefcaseBusiness,
    ShoppingCart,
    GraduationCap,
    Building2,
    Truck,
    Calculator,
    HeartPulse,
    Hotel,
    Sprout,
    type LucideIcon,
} from "lucide-react";

import { cn } from "@/lib/utils";
import SectionHeader from "@/components/site/shared/section-header";
import AvatarGroup from "@/components/site/shared/avatar-group";
import Link from "next/link";
import React, {useEffect, useState} from "react";
import {ITestimonial, TESTIMONIALS} from "@/data/reviews";

interface Industry {
    icon: LucideIcon;
    title: string;
    description: string;
}



interface IHeroAvatar extends ITestimonial {
    src: string;
    name: string;
    fallback: string;
}

function buildAvatars(): IHeroAvatar[] {
    const shuffledReviews = [...TESTIMONIALS].sort(() => Math.random() - 0.5);

    return shuffledReviews.map((review: ITestimonial) => {
        const avatarNumber = Math.floor(Math.random() * 10) + 1;

        return {
            ...review,
            src: `https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-${avatarNumber}.png`,
            name: `${review.name} ${review.surname}`,
            fallback: `${review.name.charAt(0)}${review.surname.charAt(0)}`,
        };
    });
}


const industries: Industry[] = [
    {
        icon: BriefcaseBusiness,
        title: "Professional Services",
        description:
            "We build professional websites, client portals, and custom business systems for consulting firms, accounting practices, legal professionals, and service-based businesses. Simplify enquiries, manage information, and deliver a better client experience.",
    },
    {
        icon: ShoppingCart,
        title: "Retail & E-commerce",
        description:
            "We create online stores and retail platforms that make it easier to showcase products, manage orders, and serve customers. From product catalogues to inventory integrations, our solutions support your business as it grows.",
    },
    {
        icon: GraduationCap,
        title: "Education & Training",
        description:
            "We develop educational websites, student portals, training platforms, and administrative systems that help institutions manage information, streamline processes, and make learning resources more accessible.",
    },
    {
        icon: Building2,
        title: "Construction & Property",
        description:
            "We help property businesses, construction companies, and contractors manage projects and information through digital platforms. Solutions can include property listings, project tracking, maintenance requests, and client portals.",
    },
    {
        icon: Truck,
        title: "Logistics & Transport",
        description:
            "We build operational systems that help logistics and transport businesses coordinate deliveries, manage fleet information, track jobs, and improve visibility across everyday workflows.",
    },
    {
        icon: Calculator,
        title: "Financial & Accounting Services",
        description:
            "We develop business tools for invoicing, expense tracking, reporting, document management, and financial administration. Our solutions help teams reduce repetitive work and organise financial information more effectively.",
    },
    {
        icon: HeartPulse,
        title: "Healthcare & Wellness",
        description:
            "We create websites, appointment booking experiences, and administrative applications for healthcare providers and wellness businesses, with careful consideration for privacy, access controls, and sensitive information.",
    },
    {
        icon: Hotel,
        title: "Tourism & Hospitality",
        description:
            "We help accommodation providers, tour operators, and hospitality businesses strengthen their online presence with booking enquiries, service listings, reservation workflows, and customer management tools.",
    },
    {
        icon: Sprout,
        title: "Agriculture & Agribusiness",
        description:
            "We build digital tools for agricultural businesses to organise stock, coordinate suppliers, track operational activities, and manage business information, helping simplify workflows from the farm to the wider supply chain.",
    },
];

const Industries = () => {
    const [avatars, setAvatars] = useState<IHeroAvatar[]>([]);

    useEffect(() => {
        setAvatars(buildAvatars());
    }, []);

    return (
        <section
            id="industries"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="Industries We Serve"
                title="Technology Built Around Your Industry"
                markedWord="Your Industry"
                desc="Every business has different challenges, workflows, and goals. We build tailored websites, web applications, and custom software that help organisations across South Africa work more efficiently, serve their customers, and prepare for growth."
            />

            <div className="grid grid-cols-1 border-t border-dashed sm:grid-cols-2 lg:grid-cols-3">
                {industries.map((industry, index) => {
                    const Icon = industry.icon;
                    const isLast = index === industries.length - 1;

                    return (
                        <article
                            key={industry.title}
                            className={cn(
                                "flex flex-col gap-4 overflow-hidden border-b border-dashed",
                                "px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-9",
                                "transition-colors duration-200 hover:bg-muted/30",

                                // Two-column layout
                                index % 2 === 0 &&
                                !isLast &&
                                "sm:border-r",
                                isLast && "sm:max-lg:col-span-2",

                                // Three-column layout
                                "lg:border-r",
                                (index + 1) % 3 === 0 &&
                                "lg:border-r-0",
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className="grid size-10 shrink-0 place-items-center rounded-lg border bg-muted/40">
                                    <Icon
                                        className="size-5 text-primary"
                                        strokeWidth={1.8}
                                        aria-hidden="true"
                                    />
                                </div>

                                <h3 className="text-lg font-semibold sm:text-xl">
                                    {industry.title}
                                </h3>
                            </div>

                            <p className="text-sm leading-7 text-muted-foreground sm:text-base">
                                {industry.description}
                            </p>
                        </article>
                    );
                })}
            </div>

            <div className="flex flex-col justify-center items-center gap-10">
                <div className="z-10 flex items-center gap-3">
                    <AvatarGroup className="size-9.5" avatars={avatars} limit={5}/>
                    <p className="mb-0 text-left text-sm text-nowrap text-muted-foreground">
                        Trusted by <span className="font-semibold">16+</span>
                        <br/>
                        Companies &amp; Teams
                    </p>
                </div>
                <Link
                    className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary px-6 text-base font-medium whitespace-nowrap text-primary-foreground outline-none transition-all hover:bg-primary/80 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                    href="/contac"
                    data-roll
                >
                    Start a conversation
                </Link>
            </div>
        </section>
    );
};

export default Industries;
