import React from "react";
import {Metadata} from "next";

import {AboutFaqs} from "@/data/faqs";
import Faq from "@/components/site/sections/home/faq";
import SectionDivider from "@/components/site/section-devider";
import {OurStoryPageMetadata} from "@/utils/Site/sitePageMetadata";
import SectionHeader from "@/components/site/shared/section-header";
import TimelineSection from "@/components/site/sections/about/our-story/timeline-section";
import TestimonialsSection from "@/components/site/sections/home/testimonials";

export const metadata: Metadata = OurStoryPageMetadata;

const CompanyHistory = () => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <SectionDivider>
                <section id="company-history" data-divider>
                    <div className="mx-auto max-w-235 px-4 py-12 sm:px-6 sm:py-16 lg:border-x lg:border-dashed lg:px-12 lg:py-24">
                        <div className="mx-auto max-w-3xl pb-10">
                            <h1 className={'hidden'}>Our Story</h1>
                            <SectionHeader
                                preTitle="Our Story"
                                title="How We Got Here"
                                markedWord="Got Here"
                                desc="From a university idea in 2021 to SYNTAC today, this is the story of how our vision, technology, and way of working have evolved."
                            />
                        </div>

                        <div className="via-primary/20 mx-auto h-px w-4/5 bg-linear-to-r from-transparent to-transparent"></div>
                        <TimelineSection/>
                    </div>

                    <div className="relative z-20 w-full opacity-100 transition-opacity duration-1000">
                        {/*width for the bottom div was changed to w-full from -> w-[1905px]*/}
                        <div className="absolute left-1/2 h-px w-full 2xl:w-full -translate-x-1/2">
                            <hr className="-mb-px w-full border-dashed" />

                            <div className="relative mx-auto h-px w-full max-w-350 max-[1429px]:overflow-hidden min-[1800px]:max-w-384">
                                <span className="absolute top-1/2 left-0 z-[50] size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-xs border border-primary/20 bg-muted" />

                                <span className="absolute top-1/2 right-0 z-[50] size-2.5 translate-x-1/2 -translate-y-1/2 rotate-45 rounded-xs border border-primary/20 bg-muted" />
                            </div>
                        </div>
                    </div>
                </section>

                <TestimonialsSection data-divider/>
                <Faq faqs={AboutFaqs} data-divider/>
            </SectionDivider>
        </div>
    );
};

export default CompanyHistory;
