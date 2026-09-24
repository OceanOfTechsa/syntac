"use client";

import { RefObject } from "react";

import { gsap } from "@/lib/gsap";
import {useGsap} from "@/lib/gsap/hooks/use-gsap";

interface UseParallaxOptions {
    y?: number;
    scrub?: number;
}

export function useParallax(
    ref: RefObject<HTMLElement | null>,
    options: UseParallaxOptions = {}
) {
    const {
        y = 80,
        scrub = 1,
    } = options;

    useGsap(
        ref,
        () => {
            if (!ref.current) return;

            gsap.to(ref.current, {
                y,

                ease: "none",

                scrollTrigger: {
                    trigger: ref.current,
                    start: "top bottom",
                    end: "bottom top",
                    scrub,
                },
            });
        },
        []
    );
}