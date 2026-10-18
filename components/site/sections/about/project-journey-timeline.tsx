"use client";

import React from "react";
import {
    MessageCircle,
    ClipboardList,
    Map,
    Code2,
    CheckCircle2,
    Rocket,
} from "lucide-react";
import SectionHeader from "@/components/site/shared/section-header";

const journey = [
    {
        title: "Start With a Conversation",
        description:
            "Tell us what your business does, what you're trying to achieve, and where technology could help.",
        icon: MessageCircle,
    },
    {
        title: "Define the Requirements",
        description:
            "We clarify your goals, users, features, integrations, priorities, and technical requirements.",
        icon: ClipboardList,
    },
    {
        title: "Plan the Solution",
        description:
            "We shape the right approach, define the scope, establish milestones, and create a clear development roadmap.",
        icon: Map,
    },
    {
        title: "Design & Develop",
        description:
            "We turn the plan into a working solution through thoughtful design, hand-written code, and iterative development.",
        icon: Code2,
    },
    {
        title: "Review, Test & Refine",
        description:
            "You review the progress while we test, refine, and make sure everything works as intended before launch.",
        icon: CheckCircle2,
    },
    {
        title: "Launch & Evolve",
        description:
            "We deliver the finished solution and can continue supporting, improving, and scaling it as your business grows.",
        icon: Rocket,
    },
];

const ProjectJourneyTimeline = () => {
    return (
        <section className="mx-auto flex max-w-5xl flex-col items-center space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24  px-4 text-center sm:px-6 lg:px-8">
            <SectionHeader
                preTitle="The SYNTAC Process"
                title="From Idea to a Working Solution"
                markedWord="Working Solution"
                desc="A clear, collaborative process that takes your project from
                    the first conversation to a solution built around your
                    business."
            />

            <div className="flex flex-col items-center gap-8">
                <ul className="grid max-w-xl [&>li]:grid [&>li]:grid-cols-[0_min-content_1fr]">
                    {journey.map((step, index) => {
                        const Icon = step.icon;
                        const isLast = index === journey.length - 1;

                        return (
                            <li
                                key={step.title}
                                className="grid items-center gap-x-3 text-primary"
                            >
                                {/* Timeline marker */}
                                <div
                                    role="status"
                                    aria-label={`Step ${index + 1}`}
                                    className="col-start-2 col-end-3 row-start-1 row-end-1 my-1.5 grid size-6 place-items-center rounded-full border border-primary/20 bg-primary/10 text-sm font-medium text-primary"
                                >
                                    <Icon className="size-3.5" />
                                </div>

                                {/* Timeline connector */}
                                {!isLast && (
                                    <hr
                                        role="separator"
                                        aria-orientation="vertical"
                                        className="col-start-2 col-end-3 row-start-2 row-end-2 mx-auto flex h-full min-h-16 w-0.5 justify-center rounded-full border-0 bg-muted bg-[repeating-linear-gradient(0deg,var(--border),var(--border)_5px,var(--card)_6px,var(--card)_10px)]"
                                    />
                                )}

                                {/* Step title */}
                                <p
                                    role="heading"
                                    aria-level={3}
                                    className="col-start-3 col-end-4 row-start-1 row-end-1 mr-auto mb-1.5 line-clamp-1 max-w-full truncate text-left text-lg font-semibold text-primary"
                                >
                                    {step.title}
                                </p>

                                {/* Step description */}
                                <div
                                    className={`col-start-3 col-end-4 row-start-2 row-end-2 mr-auto text-left text-muted-foreground ${
    isLast ? "pb-0" : "pb-9.5"
}`}
                                >
                                    {step.description}
                                </div>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </section>
    );
};

export default ProjectJourneyTimeline;