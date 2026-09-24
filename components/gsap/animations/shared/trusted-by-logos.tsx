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
    limit?: number // max logos on large screens
    duration?: number
    className?: string
    logoClassName?: string
}

function getResponsiveLimit(maxLimit: number) {
    if (typeof window === "undefined") return 1
    if (window.innerWidth >= 1024) return maxLimit      // lg
    if (window.innerWidth >= 768) return Math.min(3, maxLimit) // md
    if (window.innerWidth >= 640) return Math.min(2, maxLimit) // sm
    return 1 // mobile
}

export default function TrustedByLogos({
                                           logos,
                                           limit = 4,
                                           duration = 3500,
                                           className,
                                           logoClassName,
                                       }: TrustedByLogosProps) {
    const containerRef = useRef<HTMLDivElement>(null)
    const setRefs = useRef<(HTMLDivElement | null)[]>([])
    const tlRef = useRef<gsap.core.Timeline | null>(null)

    const [currentLimit, setCurrentLimit] = useState(1)

    // Update limit on resize
    useEffect(() => {
        const updateLimit = () => {
            setCurrentLimit(getResponsiveLimit(limit))
        }

        updateLimit()
        window.addEventListener("resize", updateLimit)
        return () => window.removeEventListener("resize", updateLimit)
    }, [limit])

    // Split into sets based on current responsive limit
    const sets: LogoItem[][] = []
    for (let i = 0; i < logos.length; i += currentLimit) {
        sets.push(logos.slice(i, i + currentLimit))
    }
    if (sets.length === 0) sets.push([])

    useEffect(() => {
        // Clear previous refs when sets change
        setRefs.current = []

        const timeout = setTimeout(() => {
            const setElements = setRefs.current.filter(Boolean) as HTMLDivElement[]
            if (setElements.length === 0) return

            tlRef.current?.kill()

            gsap.set(setElements, {
                autoAlpha: 0,
                filter: "blur(6px)",
                position: "absolute",
                inset: 0,
                rotationX: 0,
                transformPerspective: 600,
                transformOrigin: "center center",
            })

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

                // Hold visible
                tl.to({}, { duration: duration / 1000 })

                // Fade out with a tiny flip
                tl.to(current, {
                    autoAlpha: 0,
                    filter: "blur(6px)",
                    rotationX: -20,
                    duration: 0.45,
                    ease: "power2.inOut",
                })

                // Swap
                tl.set(current, { position: "absolute" })
                tl.set(next, {
                    position: "relative",
                    autoAlpha: 0,
                    filter: "blur(6px)",
                    rotationX: 20,
                })

                // Fade in with a tiny flip back to rest
                tl.to(next, {
                    autoAlpha: 1,
                    filter: "blur(0px)",
                    rotationX: 0,
                    duration: 0.45,
                    ease: "power2.inOut",
                })
            })

            tlRef.current = tl
        }, 50)

        return () => {
            clearTimeout(timeout)
            tlRef.current?.kill()
            tlRef.current = null
        }
    }, [logos, currentLimit, duration])

    const handleMouseEnter = () => tlRef.current?.pause()
    const handleMouseLeave = () => tlRef.current?.resume()

    return (
        <div
            ref={containerRef}
            className={cn(
                "relative flex w-full items-center justify-center overflow-hidden",
                className
            )}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {sets.map((set, setIndex) => (
                <div
                    key={`${currentLimit}-${setIndex}`}
                    ref={(el) => {
                        setRefs.current[setIndex] = el
                    }}
                    className="flex w-full flex-wrap items-center justify-center gap-2"
                >
                    {set.map((logo) => (
                        <Link
                            key={logo.src + logo.href}
                            href={logo.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className={cn(
                                "relative flex h-10 w-[140px] items-center justify-center sm:h-11 sm:w-[150px] md:h-12 md:w-[150px]",
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
                                className="object-contain"
                                style={{ width: "auto", height: "100%", maxWidth: "100%" }}
                            />
                        </Link>
                    ))}
                </div>
            ))}
        </div>
    )
}