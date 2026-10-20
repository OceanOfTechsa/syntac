// scripts/build-search-index.mjs
// Runs after `next build`. Builds the Pagefind index from the prerendered HTML,
// prints what it found, and never fails the deploy.
import { existsSync, readdirSync } from "node:fs";
import { join } from "node:path";
import { spawnSync } from "node:child_process";

const CANDIDATES = [".next/server/app", ".next/server/pages"];
const OUTPUT = "public/pagefind";

function countHtml(dir) {
    if (!existsSync(dir)) return 0;
    let count = 0;
    for (const entry of readdirSync(dir, { withFileTypes: true })) {
        const path = join(dir, entry.name);
        if (entry.isDirectory()) count += countHtml(path);
        else if (entry.name.endsWith(".html")) count++;
    }
    return count;
}

const site = CANDIDATES.find((dir) => countHtml(dir) > 0);

if (!site) {
    console.warn("[search] No prerendered HTML files found, so no search index was built.");
    for (const dir of CANDIDATES) {
        console.warn(
            `[search]   ${dir}: ${existsSync(dir) ? `exists, ${readdirSync(dir).length} entries` : "does not exist"}`,
        );
    }
    console.warn(
        "[search] Pages must be static (shown as ○ or ● in the build route table) to be indexed.",
    );
    process.exit(0);
}

console.log(`[search] Indexing ${countHtml(site)} HTML files from ${site}`);

const result = spawnSync("npx", ["pagefind", "--site", site, "--output-path", OUTPUT], {
    stdio: "inherit",
    shell: true,
});

if (result.status !== 0) {
    console.warn("[search] Pagefind exited with an error. Continuing without a search index.");
}

process.exit(0);
