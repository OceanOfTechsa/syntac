import React from 'react'

const ImpactSection = () => {
    return (
        <section id="roi" className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24">
            <div className="flex flex-col items-center gap-4 text-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"><span
                className="font-kalam font-medium underline underline-offset-6">ROI Calculation</span><h2
                className="text-2xl font-semibold sm:text-3xl lg:text-4xl">What one license replaces</h2><p
                className="text-muted-foreground text-lg max-w-4xl">Hand-built or AI-assisted - see what a single $249
                license buys back either way.</p></div>
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
            <div className="border-y border-dashed">
                <div className="mx-auto max-w-256 px-4 py-8 min-[1026px]:border-x sm:px-6 lg:border-dashed lg:px-8"><p
                    className="font-medium">Either way, here's what $249 gets you</p>
                    <ul className="mt-4 grid grid-cols-1 gap-x-8 gap-y-3 sm:grid-cols-2 sm:gap-x-12 lg:gap-x-16">
                        <li className="flex items-start gap-2 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round"
                                 className="lucide lucide-check mt-0.5 size-4 shrink-0 text-green-600"
                                 aria-hidden="true">
                                <path d="M20 6 9 17l-5-5"></path>
                            </svg>
                            <span>Pay once ($249), use for a lifetime</span></li>
                        <li className="flex items-start gap-2 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round"
                                 className="lucide lucide-check mt-0.5 size-4 shrink-0 text-green-600"
                                 aria-hidden="true">
                                <path d="M20 6 9 17l-5-5"></path>
                            </svg>
                            <span>1000+ blocks, 25+ templates, 1000+ component variants, and more</span></li>
                        <li className="flex items-start gap-2 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round"
                                 className="lucide lucide-check mt-0.5 size-4 shrink-0 text-green-600"
                                 aria-hidden="true">
                                <path d="M20 6 9 17l-5-5"></path>
                            </svg>
                            <span>MCP, IDE Extension, Theme Generator, and Builder access</span></li>
                        <li className="flex items-start gap-2 text-sm">
                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                 fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round"
                                 stroke-linejoin="round"
                                 className="lucide lucide-check mt-0.5 size-4 shrink-0 text-green-600"
                                 aria-hidden="true">
                                <path d="M20 6 9 17l-5-5"></path>
                            </svg>
                            <span>New components, blocks, and templates ship every month</span></li>
                    </ul>
                </div>
            </div>
        </section>
    )
}
export default ImpactSection
