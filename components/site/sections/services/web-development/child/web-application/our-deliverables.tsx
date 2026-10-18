import React from "react";
import { FileCode2, BookOpenText, CloudCog } from "lucide-react";

import SectionHeader from "@/components/site/shared/section-header";

const deliverables = [
    {
        icon: FileCode2,
        title: "Production-Ready Source Code",
        paragraphs: [
            "At the end of the development phase, you receive the complete, production-ready source code.",
            "This fully tested codebase is optimized for deployment and ready to launch in your live environment.",
        ],
    },
    {
        icon: BookOpenText,
        title: "API & System Documentation",
        paragraphs: [
            "Detailed, standardized technical manuals (such as Swagger/OpenAPI) to facilitate future developer onboarding and third-party integrations.",
        ],
    },
    {
        icon: CloudCog,
        title: "Configured Cloud Infrastructure",
        paragraphs: [
            "Fully provisioned and secured cloud hosting environments optimized for immediate deployment and future horizontal scaling.",
        ],
    },
];

const OurDeliverables = () => {
    return (
        <section
            id="our-deliverables"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="Our deliverables"
                title="Tangible engineering outputs"
                markedWord="engineering outputs"
                desc="We hand over a fully functional, exhaustively documented software solution that is secure, optimized, and entirely ready to drive your business operations forward."
            />

            <div className="grid grid-cols-1 divide-y divide-dashed border-y border-dashed md:grid-cols-3 md:divide-x md:divide-y-0">
                {deliverables.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="flex flex-col gap-4 px-4 py-6 transition-colors duration-200 hover:bg-muted/30 sm:px-6 lg:px-8"
                        >
                            <div className="flex items-center gap-4">
                                <div className="bg-muted grid size-8.5 shrink-0 place-items-center rounded-md">
                                    <Icon
                                        className="text-primary size-5.5"
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                </div>

                                <h3 className="text-xl font-medium">
                                    {item.title}
                                </h3>
                            </div>

                            <div className="text-muted-foreground flex flex-col gap-3">
                                {item.paragraphs.map((text) => (
                                    <p key={text}>{text}</p>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default OurDeliverables;