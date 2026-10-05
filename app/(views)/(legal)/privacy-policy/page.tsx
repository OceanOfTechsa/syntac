import {Metadata} from "next";

import SectionDivider from "@/components/site/section-devider";
import {PrivacyPolicyPageMetadata} from "@/utils/Site/sitePageMetadata";
import HeroSection from "@/components/site/sections/privacy-policy/hero-section";
import PrivacyDetailsSection from "@/components/site/sections/privacy-policy/details";

export const metadata: Metadata = PrivacyPolicyPageMetadata;

const PrivacyPolicyPage = () => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <SectionDivider>
                <HeroSection data-divider />
                <PrivacyDetailsSection data-divider />
            </SectionDivider>
        </div>
    )
}
export default PrivacyPolicyPage;
