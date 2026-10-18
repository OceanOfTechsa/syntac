import SectionHeader from "@/components/site/shared/section-header";
import React from "react";

const OfferPageHeroSection = () => {
    return (
        <section className={'my-16 flex w-full flex-col items-center gap-4'} id={'hero'}>
            <SectionHeader
                preTitle="Public Offer Agreement"
                title="Our Terms for Working Together"
                markedWord="Together"
                desc="This Public Offer Agreement sets out the terms and conditions that govern the provision of our services, helping establish clear expectations and responsibilities between SYNTAC and our clients."
            />
        </section>
    )
}
export default OfferPageHeroSection
