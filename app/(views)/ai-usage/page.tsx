import {Metadata} from "next";
import SectionDivider from "@/components/site/section-devider";
import Hero from "@/components/site/sections/use-of-ai/hero";
import AIDetailsSection from "@/components/site/sections/use-of-ai/details";

export const metadata: Metadata = {
    title: "Use of AI",
};

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
export default UseOfAiPage
