import { Metadata } from "next";

import {CasesFaqs} from "@/data/faqs";
import Faq from "@/components/site/sections/home/faq";
import SectionDivider from "@/components/site/section-devider";
import {CasesPageMetadata} from "@/utils/Site/sitePageMetadata";
import CasesSection from "@/components/site/sections/cases/cases";
import HeroSection from "@/components/site/sections/cases/hero-section";
import TestimonialsSection from "@/components/site/sections/home/testimonials";

export const metadata: Metadata = CasesPageMetadata;

const CasesPage = () => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <SectionDivider>
                <HeroSection data-divider />
                <CasesSection data-divider />
                <TestimonialsSection data-divider/>
                <Faq faqs={CasesFaqs} data-divider/>
            </SectionDivider>
        </div>
    )
}
export default CasesPage
