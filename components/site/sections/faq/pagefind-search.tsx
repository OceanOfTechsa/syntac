"use client";

import * as React from "react";
import Link from "next/link";
import {CornerDownRight, LoaderCircle, Search, X} from "lucide-react";

import { cn } from "@/lib/utils";

/* ----------------------------- Pagefind types ----------------------------- */

interface PagefindSubResult {
    title: string;
    url: string;
    excerpt: string;
}

interface PagefindResultData {
    url: string;
    excerpt: string;
    meta: { title?: string };
    sub_results: PagefindSubResult[];
}

interface PagefindResult {
    id: string;
    data: () => Promise<PagefindResultData>;
}

interface PagefindModule {
    debouncedSearch: (
        term: string,
        options?: Record<string, unknown>,
        debounceTimeoutMs?: number,
    ) => Promise<{ results: PagefindResult[] } | null>;
}

/* ------------------------------- Pagefind IO ------------------------------ */

const PAGEFIND_PATH = "/pagefind/pagefind.js";
const PAGE_SIZE = 5;
const MAX_SUB_RESULTS = 3;

let pagefindPromise: Promise<PagefindModule> | null = null;

function loadPagefind(): Promise<PagefindModule> {
    if (!pagefindPromise) {
        // loaded from /public at runtime, so the bundler must not try to resolve it
        pagefindPromise = import(
            /* webpackIgnore: true */ /* turbopackIgnore: true */ PAGEFIND_PATH
            ) as Promise<PagefindModule>;
        pagefindPromise.catch(() => {
            pagefindPromise = null; // allow a retry if the index wasn't there yet
        });
    }
    return pagefindPromise;
}

/* ------------------------------ Excerpt render ----------------------------- */

const ENTITIES: Record<string, string> = {
    "&lt;": "<",
    "&gt;": ">",
    "&amp;": "&",
    "&quot;": '"',
    "&#x27;": "'",
    "&#39;": "'",
};

