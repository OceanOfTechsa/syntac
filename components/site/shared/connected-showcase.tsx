"use client";

import { useRef, useEffect, useId } from "react";
import { cn } from "@/lib/utils";
import { gsap } from "@/lib/gsap";

interface ConnectedShowcaseProps {
    leftImageLight: string;
    leftImageDark?: string;
    rightImage: string;
    leftAlt?: string;
    rightAlt?: string;
    leftAspect?: string; // tailwind aspect-* class, e.g. "aspect-9/11"
    rightAspect?: string; // e.g. "aspect-229/220"
    gap?: string; // tailwind gap-* class, e.g. "gap-25"
    className?: string;
}

// Default badge icons, matching the reference markup exactly.
function BrandIcon() {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="-6 -6 149 112" width="24" height="24">
            <title>SYNTAC icon (transparent)</title>
            <ellipse fillOpacity=".22" cx="109" cy="95.5" rx="19" ry="4.2" fill="#0B9944"/>
            <path d="M13,13 L60,50 L13,87" fill="none" stroke="#0B9944" strokeWidth="26" strokeLinecap="round" strokeLinejoin="round"/>
            <rect x="-25" y="-11" width="50" height="22" rx="11" fill="#FFC400" transform="translate(109,71) rotate(-14)"/>
            <g fill="none" stroke="#FFC400" strokeWidth="4.5" strokeLinecap="round">
                <path d="M89,49 L83,42"/><path d="M108,44 V35"/><path d="M128,47 L134,40"/>
            </g>
        </svg>
    );
}

function CodeIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            aria-hidden="true"
            className="size-6"
        >
            <path d="m18 16 4-4-4-4" />
            <path d="m6 8-4 4 4 4" />
            <path d="m14.5 4-5 16" />
        </svg>
    );
}

// Ring canvas size + radius are bigger than before so the thicker stroke
// (2.5px) has room to breathe without clipping against the badge's edge.
const RING_SIZE = 48;
const RING_RADIUS = 20;
const RING_CENTER = RING_SIZE / 2;

