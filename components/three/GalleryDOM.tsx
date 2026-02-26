"use client";

import { useRef, useEffect, useCallback } from "react";
import {
    motion,
    useMotionTemplate,
    useSpring,
    useTransform,
    MotionValue,
} from "framer-motion";
import type { GalleryProject } from "@/components/three/GalleryCanvas";

// ─── Exported DOM Layer ─────────────────────────────────────
export default function GalleryDOM({
    projects,
    registerItem,
    showFallbackImages,
    sectionProgress,
}: {
    projects: GalleryProject[];
    registerItem: (index: number, element: HTMLElement | null) => void;
    showFallbackImages: boolean;
    sectionProgress: MotionValue<number>;
}) {
    return (
        <div className="relative z-10 w-full h-full flex items-center justify-center">
            {projects.map((project, index) => {
                // Calculate the start and end progress for this specific item.
                // Out of 4 items, let's give them each a 25% slice of the 400vh scroll progress.
                const sliceProgress = 1 / projects.length;
                const start = index * sliceProgress;
                const end = start + sliceProgress;

                // We want the item to fade in around the start, hold its position, and fade out before the end.
                const fadeInEnd = start + sliceProgress * 0.2;
                const fadeOutStart = end - sliceProgress * 0.2;

                return (
                    <div key={project.title} className="absolute inset-0 w-full h-full flex items-center justify-center pointer-events-none">
                        <div className="w-full pointer-events-auto">
                            <ProjectItem
                                project={project}
                                index={index}
                                isReversed={index % 2 === 1}
                                registerItem={registerItem}
                                showFallbackImage={showFallbackImages}
                                sectionProgress={sectionProgress}
                            />
                        </div>
                    </div>
                );
            })}
        </div>
    );
}

