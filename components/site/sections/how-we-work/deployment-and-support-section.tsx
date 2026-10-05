'use client'

import React, {useEffect, useState} from "react";
import {
    Rocket,
    Activity,
    Wrench,
    BookOpen,
    LifeBuoy,
} from "lucide-react";

import SectionHeader from "@/components/site/shared/section-header";
import Link from "next/link";
import AvatarGroup from "@/components/site/shared/avatar-group";
import {ITestimonial, TESTIMONIALS} from "@/data/reviews";


interface IHeroAvatar extends ITestimonial {
    src: string;
    name: string;
    fallback: string;
}

function buildAvatars(): IHeroAvatar[] {
    const shuffledReviews = [...TESTIMONIALS].sort(() => Math.random() - 0.5);

    return shuffledReviews.map((review: ITestimonial) => {
        const avatarNumber = Math.floor(Math.random() * 10) + 1;

        return {
            ...review,
            src: `https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-${avatarNumber}.png`,
            name: `${review.name} ${review.surname}`,
            fallback: `${review.name.charAt(0)}${review.surname.charAt(0)}`,
        };
    });
}


const deploymentSteps = [
    {
        icon: Rocket,
        title: "Production Deployment",
        description:
            "We carefully deploy the application to production with proper checks, rollbacks, and monitoring in place.",
        points: [
            ["Focus:", "Safe and reliable go-live"],
            ["Outcome:", "A stable launch"],
        ],
    },
    {
        icon: Activity,
        title: "Monitoring & Performance",
        description:
            "We set up monitoring, error tracking, and performance checks so issues are detected early.",
        points: [
            ["Focus:", "Visibility after launch"],
            ["Outcome:", "Fast reaction to problems"],
        ],
    },
    {
        icon: Wrench,
        title: "Maintenance & Bug Fixes",
        description:
            "We provide ongoing maintenance, fix bugs, and apply necessary updates to keep the system healthy.",
        points: [
            ["Focus:", "Stability and reliability"],
            ["Outcome:", "A system that stays dependable"],
        ],
    },
    {
        icon: BookOpen,
        title: "Documentation & Knowledge Transfer",
        description:
            "We deliver clear documentation and knowledge transfer so your team understands how the system works.",
        points: [
            ["Focus:", "Long-term independence"],
            ["Outcome:", "Your team can manage and extend the product"],
        ],
    },
    {
        icon: LifeBuoy,
        title: "Ongoing Support",
        description:
            "We remain available for support, improvements, and future enhancements as your needs evolve.",
        points: [
            ["Focus:", "Partnership after launch"],
            ["Outcome:", "Continuous improvement and peace of mind"],
        ],
    },
];

const DeploymentSupportSection = () => {

    const [avatars, setAvatars] = useState<IHeroAvatar[]>([]);

    useEffect(() => {
        setAvatars(buildAvatars());
    }, []);

    return (
        <section className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24" id={'deployment-and-support'}>
            <SectionHeader
                preTitle="Deployment & Support"
                title="Launch and Beyond"
                markedWord="Beyond"
                desc="We don’t stop at delivery — we help you launch confidently and support the product afterwards."
            />

            <div className="grid border-y border-dashed sm:grid-cols-2 lg:grid-cols-3">
                <div
                    className="flex items-center justify-center border-dashed border-b px-4 py-6 sm:px-6 lg:border-r lg:px-8">
                    <h3 className="text-2xl font-medium">
                        Here are the steps we take after development:
                    </h3>
                </div>

                {deploymentSteps.map((step, index) => {
                    const Icon = step.icon;
                    const isLastColumn = (index + 1) % 3 === 2;
                    const isLastRow = index >= 2;

                    return (
                        <div
                            key={step.title}
                            className={[
                                "flex flex-col justify-between gap-4 border-dashed px-4 py-6 sm:px-6 lg:px-8",
                                isLastRow ? "lg:border-b-0" : "border-b",
                                isLastColumn ? "lg:border-r-0" : "lg:border-r",
                                "max-sm:border-b",
                                index % 2 === 0 ? "sm:max-lg:border-r" : "",
                            ].join(" ")}
                        >
                            <div className="flex flex-col gap-4">
                                <div className="flex items-center gap-4">
                                    <div className="bg-muted grid size-8.5 place-items-center rounded-md">
                                        <Icon className="text-primary size-5.5" strokeWidth={2}/>
                                    </div>
                                    <h3 className="text-xl font-medium">{step.title}</h3>
                                </div>
                                <p className="text-muted-foreground">{step.description}</p>
                                <ul className="flex list-inside list-disc flex-col gap-3">
                                    {step.points.map(([label, value]) => (
                                        <li key={label}>
                                            <span className="font-medium">{label}</span>{" "}
                                            <span className="text-muted-foreground">{value}</span>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    );
                })}
            </div>

            <div className="flex flex-col justify-center items-center gap-10">
                <div className="z-10 flex items-center gap-3">
                    <AvatarGroup className="size-9.5" avatars={avatars} limit={5}/>
                    <p className="mb-0 text-left text-sm text-nowrap text-muted-foreground">
                        Trusted by <span className="font-semibold">16+</span>
                        <br/>
                        Companies &amp; Teams
                    </p>
                </div>
                <Link className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&amp;_svg]:pointer-events-none [&amp;_svg]:shrink-0 [&amp;_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-6 has-[&gt;svg]:px-4 gap-2 rounded-lg px-6! text-base shadow-sm"
                                                    href="/contac">
                    Start a conversation
                </Link>
            </div>
        </section>
    );
};

export default DeploymentSupportSection;