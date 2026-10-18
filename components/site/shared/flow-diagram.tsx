"use client";

import React, {Children, Fragment, isValidElement, useCallback, useEffect, useLayoutEffect, useMemo, useRef, useState} from "react";
import type {ReactNode} from "react";

import {cn} from "@/lib/utils";
import {gsap} from "@/lib/gsap";
import {motion} from "@/lib/gsap/presets";
import SectionHeader from "@/components/site/shared/section-header";
import {chain, FlowNode, FlowVariant} from "@/components/gsap/animations/shared/flow";


/* -------------------------------------------------------------------------- */
/*  Constants                                                                 */
/* -------------------------------------------------------------------------- */

export type FlowDirection = "vertical" | "horizontal";

// vertical: parents above children (sitemaps, marketing sites)
// horizontal: parents left of children (systems, dashboards with many modules)
const LAYOUT: Record<FlowDirection, {item: string; children: string}> = {
    vertical: {
        item: "flex-col items-center",
        children: "mt-14 gap-x-8 flex-row items-start justify-center",
    },
    horizontal: {
        item: "flex-row items-center",
        children: "ml-16 gap-y-3 flex-col items-start",
    },
};

const CORNER_RADIUS = 12;           // rounding of the elbow connectors
const START_GAP = 4;                // connector starts slightly away from the parent
const END_GAP = 4;                  // and stops slightly before the child
const ARROW_SIZE = 4;

const STEP = 0.5;                   // seconds between one depth level and the next in the reveal
const LINE_FROM_OPACITY = 0.15;     // connectors start faded, then grow to full strength as they draw

const NODE_BASE =
    "whitespace-nowrap border border-border bg-background text-foreground/80 transition-colors duration-300 hover:border-foreground/40 motion-safe:opacity-0";

// Soft tinted boxes: colour carries the meaning, the style stays quiet
const BOX = "rounded-sm px-3 py-1.5 text-xs font-medium";

const VARIANTS: Record<FlowVariant, string> = {
    default: "rounded-full px-4 py-1.5 text-sm",
    accent: "rounded-full border-primary/40 px-4 py-1.5 text-sm text-primary",
    start: "flex size-24 items-center justify-center rounded-full bg-muted text-lg text-foreground",
    page: `${BOX} border-blue-500/40 bg-blue-500/10 text-blue-700 dark:text-blue-300`,
    action: `${BOX} border-green-500/40 bg-green-500/10 text-green-700 dark:text-green-300`,
    detail: `${BOX} border-border bg-muted text-muted-foreground`,
    danger: `${BOX} border-rose-500/40 bg-rose-500/10 text-rose-700 dark:text-rose-300`,
    cta: `${BOX} border-purple-500/40 bg-purple-500/10 text-purple-700 dark:text-purple-300`,
    gate: `${BOX} border-amber-500/40 bg-amber-500/10 text-amber-700 dark:text-amber-300`,
};

const prefersReducedMotion = () =>
    typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* -------------------------------------------------------------------------- */
/*  Tree helpers                                                              */
/* -------------------------------------------------------------------------- */

interface Edge {
    from: string;
    to: string;
    depth: number;
    label?: string;
}

interface PlacedEdge {
    id: string;
    depth: number;
    d: string;
    arrow: string;
    label?: {text: string; x: number; y: number; anchor: "start" | "middle"};
}

interface Layout {
    width: number;
    height: number;
    edges: PlacedEdge[];
    animate: boolean;
}

// Nodes get path-style ids ("0", "0.1", "0.1.0") so the data never needs ids of its own
const collectEdges = (node: FlowNode, id = "0", depth = 0, out: Edge[] = []): Edge[] => {
    node.children?.forEach((child, i) => {
        const childId = `${id}.${i}`;
        out.push({from: id, to: childId, depth: depth + 1, label: child.edgeLabel});
        collectEdges(child, childId, depth + 1, out);
    });
    return out;
};

