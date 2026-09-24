'use client';

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const Loading = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const logoRef = useRef<HTMLDivElement>(null);
    const glowRef = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLParagraphElement>(null);
    const progressRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const ctx = gsap.context(() => {
            const tl = gsap.timeline();

            // Soft green glow
            tl.fromTo(
                glowRef.current,
                { scale: 0.2, opacity: 0 },
                { scale: 1.6, opacity: 0.35, duration: 1.1, ease: "power2.out" },
                0
            );

            // Arrow icon
            tl.fromTo(
                logoRef.current,
                { scale: 0.4, opacity: 0, x: -40 },
                {
                    scale: 1,
                    opacity: 1,
                    x: 0,
                    duration: 1.15,
                    ease: "back.out(1.7)",
                },
                0.1
            );

            // "Loading" text
            tl.fromTo(
                textRef.current,
                { opacity: 0, y: 12 },
                { opacity: 1, y: 0, duration: 0.6, ease: "power2.out" },
                0.55
            );

            // Gentle pulse
            tl.to(
                glowRef.current,
                {
                    scale: 1.8,
                    opacity: 0.22,
                    duration: 1.4,
                    ease: "sine.inOut",
                    yoyo: true,
                    repeat: 1,
                },
                1
            );

            // Progress bar
            tl.fromTo(
                progressRef.current,
                { scaleX: 0 },
                { scaleX: 1, duration: 2, ease: "power1.inOut" },
                0.3
            );
        }, containerRef);

        return () => ctx.revert();
    }, []);

    return (
        <main
            ref={containerRef}
            className="fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-black"
        >
            {/* Soft glow */}
            <div
                ref={glowRef}
                className="absolute h-56 w-56 rounded-full bg-[#0B9944] blur-3xl"
                style={{ opacity: 0 }}
            />

            {/* Arrow Icon */}
            <div ref={logoRef} className="relative z-10 opacity-0">
                <Image
                    src="/syntac-icon-transparent.png"
                    width={170}
                    height={130}
                    quality={100}
                    priority
                    loading="eager"
                    alt="Loading"
                    className="select-none object-contain"
                />
            </div>

            {/* Loading text */}
            <p
                ref={textRef}
                className="mt-8 text-sm font-medium tracking-[0.3em] text-white/80 uppercase opacity-0"
            >
                Loading
            </p>

            {/* Progress bar */}
            <div className="mt-10 h-[2px] w-28 overflow-hidden rounded-full bg-white/10">
                <div
                    ref={progressRef}
                    className="h-full w-full origin-left rounded-full bg-[#0B9944]"
                    style={{ transform: "scaleX(0)" }}
                />
            </div>
        </main>
    );
};

export default Loading;