"use client";

import { useRef, useEffect, useState, CSSProperties, ReactNode } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface FlowStop {
    label: string;
    side?: "top" | "bottom"; // defaults to alternating, starting with "top"
}

interface SourceItem {
    icon: ReactNode;
    text: string;
    /** Milestone labels shown for this item — can differ between items */
    stops: FlowStop[];
    /** Marks this item as the final one — highlights the target node on arrival */
    isLast?: boolean;
}

interface TimelineFlowProps {
    /** Cycled infinitely — icon, text, AND stops swap each loop */
    items: SourceItem[];
    targetIcon: ReactNode;
    targetLabel: string;
    height?: number; // px, total component height
    color?: string; // beam / highlight color
    className?: string;
}

const STOP_INSET = 18; // px from top/bottom edge the pill sits at

export function TimelineFlow({
                                 items,
                                 targetIcon,
                                 targetLabel,
                                 height = 100,
                                 color = "var(--primary)",
                                 className,
                             }: TimelineFlowProps) {
    const [activeIndex, setActiveIndex] = useState(0);
    const item = items[activeIndex];
    const stops = item.stops;

    const sourceBoxRef = useRef<HTMLDivElement>(null);
    const sourceTextRef = useRef<HTMLDivElement>(null);
    const middleRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const headRef = useRef<SVGCircleElement>(null);
    const basePathRef = useRef<SVGPathElement>(null);
    const beamPathRef = useRef<SVGPathElement>(null);
    const stopConnectorRefs = useRef<(SVGPathElement | null)[]>([]);
    const stopBadgeRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const targetRef = useRef<HTMLSpanElement>(null);
    const sizeRef = useRef({ width: 0, height: 0 });

    // Measure the middle area and (re)draw the straight beam line + each
    // stop's static stub connector, whenever the layout or the active item's
    // stop count changes.
    useEffect(() => {
        const middle = middleRef.current;
        const svg = svgRef.current;
        const basePath = basePathRef.current;
        const beamPath = beamPathRef.current;
        if (!middle || !svg || !basePath || !beamPath) return;

        const layout = () => {
            const rect = middle.getBoundingClientRect();
            const w = rect.width;
            const h = rect.height;
            const midY = h / 2;
            sizeRef.current = { width: w, height: h };

            svg.setAttribute("width", String(w));
            svg.setAttribute("height", String(h));
            svg.setAttribute("viewBox", `0 0 ${w} ${h}`);

            const d = `M 0,${midY} L ${w},${midY}`;
            basePath.setAttribute("d", d);
            beamPath.setAttribute("d", d);

            stops.forEach((stop, i) => {
                const side = stop.side ?? (i % 2 === 0 ? "top" : "bottom");
                const x = ((i + 1) / (stops.length + 1)) * w;
                const y = side === "top" ? STOP_INSET : h - STOP_INSET;
                stopConnectorRefs.current[i]?.setAttribute("d", `M ${x},${midY} L ${x},${y}`);
            });
        };

        layout();
        const ro = new ResizeObserver(layout);
        ro.observe(middle);
        return () => ro.disconnect();
    }, [stops]);

    // One full cycle: kick the source pill, reveal its text with a per-letter
    // blur-in, send a slow beam straight across (each stop's connector +
    // border briefly flashes as the beam passes, then fades back down on its
    // own), hold, fade out, then swap to the next item and repeat — forever.
    useEffect(() => {
        const sourceBox = sourceBoxRef.current;
        const head = headRef.current;
        const beamPath = beamPathRef.current;
        if (!sourceBox || !head || !beamPath) return;

        const chars = sourceTextRef.current?.querySelectorAll("[data-char]") ?? [];
        const dashLen = 24;
        const length = beamPath.getTotalLength();

        gsap.set(chars, { opacity: 0, filter: "blur(9px)" });
        gsap.set(head, { opacity: 0 });
        // dashoffset(t) = dashLen - t*length places the dash's leading edge at
        // exactly s = t*length — the same point the head circle is drawn at —
        // so the trail always sits directly behind the head, never ahead of it.
        gsap.set(beamPath, { strokeDasharray: `${dashLen} ${length}`, strokeDashoffset: dashLen });
        stopConnectorRefs.current.forEach((c) => c && gsap.set(c, { strokeOpacity: 0.15 }));
        stopBadgeRefs.current.forEach((b) => b && gsap.set(b, { borderColor: "var(--border)" }));
        if (targetRef.current) gsap.set(targetRef.current, { color: "var(--muted-foreground)" });

        const activated = stops.map(() => false);
        const progress = { t: 0 };

        // Flashes a single stop's connector + badge, then fades them back down
        // shortly after — independent of the main timeline, so it never lingers.
        const flashStop = (i: number) => {
            const connector = stopConnectorRefs.current[i];
            const badge = stopBadgeRefs.current[i];
            const flash = gsap.timeline();
            if (connector) flash.to(connector, { strokeOpacity: 0.9, duration: 0.4, ease: "sine.out" }, 0);
            if (badge) flash.to(badge, { borderColor: color, duration: 0.4, ease: "sine.out" }, 0);
            if (connector) flash.to(connector, { strokeOpacity: 0.15, duration: 0.7, ease: "sine.inOut" }, 0.8);
            if (badge) flash.to(badge, { borderColor: "var(--border)", duration: 0.7, ease: "sine.inOut" }, 0.8);
        };

        const tl = gsap.timeline({
            onComplete: () => setActiveIndex((prev) => (prev + 1) % items.length),
            delay: 0.6,
        });

        // 1. A little kick on the source pill.
        tl.to(sourceBox, { scale: 1.12, duration: 0.22, ease: "power2.out" });
        tl.to(sourceBox, { scale: 1, duration: 0.42, ease: "power2.inOut" });

        // 2. Text reveals letter by letter, out of a blur.
        tl.to(
            chars,
            { opacity: 1, filter: "blur(0px)", duration: 0.55, stagger: 0.035, ease: "sine.out" },
            "-=0.25"
        );

        // 3. The beam travels straight across, slowly.
        tl.set(head, { opacity: 1 }, "+=0.3");
        const travelDuration = 7;
        tl.to(
            beamPath,
            { strokeDashoffset: dashLen - length, duration: travelDuration, ease: "sine.inOut" },
            "<"
        );
        tl.to(
            progress,
            {
                t: 1,
                duration: travelDuration,
                ease: "sine.inOut",
                onUpdate: () => {
                    const { width, height: h } = sizeRef.current;
                    const midY = h / 2;
                    const t = progress.t;
                    head.setAttribute("cx", String(t * width));
                    head.setAttribute("cy", String(midY));

                    stops.forEach((_, i) => {
                        const p = (i + 1) / (stops.length + 1);
                        if (!activated[i] && t >= p) {
                            activated[i] = true;
                            flashStop(i);
                        }
                    });
                },
            },
            "<"
        );

        // 4. On arrival: if this is the final item, highlight the target node.
        if (item.isLast && targetRef.current) {
            tl.to(targetRef.current, { color: color, duration: 0.4, ease: "sine.out" });
        }

        // 5. Hold on arrival, then fade the head and text back down. Stops have
        //    already reset themselves individually by this point.
        tl.to({}, { duration: 1.6 });
        tl.to(head, { opacity: 0, duration: 0.6, ease: "sine.inOut" });
        tl.to(chars, { opacity: 0, filter: "blur(9px)", duration: 0.5, stagger: 0.02 }, "<");
        if (item.isLast && targetRef.current) {
            tl.to(targetRef.current, { color: "var(--muted-foreground)", duration: 0.6, ease: "sine.inOut" }, "<");
        }

        return () => {
            tl.kill();
        };
    }, [activeIndex]); // eslint-disable-line react-hooks/exhaustive-deps

    const nodeStyle: CSSProperties = { height };

    return (
        <div className={cn("flex items-center gap-2", className)} style={nodeStyle}>
            {/* SOURCE — icon + text + stops all cycle through `items` forever */}
            <div ref={sourceBoxRef} className="bg-background flex items-center gap-1.25 rounded-md border px-2 py-1">
                {item.icon}
                <div ref={sourceTextRef} className="font-medium text-sm">
                    {item.text.split("").map((char, i) => (
                        <span key={i} data-char style={{ display: "inline-block" }}>
                          {char === " " ? "\u00A0" : char}
                        </span>
                    ))}
                </div>
            </div>

            {/* MIDDLE: straight beam + per-stop connector stubs + pills */}
            <div ref={middleRef} className="relative h-full flex-1">
                {stops.map((stop, i) => {
                    const side = stop.side ?? (i % 2 === 0 ? "top" : "bottom");
                    const leftPct = ((i + 1) / (stops.length + 1)) * 100;
                    return (
                        <span
                            key={stop.label}
                            ref={(el) => {
                                stopBadgeRefs.current[i] = el;
                            }}
                            className={cn(
                                "bg-background absolute inline-flex w-fit shrink-0 -translate-x-1/2 items-center justify-center gap-1 rounded-sm border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-colors",
                                side === "top" ? "top-0" : "bottom-0"
                            )}
                            style={{ left: `${leftPct}%` }}
                        >
                          {stop.label}
                        </span>
                    );
                })}

                <svg
                    ref={svgRef}
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="pointer-events-none absolute top-0 left-0 -z-1 transform-gpu"
                >
                    {/* faint always-visible base line */}
                    <path ref={basePathRef} stroke={color} strokeWidth="1" strokeOpacity="0.15" strokeLinecap="round" />
                    {/* the traveling beam itself */}
                    <path ref={beamPathRef} stroke={color} strokeWidth="1.5" strokeLinecap="round" />
                    {stops.map((stop, i) => (
                        <path
                            key={stop.label}
                            ref={(el) => {
                                stopConnectorRefs.current[i] = el;
                            }}
                            stroke={color}
                            strokeWidth="1"
                            strokeLinecap="round"
                        />
                    ))}
                    {/* head is drawn last so it always sits on top of every line, even
                    at the exact point a stop's connector meets the spine */}
                    <circle ref={headRef} r="2.5" fill={color} />
                </svg>
            </div>

            {/* TARGET — only shown when the active item is marked isLast, fades in/out */}
            <span
                ref={targetRef}
                className={cn(
                    "text-muted-foreground flex flex-col items-center gap-0.5 transition-opacity duration-500",
                    item.isLast ? "opacity-100" : "opacity-0"
                )}
            >
                {targetIcon}
                <span className="text-sm font-medium">{targetLabel}</span>
            </span>
        </div>
    );
}