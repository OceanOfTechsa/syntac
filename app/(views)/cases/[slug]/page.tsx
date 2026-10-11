import React from 'react'
import {Metadata} from 'next';
import {notFound} from "next/navigation";

import type {CaseStudy} from "@/utils/Site/case-studies";
import {ALL_CASE_STUDIES} from "@/utils/Site/case-studies";
import SectionDivider from "@/components/site/section-devider";
import HeroSection from "@/components/site/sections/cases/[slug]/hero-section";
import ChallengeSection from "@/components/site/sections/cases/[slug]/challenge-section";
import SolutionSection from "@/components/site/sections/cases/[slug]/solution-section";
import ImpactSection from "@/components/site/sections/cases/[slug]/impact-section";
import ImageGallery from "@/components/site/sections/cases/[slug]/image-gallery";
import {galleryImagePath} from "@/lib/imagekit";

interface Props {
    params: Promise<{ slug: string }>
}

const getStudy = (slug: string): CaseStudy | undefined =>
    ALL_CASE_STUDIES.find((c) => c.slug === slug);

export function generateStaticParams() {
    return ALL_CASE_STUDIES.map((c) => ({slug: c.slug}));
}

export async function generateMetadata({params}: Props): Promise<Metadata> {
    const {slug} = await params;
    const study = getStudy(slug);
    if (!study) notFound();

    return {
        title: study.title ?? study.clientName,
        description: study.summary,
    }
}

const CaseDetailsPage = async ({params}: Props) => {
    const {slug} = await params;
    const study = getStudy(slug);
    if (!study) notFound();

    const images = Array.from({length: study.galleryCount ?? 0}, (_, i) => ({
        light: galleryImagePath(study.clientSlug, study.slug, i + 1, "light"),
        dark: galleryImagePath(study.clientSlug, study.slug, i + 1, "dark"),
        alt: `${study.title} screenshot ${i + 1}`,
    }));

    return (
        <div className={"flex flex-col w-full p-0"}>
            <SectionDivider>
                <HeroSection study={study} data-divider />
                <ChallengeSection study={study} data-divider />
                <SolutionSection data-divider />
                <ImpactSection data-divider />
                <ImageGallery images={images} data-divider />
            </SectionDivider>
        </div>
    )
}
export default CaseDetailsPage