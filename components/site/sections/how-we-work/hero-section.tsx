'use client'

import FlipWords from "@/components/gsap/animations/shared/flip-words";
import {useTextReveal} from "@/lib/gsap/hooks/use-text-reveal";
import {useRef} from "react";
import Link from "next/link";
import {ArrowUpRight, Headset} from "lucide-react";

const HeroSection = () => {
    const textRef = useRef<HTMLDivElement | null>(null);
    useTextReveal(textRef);

    return (
        <section
            className={'relative space-y-8 py-8 sm:space-y-16 sm:py-16 lg:py-24'}
            id={'hero'}
        >
            <div
                className={
                    'mx-auto flex max-w-7xl flex-col items-center gap-7 px-4 text-center sm:px-6 lg:px-8 overflow-hidden'
                }
            >
                <span
                    ref={textRef}
                    data-slot="badge"
                    data-variant="outline"
                    className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3 border-border text-foreground [a&]:hover:bg-accent [a&]:hover:text-accent-foreground bg-background relative z-10"
                >
                    <span className="bg-primary text-primary-foreground rounded-full px-1.5">
                        How We Work
                    </span>

                    <span
                        className="text-sm font-normal text-wrap"
                        data-line
                    >
                        A clear, collaborative approach from idea to delivery.
                    </span>

                    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]">
                        <div className="absolute aspect-square rounded-full bg-linear-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent"></div>
                    </div>
                </span>

                <h1 className="z-10 max-w-5xl text-3xl font-bold sm:text-4xl lg:text-5xl lg:leading-[1.29167]">
                    From First Conversation to{" "}
                    <br className={'hidden sm:block'} />
                    <span className={'relative inline-block font-extrabold'}>
                        <FlipWords
                            words={[
                                "Launch",
                                "Growth",
                                "What's Next",
                                "Real Results",
                                "Your Solution",
                            ]}
                            duration={3000}
                            className="text-5xl font-bold"
                        />
                    </span>
                </h1>

                <p className="text-muted-foreground z-10 max-w-212 text-lg">
                    Over the years, we have defined our favorite workflow that we've tested with many clients. This workflow is based on transparency, collaboration, and a goal-driven mindset.
                </p>

                <div className={'flex gap-2 divide-x divide-dashed items-center w-full justify-center'}>
                    {/*<div className={'px-3'}>*/}
                    {/*    <GoogleReviewsBanner />*/}
                    {/*</div>*/}

                    <div className={'px-3'}>
                        <Link
                            href="/contact"
                            className="btn-roll cursor-pointer text-base bg-primary text-primary-foreground hover:bg-primary/80 px-[1rem] py-[0.5rem] rounded-sm inline-flex items-center gap-2 transition-all duration-500 ease-in-out
                            "
                        >
                            Start a conversation
                            <Headset size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default HeroSection
