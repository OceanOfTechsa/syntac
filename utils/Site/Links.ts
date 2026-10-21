import { ReactNode } from "react";

type LinkChild = {
    label: string;
    href: string;
    description?: string;
    /** Children with the same group render in the same column, e.g. "Learn" or "Build". */
    group?: string;
};

type LinkType = {
    label: string;
    href?: string;
    children?: LinkChild[];
};

type LinkGroup = { title: string; items: LinkChild[] };

type SocialLinkProps = { label: string; color: string; children: ReactNode };

/** Splits children into groups, keeping the order each group first appears in. */
function groupChildren(children: LinkChild[]): LinkGroup[] {
    const map = new Map<string, LinkChild[]>();

    for (const child of children) {
        const key = child.group ?? "";
        map.set(key, [...(map.get(key) ?? []), child]);
    }

    return Array.from(map, ([title, items]) => ({ title, items }));
}

const CompanyLinks: LinkType[] = [
    { label: "Services", href: "/services" },
    { label: "Cases", href: "/cases" },
    { label: "About Us", href: "/about" },
    { label: "How we work", href: "/how-we-work" },
    { label: "Careers", href: "/careers" },
    { label: "Contact Us", href: "/contact" },
];

const PageLinks: LinkType[] = [
    { label: "Blog", href: "/blog" },
    { label: "Partners", href: "/partners" },
    { label: "Industries", href: "/industries" },
    { label: "Technologies", href: "/technologies" },
];

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
                group: "Learn",
                label: "Blog",
                href: "/blog",
                description: "Insights, tutorials and company news.",
            },
            {
                group: "Learn",
                label: "FAQs",
                href: "/faqs",
                description: "Answers to common questions.",
            },
            {
                group: "Build",
                label: "Sync UI",
                href: "/sync-ui", // placeholder: use your real route
                description: "Open source components for your next interface.",
            },
        ],
    },
];

export {
    CompanyLinks,
    PageLinks,
    HeaderLinks,
    groupChildren,
    type LinkType,
    type LinkChild,
    type LinkGroup,
    type SocialLinkProps,
};