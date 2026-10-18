import {Metadata} from "next";

import SectionDivider from "@/components/site/section-devider";
import OfferPageHeroSection from "@/components/site/sections/offer/hero";
import OfferDetailsSection from "@/components/site/sections/offer/details";
import {PublicOfferAgreementPageMetadata} from "@/utils/Site/sitePageMetadata";

export const metadata: Metadata = PublicOfferAgreementPageMetadata;

const OfferPage = () => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <SectionDivider>
                <OfferPageHeroSection data-divider/>
                <OfferDetailsSection data-divider />
            </SectionDivider>
        </div>
    )
}
export default OfferPage;
