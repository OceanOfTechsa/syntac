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
        id: "frontend",
        title: "Frontend Development",
        technologies: [
            {
                id: "react",
                name: "React",
                src: technologyPath("react"),
                description:
                    "A component-based JavaScript library for building interactive user interfaces from reusable, maintainable UI components.",
            },
            {
                id: "nextjs",
                name: "Next.js",
                src: technologyPath("nextjs"),
                description:
                    "A React framework for building websites and web applications with flexible rendering, routing, server-side functionality, and search-friendly pages.",
            },
            {
                id: "astro",
                name: "Astro.js",
                src: technologyPath("astro"),
                description:
                    "The web framework for content-driven websites, Astro powers the world's fastest marketing sites, blogs, e-commerce websites, and more.",
            },
            {
                id: "ts",
                name: "TypeScript",
                src: technologyPath("ts"),
                description:
                    "A typed superset of JavaScript that helps identify errors during development and makes larger codebases easier to maintain.",
            },
            {
                id: "tailwind",
                name: "Tailwind CSS",
                src: technologyPath("tailwind"),
                description:
                    "A utility-first CSS framework for creating responsive, consistent interfaces directly within component markup.",
            },
        ],
    },
    {
        id: "backend",
        title: "Backend Development",
        technologies: [
            {
                id: "netcore",
                name: ".NET Core",
                src: technologyPath("netcore"),
                description:
                    "A cross-platform development platform for building web applications, APIs, enterprise systems, and backend services.",
            },
            {
                id: "csharp",
                name: "C#",
                src: technologyPath("csharp"),
                description:
                    "A modern, strongly typed programming language used to implement application logic, business rules, APIs, and backend services.",
            },
            {
                id: "efcore",
                name: "Entity Framework Core",
                src: technologyPath("efcore"),
                description:
                    "An object-relational mapper for .NET that simplifies database queries, entity management, and schema changes through code-first or database-first workflows.",
            },
            {
                id: "nodejs",
                name: "Node.js",
                src: technologyPath("nodejs"),
                description:
                    "A JavaScript runtime for building server-side applications, APIs, real-time services, and backend functionality using JavaScript or TypeScript.",
            }
        ],
    },
    {
        id: "database",
        title: "Databases",
        technologies: [
            {
                id: "sqlserver",
                name: "SQL Server",
                src: technologyPath("sqlserver"),
                description:
                    "A relational database management system for storing structured business data, managing transactions, and maintaining data integrity.",
            },
            {
                id: "postgresql",
                name: "PostgreSQL",
                src: technologyPath("postgresql"),
                description:
                    "An open-source relational database known for reliability, advanced querying, and support for complex application data.",
            },
            {
                id: "redis",
                name: "Redis",
                src: technologyPath("redis"),
                description:
                    "An in-memory data store used for caching, session management, queues, and other use cases that benefit from fast data access.",
            },
            {
                id: "supabase",
                name: "Supabase",
                src: technologyPath("supabase"),
                description:
                    "A development platform built around PostgreSQL that provides database services, authentication, file storage, and real-time capabilities.",
            },
            {
                id: "mongodb",
                name: "MongoDB",
                src: technologyPath("mongodb"),
                description:
                    "A document-oriented database that stores data in flexible document structures, making it useful for applications with evolving data requirements.",
            },
        ],
    },
    {
        id: "devops",
        title: "DevOps & Version Control",
        technologies: [
            {
                id: "githubactions",
                name: "GitHub Actions",
                src: technologyPath("githubactions"),
                description:
                    "A workflow automation platform for running tests, checking code, building applications, and deploying changes through CI/CD pipelines.",
            },
            {
                id: "azuredevops",
                name: "Azure DevOps",
                src: technologyPath("azuredevops"),
                description:
                    "A development platform that supports work planning, source control, automated builds, testing, and application release management.",
            },
            {
                id: "github",
                name: "GitHub",
                src: technologyPath("github"),
                description:
                    "A code hosting and collaboration platform for version control, pull requests, code reviews, issue tracking, and project history.",
            },
        ],
    },
    {
        id: "monitoring",
        title: "Monitoring & Analytics",
        technologies: [
            {
                id: "sentry",
                name: "Sentry",
                src: technologyPath("sentry"),
                description:
                    "An application monitoring platform that captures errors and performance issues to help developers diagnose problems and improve reliability.",
            },
            {
                id: "uptimerobot",
                name: "UptimeRobot",
                src: technologyPath("uptimerobot"),
                description:
                    "A website and service monitoring tool that checks availability and can alert you when a monitored endpoint becomes unavailable.",
            },
            {
                id: "google-pagespeed-insights",
                name: "Google PageSpeed Insights",
                src: technologyPath("google-pagespeed-insights"),
                description:
                    "A website performance assessment tool that reports real-world and laboratory performance data and recommends improvements to loading, responsiveness, and visual stability.",
            },
            {
                id: "google-analytics",
                name: "Google Analytics",
                src: technologyPath("google-analytics"),
                description:
                    "A web analytics platform for understanding website traffic, visitor behaviour, engagement, and conversions.",
            },
            {
                id: "google-search-console",
                name: "Google Search Console",
                src: technologyPath("google-search-console"),
                description:
                    "A tool for monitoring a website's presence in Google Search, including indexing, search performance, and technical search visibility issues.",
            },
            {
                id: "posthog",
                name: "Posthog",
                src: technologyPath("posthog"),
                description:
                    "An open-source product analytics platform for tracking user behaviour, funnels, feature flags, session replay, and product experiments.",
            },
        ],
    },
    {
        id: "notifications",
        title: "Email & Notifications",
        technologies: [
            {
                id: "resend",
                name: "Resend",
                src: technologyPath("resend"),
                description:
                    "An email delivery platform for transactional messages such as account verification, password resets, order confirmations, and application notifications.",
            },
            {
                id: "react-email",
                name: "React Email",
                src: technologyPath("react-email"),
                description:
                    "A next-generation collection of unstyled components for creating beautiful emails using React, Tailwind, and TypeScript.",
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
                    "A collaborative design and prototyping tool for planning interfaces, exploring layouts, and validating user experiences before development.",
            },
            {
                id: "gsap",
                name: "GSAP",
                src: technologyPath("gsap"),
                description:
                    "An animation library for creating controlled interface transitions, scroll-triggered effects, and polished web animations.",
            },
            {
                id: "scss",
                name: "Sass",
                src: technologyPath("sass"),
                description:
                    "A CSS preprocessor that adds features such as variables, nesting, and mixins to help organise and maintain stylesheets.",
            },
        ],
    },
    {
        id: "support",
        title: "Project Management & Collaboration",
        technologies: [
            {
                id: "slack",
                name: "Slack",
                src: technologyPath("slack"),
                description:
                    "A team communication platform for sharing project updates, coordinating discussions, and keeping work-related conversations organised.",
            },
            {
                id: "jira",
                name: "Jira",
                src: technologyPath("jira"),
                description:
                    "A project and issue tracking platform for organising tasks, managing backlogs, prioritising bugs, and tracking development progress.",
            },
        ],
    },
    {
        id: "fetching",
        title: "Data Fetching & API Communication",
        technologies: [
            {
                id: "axios",
                name: "Axios",
                src: technologyPath("axios"),
                description:
                    "An HTTP client for making API requests, handling responses, and communicating with backend services from JavaScript and TypeScript applications.",
            },
            {
                id: "postman",
                name: "Postman",
                src: technologyPath("postman"),
                description:
                    "An API platform for designing, testing, documenting, and collaborating on HTTP requests and collections used during development and debugging.",
            },
        ],
    },
    {
        id: "deployment",
        title: "Deployment & Hosting",
        technologies: [
            {
                id: "vercel",
                name: "Vercel",
                src: technologyPath("vercel"),
                description:
                    "A deployment platform with integrated builds, hosting, preview deployments, and delivery infrastructure for modern web applications.",
            },
            {
                id: "netlify",
                name: "Netlify",
                src: technologyPath("netlify"),
                description:
                    "A web development platform offering deployment, hosting, automated builds, preview environments, and serverless functionality.",
            },
            {
                id: "azure",
                name: "Microsoft Azure",
                src: technologyPath("azure"),
                description:
                    "A cloud computing platform that provides hosting, databases, storage, application services, monitoring, and infrastructure for business software.",
            },
        ],
    },
    {
        id: "authentication",
        title: "Authentication & Identity",
        technologies: [
            {
                id: "auth0",
                name: "Auth0",
                src: technologyPath("auth0"),
                description:
                    "An identity platform that provides authentication, authorisation, single sign-on, and user identity management for applications.",
            },
            {
                id: "firebase",
                name: "Firebase Authentication",
                src: technologyPath("firebase"),
                description:
                    "A managed authentication service supporting email and password sign-in, social identity providers, and other authentication methods.",
            },
            {
                id: "clerk",
                name: "Clerk",
                src: technologyPath("clerk"),
                description:
                    "An authentication and user management platform with sign-in components, session management, and tools for integrating identity into web applications.",
            },
            {
                id: "supabase-auth",
                name: "Supabase Auth",
                src: technologyPath("supabase"),
                description:
                    "An authentication service integrated with Supabase that supports user sign-in, session management, and access control alongside PostgreSQL.",
            },
        ],
    },
    {
        id: "testing",
        title: "Testing & Quality Assurance",
        technologies: [
            {
                id: "jest",
                name: "Jest",
                src: technologyPath("jest"),
                description:
                    "A JavaScript testing framework for validating application logic through automated tests, assertions, and mocking utilities.",
            },
            {
                id: "cypress",
                name: "Cypress",
                src: technologyPath("cypress"),
                description:
                    "A testing framework for running automated browser tests and validating application behaviour through realistic user interactions.",
            },
            {
                id: "playwright",
                name: "Playwright",
                src: technologyPath("playwright"),
                description:
                    "Playwright enables reliable web automation for testing, scripting, and AI agents.",
            },
        ],
    },
    {
        id: "storage",
        title: "File & Object Storage",
        technologies: [
            {
                id: "vercel-blob",
                name: "Vercel Blob",
                src: technologyPath("vercel-blob"),
                description:
                    "An object storage service for uploading and serving files such as product images, documents, and other application assets.",
            },
            {
                id: "azure-blob",
                name: "Azure Blob Storage",
                src: technologyPath("azure-blob"),
                description:
                    "Microsoft Azure's object storage service for storing and serving unstructured data, including images, documents, backups, and media files.",
            },
        ],
    },
    {
        id: "ecommerce",
        title: "E-commerce Development",
        technologies: [
            {
                id: "nextjs-ecommerce",
                name: "Next.js Commerce 2.0",
                src: technologyPath("nextjs"),
                description:
                    "A custom storefront approach using Next.js to build product catalogues, shopping experiences, and checkout journeys integrated with suitable commerce APIs and payment providers.",
            },
        ],
    },
    {
        id: "state-management",
        title: "State Management",
        technologies: [
            {
                id: "redux",
                name: "Redux",
                src: technologyPath("redux"),
                description:
                    "A predictable state management library for sharing and updating application state across complex interfaces and workflows.",
            },
        ],
    },
];