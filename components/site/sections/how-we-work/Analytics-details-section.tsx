import React from "react";
import {
    Target,
    Search,
    FileText,
    Calculator,
    ClipboardCheck,
} from "lucide-react";

import SectionHeader from "@/components/site/shared/section-header";

const discoverySteps = [
    {
        icon: Target,
        title: "Study Business Goals",
        description:
            "We take time to understand your business objectives, challenges, and what success looks like for you.",
        points: [
            ["Focus:", "Your goals, priorities, and constraints"],
            ["Outcome:", "Clear alignment on what matters most"],
        ],
    },
    {
        icon: Search,
        title: "Market & Competitor Research",
        description:
            "We run basic research of the market, including direct and indirect competitors, to understand the landscape you operate in.",
        points: [
            ["Focus:", "Market context and competitive positioning"],
            ["Outcome:", "Informed decisions based on real insights"],
        ],
    },
    {
        icon: FileText,
        title: "Define Project Requirements",
        description:
            "We help you define all project requirements clearly so everyone knows exactly what needs to be built and why.",
        points: [
            ["Focus:", "Scope, features, and success criteria"],
            ["Outcome:", "A shared and documented understanding"],
        ],
    },
    {
        icon: Calculator,
        title: "Prepare the Estimate",
        description:
            "Based on everything we learned, we prepare a clear estimate and recommended approach for the project.",
        points: [
            ["Focus:", "Effort, timeline, and practical next steps"],
            ["Outcome:", "A realistic plan ready to move forward"],
        ],
    },
    {
        icon: ClipboardCheck,
        title: "Present Findings & Next Steps",
        description:
            "We walk you through our findings, recommendations, and a clear path forward so you can make confident decisions.",
        points: [
            ["Focus:", "Clarity, alignment, and decision-making"],
            ["Outcome:", "A shared plan ready for development"],
        ],
    },
];

const AnalyticsDetailsSection = () => {
    return (
        <section
            id="analytics-discovery"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <div className="flex flex-col gap-4">
                <SectionHeader
                    preTitle="Analytics & Discovery"
                    title="What We Do Before Development Starts"
                    markedWord="Before Development"
                    desc="A structured discovery process that helps us understand your business, uncover real opportunities, and define the right technology approach."
                />
            </div>

            <div className="grid border-y border-dashed sm:grid-cols-2 lg:grid-cols-3">
                {/* Intro cell */}
                <div
                    className={[
                        "flex items-center justify-center",
                        "border-dashed px-4 py-6 sm:px-6 lg:px-8",
                        "border-b lg:border-r",
                    ].join(" ")}
                >
                    <h3 className="text-2xl font-medium">
                        Here are the steps we take to get clear answers:
                    </h3>
                </div>

                {discoverySteps.map((step, index) => {
                    const Icon = step.icon;

                    // 1 intro + 5 steps = 6 items total → 2 full rows on large screens
                    const isLastColumn = (index + 1) % 3 === 2;
                    const isLastRow = index >= 2;

                    return (
                        <div
                            key={step.title}
                            className={[
                                "flex flex-col justify-between gap-4",
                                "border-dashed px-4 py-6 sm:px-6 lg:px-8",
                                "transition-colors duration-200",
                                isLastRow ? "lg:border-b-0" : "border-b",
                                isLastColumn ? "lg:border-r-0" : "lg:border-r",
                                "max-sm:border-b",
                                index % 2 === 0 ? "sm:max-lg:border-r" : "",
                            ].join(" ")}
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="bg-muted grid size-8.5 place-items-center rounded-md">
                                        <Icon
                                            className="text-primary size-5.5"
                                            strokeWidth={2}
                                            aria-hidden="true"
                                        />
                                    </div>
                                    <h3 className="text-xl font-medium">
                                        {step.title}
                                    </h3>
                                </div>

                                <p className="text-muted-foreground">
                                    {step.description}
                                </p>

                                <ul className="flex list-inside list-disc flex-col gap-3">
                                    {step.points.map(([label, value]) => (
                                        <li key={label}>
                                            <span className="font-medium">
                                                {label}
                                            </span>{" "}
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

export default AnalyticsDetailsSection;