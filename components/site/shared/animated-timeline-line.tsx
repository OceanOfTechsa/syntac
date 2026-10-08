"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "@/lib/gsap";
import { useGsap } from "@/lib/gsap/hooks/use-gsap";

/* ---- Controls ---- */
const GLOW_WIDTH = 10; // % of the line the glow covers. Smaller = shorter glow
const DURATION = 7; // seconds for one full pass. Higher = slower

const AnimatedTimelineLine = () => {
    const lineRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const [lineWidth, setLineWidth] = useState(0);

    // Measure the line itself (the glow's parent), and re-measure whenever it resizes
    useEffect(() => {
        const line = lineRef.current;
        if (!line) return;

        const observer = new ResizeObserver(([entry]) => {
            setLineWidth(Math.round(entry.contentRect.width));
        });

        observer.observe(line);
        return () => observer.disconnect();
    }, []);

    useGsap(
        lineRef,
        () => {
            if (!glowRef.current || !lineWidth) return;

            const glowWidth = lineWidth * (GLOW_WIDTH / 100);

            // Start fully off the left edge, end with the glow's left edge on the line's right
            // edge (so it is fully off the right), measured in px from the line's real width
            gsap.fromTo(
                glowRef.current,
                { x: -glowWidth },
                {
                    x: lineWidth,
                    duration: DURATION,
                    ease: "none",
                    repeat: -1,
                }
            );
        },
        [lineWidth]
    );

    return (
        <div
            ref={lineRef}
            className="relative flex h-px flex-1 overflow-hidden bg-linear-to-r from-transparent via-primary/20 to-transparent"
        >
            <div
                ref={glowRef}
                style={{
                    width: `${GLOW_WIDTH}%`,
                    visibility: lineWidth ? "visible" : "hidden", // no flash before the first measurement
                }}
                className="absolute left-0 top-0 h-px bg-linear-to-r from-transparent via-black to-orange-500 dark:via-white dark:to-orange-400"
            />
        </div>
    );
};

export default AnimatedTimelineLine;