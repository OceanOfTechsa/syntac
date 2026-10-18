import React from 'react'

import Faq from "@/components/site/sections/home/faq";
import {BusinessWebsiteServiceFaqs} from "@/data/faqs";
import SectionDivider from "@/components/site/section-devider";
import Cta from "@/components/site/sections/services/shared/cta";
import HeroSection from "@/components/site/sections/services/shared/hero-section";
import OurDeliverables from "@/components/site/sections/services/web-development/child/web-application/our-deliverables";
import WhyOurApproachWork from "@/components/site/sections/services/web-development/child/web-application/why-our-approach-work";
import WebApplicationDevelopmentApproach from "@/components/site/sections/services/web-development/child/web-application/approach";
import WebApplicationTechnologies from "@/components/site/sections/services/web-development/child/web-application/web-application-technologies";

const WebApplicationBase = () => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <SectionDivider>
                <HeroSection
                    data-divider
                    service="Web Application Development"
                    serviceText="Powerful web applications built around your workflows"
                    useFlipWords={true}
                    flipWords={[
                        "Applications",
                        "Platforms",
                        "Workflows",
                        "Processes",
                        "Business",
                    ]}
                    children={<Cta />}
                    title="Web solutions built for your"
                    paragraph="We design and develop custom web applications that help businesses streamline operations, manage information, and deliver better digital experiences. From interactive customer portals and internal management platforms to data-driven applications and workflow automation, we build secure, responsive, and scalable solutions tailored to your requirements. Whether you're launching a new digital product or improving an existing process, we turn your ideas into practical web applications designed to support your business as it grows."
                />
                <WhyOurApproachWork data-divider />
                <WebApplicationDevelopmentApproach data-divider />
                <OurDeliverables  data-divider  />
                <WebApplicationTechnologies data-divider />
                <Faq faqs={BusinessWebsiteServiceFaqs} data-divider/>
            </SectionDivider>
        </div>
    )
}
export default WebApplicationBase
