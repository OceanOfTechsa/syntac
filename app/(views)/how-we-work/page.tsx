import React from "react";
import {Metadata} from "next";

import {HowWeWorkFaqs} from "@/data/faqs";
import Faq from "@/components/site/sections/home/faq";
import SectionDivider from "@/components/site/section-devider";
import {HowWeWorkPageMetadata} from "@/utils/Site/sitePageMetadata";
import HeroSection from "@/components/site/sections/how-we-work/hero-section";
import OurApproach from "@/components/site/sections/how-we-work/approach-section";
import AnalyticsDetailsSection from "@/components/site/sections/how-we-work/Analytics-details-section";
import DesignSection from "@/components/site/sections/how-we-work/design-details-section";
import DevelopmentSection from "@/components/site/sections/how-we-work/development-details-section";
import DeploymentSupportSection from "@/components/site/sections/how-we-work/deployment-and-support-section";

export const metadata: Metadata = HowWeWorkPageMetadata;

const HowWeWorkPage = () => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <SectionDivider>
                <HeroSection data-divider />
                <OurApproach data-divider />
                <AnalyticsDetailsSection  data-divider />
                <DesignSection data-divider />
                <DevelopmentSection data-divider />
                <DeploymentSupportSection data-divider />
                <Faq faqs={HowWeWorkFaqs} data-divider/>
            </SectionDivider>
        </div>
    )
}
export default HowWeWorkPage;
