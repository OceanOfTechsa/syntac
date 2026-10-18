import React from 'react';
import {Metadata} from "next";

import {IndustriesFaqs} from "@/data/faqs";
import Faq from "@/components/site/sections/home/faq";
import SectionDivider from "@/components/site/section-devider";
import {IndustriesPageMetadata} from "@/utils/Site/sitePageMetadata";
import Industries from "@/components/site/sections/industries/industries";
import HeroSection from "@/components/site/sections/industries/hero-section";
import TestimonialsSection from "@/components/site/sections/home/testimonials";

export const metadata: Metadata = IndustriesPageMetadata;

const IndustriesPage = () => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <SectionDivider>
                <HeroSection data-divider />
                <Industries data-divider />
                <TestimonialsSection data-divider />
                <Faq faqs={IndustriesFaqs} data-divider />
            </SectionDivider>
        </div>
    )
}
export default IndustriesPage
