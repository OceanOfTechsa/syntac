import V1_1_0 from "@/components/site/sections/about/our-story/v1_1_0";
import V1_2_0 from "@/components/site/sections/about/our-story/v1_2_0";
import V1_3_0 from "@/components/site/sections/about/our-story/v1_3_0";
import V1_4_0 from "@/components/site/sections/about/our-story/v1_4_0";
import V1_5_0 from "@/components/site/sections/about/our-story/v1_5_0";
import V1_6_0 from "@/components/site/sections/about/our-story/v1_6_0";
import V1_7_0 from "@/components/site/sections/about/our-story/v1_7_0";
import V1_8_0 from "@/components/site/sections/about/our-story/v1_8_0";

const TimelineSection = () => {
    return (
        <section>
            <div className="mx-auto max-w-4xl px-4 py-10 md:px-8 md:py-16">
                <div className="flex flex-col items-start">
                    <V1_1_0 />
                    <V1_2_0 />
                    <V1_3_0 />
                    <V1_4_0 />
                    <V1_5_0 />
                    <V1_6_0 />
                    <V1_7_0 />
                    <V1_8_0 />
                </div>
            </div>
        </section>
    );
};

export default TimelineSection;