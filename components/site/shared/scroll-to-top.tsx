'use client'

import { useState, useEffect } from 'react'
import { ArrowUpFromDot, MessagesSquare } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const ScrollToTop = () => {
    const [isVisible, setIsVisible] = useState(false)

    useEffect(() => {
        const toggleVisibility = () => {
            setIsVisible(window.scrollY > 300)
        }

        window.addEventListener('scroll', toggleVisibility, { passive: true })
        return () => window.removeEventListener('scroll', toggleVisibility)
    }, [])

    const scrollToTop = () => {
        const startPosition = window.pageYOffset
        const duration = 1000
        let startTime: number | null = null

        function animation(currentTime: number) {
            if (startTime === null) startTime = currentTime
            const timeElapsed = currentTime - startTime
            const progress = Math.min(timeElapsed / duration, 1)

            const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3)
            const easedProgress = easeOutCubic(progress)

            window.scrollTo(0, startPosition * (1 - easedProgress))

            if (timeElapsed < duration) {
                requestAnimationFrame(animation)
            } else {
                window.scrollTo(0, 0)
            }
        }

        requestAnimationFrame(animation)
    }

    return (
        <div className="fixed bottom-6 right-4 z-50 flex items-end gap-1.5 sm:right-8">
            {/* Feedback button */}
            <Button
                type="button"
                variant="outline"
                size="sm"
                className={cn(
                    'h-8 rounded-[0.2rem] border-white/10 bg-[#292a2d]  text-xs font-medium text-white transition-all duration-300 hover:bg-[#35363a] hover:text-white',
                    isVisible
                        ? 'pointer-events-auto opacity-100'
                        : 'pointer-events-none opacity-0'
                )}
            >
                <Link href="/feedback" className="flex items-center gap-1.5">
                    <MessagesSquare className="h-3.5 w-3.5" />
                    Feedback
                </Link>
            </Button>

            {/* Scroll to top button */}
            <button
                type="button"
                onClick={scrollToTop}
                aria-label="Scroll to top"
                className={cn(
                    'flex h-8 w-8 cursor-pointer items-center justify-center rounded-[0.2rem] bg-[#09b850] text-white shadow-md transition-all duration-300 ease-in-out hover:bg-[#0B9944] active:scale-95',
                    isVisible
                        ? 'pointer-events-auto opacity-100'
                        : 'pointer-events-none opacity-0'
                )}
            >
                <ArrowUpFromDot className="h-4 w-4" strokeWidth={2.5} />
            </button>
        </div>
    )
}

export default ScrollToTop