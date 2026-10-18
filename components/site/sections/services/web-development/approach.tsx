import {Braces, ClipboardList, Code2, Ear, Headset, Palette, Rocket, ShieldCheck, Users} from "lucide-react";

import AppSettings from "@/utils/AppSettings";
import SectionHeader from "@/components/site/shared/section-header";
import ApproachProcess, {IProcessStep} from "@/components/site/sections/about/our-story/approach-process";


const steps: IProcessStep[] = [
    {
        id: 1,
        title: "Discovery & Strategy",
        description:
            "We learn about your business, audience, goals, brand, and requirements to establish a clear direction for your website.",
        Icon: Ear,
    },
    {
        id: 2,
        title: "Planning & Structure",
        description:
            "We map out your pages, content, and navigation to create an intuitive structure that helps visitors find what they need.",
        Icon: ClipboardList,
    },
    {
        id: 3,
        title: "Wireframing & Design",
        description:
            "We shape the layout and user experience, then craft a distinctive interface that reflects your brand and works across devices.",
        Icon: Palette,
    },
    {
        id: 4,
        title: "Content & Development",
        description:
            "We bring your approved designs to life with hand-crafted code, responsive layouts, and search-friendly foundations.",
        Icon: Code2,
    },
    {
        id: 5,
        title: "Testing & Refinement",
        description:
            "We test functionality, responsiveness, accessibility, and performance, refining the details before your website goes live.",
        Icon: ShieldCheck,
    },
    {
        id: 6,
        title: "Launch & Handover",
        description:
            "We prepare your website for launch and hand over the completed solution with guidance to help you get started.",
        Icon: Rocket,
    },
    {
        id: 7,
        title: "Ongoing Support",
        description:
            "If you choose to work with us beyond launch, we can handle deployment, maintenance, updates, and ongoing improvements.",
        Icon: Headset,
    },
];


const Approach = () => {
    return (
        <section
            id="our-approach"
            className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="Our Approach"
                title="A Thoughtful Approach to Every Project"
                markedWord="Approach"
                desc={`At ${AppSettings.COMPANY_NAME}, we put your goals first. From understanding your needs to building, launching, and maintaining your solution, we keep the process clear, collaborative, and focused on delivering lasting value.`}
            />

            <div className={'border-y border-dashed px-4 sm:px-8'}>
                <ApproachProcess steps={steps} />
            </div>
        </section>
    )
}
export default Approach
