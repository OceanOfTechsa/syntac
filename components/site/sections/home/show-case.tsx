"use client";

import React, { useRef, useState } from "react";
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
    /** How many times to repeat the cards inside each belt (higher = longer seamless track) */
    repeat?: number;
}

function Card({ image, href }: MarqueeCard) {
    const [loaded, setLoaded] = useState(false);

    return (
        <Link
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
                "group relative flex-shrink-0 overflow-hidden rounded-sm border",
                "bg-neutral-100/40 dark:bg-neutral-900/40",
                // Fixed size is critical — no layout shift ever
                "aspect-[2640/1184] w-64 sm:w-80 md:w-96 lg:w-[28rem] xl:w-[32rem]",
                "transition-opacity duration-500 ease-out",
                "focus-visible:outline-none focus-visible:ring-0",
            )}
        >
            {/* Placeholder of exact same size */}
            <div
                className={cn(
                    "absolute inset-0 bg-neutral-200/80 dark:bg-neutral-800/80 transition-opacity duration-500",
                    loaded ? "opacity-0" : "opacity-100",
                )}
            />

            {image && (
                <Image
                    src={image}
                    alt=""
                    fill
                    sizes="(max-width: 640px) 60vw, (max-width: 1024px) 40vw, 30vw"
                    className={cn(
                        "object-contain transition-opacity duration-500",
                        loaded ? "opacity-100" : "opacity-0",
                    )}
                    loading="lazy"
                    onLoad={() => setLoaded(true)}
                />
            )}
        </Link>
    );
}

const OpposingCards = ({
                           cards,
                           speed = 40,
                           className,
                           repeat = 3, // 3× is usually enough for a long continuous belt
                       }: OpposingCardsProps) => {
    const topRef = useRef<HTMLDivElement>(null);
    const bottomRef = useRef<HTMLDivElement>(null);

    if (cards.length === 0) return null;

    // Create one long belt by repeating the full list
    const belt = Array.from({ length: repeat }, () => cards).flat();

    useOpposingMarquee(topRef, bottomRef, { speed, repeat }, [cards, repeat]);

    return (
        <section
            className={cn(
                "relative w-full overflow-hidden pb-26 ",
                className,
            )}

            id={'show-case'}
        >
            {/* Edge fades */}
            {/*<div className="pointer-events-none absolute inset-y-0 left-0 z-20 w-16 sm:w-28 md:w-40 bg-gradient-to-r from-neutral-50 dark:from-neutral-950 to-transparent" />*/}
            {/*<div className="pointer-events-none absolute inset-y-0 right-0 z-20 w-16 sm:w-28 md:w-40 bg-gradient-to-l from-neutral-50 dark:from-neutral-950 to-transparent" />*/}
            <div className="from-background absolute inset-y-0 left-0 w-16 sm:w-28 md:w-40 z-20 bg-linear-to-r to-transparent"></div>
            <div className="from-background absolute inset-y-0 right-0 w-16 sm:w-28 md:w-40 z-20 bg-linear-to-l to-transparent"></div>

            {/* TOP belt → moves left */}
            <div
                ref={topRef}
                className="mb-6 flex gap-6 will-change-transform sm:mb-7 sm:gap-7"
                style={{ width: "max-content" }}
            >
                {belt.map((card, i) => (
                    <Card key={`top-${i}`} {...card} />
                ))}
            </div>

            {/* BOTTOM belt → moves right */}
            <div
                ref={bottomRef}
                className="flex gap-6 will-change-transform sm:gap-7"
                style={{ width: "max-content" }}
            >
                {belt.map((card, i) => (
                    <Card key={`bottom-${i}`} {...card} />
                ))}
            </div>
        </section>
    );
};

export default OpposingCards;