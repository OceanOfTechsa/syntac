import React from 'react'
import Link from "next/link";
import Image from "next/image";
import {ArrowLeft, BadgeCheck, LucideIcon, SquareArrowOutUpRight} from "lucide-react";

import {cn} from "@/lib/utils";
import {Badge} from "@/components/ui/badge";
import {caseImagePath, imageKitLoader} from "@/lib/imagekit";
import {Avatar, AvatarFallback, AvatarImage} from "@/components/ui/avatar";
import {CaseStudy, STATUS_ICONS, STATUS_STYLES, TYPE_ICONS, TYPE_STYLES} from "@/utils/Site/case-studies";


// Hero images are uploaded larger than the card covers (see hero-light / hero-dark in ImageKit)
const HERO_WIDTH = 1600;
const HERO_HEIGHT = 840;

const HeroSection = ({study}: {study: CaseStudy}) => {
    const TypeIcon: LucideIcon = TYPE_ICONS[study.type];
    const StatusIcon: LucideIcon = STATUS_ICONS[study.status];
    const title: string = study.title ?? study.clientName;

    return (
        <section
            id={'hero'}
            className={cn('w-full  bg-dot-grid-less-opacity')}
        >
            <div className={'my-8 sm:my-16 py-10 sm:py-14 mx-auto grid w-full max-w-7xl items-center gap-8 px-4 sm:px-6 lg:grid-cols-2 lg:gap-12 lg:px-8'}>
                {/* Details */}
                <div className={'flex flex-col items-start gap-6'}>
                    <Link
                        href={'/cases#solutions'}
                        className={'text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors'}
                    >
                        <ArrowLeft className={'size-4'} />
                        All case studies
                    </Link>

                    <div className={'flex items-center gap-3'}>
                        <Avatar size="lg">
                            {study.clientAvatar && <AvatarImage src={study.clientAvatar} alt={study.clientName} />}
                            <AvatarFallback>{study.clientInitials}</AvatarFallback>
                        </Avatar>
                        <span className={'text-muted-foreground text-sm font-medium'}>
                            {study.clientName}
                        </span>
                    </div>

                    <div className={'flex flex-col gap-3'}>
                        <h1 className={'text-4xl font-semibold tracking-tight sm:text-5xl'}>
                            {title}
                        </h1>
                        <p className={'text-muted-foreground max-w-xl text-base'}>
                            {study.summary}
                        </p>
                    </div>

                    <div className={'flex flex-wrap items-center gap-3'}>
                        <Badge variant="secondary" className={TYPE_STYLES[study.type]}>
                            <TypeIcon data-icon="inline-start" />
                            {study.type}
                        </Badge>
                        <Badge variant="secondary" className={STATUS_STYLES[study.status]}>
                            <StatusIcon data-icon="inline-start" />
                            {study.status}
                        </Badge>
                        {study.featured && (
                            <Badge variant="secondary" className={'bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300'}>
                                <BadgeCheck data-icon="inline-start" />
                                Featured
                            </Badge>
                        )}
                        {study.status === "Active" && (
                            <Link href={'/cases#solutions'} className={'text-muted-foreground hover:text-foreground inline-flex items-center gap-2 text-sm transition-colors'}>
                                View Project
                                <SquareArrowOutUpRight className={'size-4'} />
                            </Link>
                        )}
                    </div>
                </div>

                {/* Image: the reserved aspect ratio keeps the space while it loads */}
                <div className={'bg-muted relative w-full overflow-hidden rounded-sm border border-dashed border-border'}  style={{aspectRatio: `${HERO_WIDTH} / ${HERO_HEIGHT}`}}>
                    <Image
                        loader={imageKitLoader}
                        src={caseImagePath(study.clientSlug, study.slug, "light")}
                        width={HERO_WIDTH}
                        height={HERO_HEIGHT}
                        sizes={'(min-width: 1024px) 560px, 100vw'}
                        alt={`${title} preview`}
                        quality={100}
                        priority
                        className={'h-full w-full object-cover dark:hidden'}
                    />
                    <Image
                        loader={imageKitLoader}
                        src={caseImagePath(study.clientSlug, study.slug, "dark")}
                        width={HERO_WIDTH}
                        height={HERO_HEIGHT}
                        sizes={'(min-width: 1024px) 560px, 100vw'}
                        alt={`${title} preview`}
                        quality={100}
                        priority
                        className={'hidden h-full w-full object-cover dark:block'}
                    />
                </div>
            </div>
        </section>
    )
}
export default HeroSection