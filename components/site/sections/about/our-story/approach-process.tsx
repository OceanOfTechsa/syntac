import React from "react";
import {
    Ear,
    ClipboardList,
    Braces,
    Users,
    type LucideIcon,
} from "lucide-react";

export interface IProcessStep {
    id: number;
    title: string;
    description?: string;
    Icon: LucideIcon;
}

const Steps: IProcessStep[] = [
    {
        id: 1,
        title: "Listen first",
        // description:
        //     "Understand your business, goals, audience, and what you want to achieve.",
        Icon: Ear,
    },
    {
        id: 2,
        title: "Plan carefully",
        // description:
        //     "Define the scope, features, priorities, and a clear project roadmap.",
        Icon: ClipboardList,
    },
    {
        id: 3,
        title: "Build thoughtfully",
        // description:
        //     "Develop, test, and refine a reliable solution tailored to your needs.",
        Icon: Braces,
    },
    {
        id: 4,
        title: "Keep people involved",
        // description:
        //     "Share progress, gather feedback, and keep you informed throughout the process.",
        Icon: Users,
    },
];

function StepBadge({ Icon }: { Icon: LucideIcon }) {
    return (
        <div
            className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full
                bg-gray-900 text-white ring-4 ring-gray-900/5
                dark:bg-white dark:text-gray-900 dark:ring-white/10"
        >
            <Icon
                className="h-[18px] w-[18px]"
                strokeWidth={1.75}
                aria-hidden="true"
            />
        </div>
    );
}

interface IApproachProcessProps {
    steps?: IProcessStep[];
}

export default function ApproachProcess({
    steps = Steps,
}: IApproachProcessProps) {
    return (
        <section className="mx-auto w-full py-10">
            {/* Desktop */}
            <ol className="hidden items-start md:flex">
                {steps.map((step, index) => (
                    <React.Fragment key={step.id}>
                        <li className="flex w-36 shrink-0 flex-col items-center text-center">
                            <StepBadge Icon={step.Icon} />

                            <span className="mt-3 text-sm font-semibold leading-snug">
                                {step.title}
                            </span>

                            {step.description && (
                                <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                                    {step.description}
                                </p>
                            )}
                        </li>

                        {index < steps.length - 1 && (
                            <li
                                aria-hidden="true"
                                className="flex h-10 flex-1 items-center px-2"
                            >
                                <div className="w-full border-t border-dashed border-border" />
                            </li>
                        )}
                    </React.Fragment>
                ))}
            </ol>

            {/* Mobile */}
            <ol className="flex flex-col gap-5 md:hidden">
                {steps.map((step) => (
                    <li key={step.id} className="flex items-start gap-4">
                        <StepBadge Icon={step.Icon} />

                        <div className="min-w-0 flex-1 pt-1">
                            <h3 className="text-sm font-semibold text-gray-800 dark:text-gray-200">
                                {step.title}
                            </h3>

                            {step.description && (
                                <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                                    {step.description}
                                </p>
                            )}
                        </div>
                    </li>
                ))}
            </ol>
        </section>
    );
}