
import React from "react";
import {
    BarChart3,
    Code2,
    Headphones,
    Palette,
} from "lucide-react";

import SectionHeader from "@/components/site/shared/section-header";
import AppSettings from "@/utils/AppSettings";
import Link from "next/link";
import AnimatedTimelineLine from "@/components/site/shared/animated-timeline-line";

const OurApproach = () => {
    return (
        <section
            id="our-approach"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle={`Our Approach`}
                title="From Insight to Ongoing Support"
                markedWord="Ongoing Support"
                desc={`${AppSettings.COMPANY_NAME} takes a structured approach to every project, starting with understanding your business, designing the right experience, building the solution, and supporting it beyond launch.`}
            />

            <div className="grid border-y border-dashed md:grid-cols-2">
                <div className="flex flex-col divide-y divide-dashed border-dashed md:border-r">
                    {/* Analytics & Discovery */}
                    <Link href={'/how-we-work#analytics-discovery'} className="flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 hover:bg-muted/40 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2">
                            <BarChart3
                                size={22}
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />

                            <h3 className="text-xl font-medium">
                                Analytics & Discovery
                            </h3>
                        </div>

                        <p className="text-muted-foreground">
                            We start by understanding your business, goals,
                            users, existing processes, and the problem you
                            want to solve. This gives us the insight needed to
                            define the right solution before development begins.
                        </p>
                    </Link>

                    {/* Design */}
                    <Link href={'/how-we-work#design'} className="flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 hover:bg-muted/40 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2">
                            <Palette
                                size={22}
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />

                            <h3 className="text-xl font-medium">
                                Design
                            </h3>
                        </div>

                        <p className="text-muted-foreground">
                            We turn ideas and requirements into thoughtful
                            digital experiences. From structure and user flows
                            to visual design and responsive interfaces, we
                            focus on making the solution clear, intuitive,
                            and aligned with your brand.
                        </p>
                    </Link>

                    {/* Development */}
                    <Link href={'/how-we-work#development'} className="flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 hover:bg-muted/40 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2">
                            <Code2
                                size={22}
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />

                            <h3 className="text-xl font-medium">
                                Development
                            </h3>
                        </div>

                        <p className="text-muted-foreground">
                            Once the direction is clear, we build the
                            solution using the right technologies and
                            architecture for the project. We focus on
                            reliable, maintainable, and scalable code that
                            can evolve with your business.
                        </p>
                    </Link>

                    {/* Deployment & Support */}
                    <Link href={'/how-we-work#deployment-and-support'} className="flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 hover:bg-muted/40 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2">
                            <Headphones
                                size={22}
                                strokeWidth={1.8}
                                aria-hidden="true"
                            />

                            <h3 className="text-xl font-medium">
                                Deployment & Support
                            </h3>
                        </div>

                        <p className="text-muted-foreground">
                            Launching is only part of the process. We help
                            prepare and deploy your solution, then provide
                            ongoing support, maintenance, improvements, and
                            technical assistance as your needs evolve.
                        </p>
                    </Link>
                </div>

                {/* Approach Statement */}
                <div className="flex items-center justify-center px-6 py-12 max-md:hidden lg:px-8 bg-dot-grid-less-opacity mask-[radial-gradient(ellipse_at_center,black_40%,transparent_85%)] [-webkit-mask-image:radial-gradient(ellipse_at_center,black_40%,transparent_85%)]">
                    <div className="max-w-md space-y-6">
                        <div className="flex items-center gap-1">
                            <div className="grid size-10 shrink-0 place-items-center rounded-lg border bg-muted/40">
                                <span className="text-sm font-semibold text-[#0B9944]">
                                    01
                                </span>
                            </div>

                            <div className="relative flex flex-1 items-center justify-center">
                                <AnimatedTimelineLine />

                                <span className="absolute rounded-full bg-background px-2 text-xs font-medium text-muted-foreground">
                                    To
                                </span>
                            </div>

                            <div className="grid size-10 shrink-0 place-items-center rounded-lg border bg-muted/40">
                                <span className="text-sm font-semibold text-[#0B9944]">
                                    04
                                </span>
                            </div>
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-3xl font-semibold tracking-tight">
                                A thoughtful process,
                                <br />
                                built around your business.
                            </h3>

                            <p className="text-muted-foreground">
                                Every project is different, but our approach
                                stays focused on one thing: understanding what
                                you need and building technology that works
                                for the way your business operates.
                            </p>
                        </div>

                        <div className="flex flex-wrap gap-2">
                            {[
                                "Discover",
                                "Design",
                                "Build",
                                "Launch",
                            ].map((item) => (
                                <span
                                    key={item}
                                    className="rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground"
                                >
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default OurApproach;
