import {
    Braces,
    ClipboardList,
    Code2,
    Ear,
    Headset,
    Palette,
    Rocket,
    ShieldCheck,
    Users,
} from "lucide-react";

import AppSettings from "@/utils/AppSettings";
import SectionHeader from "@/components/site/shared/section-header";
import ApproachProcess, {
    IProcessStep,
} from "@/components/site/sections/about/our-story/approach-process";

const steps: IProcessStep[] = [
    {
        id: 1,
        title: "Discovery & Requirements",
        description:
            "We learn about your business, users, objectives, and existing processes to identify the problems your application needs to solve and define its essential requirements.",
        Icon: Ear,
    },
    {
        id: 2,
        title: "Planning & Architecture",
        description:
            "We define the application's features, user roles, workflows, data requirements, and technical architecture, establishing a clear development plan aligned with your goals.",
        Icon: ClipboardList,
    },
    {
        id: 3,
        title: "User Experience & Interface Design",
        description:
            "We map out user journeys and design intuitive interfaces that make everyday tasks easier to complete, keeping usability, accessibility, and the needs of your users at the centre.",
        Icon: Palette,
    },
    {
        id: 4,
        title: "Application Development",
        description:
            "We turn the approved designs and requirements into a working web application, implementing the frontend, backend logic, database operations, authentication, and integrations required by your project.",
        Icon: Code2,
    },
    {
        id: 5,
        title: "Testing & Quality Assurance",
        description:
            "We test application workflows, business rules, data handling, access permissions, responsiveness, and performance to identify issues and improve reliability before release.",
        Icon: ShieldCheck,
    },
    {
        id: 6,
        title: "Deployment & Handover",
        description:
            "We prepare your application for production, configure the agreed deployment environment, and hand over the completed solution with the relevant documentation and guidance to help you get started.",
        Icon: Rocket,
    },
    {
        id: 7,
        title: "Ongoing Support & Improvement",
        description:
            "If you choose ongoing support, we can help maintain your application, resolve issues, update dependencies, introduce new features, and improve functionality as your business requirements evolve.",
        Icon: Headset,
    },
];

const WebApplicationDevelopmentApproach = () => {
    return (
        <section
            id="our-approach"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="Our Approach"
                title="From Business Challenges to Working Web Applications"
                markedWord="Working"
                desc={`At ${AppSettings.COMPANY_NAME}, we build web applications around your business processes, user needs, and operational goals. From defining requirements and designing workflows to development, testing, and deployment, we follow a structured, collaborative process that keeps the project focused on solving real problems and delivering practical value.`}
            />

            <div className="border-y border-dashed px-4 sm:px-8">
                <ApproachProcess steps={steps} />
            </div>

            <p className={'text-muted-foreground text-center sm:text-3xl max-w-6xl mx-auto '}>We engineer secure, <span className={'text-black dark:text-white'}>lightning-fast web architectures that adapt seamlessly</span> to any device environment <span className={'text-black dark:text-white'}>and scale effortlessly</span> in the cloud as your user base and business operations expand.</p>
        </section>
    );
};

export default WebApplicationDevelopmentApproach;