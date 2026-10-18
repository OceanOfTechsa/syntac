'use client'

import FlipWords from "@/components/gsap/animations/shared/flip-words";
import AppSettings from "@/utils/AppSettings";
import {useTextReveal} from "@/lib/gsap/hooks/use-text-reveal";
import {useRef} from "react";

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
                        Our Team
                    </span>

                    <span
                        className="text-sm font-normal text-wrap"
                        data-line
                    >
                        The people behind the ideas, technology, and solutions.
                    </span>

                    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]">
                        <div className="absolute aspect-square rounded-full bg-linear-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent"></div>
                    </div>
                </span>

                <h1 className="z-10 max-w-5xl text-3xl font-bold sm:text-4xl lg:text-5xl lg:leading-[1.29167]">
                    Meet the People Behind{" "}
                    <br className={'hidden sm:block'} />
                    <span className={'relative inline-block font-extrabold'}>
                        <FlipWords
                            words={[
                                "SYNTAC",
                                "the Ideas",
                                "the Technology",
                                "the Solutions",
                                "What We Build",
                            ]}
                            duration={3000}
                            className="text-5xl font-bold"
                        />
                    </span>
                </h1>

                <p className="text-muted-foreground z-10 max-w-212 text-lg">
                    {AppSettings.COMPANY_NAME} is built by people who care about
                    solving real problems with thoughtful technology. Get to know
                    the team behind the work and the experience we bring to every
                    project.
                </p>
            </div>
        </section>
    )
}

export default HeroSection