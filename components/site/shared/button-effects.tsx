"use client";

import { useEffect } from "react";
import { gsap } from "@/lib/gsap";

/*
 * Typed data attributes: a typo like data-reveal="yes" is now a compile error.
 * HTMLAttributes is extended, so this applies to <a>, <button>, next/link, etc.
 */
type Prefix = "" | "dark:";
type RevealToken = `${Prefix}${"bg" | "text" | "border"}-${string}`;
/** Tailwind classes for the hovered look. Must start with bg-, text- or border- (optionally dark:). */
type RevealClasses = RevealToken | `${RevealToken} ${string}`;

type IconToken = `${Prefix}${"bg" | "text"}-${string}` | `${"" | "-"}rotate-${number}`;
/** Tailwind classes for the hovered icon badge: bg-, text- and rotate- (rotates the svg inside it). */
type RevealIconClasses = IconToken | `${IconToken} ${string}`;

declare module "react" {
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    interface HTMLAttributes<T> {
        /** Label and icon roll up together and the duplicate rolls in from below. */
        "data-roll"?: true;
        /**
         * Circular reveal from the icon badge (or the pointer when there is no badge).
         * Bare `data-reveal` inverts the colours; pass Tailwind classes to describe the hovered look,
         * e.g. data-reveal="bg-background text-foreground dark:border-primary/30".
         * Border width/style and the resting colours come from the element's own classes.
         */
        "data-reveal"?: true | RevealClasses;
        /**
         * Put on the icon's circular wrapper. The circle grows from its centre and it takes these
         * classes while hovered, e.g. data-reveal-icon="bg-primary text-background rotate-45".
         */
        "data-reveal-icon"?: RevealIconClasses;
    }
}

const FILL_RADIUS = 200; // px, base size of the circle (it is scaled to whatever the button needs)
const DURATION = 0.5; // s, same as Tailwind's duration-500

/** Tailwind's default transition curve, cubic-bezier(0.4, 0, 0.2, 1), as a GSAP ease. */
const EASE = (t: number) => {
    if (t <= 0 || t >= 1) return t;
    const at = (a: number, b: number, u: number) =>
        3 * a * u * (1 - u) ** 2 + 3 * b * u ** 2 * (1 - u) + u ** 3;

    let lo = 0;
    let hi = 1;
    let u = t;
    for (let i = 0; i < 20; i++) {
        u = (lo + hi) / 2;
        if (at(0.4, 0.2, u) < t) lo = u;
        else hi = u;
    }
    return at(0, 1, u);
};

type Look = { text: string; border: string };
type Pair = { bg: string; text: string };

type Fx = {
    moving?: HTMLElement[];
    fill?: HTMLElement;
    rest?: Look;
    hover?: Look & { bg: string };
    badge?: { el: HTMLElement; rest: Pair; hover: Pair; rotate: number };
};

// Module level so React strict mode (effect running twice) never double-wraps an element
const fx = new WeakMap<HTMLElement, Fx>();

const isTransparent = (c: string) => c === "transparent" || c === "rgba(0, 0, 0, 0)";

const edge = (c: string) => ({
    borderTopColor: c,
    borderRightColor: c,
    borderBottomColor: c,
    borderLeftColor: c,
});

let ctx: CanvasRenderingContext2D | null = null;

/**
 * Resolves any CSS colour (oklch, color-mix, alpha...) to a plain opaque rgb() by painting it over
 * `over`. Gives GSAP one colour format to tween and turns translucent colours into solid ones.
 */
const flatten = (color: string, over: string) => {
    ctx ??= Object.assign(document.createElement("canvas"), { width: 1, height: 1 }).getContext("2d", {
        willReadFrequently: true,
    });
    if (!ctx) return color;

    ctx.clearRect(0, 0, 1, 1);
    ctx.fillStyle = over;
    ctx.fillRect(0, 0, 1, 1);
    ctx.fillStyle = color;
    ctx.fillRect(0, 0, 1, 1);

    const [r, g, b] = ctx.getImageData(0, 0, 1, 1).data;
    return `rgb(${r}, ${g}, ${b})`;
};

/** Where the circle grows from / closes to, relative to the padding box (inside the border). */
const origin = (el: HTMLElement, e?: PointerEvent) => {
    const box = el.getBoundingClientRect();
    const svg = el.querySelector("svg");
    // The badge wins, then the roll clip (unlike the svg itself it never moves), then the bare svg
    const icon = (
        el.querySelector("[data-reveal-icon]") ??
        svg?.closest("[data-fx-clip]") ??
        svg
    )?.getBoundingClientRect();

    const left = box.left + el.clientLeft;
    const top = box.top + el.clientTop;

    return {
        x: icon ? icon.left + icon.width / 2 - left : e ? e.clientX - left : el.clientWidth / 2,
        y: icon ? icon.top + icon.height / 2 - top : e ? e.clientY - top : el.clientHeight / 2,
    };
};

