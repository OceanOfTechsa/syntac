"use client";

import { useEffect, useState } from "react";
import { ChevronRight, X } from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import Link from "next/link";

type DismissData = {
    count: number; // how many times the user closed it
    expiresAt: number; // timestamp when it should show again
};

interface AnnouncementBannerProps {
    text?: string;
    linkLabel?: string;
    linkHref?: string;
    storageKey?: string;
    className?: string;
}

const MINUTE = 60 * 1000;
const HOUR = 60 * MINUTE;

/** 1st dismiss: 30 min, 2nd: 2 hours, 3rd and later: 1 day. */
const getSnoozeDuration = (count: number) => {
    if (count <= 1) return 30 * MINUTE;
    if (count === 2) return 2 * HOUR;
    return 24 * HOUR;
};

export const AnnouncementBanner = ({text = "🚀 New: Syntac UI Kit is now open source — Explore the components",
                                       linkLabel = "Visit changelog",
                                       linkHref = "/changelog?tab=pro-changelog",
                                       storageKey = "banner_dismiss",
                                       className,
                                   }: AnnouncementBannerProps) => {
    // Start hidden, decide after reading storage (avoids SSR mismatch)
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        try {
            const raw = localStorage.getItem(storageKey);
            if (!raw) {
                setVisible(true);
                return;
            }
            const data: DismissData = JSON.parse(raw);
            setVisible(Date.now() > data.expiresAt);
        } catch {
            setVisible(true);
        }
    }, [storageKey]);

    const handleClose = () => {
        setVisible(false);

        try {
            const raw = localStorage.getItem(storageKey);
            const previous: DismissData | null = raw ? JSON.parse(raw) : null;
            const count = (previous?.count ?? 0) + 1;

            const payload: DismissData = {
                count,
                expiresAt: Date.now() + getSnoozeDuration(count),
            };
            localStorage.setItem(storageKey, JSON.stringify(payload));
        } catch {
            // storage unavailable: banner simply returns on next load
        }
    };

    return (
        <div
            aria-hidden={!visible}
            className={cn(
                "overflow-hidden bg-primary text-sm transition-all duration-500 ease-out",
                visible ? "visible max-h-12 opacity-100" : "invisible max-h-0 opacity-0",
                className
            )}
        >
            <div className="mx-auto flex w-full max-w-350 items-center justify-between gap-3.5 px-4 py-2.5 min-[1800px]:max-w-384 sm:px-6 lg:px-8">
                <div className="flex items-center gap-3.5">
                    <p className="text-primary-foreground line-clamp-2 text-[0.9375rem] font-semibold">
                        {text}
                    </p>

                    <Link href={linkHref} className={'group flex items-center bg-secondary text-secondary-foreground hover:bg-[color-mix(in_oklch,var(--secondary),var(--foreground)_5%)] aria-expanded:bg-secondary aria-expanded:text-secondary-foreground h-7 shrink-0 gap-1 px-2 py-1 text-xs rounded-sm'}>
                        {linkLabel}
                        <ChevronRight aria-hidden="true" size={18} className={'group-hover:translate-x-1 duration-500 ease-in-out'}/>
                    </Link>
                </div>

                <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    onClick={handleClose}
                    className="size-7 cursor-pointer text-primary-foreground hover:bg-primary-foreground/10 hover:text-primary-foreground rounded-full"
                >
                    <X aria-hidden="true" />
                    <span className="sr-only">Close notification</span>
                </Button>
            </div>
        </div>
    );
};

export default AnnouncementBanner;