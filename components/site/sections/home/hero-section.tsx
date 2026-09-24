'use client'

import { useEffect, useState } from "react";
import { Headset, MoveRight } from "lucide-react";
import Link from "next/link";

import { Reviews, type IReview } from "@/data/reviews";
import AvatarGroup from "@/components/site/shared/avatar-group"
import AppSettings from "@/utils/AppSettings/AppSettings";
import FlipWords from "@/components/gsap/animations/shared/flip-words";
import TrustedByLogos from "@/components/gsap/animations/shared/trusted-by-logos";

interface IHeroAvatar extends IReview {
    src: string;
    name: string;
    fallback: string;
}

function buildAvatars(): IHeroAvatar[] {
    const shuffledReviews = [...Reviews].sort(() => Math.random() - 0.5);

    return shuffledReviews.map((review: IReview) => {
        const avatarNumber = Math.floor(Math.random() * 10) + 1;

        return {
            ...review,
            src: `https://cdn.shadcnstudio.com/ss-assets/avatar/avatar-${avatarNumber}.png`,
            name: `${review.name} ${review.surname}`,
            fallback: `${review.name.charAt(0)}${review.surname.charAt(0)}`,
        };
    });
}

const HeroSection = () => {
    const [avatars, setAvatars] = useState<IHeroAvatar[]>([]);

    useEffect(() => {
        setAvatars(buildAvatars());
    }, []);

    const logos = [
        {
            src: "https://cdn.shadcnstudio.com/ss-assets/landing-page/pricing-customer-logo/codeagency-logo.png?height=44&format=auto",
            alt: "Attentive",
            href: "https://attentive.com",
        },
        {
            src: "https://cdn.shadcnstudio.com/ss-assets/landing-page/pricing-customer-logo/scaleapp-logo.png?height=44&amp;format=auto",
            alt: "Chrono Innovation",
            href: "https://chrono.com",
        },
        {
            src: "https://cdn.shadcnstudio.com/ss-assets/landing-page/pricing-customer-logo/grooved-logo.png?height=44&amp;format=auto",
            alt: "One×Tech",
            href: "https://onextech.com",
        },
        {
            src: "https://cdn.shadcnstudio.com/ss-assets/landing-page/pricing-customer-logo/bitwip-logo.png?height=44&amp;format=auto",
            alt: "Verilife",
            href: "https://verilife.com",
        },
        {
            src: "https://cdn.shadcnstudio.com/ss-assets/landing-page/pricing-customer-logo/codeagency-logo.png?height=44&format=auto",
            alt: "Attentive",
            href: "https://attentive.com",
        },
        {
            src: "https://cdn.shadcnstudio.com/ss-assets/landing-page/pricing-customer-logo/scaleapp-logo.png?height=44&amp;format=auto",
            alt: "Chrono Innovation",
            href: "https://chrono.com",
        },
        {
            src: "https://cdn.shadcnstudio.com/ss-assets/landing-page/pricing-customer-logo/bitwip-logo.png?height=44&amp;format=auto",
            alt: "Verilife",
            href: "https://verilife.com",
        },
        {
            src: "https://cdn.shadcnstudio.com/ss-assets/landing-page/pricing-customer-logo/grooved-logo.png?height=44&amp;format=auto",
            alt: "One×Tech",
            href: "https://onextech.com",
        }
    ]

    return (
        <section className="relative mx-auto flex w-full flex-col items-center justify-center space-y-8 px-5 py-16 sm:space-y-16 sm:px-10 sm:py-16 lg:px-16 lg:py-24">
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-7 px-4 text-center sm:px-6 lg:px-8">
                <div className="z-10 flex items-center gap-3">
                    <AvatarGroup className="size-9.5" avatars={avatars} limit={5}/>
                    <p className="mb-0 text-left text-sm text-nowrap text-muted-foreground">
                        Trusted by <span className="font-semibold">16+</span>
                        <br/>
                        Companies &amp; Teams
                    </p>
                </div>
                <h1 className="z-10 max-w-5xl text-3xl font-bold sm:text-4xl lg:text-5xl lg:leading-[1.29167] transition-all duration-600">
                    Custom Software Development Solutions Tailored to Your{" "}
                    <FlipWords
                        words={["Business", "Vision", "Growth", "Goals", "Future"]}
                        duration={3000}
                        className="text-5xl font-bold"
                    />
                </h1>
                <p className="text-muted-foreground z-10 max-w-212 text-lg">
                    At {AppSettings.COMPANY_NAME}, we turn ideas and business
                    challenges into powerful digital solutions that help you work smarter, grow faster, and scale with
                    confidence.
                </p>

                <div className="z-10 flex items-center gap-2 w-full max-w-200 mx-auto">
                    <div className="text-muted-foreground font-medium w-44">
                        Trusted by
                    </div>
                    <TrustedByLogos
                        logos={logos}
                        limit={4}
                        className="max-w-4xl"
                    />
                </div>

                <div className={'w-full flex justify-center items-center gap-2 mt-4'}>
                    <Link
                        href="/contact"
                        className="
                            inline-flex
                            items-center
                            gap-2
                            rounded-full
                            bg-neutral-900
                            px-4
                            py-1
                            text-[13.5px]
                            font-medium
                            text-white
                            transition-colors
                            duration-500
                            hover:bg-[#0B9944]
                            dark:bg-white
                            dark:text-neutral-900
                            dark:hover:bg-[#0B9944]
                            dark:hover:text-white
                       "
                    >
                        Estimate project
                        <Headset size={16} className={"hidden sm:inline-flex"} />
                    </Link>

                    <Link href={'#'} className={"hover:bg-muted rounded-full hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground dark:hover:bg-muted/50 inline-flex items-center gap-2  px-4 py-1 text-[13.5px]"}>
                        Learn more
                        <MoveRight  size={16} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HeroSection