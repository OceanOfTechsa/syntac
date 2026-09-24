"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import {cn} from "@/lib/utils";
import AppSettings from "@/utils/AppSettings/AppSettings";

interface AnimatedMobileMenuProps {
    open: boolean;
    children: React.ReactNode;
}

export default function AnimatedMobileMenu({
                                               open,
                                               children,
                                           }: AnimatedMobileMenuProps) {
    const navRef = useRef<HTMLElement>(null);
    const linksRef = useRef<HTMLDivElement>(null);

    useLayoutEffect(() => {
        const nav = navRef.current;
        const linksContainer = linksRef.current;

        if (!nav || !linksContainer) return;

        const links = Array.from(
            linksContainer.querySelectorAll(
                "a, .font-kalam, .border-t"
            )
        );

        if (open) {
            gsap.set(nav, {
                display: "flex",
            });

            gsap.fromTo(
                nav,
                {
                    autoAlpha: 0,
                },
                {
                    autoAlpha: 1,
                    duration: 0.35,
                    ease: "power2.out",
                }
            );

            gsap.fromTo(
                links,
                {
                    y: 24,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.45,
                    stagger: 0.06,
                    ease: "power3.out",
                    delay: 0.1,
                }
            );

            document.body.style.overflow = "hidden";
        } else {
            const timeline = gsap.timeline({
                onComplete: () => {
                    gsap.set(nav, {
                        display: "none",
                    });
                },
            });

            timeline
                .to(links, {
                    y: 16,
                    opacity: 0,
                    duration: 0.25,
                    stagger: 0.04,
                    ease: "power2.in",
                })
                .to(
                    nav,
                    {
                        autoAlpha: 0,
                        duration: 0.3,
                        ease: "power2.in",
                    },
                    "-=0.1"
                );

            document.body.style.overflow = "";

            return () => {
                timeline.kill();
            };
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [open]);

    return (
        <nav
            ref={navRef}
            aria-label="Mobile"
            className={cn("fixed inset-0 z-[60] hidden flex-col border-t border-dashed bg-white dark:bg-[#0d0d0d] md:hidden",
                AppSettings.SHOW_BANNER ? "mt-[85px]" : " mt-14"
            )}
            style={{ opacity: 0 }}
        >
            <div
                ref={linksRef}
                className="flex flex-1 flex-col px-6 pb-10 pt-6"
            >
                {children}
            </div>
        </nav>
    );
}