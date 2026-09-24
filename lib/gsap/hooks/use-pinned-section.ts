"use client";

import { RefObject } from "react";

import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/gsap/hooks/use-gsap";

interface UsePinnedSectionOptions {
    end?: string;
}

export function usePinnedSection(
    ref: RefObject<HTMLElement | null>,
    options: UsePinnedSectionOptions = {}
) {
    const {
        end = "+=100%",
    } = options;

    useGsap(
        ref,
        () => {
            if (!ref.current) return;

            gsap.to(ref.current, {
                scrollTrigger: {
                    trigger: ref.current,
                    start: "top top",
                    end,
                    pin: true,
                    scrub: true,
                },
            });
        },
        []
    );
}