"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedMenuToggleProps {
    open: boolean;
    onClick: () => void;
}

export default function AnimatedMenuToggle({ open, onClick }: AnimatedMenuToggleProps) {
    const topRef = useRef<HTMLSpanElement>(null);
    const midRef = useRef<HTMLSpanElement>(null);
    const botRef = useRef<HTMLSpanElement>(null);

    const timelineRef = useRef<gsap.core.Timeline | null>(null);

    useLayoutEffect(() => {
        const timeline = gsap.timeline({
            paused: true,
        });

        timeline
            .to(
                topRef.current,
                {
                    y: 6,
                    rotate: 45,
                    duration: 0.35,
                    ease: "power2.inOut",
                },
                0
            )
            .to(
                midRef.current,
                {
                    opacity: 0,
                    scaleX: 0,
                    duration: 0.25,
                    ease: "power2.inOut",
                },
                0
            )
            .to(
                botRef.current,
                {
                    y: -6,
                    rotate: -45,
                    duration: 0.35,
                    ease: "power2.inOut",
                },
                0
            );

        timelineRef.current = timeline;

        return () => {
            timeline.kill();
        };
    }, []);

    useLayoutEffect(() => {
        if (!timelineRef.current) return;

        if (open) {
            timelineRef.current.play();
        } else {
            timelineRef.current.reverse();
        }
    }, [open]);

    return (
        <button type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={onClick}
            className="relative flex h-9 w-9 cursor-pointer items-center justify-center rounded-full md:hidden"
        >
            <div className="relative flex h-4 w-5 flex-col items-center justify-between">
                <span ref={topRef}
                    className="block h-[1.5px] w-full origin-center rounded-full bg-neutral-900 dark:bg-white"
                />

                <span
                    ref={midRef}
                    className="block h-[1.5px] w-full origin-center rounded-full bg-neutral-900 dark:bg-white"
                />

                <span
                    ref={botRef}
                    className="block h-[1.5px] w-full origin-center rounded-full bg-neutral-900 dark:bg-white"
                />
            </div>
        </button>
    );
}