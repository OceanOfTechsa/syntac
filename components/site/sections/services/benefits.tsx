import React from "react";
import Image from "next/image";
import {
    BriefcaseBusiness,
    Layers3,
    UsersRound,
    Cpu,
} from "lucide-react";

import SectionHeader from "@/components/site/shared/section-header";
import AppSettings from "@/utils/AppSettings";

const benefits = [
    {
        icon: BriefcaseBusiness,
        title: "Flexible work terms",
        description:
            "We can adjust our terms according to your project needs and goals – fixed budget basis, Time and Materials framework, weekly budget, etc. Let’s discuss and find what would work best for you.",
    },
    {
        icon: Layers3,
        title: "Full spectrum of services",
        description:
            "From an idea’s evaluation to its implementation. From a quick logo design concept to a complex development project.",
    },
    {
        icon: UsersRound,
        title: "We don’t outsource work to others",
        description:
            "All team members are our full-time employees. It allows us to be sure of the quality of work we deliver, stick to internal standards, and decrease the cost of communication.",
    },
    {
        icon: Cpu,
        title: "We take the most out of technology",
        description:
            "Unit and integration testing, automated CI/CD workflow, free access to our project management system as well as development and staging environments – these are only some of the bonuses of working with us.",
    },
];

const Benefits = () => {
    return (
        <section
            id="benefits"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="Why Work With Us?"
                title="Built Around Better Collaboration"
                markedWord="Collaboration"
                desc="We combine flexible engagement, broad capabilities, an in-house team, and modern development practices to make working with us straightforward and effective."
            />

            <div className="grid border-y border-dashed sm:grid-cols-2 lg:grid-cols-3">
                {/* Benefits intro */}
                <div className="flex min-h-60 items-center justify-center border-dashed px-6 py-12 sm:border-r lg:px-8">
                    <h3 className="max-w-xs text-center text-2xl font-semibold sm:text-3xl">
                        Benefits of working with us
                    </h3>
                </div>

                {/* Flexible work terms */}
                <div className="flex min-h-60 flex-col gap-4 border-dashed px-4 py-6  sm:px-6 lg:px-8 lg:border-r">
                    <div className="flex items-center gap-4">
                        <div className="grid size-8.5 place-items-center rounded-md bg-muted ">
                            <BriefcaseBusiness
                                className="size-5.5 text-primary"
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        </div>

                        <h3 className="text-xl font-medium">
                            {benefits[0].title}
                        </h3>
                    </div>

                    <p className="text-muted-foreground">
                        {benefits[0].description}
                    </p>
                </div>

                {/* Full spectrum of services */}
                <div className="flex min-h-60 flex-col gap-4 border-dashed px-4 py-6  sm:border-r sm:px-6 lg:px-8">
                    <div className="flex items-center gap-4">
                        <div className="grid size-8.5 place-items-center rounded-md bg-muted">
                            <Layers3
                                className="size-5.5 text-primary"
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        </div>

                        <h3 className="text-xl font-medium">
                            {benefits[1].title}
                        </h3>
                    </div>

                    <p className="text-muted-foreground">
                        {benefits[1].description}
                    </p>
                </div>

                {/* We don't outsource */}
                <div className="flex min-h-60 flex-col gap-4 border-dashed px-4 py-6  sm:px-6 sm:border-t sm:border-r lg:px-8">
                    <div className="flex items-center gap-4">
                        <div className="grid size-8.5 place-items-center rounded-md bg-muted">
                            <UsersRound
                                className="size-5.5 text-primary"
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        </div>

                        <h3 className="text-xl font-medium">
                            {benefits[2].title}
                        </h3>
                    </div>

                    <p className="text-muted-foreground">
                        {benefits[2].description}
                    </p>
                </div>

                {/* Technology */}
                <div className="flex min-h-60 flex-col gap-4 border-dashed px-4 py-6  sm:px-6 lg:px-8 sm:border-r sm:border-t">
                    <div className="flex items-center gap-4">
                        <div className="grid size-8.5 place-items-center rounded-md bg-muted">
                            <Cpu
                                className="size-5.5 text-primary"
                                strokeWidth={2}
                                aria-hidden="true"
                            />
                        </div>

                        <h3 className="text-xl font-medium">
                            {benefits[3].title}
                        </h3>
                    </div>

                    <p className="text-muted-foreground">
                        {benefits[3].description}
                    </p>
                </div>

                {/* SYNTAC */}
                <div className="flex min-h-60 items-center justify-center px-6 py-12 sm:col-span-2 lg:col-span-1 lg:px-8 border-dashed sm:border-t">
                    <div className="flex items-center gap-5 ">
                        <Image
                            width={34}
                            height={34}
                            src="/brand/syntac-brand-kit/logos/icon/png/syntac-icon-transparent.png"
                            alt="SYNTAC"
                            className="block w-auto"
                            aria-hidden="true"
                        />

                        <span className="text-4xl font-semibold">
                            {AppSettings.COMPANY_NAME.toLocaleLowerCase()}/software
                        </span>
                    </div>
                </div>
            </div>

            {/* What makes SYNTAC different */}
            <div className="flex flex-col gap-6 border-b border-dashed px-4 py-10 sm:px-6 lg:px-8">
                <span className="font-kalam text-center text-lg font-medium underline underline-offset-2">
                    How we build
                </span>

                <div className="text-muted-foreground mx-auto max-w-4xl text-center text-lg">
                    At {AppSettings.COMPANY_NAME}, we build software around the needs of your business and the
                    people who use it. We follow secure-by-design practices, privacy-aware
                    development, accessibility principles, quality assurance, and modern
                    DevOps workflows throughout the development process. From planning and
                    design to deployment and ongoing improvements, every solution is built
                    to be secure, reliable, scalable, easy to use, and trusted by the people
                    it serves.
                </div>
            </div>
        </section>
    );
};

export default Benefits;