/** One-time DOM setup, done lazily on the first hover/focus of an element. */
const prepare = (el: HTMLElement): Fx => {
    const existing = fx.get(el);
    if (existing) return existing;

    const state: Fx = {};
    fx.set(el, state);

    /* data-roll: wrap each text/icon child in a clip with a duplicate below it */
    if (el.hasAttribute("data-roll")) {
        const moving: HTMLElement[] = [];

        Array.from(el.childNodes).forEach((node) => {
            const isText = node.nodeType === Node.TEXT_NODE;
            if (isText && !node.textContent?.trim()) return;
            if (!isText && node.nodeType !== Node.ELEMENT_NODE) return;
            // The badge animates its own colours, so a duplicate of it would go out of sync
            if (node instanceof Element && node.hasAttribute("data-reveal-icon")) return;

            const clip = document.createElement("span");
            const item = document.createElement("span");
            clip.setAttribute("data-fx-clip", "");
            clip.style.cssText = "position:relative;display:inline-flex;overflow:hidden";
            item.style.display = "inline-flex";

            node.replaceWith(clip);
            item.append(node);

            const clone = item.cloneNode(true) as HTMLElement;
            clone.setAttribute("aria-hidden", "true");
            clone.style.cssText =
                "position:absolute;left:0;top:100%;display:inline-flex;white-space:nowrap";

            clip.append(item, clone);
            moving.push(item, clone);
        });

        state.moving = moving;
    }

    /* data-reveal: add the circle that grows from the badge / icon / pointer */
    if (el.hasAttribute("data-reveal")) {
        if (getComputedStyle(el).position === "static") el.style.position = "relative";
        el.style.overflow = "hidden"; // clips to the padding box, so the element's own border stays visible
        el.style.isolation = "isolate"; // fill sits under the content but over the button bg

        const fill = document.createElement("span");
        fill.setAttribute("aria-hidden", "true");
        fill.style.cssText = `position:absolute;left:0;top:0;z-index:-1;border-radius:9999px;pointer-events:none;width:${FILL_RADIUS * 2}px;height:${FILL_RADIUS * 2}px`;
        el.append(fill);
        gsap.set(fill, { xPercent: -50, yPercent: -50, scale: 0 });
        state.fill = fill;
    }

    return state;
};

/** Measures a throwaway element inside `host` so Tailwind resolves the classes (dark: included). */
const measure = (host: HTMLElement, classes: string) => {
    const probe = document.createElement("span");
    probe.className = classes;
    probe.style.cssText = "position:absolute;visibility:hidden;pointer-events:none";
    host.append(probe);

    const p = getComputedStyle(probe);
    const result = { bg: p.backgroundColor, text: p.color, border: p.borderTopColor };

    probe.remove();
    return result;
};

const enter = (el: HTMLElement, e?: PointerEvent) => {
    const s = prepare(el);

    if (s.moving) {
        gsap.to(s.moving, { yPercent: -100, duration: 0.8, ease: "expo.out", overwrite: "auto" });
    }

    if (!s.fill) return;

    // Only resolve colours and place the circle when fully collapsed, so re-entering mid-animation doesn't jump
    if (Number(gsap.getProperty(s.fill, "scale")) === 0) {
        const { x, y } = origin(el, e);
        const cs = getComputedStyle(el);

        const page =
            [document.body, document.documentElement]
                .map((n) => getComputedStyle(n).backgroundColor)
                .find((c) => !isTransparent(c)) ?? "#fff";

        // Resting look, read from the element's own classes
        const restBg = isTransparent(cs.backgroundColor) ? page : flatten(cs.backgroundColor, page);
        // With bg-clip-padding a transparent border shows the page, not the button's background
        const behindBorder = cs.backgroundClip === "padding-box" ? page : restBg;
        const rest: Look = {
            text: flatten(cs.color, restBg),
            border: flatten(cs.borderTopColor, behindBorder),
        };

        // Hovered look: bare data-reveal inverts, otherwise it comes from the caller's Tailwind classes
        const raw = el.getAttribute("data-reveal");
        const classes = raw && raw !== "true" ? raw : "";
        let hover = { bg: rest.text, text: restBg, border: rest.border };

        if (classes) {
            const m = measure(el, classes);
            const bgSet = !isTransparent(m.bg);
            const textSet = m.text !== cs.color;
            const borderSet = m.border !== m.text; // an unset border colour computes to currentcolor

            const bg = bgSet ? flatten(m.bg, page) : rest.text;

            hover = {
                bg,
                text: textSet ? flatten(m.text, bg) : bgSet ? rest.text : restBg,
                border: borderSet ? flatten(m.border, page) : rest.border,
            };
        }

        s.rest = rest;
        s.hover = hover;

        gsap.set(s.fill, { left: x, top: y, backgroundColor: hover.bg });
        // Pin the resting colours as plain rgb so GSAP tweens between matching formats
        gsap.set(el, { color: rest.text, ...edge(rest.border) });

        // Icon badge: its own resting colours come from its classes, hovered ones from data-reveal-icon
        s.badge = undefined;
        const badge = el.querySelector<HTMLElement>("[data-reveal-icon]");
        const badgeClasses = badge?.getAttribute("data-reveal-icon");

        if (badge && badgeClasses) {
            const bcs = getComputedStyle(badge);
            const m = measure(badge, badgeClasses);
            const angle = badgeClasses.match(/(?:^|\s)(-?)rotate-(\d+)(?=\s|$)/);

            const badgeRest: Pair = {
                bg: flatten(bcs.backgroundColor, restBg),
                text: flatten(bcs.color, restBg),
            };

            s.badge = {
                el: badge,
                rest: badgeRest,
                hover: {
                    bg: isTransparent(m.bg) ? badgeRest.bg : flatten(m.bg, hover.bg),
                    text: m.text !== bcs.color ? flatten(m.text, hover.bg) : badgeRest.text,
                },
                rotate: angle ? (angle[1] ? -1 : 1) * Number(angle[2]) : 0,
            };

            gsap.set(badge, { color: badgeRest.text, backgroundColor: badgeRest.bg });
        }
    }

    if (!s.hover) return;

    // Scale just far enough to reach the farthest corner from wherever the circle currently is
    const cx = parseFloat(String(gsap.getProperty(s.fill, "left")));
    const cy = parseFloat(String(gsap.getProperty(s.fill, "top")));
    const reach =
        Math.hypot(Math.max(cx, el.clientWidth - cx), Math.max(cy, el.clientHeight - cy)) + 1;

    gsap.to(s.fill, {
        scale: reach / FILL_RADIUS,
        duration: DURATION,
        ease: EASE,
        overwrite: "auto",
    });
    gsap.to(el, {
        color: s.hover.text,
        ...edge(s.hover.border),
        duration: DURATION,
        ease: EASE,
        overwrite: "auto",
    });

    if (s.badge) {
        gsap.to(s.badge.el, {
            color: s.badge.hover.text,
            backgroundColor: s.badge.hover.bg,
            duration: DURATION,
            ease: EASE,
            overwrite: "auto",
        });

        const svg = s.badge.el.querySelector("svg");
        if (svg && s.badge.rotate) {
            gsap.to(svg, { rotation: s.badge.rotate, duration: DURATION, ease: EASE, overwrite: "auto" });
        }
    }
};

