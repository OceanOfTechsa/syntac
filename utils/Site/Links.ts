import {ReactNode} from "react";

type LinkType = { label: string, href: string };
type SocialLinkProps = { label: string, color: string, children: ReactNode };

const CompanyLinks: LinkType[] = [
    { label: "Home", href: "/"},
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
    { label: "Trust & Compliance", href: "/legal"},
]

const HeaderLinks: LinkType[] = [
    { label: 'About Us', href: '/about' },
    { label: 'Our Services', href: '/services' },
    { label: 'Case Studies', href: '/case-studies' },
    { label: 'Testimonials', href: '/testimonials' },
    { label: "How we work", href: "/how-we-work"},
    { label: 'Industries', href: '/industries' },
]

export { CompanyLinks, PageLinks, HeaderLinks, type LinkType, type SocialLinkProps};