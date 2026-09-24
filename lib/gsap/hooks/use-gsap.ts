"use client";

import {
    DependencyList,
    RefObject,
    useLayoutEffect,
} from "react";

import { gsap } from "@/lib/gsap";

export function useGsap( scope: RefObject<HTMLElement | null>, callback: () => void, dependencies: DependencyList = []): void {
    useLayoutEffect(() => {
        if (!scope.current) return;

        const ctx = gsap.context(callback, scope);

        return (): void => {
            ctx.revert();
        };
    }, dependencies);
}