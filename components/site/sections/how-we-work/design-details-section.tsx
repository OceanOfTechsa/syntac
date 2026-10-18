import React from "react";
import {
    Map,
    LayoutTemplate,
    Paintbrush,
    Calculator,
    PenTool,
} from "lucide-react";

import SectionHeader from "@/components/site/shared/section-header";

const designSteps = [
    {
        icon: Map,
        title: "Project Mind Map & Wireframes",
        description:
            "We create a project mind map and design low-fidelity wireframes of the most complicated flows to establish structure early.",
        points: [
            ["Focus:", "Information architecture and key user flows"],
            ["Outcome:", "Clear structure before high-fidelity work begins"],
        ],
    },
    {
        icon: LayoutTemplate,
        title: "Concept Design",
        description:
            "We prepare a concept of the project consisting of 2–3 app screens or web pages and a project presentation.",
        points: [
            ["Focus:", "Visual direction and core experience"],
            ["Outcome:", "A tangible concept you can react to"],
        ],
    },
    {
        icon: Paintbrush,
        title: "Design Sprints",
        description:
            "We finish off the designs with weekly sprints, refining screens and interactions based on feedback.",
        points: [
            ["Focus:", "Iteration, consistency, and polish"],
            ["Outcome:", "A complete and coherent design"],
        ],
    },
    {
        icon: Calculator,
        title: "Detailed Estimate",
        description:
            "Based on the finished design, we prepare a detailed development time and cost estimate.",
        points: [
            ["Focus:", "Accurate scoping from the final designs"],
            ["Outcome:", "A realistic development plan and budget"],
        ],
    },
    {
        icon: PenTool,
        title: "Design Handoff",
        description:
            "We deliver a complete design system, interactive prototypes, and developer-ready specifications.",
        points: [
            ["Focus:", "Clarity and smoothness of handoff"],
            ["Outcome:", "Development can start without ambiguity"],
        ],
    },
];

const DesignSection = () => {
    return (
        <section className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24" id={'design'}>
            <SectionHeader
                preTitle="Design"
                title="How We Approach Design"
                markedWord="Design"
                desc="A structured design process that moves from structure to polished, development-ready interfaces."
            />

            <div className="grid border-y border-dashed sm:grid-cols-2 lg:grid-cols-3">
                <div className="flex items-center justify-center border-dashed border-b px-4 py-6 sm:px-6 lg:border-r lg:px-8">
                    <h3 className="text-2xl font-medium">
                        Here are the steps we take during design:
                    </h3>
                </div>

                {designSteps.map((step, index) => {
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

export default DesignSection;