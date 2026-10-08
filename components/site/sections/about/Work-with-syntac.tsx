import React from "react";
import Image from "next/image";
import Link from "next/link";

import { ArrowRight } from "lucide-react";
import SectionHeader from "@/components/site/shared/section-header";
import AppSettings from "@/utils/AppSettings";

const clientJourney = [
    {
        number: "01",
        title: "Tell Us What You Need",
        description:
            "Start with a conversation about your business, goals, challenges, and what you want technology to help you achieve.",
        image: "/assets/site/about/work-with-us/image-4.webp",
        darkImage: "/assets/site/about/work-with-us/image-4-dark.webp",
    },
    {
        number: "02",
        title: "Plan the Right Solution",
        description:
            "We turn your requirements into a clear direction, defining the right approach, scope, priorities, and technology.",
        image: "/assets/site/about/work-with-us/image-6.webp",
        darkImage: "/assets/site/about/work-with-us/image-6-dark.webp",
    },
    {
        number: "03",
        title: "Design & Develop",
        description:
            "We build your solution around your business, combining thoughtful design with clean, maintainable code.",
        image: "/assets/site/about/work-with-us/image-5.webp",
        darkImage: "/assets/site/about/work-with-us/image-5-dark.webp",
    },
    {
        number: "04",
        title: "Review & Refine",
        description:
            "You stay involved throughout development, reviewing progress and providing feedback as the solution takes shape.",
        image: "/assets/site/about/work-with-us/image-7.webp",
        darkImage: "/assets/site/about/work-with-us/image-7-dark.webp",
    },
    {
        number: "05",
        title: "Launch Your Solution",
        description:
            "Once everything has been tested and refined, we prepare your website or software for a smooth and confident launch.",
        image: "/assets/site/about/work-with-us/image-8.webp",
        darkImage: "/assets/site/about/work-with-us/image-8-dark.webp",
    },
    {
        number: "06",
        title: "Support & Evolve",
        description:
            "After launch, we can continue maintaining and improving your solution as your business, customers, and needs evolve.",
        image: "/assets/site/about/work-with-us/image-9.webp",
        darkImage: "/assets/site/about/work-with-us/image-9-dark.webp",
    },
];

const WorkWithSyntac = () => {
    return (
        <section
            id="work-with-us"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <div className="flex flex-col gap-4">
                <SectionHeader
                    preTitle={`Work with ${AppSettings.COMPANY_NAME}`}
                    title="From First Conversation to What's Next"
                    markedWord="What's Next"
                    desc="A straightforward, collaborative approach to turning your business goals into technology that works."
                />

                <div className="z-10 flex flex-wrap justify-center gap-4 px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/contact"
                        className="
                            hover:bg-[#0B9944] dark:hover:bg-[#0B9944]
                            focus-visible:border-ring focus-visible:ring-ring/50
                            inline-flex shrink-0 items-center justify-center
                            gap-2 font-medium whitespace-nowrap
                            transition-all outline-none
                            focus-visible:ring-[3px]
                            disabled:pointer-events-none disabled:opacity-50
                            [&_svg]:pointer-events-none
                            [&_svg]:shrink-0
                            [&_svg:not([class*='size-'])]:size-4
                            bg-primary text-primary-foreground
                            hover:text-white
                            h-10 px-6 rounded-lg text-base
                            shadow-sm max-[400px]:flex-1
                        "
                    >
                        Start a conversation
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            <div className="grid border-y border-dashed sm:grid-cols-2 lg:grid-cols-3">
                {clientJourney.map((item, index) => (
                    <div
                        key={item.number}
                        className={[
                            "flex flex-col items-center justify-between gap-2.5",
                            "overflow-hidden border-dashed px-4 pt-6",
                            "transition-colors duration-500 ",
                            "lg:border-r lg:border-b",
                            "max-sm:border-b",
                            index % 2 === 0
                                ? "min-[500px]:max-lg:border-r"
                                : "",
                            index === 2 || index === 5
                                ? "lg:border-r-0"
                                : "",
                        ].join(" ")}
                    >
                        <div className="flex flex-col gap-3.5 text-center">
                            <div className="flex items-center justify-center gap-2">
                                <h3 className="text-xl font-semibold">
                                    {item.title}
                                </h3>
                            </div>

                            <p className="text-muted-foreground">
                                {item.description}
                            </p>
                        </div>

                        <div className="mt-2 w-full overflow-hidden">
                            <Image
                                src={item.image}
                                alt={item.title}
                                width={320}
                                height={240}
                                className="mx-auto w-75.5 transition-transform duration-500 hover:scale-110 dark:hidden"
                            />

                            <Image
                                src={item.darkImage}
                                alt={item.title}
                                width={320}
                                height={240}
                                className="mx-auto hidden w-75.5 transition-transform duration-500 hover:scale-110 dark:block"
                            />
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default WorkWithSyntac;
