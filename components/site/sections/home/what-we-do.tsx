"use client";

import { useState } from "react";
import SectionHeader from "@/components/site/shared/section-header";
import OrbitingLogos from "@/components/site/shared/orbiting-logos";
import { technologies } from "@/data/technologies";
import { StackedCards } from "@/components/site/shared/stacked-cards";
import { type IProcessStep, processSteps } from "@/data/process-steps";
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogDescription,
} from "@/components/ui/dialog";
import ConnectedShowcase from "@/components/site/shared/connected-showcase";
import {TimelineFlow} from "@/components/site/Timeline-flow";
import {CalendarDays, ListChecks, Rocket} from "lucide-react";
import {ModularGrid} from "@/components/site/shared/modular-grid";

const WhatWeDo = () => {
    const [selected, setSelected] = useState<IProcessStep | null>(null);

    return (
        <section
            id="what-we-do"
            className="flex flex-col items-center justify-center space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="What We Do"
                title="Technology Built Around Your Business"
                markedWord="Business"
                desc="We turn business challenges into practical digital solutions that make your work easier, your business stronger, and your future more scalable."
            />

            <div className="flex w-full flex-col items-center justify-center">
                {/* Main value proposition */}
                <div className="grid grid-cols-5 divide-dashed border-y border-dashed max-lg:divide-y lg:divide-x">
                    <div className="col-span-full flex h-[26rem] sm:h-[22rem] flex-col justify-between gap-6 overflow-hidden px-4 pt-8 sm:px-6 lg:col-span-2 lg:px-8">
                        <div className="space-y-3.5 px-4 sm:px-6 lg:px-8">
                            <h3 className="text-xl font-semibold">
                                We turn idea into a solution, step by step.
                            </h3>

                            <p className="text-pretty text-muted-foreground">
                                From the first conversation to final delivery, we follow a clear
                                and collaborative process designed to understand your needs,
                                build the right solution, and deliver technology that works for
                                your business.
                            </p>
                        </div>

                        <StackedCards
                            hold={2.8}
                            offsetY={-20}
                            className="relative mx-auto mt-48 flex h-68 w-full max-w-lg items-end sm:px-16 lg:px-8"
                        >
                            {processSteps.map((step: IProcessStep) => {
                                const Icon = step.icon;

                                return (
                                    <div
                                        data-cursor-hide
                                        key={step.number}
                                        className="absolute inset-x-5 h-37.5 cursor-pointer"
                                        onClick={() => setSelected(step)}
                                    >
                                        <div className="group transition-all duration-500 relative flex h-full w-full flex-col rounded-xl border bg-card p-3 transition-all duration-300 hover:border-primary/30 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.2)] dark:shadow-[0_25px_50px_-12px_rgba(255,255,255,0.08)]" >
                                            {/* Icon + Title */}
                                            <div className="mb-2 flex w-full items-center gap-3">
                                                <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-muted/50 text-foreground transition-colors group-hover:border-primary/40 group-hover:bg-primary/5 group-hover:text-primary">
                                                    <Icon className="size-5" strokeWidth={2} />
                                                </div>

                                                <div className="flex min-w-0 flex-col">
                                                      <span className="text-xs font-medium text-muted-foreground">
                                                        {step.number}
                                                      </span>

                                                    <h3 className="text-base font-semibold tracking-tight">
                                                        {step.title}
                                                    </h3>
                                                </div>
                                            </div>

                                            {/* Description */}
                                            <p className="line-clamp-2 text-sm leading-relaxed text-muted-foreground">
                                                {step.description}
                                            </p>
                                        </div>
                                    </div>
                                );
                            })}
                        </StackedCards>
                    </div>

                    <div className="relative col-span-full flex flex-col justify-between overflow-hidden px-4 sm:flex-row sm:px-6 lg:col-span-3 lg:px-8">
                        <div className="space-y-3.5 px-4 pt-8 pb-10 sm:w-1/2 sm:px-6 lg:px-8">
                            <h3 className="text-xl font-semibold">
                                Technology built for what’s next.
                            </h3>

                            <p className="text-pretty text-muted-foreground">
                                We use proven technologies to build websites and software that
                                are fast, reliable, scalable, and ready to grow with your
                                business. From modern websites and web platforms to robust
                                backend systems, every technology choice is made with
                                performance, maintainability, and your long-term goals in mind.
                            </p>
                        </div>

                        <div className="relative flex justify-center sm:mt-14 sm:justify-end">
                            <div
                                className="
                                  pointer-events-none absolute inset-y-0 -left-10 z-10 hidden w-24
                                  bg-gradient-to-r from-background via-background/70 to-transparent
                                  sm:block
                                "
                            />

                            <OrbitingLogos rings={technologies} className="" />
                        </div>
                    </div>
                </div>

                {/* Our approach */}
                <div className="grid size- divide-dashed border-b border-dashed max-lg:divide-y lg:grid-cols-3 lg:divide-x">
                    <div className="flex flex-col justify-between gap-4.5 overflow-hidden pt-8 pb-4.5 md:max-lg:w-1/2">
                        <div className={'space-y-3.5 px-4 sm:px-6 lg:px-8'}>
                            <h3 className="text-xl font-semibold">Hand-Crafted Code</h3>
                            <p className="text-muted-foreground text-pretty">
                                We write our code from the ground up instead of relying on rigid templates or unnecessary shortcuts.
                                This gives us the flexibility to build solutions around your business, requirements, and users.
                            </p>
                        </div>

                        <ConnectedShowcase
                            leftImageLight="https://cdn.shadcnstudio.com/ss-assets/landing-page/pro/ai-tools-left-image-light.png?height=220&format=auto"
                            leftImageDark="https://cdn.shadcnstudio.com/ss-assets/landing-page/pro/ai-tools-left-image-dark.png?height=220&format=auto"
                            rightImage="https://cdn.shadcnstudio.com/ss-assets/landing-page/pro/ai-tools-right-image.png?height=220&format=auto"
                        />
                    </div>

                    <div className="flex flex-col justify-between gap-6 px-4 pt-8 pb-6 sm:px-6 lg:px-8">
                        <div className={'space-y-3.5'}>
                            <h3 className="text-xl font-semibold">Clear Timelines</h3>
                            <p className="text-muted-foreground text-pretty">
                                We break projects into clear milestones and keep you informed throughout the development
                                process.
                                You’ll know what’s being worked on, what comes next, and when to expect key
                                deliverables.
                            </p>
                        </div>

                        <TimelineFlow
                            items={[
                                {
                                    icon: <CalendarDays className="size-5" />,
                                    text: "Kickoff",
                                    stops: [
                                        { label: "Scope" },
                                        { label: "Timeline" },
                                        { label: "Milestones" },
                                        { label: "Kickoff" },
                                    ],
                                },
                                {
                                    icon: <ListChecks className="size-5" />,
                                    text: "Progress",
                                    stops: [
                                        { label: "Milestone" },
                                        { label: "Update" },
                                        { label: "Review" },
                                        { label: "Next Step" },
                                    ],
                                    isLast: true
                                },
                            ]}
                            targetIcon={<Rocket className="size-5" />}
                            targetLabel="Delivered"
                            color="#f97316"
                        />
                    </div>

                    <div className="flex flex-col justify-between gap-6 px-4 pt-8 pb-6 sm:px-6 lg:px-8">
                        <div className={'space-y-3.5'}>
                            <h3 className="text-xl font-semibold">Built to Evolve</h3>
                            <p className="text-muted-foreground text-pretty">
                                We consider your future needs from the beginning, building solutions that are maintainable, scalable, and easier to extend.
                                As your business grows, your technology can grow with it.
                            </p>
                        </div>
                        <ModularGrid
                            stages={["Core", "Features", "Integrations", "Scale", "Evolve"]}
                            size={260}
                            color="#f97316"
                        />
                    </div>
                </div>
            </div>

            {/* Dialog for process step details */}
            <Dialog
                open={!!selected}
                onOpenChange={(open: boolean): false | void => !open && setSelected(null)}
            >
                <DialogContent className="sm:max-w-md">
                    {selected && (
                        <>
                            <DialogHeader>
                                <div className="mb-1 flex items-center gap-3">
                                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border bg-muted/50">
                                        <selected.icon className="size-5" strokeWidth={2} />
                                    </div>
                                    <div className="min-w-0">
                                        <span className="text-xs font-medium text-muted-foreground">
                                          {selected.number}
                                        </span>
                                        <DialogTitle className="text-left">
                                            {selected.title}
                                        </DialogTitle>
                                    </div>
                                </div>
                            </DialogHeader>

                            <DialogDescription className="text-sm leading-relaxed text-muted-foreground">
                                {selected.description}
                            </DialogDescription>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </section>
    );
};

export default WhatWeDo;