"use client";

import React, {useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import {createPortal} from "react-dom";
import Image, {getImageProps} from "next/image";
import {ChevronLeft, ChevronRight, X} from "lucide-react";

import {cn} from "@/lib/utils";
import {gsap} from "@/lib/gsap";
import {motion} from "@/lib/gsap/presets";
import {useStaggerReveal} from "@/lib/gsap/hooks/use-stagger-reveal";
import {imageKitLoader} from "@/lib/imagekit";
import SectionHeader from "@/components/site/shared/section-header";

/* -------------------------------------------------------------------------- */
/*  Types                                                                     */
/* -------------------------------------------------------------------------- */

export interface GalleryImage {
    /** ImageKit path, e.g. /case-studies/{client}/{project}/gallery/01-light.png */
    light: string;
    /** Optional dark-theme version of the same screenshot */
    dark?: string;
    alt?: string;
}

interface ImageGalleryProps {
    /** Plain strings are treated as light-only ImageKit paths */
    images: (string | GalleryImage)[];
    /** Time each image stays on screen. 0 turns auto-scroll off */
    autoplayMs?: number;
    /**
     * "cover" (default) fills the main image edge to edge with no side space.
     * "contain" shows the whole image instead, leaving space at the sides if the ratio differs.
     */
    fit?: "cover" | "contain";
}

/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

// Stage and thumbnails share one ratio, held in a CSS variable so it can differ per
// breakpoint: compact and wide on desktop, a little taller on mobile. Upload gallery
// images at this ratio (e.g. 1650 x 750 for 11:5) and nothing is cropped.
const ASPECT_CLASSES = "[--stage-aspect:16/10] lg:[--stage-aspect:11/5]";
const ASPECT_STYLE = {aspectRatio: "var(--stage-aspect)"} as const;

const SIZES_STAGE = "(min-width: 1280px) 776px, (min-width: 1024px) 70vw, 100vw";
const SIZES_THUMB = "(min-width: 1024px) 288px, 192px";
const SIZES_LIGHTBOX = "(min-width: 1024px) 1024px, 100vw";

const EASE_PREMIUM = "ease-[cubic-bezier(0.22,1,0.36,1)]";

const pad = (n: number) => String(n).padStart(2, "0");

const prefersReducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Shortest distance between two slides on a loop
const loopDistance = (a: number, b: number, total: number) => {
    const d = Math.abs(a - b);
    return Math.min(d, total - d);
};

/* -------------------------------------------------------------------------- */
/*  Themed image (light + dark pair, only the active one is ever downloaded)  */
/* -------------------------------------------------------------------------- */

interface ThemedImageProps {
    image: GalleryImage;
    alt: string;
    sizes: string;
    className?: string;
}

const ThemedImage = ({image, alt, sizes, className}: ThemedImageProps) => {
    const common = {loader: imageKitLoader, fill: true as const, sizes, quality: 80, alt};

    if (!image.dark) {
        return <Image {...common} src={image.light} className={className} />;
    }

    return (
        <>
            <Image {...common} src={image.light} className={cn(className, "dark:hidden")} />
            <Image {...common} src={image.dark} className={cn(className, "hidden dark:block")} />
        </>
    );
};

/* -------------------------------------------------------------------------- */
/*  Lightbox                                                                  */
/* -------------------------------------------------------------------------- */

interface LightboxProps {
    images: GalleryImage[];
    index: number;
    onIndexChange: (index: number) => void;
    onClose: () => void;
}

const Lightbox = ({images, index, onIndexChange, onClose}: LightboxProps) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const stageRef = useRef<HTMLDivElement>(null);
    const slideRef = useRef<HTMLDivElement>(null);
    const closeRef = useRef<HTMLButtonElement>(null);
    const prevRef = useRef<HTMLButtonElement>(null);
    const nextRef = useRef<HTMLButtonElement>(null);

    const previousIndex = useRef(index);
    const direction = useRef<1 | -1>(1);
    const isClosing = useRef(false);
    const touchStartX = useRef<number | null>(null);

    const total = images.length;

    const go = useCallback((delta: 1 | -1) => {
        if (total < 2) return;
        direction.current = delta;
        onIndexChange((index + delta + total) % total);
    }, [index, total, onIndexChange]);

    const requestClose = useCallback(() => {
        if (isClosing.current) return;
        isClosing.current = true;

        if (prefersReducedMotion()) {
            onClose();
            return;
        }

        gsap.to(stageRef.current, {opacity: 0, scale: 0.97, y: 8, duration: 0.2, ease: "power1.in"});
        gsap.to(overlayRef.current, {opacity: 0, duration: 0.2, ease: "power1.in", onComplete: onClose});
    }, [onClose]);

    // Entrance: backdrop fades in, stage scales up (before paint, so no flash)
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            if (prefersReducedMotion()) return;

            gsap.fromTo(overlayRef.current, {opacity: 0}, {opacity: 1, duration: 0.25, ease: "power1.out"});
            gsap.fromTo(
                stageRef.current,
                {opacity: 0, scale: 0.96, y: motion.distance.small},
                {opacity: 1, scale: 1, y: 0, duration: motion.duration.normal, ease: motion.ease.smooth}
            );
        }, overlayRef);

        closeRef.current?.focus();

        return () => ctx.revert();
    }, []);

    // Slide the new image in from the side we navigated towards
    useLayoutEffect(() => {
        if (previousIndex.current === index) return;
        previousIndex.current = index;

        if (prefersReducedMotion()) return;

        gsap.fromTo(
            slideRef.current,
            {x: direction.current * 48, opacity: 0},
            {x: 0, opacity: 1, duration: 0.4, ease: motion.ease.smooth, overwrite: true}
        );
    }, [index]);

    // Preload the neighbouring images in the active theme so arrows feel instant
    useEffect(() => {
        if (total < 2) return;

        const isDark = document.documentElement.classList.contains("dark");

        [index + 1, index - 1].forEach((n) => {
            const image = images[(n + total) % total];
            const {props} = getImageProps({
                src: isDark && image.dark ? image.dark : image.light,
                alt: "",
                fill: true,
                sizes: SIZES_LIGHTBOX,
                quality: 80,
                loader: imageKitLoader,
            });

            const preloader = new window.Image();
            if (props.srcSet) preloader.srcset = props.srcSet;
            if (props.sizes) preloader.sizes = props.sizes;
            preloader.src = props.src;
        });
    }, [index, images, total]);

    // Lock page scroll (without the layout jump when the scrollbar disappears)
    useEffect(() => {
        const {body} = document;
        const scrollbarWidth = window.innerWidth - document.documentElement.clientWidth;
        const previousOverflow = body.style.overflow;
        const previousPadding = body.style.paddingRight;

        body.style.overflow = "hidden";
        if (scrollbarWidth > 0) body.style.paddingRight = `${scrollbarWidth}px`;

        return () => {
            body.style.overflow = previousOverflow;
            body.style.paddingRight = previousPadding;
        };
    }, []);

    // Keyboard: Esc closes, arrows navigate, Tab stays inside the dialog
    useEffect(() => {
        const onKeyDown = (e: KeyboardEvent) => {
            if (e.key === "Escape") return requestClose();
            if (e.key === "ArrowRight") return go(1);
            if (e.key === "ArrowLeft") return go(-1);

            if (e.key === "Tab") {
                const focusable = [closeRef.current, prevRef.current, nextRef.current]
                    .filter(Boolean) as HTMLElement[];
                const first = focusable[0];
                const last = focusable[focusable.length - 1];

                if (e.shiftKey && document.activeElement === first) {
                    e.preventDefault();
                    last.focus();
                } else if (!e.shiftKey && document.activeElement === last) {
                    e.preventDefault();
                    first.focus();
                }
            }
        };

        document.addEventListener("keydown", onKeyDown);
        return () => document.removeEventListener("keydown", onKeyDown);
    }, [go, requestClose]);

    const controlClass =
        "flex size-11 items-center justify-center rounded-sm border border-white/30 text-white transition-colors hover:bg-white/10 focus-visible:outline-2 focus-visible:outline-white";

    const image = images[index];

    // Portal to <body>: a transformed ancestor would otherwise break position: fixed
    return createPortal(
        <div
            ref={overlayRef}
            role="dialog"
            aria-modal="true"
            aria-label="Project image gallery"
            className="fixed inset-0 z-[100] flex items-center justify-center bg-black/90"
            onClick={requestClose}
        >
            <div className="absolute inset-x-0 top-0 flex items-center justify-between p-4 text-white sm:p-6">
                <span className="font-mono text-sm tabular-nums">
                    {pad(index + 1)} / {pad(total)}
                </span>
                <button
                    ref={closeRef}
                    type="button"
                    aria-label="Close gallery"
                    className={controlClass}
                    onClick={(e) => {
                        e.stopPropagation();
                        requestClose();
                    }}
                >
                    <X className="size-5" />
                </button>
            </div>

            {total > 1 && (
                <button
                    ref={prevRef}
                    type="button"
                    aria-label="Previous image"
                    className={cn(controlClass, "absolute left-3 top-1/2 -translate-y-1/2 sm:left-6")}
                    onClick={(e) => {
                        e.stopPropagation();
                        go(-1);
                    }}
                >
                    <ChevronLeft className="size-6" />
                </button>
            )}

            <div
                ref={stageRef}
                className="relative h-[80vh] w-full max-w-5xl px-4 sm:px-20"
                onClick={(e) => e.stopPropagation()}
                onTouchStart={(e) => {
                    touchStartX.current = e.touches[0].clientX;
                }}
                onTouchEnd={(e) => {
                    if (touchStartX.current === null) return;
                    const dx = e.changedTouches[0].clientX - touchStartX.current;
                    touchStartX.current = null;
                    if (Math.abs(dx) > 50) go(dx < 0 ? 1 : -1);
                }}
            >
                <div ref={slideRef} className="relative h-full w-full">
                    <ThemedImage
                        image={image}
                        alt={image.alt ?? `Project image ${index + 1}`}
                        sizes={SIZES_LIGHTBOX}
                        className="rounded-sm object-contain"
                    />
                </div>
            </div>

            {total > 1 && (
                <button
                    ref={nextRef}
                    type="button"
                    aria-label="Next image"
                    className={cn(controlClass, "absolute right-3 top-1/2 -translate-y-1/2 sm:right-6")}
                    onClick={(e) => {
                        e.stopPropagation();
                        go(1);
                    }}
                >
                    <ChevronRight className="size-6" />
                </button>
            )}
        </div>,
        document.body
    );
};

