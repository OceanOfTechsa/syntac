import Faq from "@/components/site/sections/home/faq";
import {BusinessWebsiteServiceFaqs} from "@/data/faqs";
import SectionDivider from "@/components/site/section-devider";
import Cta from "@/components/site/sections/services/shared/cta";
import HeroSection from "@/components/site/sections/services/shared/hero-section";
import Approach from "@/components/site/sections/services/web-development/approach";
import PageSpeed from "@/components/site/sections/services/web-development/child/business-website/page-speed";
import WebTechnologies from "@/components/site/sections/services/web-development/child/business-website/web-technologies";
import SeoReadyStructures from "@/components/site/sections/services/web-development/child/business-website/seo-ready-structures";
import WhyOurApproachWork from "@/components/site/sections/services/web-development/child/business-website/why-our-approach-work";

const WebsiteDevelopmentBase = () => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <SectionDivider>
                <HeroSection
                    data-divider
                    service="Business Website Development"
                    serviceText="Professional websites built around your business"
                    useFlipWords={true}
                    flipWords={[
                        "Business",
                        "Brand",
                        "Company",
                        "Organisation",
                        "Vision",
                    ]}
                    children={<Cta />}
                    title="Websites built for your"
                    paragraph="We design and develop professional, responsive business websites that showcase your brand, communicate your services, and help you reach the right audience. Whether you're establishing your online presence or refreshing an existing website, we create tailored digital experiences that build credibility, connect with customers, and support your business goals."
                />
                <WhyOurApproachWork data-divider />
                <Approach data-divider />
                <SeoReadyStructures data-divider />
                <PageSpeed data-divider />
                <WebTechnologies data-divider />
                <Faq faqs={BusinessWebsiteServiceFaqs} data-divider/>
            </SectionDivider>
        </div>
    )
}
export default WebsiteDevelopmentBase;
