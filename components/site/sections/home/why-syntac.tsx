import React from 'react'
import SectionHeader from "@/components/site/shared/section-header";
import {Code2, ShieldCheck, UsersRound, Workflow} from "lucide-react";

const WhySyntac = () => {
    return (
        <section id={'why-syntac'}
                 className="flex flex-col items-center justify-center space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24">
            <SectionHeader
                preTitle="Why SYNTAC"
                title="Technology That Moves Your Business Forward"
                markedWord="Business"
                desc="We combine thoughtful design, reliable engineering, and a business-first approach to build digital solutions that solve real problems and create lasting value."
            />

            <div className="grid w-full divide-dashed border-y border-dashed max-xl:divide-y md:grid-cols-2 md:divide-x xl:grid-cols-4">

                {/* Client-Centric */}
                <div className="flex items-center gap-3.5 bg-linear-to-r from-muted to-transparent px-3 py-8 transition-colors hover:bg-accent/40">
                    <div className="bg-background grid size-12 shrink-0 place-items-center rounded-lg border max-lg:hidden">
                        <UsersRound className="size-6" />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <span className="font-kalam text-muted-foreground font-medium">
                            Client-Centric
                        </span>

                        <h3 className="text-lg font-semibold">
                            Built Around You
                        </h3>
                    </div>
                </div>

                {/* Hand-Written Code */}
                <div className="flex items-center gap-3.5 px-3 py-8 transition-colors hover:bg-accent/40">
                    <div className="bg-background grid size-12 shrink-0 place-items-center rounded-lg border max-lg:hidden">
                        <Code2 className="size-6" />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <span className="font-kalam text-muted-foreground font-medium">
                            Hand-Written Code
                        </span>

                        <h3 className="text-lg font-semibold">
                            No Cookie-Cutter Solutions
                        </h3>
                    </div>
                </div>

                {/* Built to Evolve */}
                <div className="flex items-center gap-3.5 px-3 py-8 transition-colors hover:bg-accent/40">
                    <div className="bg-background grid size-12 shrink-0 place-items-center rounded-lg border max-lg:hidden">
                        <Workflow className="size-6" />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <span className="font-kalam text-muted-foreground font-medium">
                            Built to Evolve
                        </span>

                        <h3 className="text-lg font-semibold">
                            Ready for What’s Next
                        </h3>
                    </div>
                </div>

                {/* Quality */}
                <div className="flex items-center gap-3.5 px-3 py-8 transition-colors hover:bg-accent/40">
                    <div className="bg-background grid size-12 shrink-0 place-items-center rounded-lg border max-lg:hidden">
                        <ShieldCheck className="size-6" />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <span className="font-kalam text-muted-foreground font-medium">
                            Quality-Driven
                        </span>

                        <h3 className="text-lg font-semibold">
                            Engineered With Care
                        </h3>
                    </div>
                </div>

            </div>
        </section>
    )
}
export default WhySyntac;
