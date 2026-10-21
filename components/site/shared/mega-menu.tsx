"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";

import { cn } from "@/lib/utils";
import {groupChildren, LinkChild, LinkGroup, LinkType} from "@/utils/Site/Links";

export const MEGA_MENU_ID = "mega-menu-panel";

interface MegaMenuProps {
    links: LinkType[];
    /** Label of the open dropdown, or null when closed. */
    activeLabel: string | null;
    isActive: (href: string) => boolean;
    onNavigate: () => void;
}

export const MegaMenu = ({ links, activeLabel, isActive, onNavigate }: MegaMenuProps) => {
    const open: boolean = activeLabel !== null;

    // Keep the last menu mounted while it slides up, so content doesn't vanish mid-animation.
    const [shownLabel, setShownLabel] = useState<string | null>(activeLabel);
    useEffect((): void => {
        if (activeLabel) setShownLabel(activeLabel);
    }, [activeLabel]);

    const menu:  LinkType | undefined = useMemo(
        (): LinkType | undefined => links.find((link: LinkType): false | LinkChild[] | undefined => link.label === shownLabel && link.children),
        [links, shownLabel]
    );

    const groups: LinkGroup[] = useMemo((): LinkGroup[] => (menu?.children ? groupChildren(menu.children) : []), [menu?.children]);
    const hasGroupTitles: boolean = groups.some((group: LinkGroup): string => group.title);

    return (
        <div
            id={MEGA_MENU_ID}
            role="region"
            aria-label={shownLabel ?? "Menu"}
            className={cn(
                "absolute inset-x-0 top-full z-10 grid max-md:hidden",
                "transition-[grid-template-rows,opacity,visibility,box-shadow] duration-200 ease-out",
                open
                    ? "visible grid-rows-[1fr] opacity-100"
                    : "invisible grid-rows-[0fr] opacity-0 shadow-none"
            )}
        >
            <div className="min-h-0 overflow-hidden">
                <div className="border-b bg-background">
                    <div className="mx-auto w-full max-w-350 border-dashed min-[1400px]:border-x min-[1800px]:max-w-384">
                        {/* key re-triggers the fade when switching between dropdowns */}
                        <div
                            key={shownLabel}
                            className="animate-in fade-in-0 duration-200 px-4 py-8 sm:px-6 lg:px-8"
                        >
                            {hasGroupTitles ? (
                                <div
                                    className="grid gap-x-10 gap-y-4"
                                    style={{
                                        gridTemplateColumns: `repeat(${Math.min(groups.length, 4)}, minmax(0, 1fr))`,
                                    }}
                                >
                                    {groups.map((group) => (
                                        <div key={group.title || "default"}>
                                            {group.title && (
                                                <div className=" pb-2 font-kalam text-sm text-muted-foreground">
                                                    {group.title}
                                                </div>
                                            )}
                                            <ul className="flex flex-col gap-1">
                                                {group.items.map((item) => (
                                                    <MenuItem
                                                        key={item.href}
                                                        {...item}
                                                        active={isActive(item.href)}
                                                        onNavigate={onNavigate}
                                                    />
                                                ))}
                                            </ul>
                                        </div>
                                    ))}
                                </div>
                            ) : (
                                // No groups defined: flow all items into up to three columns
                                <ul
                                    className="grid gap-x-10 gap-y-1"
                                    style={{
                                        gridTemplateColumns: `repeat(${Math.min(menu?.children?.length ?? 1, 3)}, minmax(0, 1fr))`,
                                    }}
                                >
                                    {menu?.children?.map((item) => (
                                        <MenuItem
                                            key={item.href}
                                            {...item}
                                            active={isActive(item.href)}
                                            onNavigate={onNavigate}
                                        />
                                    ))}
                                </ul>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

interface MenuItemProps {
    label: string;
    href: string;
    active: boolean;
    onNavigate: () => void;
}

const MenuItem = ({ label, href, active, onNavigate }: MenuItemProps) => (
    <li>
        <Link
            href={href}
            aria-label={label}
            onClick={onNavigate}
            className={cn(
                "block w-fit py-1.5 text-lg font-medium tracking-tight transition-colors duration-200",
                "hover:underline-offset-4 hover:underline",
                active && "underline-offset-4 underline"
            )}
        >
            {label}
        </Link>
    </li>
);

export default MegaMenu;