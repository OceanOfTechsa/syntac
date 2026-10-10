"use client";
import {useParams} from "next/navigation";
import React from 'react'
import {notFound} from "next/navigation";

import SectionDivider from "@/components/site/section-devider";
import HeroSection from "@/components/site/sections/cases/[slug]/hero-section";
import {ALL_CASE_STUDIES} from "@/utils/Site/case-studies";
import ChallengeSection from "@/components/site/sections/cases/[slug]/challenge-section";
import SolutionSection from "@/components/site/sections/cases/[slug]/solution-section";

export function generateStaticParams() {
    return ALL_CASE_STUDIES.map((s) => ({slug: s.slug}));
}

const CaseDetailsBasePage =  () => {
    const {slug} = useParams<{slug: string}>();
    const study = ALL_CASE_STUDIES.find((s) => s.slug === slug);

    if (!study) notFound();
    return (
        <div className={"flex flex-col w-full p-0"}>
            <SectionDivider>
                <HeroSection study={study} data-divider />
                <ChallengeSection study={study} data-divider />
                <SolutionSection data-divider />
            </SectionDivider>
        </div>
    )
}
export default CaseDetailsBasePage
