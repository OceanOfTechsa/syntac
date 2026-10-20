import {JSX} from "react";
import type { Metadata } from "next";

import { notFound } from "next/navigation";
import FaqList from "@/components/site/sections/faq/faq";
import {faqCategories, getFaqCategory, type ICategory, type IFaqCategory} from "@/data/faq-categories";

type Props = {
    params: Promise<{ category: string }>;
};

export function generateStaticParams(): ICategory[] {
    return faqCategories.map((category: IFaqCategory): ICategory => ({ category: category.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { category } = await params;
    const current: IFaqCategory |undefined = getFaqCategory(category);

    return {
        title: current ? `${current.label} FAQs` : "FAQs",
    };
}

const FAQsCategoryPage = async ({ params }: Props): Promise<JSX.Element> => {
    const { category } = await params;
    const current: IFaqCategory | undefined = getFaqCategory(category);

    if (!current) notFound();

    return (
        <FaqList
            faqs={current.faqs}
            activeCategory={current.slug}
            preTitle={`${current.label} FAQs`}
        />
    );
}

export default FAQsCategoryPage;