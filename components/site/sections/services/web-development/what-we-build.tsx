
import React from "react";
import Image from "next/image";
import {
    Globe,
    AppWindow,
    ShoppingBag,
    BookOpen,
    BriefcaseBusiness, MoveRight,
} from "lucide-react";

import SectionHeader from "@/components/site/shared/section-header";
import AppSettings from "@/utils/AppSettings";
import SyntacStats from "@/components/site/sections/about/stats";
import {AboutStats} from "@/utils/Site/stats";
import Link from "next/link";

const WebDevelopmentServices = () => {
    return (
        <section
            id="web-development-services"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="What We Build"
                title="Web Solutions for Every Business Need"
                markedWord="Solutions"
                desc={`From professional business websites to feature-rich web applications, ${AppSettings.COMPANY_NAME} builds digital experiences that help businesses establish their presence, connect with customers, and grow online.`}
            />

            <div>
                <div className="grid border-y border-dashed md:grid-cols-2">
                    {/* Brand */}
                    <div className="flex items-center justify-center px-6 py-12 max-md:hidden lg:px-8">
                        <div className="flex items-center gap-5">
                            <Image
                                width={34}
                                height={34}
                                src="/brand/syntac-brand-kit/logos/icon/png/syntac-icon-transparent.png"
                                alt="SYNTAC"
                                className="block h-auto w-auto"
                                aria-hidden="true"
                            />

                            <span className="text-4xl font-semibold">
                                syntac/software
                            </span>
                        </div>
                    </div>

                    {/* Web Development Services */}
                    <div className="flex flex-col divide-y divide-dashed border-dashed md:border-l">
                        {/* Business Websites */}
                        <Link href={'/services/web-development/business-websites'} className="group flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 hover:bg-muted/40 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-2">
                                <Globe
                                    size={22}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <h3 className="text-xl font-medium">
                                    Business Websites
                                </h3>
                            </div>

                            <p className="text-muted-foreground">
                                Establish a professional online presence with
                                responsive websites that communicate your
                                brand, showcase your services, and help
                                potential customers discover your business.
                            </p>

                            <span className={'text-muted-foreground text-sm flex items-center gap-2'}>Learn more <MoveRight size={18} className={'group-hover:translate-x-2 duration-500 ease-in-out transition-all'} /></span>
                        </Link>

                        {/* Web Applications */}
                        <Link href={'/services/web-development/web-applications'}  className="group flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 hover:bg-muted/40 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-2">
                                <AppWindow
                                    size={22}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <h3 className="text-xl font-medium">
                                    Web Applications
                                </h3>
                            </div>

                            <p className="text-muted-foreground">
                                Turn complex workflows into practical digital
                                tools with custom web applications, interactive
                                platforms, client portals, booking systems,
                                and business process solutions.
                            </p>

                            <span className={'text-muted-foreground text-sm flex items-center gap-2'}>Learn more <MoveRight size={18} className={'group-hover:translate-x-2 duration-500 ease-in-out transition-all'} /></span>
                        </Link>

                        {/* E-commerce */}
                        <Link href={'/services/web-development/ecommerce'}  className="group flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 hover:bg-muted/40 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-2">
                                <ShoppingBag
                                    size={22}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <h3 className="text-xl font-medium">
                                    E-commerce Stores
                                </h3>
                            </div>

                            <p className="text-muted-foreground">
                                Sell online with user-friendly storefronts
                                that showcase your products, simplify
                                shopping, and support checkout and payment
                                integrations.
                            </p>

                            <span className={'text-muted-foreground text-sm flex items-center gap-2'}>Learn more <MoveRight size={18} className={'group-hover:translate-x-2 duration-500 ease-in-out transition-all'} /></span>
                        </Link>

                        {/* Portfolios */}
                        <Link href={'/services/web-development/portfolios'}  className="group flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 hover:bg-muted/40 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-2">
                                <BriefcaseBusiness
                                    size={22}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <h3 className="text-xl font-medium">
                                    Portfolios & Personal Websites
                                </h3>
                            </div>

                            <p className="text-muted-foreground">
                                Showcase your work, skills, projects, and
                                achievements through a distinctive portfolio
                                or personal website designed to make a
                                lasting impression.
                            </p>

                            <span className={'text-muted-foreground text-sm flex items-center gap-2'}>Learn more <MoveRight size={18} className={'group-hover:translate-x-2 duration-500 ease-in-out transition-all'} /></span>
                        </Link>

                        {/* Blogs and Content */}
                        <Link href={'/services/web-development/blogs-and-content'}  className="group flex-1 space-y-3.5 px-4 py-6 transition-colors duration-200 hover:bg-muted/40 sm:px-6 lg:px-8">
                            <div className="flex items-center gap-2">
                                <BookOpen
                                    size={22}
                                    strokeWidth={1.8}
                                    aria-hidden="true"
                                />

                                <h3 className="text-xl font-medium">
                                    Blogs & Content Platforms
                                </h3>
                            </div>

                            <p className="text-muted-foreground">
                                Publish articles, news, insights, and other
                                content through manageable publishing
                                platforms built to organise information
                                and keep your audience engaged.
                            </p>

                            <span className={'text-muted-foreground text-sm flex items-center gap-2'}>Learn more <MoveRight size={18} className={'group-hover:translate-x-2 duration-500 ease-in-out transition-all'} /></span>
                        </Link>
                    </div>
                </div>

                {/* Our Approach */}
                <div className="flex flex-col gap-6 border-b border-dashed px-4 py-10 sm:px-6 lg:px-8">
                    <span className="font-kalam text-center text-lg font-medium underline underline-offset-2">
                        Built around your goals
                    </span>

                    <div className="text-muted-foreground flex flex-wrap gap-3.5 text-lg sm:justify-center">
                        <div className="flex items-center gap-1">
                            <span aria-hidden="true">•</span>
                            Responsive by design
                        </div>

                        <div className="flex items-center gap-1">
                            <span aria-hidden="true">•</span>
                            Tailored to your needs
                        </div>

                        <div className="flex items-center gap-1">
                            <span aria-hidden="true">•</span>
                            Performance-focused
                        </div>

                        <div className="flex items-center gap-1">
                            <span aria-hidden="true">•</span>
                            Ready to grow
                        </div>
                    </div>
                </div>
            </div>
            <h2 className="text-center text-2xl font-semibold sm:text-3xl">{AppSettings.COMPANY_NAME} Software Stats</h2>
            <SyntacStats stats={AboutStats} />
        </section>
    );
};

export default WebDevelopmentServices;
