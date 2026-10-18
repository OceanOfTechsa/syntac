import React from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

import SectionHeader from "@/components/site/shared/section-header";

// Put the gradient image in /public/assets/shared/mesh-gradient.webp
const CARD_BG = "/assets/site/images/magicpattern-mesh-gradient.webp";

const features = [
    {
        title: "Clean, Semantic & Maintainable Code",
        description:
            "We build websites with modern technologies such as Next.js, React, and Tailwind CSS, following structured development practices and accessible HTML semantics. From meaningful page structure to reusable components and efficient rendering, we create maintainable websites that are easier for search engines to understand and for developers to improve over time.",
    },
    {
        title: "Logical Site Architecture & SEO-Friendly URLs",
        description:
            "We organise your website around your content, services, and users' needs, creating clear navigation and descriptive URLs that make each page easy to understand. A well-planned structure helps visitors find relevant information and enables search engines to discover and interpret the relationships between your pages.",
    },
    {
        title: "Performance-Focused Development",
        description:
            "We consider performance from the beginning, using techniques such as image optimisation, efficient resource loading, code splitting, and appropriate caching. We also pay attention to JavaScript execution, animations, and page rendering to help deliver responsive experiences and support strong Core Web Vitals performance.",
    },
    {
        title: "Responsive, Mobile-First Design",
        description:
            "We design and develop responsive interfaces that adapt to smartphones, tablets, laptops, and larger screens. By prioritising usability, accessible interactions, and consistent content across devices, we support a better mobile experience that aligns with Google's mobile-first indexing approach.",
    },
    {
        title: "Strategic Internal Linking",
        description:
            "We connect related pages through thoughtful internal links, helping visitors discover relevant services and content while giving search engines additional paths to find and understand your website. Clear link relationships and descriptive anchor text also help establish how different pages relate to one another.",
    },
    {
        title: "Page Metadata & Social Sharing Optimisation",
        description:
            "We implement SEO essentials such as unique page titles, meta descriptions, appropriate heading structures, canonical URLs where needed, and social sharing metadata. We structure these elements to support individual pages, making it easier to communicate their purpose to search engines and present your content effectively when shared online.",
    },
    {
        title: "XML Sitemaps & Search Engine Discoverability",
        description:
            "We can configure XML sitemap generation to help search engines discover important pages on your website. Where appropriate, we also provide guidance on Google Search Console setup, sitemap submission, and monitoring indexing status so you can better understand how your website appears in search.",
    },
    {
        title: "Structured Data & Schema Markup Readiness",
        description:
            "We build a foundation for relevant structured data using supported schema.org types where appropriate. Depending on your website, this may include organisation, local business, service, article, or breadcrumb information, helping search engines interpret your content more accurately. Eligibility for enhanced search results depends on Google's requirements and is not guaranteed.",
    },
];

const SeoReadyStructures = () => {
    return (
        <section
            id="seo-ready-structures"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="SEO-ready by design"
                title="Our SEO-Ready Website Structures Consistently Include"
                markedWord="SEO-Ready"
                desc="Every site we build is structured from day one to be found, crawled and ranked, not patched with SEO afterwards."
            />

            <div className="grid gap-4 px-4 sm:grid-cols-2 sm:px-6 lg:grid-cols-4 lg:px-8 border-y border-dashed  py-10">
                {features.map((feature) => (
                    <article
                        key={feature.title}
                        className="group relative isolate flex min-h-72 flex-col justify-between gap-6 overflow-hidden rounded-md p-3 text-white border border-dashed"
                    >
                        {/* background image: slides right on hover */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-y-0 -left-[15%] -z-20 w-[130%] transition-transform duration-700 ease-out group-hover:translate-x-[8%] motion-reduce:transition-none"
                        >
                            <Image
                                src={CARD_BG}
                                alt=""
                                fill
                                sizes="(min-width: 1024px) 40vw, 100vw"
                                className="object-cover"
                            />
                        </div>

                        {/* keeps text readable on the brighter parts of the image */}
                        <div
                            aria-hidden="true"
                            className="absolute inset-0 -z-10 bg-black/40"
                        />

                        <div className="flex flex-col gap-3 h-full flex flex-col justify-between">
                            <h3 className="text-lg leading-snug font-medium">
                                {feature.title}
                            </h3>
                            <p className="text-sm leading-relaxed text-white/70">
                                {feature.description}
                            </p>
                        </div>

                        {/*<Link*/}
                        {/*    href={feature.href}*/}
                        {/*    className="inline-flex w-fit items-center gap-2 rounded-sm text-sm font-medium outline-none focus-visible:ring-2 focus-visible:ring-white/70"*/}
                        {/*>*/}
                        {/*    Learn more*/}
                        {/*    <ArrowRight*/}
                        {/*        size={16}*/}
                        {/*        className="transition-transform duration-200 group-hover:translate-x-1"*/}
                        {/*        aria-hidden="true"*/}
                        {/*    />*/}
                        {/*</Link>*/}
                    </article>
                ))}
            </div>
        </section>
    );
};

export default SeoReadyStructures;