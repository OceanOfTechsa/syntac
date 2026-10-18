export interface ITestimonial {
    name: string,
    surname: string,
    details: string,
    rating: number,
    avatar: string,
    date: string,
    title?: string,
    categories: string[];
    index: number;
}

export const TESTIMONIALS: ITestimonial[] = [
    {
        name: "Phindile",
        surname: "Mkhize",
        details:
            "I've had an amazing experience with Ocean of Tech! Their team designed and developed a beautiful, user-friendly website for my business that exceeded all my expectations. They really listened to what I wanted and brought my vision to life. On top of that, their hosting services have been reliable and hassle-free, with everything running smoothly since day one. Highly recommend Ocean of Tech for anyone looking for top-notch web design, development, and hosting services!",
        rating: 5,
        avatar:
            "https://lh3.googleusercontent.com/a/ACg8ocLxBlYID8-FZbqqiGKrePx2Oi_fU5nJaLktGddhWrQMpNoZsQ=s50-c-mo",
        date: "16 Aug 2024",
        title: "Ms",
        categories: ["web-development", "web-design", "hosting"],
        index: 1
    },
    {
        name: "Nompumelelo",
        surname: "Mthembu",
        details:
            "I had a design for my website, but Ocean of Tech took it to the next level! They transformed my vision into a stunning, user-friendly site that's lightning-fast. Their attention to detail and innovative improvements exceeded my expectations. Highly recommend their services for anyone looking to bring their website dreams to life!",
        rating: 5,
        avatar:
            "https://lh3.googleusercontent.com/a-/ALV-UjUxSU0kCYzZuH4uaXGsJrI3JeQ1vwEfTSQgT5xWMHVuU_JhxAE=s50-c-mo",
        date: "17 Aug 2024",
        title: "Ms",
        categories: [
            "web-development",
            "seo-optimization",
            "web-design",
            "ui-ux-design",
        ],
        index: 2
    },
    {
        "name": "Sithembiso",
        "surname": "Ncwane",
        "details": "One of the most reliable tech companies out there. I got my product within given time with no issues.",
        "rating": 5,
        "avatar": "https://lh3.googleusercontent.com/a-/ALV-UjVUjZnOR1Or66ariGnNLMrIpjsmk-eBcfz5u0-2rGU5DSIuSSR3Nw=s50-c-mo",
        "date": "18 Aug 2024",
        "title": "Mr",
        "categories": ["web-development", "automation", "mentorship"],
        index: 3
    },
    {
        name: "Thamsanqa",
        surname: "Ngwane",
        details:
            "We recently had the pleasure of working with Oceans of Tech for our website development project, and the experience was exceptional from start to finish. The team demonstrated a deep understanding of our needs, delivering a website that perfectly aligns with our vision and objectives. Overall, Oceans of Tech exceeded our expectations.",
        rating: 5,
        avatar:
            "https://lh3.googleusercontent.com/a-/ALV-UjVCqxt_vozw8VwdcHGBOiBcArzojWohiANQpY1mpMbMdmzQtyavMw=s50-c-mo",
        date: "20 Aug 2024",
        title: "Mr",
        categories: [
            "web-development",
            "web-design",
            "ui-ux-design",
            "maintenance-support",
        ],
        index: 4
    },
    // {
    //     name: "Sanele",
    //     surname: "Jeza",
    //     details:
    //         "Exceptional Service with Ocean of Tech!, Ocean of Tech delivered a stunning, user-friendly website that exceeded my expectations. Their team truly understood my vision and brought it to life with professionalism and expertise. Plus, their reliable hosting has kept everything running smoothly from day one. For top-notch web design, development, and hosting, Ocean of Tech is the way to go. Highly recommended",
    //     rating: 5,
    //     avatar:
    //         "https://lh3.googleusercontent.com/a-/ALV-UjVtx35H5O75YWKrsP0LyZJQ5m6XOz7Pbj6SNph5OIaV1VijoqM=s36-c-rp-mo-br100",
    //     date: "05 Sep 2024",
    //     title: "Mr",
    //     categories: [
    //         "seo-optimization",
    //         "web-development",
    //         "web-design",
    //         "hosting",
    //     ],
    //    index: 5
    // },
    {
        name: "Sithembelenkosini",
        surname: "Dlamini",
        details:
            "Stellar workmanship, clean layouts with a great page speed. Shares insightful feedback when reporting or daily communication and very professional. I can’t thank the team enough for the best website services. Keep up the good work!!!",
        rating: 5,
        avatar:
            "https://lh3.googleusercontent.com/a-/ALV-UjXKK8Qzos6B5NY_YoYFERXMUNB0d5OugV0FnwCQZs3fBIbI9t0a=s36-c-rp-mo-br100",
        date: "14 Nov 2024",
        title: "Ms",
        categories: ["seo-optimization", "web-development", "maintenance-support"],
        index: 6
    },
    {
        name: "Nonjabulo",
        surname: "Mavuso",
        details:
            "I’m incredibly impressed with Ocean of Tech ᶻᵃ’s SEO and web development services! They built a fast, responsive website and optimized it perfectly for search engines. I’ve seen a huge increase in website traffic and customer engagement. Highly recommended!",
        rating: 5,
        avatar:
            "https://lh3.googleusercontent.com/a/ACg8ocIJ7CDnQ46BFO2xEtb0_0_NejAonyX2a5OjGWgRgfoMR4OxUQ=s36-c-rp-mo-br100",
        date: "15 Jan 2025",
        title: "Ms",
        categories: [
            "seo-optimization",
            "web-development",
            "web-design",
            "ui-ux-design",
        ],
        index: 7
    },
    {
        name: "Kamala",
        surname: "Pillay",
        details:
            "Ocean of Tech ᶻᵃ has been an absolute game-changer for my business! Their web development and maintenance services are top-notch. From the start, they took the time to understand my vision and brought it to life with a sleek, responsive, and user-friendly website.\n\nTheir team is incredibly professional, responsive, and detail-oriented. I never have to worry about updates or security because they handle everything seamlessly. The website runs smoothly, loads quickly, and has boosted my online presence significantly.\n\nI highly recommend Ocean of Tech ᶻᵃ to anyone looking for reliable and innovative web solutions. They truly go above and beyond!",
        rating: 5,
        avatar:
            "https://lh3.googleusercontent.com/a-/ALV-UjWTcrlUuyMSvSIp3GwFrHrVttRyLqmWCQHO2GIKn3fMNCEeXAOp=s36-c-rp-mo-br100",
        date: "15 Jan 2025",
        title: "Ms",
        categories: [
            "seo-optimization",
            "web-development",
            "maintenance-support",
            "hosting",
        ],
        index: 8
    },
    {
        name: "Nokujabula",
        surname: "Gumede",
        details:
            "From our very first call, Ocean of Tech impressed me with their professionalism and creativity. They built a fully responsive website that captures our brand perfectly. I also appreciate how proactive they are with updates and maintenance. Total peace of mind!",
        rating: 5,
        avatar:
            "https://lh3.googleusercontent.com/a-/ALV-UjUJnnjPoaLaw9g6iZuV3kDD751qew-T_WAx2Djyrifc94GDQe8=s33-c-rp-mo-br100",
        date: "3 months ago",
        title: "Ms",
        categories: [
            "seo-optimization",
            "web-development",
            "maintenance-support",
            "web-design",
            "ui-ux-design",
        ],
        index: 9
    },
];
