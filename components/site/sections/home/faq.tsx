import React from "react";
import SectionHeader from "@/components/site/shared/section-header";
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";
import { IFaq } from "@/data/faqs";

interface IFaqProps {
    faqs: IFaq[];
}

const Faq = ({ faqs }: IFaqProps) => {
    return (
        <section id="faq" className="py-8 sm:py-16 lg:py-24">
            <div className="space-y-12 px-4 sm:space-y-16 sm:px-6 lg:px-8">
                <SectionHeader
                    preTitle="FAQ"
                    title="Any Questions"
                    markedWord="Questions"
                    desc="Browse through these FAQs to find answers to commonly asked questions."
                />

                <div className="mx-auto w-full max-w-4xl">
                    <Accordion defaultValue={["1"]}>
                        {faqs.map((faq: IFaq) => (
                            <AccordionItem
                                value={faq.key}
                                key={faq.key}
                            >
                                <AccordionTrigger>
                                    {faq.question}
                                </AccordionTrigger>

                                <AccordionContent>
                                    {faq.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </div>
            </div>
        </section>
    );
};

export default Faq;