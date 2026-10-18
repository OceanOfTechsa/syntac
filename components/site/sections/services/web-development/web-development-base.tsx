import SectionDivider from "@/components/site/section-devider";
import Cta from "@/components/site/sections/services/shared/cta";
import CasesSection from "@/components/site/sections/cases/cases";
import TestimonialsSection from "@/components/site/sections/home/testimonials";
import HeroSection from "@/components/site/sections/services/shared/hero-section";
import Approach from "@/components/site/sections/services/web-development/approach";
import WhySyntac from "@/components/site/sections/services/web-development/why-syntac";
import WebDevelopmentServices from "@/components/site/sections/services/web-development/what-we-build";
import Technologies from "@/components/site/sections/services/web-development/technologies";

const WebDevelopmentBase = () => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <SectionDivider>
                <HeroSection
                    data-divider
                    service="Web Development"
                    serviceText="Digital experiences built for your business"
                    useFlipWords={true}
                    flipWords={[
                        "Websites",
                        "Web Applications",
                        "Online Stores",
                        "Portfolios",
                        "Blogs",
                    ]}
                    children={<Cta />}
                    title="Custom web development for"
                    paragraph="We design and develop modern, responsive web solutions, from business websites and portfolios to blogs, e-commerce stores, and web applications. Built to engage your audience, deliver seamless experiences, and support your business goals."
                />
                <WhySyntac data-divider />
                <WebDevelopmentServices data-divider />
                {/*<Approach data-divider />*/}
                <Technologies data-divider />
                <CasesSection data-divider />
                <TestimonialsSection data-divider/>
            </SectionDivider>
        </div>
    )
}
export default WebDevelopmentBase