const ConnectedShowcase = ({
                                      leftImageLight,
                                      leftImageDark,
                                      rightImage,
                                      leftAlt = "Figma Image",
                                      rightAlt = "Code Image",
                                      leftAspect = "aspect-9/11",
                                      rightAspect = "aspect-229/220",
                                      gap = "gap-25",
                                      className,
                                  }: ConnectedShowcaseProps) => {
    const gradientId = useId();

    const containerRef = useRef<HTMLDivElement>(null);
    const leftBadgeRef = useRef<HTMLSpanElement>(null);
    const rightBadgeRef = useRef<HTMLSpanElement>(null);
    const leftRingRef = useRef<SVGCircleElement>(null);
    const rightRingRef = useRef<SVGCircleElement>(null);
    const connectorSvgRef = useRef<SVGSVGElement>(null);
    const basePathRef = useRef<SVGPathElement>(null);
    const beamPathRef = useRef<SVGPathElement>(null);
    const gradientRef = useRef<SVGLinearGradientElement>(null);

    // Measure the two badges and draw the connector path between them.
    // Runs once on mount and again whenever the layout resizes.
    useEffect(() => {
        const container = containerRef.current;
        const leftBadge = leftBadgeRef.current;
        const rightBadge = rightBadgeRef.current;
        const svg = connectorSvgRef.current;
        const basePath = basePathRef.current;
        const beamPath = beamPathRef.current;
        if (!container || !leftBadge || !rightBadge || !svg || !basePath || !beamPath) return;

        const layout = () => {
            const containerRect = container.getBoundingClientRect();
            const l = leftBadge.getBoundingClientRect();
            const r = rightBadge.getBoundingClientRect();

            const x1 = l.left + l.width / 2 - containerRect.left;
            const y1 = l.top + l.height / 2 - containerRect.top;
            const x2 = r.left + r.width / 2 - containerRect.left;
            const y2 = r.top + r.height / 2 - containerRect.top;

            svg.setAttribute("width", String(containerRect.width));
            svg.setAttribute("height", String(containerRect.height));
            svg.setAttribute("viewBox", `0 0 ${containerRect.width} ${containerRect.height}`);

            const midX = (x1 + x2) / 2;
            const d = `M ${x1},${y1} Q ${midX},${y1} ${x2},${y2}`;
            basePath.setAttribute("d", d);
            beamPath.setAttribute("d", d);
        };

        layout();
        const ro = new ResizeObserver(layout);
        ro.observe(container);
        return () => ro.disconnect();
    }, []);

    // Animation: left ring's border draws on, slowly and smoothly -> a light
    // travels across the connector, easing gently the whole way -> right
    // ring's border draws on the same way -> hold -> fade out -> loop.
    useEffect(() => {
        const leftRing = leftRingRef.current;
        const rightRing = rightRingRef.current;
        const gradient = gradientRef.current;
        const beamPath = beamPathRef.current;
        if (!leftRing || !rightRing || !gradient || !beamPath) return;

        // pathLength=1 normalizes each ring's circumference to 1, so a plain
        // 0 -> 1 tween of strokeDashoffset draws the border regardless of radius.
        gsap.set([leftRing, rightRing], { strokeDasharray: 1, strokeDashoffset: 1 });
        gsap.set(gradient, { attr: { x1: "0%", x2: "10%" } });
        gsap.set(beamPath, { opacity: 1 });

        const tl = gsap.timeline({ repeat: -1, repeatDelay: 2.2 });

        // Left ring: starts invisible, grows around at a constant, steady
        // pace — linear easing, so there's no slow-start/rush-through-the-
        // middle/slow-finish feel that an inOut curve would give here.
        tl.to(leftRing, { strokeDashoffset: 0, duration: 3.2, ease: "none" });
        // Travel across the connector: long, smooth, gentle ease the whole way.
        tl.fromTo(
            gradient,
            { attr: { x1: "0%", x2: "10%" } },
            { attr: { x1: "100%", x2: "110%" }, duration: 6, ease: "sine.inOut" }
        );
        // Right ring: identical steady, linear draw as the left one.
        tl.to(rightRing, { strokeDashoffset: 0, duration: 3.2, ease: "none" }, "-=1.6");
        // Hold before the loop resets, so it never feels rushed back to start.
        tl.to({}, { duration: 1.8 });
        tl.to([leftRing, rightRing, beamPath], { opacity: 0, duration: 1.2, ease: "sine.inOut" });
        tl.set([leftRing, rightRing, beamPath], { opacity: 1, strokeDashoffset: 1 });
        tl.set(gradient, { attr: { x1: "0%", x2: "10%" } });

        return () => {
            tl.kill();
        };
    }, []);

    return (
        <div ref={containerRef} className={cn("relative flex justify-between", gap, className)}>
            {/* LEFT: figma card */}
            <div className="relative rounded-r-md border-y border-r">
                <img
                    src={leftImageLight}
                    alt={leftAlt}
                    loading="lazy"
                    className={cn("w-full rounded-r-md", leftAspect, leftImageDark && "dark:hidden")}
                />
                {leftImageDark && (
                    <img
                        src={leftImageDark}
                        alt={leftAlt}
                        loading="lazy"
                        className={cn("hidden w-full rounded-r-md dark:inline-block", leftAspect)}
                    />
                )}
                <span
                    ref={leftBadgeRef}
                    className="text-card-foreground bg-card absolute top-1/2 right-0 flex size-11 translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
                >
                  <BrandIcon />
                  <svg
                      height={RING_SIZE}
                      width={RING_SIZE}
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute -rotate-90"
                      style={{ top: -(RING_SIZE - 44) / 2, left: -(RING_SIZE - 44) / 2 }}
                  >
                    <circle ref={leftRingRef} r={RING_RADIUS} cx={RING_CENTER} cy={RING_CENTER} stroke="var(--primary)" strokeWidth="2.5" fill="none" pathLength={1} />
                  </svg>
                </span>
            </div>

            {/* RIGHT: code card */}
            <div className="relative rounded-l-md border-y border-s">
                <img src={rightImage} alt={rightAlt} loading="lazy" className={cn("w-full rounded-l-md", rightAspect)} />
                <span
                    ref={rightBadgeRef}
                    className="text-card-foreground bg-card absolute top-1/2 left-0 flex size-11 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border"
                >
                  <CodeIcon />
                  <svg
                      height={RING_SIZE}
                      width={RING_SIZE}
                      xmlns="http://www.w3.org/2000/svg"
                      className="absolute -rotate-90"
                      style={{ top: -(RING_SIZE - 44) / 2, left: -(RING_SIZE - 44) / 2 }}
                  >
                    <circle ref={rightRingRef} r={RING_RADIUS} cx={RING_CENTER} cy={RING_CENTER} stroke="var(--primary)" strokeWidth="2.5" fill="none" pathLength={1} />
                  </svg>
                </span>
            </div>

            {/* CONNECTOR: static faint curve + traveling gradient beam, both thicker now */}
            <svg
                ref={connectorSvgRef}
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="pointer-events-none absolute top-0 left-0 -z-1 transform-gpu text-primary"
            >
                <path ref={basePathRef} stroke="currentColor" strokeWidth="2" strokeOpacity="0.2" strokeLinecap="round" />
                <path ref={beamPathRef} stroke={`url(#${gradientId})`} strokeWidth="2" strokeOpacity="1" strokeLinecap="round" />
                <defs>
                    <linearGradient ref={gradientRef} className="transform-gpu" id={gradientId} gradientUnits="userSpaceOnUse" x1="0%" x2="10%" y1="0%" y2="0%">
                        <stop stopColor="var(--destructive)" stopOpacity="0" />
                        <stop stopColor="var(--destructive)" />
                        <stop offset="32.5%" stopColor="currentColor" />
                        <stop offset="100%" stopColor="currentColor" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}


export default ConnectedShowcase;