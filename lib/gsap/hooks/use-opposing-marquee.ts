"use client";

import { RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/gsap/hooks/use-gsap";

interface UseOpposingMarqueeOptions {
    speed?: number;
    repeat?: number;
}

export function useOpposingMarquee(
    topRef: RefObject<HTMLDivElement | null>,
    bottomRef: RefObject<HTMLDivElement | null>,
    options: UseOpposingMarqueeOptions = {},
    deps: unknown[] = [],
) {
    const { speed = 40, repeat = 3 } = options;

    useGsap(
        topRef,
        () => {
            const top = topRef.current;
            const bottom = bottomRef.current;
            if (!top || !bottom) return;

            // Keep the current tweens in variables that the handlers can always reach
            let topTween: gsap.core.Tween | null = null;
            let bottomTween: gsap.core.Tween | null = null;

            const setup = (row: HTMLDivElement, direction: "left" | "right") => {
                gsap.killTweensOf(row);
                void row.offsetWidth;

                const oneSetWidth = row.scrollWidth / repeat;
                if (oneSetWidth < 10) return null;

                if (direction === "left") {
                    gsap.set(row, { x: 0 });
                    return gsap.to(row, {
                        x: -oneSetWidth,
                        duration: oneSetWidth / speed,
                        ease: "none",
                        repeat: -1,
                        force3D: true,
                        modifiers: {
                            x: gsap.utils.unitize(gsap.utils.wrap(-oneSetWidth, 0)),
                        },
                    });
                } else {
                    gsap.set(row, { x: -oneSetWidth });
                    return gsap.to(row, {
                        x: 0,
                        duration: oneSetWidth / speed,
                        ease: "none",
                        repeat: -1,
                        force3D: true,
                        modifiers: {
                            x: gsap.utils.unitize(gsap.utils.wrap(-oneSetWidth, 0)),
                        },
                    });
                }
            };

            // Initial setup
            topTween = setup(top, "left");
            bottomTween = setup(bottom, "right");

            // These handlers always use the latest tween references
            const pauseTop = () => topTween?.pause();
            const resumeTop = () => topTween?.play();
            const pauseBottom = () => bottomTween?.pause();
            const resumeBottom = () => bottomTween?.play();

            top.addEventListener("mouseenter", pauseTop);
            top.addEventListener("mouseleave", resumeTop);
            bottom.addEventListener("mouseenter", pauseBottom);
            bottom.addEventListener("mouseleave", resumeBottom);

            // Re-setup on size changes, but keep the same handler functions
            const ro = new ResizeObserver(() => {
                topTween = setup(top, "left");
                bottomTween = setup(bottom, "right");
            });
            ro.observe(top);
            ro.observe(bottom);

            return () => {
                top.removeEventListener("mouseenter", pauseTop);
                top.removeEventListener("mouseleave", resumeTop);
                bottom.removeEventListener("mouseenter", pauseBottom);
                bottom.removeEventListener("mouseleave", resumeBottom);
                ro.disconnect();
                topTween?.kill();
                bottomTween?.kill();
            };
        },
        [speed, repeat, ...deps],
    );
}