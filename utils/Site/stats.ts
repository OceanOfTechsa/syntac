import {BriefcaseBusiness, Code2, Layers3, type LucideIcon, Rocket, UsersRound} from "lucide-react";

export interface IStat {
    icon: LucideIcon
    label: string
    start?: number
    end: number | string
    duration?: number
    prefix?: string
    suffix?: string
}

export const AboutStats: IStat[] = [
    {
        icon: BriefcaseBusiness,
        end: 4,
        label: "Years of Experience",
        suffix: "+",
    },
    {
        icon: Code2,
        end: 20,
        label: "Technologies Used",
        suffix: "+",
    },
    {
        icon: Layers3,
        end: 10,
        label: "Projects Delivered",
        suffix: "+",
    },
    {
        icon: Rocket,
        end: 100,
        label: "Built With Purpose",
        suffix: "%",
    },
    {
        icon: UsersRound,
        end: "1:1",
        label: "Client Collaboration",
    },
];

export const CasesStats: IStat[] = [
    {
        icon: BriefcaseBusiness,
        end: 10,
        label: "Projects Showcased",
        suffix: "+",
    },
    {
        icon: Code2,
        end: 20,
        label: "Technologies Applied",
        suffix: "+",
    },
    {
        icon: Layers3,
        end: 5,
        label: "Solution Categories",
        suffix: "+",
    },
    {
        icon: Rocket,
        end: 100,
        label: "Purpose-Driven Solutions",
        suffix: "%",
    },
    {
        icon: UsersRound,
        end: "1:1",
        label: "Client-Focused Approach",
    },
];