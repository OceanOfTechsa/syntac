import React from "react";

import SectionDivider from "@/components/site/section-devider";
import PagefindSearch from "@/components/site/sections/faq/pagefind-search";


interface PageProps {
    searchParams: Promise<{ q?: string }>;
}

const Page = async ({ searchParams }: PageProps) => {
    const { q } = await searchParams;

    return (
        <div className="flex w-full flex-col p-0">
            <SectionDivider>
                <section className="flex-1 px-6 py-12 md:py-20 lg:py-24" data-divider>
                    <p className="text-primary font-kalam mb-4 inline-block font-medium underline underline-offset-6">
                        FAQ Search
                    </p>

                    <h2 className="mb-8 text-2xl font-semibold sm:text-3xl lg:text-4xl">
                        Find Answers to Your{" "}
                        <span className="relative">
                            Questions
                            <svg
                                height="8"
                                width="250"
                                fill="none"
                                aria-hidden="true"
                                className="absolute -bottom-1.5 left-1/12 h-2 w-5/6"
                            >
                                <path
                                    d="M2 6.75068C53.4722 -1.10509 368.533 2.14284 451.5 6.75085"
                                    stroke="currentColor"
                                    strokeWidth="2.5"
                                    strokeLinecap="round"
                                />
                            </svg>
                        </span>
                    </h2>

                    <PagefindSearch initialQuery={q} />
                </section>
            </SectionDivider>
        </div>
    );
};

export default Page;