import React from "react";
import Image from "next/image";
import {
    Accessibility,
    Lightbulb,
    MessageCircle,
    Users,
} from "lucide-react";

import SectionHeader from "@/components/site/shared/section-header";
import SyntacStats from "@/components/site/sections/about/stats";
import AppSettings from "@/utils/AppSettings";
import {AboutStats} from "@/utils/Site/stats";

const WhatIsSyntac = () => {
    return (
        <section
            id="about-syntac"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle={`What is ${AppSettings.COMPANY_NAME}?`}
                title="Technology Built Around People"
                markedWord="People"
                desc={`${AppSettings.COMPANY_NAME} is a software and digital solutions company focused on creating thoughtful technology that helps businesses work better, connect with their customers, and grow with confidence.`}
            />

            <div>
                <div className="grid border-y border-dashed md:grid-cols-2">
                    {/* Brand */}
                    <div className="flex items-center justify-center px-6 py-12 max-md:hidden lg:px-8">
                        <div className="flex items-center gap-5">
                            <Image
                                width={34}
                                height={34}
                                src="/brand/syntac-brand-kit/logos/icon/png/syntac-icon-transparent.png"
                                alt="SYNTAC"
                                className="block w-auto"
                                aria-hidden="true"
                            />

                            <span className="text-4xl font-semibold">
                                syntac/software
                            </span>
                        </div>
                    </div>

                    {/* Values */}
                    <div className="flex flex-col divide-y divide-dashed border-dashed md:border-l">
                        {/* Innovation */}
                        <div
                            className="flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 hover:bg-muted/40 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-2">
                                <Lightbulb
                                    size={22}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <h3 className="text-xl font-medium">
                                    Innovation-driven
                                </h3>
                            </div>

                            <p className="text-muted-foreground">
                                We explore better ways to solve problems,
                                combining modern technology with thoughtful
                                ideas to create solutions that move businesses
                                forward.
                            </p>
                        </div>

                        {/* Accessibility */}
                        <div
                            className="flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 hover:bg-muted/40 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-2">
                                <Accessibility
                                    size={22}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <h3 className="text-xl font-medium">
                                    Accessible by design
                                </h3>
                            </div>

                            <p className="text-muted-foreground">
                                Technology should work for everyone. We create
                                clear, intuitive, and accessible digital
                                experiences that make technology easier to use.
                            </p>
                        </div>

                        {/* Transparency */}
                        <div
                            className="flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 hover:bg-muted/40 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-2">
                                <MessageCircle
                                    size={22}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <h3 className="text-xl font-medium">
                                    Transparent approach
                                </h3>
                            </div>

                            <p className="text-muted-foreground">
                                Great work starts with trust. From planning and
                                development to delivery, we keep communication
                                clear and expectations aligned.
                            </p>
                        </div>

                        {/* Collaboration */}
                        <div
                            className="flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 hover:bg-muted/40 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-2">
                                <Users
                                    size={22}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <h3 className="text-xl font-medium">
                                    Built together
                                </h3>
                            </div>

                            <p className="text-muted-foreground">
                                The best solutions come from collaboration. We
                                bring our technical expertise together with
                                your knowledge of your business to build with
                                purpose.
                            </p>
                        </div>
                    </div>
                </div>

                {/* What makes SYNTAC different */}
                <div className="flex flex-col gap-6 border-b border-dashed px-4 py-10 sm:px-6 lg:px-8">
                    <span className="font-kalam text-center text-lg font-medium underline underline-offset-2">
                        What guides us
                    </span>

                    <div className="text-muted-foreground flex flex-wrap gap-3.5 text-lg sm:justify-center">
                        <div className="flex items-center gap-1">
                            <span aria-hidden="true">•</span>
                            Purposeful technology
                        </div>

                        <div className="flex items-center gap-1">
                            <span aria-hidden="true">•</span>
                            Clear communication
                        </div>

                        <div className="flex items-center gap-1">
                            <span aria-hidden="true">•</span>
                            Hand-written solutions
                        </div>

                        <div className="flex items-center gap-1">
                            <span aria-hidden="true">•</span>
                            Built to evolve
                        </div>
                    </div>
                </div>
            </div>

            <h2 className="text-center text-2xl font-semibold sm:text-3xl">{AppSettings.COMPANY_NAME} Software Stats</h2>
            <SyntacStats stats={AboutStats} />
            
        </section>
    );
};

export default WhatIsSyntac;