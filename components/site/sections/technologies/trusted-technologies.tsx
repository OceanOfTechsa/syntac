import Image from "next/image";

import SectionHeader from "@/components/site/shared/section-header";
import { technologyPath } from "@/data/technologies";

const trustedTechnologies = [
    { name: "Microsoft", logo: "azure" },
    { name: "React", logo: "react" },
    { name: "Next.js", logo: "nextjs" },
    { name: "GitHub", logo: "github" },
    { name: "Vercel", logo: "vercel" },
    { name: "PostgreSQL", logo: "postgresql" },
    { name: "Supabase", logo: "supabase" },
    { name: "Google Analytics", logo: "google-analytics" },
] as const;

const TrustedTechnologies = () => {
    return (
        <section
            id="trusted-technologies"
            className="flex flex-col gap-12 py-8 sm:gap-16 sm:py-16 lg:py-24"
        >
            <SectionHeader
                preTitle="Trusted technology"
                title="Tools used by teams that build for scale"
                markedWord="scale"
                desc="We work with proven technologies trusted by organisations around the world, selecting the right tools for your goals, users, and long-term growth."
            />

            <div className="grid grid-cols-2 border-y border-dashed sm:grid-cols-4 lg:grid-cols-8">
                {trustedTechnologies.map((technology) => (
                    <div
                        key={technology.name}
                        className="group flex min-h-32 flex-col items-center justify-center gap-4 border-b border-dashed px-4 py-6 transition-colors last:border-b-0 hover:bg-muted/40 sm:min-h-36 sm:nth-[n+5]:border-b-0 lg:border-b-0 lg:border-r lg:last:border-r-0"
                    >
                        <div className="grid size-12 place-items-center rounded-xl border bg-background transition-transform duration-300 group-hover:-translate-y-1">
                            <Image
                                src={technologyPath(technology.logo)}
                                alt=""
                                width={30}
                                height={30}
                                className="size-7 object-contain"
                            />
                        </div>
                        <span className="text-center text-sm font-medium text-muted-foreground">
                            {technology.name}
                        </span>
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TrustedTechnologies;
