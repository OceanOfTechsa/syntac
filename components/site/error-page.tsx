"use client";

import { useRef, useEffect } from "react";
import gsap from "gsap";
import Link from "next/link";
import { useGsap } from "@/lib/gsap/hooks/use-gsap";

interface ErrorPageProps {
    code?: string;
    title?: string;
    subTitle?: string;
    description?: string;
    buttonText?: string;
    buttonHref?: string;
    rightTexts?: string[];
    /** Next.js error object */
    error?: Error & { digest?: string };
    /** Next.js reset function */
    reset?: () => void;
}

const ErrorPage = ({
                       code = "500",
                       title = "Oops!",
                       subTitle = "Something went wrong!",
                       description,
                       buttonText = "Try again",
                       buttonHref = "/",
                       rightTexts = ["System Error", "Something Broke", "Try Again"],
                       error,
                       reset,
                   }: ErrorPageProps) => {
    const container = useRef<HTMLDivElement>(null);
    const textRef = useRef<HTMLDivElement>(null);
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const currentIndex = useRef(0);
    const mouse = useRef({ x: -9999, y: -9999 });

    // Final description (priority: prop → error.message → fallback)
    const finalDescription =
        description ||
        error?.message ||
        "An unexpected error occurred. Please try again.";

    // Entrance animation
    useGsap(
        container,
        () => {
            const tl = gsap.timeline({ defaults: { ease: "power3.out" } });

            tl.fromTo(
                ".error-left > *",
                { y: 40, autoAlpha: 0 },
                {
                    y: 0,
                    autoAlpha: 1,
                    duration: 0.8,
                    stagger: 0.12,
                    clearProps: "all",
                }
            )
                .fromTo(
                    ".error-right",
                    { x: 80, autoAlpha: 0 },
                    {
                        x: 0,
                        autoAlpha: 1,
                        duration: 1,
                        clearProps: "all",
                    },
                    "-=0.5"
                )
                .fromTo(
                    ".right-text",
                    {
                        scale: 0.8,
                        autoAlpha: 0,
                        filter: "blur(20px)",
                    },
                    {
                        scale: 1,
                        autoAlpha: 1,
                        filter: "blur(0px)",
                        duration: 1.2,
                        ease: "power2.out",
                        clearProps: "all",
                    },
                    "-=0.7"
                );
        },
        []
    );

    // Cycle right texts
    useEffect(() => {
        if (rightTexts.length <= 1) return;

        const interval = setInterval(() => {
            const nextIndex = (currentIndex.current + 1) % rightTexts.length;

            gsap.to(".right-text", {
                opacity: 0,
                filter: "blur(12px)",
                y: -20,
                duration: 0.5,
                ease: "power2.in",
                onComplete: () => {
                    currentIndex.current = nextIndex;
                    if (textRef.current) {
                        textRef.current.textContent = rightTexts[nextIndex];
                    }
                    gsap.fromTo(
                        ".right-text",
                        { opacity: 0, filter: "blur(12px)", y: 20 },
                        {
                            opacity: 1,
                            filter: "blur(0px)",
                            y: 0,
                            duration: 0.7,
                            ease: "power2.out",
                        }
                    );
                },
            });
        }, 3500);

        return () => clearInterval(interval);
    }, [rightTexts]);

    // Interactive dots canvas
    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        let animationId: number;
        let width = 0;
        let height = 0;
        let particles: {
            x: number;
            y: number;
            baseX: number;
            baseY: number;
            size: number;
        }[] = [];

        const spacing = 18;

        const resize = () => {
            const parent = canvas.parentElement;
            if (!parent) return;

            width = parent.clientWidth;
            height = parent.clientHeight;
            canvas.width = width * window.devicePixelRatio;
            canvas.height = height * window.devicePixelRatio;
            canvas.style.width = `${width}px`;
            canvas.style.height = `${height}px`;
            ctx.setTransform(1, 0, 0, 1, 0, 0);
            ctx.scale(window.devicePixelRatio, window.devicePixelRatio);

            particles = [];
            for (let x = spacing / 2; x < width; x += spacing) {
                for (let y = spacing / 2; y < height; y += spacing) {
                    particles.push({
                        x,
                        y,
                        baseX: x,
                        baseY: y,
                        size: 1.2,
                    });
                }
            }
        };

        const animate = () => {
            ctx.clearRect(0, 0, width, height);

            particles.forEach((p) => {
                const dx = mouse.current.x - p.baseX;
                const dy = mouse.current.y - p.baseY;
                const dist = Math.sqrt(dx * dx + dy * dy);
                const maxDist = 140;

                let force = 0;
                let size = 1.2;
                let color = "rgba(80, 80, 80, 0.7)";

                if (dist < maxDist) {
                    force = (maxDist - dist) / maxDist;
                    size = 1.2 + force * 5.5;
                    const green = Math.floor(180 + force * 75);
                    const gold = Math.floor(force * 180);
                    color = `rgba(${gold}, ${green}, 60, ${0.5 + force * 0.5})`;
                }

                p.x = p.baseX + dx * force * 0.18;
                p.y = p.baseY + dy * force * 0.18;

                ctx.beginPath();
                ctx.arc(p.x, p.y, size, 0, Math.PI * 2);
                ctx.fillStyle = color;
                ctx.fill();
            });

            animationId = requestAnimationFrame(animate);
        };

        const handleMouseMove = (e: MouseEvent) => {
            const rect = canvas.getBoundingClientRect();
            mouse.current.x = e.clientX - rect.left;
            mouse.current.y = e.clientY - rect.top;
        };

        const handleMouseLeave = () => {
            mouse.current.x = -9999;
            mouse.current.y = -9999;
        };

        resize();
        animate();

        window.addEventListener("resize", resize);
        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);

        return () => {
            cancelAnimationFrame(animationId);
            window.removeEventListener("resize", resize);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
        };
    }, []);

    return (
        <div ref={container} className="min-h-screen flex flex-col">
            <main className="flex-1 flex flex-col lg:flex-row">
                {/* Left side */}
                <div className="error-left flex-1 flex flex-col justify-center px-8 md:px-16 lg:px-20 py-16 w-full lg:w-1/2">
                    {/* Logo */}
                    {/*<div className="mb-10">*/}
                    {/*    <Link href="/" className="inline-block">*/}
                    {/*          <span className="text-xl font-semibold tracking-tight">*/}
                    {/*            {AppSettings.COMPANY_NAME.toUpperCase()}*/}
                    {/*          </span>*/}
                    {/*    </Link>*/}
                    {/*</div>*/}

                    <h1 className="text-5xl md:text-6xl font-bold tracking-tight mb-4">
                        {code} – {title}
                    </h1>

                    <h2 className="text-2xl md:text-3xl font-semibold mb-4">
                        {subTitle}
                    </h2>

                    <p className="text-zinc-600 dark:text-zinc-400 max-w-md mb-8 leading-relaxed">
                        {finalDescription}
                    </p>

                    <div className="flex flex-col sm:flex-row gap-3">
                        {reset && (
                            <button
                                onClick={() => reset()}
                                className="cursor-pointer inline-flex w-fit items-center justify-center rounded-md bg-black dark:bg-white px-6 py-3 text-sm font-medium text-white dark:text-black transition hover:bg-zinc-800 dark:hover:bg-zinc-200"
                            >
                                {buttonText}
                            </button>
                        )}

                        <Link
                            href={buttonHref}
                            className="    hover:bg-[#0B9944] dark:hover:bg-[#0B9944]
                              focus-visible:border-ring focus-visible:ring-ring/50
                              aria-invalid:border-destructive aria-invalid:ring-destructive/20
                              dark:aria-invalid:ring-destructive/40

                              inline-flex shrink-0 items-center justify-center
                              font-medium whitespace-nowrap
                              transition-all outline-none
                              focus-visible:ring-[3px]
                              disabled:pointer-events-none disabled:opacity-50

                              [&_svg]:pointer-events-none
                              [&_svg]:shrink-0
                              [&_svg:not([class*='size-'])]:size-4

                              bg-primary text-primary-foreground
                              hover:text-white

                             h-10 w-auto px-6 gap-2

                              text-base rounded-md
                              sm:max-[400px]:flex-1"
                        >
                            {buttonText}
                        </Link>
                    </div>
                </div>

                {/* Right side */}
                <div
                    className="error-right relative hidden lg:flex w-full lg:w-1/2 p-4"
                    data-cursor-hide
                >
                    <div className="relative h-full w-full overflow-hidden rounded-2xl bg-black">
                        <canvas
                            ref={canvasRef}
                            className="absolute inset-0 h-full w-full"
                        />

                        <div className="absolute inset-0 z-10 flex items-center justify-center pointer-events-none">
                            <div
                                ref={textRef}
                                className="right-text text-center font-bold text-white text-6xl xl:text-8xl leading-none select-none"
                                style={{ filter: "url(#threshold)" }}
                            >
                                {rightTexts[0]}
                            </div>
                        </div>

                        <svg className="absolute h-0 w-0">
                            <defs>
                                <filter id="threshold">
                                    <feColorMatrix
                                        in="SourceGraphic"
                                        type="matrix"
                                        values="1 0 0 0 0
                            0 1 0 0 0
                            0 0 1 0 0
                            0 0 0 255 -140"
                                    />
                                </filter>
                            </defs>
                        </svg>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default ErrorPage;