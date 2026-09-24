"use client";

import { useRef } from "react";
import { cn } from "@/lib/utils";
import { Avatar, AvatarGroup, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { useAvatarReveal } from "@/lib/gsap/hooks/use-avatar-reveal";
import { IAvatarData } from "@/components/site/shared/avatar-group";

interface AvatarsGroupClientProps {
    className?: string;
    avatars: IAvatarData[];
    skeletonCount?: number;
}

export const AvatarsGroupClient = ({ className, avatars, skeletonCount = 0 }: AvatarsGroupClientProps) => {
    const containerRef = useRef<HTMLDivElement>(null);

    useAvatarReveal(
        containerRef,
        {
            stagger: 0.12,
            duration: 1.1,
            y: 6,
            blur: 6,
            scale: 0.94,
            scrollTrigger: false,
        },
        [avatars.length]
    );

    return (
        <AvatarGroup
            ref={containerRef}
            className="
        **:data-[slot=avatar]:ring-background
        **:data-[slot=avatar]:ring-2
      "
        >
            {avatars.map((avatar, index) => (
                <Tooltip key={avatar.name || index}>
                    <TooltipTrigger>
                        <Avatar
                            className={cn(
                                "transition-all duration-300 ease-in-out",
                                "hover:z-1 hover:-translate-y-1 hover:shadow-md",
                                className
                            )}
                        >
                            <AvatarImage src={avatar.src} alt={avatar.name} />
                            <AvatarFallback>{avatar.fallback}</AvatarFallback>
                        </Avatar>
                    </TooltipTrigger>

                    <TooltipContent>{avatar.name}</TooltipContent>
                </Tooltip>
            ))}

            {Array.from({ length: skeletonCount }).map((_, i) => (
                <Avatar
                    key={`skeleton-${i}`}
                    data-slot="avatar"
                    className={cn(
                        "animate-pulse bg-muted",
                        className
                    )}
                />
            ))}
        </AvatarGroup>
    );
};