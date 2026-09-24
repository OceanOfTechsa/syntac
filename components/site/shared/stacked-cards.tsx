"use client";

import { useRef, ReactNode } from "react";
import { cn } from "@/lib/utils";
import { useStackedCards } from "@/lib/gsap/hooks/use-stacked-cards";

interface StackedCardsProps {
    children: ReactNode;
    duration?: number;
    hold?: number;
    offsetY?: number;
    scaleStep?: number;
    className?: string;
}

export function StackedCards({
                                 children,
                                 duration = 1.1,
                                 hold = 2.8,
                                 offsetY = 10,
                                 scaleStep = 0.035,
                                 className,
                             }: StackedCardsProps) {
    const containerRef = useRef<HTMLDivElement>(null);

    useStackedCards(containerRef, {
        duration,
        hold,
        offsetY,
        scaleStep,
    });

    return (
        <div
            ref={containerRef}
            className={cn("relative", className)}
        >
            {children}
        </div>
    );
}