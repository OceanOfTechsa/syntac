
import type { Metadata } from "next";
import { notFound } from "next/navigation";

import FaqList from "@/components/site/sections/faq/faq";
import { faqCategories, getFaqCategory } from "@/data/faq-categories";

type Props = {
    params: Promise<{ category: string }>;
};

export function generateStaticParams() {
    return faqCategories.map((category) => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;
    const current = getFaqCategory(category);

    return {
        title: current ? `${current.label} FAQs` : "FAQs",
    };
}

export default async function FaqCategoryPage({ params }: Props) {
    const { category } = await params;
    const current = getFaqCategory(category);

    if (!current) notFound();

    return (
        <FaqList
            faqs={current.faqs}
            activeCategory={current.slug}
            preTitle={`${current.label} FAQs`}
        />
    );
}