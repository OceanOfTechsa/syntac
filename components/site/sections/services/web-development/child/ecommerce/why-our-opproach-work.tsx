import React from "react";
import Link from "next/link";
import {
    ShoppingBag,
    MousePointerClick,
    TrendingUp,
    CreditCard,
    ShieldCheck,
    PackageCheck,
    ArrowRight,
} from "lucide-react";

import { cn } from "@/lib/utils";
import SectionHeader from "@/components/site/shared/section-header";

const benefits = [
    {
        icon: ShoppingBag,
        title: "Showcase Your Products Effectively",
        description:
            "Present your products through organised catalogues, detailed product pages, high-quality imagery, and clear pricing. We create shopping experiences that help customers explore your offerings, compare options, and find the products they need.",
    },
    {
        icon: MousePointerClick,
        title: "Make Shopping Simple and Intuitive",
        description:
            "Help customers move from browsing to buying with intuitive navigation, useful product filters, search functionality, and a streamlined shopping journey. Responsive layouts ensure your store remains easy to use across mobile phones, tablets, and desktops.",
    },
    {
        icon: TrendingUp,
        title: "Turn Browsing into Purchases",
        description:
            "Guide customers towards completing their purchases with clear calls to action, informative product details, visible pricing, and a straightforward checkout process. Every interaction is designed to reduce unnecessary friction and support purchasing decisions.",
    },
    {
        icon: CreditCard,
        title: "Simplify Payments and Checkout",
        description:
            "Integrate suitable payment providers to help customers complete transactions conveniently and securely. Depending on your requirements, your store can support different payment methods, order summaries, checkout validation, and payment status tracking.",
    },
    {
        icon: ShieldCheck,
        title: "Build Customer Confidence",
        description:
            "Create a trustworthy shopping environment with clear product information, transparent policies, secure payment integrations, and appropriate protection for customer data. We consider security throughout development to help safeguard transactions and customer interactions.",
    },
    {
        icon: PackageCheck,
        title: "Manage Orders More Efficiently",
        description:
            "Keep online sales organised with features for order management, order status updates, inventory tracking, and customer notifications where required. We tailor store functionality to your operations, helping you manage purchases and fulfilment more effectively as your business grows.",
    },
];

const WhyOurApproachWork = () => {
    return (
        <section
            id="why-our-approach-works"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <div className="flex flex-col gap-4">
                <SectionHeader
                    preTitle="Why our approach works"
                    title="E-commerce Experiences Designed to Turn Shoppers into Customers"
                    markedWord="Experiences"
                    desc="We combine thoughtful design, reliable technology, and friction-conscious shopping journeys to help you showcase your products, simplify purchasing, and build an online store around your business goals."
                />

                <div className="z-10 flex flex-wrap justify-center gap-4 px-4 sm:px-6 lg:px-8">
                    <Link
                        href="/contact"
                        data-roll
                        className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary px-6 text-base font-medium whitespace-nowrap text-primary-foreground outline-none transition-all hover:bg-primary/80 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                    >
                        Discuss Your Online Store
                        <ArrowRight size={16} />
                    </Link>
                </div>
            </div>

            <div className="grid border-t border-dashed sm:grid-cols-2 lg:grid-cols-3">
                {benefits.map((benefit, index) => {
                    const Icon = benefit.icon;

                    return (
                        <div
                            key={benefit.title}
                            className={cn(
                                "flex flex-col gap-4 overflow-hidden border-b border-dashed",
                                "px-4 py-6 sm:px-6 lg:px-8",
                                "transition-colors duration-200 hover:bg-muted/30",
                                // Two columns: divider after the left card of each row.
                                index % 2 === 0 && "sm:max-lg:border-r",
                                // Three columns: divider after every card except the last in a row.
                                "lg:border-r",
                                (index + 1) % 3 === 0 && "lg:border-r-0",
                            )}
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
                                    {benefit.title}
                                </h3>
                            </div>

                            <p className="text-muted-foreground">
                                {benefit.description}
                            </p>
                        </div>
                    );
                })}
            </div>
        </section>
    );
};

export default WhyOurApproachWork;