"use client";

import { RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/gsap/hooks/use-gsap";

interface UseStackedCardsOptions {
    /** Duration of the transition (seconds) */
    duration?: number;
    /** How long the front card stays (seconds) */
    hold?: number;
    /** Vertical distance between card tops (px) — keep small for subtlety */
    offsetY?: number;
    /** Scale reduction per depth level — keep small for subtlety */
    scaleStep?: number;
}

export function useStackedCards(
    containerRef: RefObject<HTMLElement | null>,
    options: UseStackedCardsOptions = {}
) {
    const {
        duration = 1.1,
        hold = 2.8,
        offsetY = 10,
        scaleStep = 0.035,
    } = options;

    useGsap(
        containerRef,
        () => {
            const container = containerRef.current;
            if (!container) return;

            const cards = gsap.utils.toArray<HTMLElement>(container.children);
            if (cards.length < 2) return;

            const VISIBLE = 3;
            const total = cards.length;

            const positionProps = (position: number) => ({
                zIndex: total - position,
                y: position * offsetY,
                scale: 1 - position * scaleStep,
                opacity: position < VISIBLE ? 1 : 0,
                transformOrigin: "center top",
            });

            // Initial setup
            cards.forEach((card, i) => {
                gsap.set(card, positionProps(i));
            });

            const cycle = () => {
                const front = cards[0];
                const middle = cards[1];
                const back = cards[2];
                const next = cards[3];

                const tl = gsap.timeline({
                    defaults: { ease: "power2.out" },
                    onComplete: () => {
                        cards.push(cards.shift()!);
                        container.appendChild(front);

                        gsap.set(front, positionProps(total - 1));
                        gsap.set(front, { opacity: 0 });

                        cards.forEach((card, i) => {
                            gsap.set(card, { zIndex: total - i });
                        });
                    },
                });

                // 1. Front card quietly disappears — no upward motion, just a soft fade + tiny scale-down
                tl.to(
                    front,
                    {
                        opacity: 0,
                        scale: 1 - scaleStep * 0.6,
                        duration: duration * 0.55,
                        ease: "power1.inOut",
                    },
                    0
                );

                // 2. Middle card advances to front — subtle, smooth
                if (middle) {
                    tl.to(
                        middle,
                        {
                            ...positionProps(0),
                            duration,
                        },
                        duration * 0.15
                    );
                }

                // 3. Back card advances to middle — subtle, smooth
                if (back) {
                    tl.to(
                        back,
                        {
                            ...positionProps(1),
                            duration,
                        },
                        duration * 0.15
                    );
                }

                // 4. Next card fades in at the back, settling into position
                if (next) {
                    gsap.set(next, {
                        ...positionProps(VISIBLE),
                        opacity: 0,
                    });

                    tl.to(
                        next,
                        {
                            ...positionProps(2),
                            duration,
                            ease: "power1.out",
                        },
                        duration * 0.3
                    );
                }
            };

            const master = gsap.timeline({ repeat: -1 });
            master.call(cycle).to({}, { duration: hold + duration });

            return () => {
                master.kill();
            };
        },
        [duration, hold, offsetY, scaleStep]
    );
}