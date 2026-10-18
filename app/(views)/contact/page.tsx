import {Metadata} from "next";

import SectionDivider from "@/components/site/section-devider";
import {ContactPageMetadata} from "@/utils/Site/sitePageMetadata";
import FormSection from "@/components/site/sections/contact/form-section";
import HeroSection from "@/components/site/sections/contact/hero-section";
import MapSection from "@/components/site/sections/contact/map-section";

export const metadata: Metadata = ContactPageMetadata;

const ContactPage = () => {
    return (
      <div className={"flex flex-col w-full p-0 "}>
        <SectionDivider>
          <HeroSection data-divider/>
          <FormSection data-divider/>
          <MapSection data-divider />
        </SectionDivider>
      </div>
    )
}
export default ContactPage;
