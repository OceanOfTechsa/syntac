"use client";

import { RefObject } from "react";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/gsap/hooks/use-gsap";

interface UseOpposingMarqueeOptions {
    speed?: number; // px per second
}

export function useOpposingMarquee(
    topRef: RefObject<HTMLDivElement | null>,
    bottomRef: RefObject<HTMLDivElement | null>,
    options: UseOpposingMarqueeOptions = {},
    deps: unknown[] = []
) {
    const { speed = 20 } = options;

    useGsap(
        topRef,
        () => {
            const top = topRef.current;
            const bottom = bottomRef.current;
            if (!top || !bottom) return;

            const setupRow = (row: HTMLDivElement, direction: "left" | "right") => {
                Array.from(row.children).forEach((el) => {
                    if ((el as HTMLElement).dataset.clone) el.remove();
                });

                const originals = Array.from(row.children) as HTMLElement[];
                if (originals.length === 0) return null;

                originals.forEach((child) => {
                    const clone = child.cloneNode(true) as HTMLElement;
                    clone.dataset.clone = "true";
                    clone.setAttribute("aria-hidden", "true");
                    clone.style.pointerEvents = "none";
                    row.appendChild(clone);
                });

                void row.offsetWidth; // force reflow

                const totalWidth = row.scrollWidth / 2;
                if (totalWidth === 0) return null;

                gsap.killTweensOf(row);

                if (direction === "left") {
                    gsap.set(row, { x: 0 });
                } else {
                    gsap.set(row, { x: -totalWidth });
                }

                return gsap.to(row, {
                    x: direction === "left" ? -totalWidth : 0,
                    duration: totalWidth / speed,
                    ease: "none",
                    repeat: -1,
                    force3D: true,
                    modifiers: {
                        x: gsap.utils.unitize(gsap.utils.wrap(-totalWidth, 0)),
                    },
                });
            };

            const topTween = setupRow(top, "left");
            const bottomTween = setupRow(bottom, "right");

            const pauseTop = () => topTween?.pause();
            const resumeTop = () => topTween?.play();
            const pauseBottom = () => bottomTween?.pause();
            const resumeBottom = () => bottomTween?.play();

            top.addEventListener("mouseenter", pauseTop);
            top.addEventListener("mouseleave", resumeTop);
            bottom.addEventListener("mouseenter", pauseBottom);
            bottom.addEventListener("mouseleave", resumeBottom);

            return () => {
                top.removeEventListener("mouseenter", pauseTop);
                top.removeEventListener("mouseleave", resumeTop);
                bottom.removeEventListener("mouseenter", pauseBottom);
                bottom.removeEventListener("mouseleave", resumeBottom);
                topTween?.kill();
                bottomTween?.kill();
            };
        },
        [speed, ...deps]
    );
}