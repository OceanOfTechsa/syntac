import Image from "next/image";

import { cn } from "@/lib/utils";
import {
    technologyCatalog,
    TechnologyCategory,
    TechnologyItem,
} from "@/data/technologies_data";

/**
 * Pick what to show.
 *
 *  "database"                                   -> whole category
 *  { category: "backend" }                      -> whole category
 *  { category: "backend", technologies: [...] } -> only these technologies (in this order)
 *  { category: "backend", title: "Server" }     -> override the heading
 */
export type TechnologySelection =
    | string
    | {
    category: string;
    technologies?: string[];
    title?: string;
};

export interface TechnologyStackProps {
    /** Which categories (and which technologies in each) to render. Omit to show everything. */
    show?: TechnologySelection[];
    /** Custom catalog. Defaults to `technologyCatalog`. */
    categories?: TechnologyCategory[];
    /** Max columns on large screens. Defaults to 2. */
    columns?: 1 | 2 | 3 | 4;
    className?: string;
    showTechName?: boolean;
}

const columnClasses: Record<NonNullable<TechnologyStackProps["columns"]>, string> = {
    1: "grid-cols-1",
    2: "grid-cols-1 md:grid-cols-2",
    3: "grid-cols-1 md:grid-cols-2 lg:grid-cols-3",
    4: "grid-cols-1 md:grid-cols-2 lg:grid-cols-4",
};

function resolveSelection(
    catalog: TechnologyCategory[],
    show?: TechnologySelection[],
): TechnologyCategory[] {
    if (!show) return catalog;

    return show.flatMap((selection) => {
        const options =
            typeof selection === "string" ? { category: selection } : selection;

        const category = catalog.find((c) => c.id === options.category);
        if (!category) return [];

        const technologies = options.technologies
            ? options.technologies
                .map((id) => category.technologies.find((t) => t.id === id))
                .filter((t): t is TechnologyItem => Boolean(t))
            : category.technologies;

        if (technologies.length === 0) return [];

        return [
            {
                ...category,
                title: options.title ?? category.title,
                technologies,
            },
        ];
    });
}

export function TechnologyStack({
                                    show,
                                    categories = technologyCatalog,
                                    columns = 2,
                                    className,
                                    showTechName = false
                                }: TechnologyStackProps) {
    const visible = resolveSelection(categories, show);

    return (
        <div
            className={cn(
                "grid border-t border-dashed border-border md:divide-x md:divide-dashed",
                columnClasses[columns],
                className,
            )}
        >
            {visible.map((category) => (
                <section
                    key={category.id}
                    className="border-b border-dashed border-border px-6 py-8 sm:px-10"
                >
                    <h3 className="mb-6 text-lg font-medium tracking-tight">
                        {category.title}
                    </h3>

                    <ul className="flex flex-wrap pb-2">
                        {category.technologies.map((tech) => (
                            <TechnologyBadge
                                key={tech.id}
                                tech={tech}
                                showTechName={showTechName}
                                panelId={`${category.id}-${tech.id}-panel`}
                            />
                        ))}
                    </ul>
                </section>
            ))}
        </div>
    );
}

function TechnologyLogo({ tech }: { tech: TechnologyItem }) {
    const size = tech.iconSize ?? 40;
    const recolor = !tech.keepColor;
    const hasDarkSrc = Boolean(tech.darkSrc);

    return (
        <>
            {/* light mode: black logo */}
            <Image
                src={tech.src}
                alt=""
                width={size}
                height={size}
                unoptimized
                className={cn("dark:hidden", recolor && "brightness-0")}
            />

            {/* dark mode: your own darkSrc untouched, else the same logo turned white */}
            <Image
                src={tech.darkSrc ?? tech.src}
                alt=""
                width={size}
                height={size}
                unoptimized
                className={cn(
                    "hidden dark:block",
                    recolor && !hasDarkSrc && "brightness-0 invert",
                )}
            />
        </>
    );
}

function TechnologyBadge({ tech, panelId, showTechName}: { tech: TechnologyItem; panelId: string; showTechName?: boolean }) {
    return (
        <li
            tabIndex={0}
            aria-describedby={panelId}
            className={cn(
                "group/tech relative mb-1 -ml-3 flex w-24 flex-col items-center gap-3 outline-none first:ml-0 sm:w-28",
                "hover:z-20 focus-visible:z-20",
            )}
        >
            {/* circle */}
            <div
                className={cn(
                    "flex size-24 items-center justify-center rounded-full border border-dashed bg-background transition-colors duration-200 sm:size-28",
                    "group-hover/tech:border-foreground/40 group-focus-visible/tech:border-foreground/40 group-focus-visible/tech:ring-2 group-focus-visible/tech:ring-ring",
                )}
            >
                <TechnologyLogo tech={tech} />
            </div>

            {
                showTechName &&
                <span className="text-center text-sm font-semibold leading-tight">
                    {tech.name}
                </span>
            }


            {/* slide-down panel */}
            <div
                id={panelId}
                role="tooltip"
                className={cn(
                    "pointer-events-none absolute left-1/2 top-full  mt-2 w-60 -translate-x-1/2 z-[60] -translate-y-2 rounded-md border bg-popover p-3 text-left text-popover-foreground",
                    "opacity-0 [clip-path:inset(0_0_100%_0)]",
                    "transition-[opacity,transform,clip-path] duration-500 ease-in-out motion-reduce:transition-none",
                    "group-hover/tech:translate-y-0 group-hover/tech:opacity-100 group-hover/tech:[clip-path:inset(0)]",
                    "group-focus-visible/tech:translate-y-0 group-focus-visible/tech:opacity-100 group-focus-visible/tech:[clip-path:inset(0)]",
                )}
            >
                <p className="text-sm font-semibold">{tech.name}</p>
                <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                    {tech.description}
                </p>
            </div>
        </li>
    );
}