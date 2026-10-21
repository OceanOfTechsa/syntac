import {Metadata} from "next";

import {TechnologiesFaqs} from "@/data/faqs";
import Faq from "@/components/site/sections/home/faq";
import SectionDivider from "@/components/site/section-devider";
import Stack from "@/components/site/sections/technologies/stack";
import {TechnologiesPageMetadata} from "@/utils/Site/sitePageMetadata";
import TestimonialsSection from "@/components/site/sections/home/testimonials";
import OurStrongSides from "@/components/site/sections/technologies/our-strong-sides";
import LogoOrbitSection from "@/components/site/sections/technologies/logo-orbit-section";
import TechnologySpotlight from "@/components/site/sections/technologies/technology-spotlight";

export const metadata: Metadata = TechnologiesPageMetadata;

const TechnologiesPage = () => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <SectionDivider>
                <LogoOrbitSection
                    title="Built on tools you already trust"
                    description="From .NET and SQL Server to React and GitHub Actions, we work with the technologies your business can rely on."
                    ctaLabel="See our stack"
                    ctaHref="#stack"

                    data-divider
                />
                <Stack data-divider />
                <TechnologySpotlight data-divider/>
                <OurStrongSides data-divider />
                <TestimonialsSection data-divider/>
                <Faq faqs={TechnologiesFaqs} data-divider/>
            </SectionDivider>
        </div>
    )
}
export default TechnologiesPage