// Straight line when aligned, otherwise a rounded elbow
const buildPath = (direction: FlowDirection, x1: number, y1: number, x2: number, y2: number) => {
    if (direction === "vertical") {
        const dx = x2 - x1;
        if (Math.abs(dx) < 1) return `M ${x1} ${y1} V ${y2}`;

        const r = Math.min(CORNER_RADIUS, Math.abs(dx) / 2, (y2 - y1) / 4);
        const dir = Math.sign(dx);
        const ym = y1 + (y2 - y1) / 2;

        return [
            `M ${x1} ${y1}`,
            `V ${ym - r}`,
            `Q ${x1} ${ym} ${x1 + dir * r} ${ym}`,
            `H ${x2 - dir * r}`,
            `Q ${x2} ${ym} ${x2} ${ym + r}`,
            `V ${y2}`,
        ].join(" ");
    }

    const dy = y2 - y1;
    if (Math.abs(dy) < 1) return `M ${x1} ${y1} H ${x2}`;

    const r = Math.min(CORNER_RADIUS, Math.abs(dy) / 2, (x2 - x1) / 4);
    const dir = Math.sign(dy);
    const xm = x1 + (x2 - x1) / 2;

    return [
        `M ${x1} ${y1}`,
        `H ${xm - r}`,
        `Q ${xm} ${y1} ${xm} ${y1 + dir * r}`,
        `V ${y2 - dir * r}`,
        `Q ${xm} ${y2} ${xm + r} ${y2}`,
        `H ${x2}`,
    ].join(" ");
};

/* -------------------------------------------------------------------------- */
/*  JSX API: <FlowItem> / <FlowChain> describe the tree, nothing is rendered   */
/* -------------------------------------------------------------------------- */

interface FlowItemProps {
    label: string;
    variant?: FlowVariant;
    /** Text on the connector leading into this node */
    edgeLabel?: string;
    /** Nested <FlowItem> / <FlowChain> become the branches below this node */
    children?: ReactNode;
}

interface FlowChainProps {
    /** A straight run of nodes, in order */
    items: (string | {label: string; variant?: FlowVariant; edgeLabel?: string})[];
    /** Nested <FlowItem> / <FlowChain> branch out from the LAST item */
    children?: ReactNode;
}

/** One node. Nest more <FlowItem>s inside it to branch. */
export function FlowItem(_props: FlowItemProps): null {
    return null;
}

/** A run of nodes: A -> B -> C. Nest items inside it to branch from the last one. */
export function FlowChain(_props: FlowChainProps): null {
    return null;
}

// Reads the JSX tree (by props, so it also works when the elements come from a server component)
const nodesFromChildren = (children: ReactNode): FlowNode[] => {
    const out: FlowNode[] = [];

    Children.forEach(children, (child) => {
        if (!isValidElement(child)) return;

        const props = child.props as Partial<FlowItemProps & FlowChainProps>;

        if (child.type === Fragment) {
            out.push(...nodesFromChildren(props.children));
            return;
        }

        const branches = nodesFromChildren(props.children);

        if (Array.isArray(props.items) && props.items.length > 0) {
            out.push(chain(props.items, branches));
        } else if (typeof props.label === "string") {
            out.push({
                label: props.label,
                variant: props.variant,
                edgeLabel: props.edgeLabel,
                children: branches.length ? branches : undefined,
            });
        }
    });

    return out;
};

/* -------------------------------------------------------------------------- */
/*  Branch (a node + everything below it)                                     */
/* -------------------------------------------------------------------------- */

interface FlowBranchProps {
    node: FlowNode;
    id: string;
    depth: number;
    direction: FlowDirection;
}

const FlowBranch = ({node, id, depth, direction}: FlowBranchProps) => (
    <li className={cn("flex", LAYOUT[direction].item)}>
        <div
            data-flow-id={id}
            data-depth={depth}
            className={cn(NODE_BASE, VARIANTS[node.variant ?? "default"])}
        >
            {node.label}
        </div>

        {node.children && node.children.length > 0 && (
            <ul className={cn("flex", LAYOUT[direction].children)}>
                {node.children.map((child, i) => (
                    <FlowBranch
                        key={`${id}.${i}`}
                        node={child}
                        id={`${id}.${i}`}
                        depth={depth + 1}
                        direction={direction}
                    />
                ))}
            </ul>
        )}
    </li>
);

/* -------------------------------------------------------------------------- */
/*  Diagram                                                                   */
/* -------------------------------------------------------------------------- */

interface FlowDiagramProps {
    /** Either pass the tree as data... */
    root?: FlowNode;
    /** ...or describe it with <FlowItem> / <FlowChain> children */
    children?: ReactNode;
    /** "vertical" (default) for sitemaps, "horizontal" for systems with many modules */
    direction?: FlowDirection;
    className?: string;
}

