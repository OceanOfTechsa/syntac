'use client'

import {useRef} from "react";
import Link from "next/link";
import {Headset} from "lucide-react";

import AppSettings from "@/utils/AppSettings";
import {useTextReveal} from "@/lib/gsap/hooks/use-text-reveal";
import FlipWords from "@/components/gsap/animations/shared/flip-words";
import GoogleReviewsBanner from "@/components/site/shared/Google-reviews-banner";

const HeroSection = () => {
    const textRef = useRef<HTMLDivElement | null>(null);
    useTextReveal(textRef);
    return (
        <section className={'relative space-y-8 py-8 sm:space-y-16 sm:py-16 lg:py-24'} id={'hero'}>
           <div className={'mx-auto flex max-w-7xl flex-col items-center gap-7 px-4 text-center sm:px-6 lg:px-8 overflow-hidden'}>
                <span ref={textRef} data-slot="badge" data-variant="outline" className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&amp;&gt;svg]:pointer-events-none [&amp;&gt;svg]:size-3 border-border text-foreground [a&amp;]:hover:bg-accent [a&amp;]:hover:text-accent-foreground bg-background relative z-10">
                    <span className="bg-primary text-primary-foreground rounded-full px-1.5">About Us</span>
                    <span className="text-sm font-normal text-wrap"  data-line>Digital solutions that grow with you.</span>
                    <div className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]">
                        <div className="absolute aspect-square rounded-full bg-linear-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent"></div>
                    </div>
                </span>

               <h1 className="z-10 max-w-5xl text-3xl font-bold sm:text-4xl lg:text-5xl lg:leading-[1.29167]">
                   Driven by Innovation, Defined by {" "}    <br className={'hidden sm:block'}/>
                   <span className={'relative inline-block font-extrabold'}>
                        <FlipWords
                            words={["Reliability", "Scalability", "Security", "Compliance", "Performance", "Stability"]}
                            duration={3000}
                            className="text-5xl font-bold"
                        />
                    </span>
               </h1>

               <p className="text-muted-foreground z-10 max-w-212 text-lg">
                   Through innovation, precision, and technology,{" "}
                   {AppSettings.COMPANY_NAME} builds reliable, scalable software that
                   drives the digital evolution of modern enterprises.
               </p>

               <div className="flex w-full flex-col items-center justify-center divide-y divide-dashed gap-3 sm:flex-row sm:divide-x sm:divide-y-0 sm:gap-2">
                   <div className={'px-3'}>
                       <GoogleReviewsBanner />
                   </div>
                   <div className={'px-3'}>
                       <Link
                           href="/contact"
                           data-roll
                           className="inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary px-6 text-base font-medium whitespace-nowrap text-primary-foreground outline-none transition-all hover:bg-primary/80 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
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
