"use client";

import { useEffect, useRef } from "react";
import { gsap } from "@/lib/gsap"; // or "gsap" if you don't have a custom import

interface FadeUpOptions {
    /** Delay before the animation starts (seconds) */
    delay?: number;
    /** Duration of the animation (seconds) */
    duration?: number;
    /** How far the element moves up (px) */
    y?: number;
    /** Starting blur amount (px) */
    blur?: number;
    /** IntersectionObserver threshold (0–1) */
    threshold?: number;
    /** Root margin for the observer */
    rootMargin?: string;
}

export function useFadeUp<T extends HTMLElement = HTMLDivElement>(
    options: FadeUpOptions = {}
) {
    const {
        delay = 0,
        duration = 0.8,
        y = 24,
        blur = 8,
        threshold = 0.15,
        rootMargin = "0px 0px -40px 0px",
    } = options;

    const ref = useRef<T>(null);
    const hasAnimated = useRef(false);

    useEffect(() => {
        const el = ref.current;
        if (!el || hasAnimated.current) return;

        // Set initial state
        gsap.set(el, {
            opacity: 0,
            y,
            filter: `blur(${blur}px)`,
        });

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting && !hasAnimated.current) {
                    hasAnimated.current = true;

                    gsap.to(el, {
                        opacity: 1,
                        y: 0,
                        filter: "blur(0px)",
                        duration,
                        delay,
                        ease: "power2.out",
                    });

                    observer.unobserve(el);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(el);

        return () => {
            observer.disconnect();
        };
    }, [delay, duration, y, blur, threshold, rootMargin]);

    return ref;
}