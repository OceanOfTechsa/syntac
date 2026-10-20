import {JSX} from 'react'
import {Metadata} from "next";

import {allFaqs} from "@/data/faq-categories";
import FaqList from "@/components/site/sections/faq/faq";
import SectionDivider from "@/components/site/section-devider";
import HeroSection from "@/components/site/sections/faq/hero-section";

export const metadata:  Metadata = {title: 'FAQs'};

const FAQsPage = (): JSX.Element => {
    return (
        <div className={'flex flex-col w-full p-0 '}>
            <SectionDivider>
                <HeroSection data-divider />
                <FaqList faqs={allFaqs} data-divider />
            </SectionDivider>
        </div>
    )
}
export default FAQsPage;
