import { JSX } from "react";
import { Metadata } from "next";

import HeroSection from "@/components/site/sections/home/hero-section";
import ShowcaseSection from "@/components/site/sections/home/show-case-section";
import WhatWeDo from "@/components/site/sections/home/what-we-do";

export const metadata: Metadata = {
    title: "Syntac Software",
};

const HomePage = (): JSX.Element => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <HeroSection />
            <ShowcaseSection />
            <WhatWeDo />
        </div>
    );
};

export default HomePage;