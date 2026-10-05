import { Metadata } from "next";

import SectionDivider from "@/components/site/section-devider";
import {CookiePolicyPageMetadata} from "@/utils/Site/sitePageMetadata";
import HeroSection from "@/components/site/sections/cookie-policy/hero-section";
import CookieDetailsSection from "@/components/site/sections/cookie-policy/details";

export const metadata: Metadata = CookiePolicyPageMetadata;

const CookiePolicyPage = () => {
  return (
    <div className="flex w-full flex-col p-0">
      <SectionDivider>
        <HeroSection data-divider />
        <CookieDetailsSection data-divider />
      </SectionDivider>
    </div>
  );
};

export default CookiePolicyPage;
