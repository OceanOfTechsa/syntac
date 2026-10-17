'use client'

import {JSX, useRef} from 'react'
import {useTextReveal} from "@/lib/gsap/hooks/use-text-reveal";
import FlipWords from "@/components/gsap/animations/shared/flip-words";

interface IServicesHeroSectionProps {
    service?: string;
    serviceText?: string;
    title?: string;
    flipWords?: string[];
    useFlipWords?: boolean;
    paragraph: string;
    children?: JSX.Element;
}

const HeroSection = ({service = "Services", serviceText= "Technology built around your business.", title, flipWords, useFlipWords, paragraph, children}: IServicesHeroSectionProps) => {
    const textRef = useRef<HTMLDivElement | null>(null);

    useTextReveal(textRef);

    return (
        <section id={'hero'} className={'relative space-y-8 py-8 sm:space-y-16 sm:py-16 lg:py-24'}>
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-7 overflow-hidden px-4 text-center sm:px-6 lg:px-8">
               <span
                   ref={textRef}
                   data-slot="badge"
                   data-variant="outline"
                   className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 relative z-10 inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border border-border bg-background px-2 py-0.5 text-xs font-medium whitespace-nowrap text-foreground transition-[color,box-shadow] focus-visible:ring-[3px] [&>svg]:pointer-events-none [&>svg]:size-3 [a&]:hover:bg-accent [a&]:hover:text-accent-foreground"
               >
                    <span className="rounded-full bg-primary px-1.5 text-primary-foreground">
                        {service}
                    </span>
                    <span className="text-sm font-normal text-wrap" data-line>
                        {serviceText}
                    </span>

                    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]">
                        <div className="absolute aspect-square rounded-full bg-linear-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent" />
                    </div>
               </span>

                <h1 className="z-10 max-w-5xl text-3xl font-bold sm:text-4xl lg:text-5xl lg:leading-[1.29167]">
                    {title} {useFlipWords && " "}
                    {useFlipWords && (
                        <>
                            <br className="hidden sm:block" />
                            <span className="relative inline-block font-extrabold">
                                <FlipWords
                                    words={flipWords || []}
                                    duration={3000}
                                    className="text-5xl font-bold"
                                />
                            </span>
                        </>
                    )}
                </h1>

                <p className="text-muted-foreground z-10 max-w-212 text-lg">
                    {paragraph}
                </p>
                {children}
            </div>
        </section>
    )
}
export default HeroSection
