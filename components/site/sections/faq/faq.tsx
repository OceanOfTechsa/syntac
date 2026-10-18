"use client";

import * as React from "react";
import Link from "next/link";

import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { cn } from "@/lib/utils";
import { IFaq } from "@/data/faqs";
import { faqCategories, IFaqCategory } from "@/data/faq-categories";
import SectionHeader from "@/components/site/shared/section-header";

interface FaqListProps {
    faqs: IFaq[];
    /** Pills shown above the list. Defaults to every FAQ category. */
    categories?: IFaqCategory[];
    /** Slug of the selected category. Leave undefined for "All". */
    activeCategory?: string;
    preTitle?: string;
    title?: string;
    markedWord?: string;
    desc?: string;
    /**
     * Include this list in the Pagefind search index. Turn it off on category pages
     * so the same question isn't indexed twice. Defaults to true.
     */
    indexForSearch?: boolean;
}

const pillBase =
    "rounded-md px-3.5 py-1.5 text-sm font-medium transition-colors duration-200 outline-none focus-visible:ring-[3px] focus-visible:ring-ring/50";

/** "How long does it take?" -> "how-long-does-it-take". Used as the #anchor for each question. */
export const faqAnchor = (question: string) =>
    question
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

const FaqList: React.FC<FaqListProps> = ({
                                             faqs,
                                             categories = faqCategories,
                                             activeCategory,
                                             preTitle = "FAQs",
                                             title = "Answers to Your Questions",
                                             markedWord = "Answers",
                                             desc,
                                             indexForSearch = true,
                                         }: FaqListProps) => {
    const [open, setOpen] = React.useState<string[]>([]);

    // /faqs#some-question -> open that question and scroll to it
    React.useEffect(() => {
        const openFromHash = () => {
            const id = decodeURIComponent(window.location.hash.slice(1));
            if (!id) return;

            const match = faqs.find((faq) => faqAnchor(faq.question) === id);
            if (!match) return;

            setOpen([match.key]);
            // wait a beat so the panel has started opening before we scroll
            setTimeout(() => {
                document
                    .querySelector<HTMLElement>(`[data-faq-anchor="${id}"]`)
                    ?.scrollIntoView({ behavior: "smooth", block: "start" });
            }, 150);
        };

        openFromHash();
        window.addEventListener("hashchange", openFromHash);
        return () => window.removeEventListener("hashchange", openFromHash);
    }, [faqs]);

    return (
        <div
            {...(indexForSearch
                ? { "data-pagefind-body": "" }
                : { "data-pagefind-ignore": "" })}
            className="mt-32 max-w-5xl mx-auto xl:py-20 pb-0 sm:mt-0 px-6 md:px-0 w-full"
        >
            <SectionHeader
                preTitle={preTitle}
                title={title}
                markedWord={markedWord}
                desc={desc ?? ""}
            />

            {/* category pills: each one navigates to /faqs/category/<slug> */}
            <nav
                aria-label="FAQ categories"
                className="mt-8 mb-10 flex flex-wrap justify-center gap-2"
                data-pagefind-ignore
            >
                <Link
                    href="/faqs"
                    aria-current={!activeCategory ? "page" : undefined}
                    className={cn(
                        pillBase,
                        !activeCategory
                            ? "bg-foreground text-background"
                            : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                    )}
                >
                    All
                </Link>

                {categories.map((category) => {
                    const isActive = category.slug === activeCategory;

                    return (
                        <Link
                            key={category.slug}
                            href={`/faqs/category/${category.slug}`}
                            aria-current={isActive ? "page" : undefined}
                            className={cn(
                                pillBase,
                                isActive
                                    ? "bg-foreground text-background"
                                    : "bg-muted text-muted-foreground hover:bg-muted/70 hover:text-foreground",
                            )}
                        >
                            {category.label}
                        </Link>
                    );
                })}
            </nav>

            {/* Index-only copy for search: headings with ids give Pagefind its #anchors.
                Hidden from sight and screen readers; the visible accordion below is skipped. */}
            {indexForSearch && (
                <div hidden aria-hidden="true">
                    {faqs.map((faq) => (
                        <section key={faq.key}>
                            <h3 id={faqAnchor(faq.question)}>{faq.question}</h3>
                            <p>{faq.answer}</p>
                        </section>
                    ))}
                </div>
            )}

            {faqs.length > 0 ? (
                <div data-pagefind-ignore>
                    <Accordion
                        value={open}
                        onValueChange={(value) => setOpen(value as string[])}
                    >
                        {faqs.map((faq) => (
                            <AccordionItem
                                key={faq.key}
                                value={faq.key}
                                data-faq-anchor={faqAnchor(faq.question)}
                                className="border-none scroll-mt-28"
                            >
                                <AccordionTrigger
                                    className="border h-16 flex items-center py-[4rem] px-[1.25rem] p-3 rounded-sm cursor-pointer font-[600] focus:bg-black focus:text-white dark:focus:bg-white dark:focus:text-black text-lg"
                                >
                                    {faq.question}
                                </AccordionTrigger>
                                <AccordionContent className="my-[0.5rem] py-[0.2rem] px-[1rem] text-[#606261] dark:text-[#c4c5c7] font-normal text-lg mb-3">
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            ) : (
                <p className="text-muted-foreground text-center">
                    No questions in this category yet.
                </p>
            )}
        </div>
    );
};

export default FaqList;