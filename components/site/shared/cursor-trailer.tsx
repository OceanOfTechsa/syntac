'use client'

import { useEffect, useRef } from 'react'

export default function CursorTrailer() {
    const dotRef = useRef<HTMLDivElement>(null)
    const mouse = useRef({ x: 0, y: 0 })
    const pos = useRef({ x: 0, y: 0 })
    const raf = useRef<number | null>(null)
    const isHoveringInteractive = useRef(false)

    useEffect(() => {
        const dot = dotRef.current
        if (!dot) return

        const onMouseMove = (e: MouseEvent) => {
            mouse.current.x = e.clientX
            mouse.current.y = e.clientY
        }

        const onMouseOver = (e: MouseEvent) => {
            const target = e.target as HTMLElement
            const interactive = target.closest(
                'a, button, [role="button"], input, [role="switch"], textarea, select, label, [data-cursor-hide]'
            )
            isHoveringInteractive.current = !!interactive
        }

        const animate = () => {
            const speed = 0.15

            pos.current.x += (mouse.current.x - pos.current.x) * speed
            pos.current.y += (mouse.current.y - pos.current.y) * speed

            // Hide when hovering interactive elements
            if (isHoveringInteractive.current) {
                dot.style.opacity = '0'
                dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(0.4)`
            } else {
                dot.style.opacity = '1'
                dot.style.transform = `translate3d(${pos.current.x}px, ${pos.current.y}px, 0) scale(1)`
            }

            raf.current = requestAnimationFrame(animate)
        }

        window.addEventListener('mousemove', onMouseMove)
        window.addEventListener('mouseover', onMouseOver)

        raf.current = requestAnimationFrame(animate)

        return () => {
            window.removeEventListener('mousemove', onMouseMove)
            window.removeEventListener('mouseover', onMouseOver)
            if (raf.current) cancelAnimationFrame(raf.current)
        }
    }, [])

    return (
        <div
            ref={dotRef}
            className="pointer-events-none fixed top-0 left-0 z-[9999] h-3 w-3 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[#0B9944]  transition-opacity duration-200"
            style={{ willChange: 'transform, opacity' }}
        />
    )
}