const leave = (el: HTMLElement, e?: PointerEvent) => {
    const s = fx.get(el);
    if (!s) return;

    if (s.moving) {
        gsap.to(s.moving, { yPercent: 0, duration: 0.8, ease: "expo.out", overwrite: "auto" });
    }

    if (!s.fill || !s.rest) return;

    // The circle closes back toward the badge/icon, or toward where the pointer left
    const { x, y } = origin(el, e);

    gsap.to(s.fill, {
        left: x,
        top: y,
        scale: 0,
        duration: DURATION,
        ease: EASE,
        overwrite: "auto",
    });
    gsap.to(el, {
        color: s.rest.text,
        ...edge(s.rest.border),
        duration: DURATION,
        ease: EASE,
        overwrite: "auto",
        onComplete: () => {
            gsap.set(el, { clearProps: "color,borderColor" }); // hand colours back to your classes
        },
    });

    if (s.badge) {
        const { el: badge, rest } = s.badge;

        gsap.to(badge, {
            color: rest.text,
            backgroundColor: rest.bg,
            duration: DURATION,
            ease: EASE,
            overwrite: "auto",
            onComplete: () => {
                gsap.set(badge, { clearProps: "color,backgroundColor" });
            },
        });

        const svg = badge.querySelector("svg");
        if (svg && s.badge.rotate) {
            gsap.to(svg, { rotation: 0, duration: DURATION, ease: EASE, overwrite: "auto" });
        }
    }
};

export const useButtonEffects = () => {
    useEffect(() => {
        const canHover = window.matchMedia("(hover: hover)");
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");

        const find = (t: EventTarget | null) =>
            (t as Element | null)?.closest<HTMLElement>("[data-roll],[data-reveal]") ?? null;

        // Delegated, so buttons added later (route changes, modals) just work
        const onOver = (e: PointerEvent) => {
            const el = find(e.target);
            if (!el || !canHover.matches || reduce.matches) return;
            if (el.contains(e.relatedTarget as Node | null)) return;
            enter(el, e);
        };

        const onOut = (e: PointerEvent) => {
            const el = find(e.target);
            if (!el || el.contains(e.relatedTarget as Node | null)) return;
            leave(el, e);
        };

        const onFocusIn = (e: FocusEvent) => {
            const el = find(e.target);
            if (!el || reduce.matches || !el.matches(":focus-visible")) return;
            enter(el);
        };

        const onFocusOut = (e: FocusEvent) => {
            const el = find(e.target);
            if (el) leave(el);
        };

        document.addEventListener("pointerover", onOver);
        document.addEventListener("pointerout", onOut);
        document.addEventListener("focusin", onFocusIn);
        document.addEventListener("focusout", onFocusOut);

        return () => {
            document.removeEventListener("pointerover", onOver);
            document.removeEventListener("pointerout", onOut);
            document.removeEventListener("focusin", onFocusIn);
            document.removeEventListener("focusout", onFocusOut);
        };
    }, []);
};

// Layouts are server components, so mount the hook through this
const ButtonEffects = () => {
    useButtonEffects();
    return null;
};

export default ButtonEffects;