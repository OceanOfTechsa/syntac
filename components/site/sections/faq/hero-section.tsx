import React from 'react'
import Link from "next/link";

import AppSettings from "@/utils/AppSettings";
import SectionHeader from "@/components/site/shared/section-header";

const HeroSection = () => {
    return (
        <section id={'hero'} className={'py-10 mt-20'}>
            <SectionHeader
                preTitle="Frequently Asked Questions"
                title="Answers to Your Questions"
                markedWord="Your Questions"
                desc={`Find answers to common questions about our services, development process, pricing, and how ${AppSettings.COMPANY_NAME} can help your business.`}
            />
            <Link href="/faqs/search/"
                  className="relative z-10 mt-6 flex max-h-9 w-full max-w-sm mx-auto items-center rounded-md border border-border bg-background px-3 py-3">
                <span className="flex-1 text-sm text-muted-foreground">Search Your Faqs...</span>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor"
                     strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"
                     className="size-4 shrink-0 text-muted-foreground">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none"></path>
                    <path d="M10 10m-7 0a7 7 0 1 0 14 0a7 7 0 1 0 -14 0"></path>
                    <path d="M21 21l-6 -6"></path>
                </svg>
            </Link>
        </section>
    )
}
export default HeroSection