/* -------------------------------------------------------------------------- */
/*  Gallery                                                                   */
/* -------------------------------------------------------------------------- */

const ARROW_CLASS =
    "absolute top-1/2 z-20 flex size-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/70 text-white opacity-0 transition-[opacity,translate,background-color] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] hover:bg-black group-hover/stage:translate-x-0 group-hover/stage:opacity-100 focus-visible:translate-x-0 focus-visible:opacity-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-white motion-reduce:transition-none [@media(hover:none)]:translate-x-0 [@media(hover:none)]:opacity-100";

export default function ImageGallery({images, autoplayMs = 5000, fit = "cover"}: ImageGalleryProps) {
    const rootRef = useRef<HTMLDivElement>(null);
    const thumbsRef = useRef<HTMLDivElement>(null);
    const thumbRefs = useRef<(HTMLButtonElement | null)[]>([]);
    const barRefs = useRef<(HTMLSpanElement | null)[]>([]);
    const tweenRef = useRef<ReturnType<typeof gsap.to> | null>(null);
    const triggerRef = useRef<HTMLElement | null>(null);

    const [{index, previous}, setSlide] = useState({index: 0, previous: 0});
    const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
    const [hovered, setHovered] = useState(false);
    const [keyboardFocus, setKeyboardFocus] = useState(false);
    const [inView, setInView] = useState(true);
    const [tabVisible, setTabVisible] = useState(true);

    const items = useMemo<GalleryImage[]>(
        () =>
            images.map((img, i) => {
                const base = typeof img === "string" ? {light: img} : img;
                return {...base, alt: base.alt ?? `Project image ${i + 1}`};
            }),
        [images]
    );

    const total = items.length;
    const multiple = total > 1;
    const autoplay = multiple && autoplayMs > 0;

    // Thumbnails and stage fade in one after the other when the gallery scrolls into view
    useStaggerReveal(rootRef, {stagger: 0.12});

    const goTo = useCallback((to: number) => {
        setSlide((s) => {
            const next = ((to % total) + total) % total;
            return next === s.index ? s : {index: next, previous: s.index};
        });
    }, [total]);

    /* ---- Auto-scroll: a GSAP tween fills the active thumbnail's progress line, then advances ---- */

    const paused = hovered || keyboardFocus || lightboxIndex !== null || !inView || !tabVisible;
    const pausedRef = useRef(paused);
    pausedRef.current = paused;

    useEffect(() => {
        if (!autoplay || prefersReducedMotion()) return;

        const bar = barRefs.current[index];
        if (!bar) return;

        gsap.set(barRefs.current.filter(Boolean), {scaleX: 0});

        const tween = gsap.to(bar, {
            scaleX: 1,
            duration: autoplayMs / 1000,
            ease: "none",
            onComplete: () => goTo(index + 1),
        });
        tween.paused(pausedRef.current);
        tweenRef.current = tween;

        return () => {
            tween.kill();
        };
    }, [index, autoplay, autoplayMs, goTo]);

    useEffect(() => {
        tweenRef.current?.paused(paused);
    }, [paused]);

    // Pause while off-screen or in a background tab
    useEffect(() => {
        const root = rootRef.current;
        if (!root) return;

        const observer = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), {threshold: 0.25});
        observer.observe(root);

        const onVisibility = () => setTabVisible(!document.hidden);
        document.addEventListener("visibilitychange", onVisibility);

        return () => {
            observer.disconnect();
            document.removeEventListener("visibilitychange", onVisibility);
        };
    }, []);

    // Keep the active thumbnail centred in its strip (vertical on desktop, horizontal on mobile)
    useEffect(() => {
        const box = thumbsRef.current;
        const thumb = thumbRefs.current[index];
        if (!box || !thumb) return;

        box.scrollTo({
            top: Math.max(0, thumb.offsetTop - (box.clientHeight - thumb.offsetHeight) / 2),
            left: Math.max(0, thumb.offsetLeft - (box.clientWidth - thumb.offsetWidth) / 2),
            behavior: prefersReducedMotion() ? "auto" : "smooth",
        });
    }, [index]);

    /* ---- Image viewer ---- */

    const lightboxRef = useRef<number | null>(null);
    lightboxRef.current = lightboxIndex;

    const openViewer = (at: number, trigger: HTMLElement) => {
        triggerRef.current = trigger;
        setLightboxIndex(at);
    };

    // Closing the viewer leaves the carousel on the image you were looking at
    const closeViewer = useCallback(() => {
        if (lightboxRef.current !== null) goTo(lightboxRef.current);
        setLightboxIndex(null);
        triggerRef.current?.focus();
    }, [goTo]);

    if (total === 0) return null;

    return (
        <section id={'gallery'} className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24">
            <SectionHeader
                preTitle={'Project Impact'}
                title={'The Difference Our Work Makes'}
                markedWord={'Difference'}
                desc={'Explore the outcomes, improvements, and value delivered through this project, and how the solution addresses real business challenges.'}
            />

            <div className={'py-8 sm:py-16 w-full border-y border-dashed'}>
                <div
                    ref={rootRef}
                    className={cn(
                        "mx-auto grid w-full max-w-7xl gap-4 px-4 sm:px-6 lg:gap-6 lg:px-8",
                        ASPECT_CLASSES,
                        multiple && "lg:grid-cols-[18rem_minmax(0,1fr)]"
                    )}
                    // onPointerEnter={(e) => e.pointerType === "mouse" && setHovered(true)}
                    onPointerLeave={() => setHovered(false)}
                    onFocusCapture={(e) => {
                        if (e.target instanceof HTMLElement && e.target.matches(":focus-visible")) setKeyboardFocus(true);
                    }}
                    onBlurCapture={(e) => {
                        if (!e.currentTarget.contains(e.relatedTarget as Node | null)) setKeyboardFocus(false);
                    }}
                    onKeyDown={(e) => {
                        if (lightboxIndex !== null) return;
                        if (e.key === "ArrowRight") goTo(index + 1);
                        if (e.key === "ArrowLeft") goTo(index - 1);
                    }}
                >
                    {/* Thumbnails: a vertical strip on desktop, a horizontal strip on mobile */}
                    {multiple && (
                        <div data-reveal className="relative order-2 lg:order-1">
                            <div
                                ref={thumbsRef}
                                className="relative flex gap-3 overflow-x-auto [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:absolute lg:inset-0 lg:flex-col lg:overflow-x-hidden lg:overflow-y-auto"
                            >
                                {items.map((image, i) => (
                                    <button
                                        key={image.light}
                                        ref={(el) => {
                                            thumbRefs.current[i] = el;
                                        }}
                                        type="button"
                                        aria-label={`Show image ${i + 1} of ${total}`}
                                        aria-current={i === index}
                                        onClick={() => goTo(i)}
                                        style={ASPECT_STYLE}
                                        className="group/thumb relative w-48 shrink-0 overflow-hidden rounded-sm bg-muted focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary lg:w-full"
                                    >
                                        <ThemedImage
                                            image={image}
                                            alt=""
                                            sizes={SIZES_THUMB}
                                            className={cn(
                                                "object-cover transition-transform duration-[900ms] motion-reduce:transition-none motion-reduce:group-hover/thumb:scale-100",
                                                EASE_PREMIUM,
                                                "group-hover/thumb:scale-105"
                                            )}
                                        />

                                        {/* Active marker (drawn above the image so it is actually visible) */}
                                        {i === index && (
                                            <span
                                                aria-hidden
                                                className="pointer-events-none absolute inset-0 rounded-sm"
                                            />
                                        )}
                                        <span
                                            ref={(el) => {
                                                barRefs.current[i] = el;
                                            }}
                                            aria-hidden
                                            className="absolute inset-x-0 bottom-0 h-0.5 bg-primary"
                                            style={{transform: "scaleX(0)", transformOrigin: "left center"}}
                                        />
                                    </button>
                                ))}
                            </div>
                        </div>
                    )}

                    {/* Stage: the whole image, cross-fading with a slow settle */}
                    <div
                        data-reveal
                        className="group/stage relative order-1 overflow-hidden rounded-sm bg-muted ring-1 ring-foreground/10 lg:order-2"
                        style={ASPECT_STYLE}
                    >
                        {items.map((image, i) => {
                            // Only the current, previous and neighbouring slides exist in the DOM
                            const mounted = i === index || i === previous || loopDistance(i, index, total) <= 1;
                            if (!mounted) return null;

                            const active = i === index;

                            return (
                                <div
                                    key={image.light}
                                    aria-hidden={!active}
                                    className={cn(
                                        "absolute inset-0 transition-[opacity,scale] duration-1000 motion-reduce:transition-none",
                                        EASE_PREMIUM,
                                        active ? "scale-100 opacity-100" : "scale-[1.04] opacity-0"
                                    )}
                                >
                                    <ThemedImage
                                        image={image}
                                        alt={image.alt ?? ""}
                                        sizes={SIZES_STAGE}
                                        className={fit === "cover" ? "object-cover object-top" : "object-contain"}
                                    />
                                </div>
                            );
                        })}

                        {/* Click anywhere on the image to open the viewer */}
                        <button
                            type="button"
                            aria-label={`Open image ${index + 1} of ${total} in the viewer`}
                            onClick={(e) => openViewer(index, e.currentTarget)}
                            className="absolute inset-0 z-10 cursor-zoom-in focus-visible:outline-2 focus-visible:-outline-offset-4 focus-visible:outline-primary"
                        />

                        {multiple && (
                            <>
                                <button
                                    type="button"
                                    aria-label="Previous image"
                                    onClick={() => goTo(index - 1)}
                                    className={cn(ARROW_CLASS, "left-3 -translate-x-2 sm:left-4")}
                                >
                                    <ChevronLeft className="size-5" />
                                </button>
                                <button
                                    type="button"
                                    aria-label="Next image"
                                    onClick={() => goTo(index + 1)}
                                    className={cn(ARROW_CLASS, "right-3 translate-x-2 sm:right-4")}
                                >
                                    <ChevronRight className="size-5" />
                                </button>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {lightboxIndex !== null && (
                <Lightbox
                    images={items}
                    index={lightboxIndex}
                    onIndexChange={setLightboxIndex}
                    onClose={closeViewer}
                />
            )}
        </section>
    );
}