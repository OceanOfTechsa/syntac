"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";

interface CookieBannerProps {
    open: boolean;
    onAcceptAll: () => void;
    onRejectOptional: () => void;
    onOpenSettings: () => void;
}

const CookieBanner = ({ open, onAcceptAll, onRejectOptional, onOpenSettings }: CookieBannerProps)=> {
    if (!open) return null;

    return (
        <div
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-banner-title"
            aria-describedby="cookie-banner-desc"
            className={cn(
                "fixed inset-x-0 bottom-0 z-[100] backdrop-blur-md",
                "border-t border-dashed  bg-white dark:bg-[#0d0d0d]",
                "animate-in slide-in-from-bottom-4 fade-in duration-300"
            )}
        >
            <div className="mx-auto flex w-full max-w-350 flex-col gap-4 px-4 py-2 sm:px-6 lg:flex-row lg:items-center lg:justify-between lg:gap-8 lg:px-8 min-[1800px]:max-w-384">
                <div className={'flex gap-2 items-start'}>
                    <img src={'/assets/cookies.svg'} alt="cookis" className={'object-cover rounded-full h-8 w-8 dark:hidden'}/>
                    <img src={'/assets/cookies-dark.svg'} alt="cookis" className={'object-cover rounded-full h-8 w-8 hidden dark:block'}/>
                    {/* Text */}
                    <div className="min-w-0 flex-1">
                        <h2 id="cookie-banner-title" className="font-semibold tracking-tight">
                            We use cookies
                        </h2>
                        <p id="cookie-banner-desc" className="text-sm leading-relaxed text-neutral-500 dark:text-white/40">
                            We use cookies to improve your experience, understand how our
                            website is used, and support essential functionality.{" "}
                            <Link href="/cookie-policy" className="underline underline-offset-4 transition-colors hover:text-zinc-900 dark:hover:text-white">
                                Cookie Policy
                            </Link>
                        </p>
                    </div>
                </div>

                {/* Actions */}
                <div className="flex shrink-0 flex-col gap-2 sm:flex-row sm:items-center">
                    <button
                        type="button"
                        onClick={onOpenSettings}
                        className={cn(
                            "cursor-pointer inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium",
                            "border border-zinc-300 bg-transparent text-zinc-700",
                            "transition-colors hover:bg-zinc-50",
                            "dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B9944]/40"
                        )}
                    >
                        Cookie Settings
                    </button>

                    <button
                        type="button"
                        onClick={onRejectOptional}
                        className={cn(
                            "cursor-pointer inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium",
                            "border border-zinc-300 bg-transparent text-zinc-700",
                            "transition-colors hover:bg-zinc-50",
                            "dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B9944]/40"
                        )}
                    >
                        Reject Optional
                    </button>

                    <button
                        type="button"
                        onClick={onAcceptAll}
                        className={cn(
                            "cursor-pointer inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium",
                            "bg-[#0B9944] text-white",
                            "transition-colors hover:bg-[#0a853b]",
                            "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#0B9944]/40 focus-visible:ring-offset-2"
                        )}
                    >
                        Accept All
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CookieBanner;
