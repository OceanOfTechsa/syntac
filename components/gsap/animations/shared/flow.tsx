/**
 * Data shape + helper for the reusable flow diagram.
 *
 * Kept in its own file WITHOUT "use client" so server code (your case study data,
 * the [slug] page) can import and call `chain` freely.
 */

export type FlowVariant =
    | "start"    // large circle, the entry point
    | "default"  // quiet outlined pill (simple website / sitemap flows)
    | "accent"   // pill with a primary-colour outline
    | "page"     // blue    - a screen or page
    | "action"   // green   - something the user does (create, add)
    | "detail"   // grey    - a detail / sub view
    | "danger"   // rose    - destructive step (delete)
    | "cta"      // purple  - call to action
    | "gate";    // amber   - a gateway such as "Enter app"

export interface FlowNode {
    label: string;
    variant?: FlowVariant;
    /** Short text on the connector leading INTO this node, e.g. "Admin only" */
    edgeLabel?: string;
    children?: FlowNode[];
}

type ChainItem = string | FlowNode;

const toNode = (item: ChainItem): FlowNode =>
    typeof item === "string" ? {label: item} : {...item};

/**
 * Builds a straight run of nodes: A -> B -> C -> D.
 * Optionally branches out from the LAST node into `branches`.
 *
 *   chain(["About Us", "Brand Introduction", "Trust"])
 *   chain([{label: "Start", variant: "start"}, "Sign In", "Home"], [aboutBranch, pricingBranch])
 */
export const chain = (items: ChainItem[], branches?: FlowNode[]): FlowNode => {
    if (items.length === 0) throw new Error("chain() needs at least one item");

    const nodes = items.map(toNode);
    const last = nodes[nodes.length - 1];
    if (branches?.length) last.children = branches;

    for (let i = nodes.length - 2; i >= 0; i--) {
        nodes[i].children = [nodes[i + 1]];
    }

    return nodes[0];
};