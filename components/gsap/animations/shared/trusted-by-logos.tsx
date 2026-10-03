"use client"

import { useEffect, useRef, useState } from "react"
import gsap from "gsap"
import Image from "next/image"
import Link from "next/link"
import { cn } from "@/lib/utils"

export interface LogoItem {
    src: string
    alt: string
    href: string
    name?: string
}

interface TrustedByLogosProps {
    logos: LogoItem[]
    limit?: number
    duration?: number
    className?: string
    logoClassName?: string
}

function getResponsiveLimit(maxLimit: number) {
    if (typeof window === "undefined") return 1
    if (window.innerWidth >= 1024) return maxLimit
    if (window.innerWidth >= 768) return Math.min(3, maxLimit)
    if (window.innerWidth >= 640) return Math.min(2, maxLimit)
    return 1
}

export default function TrustedByLogos({
                                           logos,
                                           limit = 4,
                                           duration = 3500,
                                           className,
                                           logoClassName,
                                       }: TrustedByLogosProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const tlRef = useRef<gsap.core.Timeline | null>(null)
    const [currentLimit, setCurrentLimit] = useState(1)

    // Responsive limit
    useEffect(() => {
        const update = () => setCurrentLimit(getResponsiveLimit(limit))
        update()
        window.addEventListener("resize", update)
        return () => window.removeEventListener("resize", update)
    }, [limit])

    // Build sets
    const sets: LogoItem[][] = []
    for (let i = 0; i < logos.length; i += currentLimit) {
        sets.push(logos.slice(i, i + currentLimit))
    }
    if (sets.length === 0) sets.push([])

    // GSAP timeline – much more reliable collection of elements
    useEffect(() => {
        const container = containerRef.current
        if (!container) return

        // Wait one frame so all the new set divs are in the DOM
        const id = requestAnimationFrame(() => {
            const setElements = Array.from(
                container.querySelectorAll<HTMLDivElement>("[data-logo-set]")
            )

            if (setElements.length === 0) return

            tlRef.current?.kill()

            // Reset all
            gsap.set(setElements, {
                autoAlpha: 0,
                filter: "blur(6px)",
                position: "absolute",
                inset: 0,
                rotationX: 0,
                transformPerspective: 600,
                transformOrigin: "center center",
            })

            // Show first
            gsap.set(setElements[0], {
                autoAlpha: 1,
                filter: "blur(0px)",
                position: "relative",
                rotationX: 0,
            })

            if (setElements.length === 1) return

            const tl = gsap.timeline({ repeat: -1 })

            setElements.forEach((_, index) => {
                const current = setElements[index]
                const next = setElements[(index + 1) % setElements.length]

                // Hold
                tl.to({}, { duration: duration / 1000 })

                // Out
                tl.to(current, {
                    autoAlpha: 0,
                    filter: "blur(6px)",
                    rotationX: -20,
                    duration: 0.45,
                    ease: "power2.inOut",
                })

                // Swap positions
                tl.set(current, { position: "absolute" })
                tl.set(next, {
                    position: "relative",
                    autoAlpha: 0,
                    filter: "blur(6px)",
                    rotationX: 20,
                })

                // In
                tl.to(next, {
                    autoAlpha: 1,
                    filter: "blur(0px)",
                    rotationX: 0,
                    duration: 0.45,
                    ease: "power2.inOut",
                })
            })

            tlRef.current = tl
        })

        return () => {
            cancelAnimationFrame(id)
            tlRef.current?.kill()
            tlRef.current = null
        }
    }, [logos, currentLimit, duration])

    const handleMouseEnter = () => tlRef.current?.pause()
    const handleMouseLeave = () => tlRef.current?.resume()

    const gridCols =
        currentLimit === 1
            ? "grid-cols-1"
            : currentLimit === 2
                ? "grid-cols-2"
                : currentLimit === 3
                    ? "grid-cols-3"
                    : "grid-cols-4"

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative flex w-full items-center justify-center overflow-hidden min-h-[3.5rem]",
                className
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {sets.map((set, setIndex) => (
                <div
                    key={`${currentLimit}-${setIndex}`}
                    data-logo-set // ← used by querySelectorAll
                    className={cn(
                        "grid place-items-center w-full",
                        gridCols,
                        setIndex === 0
                            ? "relative opacity-100"
                            : "absolute inset-0 opacity-0 pointer-events-none"
                    )}
                >
                    {set.map((logo) => (
                        <Link
                            key={logo.src + logo.href}
                            href={logo.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "flex w-40 items-center justify-center",
                                "opacity-70 grayscale transition-all duration-300",
                                "hover:opacity-100 hover:grayscale-0",
                                "dark:opacity-60 dark:brightness-110 dark:invert-[0.15]",
                                "dark:hover:opacity-100 dark:hover:invert-0 dark:hover:grayscale-0",
                                logoClassName
                            )}
                        >
                            <Image
                                src={logo.src}
                                alt={logo.alt || logo.name || "Partner logo"}
                                width={160}
                                height={48}
                                className="h-11 w-full object-contain"
                                style={{ width: "auto", height: "100%", maxWidth: "100%" }}
                            />
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    )
}