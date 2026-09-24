"use client";

import { RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { motion } from "@/lib/gsap/presets";
import {useGsap} from "@/lib/gsap/hooks/use-gsap";

export function useFadeIn(
    ref: RefObject<HTMLElement | null>,
    options: {
        duration?: number;
        delay?: number;
    } = {}
) {
    const {
        duration = motion.duration.normal,
        delay = 0,
    } = options;

    useGsap(
        ref,
        () => {
            if (!ref.current) return;

            gsap.fromTo(
                ref.current,
                {
                    opacity: 0,
                },
                {
                    opacity: 1,
                    duration,
                    delay,
                    ease: motion.ease.soft,

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