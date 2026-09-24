export const motion = {
    duration: {
        fast: 0.35,
        normal: 0.7,
        slow: 1,
    },

    ease: {
        smooth: "power3.out",
        soft: "power2.out",
        expo: "expo.out",
        in: "power2.in",
        inOut: "power3.inOut",
    },

    distance: {
        small: 20,
        medium: 40,
        large: 70,
    },

    scroll: {
        start: "top 85%",
        end: "bottom 15%",
    },
} as const;