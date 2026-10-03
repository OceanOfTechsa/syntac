import { NextResponse } from "next/server";

export async function GET() {
    const response = NextResponse.redirect(new URL("/", process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:44300"));

    response.cookies.set("maintenance_bypass", process.env.MAINTENANCE_BYPASS_SECRET!, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
    });

    return response;
}