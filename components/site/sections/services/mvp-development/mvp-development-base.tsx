import React from 'react'

import SectionDivider from "@/components/site/section-devider";
import Cta from "@/components/site/sections/services/shared/cta";
import HeroSection from "@/components/site/sections/services/shared/hero-section";

const MvpDevelopmentBase = () => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <SectionDivider>
                <HeroSection
                    data-divider
                    service="MVP Development"
                    serviceText="From idea to a working product"
                    useFlipWords={true}
                    flipWords={[
                        "Startup Ideas",
                        "Minimum Viable Products",
                        "SaaS Platforms",
                        "Product Prototypes",
                        "Digital Products",
                    ]}
                    children={<Cta />}
                    title="MVP development for"
                    paragraph="We turn your ideas into functional, market-ready minimum viable products (MVPs). From validating a concept to building your first working product, we focus on essential features, practical development, and scalable foundations that help you test assumptions, gather user feedback, and move forward with confidence."
                />
            </SectionDivider>
        </div>
    )
}
export default MvpDevelopmentBase
