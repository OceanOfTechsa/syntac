import {Metadata} from "next";

import {ServicesFaqs} from "@/data/faqs";
import Faq from "@/components/site/sections/home/faq";
import SectionDivider from "@/components/site/section-devider";
import RelatedBlogs from "@/components/site/shared/related-blogs";
import {ServicesPageMetadata} from "@/utils/Site/sitePageMetadata";
import Benefits from "@/components/site/sections/services/benefits";
import HeroSection from "@/components/site/sections/services/hero-section";
import ServicesSection from "@/components/site/sections/services/services-list";

export const metadata: Metadata = ServicesPageMetadata;

const ServicesPage = () => {
  return (
    <div className={"flex flex-col w-full p-0 "}>
      <SectionDivider>
          <HeroSection data-divider />
          <ServicesSection data-divider />
          <Benefits data-divider />
          <RelatedBlogs blogName={'Our Services'} data-divider />
          <Faq faqs={ServicesFaqs} data-divider/>
      </SectionDivider>
    </div>
  )
}
export default ServicesPage;
