import React from "react";
import Link from "next/link";
import {
    Sparkles,
    MousePointerClick,
    TrendingUp,
    Search,
    Smartphone,
    Fingerprint,
    ArrowRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import SectionHeader from "@/components/site/shared/section-header";

const benefits = [
    {
        icon: Sparkles,
        title: "Build Trust from the First Click",
        description:
            "Your website often shapes a potential customer's first impression of your business. A polished, professional design communicates credibility, showcases your expertise, and gives visitors confidence in what you offer.",
    },
    {
        icon: MousePointerClick,
        title: "Make Every Visit Feel Effortless",
        description:
            "Help visitors find what they need with intuitive navigation, clear content, and thoughtful layouts. A smooth browsing experience makes it easier for people to explore your services and take the next step.",
    },
    {
        icon: TrendingUp,
        title: "Turn Visitors into Opportunities",
        description:
            "Guide potential customers towards meaningful actions with clear calls to action, accessible contact details, and well-structured service pages. Give visitors a straightforward path to enquire about your offerings.",
    },
    {
        icon: Search,
        title: "Get Found Online",
        description:
            "Build a stronger foundation for search visibility with SEO-friendly structure, relevant content, descriptive page metadata, and performance-conscious development. Help search engines understand your website and connect your business with relevant audiences.",
    },
    {
        icon: Smartphone,
        title: "Work Beautifully on Every Screen",
        description:
            "Give visitors a consistent experience across smartphones, tablets, and desktops. Responsive layouts, readable content, and accessible interactions help your website adapt to the way people browse.",
    },
    {
        icon: Fingerprint,
        title: "Make Your Brand Stand Out",
        description:
            "Your business has its own timeline, personality, and strengths. We translate these into a distinctive website through thoughtful visual design, consistent branding, and content that communicates what makes your business different.",
    },
];

const WhyOurApproachWork = () => {
    return (
        <section
            id="why-our-approach-works"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <div className="flex flex-col gap-4">
                <SectionHeader
                    preTitle="Why our approach works"
                    title="Why Our Strategic Website Design is Indispensable for Your SA Business Success"
                    markedWord="Indispensable"
                    desc="Every design decision is made to help your business look credible, work smoothly on any device, and turn visitors into customers."
                />

                <div className="z-10 flex flex-wrap justify-center gap-4 px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/contact"
                        data-roll
                        className="cursor-pointer focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/80 h-10 px-6 has-[>svg]:px-4 gap-2 rounded-sm px-6! text-base max-[400px]:flex-1"
                    >
                        Start a conversation
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            <div className="grid border-t border-dashed sm:grid-cols-2 lg:grid-cols-3">
                {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;

                    return (
                        <div
                            key={benefit.title}
                            className={cn(
                                "flex flex-col gap-4 overflow-hidden border-b border-dashed",
                                "px-4 py-6 sm:px-6 lg:px-8",
                                "transition-colors duration-200 hover:bg-muted/30",
                                // 2 columns: divider after the left card of each row
                                index % 2 === 0 && "sm:max-lg:border-r",
                                // 3 columns: divider after every card except the last in a row
                                "lg:border-r",
                                (index + 1) % 3 === 0 && "lg:border-r-0",
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-muted grid size-8.5 shrink-0 place-items-center rounded-md">
                                    <Icon
                                        className="text-primary size-5.5"
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                </div>

                                <h3 className="text-xl font-medium">
                                    {benefit.title}
                                </h3>
                            </div>

                            <p className="text-muted-foreground">
                                {benefit.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default WhyOurApproachWork;