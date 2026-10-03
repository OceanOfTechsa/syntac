"use client"

import { useEffect } from "react"
import { usePathname, useSearchParams } from "next/navigation"

export function CleanHash() {
    const pathname = usePathname()
    const searchParams = useSearchParams()

    useEffect(() => {
        if (typeof window === "undefined") return

        // If there is any hash, remove it
        if (window.location.hash) {
            // Build the clean URL (path + query, no hash)
            const cleanUrl =
                pathname +
                (searchParams.toString() ? `?${searchParams.toString()}` : "")

            // This updates the URL bar immediately
            window.history.replaceState(null, "", cleanUrl)
        }
    }, [pathname, searchParams])

    return null
}