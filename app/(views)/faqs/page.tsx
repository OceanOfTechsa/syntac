import React from 'react'

import {allFaqs} from "@/data/faq-categories";
import FaqList from "@/components/site/sections/faq/faq";
import SectionDivider from "@/components/site/section-devider";
import HeroSection from "@/components/site/sections/faq/hero-section";

const FaqPage = () => {
    return (
        <div className={'flex flex-col w-full p-0 '}>
            <SectionDivider>
                <HeroSection data-divider />
                <FaqList faqs={allFaqs} data-divider />
            </SectionDivider>
        </div>
    )
}
export default FaqPage
