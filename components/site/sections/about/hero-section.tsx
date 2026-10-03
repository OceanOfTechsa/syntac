const HeroSection = () => {
    return (
        <section className={'relative space-y-8 py-8 sm:space-y-16 sm:py-16 lg:py-24 bg-dotted-background'}>
           <div className={'mx-auto flex max-w-7xl flex-col items-center gap-7 px-4 text-center sm:px-6 lg:px-8'}>
                <span data-slot="badge" data-variant="outline"
                      className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex w-fit shrink-0 items-center justify-center gap-1 overflow-hidden rounded-full border px-2 py-0.5 text-xs font-medium whitespace-nowrap transition-[color,box-shadow] focus-visible:ring-[3px] [&amp;&gt;svg]:pointer-events-none [&amp;&gt;svg]:size-3 border-border text-foreground [a&amp;]:hover:bg-accent [a&amp;]:hover:text-accent-foreground bg-background relative z-10"><span
                    className="bg-primary text-primary-foreground rounded-full px-1.5">Join Us</span><span
                    className="text-sm font-normal text-wrap">We support creators who support the community.</span><div
                    className="pointer-events-none absolute inset-0 rounded-[inherit] border-(length:--border-beam-width) border-transparent mask-[linear-gradient(transparent,transparent),linear-gradient(#000,#000)] mask-intersect [mask-clip:padding-box,border-box]"
                ><div
                    className="absolute aspect-square rounded-full bg-linear-to-l from-[var(--color-from)] via-[var(--color-to)] to-transparent"
                ></div></div></span>
               HeroSection
           </div>
        </section>
    )
}
export default HeroSection
