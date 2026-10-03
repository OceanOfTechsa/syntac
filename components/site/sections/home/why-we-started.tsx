import SectionHeader from "@/components/site/shared/section-header";
import React from "react";
import AppSettings from "@/utils/AppSettings";

const WhyWeStarted = () => {
    return (
        <section id={'why-we-started'}>
            <div
                className={'mx-auto max-w-235 space-y-6 px-4 py-8 sm:px-6 sm:py-16 lg:border-x lg:border-dashed lg:px-12 lg:py-24'}>
                <SectionHeader
                    preTitle={`Why We Built ${AppSettings.COMPANY_NAME}?`}
                    showTitle={false}
                    showDescription={false}
                />

                <p className="text-lg">
                    We started SYNTAC because we believe technology should adapt to the way a business works — not force a business to adapt to technology. Every business has different challenges, processes, and goals, which is why we build
                    {" "}
                    <a href="/services" className="underline">
                        tailored digital solutions
                    </a>
                    {" "}around the way our clients actually work.
                </p>

                <p className="text-lg">
                    We saw too many businesses settling for generic websites, disconnected tools, and software that was never designed around their specific needs. We wanted to create something different — a company that takes the time to understand the problem before building the solution, as you can see through our
                    {" "}
                    <a href="/work" className="underline">
                        work
                    </a>
                    {" "}and the solutions we've delivered.
                </p>

                <p className="text-lg">
                    We believe custom software should not be reserved for large organisations with large budgets. Our goal is to make thoughtfully engineered, scalable technology accessible to businesses that want to improve how they operate, serve their customers, and grow. Explore our
                    {" "}
                    <a href="/services" className="underline">
                        services
                    </a>
                    {" "}to see how we can help turn those goals into technology.
                </p>

                <p className="text-lg">
                    We also wanted to build technology that lasts. A project should not simply work on the day it launches — it should be maintainable, scalable, and ready to evolve as the business changes and new opportunities emerge. That's why we focus on building solutions with the
                    {" "}
                    <a href="/about" className="underline">
                        long term
                    </a>
                    {" "}in mind.
                </p>

                <p className="text-lg">
                    Most importantly, we wanted to build long-term partnerships rather than simply deliver projects. We take the time to understand the businesses we work with, solve the right problems, and build technology that continues to create value long after launch. If you have an idea, challenge, or project you'd like to explore, we'd love to
                    {" "}
                    <a href="/contact" className="underline">
                        start a conversation
                    </a>
                    {" "}with you.
                </p>
                <div className="flex flex-wrap justify-center gap-4 max-sm:flex-col sm:items-center">
                    <div className="flex grow items-center justify-start gap-3">
                        <span data-slot="avatar" data-size="default" className="group/avatar relative flex shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 size-11 shadow-md">
                            <img data-slot="avatar-image" className="aspect-square size-full" alt="Ajay Patel" src="https://res.cloudinary.com/lbge76mf/image/upload/v1790977929/sithu.jpg"/>
                        </span>
                        <div className="flex flex-col items-start gap-0.5">
                            <div className="flex items-center gap-4">
                                <h3 className="font-semibold">Sithuliso Zulu</h3>
                                <div className="flex items-center gap-2">
                                    <a target="_blank" rel="noopener noreferrer" className="not-hover:text-muted-foreground" href="https://x.com/ajaypatel_aj">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                                             className="size-4">
                                            <path fill="currentColor"
                                                  d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"></path>
                                        </svg>
                                        <span className="sr-only">X</span>
                                    </a>
                                    <a target="_blank" rel="noopener noreferrer" className="not-hover:text-muted-foreground" href="https://www.linkedin.com/in/ajaypatel1806">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                            fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                            strokeLinejoin="round" aria-hidden="true" className="size-4">
                                            <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"> </path>
                                            <rect width="4" height="12" x="2" y="9"></rect>
                                            <circle cx="4" cy="4" r="2"></circle>
                                        </svg>
                                    <span className="sr-only">LinkedIn</span></a></div>
                            </div>
                            <p className="text-muted-foreground text-sm">Developer &amp; Co-founder</p></div>
                    </div>
                    <div className="flex grow items-center justify-end gap-3 max-sm:flex-row-reverse">
                        <div className="flex flex-col items-start gap-0.5 sm:items-end">
                            <div className="flex items-center gap-4">
                                <div className="flex items-center gap-2">
                                    <a target="_blank" rel="noopener noreferrer" className="not-hover:text-muted-foreground" href="https://x.com/imananddesigner">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24"
                                             className="size-4">
                                            <path fill="currentColor"
                                                  d="M10.488 14.651L15.25 21h7l-7.858-10.478L20.93 3h-2.65l-5.117 5.886L8.75 3h-7l7.51 10.015L2.32 21h2.65zM16.25 19L5.75 5h2l10.5 14z"></path>
                                        </svg>
                                        <span className="sr-only">X</span>
                                    </a>
                                    <a target="_blank" rel="noopener noreferrer"  className="not-hover:text-muted-foreground" href="https://www.linkedin.com/in/anand-patel-89503276">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                             fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                             strokeLinejoin="round" aria-hidden="true" className="size-4">
                                            <path
                                                d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"></path>
                                            <rect width="4" height="12" x="2" y="9"></rect>
                                            <circle cx="4" cy="4" r="2"></circle>
                                        </svg>
                                    <span className="sr-only">LinkedIn</span>
                                    </a>
                                </div>
                                <h3 className="font-semibold">Sanele Jeza</h3>
                            </div>
                            <p className="text-muted-foreground text-sm">Developer &amp; Co-founder</p></div>
                        <span data-slot="avatar" data-size="default"
                              className="group/avatar relative flex shrink-0 overflow-hidden rounded-full select-none data-[size=lg]:size-10 data-[size=sm]:size-6 size-11 shadow-md"><img
                            data-slot="avatar-image" className="aspect-square size-full" alt="Anand Patel"
                            src="https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-33.png?width=44&amp;format=auto"/></span>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default WhyWeStarted;
