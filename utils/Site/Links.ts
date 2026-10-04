import {ReactNode} from "react";

type LinkType = {
    label: string;
    href?: string;
    children?: {
        label: string;
        href: string;
        description?: string;
    }[];
};
type SocialLinkProps = { label: string, color: string, children: ReactNode };

const CompanyLinks: LinkType[] = [
    { label: "Services", href: "/services" },
    { label: "Projects", href: "/projects"},
    { label: "About Us", href: "/about"},
    { label: "How we work", href: "/how-we-work"},
    { label: "Contact Us", href: "/contact"},
]

const PageLinks: LinkType[] =  [
    { label: "Blog", href: "/blog"},
    { label: "Careers", href: "/careers"},
    { label: "Team", href: "/team"},
    { label: "Guides", href: "/guides"},
    { label: "Partners", href: "/partners"},
    { label: "Technologies", href: "/technologies" },
]

const HeaderLinks: LinkType[] = [
    { label: "Home", href: "/" },
    {
        label: "About Us",
        children: [
            {
                label: "About Us",
                href: "/about",
                description: "Learn about SYNTAC, our story, values, and approach.",
            },
            {
                label: "Our Story",
                href: "/about/story",
                description: "Follow our journey from Ocean of Tech to SYNTAC.",
            },
            {
                label: "Our Team",
                href: "/about/team",
                description: "Meet the people behind SYNTAC.",
            },
        ],
    },
    { label: "Services", href: "/services" },
    { label: "Cases", href: "/case-studies" },
    // { label: "Testimonials", href: "/testimonials" },
    { label: "How we work", href: "/how-we-work" },

    // ───── Resources Dropdown ─────
    {
        label: "Resources",
        children: [
            {
                label: "Blog",
                href: "/blog",
                description: "Insights, tutorials and company news",
            },
            {
                label: "Changelog",
                href: "/changelog",
                description: "See what we've shipped recently",
            },
            {
                label: "Documentation",
                href: "/docs",
                description: "Guides and API references",
            },
            {
                label: "FAQs",
                href: "/faqs",
                description: "Answers to common questions",
            },
        ],
    },
];

export { CompanyLinks, PageLinks, HeaderLinks, type LinkType, type SocialLinkProps};