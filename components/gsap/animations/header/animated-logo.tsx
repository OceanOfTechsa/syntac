"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Image from "next/image";

import AppSettings from "@/utils/AppSettings/AppSettings";

interface AnimatedLogoProps {
    scrolled: boolean;
}

export default function AnimatedLogo({scrolled}: AnimatedLogoProps) {
    const rootRef = useRef<HTMLAnchorElement>(null);
    const iconRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const circleRef = useRef<HTMLSpanElement>(null);

    const timelineRef = useRef<gsap.core.Timeline | null>(null);
    const first = useRef(true);

    useLayoutEffect(() => {
        const root = rootRef.current;

        if (!root) return;

        const ctx = gsap.context(() => {
            const reduceMotion = window.matchMedia(
                "(prefers-reduced-motion: reduce)"
            ).matches;

            const timeline = gsap.timeline({
                paused: true,
                defaults: {
                    ease: "power3.inOut",
                },
            });

            timeline.to(
                iconRef.current,
                {
                    scale: 0.28,
                    opacity: 0,
                    x: -16,
                    filter: "blur(8px)",
                    duration: 0.85,
                    ease: "power2.inOut",
                },
                0
            );

            timeline.fromTo(
                circleRef.current,
                {
                    scale: 0.3,
                    opacity: 0,
                    x: 2,
                    filter: "blur(6px)",
                },
                {
                    scale: 0.85,
                    opacity: 1,
                    x: 14,
                    filter: "blur(0px)",
                    duration: 0.5,
                    ease: "power2.out",
                },
                0.1
            );

            timeline.to(
                circleRef.current,
                {
                    scale: 0.92,
                    x: 29.5,
                    duration: 0.6,
                    ease: "power2.inOut",
                },
                0.42
            );

            timeline.to(
                circleRef.current,
                {
                    scale: 0.26,
                    x: 59,
                    duration: 0.55,
                    ease: "power3.out",
                },
                0.8
            );

            timeline.fromTo(
                textRef.current,
                {
                    opacity: 0,
                    x: 14,
                    filter: "blur(10px)",
                },
                {
                    opacity: 1,
                    x: 0,
                    filter: "blur(0px)",
                    duration: 0.75,
                    ease: "power2.out",
                },
                0.4
            );

            if (reduceMotion) {
                timeline.timeScale(100);
            }

            timelineRef.current = timeline;
        }, root);

        return () => {
            timelineRef.current = null;
            ctx.revert();
        };
    }, []);

    useLayoutEffect(() => {
        const timeline = timelineRef.current;

        if (!timeline) return;

        if (first.current) {
            first.current = false;

            timeline.progress(scrolled ? 1 : 0);

            return;
        }

        if (scrolled) {
            timeline.play();
        } else {
            timeline.reverse();
        }
    }, [scrolled]);

    // Logo entrance animation
    useLayoutEffect(() => {
        if (!rootRef.current) return;

        gsap.fromTo(
            rootRef.current,
            {
                opacity: 0,
                y: -12,
            },
            {
                opacity: 1,
                y: 0,
                duration: 0.7,
                ease: "power3.out",
                delay: 0.1,
            }
        );
    }, []);

    return (
        <Link
            ref={rootRef}
            href="/"
            aria-label="Syntac home"
            className="relative inline-flex h-10 items-center"
            >
                <div ref={iconRef}
                    className="relative z-10 h-9 w-9 shrink-0 will-change-transform"
                >
                    <Image src="/brand/syntac-brand-kit/logos/icon/png/syntac-icon-transparent.png"
                        alt="Syntac"
                        fill
                        sizes="36px"
                        className="object-contain"
                        priority
                    />
                </div>

                <span
                    ref={circleRef}
                    className="absolute top-1/2 z-20 mt-1 -translate-y-1/2 rounded-full bg-[#FFC400] will-change-transform"
                    style={{
                        width: "1.4em",
                        height: "1.4em",
                        opacity: 0,
                    }}
                />

            <div
                ref={textRef}
                className="absolute left-0 flex items-baseline opacity-0 will-change-transform"
            >
                <span className="font-brand text-[22px] tracking-[-0.03em] text-neutral-900 dark:text-white">
                    {AppSettings.COMPANY_NAME}
                </span>
            </div>
        </Link>
    );
}