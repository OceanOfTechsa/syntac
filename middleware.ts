// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {
    const { pathname } = request.nextUrl;

    // 1. Check if maintenance mode is enabled
    const isMaintenanceMode = process.env.MAINTENANCE_MODE === "true";
    const isComingSoonMode = process.env.COMING_SOON_MODE === "true";

    // 2. Allow these paths even during maintenance
    const allowedPaths = [
        "/maintenance",
        "/coming-soon",
        "/api",          // keep APIs working if needed
        "/_next",        // next.js assets
        "/favicon.ico",
        "/robots.txt",
    ];

    const isAllowedPath = allowedPaths.some((path) =>
        pathname.startsWith(path)
    );

    // 3. Optional: Allow specific IPs or secret bypass
    const bypassToken = request.cookies.get("maintenance_bypass")?.value;
    const hasBypass =
        bypassToken === process.env.MAINTENANCE_BYPASS_SECRET;

    // 4. Redirect logic
    if (isMaintenanceMode && !isAllowedPath && !hasBypass) {
        const url = request.nextUrl.clone();
        url.pathname = "/maintenance";
        return NextResponse.rewrite(url); // or .redirect(url)
    }

    if (isComingSoonMode && !isAllowedPath && !hasBypass) {
        const url = request.nextUrl.clone();
        url.pathname = "/coming-soon";
        return NextResponse.rewrite(url);
    }

    return NextResponse.next();
}

// 5. Matcher - run on all routes except static files
export const config = {
    matcher: [
        /*
         * Match all request paths except:
         * - _next/static (static files)
         * - _next/image (image optimization)
         * - favicon.ico, sitemap.xml, robots.txt
         */
        "/((?!_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)",
    ],
};