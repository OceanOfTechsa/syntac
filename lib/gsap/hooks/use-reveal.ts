"use client";

import { RefObject } from "react";

import { gsap, ScrollTrigger } from "@/lib/gsap";
import { motion } from "@/lib/gsap/presets";
import {useGsap} from "@/lib/gsap/hooks/use-gsap";

interface UseRevealOptions {
    y?: number;
    duration?: number;
    delay?: number;
    start?: string;
    once?: boolean;
}

export function useReveal(
    ref: RefObject<HTMLElement | null>,
    options: UseRevealOptions = {}
) {
    const {
        y = motion.distance.medium,
        duration = motion.duration.normal,
        delay = 0,
        start = motion.scroll.start,
        once = true,
    } = options;

    useGsap(
        ref,
        (): void => {
            if (!ref.current) return;

            gsap.fromTo(
                ref.current,
                {
                    opacity: 0,
                    y,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration,
                    delay,
                    ease: motion.ease.smooth,

                    scrollTrigger: {
                        trigger: ref.current,
                        start,
                        toggleActions: once
                            ? "play none none none"
                            : "play none none reverse",
                    } satisfies ScrollTrigger.Vars,
                }
            );
        },
        []
    );
}