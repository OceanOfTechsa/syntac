"use client"

import { JSX, useEffect, useState } from "react"
import { ThemeSwitch } from "@/components/site/theme-switch"
import { Moon, Sun } from "lucide-react"
import { cn } from "@/lib/utils"
import {useTheme} from "next-themes";

interface IThemeSwitcherProps {
    showSwitcherOnMobile?: boolean
    className?: string
    height?: string
    width?: string
}

const ThemeSwitcher = ({
                           showSwitcherOnMobile = false,
                           className,
                           height = "h-3",
                           width = "w-3",
                       }: IThemeSwitcherProps): JSX.Element | null => {
    const { setTheme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    // Prevent hydration mismatch
    if (!mounted) return null

    const isDark: boolean = resolvedTheme === "dark"

    const toggleTheme = (checked: boolean) => {
        setTheme(checked ? "dark" : "light")
    }

    return (
        <ThemeSwitch
            checked={isDark}
            onCheckedChange={toggleTheme}
            aria-label="Toggle theme"
            data-cursor-hide
            className={cn("transition-all duration-600",
                !showSwitcherOnMobile && "hidden sm:inline-flex",
                className
            )}
        >
            <Sun
                className={cn(
                    height,
                    width,
                    "absolute transition-all duration-600",
                    isDark
                        ? "scale-0 rotate-90 opacity-0"
                        : "scale-100 rotate-0 opacity-100"
                )}
            />

            <Moon
                className={cn(
                    height,
                    width,
                    "absolute transition-all duration-600",
                    isDark
                        ? "scale-100 rotate-0 opacity-100"
                        : "scale-0 -rotate-90 opacity-0"
                )}
            />
        </ThemeSwitch>
    )
}

export default ThemeSwitcher