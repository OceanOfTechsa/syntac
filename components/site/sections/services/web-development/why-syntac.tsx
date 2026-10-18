
import React from "react";
import SectionHeader from "@/components/site/shared/section-header";
import {
    Code2,
    Gauge,
    LayoutTemplate,
    ShieldCheck,
} from "lucide-react";

const WhySyntac = () => {
    return (
        <section
            id="why-syntac"
            className="flex flex-col items-center justify-center space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="Why Work With Us"
                title="Web Experiences Built Around Your Business"
                markedWord="Business"
                desc="Your website should do more than look good. We combine thoughtful design, clean code, and reliable engineering to create web experiences that engage your audience, support your goals, and grow with your business."
            />

            <div className="grid w-full divide-dashed border-y border-dashed max-xl:divide-y md:grid-cols-2 md:divide-x xl:grid-cols-4">
                {/* Purposeful Design */}
                <div className="flex items-center gap-3.5 bg-linear-to-r from-muted to-transparent px-3 py-8 transition-colors hover:bg-accent/40">
                    <div className="bg-background grid size-12 shrink-0 place-items-center rounded-lg border max-lg:hidden">
                        <LayoutTemplate className="size-6" />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <span className="font-kalam font-medium text-muted-foreground">
                            Purposeful Design
                        </span>

                        <h3 className="text-lg font-semibold">
                            Designed for Your Audience
                        </h3>
                    </div>
                </div>

                {/* Custom Development */}
                <div className="flex items-center gap-3.5 px-3 py-8 transition-colors hover:bg-accent/40">
                    <div className="bg-background grid size-12 shrink-0 place-items-center rounded-lg border max-lg:hidden">
                        <Code2 className="size-6" />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <span className="font-kalam font-medium text-muted-foreground">
                            Custom Development
                        </span>

                        <h3 className="text-lg font-semibold">
                            Built Around Your Needs
                        </h3>
                    </div>
                </div>

                {/* Performance */}
                <div className="flex items-center gap-3.5 px-3 py-8 transition-colors hover:bg-accent/40">
                    <div className="bg-background grid size-12 shrink-0 place-items-center rounded-lg border max-lg:hidden">
                        <Gauge className="size-6" />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <span className="font-kalam font-medium text-muted-foreground">
                            Performance Focused
                        </span>

                        <h3 className="text-lg font-semibold">
                            Fast and Responsive
                        </h3>
                    </div>
                </div>

                {/* Quality */}
                <div className="flex items-center gap-3.5 px-3 py-8 transition-colors hover:bg-accent/40">
                    <div className="bg-background grid size-12 shrink-0 place-items-center rounded-lg border max-lg:hidden">
                        <ShieldCheck className="size-6" />
                    </div>

                    <div className="flex flex-col gap-0.5">
                        <span className="font-kalam font-medium text-muted-foreground">
                            Quality-Driven
                        </span>

                        <h3 className="text-lg font-semibold">
                            Built to Grow With You
                        </h3>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default WhySyntac;
