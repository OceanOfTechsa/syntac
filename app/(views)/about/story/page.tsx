import {
    ArrowUpRight,
    Code2,
    Globe2,
    Lightbulb,
    Rocket,
    Users,
    type LucideIcon,
} from "lucide-react";
import SectionHeader from "@/components/site/shared/section-header";
import {Metadata} from "next";

export const metadata: Metadata = {
    title: "Our History",
};


type Milestone = {
    year: string;
    title: string;
    description: string;
    icon: LucideIcon;
};

type Era = {
    id: "oot" | "syntac";
    span: string;
    items: Milestone[];
};

const eras: Era[] = [
    {
        id: "oot",
        span: "2021 – 2025",
        items: [
            {
                year: "2021",
                title: "The idea begins",
                description:
                    "While at university, the idea began with a passion for technology and a growing interest in solving real-world challenges. We became interested in the possibility of building technology that could make a practical difference for people and businesses.",
                icon: Lightbulb,
            },
            {
                year: "2021",
                title: "Ocean of Tech",
                description:
                    "That idea became a business under the name Ocean of Tech. We started with website development, helping businesses establish their presence online and gaining our first experiences of building technology around real client needs.",
                icon: Globe2,
            },
            {
                year: "2022",
                title: "Growing the team",
                description:
                    "Sanele Jeza joined as co-founder and developer, turning what had started as an individual idea into a shared vision. Together, we began taking on more ambitious projects and exploring where the company could go.",
                icon: Users,
            },
            {
                year: "2022 — 2025",
                title: "Learning through real projects",
                description:
                    "Working on real projects gave us a much deeper understanding of what businesses actually need from technology. Projects such as Enoway helped us move beyond simply building websites and taught us to think more carefully about the problems behind the software.",
                icon: ArrowUpRight,
            },
            {
                year: "2024 — 2025",
                title: "Beyond websites",
                description:
                    "Our technical direction continued to grow. We began moving further into custom software and business systems, adopting technologies such as modern .NET to build more structured, maintainable, and capable solutions.",
                icon: Code2,
            },
            {
                year: "2025",
                title: "A better way of working",
                description:
                    "As our experience grew, so did the way we worked with clients. We became more intentional about collaboration, keeping clients involved throughout the process and focusing on understanding the problem before deciding what should be built.",
                icon: Users,
            },
        ],
    },
    {
        id: "syntac",
        span: "2026 – today",
        items: [
            {
                year: "2026",
                title: "Introducing SYNTAC",
                description:
                    "Ocean of Tech had grown beyond the identity we started with. We wanted a name that felt less generic and better represented the broader direction of the company. SYNTAC became the new identity — built around the idea of synchronising ideas with technology.",
                icon: Rocket,
            },
            {
                year: "Today",
                title: "Building what comes next",
                description:
                    "Today, SYNTAC brings together web development, custom software development, and ongoing maintenance. We work with businesses, brands, organisations, and teams of different sizes, building thoughtful technology around their goals and challenges.",
                icon: Rocket,
            },
        ],
    },
];

const RenameMark = () => (
    <div
        className="mt-6 flex flex-wrap items-baseline gap-x-4 gap-y-1 rounded-lg border border-dashed bg-muted/40 px-5 py-4"
        aria-label="Ocean of Tech became SYNTAC"
    >
        <span className="text-lg text-muted-foreground line-through decoration-muted-foreground/40">
            Ocean of Tech
        </span>
        <span
            aria-hidden
            className="font-mono text-2xl font-bold leading-none text-[#FFC400]"
        >
            &gt;
        </span>
        <span className="text-lg font-semibold tracking-tight">Syntac</span>
    </div>
);

