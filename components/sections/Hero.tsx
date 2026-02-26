"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useScroll, useTransform } from "framer-motion";

const HERO_VIDEO_SRC = "/images/projects/hero-background.mp4";
const PRELOADER_COMPLETE_EVENT = "preloader:complete";
const LOOP_CROSSFADE_MS = 900;
const LOOP_CROSSFADE_BUFFER_SECONDS = LOOP_CROSSFADE_MS / 1000 + 0.12;
const HERO_HEADLINES = [
    "Trusted Expert in Hair Transplantation",
    "Dr. Ahmed Altan",
];

const headlineVariants = {
    initial: {
        opacity: 0,
        y: 54,
        rotateX: -62,
        scale: 0.92,
        filter: "blur(10px)",
    },
    animate: {
        opacity: 1,
        y: 0,
        rotateX: 0,
        scale: 1,
        filter: "blur(0px)",
        transition: {
            duration: 0.95,
            ease: [0.16, 1, 0.3, 1],
            when: "beforeChildren",
            staggerChildren: 0.02,
            delayChildren: 0.08,
        },
    },
    exit: {
        opacity: 0,
        y: -46,
        rotateX: 58,
        scale: 1.05,
        filter: "blur(10px)",
        transition: {
            duration: 0.56,
            ease: [0.7, 0, 0.84, 0],
            when: "afterChildren",
            staggerChildren: 0.01,
            staggerDirection: -1,
        },
    },
};

const headlineCharVariants = {
    initial: { opacity: 0, y: 20 },
    animate: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.52, ease: [0.16, 1, 0.3, 1] },
    },
    exit: {
        opacity: 0,
        y: -18,
        transition: { duration: 0.26, ease: "easeIn" },
    },
};

