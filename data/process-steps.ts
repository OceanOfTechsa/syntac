import {
    PhoneCall,
    ClipboardList,
    Code2,
    TestTube,
    Rocket,
    type LucideIcon,
} from "lucide-react";

export interface IProcessStep {
    number: string;
    title: string;
    description: string;
    icon: LucideIcon;
}

export const processSteps: IProcessStep[] = [
    {
        number: "01",
        title: "Discovery Call",
        description:
            "We start with a conversation to understand your business, challenges, and goals. This gives us the context we need before defining the right solution.",
        icon: PhoneCall,
    },
    {
        number: "02",
        title: "Requirements & Planning",
        description:
            "We turn the conversation into clear requirements, priorities, and a practical project plan. Together, we define what needs to be built and what success looks like.",
        icon: ClipboardList,
    },
    {
        number: "03",
        title: "Design & Development",
        description:
            "We design the experience and build the solution around your requirements. Regular feedback keeps the project aligned with your needs as it takes shape.",
        icon: Code2,
    },
    {
        number: "04",
        title: "Testing & Refinement",
        description:
            "We test the solution to identify issues, improve usability, and make sure everything works as expected. Your feedback is incorporated before the final delivery.",
        icon: TestTube,
    },
    {
        number: "05",
        title: "Delivery & Launch",
        description:
            "Once everything is ready, we deploy and deliver the completed solution. We make sure you have everything needed to confidently start using your new technology.",
        icon: Rocket,
    },
];