"use client";

import { RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { motion } from "@/lib/gsap/presets";
import {useGsap} from "@/lib/gsap/hooks/use-gsap";

export function useScaleIn(
    ref: RefObject<HTMLElement | null>,
    options: {
        from?: number;
        duration?: number;
    } = {}
) {
    const {
        from = 0.96,
        duration = motion.duration.slow,
    } = options;

    useGsap(
        ref,
        () => {
            if (!ref.current) return;

            gsap.fromTo(
                ref.current,
                {
                    opacity: 0,
                    scale: from,
                },
                {
                    opacity: 1,
                    scale: 1,
                    duration,
                    ease: motion.ease.smooth,

                    scrollTrigger: {
                        trigger: ref.current,
                        start: motion.scroll.start,
                        toggleActions: "play none none none",
                    },
                }
            );
        },
        []
    );
}