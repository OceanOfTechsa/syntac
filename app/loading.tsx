"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const Loading = () => {
    const barRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            tl.fromTo(
                barRef.current,
                { scaleX: 0 },
                {
                    scaleX: 0.7,
                    duration: 1.2,
                    ease: "power2.out",
                }
            );

            tl.to(barRef.current, {
                scaleX: 0.92,
                duration: 2.5,
                ease: "power1.inOut",
            });
        });

        return () => ctx.revert();
    }, []);

    return (
        <>
            {/* Invisible overlay that blocks all clicks */}
            <div className="fixed inset-0 z-[99998]" />

            {/* Thin progress bar on top */}
            <div className="pointer-events-none fixed inset-x-0 top-0 z-[99999]">
                <div
                    ref={barRef}
                    className="h-[3px] w-full origin-left bg-zinc-900 dark:bg-zinc-100"
                    style={{ transform: "scaleX(0)" }}
                />
            </div>
        </>
    );
};

export default Loading;