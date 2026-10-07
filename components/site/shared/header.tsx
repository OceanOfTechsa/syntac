"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Headset } from "lucide-react";
import React, { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import AppSettings from "@/utils/AppSettings";
import ThemeSwitcher from "@/components/site/ModeToggle";
import AnimatedLogo from "@/components/gsap/animations/header/animated-logo";
import AnimatedMenuToggle from "@/components/gsap/animations/header/animated-toggle";
import AnimatedMobileMenu from "@/components/gsap/animations/header/animated-mobile-menu";

import { HeaderLinks, LinkType } from "@/utils/Site/Links";
import {DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger} from "@/components/ui/dropdown-menu";
import {EstimateProjectButton} from "@/components/providers/project-estimator-provider";


interface HeaderProps {
    showBanner?: boolean;
    bannerText?: string;
    threshold?: number;
}

const BANNER_STORAGE_KEY = "banner_dismiss";

type BannerDismissData = {
    count: number;       // how many times the user closed it
    expiresAt: number;   // timestamp when it should show again
};

const Header = ({
                    showBanner = true,
                    bannerText = "🚀 New: Syntac UI Kit is now open source — Explore the components",
                    threshold = 24,
                }: HeaderProps) => {
    const pathname = usePathname();

    const [scrolled, setScrolled] = useState(false);
    const [open, setOpen] = useState(false);
    const [bannerVisible, setBannerVisible] = useState(false); // start false, decide after reading storage

    /* -------------------------------------------------------------------------- */
    /* Banner dismiss logic (localStorage)                                        */
    /* -------------------------------------------------------------------------- */

    useEffect(() => {
        if (!showBanner) {
            setBannerVisible(false);
            return;
        }

        try {
            const raw = localStorage.getItem(BANNER_STORAGE_KEY);
            if (!raw) {
                setBannerVisible(true);
                return;
            }

            const data: BannerDismissData = JSON.parse(raw);
            const now = Date.now();

            if (now > data.expiresAt) {
                // expired → show again
                setBannerVisible(true);
            } else {
                setBannerVisible(false);
            }
        } catch {
            setBannerVisible(true);
        }
    }, [showBanner]);

    const handleCloseBanner = () => {
        setBannerVisible(false);

        try {
            const raw = localStorage.getItem(BANNER_STORAGE_KEY);
            let count = 0;

            if (raw) {
                const data: BannerDismissData = JSON.parse(raw);
                count = data.count || 0;
            }

            const nextCount = count + 1;
            let durationMs = 30 * 60 * 1000; // default 30 minutes

            if (nextCount === 2) {
                durationMs = 2 * 60 * 60 * 1000; // 2 hours
            } else if (nextCount >= 3) {
                durationMs = 24 * 60 * 60 * 1000; // 1 day
            }

            const payload: BannerDismissData = {
                count: nextCount,
                expiresAt: Date.now() + durationMs,
            };

            localStorage.setItem(BANNER_STORAGE_KEY, JSON.stringify(payload));
        } catch {
            // silent fail
        }
    };

    /* -------------------------------------------------------------------------- */
    /* Scroll + banner visibility                                                 */
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

        return () => {
            window.removeEventListener("scroll", onScroll);
        };
    }, [threshold]);

    /* -------------------------------------------------------------------------- */
    /* Close mobile menu when route changes                                       */
    /* -------------------------------------------------------------------------- */

    useEffect(() => {
        setOpen(false);
    }, [pathname]);

    /* -------------------------------------------------------------------------- */
    /* Active navigation link                                                     */
    /* -------------------------------------------------------------------------- */

    const isActive = (href: string) =>
        pathname === href || (href !== "/" && pathname?.startsWith(`${href}/`));

    return (
        <>
            {/* ------------------------------------------------------------------ */}
            {/* Announcement Banner                                                */}
            {/* ------------------------------------------------------------------ */}

            {showBanner && (
                <div
                    className={cn(
                        "overflow-hidden bg-primary text-sm",
                        "transition-all duration-500 ease-out",
                        bannerVisible ? "max-h-12 opacity-100" : "max-h-0 opacity-0"
                    )}
                >
                    <div className="mx-auto flex w-full max-w-350 items-center justify-between gap-3.5 px-4 py-2.5 min-[1800px]:max-w-384 sm:px-6 lg:px-8">
                        <div className="flex items-center gap-3.5">
                            <p className="text-primary-foreground line-clamp-2 text-[0.9375rem] font-semibold">
                                {bannerText}
                            </p>
                            <a
                                data-slot="button"
                                data-variant="secondary"
                                data-size="default"
                                className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center justify-center rounded-md font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-secondary text-secondary-foreground hover:bg-secondary/80 px-4 has-[>svg]:px-3 h-7 gap-1.5 px-2! py-1 text-xs"
                                href="/changelog?tab=pro-changelog"
                            >
                                Visit changelog
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
                                    className="lucide lucide-chevron-right"
                                    aria-hidden="true"
                                >
                                    <path d="m9 18 6-6-6-6"></path>
                                </svg>
                            </a>
                        </div>

                        <button
                            onClick={handleCloseBanner}
                            data-slot="button"
                            data-variant="default"
                            data-size="icon"
                            className="focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center justify-center gap-2 rounded-md text-sm font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:bg-primary-foreground/10 size-7 cursor-pointer"
                        >
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
                                className="lucide lucide-x"
                                aria-hidden="true"
                            >
                                <path d="M18 6 6 18"></path>
                                <path d="m6 6 12 12"></path>
                            </svg>
                            <div className="sr-only">Close notification</div>
                        </button>
                    </div>
                </div>
            )}

            {/* ------------------------------------------------------------------ */}
            {/* Header                                                              */}
            {/* ------------------------------------------------------------------ */}

            <header
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
                        <AnimatedLogo scrolled={scrolled} />

                        {/* Desktop Navigation */}
                        <nav className="hidden items-center gap-8 md:flex" aria-label="Main">
                            {HeaderLinks.map((link: LinkType) => {
                                // ───── Simple Link ─────
                                if (!link.children) {
                                    return (
                                        <Link
                                            key={link.label}
                                            href={link.href!}
                                            className={cn(
                                                "relative text-sm transition-colors",
                                                "after:absolute",
                                                "after:left-0",
                                                "after:-bottom-0.5",
                                                "after:h-[2px]",
                                                "after:w-0",
                                                "after:bg-[#0B9944]",
                                                "after:transition-all",
                                                "after:duration-300",
                                                "hover:after:w-full",
                                                "hover:text-neutral-900",
                                                "dark:hover:text-white",

                                                isActive(link.href!)
                                                    ? "text-neutral-900 dark:text-white"
                                                    : "text-neutral-500 dark:text-white/60"
                                            )}
                                        >
                                            {link.label}
                                        </Link>
                                    );
                                }

                                // ───── Dropdown (Resources) ─────
                                return (
                                    <DropdownMenu key={link.label}>
                                        <DropdownMenuTrigger
                                            className={cn(
                                                "group relative flex cursor-pointer items-center gap-1.5 text-sm  outline-none transition-colors",
                                                "after:absolute after:-bottom-1 after:left-0 after:h-[2px] after:w-0",
                                                "after:bg-[#0B9944] after:transition-all after:duration-300",
                                                "hover:after:w-full",
                                                "focus-visible:ring-0",
                                                isActive(link.href!)
                                                    ? "text-neutral-900 dark:text-white font-medium"
                                                    : "text-neutral-500 dark:text-white/60",
                                                "hover:text-neutral-900 dark:hover:text-white"
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
                                                className="size-3.5 opacity-50 transition-transform duration-200 group-data-[state=open]:rotate-180"
                                            >
                                                <path d="m6 9 6 6 6-6" />
                                            </svg>
                                        </DropdownMenuTrigger>

                                        <DropdownMenuContent
                                            align="start"
                                            sideOffset={10}
                                            className={cn(
                                                "w-72 rounded-md p-1.5",
                                            )}
                                        >
                                            {link.children.map((child) => {
                                                const active = isActive(child.href);

                                                return (
                                                    <DropdownMenuItem
                                                        key={child.href}

                                                        className="p-0 focus:bg-transparent"
                                                    >
                                                        <Link
                                                            href={child.href}
                                                            className={cn(
                                                                "group relative flex w-full items-start gap-3 rounded-r-md px-3 py-3",
                                                                "transition-colors duration-200",
                                                                "hover:bg-muted/70",
                                                                active && "bg-muted/60"
                                                            )}
                                                        >
                                                            <span
                                                                className={cn(
                                                                    "absolute left-0 top-1/2 h-11 w-0.5 -translate-y-1/2 rounded-full",
                                                                    "bg-[#0B9944] transition-opacity duration-200",
                                                                    active
                                                                        ? "opacity-100"
                                                                        : "opacity-0 group-hover:opacity-100"
                                                                )}
                                                            />

                                                            <div className="min-w-0 flex-1">
                                                                <div className="flex items-center gap-2">
                                                                    <span
                                                                        className={cn(
                                                                            "text-sm font-medium transition-colors",
                                                                            active
                                                                                ? "text-[#0B9944]"
                                                                                : "text-foreground"
                                                                        )}
                                                                    >
                                                                        {child.label}
                                                                    </span>

                                                                    {/*<span*/}
                                                                    {/*    className={cn(*/}
                                                                    {/*        "size-1 rounded-full bg-[#0B9944]",*/}
                                                                    {/*        "opacity-0 transition-opacity duration-200",*/}
                                                                    {/*        active*/}
                                                                    {/*            ? "opacity-100"*/}
                                                                    {/*            : "group-hover:opacity-100"*/}
                                                                    {/*    )}*/}
                                                                    {/*/>*/}
                                                                </div>

                                                                {/*{child.description && (*/}
                                                                {/*    <span className="mt-1 block text-xs leading-5 text-muted-foreground">*/}
                                                                {/*        {child.description}*/}
                                                                {/*    </span>*/}
                                                                {/*)}*/}
                                                            </div>
                                                        </Link>
                                                    </DropdownMenuItem>
                                                );
                                            })}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                );
                            })}
                        </nav>

                        {/* Right Side */}
                        <div className="col-start-3 flex items-center justify-end gap-2">
                            <ThemeSwitcher />

                            {/*<Link*/}
                            {/*    href="/contact"*/}
                            {/*    className="hover:bg-[#0B9944] dark:hover:bg-[#0B9944] focus-visible:border-ring focus-visible:ring-ring/50 aria-invalid:border-destructive aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 inline-flex shrink-0 items-center justify-center font-medium whitespace-nowrap transition-all outline-none focus-visible:ring-[3px] disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4 bg-primary text-primary-foreground hover:text-white h-7 w-7 p-0 gap-0 sm:h-9 sm:w-auto sm:px-6 sm:gap-2 text-base rounded-full sm:rounded-md sm:max-[400px]:flex-1"*/}
                            {/*>*/}
                            {/*    <span className="hidden sm:inline-flex">Estimate project</span>*/}
                            {/*    <Headset size={16} />*/}
                            {/*</Link>*/}
                          <EstimateProjectButton />

                            <AnimatedMenuToggle
                                open={open}
                                onClick={() => setOpen((previous) => !previous)}
                            />
                        </div>
                    </div>
                </div>
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

                        // Dropdown items (flat on mobile)
                        return (
                            <div key={link.label} className="mt-4">
                                <div className="mb-2 text-sm font-medium text-neutral-400 uppercase tracking-wider">
                                    {link.label}
                                </div>
                                {link.children.map((child) => (
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
