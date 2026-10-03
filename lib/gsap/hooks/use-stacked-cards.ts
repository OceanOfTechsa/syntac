"use client";

import { RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/gsap/hooks/use-gsap";

interface UseStackedCardsOptions {
    duration?: number;
    hold?: number;
    offsetY?: number;
    scaleStep?: number;
}

export function useStackedCards(
    containerRef: RefObject<HTMLElement | null>,
    options: UseStackedCardsOptions = {}
) {
    const {
        duration = 1.35,
        hold = 3.2,
        offsetY = 14,
        scaleStep = 0.045,
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

            const positionProps = (position: number) => {
                const scales = [1, 0.94, 0.88];
                const scale = scales[position] ?? 1 - position * scaleStep;

                return {
                    zIndex: total - position,
                    y: position * offsetY,
                    scale,
                    opacity: position < VISIBLE ? 1 : 0,
                    transformOrigin: "center top",
                };
            };

            cards.forEach((card, i) => {
                gsap.set(card, {
                    ...positionProps(i),
                    force3D: true,
                });
            });

            const cycle = () => {
                const front = cards[0];
                const middle = cards[1];
                const back = cards[2];
                const next = cards[3];

                const tl = gsap.timeline({
                    defaults: {
                        ease: "power3.inOut",
                        force3D: true,
                    },
                    onComplete: () => {
                        cards.push(cards.shift()!);
                        container.appendChild(front);

                        gsap.set(front, {
                            ...positionProps(total - 1),
                            opacity: 0,
                        });

                        cards.forEach((card, i) => {
                            gsap.set(card, { zIndex: total - i });
                        });
                    },
                });

                tl.to(
                    front,
                    {
                        opacity: 0,
                        scale: 0.96,
                        y: offsetY * 0.4,
                        duration: duration * 0.7,
                        ease: "power2.inOut",
                    },
                    0
                );

                if (middle) {
                    tl.to(
                        middle,
                        { ...positionProps(0), duration },
                        duration * 0.12
                    );
                }

                if (back) {
                    tl.to(
                        back,
                        { ...positionProps(1), duration: duration * 0.95 },
                        duration * 0.18
                    );
                }

                if (next) {
                    gsap.set(next, {
                        ...positionProps(VISIBLE),
                        opacity: 0,
                        scale: 0.82,
                    });

                    tl.to(
                        next,
                        {
                            ...positionProps(2),
                            duration: duration * 0.9,
                            ease: "power2.out",
                        },
                        duration * 0.25
                    );
                }
            };

            const master = gsap.timeline({ repeat: -1 });
            master.call(cycle).to({}, { duration: hold + duration });

            // Pause / resume on hover
            const pause = () => master.pause();
            const resume = () => master.resume();

            container.addEventListener("mouseenter", pause);
            container.addEventListener("mouseleave", resume);

            return () => {
                container.removeEventListener("mouseenter", pause);
                container.removeEventListener("mouseleave", resume);
                master.kill();
            };
        },
        [duration, hold, offsetY, scaleStep]
    );
}