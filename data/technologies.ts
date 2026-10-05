import { OrbitRing } from "@/components/site/shared/orbiting-logos";

export const technologyPath = (name: string) =>
    `/assets/shared/technologies/${name}.svg`;

export const technologies: OrbitRing[] = [
    // Database
    {
        radius: 70,
        duration: 18,
        logos: [
            {
                src: technologyPath("sqlserver"),
                alt: "SQL Server",
                size: 34,
                iconSize: 24,
            },
            {
                src: technologyPath("postgresql"),
                alt: "PostgreSQL",
                size: 34,
                iconSize: 24,
            },
            {
                src: technologyPath("redis"),
                alt: "Redis Server",
                size: 34,
                iconSize: 24,
            },
        ],
    },

    // Backend
    {
        radius: 110,
        duration: 24,
        reverse: true,
        logos: [
            {
                src: technologyPath("netcore"),
                alt: ".NET",
                size: 38,
                iconSize: 27,
            },
            {
                src: technologyPath("csharp"),
                alt: "C#",
                size: 38,
                iconSize: 27,
            },
            {
                src: technologyPath("efcore"),
                alt: "Entity Framework Core",
                size: 38,
                iconSize: 27,
            },
        ],
    },

    // Frontend
    {
        radius: 150,
        duration: 30,
        logos: [
            {
                src: technologyPath("react"),
                alt: "React",
                size: 34,
                iconSize: 25,
            },
            {
                src: technologyPath("tailwind"),
                alt: "Tailwind",
                size: 34,
                iconSize: 25,
            },
            {
                src: technologyPath("nextjs"),
                alt: "Next.js",
                size: 38,
                iconSize: 27,
            },
            {
                src: technologyPath("typescript"),
                alt: "TypeScript",
                size: 34,
                iconSize: 24,
            },
        ],
    },
];