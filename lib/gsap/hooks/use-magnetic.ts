"use client";

import { RefObject } from "react";

import { gsap } from "@/lib/gsap";
import {useGsap} from "@/lib/gsap/hooks/use-gsap";

export function useMagnetic(
    ref: RefObject<HTMLElement | null>,
    strength = 0.15
) {
    useGsap(
        ref,
        () => {
            const element = ref.current;

            if (!element) return;

            const handleMove = (event: MouseEvent) => {
                const rect = element.getBoundingClientRect();

                const x =
                    event.clientX -
                    rect.left -
                    rect.width / 2;

                const y =
                    event.clientY -
                    rect.top -
                    rect.height / 2;

                gsap.to(element, {
                    x: x * strength,
                    y: y * strength,
                    duration: 0.35,
                    ease: "power3.out",
                });
            };

            const handleLeave = () => {
                gsap.to(element, {
                    x: 0,
                    y: 0,
                    duration: 0.6,
                    ease: "elastic.out(1, 0.5)",
                });
            };

            element.addEventListener("mousemove", handleMove);
            element.addEventListener("mouseleave", handleLeave);

            return () => {
                element.removeEventListener(
                    "mousemove",
                    handleMove
                );

                element.removeEventListener(
                    "mouseleave",
                    handleLeave
                );
            };
        },
        []
    );
}