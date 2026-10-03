import React from 'react';
import Link from "next/link";
import SectionHeader from "@/components/site/shared/section-header";
import {Button} from "@base-ui/react";

const Solutions = () => {
    return (
        <section id={'solutions'} className="flex flex-col items-center justify-center space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24">
            <SectionHeader
                preTitle="Our Services"
                title="Digital Solutions Built For Your Business"
                markedWord="Solutions"
                desc="We design and develop practical digital solutions that solve real business challenges, streamline operations, and give your business the technology it needs to grow."
            />


            <div>
                <div className={'grid divide-dashed border-y border-dashed max-md:divide-y md:grid-cols-2 md:divide-x'}>
                    <Link href={'#'} className={'group px-4 py-8 sm:px-6 lg:px-8'}>
                        <div className={'flex flex-col gap-7.5'}>
                            <div className={'space-y-3.5'}>
                                <div className={'flex items-center justify-between'}>
                                    <h3 className={'text-xl font-semibold'}>Website Development</h3>
                                    <Button type={'button'}
                                            className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 has-[&gt;svg]:px-3 hidden size-7 rounded-full group-hover:inline-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round"
                                             className="lucide lucide-circle-arrow-up size-4.5 rotate-45"
                                             aria-hidden="true">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="m16 12-4-4-4 4"></path>
                                            <path d="M12 16V8"></path>
                                        </svg>
                                        <span className="sr-only">Redirect Link</span>
                                    </Button>
                                </div>
                                <p className={'text-muted-foregriund text-pretty'}>Build a professional digital presence that communicates your brand, engages your audience, and turns visitors into customers.</p>
                            </div>
                            <div className={'relative'}>
                                Have image or sliding here
                                <div
                                    className="from-background absolute inset-y-0 left-0 w-[15%] bg-linear-to-r to-transparent"></div>
                                <div
                                    className="from-background absolute inset-y-0 right-0 w-[15%] bg-linear-to-l to-transparent"></div>
                            </div>
                        </div>
                    </Link>
                    <Link href={'#'} className={'group px-4 py-8 sm:px-6 lg:px-8'}>
                        <div className={'flex flex-col gap-7.5'}>
                            <div className={'space-y-3.5'}>
                                <div className={'flex items-center justify-between'}>
                                    <h3 className={'text-xl font-semibold'}>Web Application Development</h3>
                                    <Button type={'button'}
                                            className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 has-[&gt;svg]:px-3 hidden size-7 rounded-full group-hover:inline-flex">
                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                             viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"
                                             strokeLinecap="round" strokeLinejoin="round"
                                             className="lucide lucide-circle-arrow-up size-4.5 rotate-45"
                                             aria-hidden="true">
                                            <circle cx="12" cy="12" r="10"></circle>
                                            <path d="m16 12-4-4-4 4"></path>
                                            <path d="M12 16V8"></path>
                                        </svg>
                                        <span className="sr-only">Redirect Link</span>
                                    </Button>
                                </div>
                                <p className={'text-muted-foregriund text-pretty'}>Create powerful web applications that streamline workflows, connect users, and deliver experiences tailored to your business.</p>
                            </div>
                            <div className={'relative'}>
                                Have image or sliding here
                                <div
                                    className="from-background absolute inset-y-0 left-0 w-[15%] bg-linear-to-r to-transparent"></div>
                                <div
                                    className="from-background absolute inset-y-0 right-0 w-[15%] bg-linear-to-l to-transparent"></div>
                            </div>
                        </div>
                    </Link>
                </div>
                <div className="grid divide-dashed border-b border-dashed max-md:divide-y md:grid-cols-6 md:divide-x"><a
                    className="group col-span-full px-4 pt-8 sm:px-6 md:max-lg:border-b lg:col-span-2 lg:px-8"
                    href="/blocks#ecommerce">
                    <div className="flex h-full flex-col justify-between gap-4">
                        <div className="space-y-3.5">
                            <div className="flex items-center justify-between">
                                <h3 className="text-xl font-semibold">Custom Software Development</h3>
                                <button data-slot="button" data-variant="default" data-size="default"
                                        className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 has-[&gt;svg]:px-3 hidden size-7 rounded-full group-hover:inline-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round"
                                         className="lucide lucide-circle-arrow-up size-4.5 rotate-45"
                                         aria-hidden="true">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="m16 12-4-4-4 4"></path>
                                        <path d="M12 16V8"></path>
                                    </svg>
                                    <span className="sr-only">Redirect Link</span></button>
                            </div>
                            <p className="text-muted-foreground text-pretty">Replace rigid off-the-shelf tools with software designed around your unique processes, requirements, and goals.</p>
                        </div>
                        <div className="relative mt-auto h-46 overflow-hidden"><img
                            src="https://cdn.shadcnstudio.com/ss-assets/landing-page/ecommerce-light.png?width=338&amp;format=auto"
                            alt="eCommerce UI Blocks" loading="lazy"
                            className="absolute top-0 left-1/2 max-w-85 origin-top -translate-x-1/2 rounded-md border transition-transform duration-300 group-hover:scale-105 dark:hidden"/><img
                            src="https://cdn.shadcnstudio.com/ss-assets/landing-page/ecommerce-dark.png?width=338&amp;format=auto"
                            alt="eCommerce UI Blocks" loading="lazy"
                            className="absolute top-0 left-1/2 hidden max-w-85 origin-top -translate-x-1/2 rounded-md border transition-transform duration-300 group-hover:scale-105 dark:inline-block"/>
                        </div>
                    </div>
                </a><a className="group px-4 pt-8 sm:px-6 md:col-span-2 md:max-lg:col-span-3 lg:px-8"
                       href="/blocks#datatable">
                    <div className="flex h-full flex-col justify-between gap-4">
                        <div className="space-y-3.5">
                            <div className="flex items-center justify-between"><h3
                                className="text-xl font-semibold">Datatable UI Blocks</h3>
                                <button data-slot="button" data-variant="default" data-size="default"
                                        className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 has-[&gt;svg]:px-3 hidden size-7 rounded-full group-hover:inline-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round"
                                         className="lucide lucide-circle-arrow-up size-4.5 rotate-45"
                                         aria-hidden="true">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="m16 12-4-4-4 4"></path>
                                        <path d="M12 16V8"></path>
                                    </svg>
                                    <span className="sr-only">Redirect Link</span></button>
                            </div>
                            <p className="text-muted-foreground text-pretty">Enhance your app's data display with our
                                powerful Datatable Blocks-perfect for organizing and visualizing complex datasets.</p>
                        </div>
                        <div className="relative mt-auto h-46 overflow-hidden"><img
                            src="https://cdn.shadcnstudio.com/ss-assets/landing-page/datatable-light.png?width=338&amp;format=auto"
                            alt="Datatable UI Blocks" loading="lazy"
                            className="absolute top-0 left-1/2 max-w-85 origin-top -translate-x-1/2 rounded-md border transition-transform duration-300 group-hover:scale-105 dark:hidden"/><img
                            src="https://cdn.shadcnstudio.com/ss-assets/landing-page/datatable-dark.png?width=338&amp;format=auto"
                            alt="Datatable UI Blocks" loading="lazy"
                            className="absolute top-0 left-1/2 hidden max-w-85 origin-top -translate-x-1/2 rounded-md border transition-transform duration-300 group-hover:scale-105 dark:inline-block"/>
                        </div>
                    </div>
                </a><a className="group px-4 pt-8 sm:px-6 md:col-span-2 md:max-lg:col-span-3 lg:px-8"
                       href="/blocks#bento-grid">
                    <div className="flex h-full flex-col justify-between gap-4">
                        <div className="space-y-3.5">
                            <div className="flex items-center justify-between"><h3
                                className="text-xl font-semibold">Bento Grid UI Blocks</h3>
                                <button data-slot="button" data-variant="default" data-size="default"
                                        className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 shrink-0 items-center justify-center gap-2 text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 has-[&gt;svg]:px-3 hidden size-7 rounded-full group-hover:inline-flex">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"
                                         fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round"
                                         strokeLinejoin="round"
                                         className="lucide lucide-circle-arrow-up size-4.5 rotate-45"
                                         aria-hidden="true">
                                        <circle cx="12" cy="12" r="10"></circle>
                                        <path d="m16 12-4-4-4 4"></path>
                                        <path d="M12 16V8"></path>
                                    </svg>
                                    <span className="sr-only">Redirect Link</span></button>
                            </div>
                            <p className="text-muted-foreground text-pretty">Create dynamic grid-based pages
                                effortlessly using Bento Grid UI blocks, designed for a clean, organized display of
                                content.</p></div>
                        <div className="relative mt-auto h-46 overflow-hidden"><img
                            src="https://cdn.shadcnstudio.com/ss-assets/landing-page/bento-grid-light.png?width=338&amp;format=auto"
                            alt="Bento Grid UI Blocks" loading="lazy"
                            className="absolute top-0 left-1/2 max-w-85 origin-top -translate-x-1/2 rounded-md border transition-transform duration-300 group-hover:scale-105 dark:hidden"/><img
                            src="https://cdn.shadcnstudio.com/ss-assets/landing-page/bento-grid-dark.png?width=338&amp;format=auto"
                            alt="Bento Grid UI Blocks" loading="lazy"
                            className="absolute top-0 left-1/2 hidden max-w-85 origin-top -translate-x-1/2 rounded-md border transition-transform duration-300 group-hover:scale-105 dark:inline-block"/>
                        </div>
                    </div>
                </a></div>
            </div>
                {/*<div className="flex justify-center px-4 sm:px-6 lg:px-8 ">*/}
                {/*    <a data-slot="button" data-variant="default" data-size="lg"*/}
                {/*                                                             className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 has-[&gt;svg]:px-4 gap-2 rounded-lg px-6! text-base shadow-sm max-[400px]:flex-1"*/}
                {/*                                                             href="/blocks">Explore all Shadcn*/}
                {/*    blocks</a></div>*/}

        </section>
    )
}
export default Solutions
