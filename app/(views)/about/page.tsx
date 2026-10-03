import React from 'react'
import SectionDivider from "@/components/site/section-devider";
import HeroSection from "@/components/site/sections/about/hero-section";

const AboutPage = () => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <SectionDivider>
                <HeroSection data-divider />
            </SectionDivider>
        </div>
    )
}
export default AboutPage
