import React from "react";
import {
    ShoppingBag,
    BookOpenText,
    CreditCard,
} from "lucide-react";

import SectionHeader from "@/components/site/shared/section-header";

const deliverables = [
    {
        icon: ShoppingBag,
        title: "Custom-Built Online Store",
        paragraphs: [
            "A complete, responsive e-commerce website tailored to your brand, products, and business requirements.",
            "Your store includes the agreed functionality, such as product catalogues, product pages, shopping carts, and checkout flows, tested and prepared for launch.",
        ],
    },
    {
        icon: CreditCard,
        title: "Configured Store Integrations",
        paragraphs: [
            "The agreed third-party integrations configured for your store, which may include payment gateways, shipping services, customer notifications, and other essential tools.",
            "Integrations are tested against the agreed requirements, with any provider accounts, subscriptions, or transaction fees remaining subject to the relevant provider's terms.",
        ],
    },
    {
        icon: BookOpenText,
        title: "Store Handover & Documentation",
        paragraphs: [
            "Practical guidance on managing products, updating store content, handling orders, and using the features included in your e-commerce solution.",
            "You receive the agreed project files, relevant technical documentation, and deployment handover information to support future maintenance and development.",
        ],
    },
];

const OurDeliverables = () => {
    return (
        <section
            id="our-deliverables"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="Our Deliverables"
                title="Everything You Need to Launch Your Online Store"
                markedWord="Launch"
                desc="We deliver a custom-built e-commerce solution designed around your products, customers, and operations. From the storefront and agreed shopping functionality to essential integrations, testing, and handover, every deliverable is aligned with the requirements established for your project."
            />

            <div className="grid grid-cols-1 divide-y divide-dashed border-y border-dashed md:grid-cols-3 md:divide-x md:divide-y-0">
                {deliverables.map((item) => {
                    const Icon = item.icon;

                    return (
                        <div
                            key={item.title}
                            className="flex flex-col gap-4 px-4 py-6 transition-colors duration-200 hover:bg-muted/30 sm:px-6 lg:px-8"
                        >
                            <div className="flex items-center gap-4">
                                <div className="grid size-8.5 shrink-0 place-items-center rounded-md bg-muted">
                                    <Icon
                                        className="size-5.5 text-primary"
                                        strokeWidth={2}
                                        aria-hidden="true"
                                    />
                                </div>

                                <h3 className="text-xl font-medium">
                                    {item.title}
                                </h3>
                            </div>

                            <div className="flex flex-col gap-3 text-muted-foreground">
                                {item.paragraphs.map((text) => (
                                    <p key={text}>{text}</p>
                                ))}
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default OurDeliverables;