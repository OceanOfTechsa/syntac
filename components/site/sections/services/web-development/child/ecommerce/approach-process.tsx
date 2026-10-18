import {
    ClipboardList,
    Code2,
    Ear,
    Headset,
    Palette,
    Rocket,
    ShieldCheck,
    ShoppingBag,
} from "lucide-react";

import AppSettings from "@/utils/AppSettings";
import SectionHeader from "@/components/site/shared/section-header";
import ApproachProcess, {
    IProcessStep,
} from "@/components/site/sections/about/our-story/approach-process";

const steps: IProcessStep[] = [
    {
        id: 1,
        title: "Discovery & Store Requirements",
        description:
            "We learn about your products, target customers, business goals, and selling process to understand what your online store needs. Together, we identify essential features such as product categories, inventory management, payment methods, shipping options, and order fulfilment.",
        Icon: Ear,
    },
    {
        id: 2,
        title: "Planning & Store Structure",
        description:
            "We plan your product catalogue, categories, navigation, shopping journey, and checkout process. We also define the technical requirements and integrations needed to support your products, payments, orders, and day-to-day store operations.",
        Icon: ClipboardList,
    },
    {
        id: 3,
        title: "Shopping Experience & Design",
        description:
            "We design a distinctive storefront that reflects your brand and makes shopping straightforward. From product pages and search to shopping carts and checkout, we focus on clear layouts, intuitive interactions, accessibility, and responsive experiences across devices.",
        Icon: Palette,
    },
    {
        id: 4,
        title: "E-commerce Development",
        description:
            "We build your online store using hand-crafted code and the functionality your business requires. This can include product catalogues, shopping carts, customer accounts, payment gateway integrations, inventory management, order processing, and connections to relevant third-party services.",
        Icon: ShoppingBag,
    },
    {
        id: 5,
        title: "Testing & Quality Assurance",
        description:
            "We test the complete shopping journey, including product browsing, cart updates, checkout validation, payment flows, order creation, and customer notifications where applicable. We also check responsiveness, performance, and security before your store is released.",
        Icon: ShieldCheck,
    },
    {
        id: 6,
        title: "Launch & Handover",
        description:
            "We prepare your store for launch, configure the agreed production environment, and verify essential settings for payments, shipping, and order processing. You receive the completed store along with guidance on managing products, handling orders, and getting started with your online business.",
        Icon: Rocket,
    },
    {
        id: 7,
        title: "Ongoing Support & Growth",
        description:
            "As your business evolves, we can help maintain your store, resolve technical issues, improve performance, update integrations, and introduce new features. Ongoing support is optional and can be tailored to your needs as your products, customers, and sales operations grow.",
        Icon: Headset,
    },
];

const ECommerceDevelopmentApproach = () => {
    return (
        <section
            id="our-approach"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="Our Approach"
                title="From Product Catalogue to a Complete Online Store"
                markedWord="Complete"
                desc={`At ${AppSettings.COMPANY_NAME}, we create custom e-commerce experiences that make it easier for customers to discover products, complete purchases, and interact with your brand. From planning your catalogue and designing the shopping journey to integrating payments, testing checkout flows, and preparing for launch, we follow a structured process focused on usability, reliability, and your business objectives.`}
            />

            <div className="border-y border-dashed px-4 sm:px-8">
                <ApproachProcess steps={steps} />
            </div>

            <p className="mx-auto max-w-6xl text-center text-muted-foreground sm:text-3xl">
                We build fast,{" "}
                <span className="text-black dark:text-white">
                    secure and intuitive online shopping experiences
                </span>{" "}
                that make purchasing easier for your customers,{" "}
                <span className="text-black dark:text-white">
                    while giving your business the flexibility to grow.
                </span>
            </p>
        </section>
    );
};

export default ECommerceDevelopmentApproach;