const decode = (text: string) =>
    text.replace(/&(?:lt|gt|amp|quot|#x27|#39);/g, (m) => ENTITIES[m] ?? m);

/** Pagefind indexes the built .html files, so turn /blog/post.html#x into /blog/post#x. */
const cleanUrl = (url: string) =>
    url
        .replace(/\/index\.html(?=$|[#?])/, "/")
        .replace(/\.html(?=$|[#?])/, "");

/** Renders Pagefind's excerpt (text + <mark>) without dangerouslySetInnerHTML. */
function Excerpt({ html }: { html: string }) {
    const parts = html.split(/(<mark>[\s\S]*?<\/mark>)/);

    return (
        <p className="text-muted-foreground mt-1 text-sm leading-relaxed">
            {parts.map((part, i) =>
                part.startsWith("<mark>") ? (
                    <mark
                        key={i}
                        className="bg-yellow-300 text-black px-0.5"
                    >
                        {decode(part.slice(6, -7))}
                    </mark>
                ) : (
                    <React.Fragment key={i}>{decode(part)}</React.Fragment>
                ),
            )}
        </p>
    );
}

/* -------------------------------- Component -------------------------------- */

type Status = "idle" | "loading" | "ready" | "error";

interface PagefindSearchProps {
    /** Pre-fills the box, e.g. from ?q= on the page. */
    initialQuery?: string;
    placeholder?: string;
    className?: string;
}

const PagefindSearch = ({
                            initialQuery = "",
                            placeholder = "Search",
                            className,
                        }: PagefindSearchProps) => {
    const [query, setQuery] = React.useState(initialQuery);
    const [status, setStatus] = React.useState<Status>("idle");
    const [results, setResults] = React.useState<PagefindResultData[]>([]);
    const [total, setTotal] = React.useState(0);
    const [loadingMore, setLoadingMore] = React.useState(false);
    const rawResults = React.useRef<PagefindResult[]>([]);

    // run a search whenever the query changes
    React.useEffect(() => {
        const term = query.trim();

        if (!term) {
            rawResults.current = [];
            setResults([]);
            setTotal(0);
            setStatus("idle");
            return;
        }

        let cancelled = false;
        setStatus("loading");

        (async () => {
            try {
                const pagefind = await loadPagefind();
                const search = await pagefind.debouncedSearch(term, {}, 250);

                // null means a newer search replaced this one
                if (cancelled || search === null) return;

                rawResults.current = search.results;
                const first = await Promise.all(
                    search.results.slice(0, PAGE_SIZE).map((r) => r.data()),
                );
                if (cancelled) return;

                setTotal(search.results.length);
                setResults(first);
                setStatus("ready");
            } catch {
                if (!cancelled) setStatus("error");
            }
        })();

        return () => {
            cancelled = true;
        };
    }, [query]);

    const handleChange = (value: string) => {
        setQuery(value);

        // keep ?q= in the address bar so Back / shared links return to the same search
        const url = new URL(window.location.href);
        if (value.trim()) url.searchParams.set("q", value);
        else url.searchParams.delete("q");
        window.history.replaceState(null, "", url);
    };

    const loadMore = async () => {
        setLoadingMore(true);
        try {
            const next = await Promise.all(
                rawResults.current
                    .slice(results.length, results.length + PAGE_SIZE)
                    .map((r) => r.data()),
            );
            setResults((prev) => [...prev, ...next]);
        } finally {
            setLoadingMore(false);
        }
    };

    const term = query.trim();

    return (
        <div className={cn("w-full", className)}>
            <form
                role="search"
                aria-label="Search this site"
                onSubmit={(e) => e.preventDefault()}
                className="relative"
            >
                <Search
                    className="text-muted-foreground pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2"
                    aria-hidden="true"
                />
                <input
                    type="text"
                    value={query}
                    onChange={(e) => handleChange(e.target.value)}
                    placeholder={placeholder}
                    title="Search"
                    autoCapitalize="none"
                    autoComplete="off"
                    enterKeyHint="search"
                    aria-label="Search"
                    className="bg-background h-12 w-full rounded-md border pr-24 pl-12 text-base outline-none focus:border-primary transition-colors duration-500 ease-in-out"
                />
                {query && (
                    <button
                        type="button"
                        onClick={() => handleChange("")}
                        className="cursor-pointer text-muted-foreground hover:text-foreground absolute top-1/2 right-3 inline-flex -translate-y-1/2 items-center gap-1 rounded-md px-2 py-1 text-sm transition-colors"
                    >
                        <X className="size-4" aria-hidden="true" />
                        Clear
                    </button>
                )}
            </form>

            <div className="mt-6" aria-live="polite">
                {status === "loading" && (
                    <p className="text-muted-foreground text-sm flex items-center gap-2"><LoaderCircle size={16} className={'animate-spin'} /> Searching…</p>
                )}

                {status === "error" && (
                    <p className="text-muted-foreground text-sm">
                        Search isn&apos;t available yet. The search index is
                        created when the site is built.
                    </p>
                )}

                {status === "ready" && (
                    <p className="text-muted-foreground text-sm">
                        {total === 0
                            ? `No results for “${term}”`
                            : `${total} ${total === 1 ? "result" : "results"} for “${term}”`}
                    </p>
                )}
            </div>

            {status === "ready" && results.length > 0 && (
                <>
                    <ol className="mt-4 divide-y divide-dashed border-y border-dashed">
                        {results.map((result) => {
                            const nested = result.sub_results
                                .filter((sub) => sub.url.includes("#"))
                                .slice(0, MAX_SUB_RESULTS);

                            return (
                                <li key={result.url} className="py-6">
                                    <Link
                                        href={cleanUrl(result.url)}
                                        className="hover:text-primary text-lg font-medium transition-colors"
                                    >
                                        {result.meta.title ?? result.url}
                                    </Link>

                                    {nested.length === 0 ? (
                                        <Excerpt html={result.excerpt} />
                                    ) : (
                                        <div className="mt-3 flex flex-col gap-4">
                                            {nested.map((sub) => (
                                                <div
                                                    key={sub.url}
                                                    className="pl-2"
                                                >
                                                    <Link
                                                        href={cleanUrl(sub.url)}
                                                        className="hover:text-primary text-sm font-medium transition-colors flex items-center gap-1"
                                                    >
                                                        <CornerDownRight  size={15}/>
                                                        {sub.title}
                                                    </Link>
                                                    <Excerpt html={sub.excerpt} />
                                                </div>
                                            ))}
                                        </div>
                                    )}
                                </li>
                            );
                        })}
                    </ol>

                    {results.length < total && (
                        <button
                            type="button"
                            onClick={loadMore}
                            disabled={loadingMore}
                            data-roll
                            className="mt-6 inline-flex h-10 shrink-0 cursor-pointer items-center justify-center gap-2 rounded-sm bg-primary px-6 text-base font-medium whitespace-nowrap text-primary-foreground outline-none transition-all hover:bg-primary/80 focus-visible:ring-[3px] focus-visible:ring-ring/50 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4"
                        >
                            {loadingMore ? "Loading…" : "Load more results"}
                        </button>
                    )}
                </>
            )}
        </div>
    );
};

export default PagefindSearch;