export function FlowDiagram({root: rootProp, children, direction = "vertical", className}: FlowDiagramProps) {
    const contentRef = useRef<HTMLDivElement>(null);
    const ctxRef = useRef<ReturnType<typeof gsap.context> | null>(null);
    const playedRef = useRef(false);
    const [layout, setLayout] = useState<Layout | null>(null);

    const root = useMemo(() => rootProp ?? nodesFromChildren(children)[0] ?? null, [rootProp, children]);
    const edges = useMemo(() => (root ? collectEdges(root) : []), [root]);
    const maxDepth = useMemo(() => edges.reduce((m, e) => Math.max(m, e.depth), 0), [edges]);

    // Measure real node positions (offset* ignores transforms, so it is safe mid-animation)
    const measure = useCallback(() => {
        const content = contentRef.current;
        if (!content) return;

        const find = (id: string) => content.querySelector<HTMLElement>(`[data-flow-id="${id}"]`);
        const placed: PlacedEdge[] = [];

        for (const edge of edges) {
            const parent = find(edge.from);
            const child = find(edge.to);
            if (!parent || !child) continue;

            let x1: number, y1: number, x2: number, y2: number, arrow: string;
            let label: PlacedEdge["label"];

            if (direction === "vertical") {
                x1 = parent.offsetLeft + parent.offsetWidth / 2;
                y1 = parent.offsetTop + parent.offsetHeight + START_GAP;
                x2 = child.offsetLeft + child.offsetWidth / 2;
                y2 = child.offsetTop - END_GAP;
                arrow = `M ${x2 - ARROW_SIZE} ${y2 - ARROW_SIZE} L ${x2} ${y2} L ${x2 + ARROW_SIZE} ${y2 - ARROW_SIZE}`;
                if (edge.label) label = {text: edge.label, x: x2 + 8, y: y2 - 10, anchor: "start"};
            } else {
                x1 = parent.offsetLeft + parent.offsetWidth + START_GAP;
                y1 = parent.offsetTop + parent.offsetHeight / 2;
                x2 = child.offsetLeft - END_GAP;
                y2 = child.offsetTop + child.offsetHeight / 2;
                arrow = `M ${x2 - ARROW_SIZE} ${y2 - ARROW_SIZE} L ${x2} ${y2} L ${x2 - ARROW_SIZE} ${y2 + ARROW_SIZE}`;
                if (edge.label) {
                    const xm = x1 + (x2 - x1) / 2;
                    label = {text: edge.label, x: (xm + x2) / 2, y: y2 - 6, anchor: "middle"};
                }
            }

            placed.push({id: edge.to, depth: edge.depth, d: buildPath(direction, x1, y1, x2, y2), arrow, label});
        }

        setLayout((prev) => ({
            width: content.offsetWidth,
            height: content.offsetHeight,
            edges: placed,
            animate: prev ? prev.animate : !prefersReducedMotion(),
        }));
    }, [edges, direction]);

    useLayoutEffect(() => {
        measure();
    }, [measure]);

    // Re-measure when the diagram's size changes (data change, fonts loading in)
    useEffect(() => {
        const content = contentRef.current;
        if (!content) return;

        let frame = 0;
        const schedule = () => {
            cancelAnimationFrame(frame);
            frame = requestAnimationFrame(measure);
        };

        const observer = new ResizeObserver(schedule);
        observer.observe(content);
        document.fonts?.ready.then(schedule);

        return () => {
            cancelAnimationFrame(frame);
            observer.disconnect();
        };
    }, [measure]);

    // Reveal once, level by level: line grows from faded, arrow lands, then the node fades in
    useLayoutEffect(() => {
        const content = contentRef.current;
        if (!layout?.animate || playedRef.current || !content) return;

        playedRef.current = true;
        const horizontal = direction === "horizontal";

        ctxRef.current = gsap.context(() => {
            const tl = gsap.timeline({
                scrollTrigger: {trigger: content, start: "top 85%", once: true},
            });

            for (let depth = 0; depth <= maxDepth; depth++) {
                const at = depth * STEP;

                const nodes = content.querySelectorAll(`[data-flow-id][data-depth="${depth}"]`);
                const paths = content.querySelectorAll(`[data-edge-path][data-depth="${depth}"]`);
                const arrows = content.querySelectorAll(`[data-edge-arrow][data-depth="${depth}"]`);
                const labels = content.querySelectorAll(`[data-edge-label][data-depth="${depth}"]`);

                // 1. The connector starts faded and grows towards the node: it draws and strengthens together
                if (paths.length) {
                    tl.fromTo(
                        paths,
                        {strokeDashoffset: 1, opacity: LINE_FROM_OPACITY},
                        {strokeDashoffset: 0, opacity: 1, duration: 0.65, ease: "power2.out"},
                        Math.max(0, at - 0.15)
                    );
                }

                // 2. The arrowhead and any connector label settle in as the line arrives
                if (arrows.length) {
                    tl.fromTo(
                        arrows,
                        horizontal ? {opacity: 0, x: -4} : {opacity: 0, y: -4},
                        horizontal
                            ? {opacity: 1, x: 0, duration: 0.3, ease: "power2.out"}
                            : {opacity: 1, y: 0, duration: 0.3, ease: "power2.out"},
                        at + 0.35
                    );
                }

                if (labels.length) {
                    tl.fromTo(labels, {opacity: 0}, {opacity: 1, duration: 0.3, ease: "none"}, at + 0.35);
                }

                // 3. The node fades in last
                if (nodes.length) {
                    tl.fromTo(
                        nodes,
                        horizontal ? {opacity: 0, x: -10} : {opacity: 0, y: 10},
                        horizontal
                            ? {opacity: 1, x: 0, duration: 0.5, ease: motion.ease.smooth, stagger: 0.05}
                            : {opacity: 1, y: 0, duration: 0.5, ease: motion.ease.smooth, stagger: 0.06},
                        depth === 0 ? 0 : at + 0.25
                    );
                }
            }
        }, content);
    }, [layout, maxDepth, direction]);

    // Clean up on unmount (also resets properly under React strict mode)
    useEffect(() => {
        return () => {
            ctxRef.current?.revert();
            ctxRef.current = null;
            playedRef.current = false;
        };
    }, []);

    if (!root) return null;

    return (
        // The wrapper scrolls sideways on small screens; auto margins keep the diagram centred otherwise
        <div className={cn("w-full overflow-x-auto px-4 py-2 sm:px-6", className)}>
            <div ref={contentRef} className="relative mx-auto w-max">
                <ul className="flex items-center justify-center">
                    <FlowBranch node={root} id="0" depth={0} direction={direction} />
                </ul>

                {layout && (
                    <svg
                        aria-hidden
                        width={layout.width}
                        height={layout.height}
                        fill="none"
                        stroke="currentColor"
                        className="pointer-events-none absolute left-0 top-0 overflow-visible text-muted-foreground"
                    >
                        <g opacity={0.5} strokeWidth={1.25}>
                            {layout.edges.map((edge) => (
                                <path
                                    key={edge.id}
                                    data-edge-path
                                    data-depth={edge.depth}
                                    d={edge.d}
                                    pathLength={1}
                                    style={layout.animate ? {strokeDasharray: 1, strokeDashoffset: 1, opacity: LINE_FROM_OPACITY} : undefined}
                                />
                            ))}
                        </g>
                        <g opacity={0.5} strokeWidth={1.25} strokeLinecap="round" strokeLinejoin="round">
                            {layout.edges.map((edge) => (
                                <path
                                    key={edge.id}
                                    data-edge-arrow
                                    data-depth={edge.depth}
                                    d={edge.arrow}
                                    style={layout.animate ? {opacity: 0} : undefined}
                                />
                            ))}
                        </g>
                        <g stroke="none" fill="currentColor" fontSize={10}>
                            {layout.edges.map((edge) =>
                                edge.label ? (
                                    <text
                                        key={edge.id}
                                        data-edge-label
                                        data-depth={edge.depth}
                                        x={edge.label.x}
                                        y={edge.label.y}
                                        textAnchor={edge.label.anchor}
                                        style={layout.animate ? {opacity: 0} : undefined}
                                    >
                                        {edge.label.text}
                                    </text>
                                ) : null
                            )}
                        </g>
                    </svg>
                )}
            </div>
        </div>
    );
}

/* -------------------------------------------------------------------------- */
/*  Section wrapper for the case study page                                   */
/* -------------------------------------------------------------------------- */

interface FlowSectionProps {
    flow?: FlowNode;
    children?: ReactNode;
    direction?: FlowDirection;
    preTitle?: string;
    title?: string;
    markedWord?: string;
    desc?: string;
}

export function FlowSection({
                                flow,
                                children,
                                direction,
                                preTitle = "User Flow",
                                title = "How Users Move Through the Product",
                                markedWord = "Move",
                                desc = "A map of the key journeys we designed for, from the first visit through to the moment a user takes action.",
                            }: FlowSectionProps) {
    return (
        <section id={'flow'} className="space-y-12 py-8 sm:space-y-16 sm:py-16 lg:py-24 bg-dot-grid-less-opacity">
            <SectionHeader preTitle={preTitle} title={title} markedWord={markedWord} desc={desc} />
            <FlowDiagram root={flow} direction={direction}>{children}</FlowDiagram>
        </section>
    );
}

export default FlowDiagram;