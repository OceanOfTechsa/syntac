import {
    BriefcaseBusiness,
    Code2,
    Layers3,
    Rocket,
    UsersRound,
    type LucideIcon,
} from "lucide-react";
import CountUp from "@/components/site/shared/count-up";

interface IStat {
    icon: LucideIcon
    label: string
    start?: number
    end: number | string
    duration?: number
    prefix?: string
    suffix?: string
}

const stats: IStat[] = [
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

const SyntacStats = () => {
    return (
        <div className="grid grid-cols-1 border-y border-dashed md:grid-cols-6 xl:grid-cols-5" id="stats">
            {stats.map(({ icon: Icon, label, ...countProps }: IStat, index: number) => (
                <div
                    key={label}
                    className={[
                        "flex flex-col items-center gap-6 border-dashed px-4 py-6",
                        "md:px-6 md:py-9",
                        "max-xl:border-b",
                        "md:max-xl:col-span-3",
                        "xl:border-r",
                        index === stats.length - 1 ? "xl:border-r-0" : "",
                    ].join(" ")}
                >
                    <Icon
                        className="text-muted-foreground size-7 stroke-1"
                        aria-hidden="true"
                    />

                    <div className="flex flex-col items-center gap-3">
                        <h3 className="text-4xl font-semibold">
                            <CountUp
                                {...countProps}
                                className="inline-block tabular-nums"
                            />
                        </h3>

                        <p className="text-muted-foreground text-center text-lg">
                            {label}
                        </p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SyntacStats;