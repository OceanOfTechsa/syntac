'use client'

import {useFadeUp} from "@/lib/gsap/hooks/use-fade-up";

interface ISectionHeaderProps {
    preTitle: string
    title?: string
    desc?: string
    markedWord?: string // exact substring within `title` to underline
    className?: string

    showTitle?: boolean
    showDescription?: boolean
}

function MarkedWord({ word }: { word: string }) {
    return (
        <span className="relative inline-flex flex-col items-start text-inherit">
            <span className="relative z-10 inline-block text-inherit">
                {word}
            </span>

            {/* Curved underline */}
            <svg
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

const SectionHeader = ({ preTitle, title, desc, markedWord, showTitle = true, showDescription = true }: ISectionHeaderProps) => {
    // Split the title around markedWord, if provided and actually present
    const parts = markedWord ? title?.split(markedWord) : [title]
    const hasMark = markedWord && parts!.length > 1
    const ref1 = useFadeUp({ delay: 0 });
    const ref2 = useFadeUp({ delay: 0.1 });
    const ref3 = useFadeUp({ delay: 0.2 });
    return (
        <div className={"flex flex-col items-center gap-4 text-center mx-auto max-w-7xl px-4 sm:px-6 lg:px-8"}>
            <span className={"font-kalam font-medium underline underline-offset-6"} ref={ref1}>{preTitle}</span>
            {showTitle &&
                <h2 className={"text-2xl font-semibold sm:text-3xl lg:text-4xl"} ref={ref2}>
                    {hasMark ? (
                        <>
                            {parts![0]}
                            <MarkedWord word={markedWord} />
                            {parts?.slice(1).join(markedWord)}
                        </>
                    ) : (
                        title
                    )}
                </h2>
            }
            {showDescription &&
                <p className="text-muted-foreground text-lg max-w-208" ref={ref3}>{desc}</p>
            }
        </div>
    )
}

export default SectionHeader