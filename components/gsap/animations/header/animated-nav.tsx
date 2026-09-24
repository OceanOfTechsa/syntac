"use client";

import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";

interface AnimatedNavProps {
    children: React.ReactNode;
}

export default function AnimatedNav({ children }: AnimatedNavProps) {
    const navRef = useRef<HTMLElement>(null);

    useLayoutEffect(() => {
        if (!navRef.current) return;

        const links = Array.from(
            navRef.current.querySelectorAll("a")
        );

        if (!links.length) return;

        const ctx = gsap.context(() => {
            gsap.fromTo(
                links,
                {
                    y: 12,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 0.6,
                    stagger: 0.08,
                    ease: "power3.out",
                    delay: 0.2,
                }
            );
        }, navRef);

        return () => ctx.revert();
    }, []);

    return (
        <nav
            ref={navRef}
            aria-label="Main"
            className="col-start-2 hidden items-center gap-8 md:flex"
        >
            {children}
        </nav>
    );
}