"use client"

import Image from "next/image"
import { CSSProperties, ReactNode } from "react"
import { cn } from "@/lib/utils"

export interface OrbitLogo {
    src: string
    alt: string
    size: number      // outer circle size in px
    iconSize: number  // inner image size in px
    /** Show this logo in its original colours. Overrides `colorLogos` for this logo. */
    keepColor?: boolean
}

export interface OrbitRing {
    radius: number
    duration: number
    reverse?: boolean
    /** Rotate the whole ring by this many degrees (e.g. 45 keeps logos off the centre text). */
    startAngle?: number
    logos: OrbitLogo[]
}

interface OrbitingLogosProps {
    rings: OrbitRing[]
    /** Outer wrapper height, e.g. "h-74" or "h-96". Defaults to "h-74". */
    height?: string
    /** Width/height of the inner square stage, e.g. "size-82". Defaults to "size-82". */
    size?: string
    /** Extra classes for the outer wrapper. */
    className?: string
    /** Extra classes for the inner stage (where rings/logos are centered). */
    stageClassName?: string
    /** Custom center content — defaults to the SYNTAC icon if omitted. */
    centerContent?: ReactNode
    /** Stroke color for the ring circles. Defaults to "var(--border)". */
    ringColor?: string
    /** Stroke width for the ring circles. Defaults to 1. */
    ringStrokeWidth?: number
    /** Dash pattern for the rings. Defaults to "10". Pass null for solid lines. */
    ringDash?: string | null
    /** Fade the rings and logos out towards the top and bottom edges. Defaults to false. */
    fadeEdges?: boolean
    /** Orbit the logos. Pass false for a static layout. Defaults to true. */
    animate?: boolean
    /** Show all logos in their original colours instead of black / white. A logo's own `keepColor` wins. Defaults to false. */
    colorLogos?: boolean
}

// Extend CSSProperties locally so custom properties are typed, not cast
type OrbitStyle = CSSProperties & {
    "--duration": number
    "--radius": number
    "--angle": number
}

function RingCircle({
                        radius,
                        color,
                        strokeWidth,
                        dash,
                    }: {
    radius: number
    color: string
    strokeWidth: number
    dash: string | null
}) {
    return (
        <svg xmlns="http://www.w3.org/2000/svg" className="pointer-events-none absolute inset-0 size-full">
            <circle
                cx="50%"
                cy="50%"
                r={radius}
                fill="none"
                strokeDasharray={dash ?? undefined}
                stroke={color}
                strokeWidth={strokeWidth}
            />
        </svg>
    )
}

function OrbitingLogo({ logo, radius, duration, angle, reverse, animate, colorLogos }: {
    logo: OrbitLogo
    radius: number
    duration: number
    angle: number
    reverse?: boolean
    animate: boolean
    colorLogos: boolean
}) {
    const showColor = logo.keepColor ?? colorLogos

    const style: OrbitStyle = {
        "--duration": duration,
        "--radius": radius,
        "--angle": angle,
        // static layout: same transform the orbit animation starts from
        ...(animate
            ? {}
            : { transform: `rotate(${angle}deg) translateY(${radius}px) rotate(${-angle}deg)` }),
    }

    return (
        <div
            style={style}
            className={cn(
                "absolute flex transform-gpu items-center justify-center rounded-full",
                animate && "animate-orbit",
                animate && reverse && "[animation-direction:reverse]"
            )}
        >
            <div
                style={{ width: logo.size, height: logo.size }}
                className={cn(
                    "flex items-center justify-center rounded-full border",
                    showColor
                        ? "bg-white shadow-sm"
                        : "bg-white dark:bg-neutral-700"
                )}
            >
                <Image
                    src={logo.src}
                    alt={logo.alt}
                    width={logo.iconSize}
                    height={logo.iconSize}
                    loading="lazy"
                    className={cn(
                        "object-contain rounded-full",
                        !showColor && "brightness-0 dark:brightness-0 dark:invert"
                    )}
                />
            </div>
        </div>
    )
}

function DefaultCenterIcon() {
    return (
        <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="-6 -6 149 112"
            width="2em"
            height="2em"
            className="
                [--icon-primary:#111]
                [--icon-accent:#111]
                dark:[--icon-primary:#fff]
                dark:[--icon-accent:#fff]
                group-hover:[--icon-primary:#0B9944]
                group-hover:[--icon-accent:#FFC400]
                opacity-60
                group-hover:opacity-100
                transition-all duration-500
            "
        >
            <title>SYNTAC icon</title>

            <ellipse
                fillOpacity=".22"
                cx="109"
                cy="95.5"
                rx="19"
                ry="4.2"
                fill="var(--icon-primary)"
            />

            <path
                d="M13,13 L60,50 L13,87"
                fill="none"
                stroke="var(--icon-primary)"
                strokeWidth="26"
                strokeLinecap="round"
                strokeLinejoin="round"
            />

            <rect
                x="-25"
                y="-11"
                width="50"
                height="22"
                rx="11"
                fill="var(--icon-accent)"
                transform="translate(109,71) rotate(-14)"
            />

            <g
                fill="none"
                stroke="var(--icon-accent)"
                strokeWidth="4.5"
                strokeLinecap="round"
            >
                <path d="M89,49 L83,42" />
                <path d="M108,44 V35" />
                <path d="M128,47 L134,40" />
            </g>
        </svg>
    )
}

const OrbitingLogos = ({
                           rings,
                           height = "h-74",
                           size = "size-82",
                           className,
                           stageClassName,
                           centerContent,
                           ringColor = "var(--border)",
                           ringStrokeWidth = 1,
                           ringDash = "10",
                           fadeEdges = false,
                           animate = true,
                           colorLogos = false,
                       }: OrbitingLogosProps) => {
    return (
        <div className={cn(height, className)} data-cursor-hide>
            <div className={cn("group relative flex shrink-0 flex-col items-center justify-center", size, stageClassName)}>
                {/* rings + logos (this layer carries the edge fade) */}
                <div
                    className={cn(
                        "absolute inset-0 flex items-center justify-center",
                        fadeEdges &&
                        "[mask-image:linear-gradient(to_bottom,transparent,black_22%,black_78%,transparent)]"
                    )}
                >
                    {rings.map((ring, ringIndex) => {
                        const step = 360 / ring.logos.length
                        return (
                            <div key={ringIndex} className="contents">
                                <RingCircle
                                    radius={ring.radius}
                                    color={ringColor}
                                    strokeWidth={ringStrokeWidth}
                                    dash={ringDash}
                                />
                                {ring.logos.map((logo, i) => (
                                    <OrbitingLogo
                                        key={`${logo.alt}-${i}`}
                                        logo={logo}
                                        radius={ring.radius}
                                        duration={ring.duration}
                                        angle={i * step + (ring.startAngle ?? 0)}
                                        reverse={ring.reverse}
                                        animate={animate}
                                        colorLogos={colorLogos}
                                    />
                                ))}
                            </div>
                        )
                    })}
                </div>

                {/* Center content, kept above the rings */}
                <div className="relative z-10">
                    {centerContent ?? <DefaultCenterIcon />}
                </div>
            </div>
        </div>
    )
}

export default OrbitingLogos