// ─── Single Gallery Item (Scrollytelling) ─────────────────────────
function ProjectItem({
    project,
    index,
    isReversed,
    registerItem,
    showFallbackImage,
    sectionProgress,
}: {
    project: GalleryProject;
    index: number;
    isReversed: boolean;
    registerItem: (index: number, element: HTMLElement | null) => void;
    showFallbackImage: boolean;
    sectionProgress: MotionValue<number>;
}) {
    const itemRef = useRef<HTMLElement>(null);
    const imageSlotRef = useRef<HTMLDivElement>(null);
    const hasImage = project.image.trim().length > 0;

    useEffect(() => {
        registerItem(index, imageSlotRef.current);
        // Clean up on unmount
        return () => registerItem(index, null);
    }, [index, registerItem]);

    const sliceProgress = 1 / 4; // 4 items
    const start = index * sliceProgress;
    const end = start + sliceProgress;
    const overlap = 0.05;

    // Use global sectionProgress instead of local scroll progress.
    // Ensure input arrays never contain identical values to prevent Framer Motion errors.
    const getOpacityMap = () => {
        if (index === 0) {
            return { input: [0, end - overlap, end], output: [1, 1, 0] };
        } else if (index === 3) { // Last item
            return { input: [start - overlap, start, 1], output: [0, 1, 1] };
        }
        return { input: [start - overlap, start, end - overlap, end], output: [0, 1, 1, 0] };
    };

    const getYMap = () => {
        if (index === 0) {
            return { input: [0, end - overlap, end], output: [0, 0, -60] };
        } else if (index === 3) {
            return { input: [start - overlap, start, 1], output: [60, 0, 0] };
        }
        return { input: [start - overlap, start, end - overlap, end], output: [60, 0, 0, -60] };
    };

    const opacityConfig = getOpacityMap();
    const yConfig = getYMap();

    const textOpacityRaw = useTransform(sectionProgress, opacityConfig.input, opacityConfig.output);
    const textYRaw = useTransform(sectionProgress, yConfig.input, yConfig.output);

    const textOpacity = useSpring(textOpacityRaw, { stiffness: 130, damping: 24, mass: 0.8 });
    const textY = useSpring(textYRaw, { stiffness: 120, damping: 22, mass: 0.9 });

    const titleY = useSpring(
        useTransform(sectionProgress, yConfig.input, yConfig.output.map(y => y * 0.75)),
        { stiffness: 130, damping: 23, mass: 0.86 }
    );
    const titleOpacity = useSpring(textOpacityRaw, { stiffness: 140, damping: 24, mass: 0.82 });

    // Blur only during transitions
    const getBlurMap = () => {
        if (index === 0) return { input: [0, end - overlap, end], output: [0, 0, 10] };
        if (index === 3) return { input: [start - overlap, start, 1], output: [10, 0, 0] };
        return { input: [start - overlap, start, end - overlap, end], output: [10, 0, 0, 10] };
    };
    const blurConfig = getBlurMap();
    const titleBlur = useTransform(sectionProgress, blurConfig.input, blurConfig.output);
    const titleFilter = useMotionTemplate`blur(${titleBlur}px)`;

    const descriptionOpacity = useSpring(textOpacityRaw, { stiffness: 120, damping: 22, mass: 0.8 });
    const descriptionY = useSpring(
        useTransform(sectionProgress, yConfig.input, yConfig.output.map(y => y * 0.5)),
        { stiffness: 115, damping: 22, mass: 0.88 }
    );

    const markerOpacity = useSpring(textOpacityRaw, { stiffness: 130, damping: 23, mass: 0.78 });
    const markerScale = useSpring(
        useTransform(sectionProgress, blurConfig.input, blurConfig.output.map(b => b === 0 ? 1 : 0.5) as number[]),
        { stiffness: 150, damping: 20, mass: 0.7 }
    );
    const titleTracking = useTransform(
        sectionProgress,
        blurConfig.input,
        blurConfig.output.map(b => b === 0 ? "0.015em" : "0.08em") as string[]
    );

    const fallbackImageOpacity = useSpring(textOpacityRaw, { stiffness: 120, damping: 24, mass: 0.85 });
    const fallbackImageScale = useSpring(
        useTransform(sectionProgress, blurConfig.input, blurConfig.output.map(b => b === 0 ? 1 : 1.1) as number[]),
        { stiffness: 120, damping: 23, mass: 0.82 }
    );
    const fallbackImageY = useSpring(
        useTransform(sectionProgress, yConfig.input, yConfig.output.map(y => y * 1.2) as number[]),
        { stiffness: 108, damping: 23, mass: 0.88 }
    );

    return (
        <section
            ref={itemRef}
            data-journey-item={index}
            className="py-12 md:py-24 px-6 md:px-16 lg:px-24 w-full"
        >
            <div className={`flex flex-col gap-10 md:gap-0 ${isReversed ? "md:flex-row-reverse" : "md:flex-row"} items-center justify-between w-full mx-auto`}>
                <div
                    ref={imageSlotRef}
                    className="gallery-image-slot w-full md:w-[50%] relative"
                >
                    <motion.div
                        className="w-full h-full"
                        style={{
                            opacity: textOpacity,
                            y: textY,
                        }}
                    >
                        <div className={`aspect-[3/2] relative overflow-hidden rounded-[28px] border border-[var(--color-border-soft)] shadow-[0_26px_80px_rgba(0,0,0,0.42)] ${showFallbackImage ? "bg-[var(--color-bg-elevated)]" : "bg-transparent"}`}>
                            {showFallbackImage && hasImage ? (
                                <motion.img
                                    src={project.image}
                                    alt={project.title}
                                    className="w-full h-full object-cover"
                                    loading="lazy"
                                    style={{
                                        opacity: fallbackImageOpacity,
                                        scale: fallbackImageScale,
                                        y: fallbackImageY,
                                    }}
                                />
                            ) : null}

                            <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-black/5 via-transparent to-black/50" />
                            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(circle_at_26%_22%,rgba(255,255,255,0.11),transparent_46%)]" />
                        </div>
                    </motion.div>
                </div>

                {/* ─── Text Block ─── */}
                <motion.div
                    className="w-full md:w-[42%] flex flex-col justify-center relative z-20"
                    style={{
                        opacity: textOpacity,
                        y: textY,
                    }}
                >
                    <motion.div
                        className="flex items-center gap-4 mb-6"
                        style={{ opacity: markerOpacity }}
                    >
                        <motion.span
                            className="inline-flex min-w-9 justify-center rounded-full border border-[var(--color-accent)] bg-[var(--color-accent-soft)] px-3 py-1 text-[11px] text-[var(--color-fg-bone)] font-mono tracking-[0.08em]"
                            style={{ scale: markerScale }}
                        >
                            {String(index + 1).padStart(2, "0")}
                        </motion.span>
                        <span className="inline-flex items-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-glass)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-accent)]">
                            {project.category}
                        </span>
                    </motion.div>

                    <div className="overflow-hidden mb-4">
                        <motion.h3
                            className="text-[clamp(2rem,5vw,4.5rem)] leading-[1.05] tracking-[-0.02em]"
                            style={{
                                fontFamily: "var(--font-playfair)",
                                fontWeight: 500,
                                y: titleY,
                                opacity: titleOpacity,
                                filter: titleFilter,
                                letterSpacing: titleTracking,
                            }}
                        >
                            {project.title}
                        </motion.h3>
                    </div>

                    <motion.p
                        className="text-sm md:text-base text-[var(--color-muted)] leading-relaxed max-w-sm mb-8"
                        style={{
                            opacity: descriptionOpacity,
                            y: descriptionY,
                        }}
                    >
                        {project.description}
                    </motion.p>

                    <div className="inline-flex w-fit items-center rounded-full border border-[var(--color-border-soft)] bg-white/[0.03] px-3 py-1">
                        <span className="text-[10px] uppercase tracking-[0.2em] text-[var(--color-fg-bone)] opacity-76">
                            {project.tag}
                        </span>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
