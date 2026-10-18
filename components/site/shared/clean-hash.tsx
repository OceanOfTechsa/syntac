"use client"

import { useEffect } from "react"
import { usePathname } from "next/navigation"

export function CleanHash() {
    const pathname = usePathname()

    useEffect(() => {
        // If there is any hash, remove it (keeps path + query)
        if (window.location.hash) {
            window.history.replaceState(
                null,
                "",
                window.location.pathname + window.location.search,
            )
        }
    }, [pathname])

    return null
}