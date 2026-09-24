"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useOpposingMarquee } from "@/lib/gsap/hooks/use-opposing-marquee";
import Link from "next/link";
import Image from "next/image";

export interface MarqueeCard {
    image: string;
    href: string;
}

interface OpposingCardsProps {
    cards: MarqueeCard[];
    speed?: number;
    className?: string;
}

function Card({ image, href }: MarqueeCard) {

    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "group relative h-auto flex-shrink-0 overflow-hidden rounded-sm border",
                "bg-neutral-100/30 dark:bg-neutral-900/30",
                "aspect-[2640/1184] w-64 rounded-sm sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem]",
                "transition-all duration-300 ease-out",
                "focus-visible:outline-none focus-visible:ring-0 focus-visible:ring-offset-0",
            )}
        >
            <Image
                src={image ?? '/assets/shared/image-not-found.png'}
                alt=""
                fill
                sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 30vw"
                className="object-contain"
                loading="lazy"
            />
        </Link>
    );
}
const OpposingCards = ({
                           cards,
                           speed = 20,
                           className,
                       }: OpposingCardsProps) => {
    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    if (cards.length === 0) return null;

    const mid = Math.ceil(cards.length / 2);
    const topCards = cards.slice(0, mid);
    const bottomCards = cards.slice(mid);

    useOpposingMarquee(topRef, bottomRef, { speed }, [cards]);

    return (
        <section className={cn("relative w-full overflow-hidden pb-26 border-b border-dashed", className)}>
            <div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-neutral-50 dark:from-neutral-950 to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-neutral-50 dark:from-neutral-950 to-transparent" />

            <div
                ref={topRef}
                className="mb-6 flex gap-6 will-change-transform sm:mb-7 sm:gap-7"
                style={{ width: "max-content" }}
            >
                {topCards.map((card, i) => (
                    <Card key={`top-${i}`} {...card} />
                ))}
            </div>

            <div ref={bottomRef} className="flex gap-6 will-change-transform sm:gap-7"
                style={{ width: "max-content" }}
            >
                {bottomCards.map((card, i) => (
                    <Card key={`bottom-${i}`} {...card} />
                ))}
            </div>
        </section>
    );
};

export default OpposingCards;