"use client";

import { RefObject } from "react";

import { gsap } from "@/lib/gsap";
import {useGsap} from "@/lib/gsap/hooks/use-gsap";

export function useImageReveal(
    ref: RefObject<HTMLElement | null>
) {
    useGsap(
        ref,
        () => {
            if (!ref.current) return;

            gsap.fromTo(
                ref.current,
                {
                    clipPath: "inset(0 100% 0 0)",
                },
                {
                    clipPath: "inset(0 0% 0 0)",
                    duration: 1.1,
                    ease: "power3.inOut",

                    scrollTrigger: {
                        trigger: ref.current,
                        start: "top 85%",
                        toggleActions: "play none none none",
                    },
                }
            );
        },
        []
    );
}