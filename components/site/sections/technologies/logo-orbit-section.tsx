import Link from "next/link"
import { ArrowRight } from "lucide-react"

import { cn } from "@/lib/utils"
import OrbitingLogos, {
    type OrbitLogo,
    type OrbitRing,
} from "@/components/site/shared/orbiting-logos"
import {
    technologyCatalog,
    TechnologyCategory,
    TechnologyItem,
} from "@/data/technologies_data"

/**
 *  "backend"                                    -> every technology in that category
 *  { category: "backend" }                      -> same
 *  { category: "backend", technologies: [...] } -> only these technologies
 */
export type OrbitSelection =
    | string
    | { category: string; technologies?: string[] }

interface LogoOrbitSectionProps {
    title: string
    description: string
    ctaLabel?: string
    ctaHref?: string
    /** Which categories / technologies to orbit. Omit to use everything in the catalog. */
    show?: OrbitSelection[]
    /** Custom catalog. Defaults to `technologyCatalog`. */
    categories?: TechnologyCategory[]
    /** Number of concentric rings. Defaults from the logo count (2 to 4). */
    ringCount?: number
    /** Radius of the innermost ring in px. Defaults to 300 so the centre text fits inside. */
    startRadius?: number
    /** Gap between rings in px. Defaults to 125. */
    ringGap?: number
    /** Orbit the logos. Defaults to true. */
    animate?: boolean
    /** Show every logo in its original colours (otherwise only items with `keepColor`). */
    colorLogos?: boolean
    className?: string
}

function pickTechnologies(
    catalog: TechnologyCategory[],
    show?: OrbitSelection[],
): TechnologyItem[] {
    if (!show) return catalog.flatMap((c) => c.technologies)

    return show.flatMap((selection) => {
        const { category: id, technologies: only } =
            typeof selection === "string"
                ? { category: selection, technologies: undefined }
                : selection

        const category = catalog.find((c) => c.id === id)
        if (!category) return []

        return only
            ? only
                .map((techId) => category.technologies.find((t) => t.id === techId))
                .filter((t): t is TechnologyItem => Boolean(t))
            : category.technologies
    })
}

/** Spread logos over rings (outer rings get more) and stagger each ring's start angle. */
function buildRings(
    logos: OrbitLogo[],
    ringCount: number,
    startRadius: number,
    ringGap: number,
    animate: boolean,
): OrbitRing[] {
    const radii = Array.from({ length: ringCount }, (_, i) => startRadius + i * ringGap)
    const totalRadius = radii.reduce((a, b) => a + b, 0)

    // share logos by circumference, at least 3 per ring
    const counts = radii.map((r) =>
        Math.max(3, Math.floor((logos.length * r) / totalRadius)),
    )
    let assigned = counts.reduce((a, b) => a + b, 0)
    for (let i = ringCount - 1; assigned < logos.length; i = (i - 1 + ringCount) % ringCount) {
        counts[i]++
        assigned++
    }

    let cursor = 0
    return radii.map((radius, ringIndex) => {
        const take = Math.min(counts[ringIndex], logos.length - cursor)
        const slice = logos.slice(cursor, cursor + take)
        cursor += take
        const step = take > 0 ? 360 / take : 0

        return {
            radius,
            // seconds per full turn; outer rings are slower
            duration: animate ? 50 + ringIndex * 20 : 0,
            reverse: ringIndex % 2 === 1,
            startAngle: ringIndex === 0 ? 45 : (ringIndex % 2) * (step / 2),
            logos: slice,
        }
    })
}

const LogoOrbitSection = ({
                              title,
                              description,
                              ctaLabel = "See our stack",
                              ctaHref = "/contact",
                              show,
                              categories = technologyCatalog,
                              ringCount,
                              startRadius = 300,
                              ringGap = 125,
                              animate = true,
                              colorLogos = false,
                              className,
                          }: LogoOrbitSectionProps) => {
    const logos: OrbitLogo[] = pickTechnologies(categories, show).map((tech) => ({
        src: tech.src,
        alt: tech.name,
        size: 48,
        iconSize: 24,
        keepColor: tech.keepColor,
    }))

    const rings = buildRings(
        logos,
        ringCount ?? Math.min(4, Math.max(2, Math.ceil(logos.length / 6))),
        startRadius,
        ringGap,
        animate,
    )

    return (
        <section
            className={cn(
                "relative h-[46rem] w-full overflow-hidden sm:mt-20",
                className,
            )}
        >
            <OrbitingLogos
                rings={rings}
                height="h-full"
                size="size-full"
                className="w-full"
                animate={animate}
                fadeEdges
                colorLogos={colorLogos}
                ringDash={null}
                centerContent={
                    <div className="relative mx-auto flex max-w-2xl flex-col items-center gap-4 px-6 text-center">
                        {/* soft patch so passing logos never hurt legibility */}
                        <div
                            aria-hidden="true"
                            className="bg-background/80 absolute -inset-x-16 -inset-y-10 -z-10 rounded-full blur-2xl"
                        />
                        <h2 className="text-3xl font-semibold tracking-tight sm:text-4xl">
                            {title}
                        </h2>
                        <p className="text-muted-foreground">{description}</p>
                        <Link
                            href={ctaHref}
                            className="group/link text-primary inline-flex items-center gap-1.5 text-sm font-medium hover:underline transition-all duration 500 ease-in-out"
                        >
                            {ctaLabel}
                            <ArrowRight size={14} aria-hidden="true" className={'group-hover/link:translate-x-1 transition-all duration-500 ease-in-out'} />
                        </Link>
                    </div>
                }
            />
        </section>
    )
}

export default LogoOrbitSection