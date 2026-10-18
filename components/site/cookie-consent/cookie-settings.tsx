// components/site/cookie-consent/cookie-settings.tsx
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";
import type { CookieCategory } from "@/lib/cookies/consent";
import { getAcceptedCategories } from "@/lib/cookies/consent";

interface CookieSettingsProps {
    open: boolean;
    onClose: () => void;
    onSave: (categories: CookieCategory[]) => void;
    onAcceptAll: () => void;
    onRejectOptional: () => void;
}

const CATEGORY_META: {
    id: CookieCategory;
    title: string;
    description: string;
    locked?: boolean;
}[] = [
    {
        id: "necessary",
        title: "Necessary",
        description:
            "These cookies are required for the website to function correctly and cannot be disabled.",
        locked: true,
    },
    {
        id: "preferences",
        title: "Preferences",
        description:
            "These cookies remember your choices and preferences, such as theme or language settings.",
    },
    {
        id: "analytics",
        title: "Analytics",
        description:
            "These cookies help us understand how visitors interact with the website so we can improve it.",
    },
    {
        id: "marketing",
        title: "Marketing",
        description:
            "These cookies may be used for advertising, remarketing, and conversion tracking.",
    },
];

const CookieSettings = ({ open, onClose, onSave, onAcceptAll, onRejectOptional }: CookieSettingsProps) => {
    const [selected, setSelected] = useState<Record<CookieCategory, boolean>>({
        necessary: true,
        preferences: false,
        analytics: false,
        marketing: false,
    });

    // Sync with current consent when opening
    useEffect(() => {
        if (!open) return;
        const accepted = getAcceptedCategories();
        setSelected({
            necessary: true,
            preferences: accepted.includes("preferences"),
            analytics: accepted.includes("analytics"),
            marketing: accepted.includes("marketing"),
        });
    }, [open]);

    // Escape key
    useEffect(() => {
        if (!open) return;
        const onKey = (e: KeyboardEvent) => {
            if (e.key === "Escape") onClose();
        };
        window.addEventListener("keydown", onKey);
        return () => window.removeEventListener("keydown", onKey);
    }, [open, onClose]);

    if (!open) return null;

    const toggle = (id: CookieCategory) => {
        if (id === "necessary") return;
        setSelected((prev) => ({ ...prev, [id]: !prev[id] }));
    };

    const handleSave = () => {
        const cats = (Object.keys(selected) as CookieCategory[]).filter(
            (k) => selected[k]
        );
        onSave(cats);
    };

    return (
        <div
            className="fixed inset-0 z-[110] flex items-end justify-center sm:items-center"
            role="dialog"
            aria-modal="true"
            aria-labelledby="cookie-settings-title"
        >
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/40 backdrop-blur-[2px]"
                onClick={onClose}
                aria-hidden="true"
            />

            {/* Panel */}
            <div
                className={cn(
                    "relative z-10 flex max-h-[90vh] w-full max-w-2xl flex-col",
                    "rounded-t-md border border-zinc-200 bg-white shadow-xl sm:rounded-md",
                    "dark:border-zinc-800 dark:bg-zinc-950",
                    "animate-in fade-in-0 zoom-in-95 slide-in-from-bottom-4 duration-200"
                )}
            >
                {/* Header */}
                <div className="flex items-start justify-between gap-4 border-b border-zinc-200 px-5 py-2 dark:border-zinc-800">
                    <div>
                        <h2
                            id="cookie-settings-title"
                            className="text-base font-semibold tracking-tight text-zinc-900 dark:text-zinc-100"
                        >
                            Cookie Settings
                        </h2>
                        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
                            Choose which optional cookies you allow. Necessary cookies are
                            always enabled.
                        </p>
                    </div>
                    <button
                        type="button"
                        onClick={onClose}
                        className="cursor-pointer rounded-md p-1.5 text-zinc-500 transition-colors hover:bg-zinc-100 hover:text-zinc-900 dark:hover:bg-zinc-900 dark:hover:text-white"
                        aria-label="Close cookie settings"
                    >
                        <X className="size-4" />
                    </button>
                </div>

                {/* Categories */}
                <div className="flex-1 overflow-y-auto px-5 py-4">
                    <ul className="space-y-5">
                        {CATEGORY_META.map((cat) => (
                            <li
                                key={cat.id}
                                className="flex items-start justify-between gap-4"
                            >
                                <div className="min-w-0 flex-1">
                                    <div className="flex items-center gap-2">
                                        <span className="text-sm font-medium text-zinc-900 dark:text-zinc-100">
                                          {cat.title}
                                        </span>
                                        {cat.locked && (
                                            <span className="rounded bg-zinc-100 px-1.5 py-0.5 text-[10px] font-medium uppercase tracking-wide text-zinc-500 dark:bg-zinc-800 dark:text-zinc-400">
                                                Always active
                                              </span>
                                        )}
                                    </div>
                                    <p className="mt-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                                        {cat.description}
                                    </p>
                                </div>

                                <Switch
                                    checked={selected[cat.id]}
                                    onCheckedChange={() => toggle(cat.id)}
                                    disabled={cat.locked}
                                    aria-label={`Toggle ${cat.title} cookies`}
                                    className="cursor-pointer mt-0.5 shrink-0 data-[state=checked]:bg-[#0B9944]"
                                />
                            </li>
                        ))}
                    </ul>

                    <p className="mt-6 text-xs text-zinc-500 dark:text-zinc-500">
                        For more details, see our{" "}
                        <Link
                            href="/cookie-policy"
                            className="underline underline-offset-4 hover:text-zinc-900 dark:hover:text-white"
                            onClick={onClose}
                        >
                            Cookie Policy
                        </Link>
                        .
                    </p>
                </div>

                {/* Footer actions */}
                <div className="flex flex-col gap-2 border-t border-zinc-200 px-5 py-2 dark:border-zinc-800 sm:flex-row sm:justify-end">
                    <button
                        type="button"
                        onClick={onRejectOptional}
                        className={cn(
                            "cursor-pointer inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium",
                            "border border-zinc-300 text-zinc-700 transition-colors hover:bg-zinc-50",
                            "dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                        )}
                    >
                        Reject Optional
                    </button>
                    <button
                        type="button"
                        onClick={onAcceptAll}
                        className={cn(
                            "cursor-pointer inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium",
                            "border border-zinc-300 text-zinc-700 transition-colors hover:bg-zinc-50",
                            "dark:border-zinc-700 dark:text-zinc-300 dark:hover:bg-zinc-900"
                        )}
                    >
                        Accept All
                    </button>
                    <button
                        type="button"
                        onClick={handleSave}
                        className={cn(
                            "cursor-pointer inline-flex h-9 items-center justify-center rounded-md px-4 text-sm font-medium",
                            "bg-[#0B9944] text-white transition-colors hover:bg-[#0a853b]"
                        )}
                    >
                        Save preferences
                    </button>
                </div>
            </div>
        </div>
    );
}

export default CookieSettings;