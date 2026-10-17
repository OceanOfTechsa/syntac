import { technologyPath } from "@/data/technologies";

export interface TechnologyItem {
    /** Stable id used by the `show` prop, e.g. "sqlserver" */
    id: string;
    name: string;
    src: string;
    /** Optional separate logo for dark mode */
    darkSrc?: string;
    /** Logo size in px. Defaults to 40. */
    iconSize?: number;
    /** Shown in the hover panel */
    description: string;

    keepColor?: boolean;
}

export interface TechnologyCategory {
    /** Stable id used by the `show` prop, e.g. "database" */
    id: string;
    /** Heading shown above the logos */
    title: string;
    technologies: TechnologyItem[];
}

export const technologyCatalog: TechnologyCategory[] = [
    {
        id: "database",
        title: "Databases",
        technologies: [
            {
                id: "sqlserver",
                name: "SQL Server",
                src: technologyPath("sqlserver"),
                description:
                    "Microsoft's relational database. Our primary store for transactional, multi-tenant data.",
            },
            {
                id: "postgresql",
                name: "PostgreSQL",
                src: technologyPath("postgresql"),
                description:
                    "Open-source relational database known for reliability, JSON support and advanced indexing.",
            },
            {
                id: "redis",
                name: "Redis",
                src: technologyPath("redis"),
                description:
                    "In-memory data store used for caching, sessions and fast lookups.",
            },
            {
                id: "supabase",
                name: "Supabase",
                src: technologyPath("supabase"),
                description:
                    "Open-source backend built on PostgreSQL, giving us a hosted database, authentication, storage and real-time APIs.",
            },
            {
                id: "mongodb",
                name: "MongoDB",
                src: technologyPath("mongodb"),
                description:
                    "Document database that stores flexible JSON-like data, suited to fast-changing or loosely structured records.",
            },
        ],
    },
    {
        id: "backend",
        title: "Backend",
        technologies: [
            {
                id: "netcore",
                name: ".NET",
                src: technologyPath("netcore"),
                description:
                    "Cross-platform framework for building fast, secure web apps and APIs with ASP.NET Core.",
            },
            {
                id: "csharp",
                name: "C#",
                src: technologyPath("csharp"),
                description:
                    "Strongly typed, modern language that powers our services, business rules and domain models.",
            },
            {
                id: "efcore",
                name: "EF Core",
                src: technologyPath("efcore"),
                description:
                    "Object-relational mapper that lets us query and migrate the database using C# classes.",
            },
        ],
    },
    {
        id: "frontend",
        title: "Frontend",
        technologies: [
            {
                id: "react",
                name: "React",
                src: technologyPath("react"),
                description:
                    "Component-based library for building interactive user interfaces.",
            },
            {
                id: "nextjs",
                name: "Next.js",
                src: technologyPath("nextjs"),
                description:
                    "React framework for routing, server rendering and fast, SEO-friendly sites.",
            },
            {
                id: "ts",
                name: "TypeScript",
                src: technologyPath("ts"),
                description:
                    "JavaScript with static types, catching mistakes before they reach the browser.",
            },
            {
                id: "tailwind",
                name: "Tailwind",
                src: technologyPath("tailwind"),
                description:
                    "Utility-first CSS framework for building consistent designs quickly.",
            },
        ],
    },
    {
        id: "devops",
        title: "DevOps",
        technologies: [
            {
                id: "githubactions",
                name: "GitHub Actions",
                src: technologyPath("githubactions"),
                description:
                    "Automates our builds, tests and deployments straight from the repository on every push.",
            },
            {
                id: "azuredevops",
                name: "Azure DevOps",
                src: technologyPath("azuredevops"),
                description:
                    "Pipelines, boards and repos for planning work and releasing it through controlled environments.",
            },
            {
                id: "github",
                name: "GitHub",
                src: technologyPath("github"),
                description:
                    "Hosts our source code and handles pull requests, code reviews and version history for every project.",
            },
        ],
    },
    {
        id: "monitoring",
        title: "Monitoring",
        technologies: [
            {
                id: "sentry",
                name: "Sentry",
                src: technologyPath("sentry"),
                description:
                    "Captures errors and performance issues in real time, with the stack trace and context to fix them quickly.",
            },
            {
                id: "uptimerobot",
                name: "UptimeRobot",
                src: technologyPath("uptimerobot"),
                description:
                    "Checks our sites and APIs around the clock and alerts us the moment something goes down.",
            },
        ],
    },
    {
        id: "notifications",
        title: "Notifications",
        technologies: [
            {
                id: "resend",
                name: "Resend",
                src: technologyPath("resend"),
                description:
                    "Email API for sending reliable transactional emails such as confirmations, receipts and alerts.",
            },
        ],
    },
    {
        id: "design",
        title: "Design & Motion",
        technologies: [
            {
                id: "figma",
                name: "Figma",
                src: technologyPath("figma"),
                description:
                    "Collaborative design tool where we build UI mockups, prototypes and design systems before writing code.",
            },
            {
                id: "gsap",
                name: "GSAP",
                src: technologyPath("gsap"),
                description:
                    "Animation library behind our smooth scroll effects, transitions and interactive motion.",
            },
            {
                id: "scss",
                name: "SASS",
                src: technologyPath("sass"),
                description:
                    "CSS with variables, nesting and mixins, which keeps our stylesheets organized and reusable.",
            },
        ],
    },
    {
        id: "support",
        title: "Support & Collaboration",
        technologies: [
            {
                id: "slack",
                name: "Slack",
                src: technologyPath("slack"),
                description:
                    "Day-to-day team communication, with alerts from our pipelines and monitoring posted straight into channels.",
            },
            {
                id: "jira",
                name: "Jira",
                src: technologyPath("jira"),
                description:
                    "Tracks issues, bugs and support requests so every ticket has an owner and a clear status.",
            },
        ],
    },
];