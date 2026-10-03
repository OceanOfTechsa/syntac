import { JSX } from "react";
import { Metadata } from "next";

import HeroSection from "@/components/site/sections/home/hero-section";
import ShowcaseSection from "@/components/site/sections/home/show-case-section";
import WhatWeDo from "@/components/site/sections/home/what-we-do";
import WhySyntac from "@/components/site/sections/home/why-syntac";
import Solutions from "@/components/site/sections/home/solutions";
import ProjectEstimator from "@/components/site/sections/home/project-estimator";
import Faq from "@/components/site/sections/home/faq";
import SectionDivider from "@/components/site/section-devider";
import TestimonialsSection from "@/components/site/sections/home/testimonials";
import WhyWeStarted from "@/components/site/sections/home/why-we-started";

export const metadata: Metadata = {
    title: "Syntac Software",
};

const HomePage = (): JSX.Element => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <SectionDivider>
                <HeroSection />
                <ShowcaseSection data-divider/>
                <WhatWeDo data-divider/>
                <WhySyntac data-divider/>
                <Solutions data-divider/>
                <ProjectEstimator data-divider/>
                <TestimonialsSection data-divider/>
                <WhyWeStarted data-divider/>
                <Faq data-divider/>
            </SectionDivider>
        </div>
    );
};

export default HomePage;