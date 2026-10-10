import React from 'react'
import {cn} from "@/lib/utils";
import {FADED_DOTTED_BG} from "@/components/site/shared-classes";
import {Lightbulb, MoveRight} from "lucide-react";


const SolutionSection = () => {
    return (
        <section id={'solution'} className="group  overflow-hidden bg-white text-inherit dark:bg-[#0a0a0a]">
            <div className="card-inner grid h-full md:grid-cols-2">
                {/* Left */}
                <div className={cn("relative flex items-center justify-center px-6 max-md:hidden lg:px-10", FADED_DOTTED_BG)}>
                    {/* isolate keeps the glow behind the content but above the card background */}
                    <div className="relative isolate flex items-start gap-5">
                        {/* Glow: sits behind the icon and the start of the text. Dark in light mode, soft light in dark mode (animated) */}
                        <div aria-hidden className="pointer-events-none absolute left-5 rounded-full top-7 -z-10 -translate-x-1/2 -translate-y-1/2">
                            <div className="service-glow h-24 w-24 rounded-full bg-neutral-900/40 blur-2xl dark:h-18 dark:w-18 dark:bg-white/[0.07]" />
                        </div>

                        <div className="bg-muted flex size-14 shrink-0 items-center justify-center rounded-md">
                            <Lightbulb className="text-primary size-7" strokeWidth={1.6} />
                        </div>
                        <div>
                            <h3 className="text-3xl font-semibold tracking-tight">
                                The Solution
                            </h3>
                            <p className="text-muted-foreground mt-1.5 max-w-md text-sm leading-relaxed">
                                We executed a full-stack modernization of the ecosystem, transitioning the core infrastructure to a decoupled, high-availability architecture. We optimized the search algorithms and engineered scalable integration tools.
                            </p>
                        </div>
                    </div>
                </div>

                <div className="flex min-h-0 flex-col divide-y divide-dashed border-dashed md:border-l overflow-y-auto">
                    <div className="flex items-start gap-4 px-4 py-4 md:hidden sm:px-6">
                        <div className="bg-muted flex size-11 shrink-0 items-center justify-center rounded-lg">
                            <Lightbulb className="text-primary size-7" strokeWidth={1.6} />
                        </div>
                        <div>
                            <h3 className="text-xl font-semibold">
                                The Solution
                            </h3>
                            <p className="text-muted-foreground text-sm">
                                We executed a full-stack modernization of the ecosystem, transitioning the core infrastructure to a decoupled, high-availability architecture. We optimized the search algorithms and engineered scalable integration tools.
                            </p>
                        </div>
                    </div>

                    {/* Right */}
                    <div
                        className="flex flex-1 flex-col justify-center space-y-2 px-4 py-4 sm:px-6 lg:px-8"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg">
                                1
                            </div>
                            <h4 className="text-lg font-medium">Decoupled Architecture & Migration</h4>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            We transitioned the core website to an optimized WordPress CMS and migrated records into a highly secure Amazon RDS instance, giving editors complete publishing control.
                        </p>
                    </div>

                    <div
                        className="flex flex-1 flex-col justify-center space-y-2 px-4 py-4 sm:px-6 lg:px-8"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg">
                                1
                            </div>
                            <h4 className="text-lg font-medium">Decoupled Architecture & Migration</h4>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            We transitioned the core website to an optimized WordPress CMS and migrated records into a highly secure Amazon RDS instance, giving editors complete publishing control.
                        </p>
                    </div>

                    <div
                        className="flex flex-1 flex-col justify-center space-y-2 px-4 py-4 sm:px-6 lg:px-8"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg">
                                1
                            </div>
                            <h4 className="text-lg font-medium">Decoupled Architecture & Migration</h4>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            We transitioned the core website to an optimized WordPress CMS and migrated records into a highly secure Amazon RDS instance, giving editors complete publishing control.
                        </p>
                    </div>

                    <div
                        className="flex flex-1 flex-col justify-center space-y-2 px-4 py-4 sm:px-6 lg:px-8"
                    >
                        <div className="flex items-center gap-3">
                            <div className="bg-muted flex size-9 shrink-0 items-center justify-center rounded-lg">
                                1
                            </div>
                            <h4 className="text-lg font-medium">Decoupled Architecture & Migration</h4>
                        </div>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            We transitioned the core website to an optimized WordPress CMS and migrated records into a highly secure Amazon RDS instance, giving editors complete publishing control.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default SolutionSection
