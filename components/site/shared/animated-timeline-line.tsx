"use client";

import { useRef } from "react";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/gsap/hooks/use-gsap";

const AnimatedTimelineLine = () => {
    const lineRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);

    useGsap(lineRef, () => {
        if (!glowRef.current) return;

        gsap.to(glowRef.current, {
            xPercent: 500,
            duration: 8,
            ease: "none",
            repeat: -1,
            repeatDelay: 1,
        });
    }, []);

    return (
        <div
            ref={lineRef}
            className="relative flex h-px flex-1 overflow-hidden bg-linear-to-r from-transparent via-primary/20 to-transparent"
        >
            <div
                ref={glowRef}
                className="absolute left-0 top-0 h-px w-1/5 -translate-x-full bg-linear-to-r from-transparent via-black to-orange-500 dark:via-white dark:to-orange-400"
            />
        </div>
    );
};

export default AnimatedTimelineLine;