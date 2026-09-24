"use client";

import Link from "next/link";
import { cn } from "@/lib/utils";
import { Headset } from "lucide-react";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";

import ThemeSwitcher from "@/components/site/ModeToggle";
import AnimatedNav from "@/components/gsap/animations/header/animated-nav";
import AnimatedLogo from "@/components/gsap/animations/header/animated-logo";
import AnimatedMenuToggle from "@/components/gsap/animations/header/animated-toggle";
import AnimatedMobileMenu from "@/components/gsap/animations/header/animated-mobile-menu";

import AppSettings from "@/utils/AppSettings/AppSettings";
import { HeaderLinks, LinkType } from "@/utils/Site/Links";

interface HeaderProps {
  showBanner?: boolean;
  bannerText?: string;
  threshold?: number;
}

const Header = ({ showBanner = true, bannerText = "🚀 New: Syntac UI Kit is now open source — Explore the components", threshold = 24,}: HeaderProps) =>
{
      const pathname = usePathname();

      const [scrolled, setScrolled] = useState(false);
      const [open, setOpen] = useState(false);
      const [bannerVisible, setBannerVisible] = useState(showBanner);

      /*
       * --------------------------------------------------------------------------
       * Scroll + banner visibility
       * --------------------------------------------------------------------------
       */

      useEffect(() => {
        const onScroll = () => {
          const y = window.scrollY;

          setScrolled((previous) =>
            y > threshold
              ? true
              : y < threshold / 3
                ? false
                : previous
          );

          setBannerVisible(y < 40 && showBanner);
        };

        onScroll();

        window.addEventListener("scroll", onScroll, {
          passive: true,
        });

        return () => {
          window.removeEventListener("scroll", onScroll);
        };
      }, [threshold, showBanner]);

      /*
       * --------------------------------------------------------------------------
       * Close mobile menu when route changes
       * --------------------------------------------------------------------------
       */

      useEffect(() => {
        setOpen(false);
      }, [pathname]);

      /*
       * --------------------------------------------------------------------------
       * Active navigation link
       * --------------------------------------------------------------------------
       */

    const isActive = (href: string) =>
    pathname === href ||
    (href !== "/" && pathname?.startsWith(`${href}/`));

    return (
        <>
            {/* ------------------------------------------------------------------ */}
            {/* Announcement Banner                                                */}
            {/* ------------------------------------------------------------------ */}

            {showBanner && (
                <div
                    className={cn(
                        "overflow-hidden bg-neutral-900 text-white text-sm",
                        "transition-all duration-500 ease-out",
                        bannerVisible
                            ? "max-h-12 opacity-100"
                            : "max-h-0 opacity-0"
                    )}
                >
                    <div className="mx-auto flex h-7 max-w-7xl items-center justify-center px-4 py-2">
                        <p className="mb-0 text-center font-medium tracking-wide">
                            {bannerText}
                        </p>
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
                        ? " bg-white/80 backdrop-blur-md dark:bg-[#0d0d0d]/80"
                        : "bg-white dark:bg-[#0d0d0d]"
                )}
            >
                <div className="mx-auto flex h-full w-full max-w-350 items-center border-dashed min-[1400px]:border-x min-[1800px]:max-w-384">
                    <div className="flex w-full items-center justify-between gap-2 px-4 max-lg:gap-4 sm:px-6 lg:px-8">
                        {/* -------------------------------------------------------------- */}
                        {/* Logo                                                            */}
                        {/* -------------------------------------------------------------- */}

                        <AnimatedLogo scrolled={scrolled} />

                        {/* -------------------------------------------------------------- */}
                        {/* Desktop Navigation                                             */}
                        {/* -------------------------------------------------------------- */}

                        <AnimatedNav>
                            {HeaderLinks.map((link: LinkType) => (
                                <Link
                                    key={link.href}
                                    href={link.href}
                                    aria-current={
                                        isActive(link.href) ? "page" : undefined
                                    }
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

                                        isActive(link.href)
                                            ? "text-neutral-900 dark:text-white"
                                            : "text-neutral-500 dark:text-white/60"
                                    )}
                                >
                                    {link.label}
                                </Link>
                            ))}
                        </AnimatedNav>

                        {/* -------------------------------------------------------------- */}
                        {/* Right Side                                                     */}
                        {/* -------------------------------------------------------------- */}

                        <div className="col-start-3 flex items-center justify-end gap-2">
                            {/* Theme */}
                            <ThemeSwitcher />

                            {/* Estimate */}
                            <Link
                                href="/contact"
                                className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                bg-neutral-900
                                p-1
                                sm:px-4
                                sm:py-1
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
                                <span className={"hidden sm:inline-flex"}>Estimate project</span>
                                <Headset size={16} />
                            </Link>

                            {/* Mobile menu button */}
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
                {/* Navigation heading */}
                <div className="mb-6 font-kalam text-lg underline underline-offset-4">
                    Navigation menu
                </div>

                {/* Navigation links */}
                <div className="flex flex-col gap-1">
                    {HeaderLinks.map((link: LinkType) => (
                        <Link
                            key={link.href}
                            href={link.href}
                            className={cn(
                                "rounded-md py-3 text-2xl font-medium tracking-tight",

                                isActive(link.href)
                                    ? "text-neutral-900 dark:text-white"
                                    : "text-neutral-500 dark:text-white/60"
                            )}
                            onClick={() => setOpen(false)}
                        >
                            {link.label}
                        </Link>
                    ))}
                </div>

                {/* Bottom section */}
                <div
                    className="
                mt-auto
                border-t
                border-dashed
                border-neutral-200
                pt-6
                dark:border-white/15
              "
                >
                    <div className="grid grid-cols-3 gap-4">
                        {/* Email */}
                        <div className="flex flex-col">
                            <div className="mb-1 font-kalam text-sm">
                                Get in touch
                            </div>

                            <Link
                                href={`mailto:${AppSettings.CompanyContacts.Email}`}
                                className="text-sm font-medium"
                            >
                                {AppSettings.CompanyContacts.Email}
                            </Link>
                        </div>

                        {/* Phone */}
                        <div className="flex flex-col items-end justify-end">
                            <Link
                                href={`tel:${AppSettings.CompanyContacts.Phone}`}
                                className="text-sm font-medium"
                            >
                                {AppSettings.CompanyContacts.Phone}
                            </Link>
                        </div>

                        {/* Theme */}
                        <div className="flex flex-col items-center">
                            <div className="mb-1 font-kalam text-sm">
                                UI Theme
                            </div>

                            <ThemeSwitcher
                                showSwitcherOnMobile
                                height="h-5"
                                width="w-5"
                            />
                        </div>
                    </div>
                </div>
            </AnimatedMobileMenu>
        </>
    );
}

export default Header;