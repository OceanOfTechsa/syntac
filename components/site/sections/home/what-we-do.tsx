import React from 'react'
import SectionHeader from "@/components/site/shared/section-header";
import OrbitingLogos from "@/components/site/shared/orbiting-logos";
import {technologies} from "@/data/technologies";
import {StackedCards} from "@/components/site/shared/stacked-cards";

const WhatWeDo = () => {
    return (
        <section id={'what-we do'} className={'space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24 flex flex-col items-center justify-center'}>
            <SectionHeader
                preTitle="What We Do"
                title="Technology Built Around Your Business"
                markedWord="Business"
                desc="We turn business challenges into practical digital solutions that make your work easier, your business stronger, and your future more scalable."
            />

            <div className="flex flex-col items-center justify-center w-full">
                {/* Main value proposition */}
                <div className="grid grid-cols-5 divide-dashed border-y border-dashed max-lg:divide-y lg:divide-x">

                    <div className="col-span-full h-[20rem] flex flex-col justify-between overflow-hidden pt-8 gap-6 px-4 sm:px-6 lg:col-span-2 lg:px-8">
                        <div className={'space-y-3.5 px-4 sm:px-6 lg:px-8'}>
                            <h3 className="text-xl font-semibold">
                                We turn idea into a solution, step by step.
                            </h3>

                            <p className="text-muted-foreground text-pretty">
                                From the first conversation to final delivery, we follow a clear and collaborative process designed to understand your needs, build the right solution, and deliver technology that works for your business.
                            </p>
                        </div>

                        <StackedCards
                            hold={2.8}
                            offsetY={-10}
                            className="relative mx-auto flex h-68 w-full max-w-lg items-end mt-42 sm:px-16 lg:px-8"
                        >
                            {/* These remain position: absolute */}
                            <div className="absolute inset-x-5 h-37.5">
                                <div className="bg-card text-card-foreground flex h-full flex-col rounded-sm border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.08)]">
                                    1. ...
                                </div>
                            </div>

                            <div className="absolute inset-x-5 h-37.5">
                                <div className="bg-card text-card-foreground flex h-full flex-col rounded-sm border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.08)]">
                                    2. ...
                                </div>
                            </div>

                            <div className="absolute inset-x-5 h-37.5">
                                <div className="bg-card text-card-foreground flex h-full flex-col border rounded-sm shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.08)]">
                                    3. ...
                                </div>
                            </div>

                            <div className="absolute inset-x-5 h-37.5">
                                <div className="bg-card text-card-foreground flex h-full flex-col rounded-sm border shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.08)]">
                                    4. ...
                                </div>
                            </div>
                        </StackedCards>
                    </div>

                    <div className="relative col-span-full flex flex-col sm:flex-row justify-between overflow-hidden px-4 sm:px-6 lg:col-span-3 lg:px-8">
                        <div className="space-y-3.5 px-4 pt-8 pb-10 sm:w-1/2 sm:px-6 lg:px-8">
                            <h3 className="text-xl font-semibold">
                                Technology built for what’s next.
                            </h3>

                            <p className="text-muted-foreground text-pretty">
                                We use proven technologies to build websites and software that are fast,
                                reliable, scalable, and ready to grow with your business.
                                From modern websites and web platforms to robust backend systems,
                                every technology choice is made with performance, maintainability,
                                and your long-term goals in mind.
                            </p>
                        </div>

                        <div className="relative">
                            {/* Subtle fade */}
                            <div
                                className="
                                    pointer-events-none
                                    absolute inset-y-0 -left-12 z-10 w-24
                                    bg-gradient-to-r
                                    from-background
                                    via-background/70
                                    to-transparent
                                "
                            />

                            <OrbitingLogos
                                rings={technologies}
                                className="mt-5"
                            />
                        </div>
                    </div>
                </div>

                {/* Our approach */}
                <div className="grid divide-dashed size- border-b border-dashed max-lg:divide-y lg:grid-cols-3 lg:divide-x">

                    <div className="flex flex-col gap-8 overflow-hidden px-4 pt-8 pb-8 sm:px-6 lg:px-8">
                        <div>
                <span className="text-sm font-medium text-muted-foreground">
                    01
                </span>

                            <h3 className="mt-3 text-xl font-semibold">
                                Understand
                            </h3>

                            <p className="mt-3 text-muted-foreground">
                                We listen, ask the right questions, and uncover the
                                opportunities behind your business challenges.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between gap-8 overflow-hidden px-4 pt-8 pb-8 sm:px-6 lg:px-8">
                        <div>
                <span className="text-sm font-medium text-muted-foreground">
                    02
                </span>

                            <h3 className="mt-3 text-xl font-semibold">
                                Build
                            </h3>

                            <p className="mt-3 text-muted-foreground">
                                We design and develop a tailored solution around your
                                goals, workflows, users, and future needs.
                            </p>
                        </div>
                    </div>

                    <div className="flex flex-col justify-between gap-8 overflow-hidden px-4 pt-8 pb-8 sm:px-6 lg:px-8">
                        <div>
                <span className="text-sm font-medium text-muted-foreground">
                    03
                </span>

                            <h3 className="mt-3 text-xl font-semibold">
                                Grow
                            </h3>

                            <p className="mt-3 text-muted-foreground">
                                We create technology that can evolve with your business,
                                helping you improve, adapt, and scale over time.
                            </p>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    )
}
export default WhatWeDo
