import React from 'react'
import OfferPageHeroSection from "@/components/site/sections/offer/hero";
import SectionDivider from "@/components/site/section-devider";
import OfferDetailsSection from "@/components/site/sections/offer/details";
import {Metadata} from "next";


export const metadata: Metadata = {
    title: "Public Offer Agreement",
};

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
export default OfferPage
