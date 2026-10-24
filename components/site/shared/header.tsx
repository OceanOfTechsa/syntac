"use client";

import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useRef, useState } from "react";

import AppSettings from "@/utils/AppSettings";
import ThemeSwitcher from "@/components/site/ModeToggle";
import { groupChildren, HeaderLinks, LinkType } from "@/utils/Site/Links";
import { MegaMenu, MEGA_MENU_ID } from "@/components/site/shared/mega-menu";
import { AnnouncementBanner } from "@/components/site/shared/announcement-banner";
import AnimatedMenuToggle from "@/components/gsap/animations/header/animated-toggle";
import AnimatedMobileMenu from "@/components/gsap/animations/header/animated-mobile-menu";
import { EstimateProjectButton } from "@/components/providers/project-estimator-provider";

interface HeaderProps {
    showAnnouncementBanner?: boolean;
    bannerText?: string;
    bannerUrl?: string;
    bannerButtonText?: string;
    threshold?: number;
}

const Header = ({
                    showAnnouncementBanner = false,
                    bannerText,
                    bannerUrl,
                    bannerButtonText,
                    threshold = 24,
                }: HeaderProps) => {
    const pathname = usePathname();

    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false); // mobile menu
    const [activeMenu, setActiveMenu] = useState<string | null>(null); // desktop mega menu

    /* -------------------------------------------------------------------------- */
    /* Mega menu open / close                                                     */
    /* -------------------------------------------------------------------------- */

    const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

    const cancelClose = useCallback(() => {
        if (closeTimer.current) {
            clearTimeout(closeTimer.current);
            closeTimer.current = null;
        }
    }, []);

    const openMenu = useCallback(
        (label: string) => {
            cancelClose();
            setActiveMenu(label);
        },
        [cancelClose]
    );

    const closeMenu = useCallback(() => {
        cancelClose();
        setActiveMenu(null);
    }, [cancelClose]);

    // Small delay so the pointer can cross between trigger and panel without flicker
    const scheduleClose = useCallback(() => {
        cancelClose();
        closeTimer.current = setTimeout(() => setActiveMenu(null), 120);
    }, [cancelClose]);

    useEffect(() => cancelClose, [cancelClose]);

    useEffect(() => {
        if (!activeMenu) return;

        const onKeyDown = (event: KeyboardEvent) => {
            if (event.key === "Escape") setActiveMenu(null);
        };

        window.addEventListener("keydown", onKeyDown);
        return () => window.removeEventListener("keydown", onKeyDown);
    }, [activeMenu]);

    /* -------------------------------------------------------------------------- */
    /* Scroll state                                                               */
    /* -------------------------------------------------------------------------- */

    useEffect(() => {
        const onScroll = () => {
            const y = window.scrollY;

            setScrolled((previous) =>
                y > threshold ? true : y < threshold / 3 ? false : previous
            );
        };

        onScroll();

        window.addEventListener("scroll", onScroll, { passive: true });
        return () => window.removeEventListener("scroll", onScroll);
    }, [threshold]);

    /* -------------------------------------------------------------------------- */
    /* Close menus when route changes                                             */
    /* -------------------------------------------------------------------------- */

    useEffect(() => {
        setOpen(false);
        setActiveMenu(null);
    }, [pathname]);

    /* -------------------------------------------------------------------------- */
    /* Active navigation link                                                     */
    /* -------------------------------------------------------------------------- */

    const isActive = (href: string) =>
        pathname === href || (href !== "/" && pathname?.startsWith(`${href}/`));

    return (
        <>
            {showAnnouncementBanner && (
                <AnnouncementBanner
                    text={bannerText}
                    linkHref={bannerUrl}
                    linkLabel={bannerButtonText}
                    storageKey={`banner_dismiss:${bannerText ?? "default"}`}
                />
            )}

            <header
                onMouseEnter={cancelClose}
                onMouseLeave={scheduleClose}
                className={cn(
                    "sticky top-0 z-(--header-z-index) flex min-h-(--header-height) w-full shrink-0 items-center justify-center border-b border-dashed backdrop-blur-sm bg-background/60",
                    scrolled
                        ? "bg-white/80 backdrop-blur-md dark:bg-[#0d0d0d]/80"
                        : "bg-white dark:bg-[#0d0d0d]"
                )}
            >
                <div className="mx-auto flex min-h-(--header-height) h-full w-full max-w-350 items-center border-dashed min-[1400px]:border-x min-[1800px]:max-w-384">
                    <div className="flex w-full items-center justify-between gap-2 px-4 max-lg:gap-4 sm:px-6 lg:px-8">
                        {/* Logo */}
                        <Link href="/" aria-label="Syntac home" className="relative inline-flex h-10 items-center">
                            <div className="relative z-10 h-9 w-9 shrink-0 will-change-transform">
                                <Image
                                    src="/brand/syntac-brand-kit/logos/icon/png/syntac-icon-transparent.png"
                                    alt="syntac brand logo"
                                    fill
                                    sizes="36px"
                                    className="object-contain"
                                    priority
                                />
                            </div>

                            <span
                                className="absolute top-1/2 z-20 mt-1 -translate-y-1/2 rounded-full bg-[#FFC400] will-change-transform"
                                style={{ width: "1.4em", height: "1.4em", opacity: 0 }}
                            />

                            <div className="absolute left-0 flex items-baseline opacity-0 will-change-transform">
                                <span className="font-brand text-[22px] tracking-[-0.03em] text-neutral-900 dark:text-white">
                                    {AppSettings.COMPANY_NAME}
                                </span>
                            </div>
                        </Link>

                        {/* Desktop Navigation */}
                        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
                            {HeaderLinks.map((link: LinkType) => {
                                const underline = cn(
                                    "relative text-sm transition-colors",
                                    "after:absolute after:-bottom-0.5 after:left-0 after:h-[2px] after:w-0",
                                    "after:bg-[#0B9944] after:transition-all after:duration-300",
                                    "hover:after:w-full hover:text-neutral-900 dark:hover:text-white"
                                );

                                // ───── Simple Link ─────
                                if (!link.children) {
                                    return (
                                        <Link
                                            key={link.label}
                                            href={link.href!}
                                            aria-label={link.label}
                                            onMouseEnter={closeMenu}
                                            className={cn(
                                                underline,
                                                isActive(link.href!)
                                                    ? "text-neutral-900 dark:text-white"
                                                    : "text-neutral-500 dark:text-white/60"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                }

                                // ───── Mega menu trigger ─────
                                const isOpen = activeMenu === link.label;
                                const sectionActive = link.children.some((child) => isActive(child.href));

                                return (
                                    <button
                                        key={link.label}
                                        type="button"
                                        aria-haspopup="true"
                                        aria-expanded={isOpen}
                                        aria-controls={MEGA_MENU_ID}
                                        // hover only for real mice, so a tap on touch screens doesn't open then instantly toggle shut
                                        onPointerEnter={(event) => {
                                            if (event.pointerType === "mouse") openMenu(link.label);
                                        }}
                                        onClick={() => (isOpen ? closeMenu() : openMenu(link.label))}
                                        onKeyDown={(event) => {
                                            if (event.key === "ArrowDown") {
                                                event.preventDefault();
                                                openMenu(link.label);
                                                requestAnimationFrame(() =>
                                                    document
                                                        .querySelector<HTMLElement>(`#${MEGA_MENU_ID} a`)
                                                        ?.focus()
                                                );
                                            }
                                        }}
                                        className={cn(
                                            underline,
                                            "group flex cursor-pointer items-center gap-1.5 outline-none focus-visible:ring-0",
                                            isOpen && "after:w-full",
                                            isOpen || sectionActive
                                                ? "text-neutral-900 dark:text-white"
                                                : "text-neutral-500 dark:text-white/60"
                                        )}
                                    >
                                        <span>{link.label}</span>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="24"
                                            height="24"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            aria-hidden="true"
                                            className={cn(
                                                "size-3.5 opacity-50 transition-transform duration-200",
                                                isOpen && "rotate-180"
                                            )}
                                        >
                                            <path d="m6 9 6 6 6-6" />
                                        </svg>
                                    </button>
                                );
                            })}
                        </nav>

                        {/* Right Side */}
                        <div className="col-start-3 flex items-center justify-end gap-2">
                            <ThemeSwitcher />
                            <EstimateProjectButton />

                            <AnimatedMenuToggle
                                open={open}
                                onClick={() => setOpen((previous) => !previous)}
                            />
                        </div>
                    </div>
                </div>

                {/* Full-width dropdown, anchored to the bottom edge of the header */}
                <MegaMenu
                    links={HeaderLinks}
                    activeLabel={activeMenu}
                    isActive={isActive}
                    onNavigate={closeMenu}
                />
            </header>

            {/* ------------------------------------------------------------------ */}
            {/* Mobile Navigation                                                  */}
            {/* ------------------------------------------------------------------ */}

            <AnimatedMobileMenu open={open}>
                <div className="mb-6 font-kalam text-lg underline underline-offset-4">
                    Navigation menu
                </div>

                <div className="flex flex-col gap-1">
                    {HeaderLinks.map((link: LinkType) => {
                        if (!link.children) {
                            return (
                                <Link
                                    key={link.label}
                                    href={link.href!}
                                    className={cn(
                                        "rounded-md py-3 text-2xl font-medium tracking-tight",
                                        isActive(link.href!)
                                            ? "text-neutral-900 dark:text-white"
                                            : "text-neutral-500 dark:text-white/60"
                                    )}
                                    onClick={() => setOpen(false)}
                                >
                                    {link.label}
                                </Link>
                            );
                        }

                        // Dropdown items (flat on mobile, with group titles)
                        return (
                            <div key={link.label} className="mt-4">
                                <div className="mb-2 text-sm font-medium text-neutral-400 uppercase tracking-wider">
                                    {link.label}
                                </div>

                                {groupChildren(link.children).map((group) => (
                                    <div key={group.title || "default"} className="mb-2">
                                        {group.title && (
                                            <div className="mb-1 font-kalam text-sm text-neutral-400">
                                                {group.title}
                                            </div>
                                        )}
                                        {group.items.map((child) => (
                                            <Link
                                                key={child.href}
                                                href={child.href}
                                                className={cn(
                                                    "block rounded-md py-2.5 text-xl font-medium tracking-tight",
                                                    isActive(child.href)
                                                        ? "text-neutral-900 dark:text-white"
                                                        : "text-neutral-500 dark:text-white/60"
                                                )}
                                                onClick={() => setOpen(false)}
                                            >
                                                {child.label}
                                            </Link>
                                        ))}
                                    </div>
                                ))}
                            </div>
                        );
                    })}
                </div>

                {/* Bottom section */}
                <div className="mt-auto border-t border-dashed border-neutral-200 pt-6 dark:border-white/15">
                    <div className="grid grid-cols-3 gap-4">
                        <div className="flex flex-col">
                            <div className="mb-1 font-kalam text-sm">Get in touch</div>
                            <Link
                                href={`mailto:${AppSettings.CompanyContacts.Email}`}
                                className="text-sm font-medium"
                            >
                                {AppSettings.CompanyContacts.Email}
                            </Link>
                        </div>

                        <div className="flex flex-col items-end justify-end">
                            <Link
                                href={`tel:${AppSettings.CompanyContacts.Phone}`}
                                className="text-sm font-medium"
                            >
                                {AppSettings.CompanyContacts.Phone}
                            </Link>
                        </div>

                        <div className="flex flex-col items-center">
                            <div className="mb-1 font-kalam text-sm">UI Theme</div>
                            <ThemeSwitcher showSwitcherOnMobile height="h-5" width="w-5" />
                        </div>
                    </div>
                </div>
            </AnimatedMobileMenu>
        </>
    );
};

export default Header;