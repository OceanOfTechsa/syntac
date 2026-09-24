"use client";

import { RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { motion } from "@/lib/gsap/presets";
import { useGsap } from "@/lib/gsap/hooks/use-gsap";

interface UseAvatarRevealOptions {
    stagger?: number;
    duration?: number;
    y?: number;
    blur?: number;
    scale?: number;
    scrollTrigger?: boolean; // default true — set false for above-the-fold usage
    start?: string;
}

export function useAvatarReveal(
    ref: RefObject<HTMLElement | null>,
    options: UseAvatarRevealOptions = {},
    deps: unknown[] = []
) {
    const {
        stagger = 0.12,
        duration = 1.1,
        y = 6,
        blur = 6,
        scale = 0.94,
        scrollTrigger = true,
        start = "top 90%",
    } = options;

    useGsap(
        ref,
        () => {
            if (!ref.current) return;

            const avatars = ref.current.querySelectorAll(
                '[data-slot="avatar"]'
            );

            if (!avatars.length) return;

            // Ensure each avatar animates above its neighbors while revealing,
            // so overlap/negative-margin stacking doesn't hide the effect
            gsap.set(avatars, { zIndex: (i) => i + 1 });

            const restoreStacking = () => {
                gsap.set(avatars, { clearProps: "zIndex" });
            };

            gsap.fromTo(
                avatars,
                {
                    opacity: 0,
                    y,
                    scale,
                    filter: `blur(${blur}px)`,
                },
                {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    filter: "blur(0px)",
                    duration,
                    stagger,
                    ease: "power2.out",
                    onComplete: restoreStacking,

                    ...(scrollTrigger && {
                        scrollTrigger: {
                            trigger: ref.current,
                            start,
                            toggleActions: "play none none none",
                        },
                    }),
                }
            );
        },
        [stagger, duration, y, blur, scale, scrollTrigger, start, ...deps]
    );
}