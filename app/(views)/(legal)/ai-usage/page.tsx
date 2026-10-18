import {Metadata} from "next";

import Hero from "@/components/site/sections/use-of-ai/hero";
import SectionDivider from "@/components/site/section-devider";
import {UseOfAIPageMetadata} from "@/utils/Site/sitePageMetadata";
import AIDetailsSection from "@/components/site/sections/use-of-ai/details";

export const metadata: Metadata = UseOfAIPageMetadata;

const UseOfAiPage = () => {
    return (
        <div className={"flex flex-col w-full p-0 "}>
            <SectionDivider>
                <Hero data-divider/>
                <AIDetailsSection data-divider />
            </SectionDivider>
        </div>
    )
}
export default UseOfAiPage;
