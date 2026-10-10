import React from 'react'
import {CaseStudy} from "@/utils/Site/case-studies";
import FadedBorder from "@/components/site/shared/faded-border";
import AnimatedTimelineLine from "@/components/site/shared/animated-timeline-line";

interface IChallengeSectionProps {
    study: CaseStudy
}

const ChallengeSection = ({study}: IChallengeSectionProps) => {
    return (
        <section className="py-8 sm:py-16 w-full z-20">
            <div className={'grid grid-cols-1 lg:grid-cols-12 gap-10 w-full  sm:px-6 lg:px-8 mx-auto max-w-7xl'}>
                <div className="lg:col-span-5 xl:col-span-5 px-4 md:px-0">
                    <div className=" bg-[#202124] text-white rounded-sm p-6 sm:p-10  sm:-mt-38">
                        <ul className="space-y-5">
                            <li>
                                <p className="text-lg text-white">Client</p>
                                <p className="text-sm font-semibold text-gray-400">{study.clientName}</p>
                            </li>
                            <li>
                                <p className="text-lg text-white">Project Worked</p>
                                <p className="text-sm font-semibold text-gray-400">{study.title}</p>
                            </li>
                            <li>
                                <p className="text-lg text-white">Headquarters</p>
                                <p className="text-sm font-semibold text-gray-400">Kloof, Durban</p>
                            </li>
                            <li>
                                <p className="text-lg text-white">Client Industry</p>
                                <p className="text-sm font-semibold text-gray-400">Logistics & Supply Chain</p>
                            </li>

                            <li>
                                <p className="text-lg text-white">Project timeline</p>
                                <p className="text-sm font-semibold text-gray-400">6 Months</p>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="lg:col-span-7 xl:col-span-7 px-4 md:px-0">
                    <h4 className="text-[34.48px] md:text-[2rem] font-semibold mb-3">The Challenge</h4>
                    <p className="text-start mb-[1rem] text-[1.25rem] ">
                        The client needed to completely digitize their massive logistics network to eliminate operational
                        liabilities and support rapid industrial growth.
                    </p>
                    <p className="text-start text-[#606261] dark:text-[#c4c5c7] mb-6">
                        Managing an extensive fleet of over 700 specialized commercial vehicles and hundreds of cross-border
                        drivers requires handling massive amounts of highly sensitive operational data. The client was
                        restricted by traditional backend structures where decentralized records across country borders
                        caused severe information delays, and manual verification loops created significant operational
                        liabilities.
                    </p>
                    <p className="text-start text-[#606261] dark:text-[#c4c5c7] mb-6">
                        Furthermore, unlinked asset tracking led to critical visibility gaps, while disconnected
                        subcontractor data flows resulted in invoicing delays and inefficient empty-leg transit routes. To
                        sustain growth and align with enterprise resource planning (ERP) systems, they required a major
                        custom web application overhaul to digitize their entire operational backbone.
                    </p>
                </div>
            </div>

            <div className="border-y border-dashed w-full mt-6">
                <div className="mx-auto max-w-256 px-4 py-8 min-[1026px]:border-x sm:px-6 lg:border-dashed lg:px-8">
                    <p className="font-medium text-center mb-6">Primary Bottlenecks</p>
                    {/*<FadedBorder />*/}
                    <AnimatedTimelineLine  GLOW_WIDTH={5} DURATION={10}/>
                    <ul className="mt-6 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 sm:gap-x-12 lg:gap-x-16">
                        <li className="flex items-start gap-2 text-sm">
                            <span className="shrink-0 rounded-full bg-muted h-5 w-5 flex items-center justify-center text-xs border">
                                1
                            </span>
                            <span>Decentralized records across country borders causing massive information delays.</span>
                        </li>

                        <li className="flex items-start gap-2 text-sm">
                            <span className="shrink-0 rounded-full bg-muted h-5 w-5 flex items-center justify-center text-xs border">
                                2
                            </span>
                            <span>Manual verification loops creating severe operational liabilities and risks.</span>
                        </li>

                        <li className="flex items-start gap-2 text-sm">
                            <span className="shrink-0 rounded-full bg-muted h-5 w-5 flex items-center justify-center text-xs border">
                                3
                            </span>
                            <span>Unlinked asset tracking telemetries causing major operational visibility gaps.</span>
                        </li>

                        <li className="flex items-start gap-2 text-sm">
                            <span className="shrink-0 rounded-full bg-muted h-5 w-5 flex items-center justify-center text-xs border">
                                4
                            </span>
                            <span>Disconnected subcontractor data flows resulting in severe invoicing delays.</span>
                        </li>

                        <li className="flex items-start gap-2 text-sm">
                            <span className="shrink-0 rounded-full bg-muted h-5 w-5 flex items-center justify-center text-xs border">
                                5
                            </span>
                            <span>Traditional backend structures restricting integration with enterprise resource systems.</span>
                        </li>

                    </ul>
                </div>
            </div>
        </section>
    )
}
export default ChallengeSection
