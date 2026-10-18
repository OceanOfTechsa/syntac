import React, { Fragment } from "react";
import {
    Blocks,
    ShieldCheck,
    Zap,
    GraduationCap,
    Rocket,
    Briefcase,
    Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import SectionHeader from "@/components/site/shared/section-header";

interface StrongSide {
    icon: React.ComponentType<{
        className?: string;
        strokeWidth?: number;
        "aria-hidden"?: boolean;
    }>;
    title: string;
    /** Use {{link}} where the inline link should appear. */
    description: string;
    link?: { label: string; href: string };
}

const strongSides: StrongSide[] = [
    {
        icon: Blocks,
        title: "Flexibility",
        description:
            "We think out-of-the-box and are flexible in collecting a tech stack for your project. Check what we have to offer beyond our core stack on {{link}}.",
        link: { label: "Tech Radar Syntac", href: "https://radar.ronas.online/" },
    },
    {
        icon: ShieldCheck,
        title: "High quality",
        description:
            "We strive to deliver high-quality code which has to correspond to our multiple standards and mandatory peer code review.",
    },
    {
        icon: Zap,
        title: "High speed",
        description:
            "We have our own developments within technologies which allows us to deliver results faster. You can check our contribution in our {{link}}.",
        link: {
            label: "GitHub repositories",
            href: "https://github.com/orgs/RonasIT/repositories?q=visibility%3Apublic+archived%3Afalse",
        },
    },
    {
        icon: GraduationCap,
        title: "Expertise",
        description:
            "Since we provide the full-cycle development services, from ideation and design to deployment and support, we code knowing how to put design into functionality and have a whole team’s expertise instantly available.",
    },
    {
        icon: Rocket,
        title: "Quick deployment",
        description:
            "For web applications we have standardized and automated deployment which enables us to go live right after development finished, for mobile apps, we’ve submitted multiple apps to Google Store and App Store, so we know how to meet their requirements.",
    },
    {
        icon: Briefcase,
        title: "Experience",
        description:
            "In our portfolio we’ve got projects from various industries, including fintech, e-commerce, travel, entertainment and more, and we serve businesses of all sizes. It means that we have experience to focus on developing custom features without building industry-standard solutions from scratch.",
    },
    {
        icon: Users,
        title: "Scalability",
        description:
            "We have many professionals in our team, allowing us to scale the development team if needed or in case of an urgent development.",
    },
];

function Description({ side }: { side: StrongSide }) {
    if (!side.link) return <>{side.description}</>;

    const [before, after] = side.description.split("{{link}}");

    return (
        <>
            {before}
            <a
                href={side.link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-foreground underline underline-offset-4 transition-colors hover:text-primary"
            >
                {side.link.label}
            </a>
            {after}
        </>
    );
}

const OurStrongSides = () => {
    return (
        <section
            id="our-strong-sides"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="Why choose us"
                title="Our strong sides"
                markedWord="strong sides"
                desc="What you can expect when you work with us, from the first idea to a live product."
            />

            {/* 12-col grid: first row 3 cards, second row 4 cards, so no orphan card */}
            <div className="grid border-t border-dashed sm:grid-cols-2 lg:grid-cols-12">
                {strongSides.map((side, index) => {
                    const Icon = side.icon;
                    const isLast = index === strongSides.length - 1;

                    return (
                        <div
                            key={side.title}
                            className={cn(
                                "flex flex-col gap-4 overflow-hidden border-b border-dashed",
                                "px-4 py-6 sm:px-6 lg:px-8",
                                "transition-colors duration-200 hover:bg-muted/30",
                                // 2 columns: divider after the left card of each row;
                                // the last (odd) card spans the full row
                                index % 2 === 0 && !isLast && "sm:max-lg:border-r",
                                isLast && "sm:max-lg:col-span-2",
                                // 3 + 4 layout from lg
                                index < 3 ? "lg:col-span-4" : "lg:col-span-3",
                                "lg:border-r",
                                (index === 2 || isLast) && "lg:border-r-0",
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-muted grid size-8.5 shrink-0 place-items-center rounded-md">
                                    <Icon
                                        className="text-primary size-5.5"
                                        strokeWidth={2}
                                        aria-hidden={true}
                                    />
                                </div>

                                <h3 className="text-xl font-medium">
                                    {side.title}
                                </h3>
                            </div>

                            <p className="text-muted-foreground">
                                <Description side={side} />
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default OurStrongSides;