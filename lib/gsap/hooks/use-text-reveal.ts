"use client";

import { RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { motion } from "@/lib/gsap/presets";
import { useGsap } from "@/lib/gsap/hooks/use-gsap";

export function useTextReveal(
    ref: RefObject<HTMLElement | null>
) {
    useGsap(
        ref,
        () => {
            if (!ref.current) return;

            const lines = ref.current.querySelectorAll("[data-line]");

            gsap.fromTo(
                lines,
                {
                    opacity: 0,
                    y: 24,
                },
                {
                    opacity: 1,
                    y: 0,
                    duration: 0.8,
                    stagger: 0.08,
                    ease: motion.ease.smooth,

                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top 80%",
                        toggleActions: "play none none none",
                    },
                }
            );
        },
        []
    );
}