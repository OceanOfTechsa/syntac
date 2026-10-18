'use client'

import { useRef, useEffect, CSSProperties } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

interface ICountUpProps {
    start?: number
    end: number | string
    duration?: number
    prefix?: string
    suffix?: string
    className?: string
    style?: CSSProperties
}

const CountUp = ({
                     start = 0,
                     end,
                     duration = 2,
                     prefix = "",
                     suffix = "",
                     className = "",
                     style,
                 }: ICountUpProps) => {
    const ref = useRef<HTMLSpanElement>(null);

    useEffect(() => {
        const el = ref.current;
        if (!el) return;

        // Odd indexes are the numbers, even indexes are the text between them
        // "1:1" -> ["", "1", ":", "1", ""]
        const parts = String(end).split(/(\d[\d,]*(?:\.\d+)?)/);

        // p goes 0 -> 1, each number is interpolated from start to its target
        const render = (p: number) =>
            prefix +
            parts
                .map((part, i) => {
                    if (i % 2 === 0) return part;
                    const target = Number(part.replace(/,/g, ""));
                    const decimals = part.split(".")[1]?.length ?? 0;
                    return (start + (target - start) * p).toLocaleString(undefined, {
                        useGrouping: part.includes(","),
                        minimumFractionDigits: decimals,
                        maximumFractionDigits: decimals,
                    });
                })
                .join("") +
            suffix;

        // No numbers in the value (e.g. "N/A"), nothing to animate
        if (parts.length === 1) {
            el.textContent = render(1);
            return;
        }

        const progress = { value: 0 };
        el.textContent = render(0);

        const tween = gsap.to(progress, {
            value: 1,
            duration,
            ease: "power1.out",
            paused: true,
            onUpdate: () => {
                el.textContent = render(progress.value);
            },
        });

        // Fires once, when the element enters the viewport
        const trigger = ScrollTrigger.create({
            trigger: el,
            start: "top 85%",
            once: true,
            onEnter: () => tween.play(),
        });

        return () => {
            trigger.kill();
            tween.kill();
        };
    }, [start, end, duration, prefix, suffix]);

    return <span ref={ref} className={className} style={style} />;
};

export default CountUp;
/* Usage:
<CountUp
  start={0}
  end={stat.value}
  suffix="+"
  className="inline-block tabular-nums text-4xl font-bold"
/>
*/