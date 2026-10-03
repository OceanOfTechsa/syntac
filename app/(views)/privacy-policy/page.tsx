import SectionDivider from "@/components/site/section-devider";
import HeroSection from "@/components/site/sections/privacy-policy/hero-section";
import PrivacyDetailsSection from "@/components/site/sections/privacy-policy/details";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Privacy Policy",
};

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
export default PrivacyPolicyPage
