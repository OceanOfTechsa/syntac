import React from "react";
import {
    Layers,
    CalendarDays,
    FileBarChart,
    ShieldCheck,
    ListChecks,
} from "lucide-react";

import SectionHeader from "@/components/site/shared/section-header";

const developmentSteps = [
    {
        icon: Layers,
        title: "Scalable Architecture",
        description:
            "We start by setting up a scalable architecture that suits the project’s needs and future growth.",
        points: [
            ["Focus:", "Solid technical foundation"],
            ["Outcome:", "A system that can grow cleanly"],
        ],
    },
    {
        icon: CalendarDays,
        title: "Sprint Planning",
        description:
            "We work in 2–3 week sprints and create a clear development plan for every sprint.",
        points: [
            ["Focus:", "Predictable progress and priorities"],
            ["Outcome:", "Transparent delivery rhythm"],
        ],
    },
    {
        icon: FileBarChart,
        title: "Sprint Reports",
        description:
            "We prepare and submit sprint reports so you always know what was completed and what’s next.",
        points: [
            ["Focus:", "Visibility and communication"],
            ["Outcome:", "No surprises at the end of a sprint"],
        ],
    },
    {
        icon: ShieldCheck,
        title: "Quality Assurance",
        description:
            "We cover the code with automated tests that run on every commit. Each feature then goes through code review, team lead review, manager review against the approved scope, and your review on a staging build.",
        points: [
            ["Focus:", "Quality at every layer"],
            ["Outcome:", "Stable, reliable releases"],
        ],
    },
    {
        icon: ListChecks,
        title: "Change Management",
        description:
            "We estimate every change request in time and cost before it enters a sprint, and we keep a written list of approved changes so you can see what changed the budget and when.",
        points: [
            ["Focus:", "Controlled scope and budget"],
            ["Outcome:", "Full transparency on changes"],
        ],
    },
];

const DevelopmentSection = () => {
    return (
        <section className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24" id={'development'}>
            <SectionHeader
                preTitle="Development"
                title="How We Build"
                markedWord="Build"
                desc="A disciplined development process focused on quality, transparency, and controlled delivery."
            />

            <div className="grid border-y border-dashed sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center justify-center border-dashed border-b px-4 py-6 sm:px-6 lg:border-r lg:px-8">
                    <h3 className="text-2xl font-medium">
                        Here are the steps we take during development:
                    </h3>
                </div>

                {developmentSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isLastColumn = (index + 1) % 3 === 2;
                    const isLastRow = index >= 2;

                    return (
                        <div
                            key={step.title}
                            className={[
                                "flex flex-col justify-between gap-4 border-dashed px-4 py-6 sm:px-6 lg:px-8",
                                isLastRow ? "lg:border-b-0" : "border-b",
                                isLastColumn ? "lg:border-r-0" : "lg:border-r",
                                "max-sm:border-b",
                                index % 2 === 0 ? "sm:max-lg:border-r" : "",
                            ].join(" ")}
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="bg-muted grid size-8.5 place-items-center rounded-md">
                                        <Icon className="text-primary size-5.5" strokeWidth={2} />
                                    </div>
                                    <h3 className="text-xl font-medium">{step.title}</h3>
                                </div>
                                <p className="text-muted-foreground">{step.description}</p>
                                <ul className="flex list-inside list-disc flex-col gap-3">
                                    {step.points.map(([label, value]) => (
                                        <li key={label}>
                                            <span className="font-medium">{label}</span>{" "}
                                            <span className="text-muted-foreground">{value}</span>
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

export default DevelopmentSection;