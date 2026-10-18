import TimelineItem from "@/components/site/shared/time-line-item";
import BadgeAccordion from "@/components/site/shared/badge-accordion";
import {accordionDataV1_4_0} from "@/data/changelog-data";
import {technologyPath} from "@/data/technologies";

function V1_5_0() {
    return (
        <div>
            <TimelineItem date="2024 — 2025" version="Beyond Websites">
                <div className="space-y-4">
                    <div className="space-y-3">
                        <h3 className="text-xl font-semibold">
                            Beyond Websites
                        </h3>

                        <p className="text-muted-foreground text-sm">
                            Our technical direction continued to grow as we
                            moved further into custom software, business
                            systems, and modern web applications.
                        </p>
                    </div>

                    <div className="flex flex-wrap items-center gap-2">
                        {/* .NET Core */}
                        <div className="flex items-center gap-1.5 rounded-md bg-[#512BD4]/10 px-3 py-1.5 text-[#512BD4] dark:bg-[#512BD4]/15">
                            <img
                                src={technologyPath("netcore")}
                                alt=".NET Core"
                                className="h-4.5 w-auto"
                            />
                            <span className="text-xs font-medium">
                                .NET Core
                            </span>
                        </div>

                        {/* C# */}
                        <div className="flex items-center gap-1.5 rounded-md bg-[#68217A]/10 px-3 py-1.5 text-[#68217A] dark:bg-[#68217A]/15">
                            <img
                                src={technologyPath("csharp")}
                                alt="C#"
                                className="h-4.5 w-auto"
                            />
                            <span className="text-xs font-medium">
                                C#
                            </span>
                        </div>

                        {/* React */}
                        <div className="flex items-center gap-1.5 rounded-md bg-[#61DAFB]/10 px-3 py-1.5 text-[#087EA4] dark:bg-[#61DAFB]/15 dark:text-[#61DAFB]">
                            <img
                                src={technologyPath("react")}
                                alt="React"
                                className="h-4.5 w-auto"
                            />
                            <span className="text-xs font-medium">
                                React
                            </span>
                        </div>

                        {/* TypeScript */}
                        <div className="flex items-center gap-1.5 rounded-md bg-[#3178C6]/10 px-3 py-1.5 text-[#3178C6] dark:bg-[#3178C6]/15">
                            <img
                                src={technologyPath("typescript")}
                                alt="TypeScript"
                                className="h-4.5 w-auto"
                            />
                            <span className="text-xs font-medium">
                                TypeScript
                            </span>
                        </div>

                        {/* Next.js */}
                        <div className="flex items-center gap-1.5 rounded-md bg-black/5 px-3 py-1.5 text-black dark:bg-white/10 dark:text-white">
                            <img
                                src={technologyPath("nextjs")}
                                alt="Next.js"
                                className="h-4.5 w-auto"
                            />
                            <span className="text-xs font-medium">
                                Next.js
                            </span>
                        </div>
                    </div>

                    <p className="text-muted-foreground">
                        We began working with more structured software
                        solutions and adopted technologies such as modern
                        .NET and C# to build applications that were more
                        capable, maintainable, and suited to complex business
                        requirements.
                    </p>

                    <p className="text-muted-foreground">
                        At the same time, our web development capabilities
                        continued to evolve through technologies such as
                        React, TypeScript, and Next.js, giving us a stronger
                        foundation for building modern digital experiences
                        alongside custom business software.
                    </p>

                    <p className="text-muted-foreground">
                        This was an important shift in how we thought about our
                        work — from creating websites to engineering software
                        around the way businesses operate.
                    </p>

                    <BadgeAccordion data={accordionDataV1_4_0} />
                </div>
            </TimelineItem>
        </div>
    );
}

export default V1_5_0;