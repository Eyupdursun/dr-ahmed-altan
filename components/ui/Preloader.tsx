"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PRELOADER_COMPLETE_EVENT = "preloader:complete";
const MIN_PRELOADER_VISIBLE_MS = 2200;
const REDUCED_MOTION_MIN_MS = 700;

export default function Preloader() {
    const [isActive, setIsActive] = useState(true);
    const [isExiting, setIsExiting] = useState(false);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        if (!isActive) return;

        const root = document.documentElement;
        const body = document.body;
        root.dataset.preloaderDone = "false";

        const prevRootOverflow = root.style.overflow;
        const prevBodyOverflow = body.style.overflow;
        root.style.overflow = "hidden";
        body.style.overflow = "hidden";

        let rafId = 0;
        let failSafeTimer = 0;
        let releaseTimer = 0;
        let current = 0;
        let target = 14;
        let isReady = false;
        let completed = false;
        const startAt = performance.now();

        const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const minVisibleMs = reduceMotion ? REDUCED_MOTION_MIN_MS : MIN_PRELOADER_VISIBLE_MS;

        const markReady = () => {
            isReady = true;
        };

        if (reduceMotion) {
            markReady();
        } else {
            if (document.readyState === "complete") {
                markReady();
            } else {
                window.addEventListener("load", markReady, { once: true });
            }
            failSafeTimer = window.setTimeout(markReady, 4200);
        }

        const loop = () => {
            const elapsed = performance.now() - startAt;

            if (!isReady) {
                target = Math.max(target, Math.min(86, 14 + elapsed * 0.024));
            } else if (elapsed < minVisibleMs) {
                target = Math.max(target, 94);
            } else {
                target = 100;
            }

            const speed = target >= 100 ? 0.1 : 0.042;
            current += (target - current) * speed;
            if (target === 100 && Math.abs(100 - current) < 0.12) current = 100;
            setProgress(current);

            if (!completed && isReady && elapsed >= minVisibleMs && current >= 100) {
                completed = true;
                setIsExiting(true);
                releaseTimer = window.setTimeout(() => {
                    root.dataset.preloaderDone = "true";
                    window.dispatchEvent(new Event(PRELOADER_COMPLETE_EVENT));
                    setIsActive(false);
                    root.style.overflow = prevRootOverflow;
                    body.style.overflow = prevBodyOverflow;
                }, reduceMotion ? 180 : 520);
                return;
            }

            if (!completed) {
                rafId = window.requestAnimationFrame(loop);
            }
        };

        rafId = window.requestAnimationFrame(loop);

        return () => {
            window.cancelAnimationFrame(rafId);
            window.clearTimeout(failSafeTimer);
            window.clearTimeout(releaseTimer);
            window.removeEventListener("load", markReady);
            root.style.overflow = prevRootOverflow;
            body.style.overflow = prevBodyOverflow;
        };
    }, [isActive]);

    if (!isActive) return null;

    const rounded = Math.round(progress);

    return (
        <motion.div
            className="fixed inset-0 z-[10000] pointer-events-auto"
            animate={isExiting ? { opacity: 0 } : { opacity: 1 }}
            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
        >
            <div className="absolute inset-0 bg-[var(--color-bg)]" />
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_30%,rgba(180,203,255,0.14),transparent_44%)]" />

            <div className="relative h-full flex items-center justify-center px-6">
                <div className="w-[min(82vw,520px)]">
                    <p className="text-[11px] uppercase tracking-[0.34em] text-[var(--color-fg-bone)]/88 text-center">
                        Dr. Ahmed Altan
                    </p>
                    <p className="mt-2 text-[10px] uppercase tracking-[0.24em] text-[var(--color-muted)] text-center">
                        Loading
                    </p>

                    <div className="mt-7 h-[2px] rounded-full bg-white/16 overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-[var(--color-accent)] to-white"
                            style={{ width: `${rounded}%` }}
                        />
                    </div>

                    <p className="mt-3 text-[10px] uppercase tracking-[0.2em] text-[var(--color-muted)] text-right">
                        {String(rounded).padStart(2, "0")}%
                    </p>
                </div>
            </div>
        </motion.div>
    );
}
