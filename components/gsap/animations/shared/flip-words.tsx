"use client"

import { useEffect, useRef, useState, useCallback } from "react"
import gsap from "gsap"
import { cn } from "@/lib/utils"

interface FlipWordsProps {
    words: string[]
    duration?: number
    className?: string
}

const FlipWords = ({
                              words,
                              duration = 3000,
                              className,
                          }: FlipWordsProps) => {
    const [currentIndex, setCurrentIndex] = useState(0)
    const wordRef = useRef<HTMLSpanElement>(null)
    const underlineRef = useRef<SVGSVGElement>(null)
    const isAnimating = useRef(false)
    const isFirstRender = useRef(true)

    const currentWord = words[currentIndex]

    const animateIn = useCallback(() => {
        const letters = wordRef.current?.querySelectorAll(".letter")
        const underline = underlineRef.current

        if (!letters?.length || !underline) return

        isAnimating.current = true

        // Reset
        gsap.set(letters, {
            opacity: 0,
            y: 6,
            filter: "blur(5px)",
        })
        gsap.set(underline, {
            scaleX: 0,
            opacity: 0,
            transformOrigin: "left center",
        })

        const tl = gsap.timeline({
            onComplete: () => {
                isAnimating.current = false
            },
        })

        // Letters left → right
        tl.to(letters, {
            opacity: 1,
            y: 0,
            filter: "blur(0px)",
            duration: 0.4,
            stagger: 0.03,
            ease: "power2.out",
        })

        // Underline draws in
        tl.to(
            underline,
            {
                scaleX: 1,
                opacity: 1,
                duration: 0.3,
                ease: "power2.out",
            },
            "-=0.2"
        )
    }, [])

    const animateOut = useCallback(() => {
        return new Promise<void>((resolve) => {
            const letters = wordRef.current?.querySelectorAll(".letter")
            const underline = underlineRef.current

            if (!letters?.length || !underline) {
                resolve()
                return
            }

            const tl = gsap.timeline({
                onComplete: resolve,
            })

            tl.to(underline, {
                scaleX: 0,
                opacity: 0,
                duration: 0.25,
                ease: "power2.in",
                transformOrigin: "right center",
            })

            tl.to(
                letters,
                {
                    opacity: 0,
                    y: -5,
                    filter: "blur(4px)",
                    duration: 0.25,
                    stagger: 0.02,
                    ease: "power2.in",
                },
                "-=0.1"
            )
        })
    }, [])

    // Animate whenever the word changes (including looping back to first)
    useEffect(() => {
        if (isFirstRender.current) {
            isFirstRender.current = false
            animateIn()
            return
        }

        animateIn()
    }, [currentIndex, animateIn])

    // Cycle words
    useEffect(() => {
        if (words.length <= 1) return

        const interval = setInterval(async () => {
            if (isAnimating.current) return

            await animateOut()
            setCurrentIndex((prev) => (prev + 1) % words.length)
        }, duration)

        return () => clearInterval(interval)
    }, [words, duration, animateOut])

    return (
        <span
            className={cn(
                "relative flex-col items-start inline-block font-extrabold",
                className // ← inherits text size from parent
            )}
        >
              <span
                  ref={wordRef}
                  className="relative z-10 inline-block text-3xl font-bold sm:text-4xl lg:text-5xl lg:leading-[1.29167]"
              >
                {currentWord.split("").map((letter, i) => (
                    <span
                        key={`${currentWord}-${i}`}
                        className="letter inline-block"
                    >
                    {letter === " " ? "\u00A0" : letter}
                  </span>
                ))}
              </span>

            {/* Curved underline */}
            <svg
                ref={underlineRef}
                width="100%"
                height="8"
                viewBox="0 0 453 8"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="absolute -bottom-1 left-0 w-full text-current"
                preserveAspectRatio="none"
            >
                <path
                    d="M2 6.75068C53.4722 -1.10509 368.533 2.14284 451.5 6.75085"
                    stroke="currentColor"
                    strokeWidth="2.5"
                    strokeLinecap="round"
                />
            </svg>
        </span>
    )
}

export default FlipWords;