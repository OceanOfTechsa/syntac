import React from "react";
import Link from "next/link";
import {
    Rocket,
    Store,
    TrendingUp,
    BadgeCheck,
    Building2,
    Landmark,
    ArrowRight,
} from "lucide-react";

import SectionHeader from "@/components/site/shared/section-header";

const clientTypes = [
    {
        icon: Rocket,
        title: "Startups",
        description:
            "Turn an idea into a digital product, validate a concept, or build the technology needed to get your business moving.",
        points: [
            ["You need:", "A website, MVP, prototype, or digital product"],
            ["You value:", "Speed, flexibility, and a clear path forward"],
        ],
    },
    {
        icon: Store,
        title: "Small Businesses",
        description:
            "Build a stronger digital presence and put practical technology in place to help your business operate more effectively.",
        points: [
            ["You need:", "Websites, business systems, or online platforms"],
            ["You value:", "Practical solutions and straightforward support"],
        ],
    },
    {
        icon: TrendingUp,
        title: "Growing Businesses",
        description:
            "Replace manual processes and disconnected tools with technology that can keep up as your business grows.",
        points: [
            ["You need:", "Automation, integrations, or custom software"],
            ["You value:", "Scalability, efficiency, and maintainability"],
        ],
    },
    {
        icon: BadgeCheck,
        title: "Established Brands",
        description:
            "Strengthen your digital experience with technology that reflects your brand and creates better experiences for your customers.",
        points: [
            ["You need:", "Web platforms, websites, or digital experiences"],
            ["You value:", "Quality, consistency, and thoughtful design"],
        ],
    },
    {
        icon: Building2,
        title: "Organisations",
        description:
            "Create reliable digital systems that support your teams, improve processes, and make complex operations easier to manage.",
        points: [
            ["You need:", "Internal platforms, portals, or business systems"],
            ["You value:", "Reliability, security, and clear processes"],
        ],
    },
    {
        icon: Landmark,
        title: "Enterprises",
        description:
            "Develop and improve tailored technology for complex environments, workflows, and long-term digital requirements.",
        points: [
            ["You need:", "Custom systems, integrations, or platforms"],
            ["You value:", "Scalability, maintainability, and long-term support"],
        ],
    },
];

const WhoWeWorkWith = () => {
    return (
        <section
            id="who-we-work-with"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <div className="flex flex-col gap-4">
                <SectionHeader
                    preTitle="Who we work with?"
                    title="Technology for Businesses at Every Stage"
                    markedWord="Every Stage"
                    desc="From early-stage startups to established brands and organisations, we build technology around where your business is today and where it is going next."
                />

                <div className="z-10 flex flex-wrap justify-center gap-4 px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/contact"
                        className="
                            hover:bg-[#0B9944] dark:hover:bg-[#0B9944]
                            focus-visible:border-ring focus-visible:ring-ring/50
                            inline-flex shrink-0 items-center justify-center
                            gap-2 font-medium whitespace-nowrap
                            transition-all outline-none
                            focus-visible:ring-[3px]
                            disabled:pointer-events-none disabled:opacity-50
                            [&_svg]:pointer-events-none
                            [&_svg]:shrink-0
                            [&_svg:not([class*='size-'])]:size-4
                            bg-primary text-primary-foreground
                            hover:text-white
                            h-10 px-6 rounded-lg text-base
                            shadow-sm max-[400px]:flex-1
                        "
                    >
                        Start a conversation
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            <div className="grid border-y border-dashed sm:grid-cols-2 lg:grid-cols-3">
                {clientTypes.map((client, index) => {
                    const Icon = client.icon;

                    return (
                        <div
                            key={client.title}
                            className={[
                                "flex flex-col justify-between gap-4",
                                "overflow-hidden border-dashed",
                                "px-4 py-6 sm:px-6 lg:px-8",
                                "transition-colors duration-200",
                                "lg:border-r lg:border-b",
                                index % 2 === 0
                                    ? "min-[500px]:max-lg:border-r"
                                    : "",
                                index === 2 || index === 5
                                    ? "lg:border-r-0"
                                    : "",
                                "max-sm:border-b",
                            ].join(" ")}
                        >
                            <div className="flex flex-col justify-between gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="bg-muted grid size-8.5 place-items-center rounded-md">
                                        <Icon
                                            className="text-primary size-5.5"
                                            strokeWidth={2}
                                            aria-hidden="true"
                                        />
                                    </div>

                                    <h3 className="text-xl font-medium">
                                        {client.title}
                                    </h3>
                                </div>

                                <p className="text-muted-foreground">
                                    {client.description}
                                </p>

                                <ul className="flex list-inside list-disc flex-col gap-4">
                                    {client.points.map(([label, value]) => (
                                        <li key={label}>
                                            {label}{" "}
                                            <span className="text-muted-foreground">
                                                {value}
                                            </span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default WhoWeWorkWith;