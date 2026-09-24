"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import OpposingCards, { MarqueeCard } from "@/components/site/sections/home/show-case";
import { toCardImage } from "@/lib/cloudinary";

const cardNames = ["showcase-1", "showcase-2", "showcase-3", "showcase-4"];

const hrefs: Record<string, string> = {
    "showcase-1": "https://example.com/fashion",
    "showcase-2": "https://example.com/bistro",
    "showcase-3": "https://example.com/bistro",
    "showcase-4": "https://example.com/bistro",
};

export default function ShowcaseSection() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const theme = resolvedTheme === "dark" ? "dark" : "light";
    const otherTheme = theme === "dark" ? "light" : "dark";

    const cards: MarqueeCard[] = cardNames.map((name) => ({
        image: toCardImage(name, theme),
        href: hrefs[name],
    }));

    return (
        <>
            {/* Preload the opposite theme's images so switching feels instant */}
            {cardNames.map((name) => (
                <link
                    key={name}
                    rel="preload"
                    as="image"
                    href={toCardImage(name, otherTheme)}
                />
            ))}
            <OpposingCards cards={cards} speed={40} className={'-mt-5'} />
        </>
    );
}