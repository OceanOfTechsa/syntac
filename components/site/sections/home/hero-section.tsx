'use client'

import { useEffect, useState } from "react";
import { Headset, MoveRight } from "lucide-react";
import Link from "next/link";

import AppSettings from "@/utils/AppSettings";
import AvatarGroup from "@/components/site/shared/avatar-group"
import FlipWords from "@/components/gsap/animations/shared/flip-words";
import TrustedByLogos from "@/components/gsap/animations/shared/trusted-by-logos";
import {TESTIMONIALS, ITestimonial} from "@/data/reviews";

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
        <section className="relative space-y-8 py-8 sm:space-y-16 sm:py-16 lg:py-24 bg-dotted-background" id={'hero'}>
            <div className="mx-auto flex max-w-7xl flex-col items-center gap-7 px-4 text-center sm:px-6 lg:px-8">
                <div className="z-10 flex items-center gap-3">
                    <AvatarGroup className="size-9.5" avatars={avatars} limit={5}/>
                    <p className="mb-0 text-left text-sm text-nowrap text-muted-foreground">
                        Trusted by <span className="font-semibold">16+</span>
                        <br/>
                        Companies &amp; Teams
                    </p>
                </div>
                <h1 className="z-10 max-w-5xl text-3xl font-bold sm:text-4xl lg:text-5xl lg:leading-[1.29167]">
                    Custom Software Development Solutions Tailored to Your{" "}    <br className="block sm:hidden" />
                    <span className={'relative inline-block font-extrabold'}>
                        <FlipWords
                            words={["Business", "Vision", "Growth", "Goals", "Future"]}
                            duration={3000}
                            className="text-5xl font-bold"
                        />
                    </span>
                </h1>
                <p className="text-muted-foreground z-10 max-w-212 text-lg">
                    At {AppSettings.COMPANY_NAME}, we turn ideas and business
                    challenges into powerful digital solutions that help you work smarter, grow faster, and scale with
                    confidence.
                </p>

                <div className="z-10 flex items-center gap-6">
                    <span className="text-muted-foreground font-medium w-44">
                        Trusted by
                    </span>

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
                              hover:bg-[#0B9944] dark:hover:bg-[#0B9944]
                              focus-visible:border-ring focus-visible:ring-ring/50
                              aria-invalid:border-destructive aria-invalid:ring-destructive/20
                              dark:aria-invalid:ring-destructive/40

                              inline-flex shrink-0 items-center justify-center
                              font-medium whitespace-nowrap
                              transition-all outline-none
                              focus-visible:ring-[3px]
                              disabled:pointer-events-none disabled:opacity-50

                              [&_svg]:pointer-events-none
                              [&_svg]:shrink-0
                              [&_svg:not([class*='size-'])]:size-4

                              bg-primary text-primary-foreground
                              hover:text-white

                             h-10 w-auto px-6 gap-2

                              text-base rounded-md
                              sm:max-[400px]:flex-1
                       "
                    >
                        Estimate project
                        <Headset size={16}  />
                    </Link>

                    <Link href={'#show-case'} className={"focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center justify-center gap-2 font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 h-10 px-6 has-[>svg]:px-4 rounded-lg px-6! text-base shadow-sm max-[400px]:flex-1"}>
                        Learn more
                        <MoveRight  size={16} />
                    </Link>
                </div>
            </div>
        </section>
    )
}

export default HeroSection