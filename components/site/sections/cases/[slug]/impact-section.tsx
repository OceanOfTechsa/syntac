import React from 'react'
import {Clock, ShieldCheck, Sparkles, TrendingUp, User, Zap} from "lucide-react";
import type {LucideIcon} from "lucide-react";

import {cn} from "@/lib/utils";
import type {CaseStudy, ImpactIcon} from "@/utils/Site/case-studies";
import SectionHeader from "@/components/site/shared/section-header";

const ICONS: Record<ImpactIcon, LucideIcon> = {
    "user": User,
    "sparkles": Sparkles,
    "zap": Zap,
    "trending-up": TrendingUp,
    "clock": Clock,
    "shield": ShieldCheck,
};

// Full class names written out so Tailwind can see them
const GRID_BY_COUNT: Record<number, string> = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2 sm:divide-x",
    3: "sm:grid-cols-3 sm:divide-x",
};

interface IImpactSectionProps {
    study: CaseStudy
}

const ImpactSection = ({study}: IImpactSectionProps) => {
    // The layout is built for 1 to 3 cards
    const cards = study.impact?.cards.slice(0, 3) ?? [];
    if (cards.length === 0) return null;

    return (
        <section id="impact" className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24">
            <SectionHeader
                preTitle={'Project Impact'}
                title={'The Difference Our Work Makes'}
                markedWord={'Difference'}
                desc={'Explore the outcomes, improvements, and value delivered through this project, and how the solution addresses real business challenges.'}
            />
            <div className="border-y border-dashed">
                <div
                    className={cn(
                        "mx-auto grid w-full max-w-256 grid-cols-1 divide-dashed max-sm:divide-y min-[1026px]:border-x lg:border-dashed",
                        GRID_BY_COUNT[cards.length]
                    )}
                >
                    {cards.map((card) => {
                        const Icon = ICONS[card.icon ?? "sparkles"];

                        return (
                            <div key={card.heading} className="px-4 py-8 sm:px-6 lg:px-8">
                                <div className="flex items-center gap-2 text-sm font-medium">
                                    <Icon className="size-4" aria-hidden="true" />
                                    {card.heading}
                                </div>

                                <p className="text-muted-foreground mt-6 text-xs font-medium tracking-wide uppercase">
                                    {card.metricLabel}
                                </p>
                                <p className="mt-1 text-4xl font-semibold sm:text-5xl">
                                    {card.metricValue}
                                    {card.metricUnit && (
                                        <span className="text-muted-foreground ml-1 text-lg font-normal">
                                            {card.metricUnit}
                                        </span>
                                    )}
                                </p>

                                {card.points.length > 0 && (
                                    <ul className="mt-6 ml-5 list-disc space-y-2">
                                        {card.points.map((point) => (
                                            <li key={point} className="text-muted-foreground text-sm">
                                                {point}
                                            </li>
                                        ))}
                                    </ul>
                                )}

                                {card.footerLabel && card.footerValue && (
                                    <div className="mt-6 border-t border-dashed pt-6">
                                        <p className="text-muted-foreground text-xs font-medium tracking-wide uppercase">
                                            {card.footerLabel}
                                        </p>
                                        <p className="mt-1 text-4xl font-semibold sm:text-5xl">{card.footerValue}</p>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    )
}
export default ImpactSection