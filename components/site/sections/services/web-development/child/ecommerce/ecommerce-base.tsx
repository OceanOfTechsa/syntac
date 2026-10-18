import React from 'react'
import SectionDivider from "@/components/site/section-devider";
import Cta from "@/components/site/sections/services/shared/cta";
import HeroSection from "@/components/site/sections/services/shared/hero-section";
import WhyOurApproachWork
    from "@/components/site/sections/services/web-development/child/ecommerce/why-our-opproach-work";
import ECommerceDevelopmentApproach
    from "@/components/site/sections/services/web-development/child/ecommerce/approach-process";
import OurDeliverables from "@/components/site/sections/services/web-development/child/ecommerce/our-deliverables";
import Faq from "@/components/site/sections/home/faq";
import {BusinessWebsiteServiceFaqs} from "@/data/faqs";
import ECommerceTechnologies
    from "@/components/site/sections/services/web-development/child/ecommerce/ecommerce-technologies";

const EcommerceBase = () => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <SectionDivider>
                <HeroSection
                    data-divider
                    service="E-commerce Website Development"
                    serviceText="Online stores designed to turn products into sales"
                    useFlipWords={true}
                    flipWords={[
                        "Store",
                        "Brand",
                        "Business",
                        "Products",
                        "Vision",
                    ]}
                    children={<Cta />}
                    title="Build an online"
                    paragraph="We design and develop custom e-commerce websites that showcase your products, simplify online shopping, and help your business sell online. From product catalogues and shopping carts to secure payment integrations, we create seamless shopping experiences tailored to your business."
                />
                <WhyOurApproachWork data-divider />
                <ECommerceDevelopmentApproach data-divider />
                <OurDeliverables data-divider />
                <ECommerceTechnologies data-divider />
                <Faq faqs={BusinessWebsiteServiceFaqs} data-divider/>
            </SectionDivider>
        </div>
    )
}
export default EcommerceBase
