"use client";

import { useRef, useEffect, useState, useMemo } from "react";
import { gsap } from "@/lib/gsap";
import { cn } from "@/lib/utils";

interface ModularGridProps {
    /** First entry is the center circle (the client's project); the rest orbit around it */
    stages?: string[];
    size?: number; // px, square canvas — keep this compact
    coreDiameter?: number;
    satelliteDiameter?: number;
    radius?: number; // distance from center to each satellite's center
    color?: string;
    className?: string;
}

const DEFAULT_STAGES = ["Core", "Features", "Integrations", "Expansion"];

export function ModularGrid({
                                stages = DEFAULT_STAGES,
                                size = 260,
                                coreDiameter = 84,
                                satelliteDiameter = 72,
                                radius = 92,
                                color = "#f97316", // orange-500
                                className,
                            }: ModularGridProps) {
    const [coreLabel, ...satelliteLabels] = stages;
    const center = size / 2;

    // Evenly spaced around the core, starting from the top.
    const positions = useMemo(
        () =>
            satelliteLabels.map((_, i) => {
                const angle = -90 + i * (360 / satelliteLabels.length);
                const rad = (angle * Math.PI) / 180;
                return { x: center + Math.cos(rad) * radius, y: center + Math.sin(rad) * radius };
            }),
        [satelliteLabels.length, center, radius]
    );

    // 1..satelliteLabels.length — which satellite is currently being revealed.
    const [stageIndex, setStageIndex] = useState(1);

    const satelliteRefs = useRef<(HTMLDivElement | null)[]>([]);
    const lineRefs = useRef<(SVGLineElement | null)[]>([]);
    const coreRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const tl = gsap.timeline();
        const i = stageIndex - 1;
        const satellite = satelliteRefs.current[i];
        const line = lineRefs.current[i];

        // A gentle acknowledgment on Core each time a new stage lands — its
        // border color shifts toward the accent color, so the border itself
        // visibly communicates "the project is growing," with no size change.
        if (coreRef.current) {
            tl.to(coreRef.current, { scale: 1.05, duration: 0.25, ease: "power2.out" });
            tl.to(coreRef.current, { scale: 1, duration: 0.4, ease: "power2.inOut" });
            tl.to(coreRef.current, { borderColor: color, duration: 0.5, ease: "sine.out" }, "<");
        }

        // Draw the connecting line, then pop the satellite circle (with its
        // label already inside it) into place.
        if (line) {
            const length = line.getTotalLength();
            gsap.set(line, { opacity: 1, strokeDasharray: length, strokeDashoffset: length });
            tl.to(line, { strokeDashoffset: 0, duration: 0.8, ease: "sine.inOut" }, "-=0.15");
        }
        if (satellite) {
            tl.fromTo(
                satellite,
                { opacity: 0, scale: 0.4 },
                { opacity: 1, scale: 1, duration: 0.5, ease: "back.out(1.6)" },
                "-=0.4"
            );
        }

        // Hold so the current stage is legible.
        tl.to({}, { duration: 1.5 });

        if (stageIndex < satelliteLabels.length) {
            tl.call(() => setStageIndex((s) => s + 1));
        } else {
            // Fully expanded — hold a little longer, then fade every satellite
            // back out and restart the growth from Core alone.
            tl.to({}, { duration: 1 });
            const allSatellites = satelliteRefs.current.filter(Boolean) as HTMLDivElement[];
            const allLines = lineRefs.current.filter(Boolean) as SVGLineElement[];
            tl.to(allSatellites, { opacity: 0, scale: 0.4, duration: 0.6, stagger: 0.05, ease: "sine.in" });
            tl.to(allLines, { opacity: 0, duration: 0.4 }, "<");
            if (coreRef.current) {
                tl.to(coreRef.current, { borderColor: "#f97316", duration: 0.6, ease: "sine.inOut" }, "<");
            }
            tl.call(() => setStageIndex(1));
        }

        return () => {
            tl.kill();
        };
    }, [stageIndex]); // eslint-disable-line react-hooks/exhaustive-deps

    return (
        <div className={cn("relative mx-auto", className)} style={{ width: size, height: size }}>
            <svg width={size} height={size} className="pointer-events-none absolute inset-0">
                {positions.map((pos, i) => (
                    <line
                        key={i}
                        ref={(el) => (lineRefs.current[i] = el)}
                        x1={center}
                        y1={center}
                        x2={pos.x}
                        y2={pos.y}
                        stroke={color}
                        strokeWidth={1.5}
                        strokeLinecap="round"
                        style={{ opacity: 0 }}
                    />
                ))}
            </svg>

            {/* CORE — always visible, represents the client's project */}
            <div
                ref={coreRef}
                className="bg-background absolute flex items-center justify-center rounded-full border text-center text-sm font-medium"
                style={{
                    left: center,
                    top: center,
                    width: coreDiameter,
                    height: coreDiameter,
                    transform: "translate(-50%, -50%)",
                    borderColor: "var(--border)",
                }}
            >
                {coreLabel}
            </div>

            {/* SATELLITES — appear one at a time, then reset and loop */}
            {satelliteLabels.map((label, i) => (
                <div
                    key={label}
                    ref={(el) => (satelliteRefs.current[i] = el)}
                    className="bg-background absolute flex items-center justify-center rounded-full border px-1 text-center text-xs font-medium"
                    style={{
                        left: positions[i].x,
                        top: positions[i].y,
                        width: satelliteDiameter,
                        height: satelliteDiameter,
                        transform: "translate(-50%, -50%)",
                        opacity: 0,
                    }}
                >
                    {label}
                </div>
            ))}
        </div>
    );
}