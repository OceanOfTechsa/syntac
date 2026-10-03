import type { Metadata } from "next";
import AppSettings from "@/utils/AppSettings";

const SiteMetadata: Metadata = {
    title: {
        default: "Web Design, Development, Hosting & SEO Services in South Africa",
        template:
            "%s • Web Design, Development, Hosting & SEO Services in South Africa",
    },
    description: AppSettings.SITE_DESCRIPTION,
    keywords: [
        // 🔑 Primary Keywords (High Volume)
        "software development company South Africa",
        "web development Durban",
        "custom software solutions South Africa",
        "web design company Durban",
        "SEO services South Africa",
        "website design and development Durban",
        "software company Durban",
        "digital solutions South Africa",

        // 🛠 Secondary Keywords (Service-Specific)
        "custom web application development South Africa",
        "mobile app development Durban",
        "e-commerce website development South Africa",
        "business website design Durban",
        "cloud hosting solutions South Africa",
        "UI UX design agency Durban",
        "professional email hosting South Africa",
        "website maintenance services Durban",
        "responsive web design South Africa",
        "WordPress development Durban",

        // 📍 Local SEO Keywords
        "software developers Durban",
        "web design agency KZN",
        "Durban tech company",
        "website development Umhlanga",
        "SEO company Durban",
        "KwaZulu-Natal software solutions",
        "eThekwini web development",
        "software company near me Durban",

        // 🎯 Long-Tail Keywords (High Intent)
        "affordable web design for small business South Africa",
        "best software development company in Durban",
        "custom business software solutions South Africa",
        "professional SEO services for South African businesses",
        "startup website development package Durban",
        "enterprise software development South Africa",
        "website redesign services Durban",
        "full stack web development South Africa",
        "secure business email hosting Durban",
        "ongoing website support and maintenance SA",

        // 💼 Industry/Client-Specific
        "software solutions for SMEs South Africa",
        "B2B web development Durban",
        "retail software development South Africa",
        "healthcare website design Durban",
        "fintech software solutions South Africa",
        "hospitality website development Durban",

        // 🌍 International Reach
        "South African software company for international clients",
        "offshore software development South Africa",
        "African tech solutions provider",
        "outsource web development to South Africa",

        // ⚡ Technology-Specific
        "React web development South Africa",
        "Next.js development Durban",
        "Node.js developers South Africa",
        "API development and integration Durban",
        "headless CMS development South Africa",
        "progressive web apps Durban",

        // 🔍 Problem/Solution Keywords
        "increase website traffic South Africa",
        "improve search engine rankings Durban",
        "digital transformation services South Africa",
        "website speed optimization Durban",
        "mobile-friendly website design South Africa",
        "business automation software Durban",

        // 💰 Transactional Keywords
        "web design quotes South Africa",
        "software development cost Durban",
        "website package prices South Africa",
        "get SEO consultation Durban",
        "request website proposal South Africa",

        // 🏆 Reputation Keywords
        "top rated web design company Durban",
        "best software developers South Africa",
        "trusted web development agency KZN",
        "award winning digital agency South Africa",
    ],
    openGraph: {
        type: "website",
        url: "https://rise.co.za",
        title: "Rise | Web Design, Hosting & SEO Services in South Africa",
        description:
            "Rise is a leading South African software company offering website design, development, hosting, UI/UX, SEO, and business email solutions.",
        siteName: "Rise",
        images: [
            {
                url: "https://rise.co.za/og-image.jpg",
                width: 1200,
                height: 630,
                alt: "Rise - Web Design, Hosting & SEO in South Africa",
            },
        ],
        locale: "en_ZA",
    },
    twitter: {
        card: "summary_large_image",
        title: "Rise • Web Design, Hosting & SEO Services in South Africa",
        description:
            "Rise is a South African software company providing web design, hosting, SEO, UI/UX, and business email solutions to help businesses thrive online.",
        images: ["https://rise.co.za/og-image.jpg"],
        creator: "@rise_za",
    },
};
export default SiteMetadata;