export default function Hero() {
    const sectionRef = useRef<HTMLElement>(null);
    const videoPrimaryRef = useRef<HTMLVideoElement>(null);
    const videoSecondaryRef = useRef<HTMLVideoElement>(null);
    const loopRafRef = useRef<number | null>(null);
    const loopSwapTimerRef = useRef<number | null>(null);
    const activeVideoLayerRef = useRef<0 | 1>(0);
    const crossfadeLayerRef = useRef<0 | 1 | null>(null);
    const [videoFailed, setVideoFailed] = useState(false);
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [canStartVideo, setCanStartVideo] = useState(false);
    const [activeVideoLayer, setActiveVideoLayer] = useState<0 | 1>(0);
    const [crossfadeLayer, setCrossfadeLayer] = useState<0 | 1 | null>(null);
    const [introStarted, setIntroStarted] = useState(false);
    const [introCompleted, setIntroCompleted] = useState(false);
    const [headlineIndex, setHeadlineIndex] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end start"],
    });

    const y = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);
    const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
    const scale = useTransform(scrollYProgress, [0, 1], [1, 0.94]);
    const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.1]);
    const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.38, 0.62]);

    useEffect(() => {
        const root = document.documentElement;

        const unlockVideo = () => {
            setCanStartVideo(true);
        };

        if (root.dataset.preloaderDone === "true") {
            unlockVideo();
            return;
        }

        window.addEventListener(PRELOADER_COMPLETE_EVENT, unlockVideo, { once: true });
        return () => window.removeEventListener(PRELOADER_COMPLETE_EVENT, unlockVideo);
    }, []);

    useEffect(() => {
        activeVideoLayerRef.current = activeVideoLayer;
    }, [activeVideoLayer]);

    useEffect(() => {
        crossfadeLayerRef.current = crossfadeLayer;
    }, [crossfadeLayer]);

    useEffect(() => {
        if (!canStartVideo) return;

        const videos = [videoPrimaryRef.current, videoSecondaryRef.current] as const;
        const [firstVideo, secondVideo] = videos;
        if (!firstVideo || !secondVideo) return;

        const playMuted = (video: HTMLVideoElement) => {
            const promise = video.play();
            if (promise && typeof promise.catch === "function") {
                promise.catch(() => undefined);
            }
        };

        firstVideo.loop = false;
        secondVideo.loop = false;
        secondVideo.pause();
        secondVideo.currentTime = 0;
        playMuted(firstVideo);

        const cancelLoopHandles = () => {
            if (loopRafRef.current !== null) {
                window.cancelAnimationFrame(loopRafRef.current);
                loopRafRef.current = null;
            }
            if (loopSwapTimerRef.current !== null) {
                window.clearTimeout(loopSwapTimerRef.current);
                loopSwapTimerRef.current = null;
            }
        };

        const tick = () => {
            const currentLayer = activeVideoLayerRef.current;
            const pendingLayer = crossfadeLayerRef.current;
            const activeVideo = videos[currentLayer];

            if (!activeVideo || pendingLayer !== null) {
                loopRafRef.current = window.requestAnimationFrame(tick);
                return;
            }

            const duration = activeVideo.duration;
            const isReady = Number.isFinite(duration) && duration > 0;

            if (isReady) {
                const remaining = duration - activeVideo.currentTime;

                if (remaining <= LOOP_CROSSFADE_BUFFER_SECONDS) {
                    const nextLayer: 0 | 1 = currentLayer === 0 ? 1 : 0;
                    const nextVideo = videos[nextLayer];

                    if (nextVideo) {
                        nextVideo.currentTime = 0;
                        playMuted(nextVideo);
                        crossfadeLayerRef.current = nextLayer;
                        setCrossfadeLayer(nextLayer);

                        loopSwapTimerRef.current = window.setTimeout(() => {
                            activeVideo.pause();
                            activeVideo.currentTime = 0;
                            activeVideoLayerRef.current = nextLayer;
                            crossfadeLayerRef.current = null;
                            setActiveVideoLayer(nextLayer);
                            setCrossfadeLayer(null);
                        }, LOOP_CROSSFADE_MS);
                    }
                }
            }

            loopRafRef.current = window.requestAnimationFrame(tick);
        };

        loopRafRef.current = window.requestAnimationFrame(tick);

        return () => {
            cancelLoopHandles();
        };
    }, [canStartVideo]);

    useEffect(() => {
        if (!canStartVideo) return;

        const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        const holdMs = reducedMotion ? 40 : 120;
        const introMs = reducedMotion ? 520 : 4000;

        const startTimer = window.setTimeout(() => {
            setIntroStarted(true);
        }, holdMs);

        const completeTimer = window.setTimeout(() => {
            setIntroCompleted(true);
        }, holdMs + introMs);

        return () => {
            window.clearTimeout(startTimer);
            window.clearTimeout(completeTimer);
        };
    }, [canStartVideo]);

    useEffect(() => {
        if (!introCompleted) return;

        const intervalId = window.setInterval(() => {
            setHeadlineIndex((prev) => (prev + 1) % HERO_HEADLINES.length);
        }, 5000);

        return () => window.clearInterval(intervalId);
    }, [introCompleted]);

    return (
        <motion.section
            ref={sectionRef}
            className={`relative h-screen min-h-[720px] flex items-center justify-center overflow-hidden ${canStartVideo ? "" : "pointer-events-none"}`}
            initial={false}
            animate={{ opacity: canStartVideo ? 1 : 0 }}
            transition={{ duration: 0.55, ease: [0.16, 1, 0.3, 1] }}
        >
            {/* ─── Background Video ─── */}
            <motion.div
                className="absolute inset-0 z-0 overflow-hidden"
                style={{ scale: videoScale }}
            >
                <motion.div
                    className="absolute inset-0 overflow-hidden"
                    initial={false}
                    animate={introStarted ? { opacity: 1 } : { opacity: 0.22 }}
                    transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="absolute left-1/2 top-1/2 w-full h-full min-w-[177.78vh] min-h-[56.25vw] -translate-x-1/2 -translate-y-1/2">
                        {canStartVideo && !videoFailed ? (
                            ([0, 1] as const).map((layer) => {
                                const isActive = layer === activeVideoLayer;
                                const isCrossfadeTarget = layer === crossfadeLayer;
                                const layerOpacity = !videoLoaded
                                    ? 0
                                    : crossfadeLayer === null
                                        ? (isActive ? 1 : 0)
                                        : (isCrossfadeTarget ? 1 : 0);

                                return (
                                    <motion.video
                                        key={`hero-video-layer-${layer}`}
                                        ref={layer === 0 ? videoPrimaryRef : videoSecondaryRef}
                                        className="absolute inset-0 w-full h-full object-cover object-top"
                                        src={HERO_VIDEO_SRC}
                                        muted
                                        playsInline
                                        preload="auto"
                                        initial={false}
                                        animate={{
                                            opacity: layerOpacity,
                                            scale: introStarted ? 1 : 1.06,
                                        }}
                                        transition={{
                                            opacity: {
                                                duration: crossfadeLayer === null ? 1.25 : LOOP_CROSSFADE_MS / 1000,
                                                ease: [0.16, 1, 0.3, 1],
                                            },
                                            scale: { duration: 1.25, ease: [0.16, 1, 0.3, 1] },
                                        }}
                                        onLoadedData={() => setVideoLoaded(true)}
                                        onCanPlay={() => setVideoLoaded(true)}
                                        onError={() => {
                                            setVideoFailed(true);
                                            setVideoLoaded(false);
                                        }}
                                    />
                                );
                            })
                        ) : null}
                    </div>
                </motion.div>

                {/* Fallback gradient if video is missing */}
                <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#0a0a0a]/60 to-[#0a0a0a]" />
            </motion.div>

            <div className="absolute inset-0 z-[1] pointer-events-none">
                <div className="absolute top-[14%] left-1/2 -translate-x-1/2 h-[34vh] w-[68vw] rounded-full bg-[rgba(178,203,255,0.08)] blur-[96px]" />
                <div className="absolute bottom-[10%] right-[12%] h-[20vh] w-[28vw] rounded-full bg-[rgba(194,176,138,0.1)] blur-[104px]" />
            </div>

            {/* ─── Dark overlay for text contrast ─── */}
            <motion.div
                className="absolute inset-0 z-[2] bg-black"
                style={{ opacity: overlayOpacity }}
            />

                <motion.div
                    className="absolute inset-0 z-[4] pointer-events-none overflow-hidden"
                    initial={false}
                    animate={{ opacity: canStartVideo ? 1 : 0 }}
                >
                    <motion.div
                        className="absolute -left-[95%] -top-[95%] h-[190%] w-[190%]"
                        initial={false}
                        animate={introStarted ? { x: "105%", y: "105%" } : { x: "0%", y: "0%" }}
                        transition={{ duration: 4, ease: [0.22, 1, 0.36, 1] }}
                        style={{
                            background:
                                "linear-gradient(135deg, rgba(4,7,12,0) 0%, rgba(4,7,12,0.08) 12%, rgba(4,7,12,0.58) 24%, rgba(4,7,12,0.9) 34%, rgba(4,7,12,1) 46%)",
                            filter: "blur(16px)",
                        }}
                    />
                </motion.div>

            {/* ─── Noise texture ─── */}
            <div
                className="absolute inset-0 z-[3] opacity-[0.03] pointer-events-none"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noise'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noise)'/%3E%3C/svg%3E")`,
                    backgroundRepeat: "repeat",
                }}
            />

            {/* ─── Content ─── */}
            <motion.div
                className="relative z-10 text-center px-6 w-full flex flex-col items-center justify-center"
                style={{ y, opacity, scale }}
            >
                <motion.p
                    className="text-[11px] uppercase tracking-[0.34em] text-[var(--color-muted)] mb-7"
                    initial={{ opacity: 0, y: 20, filter: "blur(7px)" }}
                    animate={
                        introStarted
                            ? { opacity: 1, y: 0, filter: "blur(0px)" }
                            : { opacity: 0, y: 20, filter: "blur(7px)" }
                    }
                    transition={{ duration: 0.62, delay: 0.28, ease: [0.16, 1, 0.3, 1] }}
                >
                    Dr. Ahmed Altan • Istanbul
                </motion.p>

                <motion.h1
                    className="w-full text-[clamp(0.74rem,3.72vw,5.2rem)] leading-[1.02] font-semibold tracking-[-0.01em]"
                    style={{ fontFamily: "var(--font-playfair)" }}
                    initial={{ opacity: 0, y: 28, filter: "blur(12px)" }}
                    animate={
                        introStarted
                            ? { opacity: 1, y: 0, filter: "blur(0px)" }
                            : { opacity: 0, y: 28, filter: "blur(12px)" }
                    }
                    transition={{ duration: 0.95, delay: 0.42, ease: [0.16, 1, 0.3, 1] }}
                >
                    <div className="w-full flex items-center justify-center [perspective:1400px]">
                        <div className="relative inline-grid place-items-center whitespace-nowrap">
                            <AnimatePresence mode="wait" initial={false}>
                                <motion.span
                                    key={HERO_HEADLINES[headlineIndex]}
                                    variants={headlineVariants}
                                    initial="initial"
                                    animate="animate"
                                    exit="exit"
                                    className="inline-flex whitespace-nowrap will-change-transform [transform-style:preserve-3d]"
                                    style={{ transformOrigin: "50% 58%" }}
                                >
                                    {HERO_HEADLINES[headlineIndex].split("").map((char, index) => (
                                        <motion.span
                                            key={`${HERO_HEADLINES[headlineIndex]}-${index}`}
                                            variants={headlineCharVariants}
                                            className="inline-block"
                                        >
                                            {char === " " ? "\u00A0" : char}
                                        </motion.span>
                                    ))}
                                </motion.span>
                            </AnimatePresence>
                        </div>
                    </div>
                </motion.h1>

                <motion.div
                    className="mx-auto mt-8 h-[1px] w-20 bg-gradient-to-r from-transparent via-white/80 to-transparent"
                    initial={{ scaleX: 0, opacity: 0 }}
                    animate={introStarted ? { scaleX: 1, opacity: 1 } : { scaleX: 0, opacity: 0 }}
                    transition={{ duration: 0.62, delay: 1.05, ease: [0.16, 1, 0.3, 1] }}
                />

                <motion.p
                    className="mt-7 text-[clamp(0.74rem,1.06vw,1.02rem)] text-[var(--color-fg-bone)] max-w-none mx-auto leading-relaxed font-light tracking-[0.01em] opacity-70 whitespace-nowrap"
                    initial={{ opacity: 0, y: 30 }}
                    animate={introStarted ? { opacity: 0.76, y: 0 } : { opacity: 0, y: 30 }}
                    transition={{ duration: 0.75, delay: 0.94, ease: [0.16, 1, 0.3, 1] }}
                    style={{ fontFamily: "var(--font-inter)" }}
                >
                    Personalized hairline planning and natural density strategy by Dr. Ahmed Altan.
                </motion.p>
            </motion.div>
        </motion.section>
    );
}
