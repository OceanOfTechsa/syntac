import React from "react";
import {
    BriefcaseBusiness,
    Code2,
    Layers3,
    Rocket,
    UsersRound,
} from "lucide-react";

const stats = [
    {
        icon: BriefcaseBusiness,
        value: "4+",
        label: "Years of Experience",
    },
    {
        icon: Code2,
        value: "20+",
        label: "Technologies Used",
    },
    {
        icon: Layers3,
        value: "10+",
        label: "Projects Delivered",
    },
    {
        icon: Rocket,
        value: "100%",
        label: "Built With Purpose",
    },
    {
        icon: UsersRound,
        value: "1:1",
        label: "Client Collaboration",
    },
];

const SyntacStats = () => {
    return (
        <div className="grid grid-cols-1 border-y border-dashed md:grid-cols-6 xl:grid-cols-5" id={'stats'}>
            {stats.map((stat, index) => {
                const Icon = stat.icon;

                return (
                    <div
                        key={stat.label}
                        className={[
                            "flex flex-col items-center gap-6 border-dashed px-4 py-6",
                            "md:px-6 md:py-9",
                            "max-xl:border-b",
                            "md:max-xl:col-span-3",
                            "xl:border-r",
                            index === stats.length - 1
                                ? "xl:border-r-0"
                                : "",
                        ].join(" ")}
                    >
                        <Icon
                            className="text-muted-foreground size-7 stroke-1"
                            aria-hidden="true"
                        />

                        <div className="flex flex-col items-center gap-3">
                            <h3 className="text-4xl font-semibold">
                                <span className="inline-block tabular-nums">
                                    {stat.value}
                                </span>
                            </h3>

                            <p className="text-muted-foreground text-center text-lg">
                                {stat.label}
                            </p>
                        </div>
                    </div>
                );
            })}
        </div>
    );
};

export default SyntacStats;
