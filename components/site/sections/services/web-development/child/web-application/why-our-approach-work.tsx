import React from "react";
import Link from "next/link";
import {
    Workflow,
    MousePointerClick,
    TrendingUp,
    Database,
    ShieldCheck,
    Blocks,
    ArrowRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import SectionHeader from "@/components/site/shared/section-header";

const benefits = [
    {
        icon: Workflow,
        title: "Streamline Your Business Workflows",
        description:
            "Replace repetitive manual tasks and disconnected processes with structured digital workflows. Custom web applications can help your team manage tasks, coordinate operations, reduce administrative overhead, and complete everyday work more efficiently.",
    },
    {
        icon: MousePointerClick,
        title: "Create Better User Experiences",
        description:
            "Give employees, customers, and other users an intuitive way to interact with your business. We design clear interfaces, practical navigation, and purpose-driven interactions that make complex processes easier to understand and complete.",
    },
    {
        icon: TrendingUp,
        title: "Build Around Your Business Needs",
        description:
            "Every business has its own processes, challenges, and goals. Custom web applications allow us to shape functionality around your requirements, helping you address specific operational problems instead of adapting your business to the limitations of generic software.",
    },
    {
        icon: Database,
        title: "Manage Information More Effectively",
        description:
            "Bring important business information into a structured, accessible environment. Depending on your requirements, your application can support centralised records, reporting, search, data validation, and controlled access to the information your team needs to make informed decisions.",
    },
    {
        icon: ShieldCheck,
        title: "Protect Your Business Data",
        description:
            "Security is considered throughout the development process. We can implement appropriate authentication, role-based permissions, input validation, secure data handling, and other safeguards based on your application's functionality, the sensitivity of its data, and your business requirements.",
    },
    {
        icon: Blocks,
        title: "Connect Your Existing Tools",
        description:
            "Reduce information silos by connecting your application with suitable third-party services and existing business systems. API integrations can help synchronise data, support payment processing, automate information exchange, and create a more connected digital environment.",
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
                    title="Web Applications Designed Around How Your Business Works"
                    markedWord="Designed"
                    desc="We combine thoughtful user experience, reliable engineering, and business-focused functionality to create web applications that solve practical problems, simplify operations, and adapt to your evolving requirements."
                />

                <div className="z-10 flex flex-wrap justify-center gap-4 px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/contact"
                        data-roll
                        className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary px-6 text-base font-medium whitespace-nowrap text-primary-foreground outline-none transition-all hover:bg-primary/80 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                    >
                        Discuss Your Application
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
                                // Two columns: divider after the left card of each row.
                                index % 2 === 0 && "sm:max-lg:border-r",
                                // Three columns: divider after every card except the last in a row.
                                "lg:border-r",
                                (index + 1) % 3 === 0 && "lg:border-r-0",
                            )}
                        >
                            <div className="flex items-center gap-4">
                                <div className="grid size-8.5 shrink-0 place-items-center rounded-md bg-muted">
                                    <Icon
                                        className="size-5.5 text-primary"
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