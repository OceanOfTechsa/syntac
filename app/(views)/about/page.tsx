import React from 'react'
import {Metadata} from "next";

import {AboutFaqs} from "@/data/faqs";
import Faq from "@/components/site/sections/home/faq";
import MapSection from "@/components/site/sections/about/map";
import SectionDivider from "@/components/site/section-devider";
import {AboutUsPageMetadata} from "@/utils/Site/sitePageMetadata";
import OurStory from "@/components/site/sections/about/our-story";
import HeroSection from "@/components/site/sections/about/hero-section";
import WhatIsSyntac from "@/components/site/sections/about/what-is-syntac";
import WorkWithSyntac from "@/components/site/sections/about/Work-with-syntac";
import WhoWeWorkWith from "@/components/site/sections/about/who-we-work-with";
import TestimonialsSection from "@/components/site/sections/home/testimonials";

export const metadata: Metadata = AboutUsPageMetadata;

const AboutPage = () => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <SectionDivider>
                <HeroSection data-divider />
                <WhatIsSyntac data-divider />
                <WhoWeWorkWith data-divider />
                <WorkWithSyntac data-divider />
                <OurStory data-divider />
                <MapSection data-divider />
                <TestimonialsSection data-divider/>
                <Faq faqs={AboutFaqs} data-divider/>
            </SectionDivider>
        </div>
    )
};

export default AboutPage;