const CompanyHistory = () => {
    return (
        <section id="company-history">
            <div className="mx-auto max-w-235 px-4 py-12 sm:px-6 sm:py-16 lg:border-x lg:border-dashed lg:px-12 lg:py-24">
                <div className="mx-auto max-w-3xl border-b border-dashed pb-10">
                    <SectionHeader
                        preTitle="Our Story"
                        title="How We Got Here"
                        markedWord="Got Here"
                        desc="From a university idea in 2021 to SYNTAC today, this is the story of how our vision, technology, and way of working have evolved."
                    />
                </div>

                <div className="mx-auto mt-16 max-w-4xl">
                    {eras.map((era, eraIndex) => (
                        <div
                            key={era.id}
                            className={
                                eraIndex > 0
                                    ? "mt-12 border-t border-dashed pt-12"
                                    : undefined
                            }
                        >
                            {/* Era heading */}
                            <div className="mb-10 md:grid md:grid-cols-[160px_1fr] md:gap-8">
                                <h3 className="text-sm font-medium text-muted-foreground md:col-start-2">
                                    As{" "}
                                    <span className="text-foreground">
                                        {era.id === "syntac" ? (
                                            <>
                                                Synatc
                                            </>
                                        ) : (
                                            "Ocean of Tech"
                                        )}
                                    </span>
                                    <span className="ml-3 font-normal tabular-nums">
                                        {era.span}
                                    </span>
                                </h3>
                            </div>

                            <div className="relative">
                                {/* Timeline line (restarts for each era) */}
                                <div
                                    className={`absolute bottom-0 left-20 top-0 hidden w-px md:block ${
                                        era.id === "syntac"
                                            ? "bg-primary/40"
                                            : "bg-border"
                                    }`}
                                />

                                <div className="space-y-0">
                                    {era.items.map((item) => {
                                        const Icon = item.icon;

                                        return (
                                            <article
                                                key={`${item.year}-${item.title}`}
                                                className="group relative grid grid-cols-1 gap-6 border-b border-dashed py-10 first:pt-0 last:border-b-0 md:grid-cols-[160px_1fr] md:gap-8 md:py-12"
                                            >
                                                {/* Year */}
                                                <div className="relative">
                                                    <p className="text-sm font-medium text-primary md:sticky md:top-32">
                                                        {item.year}
                                                    </p>
                                                </div>

                                                {/* Timeline marker */}
                                                <div className="absolute left-[calc(80px-12px)] top-12 hidden size-6 place-items-center rounded-full border border-primary/20 bg-background md:grid">
                                                    <span className="size-2 rounded-full bg-primary" />
                                                </div>

                                                {/* Content */}
                                                <div className="max-w-2xl">
                                                    <div className="mb-4 flex items-center gap-3">
                                                        <div className="grid size-9 shrink-0 place-items-center rounded-lg border bg-muted/40 text-primary transition-colors group-hover:bg-primary/10">
                                                            <Icon className="size-4" />
                                                        </div>

                                                        <h4 className="text-xl font-semibold tracking-tight">
                                                            {item.title}
                                                        </h4>
                                                    </div>

                                                    <p className="leading-7 text-muted-foreground">
                                                        {item.description}
                                                    </p>

                                                    {item.year === "2021" &&
                                                        item.title ===
                                                        "The idea begins" && (
                                                            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-dashed px-3 py-1.5 text-xs text-muted-foreground">
                                                                <span className="size-1.5 rounded-full bg-primary" />
                                                                The beginning
                                                            </div>
                                                        )}

                                                    {item.year === "2026" && (
                                                        <>
                                                            <RenameMark />
                                                            <div className="mt-6 inline-flex items-center gap-2 rounded-full border border-dashed px-3 py-1.5 text-xs text-muted-foreground">
                                                                <span className="size-1.5 rounded-full bg-primary" />
                                                                A new chapter
                                                            </div>
                                                        </>
                                                    )}

                                                    {item.year === "Today" && (
                                                        <div className="mt-6 inline-flex items-center gap-2 rounded-full border bg-muted/40 px-3 py-1.5 text-xs text-primary">
                                                            <span className="relative flex size-1.5">
                                                                <span className="absolute inline-flex size-full animate-ping rounded-full bg-[#0B9944] opacity-75" />
                                                                <span className="relative inline-flex size-1.5 rounded-full bg-[#0B9944]" />
                                                            </span>
                                                            Where we are today
                                                        </div>
                                                    )}
                                                </div>
                                            </article>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Closing statement */}
                <div className="mx-auto mt-16 max-w-3xl border-y border-dashed py-12 text-center">
                    <p className="text-lg font-medium">
                        The name has changed. The technology has evolved.
                    </p>

                    <p className="mt-2 text-muted-foreground">
                        But the idea that started it all remains the same:
                        building technology that solves meaningful problems.
                    </p>
                </div>
            </div>
            <div className="relative z-20 w-full opacity-100 transition-opacity duration-1000">
                {/*width for the bottom div was changed to w-full from -> w-[1905px]*/}
                <div className="absolute left-1/2 h-px w-full 2xl:w-[1905px] -translate-x-1/2">
                    <hr className="-mb-px w-full border-dashed" />

                    <div className="relative mx-auto h-px w-full max-w-350 max-[1429px]:overflow-hidden min-[1800px]:max-w-384">
                        <span className="absolute top-1/2 left-0 z-[50] size-2.5 -translate-x-1/2 -translate-y-1/2 rotate-45 rounded-xs border border-primary/20 bg-muted" />

                        <span className="absolute top-1/2 right-0 z-[50] size-2.5 translate-x-1/2 -translate-y-1/2 rotate-45 rounded-xs border border-primary/20 bg-muted" />
                    </div>
                </div>
            </div>
        </section>
    );
};

export default CompanyHistory;