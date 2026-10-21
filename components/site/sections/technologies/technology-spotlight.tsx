"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

import { cn } from "@/lib/utils";
import AppSettings from "@/utils/AppSettings";
import { FADED_DOTTED_BG } from "@/components/site/shared-classes";
import SectionHeader from "@/components/site/shared/section-header";
import { CompanyTile } from "@/components/site/shared/company-tile";
import { technologySpotlight, Company } from "@/data/technology-spotlight-data";
import { technologyCatalog, TechnologyItem } from "@/data/technologies_data";

interface SpotlightItem extends TechnologyItem {
    companies: Company[];
}

interface TechnologySpotlightProps {
    /** How long each technology stays selected, in ms. */
    interval?: number;
    /** How many technologies are listed at once. */
    visibleCount?: number;
}

const TechLogo = ({ tech, size }: { tech: TechnologyItem; size: number }) => (
    <>
        <Image
            src={tech.src}
            alt=""
            width={size}
            height={size}
            className={cn("shrink-0 object-contain brightness-0 dark:brightness-0 dark:invert", tech.darkSrc && "dark:hidden")}
        />
        {tech.darkSrc && (
            <Image
                src={tech.darkSrc}
                alt=""
                width={size}
                height={size}
                className="hidden shrink-0 object-contain dark:block brightness-0 dark:brightness-0 dark:invert"
            />
        )}
    </>
);

const TechnologySpotlight = ({ interval = 6000, visibleCount = 4 }: TechnologySpotlightProps) => {
    // Join the curated list with the full catalog so descriptions and logos stay in one place
    const items = useMemo<SpotlightItem[]>(() => {
        const catalog = new Map(
            technologyCatalog.flatMap((category) => category.technologies).map((tech) => [tech.id, tech])
        );

        return technologySpotlight.flatMap((entry) => {
            const tech = catalog.get(entry.id);
            return tech ? [{ ...tech, companies: entry.companies }] : [];
        });
    }, []);

    const count = items.length;
    const shown = Math.min(visibleCount, count);

    const [start, setStart] = useState(0);
    const [inView, setInView] = useState(false);
    const [paused, setPaused] = useState(false);
    const [reducedMotion, setReducedMotion] = useState(false);

    const rootRef = useRef<HTMLDivElement>(null);
    const barRef = useRef<HTMLSpanElement>(null);
    const elapsed = useRef(0);

    // The visible window: the first item is the selected one
    const visible = Array.from({ length: shown }, (_, i) => items[(start + i) % count]);
    const active = visible[0];

    useEffect(() => {
        setReducedMotion(window.matchMedia("(prefers-reduced-motion: reduce)").matches);
    }, []);

    // Only run the timer while the section is on screen
    useEffect(() => {
        const node = rootRef.current;
        if (!node) return;

        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {
            threshold: 0.3,
        });
        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    const running = inView && !paused && !reducedMotion && count > 1;

    // Drives the progress border and advances the selection when it fills.
    // Writing to the element directly avoids a React re-render on every frame.
    useEffect(() => {
        if (!running) return;

        let frame = 0;
        let last = performance.now();

        const tick = (now: number) => {
            elapsed.current += now - last;
            last = now;

            const progress = Math.min(elapsed.current / interval, 1);
            if (barRef.current) barRef.current.style.transform = `scaleX(${progress})`;

            if (progress >= 1) {
                elapsed.current = 0;
                setStart((previous) => (previous + 1) % count);
            }

            frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, [running, interval, count]);

    // Clicking a row makes it the selected (top) item and restarts the timer
    const select = (offset: number) => {
        if (offset === 0) return;
        elapsed.current = 0;
        setStart((previous) => (previous + offset) % count);
    };

    if (!active) return null;

    return (
        <section id="our-technology" className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24">
            <SectionHeader
                preTitle="Our Technology"
                title="Built on Technology the Biggest Names Trust"
                markedWord="Biggest Names"
                desc={`${AppSettings.COMPANY_NAME} builds with proven, widely adopted technologies, the same ones that run products used by millions of people every day.`}
            />

            <div
                ref={rootRef}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
                onFocus={() => setPaused(true)}
                onBlur={() => setPaused(false)}
                className="grid border-y border-dashed md:grid-cols-2"
            >
                {/* Technology list: the top item is selected */}
                <ul className="flex flex-col divide-y divide-dashed border-dashed md:min-h-[30rem] md:border-r">
                    {visible.map((tech, index) => {
                        const selected = index === 0;

                        return (
                            <li key={tech.id} className="relative flex flex-1">
                                <button
                                    type="button"
                                    onClick={() => select(index)}
                                    aria-current={selected ? "true" : undefined}
                                    className={cn(
                                        "flex w-full flex-col justify-center gap-3 px-4 py-5 text-left transition-colors duration-200 sm:px-6 lg:px-8",
                                        selected ? "bg-muted/40" : "hover:bg-muted/40"
                                    )}
                                >
                                    <span className="flex items-center gap-3">
                                        <TechLogo tech={tech} size={selected ? 36 : 28} />
                                        <span
                                            className={cn(
                                                "text-xl font-medium transition-colors duration-200",
                                                selected ? "text-foreground" : "text-muted-foreground"
                                            )}
                                        >
                                            {tech.name}
                                        </span>
                                    </span>

                                    <span
                                        className={cn(
                                            "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                                            selected ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                                        )}
                                    >
                                        <span className="block min-h-0 space-y-3 overflow-hidden">
                                            <span className="block text-muted-foreground">{tech.description}</span>

                                            {/* The right-hand panel is hidden on mobile, so show companies here */}
                                            <span className="flex flex-wrap gap-2 md:hidden">
                                                {tech.companies.map((company) => (
                                                    <span
                                                        key={company.name}
                                                        className="rounded-full border px-3 py-1.5 text-xs font-medium text-muted-foreground"
                                                    >
                                                        {company.name}
                                                    </span>
                                                ))}
                                            </span>
                                        </span>
                                    </span>
                                </button>

                                {/* Progress border: fills over `interval`, then the next technology takes over */}
                                {selected && (
                                    <span aria-hidden="true" className="absolute inset-x-0 bottom-0 h-0.5 bg-border">
                                        <span
                                            ref={barRef}
                                            className="block h-full origin-left bg-foreground"
                                            style={{ transform: `scaleX(${reducedMotion ? 1 : 0})` }}
                                        />
                                    </span>
                                )}
                            </li>
                        );
                    })}
                </ul>

                {/* Who uses it */}
                <div
                    className={cn(
                        "flex items-center justify-center px-6 py-12 max-md:hidden lg:px-8",
                        FADED_DOTTED_BG
                    )}
                >
                    <div
                        key={active.id}
                        className="w-full max-w-md animate-in space-y-6 duration-300 fade-in-0"
                        aria-live="polite"
                    >
                        <div className="grid size-16 place-items-center rounded-xl border bg-background">
                            <TechLogo tech={active} size={40} />
                        </div>

                        <div className="space-y-3">
                            <h3 className="text-3xl font-semibold tracking-tight">
                                {active.name} runs at scale.
                            </h3>

                            <p className="text-muted-foreground">
                                Companies you know use {active.name} in production. It is the same technology we
                                bring to your project.
                            </p>
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                            {active.companies.map((company) => (
                                <CompanyTile key={company.name} company={company} />
                            ))}
                        </div>

                        <p className="text-xs text-muted-foreground">
                            <strong>Kindly Note:</strong> Names and logos belong to their respective owners and do not
                            imply endorsement.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default TechnologySpotlight;