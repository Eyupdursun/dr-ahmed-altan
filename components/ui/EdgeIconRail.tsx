"use client";

import { useEffect, useMemo, useState } from "react";
import { useLenis } from "@/components/layout/SmoothScrollProvider";

type IconKind = "follicle" | "cross" | "scalpel" | "head" | "molecule";
type Side = "left" | "right";

interface EdgeItem {
    id: string;
    side: Side;
    kind: IconKind;
    speed: number;
    phase: number;
    x: number;
    scale: number;
    opacity: number;
}

function LineIcon({ kind }: { kind: IconKind }) {
    const common = {
        stroke: "currentColor",
        fill: "none",
        strokeWidth: 1.45,
        strokeLinecap: "round" as const,
        strokeLinejoin: "round" as const,
    };

    if (kind === "cross") {
        return (
            <svg viewBox="0 0 64 64" className="w-full h-full">
                <path {...common} d="M32 14v36" />
                <path {...common} d="M14 32h36" />
                <circle {...common} cx="32" cy="32" r="22" opacity="0.35" />
            </svg>
        );
    }

    if (kind === "scalpel") {
        return (
            <svg viewBox="0 0 64 64" className="w-full h-full">
                <path {...common} d="M14 45 36 23" />
                <path {...common} d="m34 21 5 5" />
                <path {...common} d="M25 51h14l11-11-3-3-10 10h-6z" opacity="0.7" />
            </svg>
        );
    }

    if (kind === "head") {
        return (
            <svg viewBox="0 0 64 64" className="w-full h-full">
                <path {...common} d="M15 42c0-11 7-20 17-20s17 9 17 20" />
                <path {...common} d="M24 30c3-3 6-4 8-4s5 1 8 4" />
                <path {...common} d="M18 42h28" opacity="0.4" />
                <path {...common} d="M20 25c4-6 8-9 12-9s8 3 12 9" opacity="0.6" />
            </svg>
        );
    }

    if (kind === "molecule") {
        return (
            <svg viewBox="0 0 64 64" className="w-full h-full">
                <circle {...common} cx="16" cy="20" r="4" />
                <circle {...common} cx="44" cy="18" r="5" />
                <circle {...common} cx="36" cy="44" r="6" />
                <circle {...common} cx="14" cy="42" r="3.5" />
                <path {...common} d="M20 21h19" opacity="0.7" />
                <path {...common} d="M41 23 38 38" opacity="0.7" />
                <path {...common} d="M31 42H18" opacity="0.7" />
                <path {...common} d="M18 39 16 24" opacity="0.7" />
            </svg>
        );
    }

    return (
        <svg viewBox="0 0 64 64" className="w-full h-full">
            <circle {...common} cx="22" cy="24" r="5" />
            <circle {...common} cx="36" cy="20" r="4" />
            <circle {...common} cx="42" cy="36" r="5" />
            <circle {...common} cx="24" cy="40" r="3.5" />
            <path {...common} d="M27 24h5" opacity="0.7" />
            <path {...common} d="M39 24 40 32" opacity="0.7" />
            <path {...common} d="M37 37H28" opacity="0.7" />
        </svg>
    );
}

export default function EdgeIconRail() {
    const { scrollState } = useLenis();
    const [viewportHeight, setViewportHeight] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const update = () => {
            setViewportHeight(window.innerHeight);
            const mobile = window.matchMedia("(max-width: 767px)").matches;
            setIsMobile(mobile);
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    const items = useMemo<EdgeItem[]>(
        () => [
            { id: "l1", side: "left", kind: "follicle", speed: 0.1, phase: 0.0, x: 18, scale: 0.86, opacity: 0.18 },
            { id: "l2", side: "left", kind: "scalpel", speed: 0.13, phase: 0.7, x: 24, scale: 0.95, opacity: 0.15 },
            { id: "l3", side: "left", kind: "cross", speed: 0.09, phase: 1.8, x: 14, scale: 0.82, opacity: 0.16 },
            { id: "r1", side: "right", kind: "head", speed: 0.11, phase: 0.3, x: 18, scale: 0.97, opacity: 0.16 },
            { id: "r2", side: "right", kind: "molecule", speed: 0.14, phase: 1.3, x: 24, scale: 0.88, opacity: 0.15 },
            { id: "r3", side: "right", kind: "follicle", speed: 0.1, phase: 2.1, x: 14, scale: 0.84, opacity: 0.14 },
        ],
        []
    );

    if (isMobile || viewportHeight === 0) return null;

    const trackSize = viewportHeight + 360;

    return (
        <div className="fixed inset-0 pointer-events-none z-[15] overflow-hidden" aria-hidden="true">
            {items.map((item) => {
                const flow = (scrollState.scroll * item.speed + item.phase * 160) % trackSize;
                const y = flow - 180;
                const wobble = Math.sin(scrollState.scroll * 0.0013 + item.phase * 4.0) * 2.8;
                const drift = Math.cos(scrollState.scroll * 0.001 + item.phase * 3.0) * 3.4;
                const sideX = item.side === "left"
                    ? item.x + drift
                    : -(item.x + drift);

                return (
                    <div
                        key={item.id}
                        className={`absolute ${item.side === "left" ? "left-0" : "right-0"}`}
                        style={{
                            top: 0,
                            width: 54,
                            height: 54,
                            color: "rgba(240, 245, 255, 0.78)",
                            opacity: item.opacity,
                            transform: `translate3d(${sideX}px, ${y}px, 0) rotate(${wobble}deg) scale(${item.scale})`,
                            filter: "drop-shadow(0 0 8px rgba(180,203,255,0.12))",
                        }}
                    >
                        <LineIcon kind={item.kind} />
                    </div>
                );
            })}
        </div>
    );
}
