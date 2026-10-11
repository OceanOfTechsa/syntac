import React from 'react'
import SectionHeader from "@/components/site/shared/section-header";

const ImpactSection = () => {
    return (
        <section id="roi" className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24">
            <SectionHeader
                preTitle={'Project Impact'}
                title={'The Difference Our Work Makes'}
                markedWord={'Difference'}
                desc={'Explore the outcomes, improvements, and value delivered through this project, and how the solution addresses real business challenges.'}
            />
            <div className="border-y border-dashed">
                <div
                    className="mx-auto grid w-full max-w-256 grid-cols-1 divide-dashed max-sm:divide-y min-[1026px]:border-x sm:grid-cols-2 sm:divide-x lg:border-dashed">
                    <div className="px-4 py-8 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" className="lucide lucide-user size-4" aria-hidden="true">
                                <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2"></path>
                                <circle cx="12" cy="7" r="4"></circle>
                            </svg>
                            Built by humans
                        </div>
                        <p className="text-muted-foreground mt-6 text-xs font-medium tracking-wide uppercase">Precious
                            hours saved</p><p className="mt-1 text-4xl font-semibold sm:text-5xl">2,000+<span
                        className="text-muted-foreground ml-1 text-lg font-normal">hours</span></p>
                        <ul className="mt-6 ml-5 list-disc space-y-2">
                            <li className="text-muted-foreground text-sm">Countless hours spent on research and
                                planning
                            </li>
                            <li className="text-muted-foreground text-sm">~10 months of design and engineering effort
                            </li>
                            <li className="text-muted-foreground text-sm">Hiring and managing a design and engineering
                                team
                            </li>
                            <li className="text-muted-foreground text-sm">$180K-$240K if outsourced to a freelancer or
                                agency
                            </li>
                        </ul>
                        <div className="mt-6 border-t border-dashed pt-6"><p
                            className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Return on
                            investment</p><p className="mt-1 text-4xl font-semibold sm:text-5xl">725x</p></div>
                    </div>
                    <div className="px-4 py-8 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-2 text-sm font-medium">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round" className="lucide lucide-sparkles size-4" aria-hidden="true">
                                <path
                                    d="M11.017 2.814a1 1 0 0 1 1.966 0l1.051 5.558a2 2 0 0 0 1.594 1.594l5.558 1.051a1 1 0 0 1 0 1.966l-5.558 1.051a2 2 0 0 0-1.594 1.594l-1.051 5.558a1 1 0 0 1-1.966 0l-1.051-5.558a2 2 0 0 0-1.594-1.594l-5.558-1.051a1 1 0 0 1 0-1.966l5.558-1.051a2 2 0 0 0 1.594-1.594z"></path>
                                <path d="M20 2v4"></path>
                                <path d="M22 4h-4"></path>
                                <circle cx="4" cy="20" r="2"></circle>
                            </svg>
                            Built with AI
                        </div>
                        <p className="text-muted-foreground mt-6 text-xs font-medium tracking-wide uppercase">Precious
                            hours saved</p><p className="mt-1 text-4xl font-semibold sm:text-5xl">700+<span
                        className="text-muted-foreground ml-1 text-lg font-normal">hours</span></p>
                        <ul className="mt-6 ml-5 list-disc space-y-2">
                            <li className="text-muted-foreground text-sm">~4-5 months of prompting and polishing</li>
                            <li className="text-muted-foreground text-sm">AI-generated output, endlessly revised</li>
                            <li className="text-muted-foreground text-sm">Most AI tokens burn on UI, not business
                                logic
                            </li>
                            <li className="text-muted-foreground text-sm">$45K-$65K in AI token and tooling costs, plus
                                rework
                            </li>
                        </ul>
                        <div className="mt-6 border-t border-dashed pt-6"><p
                            className="text-muted-foreground text-xs font-medium tracking-wide uppercase">Return on
                            investment</p><p className="mt-1 text-4xl font-semibold sm:text-5xl">300x</p></div>
                    </div>
                </div>
            </div>
        </section>
    )
}
export default ImpactSection
