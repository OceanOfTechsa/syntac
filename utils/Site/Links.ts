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
    { label: "Cases", href: "/cases"},
    { label: "About Us", href: "/about"},
    { label: "How we work", href: "/how-we-work"},
    { label: "Careers", href: "/careers"},
    { label: "Contact Us", href: "/contact"},
]

const PageLinks: LinkType[] =  [
    { label: "Blog", href: "/blog"},
    { label: "Partners", href: "/partners"},
    { label: "Industries", href: "/industries"},
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
                description: "Learn about SYNTAC, our timeline, values, and approach.",
            },
            {
                label: "Company Timeline",
                href: "/about/timeline",
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
    { label: "Cases", href: "/cases" },
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
                label: "FAQs",
                href: "/faqs",
                description: "Answers to common questions",
            },
        ],
    },
];

export { CompanyLinks, PageLinks, HeaderLinks, type LinkType, type SocialLinkProps};
