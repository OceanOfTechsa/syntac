import {
    IFaq,
    faqs,
    AboutFaqs,
    HowWeWorkFaqs,
    ServicesFaqs,
    BusinessWebsiteServiceFaqs,
    TechnologiesFaqs,
    IndustriesFaqs,
    CasesFaqs,
} from "@/data/faqs";

export interface IFaqCategory {
    /** Used in the URL: /faqs/category/<slug> */
    slug: string;
    /** Shown on the pill */
    label: string;
    faqs: IFaq[];
}

export const faqCategories: IFaqCategory[] = [
    { slug: "general", label: "General", faqs },
    { slug: "about", label: "About", faqs: AboutFaqs },
    { slug: "how-we-work", label: "How We Work", faqs: HowWeWorkFaqs },
    { slug: "services", label: "Services", faqs: ServicesFaqs },
    { slug: "business-websites", label: "Business Websites", faqs: BusinessWebsiteServiceFaqs },
    { slug: "technologies", label: "Technologies", faqs: TechnologiesFaqs },
    { slug: "industries", label: "Industries", faqs: IndustriesFaqs },
    { slug: "cases", label: "Case Studies", faqs: CasesFaqs },
];

export const getFaqCategory = (slug: string) =>
    faqCategories.find((category) => category.slug === slug);

/** Every FAQ for the "All" view. Keys are prefixed because "1", "2"... repeat across categories. */
export const allFaqs: IFaq[] = faqCategories.flatMap((category) =>
    category.faqs.map((faq) => ({ ...faq, key: `${category.slug}-${faq.key}` })),
);