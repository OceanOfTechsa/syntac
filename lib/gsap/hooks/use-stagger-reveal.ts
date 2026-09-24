"use client";

import { RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { motion } from "@/lib/gsap/presets";
import {useGsap} from "@/lib/gsap/hooks/use-gsap";

interface UseStaggerRevealOptions {
    selector?: string;
    y?: number;
    stagger?: number;
    duration?: number;
    delay?: number;
}

export function useStaggerReveal(
    ref: RefObject<HTMLElement | null>,
    options: UseStaggerRevealOptions = {}
) {
    const {
        selector = "[data-reveal]",
        y = motion.distance.small,
        stagger = 0.08,
        duration = motion.duration.normal,
        delay = 0,
    } = options;

    useGsap(
        ref,
        () => {
            if (!ref.current) return;

            const elements = ref.current.querySelectorAll(selector);

            if (!elements.length) return;

            gsap.fromTo(
                elements,
                {
                    opacity: 0,
                    y,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration,
                    stagger,
                    delay,
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