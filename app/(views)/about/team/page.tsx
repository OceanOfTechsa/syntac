import {Metadata} from "next";
import React from 'react'

import SectionDivider from "@/components/site/section-devider";
import HeroSection from "@/components/site/sections/team/hero";
import Members from "@/components/site/sections/team/members";
import Faq from "@/components/site/sections/home/faq";
import {AboutFaqs} from "@/data/faqs";
import {OurTeamPageMetadata} from "@/utils/Site/sitePageMetadata";


export const metadata: Metadata = OurTeamPageMetadata;

const TeamPage = () => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <SectionDivider>
                <HeroSection data-divider />
                <Members data-divider />
                <Faq faqs={AboutFaqs} data-divider/>
            </SectionDivider>
        </div>
    )
}
export default TeamPage;
