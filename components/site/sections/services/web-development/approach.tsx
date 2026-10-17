import {Braces, ClipboardList, Ear, Headset, Rocket, Users} from "lucide-react";

import AppSettings from "@/utils/AppSettings";
import SectionHeader from "@/components/site/shared/section-header";
import ApproachProcess, {IProcessStep} from "@/components/site/sections/about/our-story/approach-process";


const steps: IProcessStep[] = [
    {
        id: 1,
        title: "Listen first",
        description:
            "Understand your business, goals, audience, and the challenges you want to solve.",
        Icon: Ear,
    },
    {
        id: 2,
        title: "Plan carefully",
        description:
            "Define the requirements, features, priorities, and project timeline before development begins.",
        Icon: ClipboardList,
    },
    {
        id: 3,
        title: "Build thoughtfully",
        description:
            "Develop, test, and refine a reliable solution tailored to your business needs.",
        Icon: Braces,
    },
    {
        id: 4,
        title: "Keep people involved",
        description:
            "Share progress, gather feedback, and keep you informed from start to delivery.",
        Icon: Users,
    },
    {
        id: 5,
        title: "Launch with confidence",
        description:
            "We can deploy your solution to the agreed hosting environment and help you get it ready for use.",
        Icon: Rocket,
    },
    {
        id: 6,
        title: "Stay supported",
        description:
            "Choose ongoing maintenance with us for updates, bug fixes, monitoring, and continued improvements.",
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
