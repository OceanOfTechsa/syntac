import React from 'react'
import type {CaseStudy} from "@/utils/Site/case-studies";
import AnimatedTimelineLine from "@/components/site/shared/animated-timeline-line";

interface IChallengeSectionProps {
    study: CaseStudy
}

const ChallengeSection = ({study}: IChallengeSectionProps) => {
    const {challenge, details} = study;
    if (!challenge) return null;

    // Client and project always show; the rest only when the study has them
    const facts = [
        {label: "Client", value: study.clientName},
        {label: "Project Worked", value: study.title},
        {label: "Headquarters", value: details?.headquarters},
        {label: "Client Industry", value: details?.industry},
        {label: "Project timeline", value: details?.timeline},
    ].filter((fact): fact is { label: string; value: string } => Boolean(fact.value));

    return (
        <section className="py-8 sm:py-16 w-full z-20" id={'challenge'}>
            <div className={'grid grid-cols-1 lg:grid-cols-12 gap-10 w-full  sm:px-6 lg:px-8 mx-auto max-w-7xl'}>
                <div className="lg:col-span-5 xl:col-span-5 px-4 md:px-0">
                    <div className=" bg-[#202124] text-white rounded-sm p-6 sm:p-10  sm:-mt-38">
                        <ul className="space-y-5">
                            {facts.map((fact) => (
                                <li key={fact.label}>
                                    <p className="text-lg text-white">{fact.label}</p>
                                    <p className="text-sm font-semibold text-gray-400">{fact.value}</p>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="lg:col-span-7 xl:col-span-7 px-4 md:px-0">
                    <h4 className="text-[34.48px] md:text-[2rem] font-semibold mb-3">The Challenge</h4>
                    <p className="text-start mb-[1rem] text-[1.25rem] ">
                        {challenge.headline}
                    </p>
                    {challenge.paragraphs.map((paragraph, i) => (
                        <p key={i} className="text-start text-[#606261] dark:text-[#c4c5c7] mb-6">
                            {paragraph}
                        </p>
                    ))}
                </div>
            </div>

            {challenge.bottlenecks.length > 0 && (
                <div className="border-y border-dashed w-full mt-6">
                    <div className="mx-auto max-w-256 px-4 py-8 min-[1026px]:border-x sm:px-6 lg:border-dashed lg:px-8">
                        <p className="font-medium text-center mb-6">Primary Bottlenecks</p>
                        <AnimatedTimelineLine GLOW_WIDTH={5} DURATION={10}/>
                        <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 sm:gap-x-12 lg:gap-x-16">
                            {challenge.bottlenecks.map((item, i) => (
                                <li key={i} className="flex items-start gap-2 text-sm">
                                    <span className="shrink-0 rounded-full bg-muted h-5 w-5 flex items-center justify-center text-xs border">
                                        {i + 1}
                                    </span>
                                    <span>{item}</span>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            )}
        </section>
    )
}
export default ChallengeSection