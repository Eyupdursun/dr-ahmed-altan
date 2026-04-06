"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useScroll, useTransform } from "framer-motion";

const HERO_VIDEO_SRC = "/images/projects/hero-background.mp4";
const PRELOADER_COMPLETE_EVENT = "preloader:complete";
const LOOP_CROSSFADE_MS = 900;
const LOOP_CROSSFADE_BUFFER_SECONDS = LOOP_CROSSFADE_MS / 1000 + 0.12;
const HERO_TITLE_LINES = ["Dr. Ahmed", "Altan"];
const HERO_NOTES = ["Hairline Planning", "Micro-FUE Craft", "Istanbul"];
const EASE_STANDARD: [number, number, number, number] = [0.16, 1, 0.3, 1];

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

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "14%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.58], [1, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.98]);
  const videoScale = useTransform(scrollYProgress, [0, 1], [1, 1.07]);
  const overlayOpacity = useTransform(scrollYProgress, [0, 0.8], [0.26, 0.54]);

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

    const startTimer = window.setTimeout(() => {
      setIntroStarted(true);
    }, holdMs);

    return () => {
      window.clearTimeout(startTimer);
    };
  }, [canStartVideo]);

  return (
    <motion.section
      id="intro"
      data-nav-section
      data-header-tone="dark"
      ref={sectionRef}
      className={`relative flex min-h-screen h-svh items-stretch overflow-hidden bg-[var(--color-hero-bg)] ${canStartVideo ? "" : "pointer-events-none"}`}
      initial={false}
      animate={{ opacity: canStartVideo ? 1 : 0 }}
      transition={{ duration: 0.55, ease: EASE_STANDARD }}
    >
      <motion.div className="absolute inset-0 z-0 overflow-hidden" style={{ scale: videoScale }}>
        <motion.div
          className="absolute inset-0 overflow-hidden"
          initial={false}
          animate={introStarted ? { opacity: 1 } : { opacity: 0.22 }}
          transition={{ duration: 0.9, ease: EASE_STANDARD }}
        >
          <div className="absolute left-1/2 top-1/2 h-full w-full min-h-[56.25vw] min-w-[177.78vh] -translate-x-1/2 -translate-y-1/2">
            {canStartVideo && !videoFailed
              ? ([0, 1] as const).map((layer) => {
                  const isActive = layer === activeVideoLayer;
                  const isCrossfadeTarget = layer === crossfadeLayer;
                  const layerOpacity = !videoLoaded
                    ? 0
                    : crossfadeLayer === null
                      ? isActive
                        ? 1
                        : 0
                      : isCrossfadeTarget
                        ? 1
                        : 0;

                  return (
                    <motion.video
                      key={`hero-video-layer-${layer}`}
                      ref={layer === 0 ? videoPrimaryRef : videoSecondaryRef}
                      className="absolute inset-0 h-full w-full object-cover object-top"
                      src={HERO_VIDEO_SRC}
                      muted
                      playsInline
                      preload="auto"
                      initial={false}
                      animate={{
                        opacity: layerOpacity,
                        scale: introStarted ? 1 : 1.05,
                      }}
                      transition={{
                        opacity: {
                          duration:
                            crossfadeLayer === null ? 1.25 : LOOP_CROSSFADE_MS / 1000,
                          ease: EASE_STANDARD,
                        },
                        scale: { duration: 1.25, ease: EASE_STANDARD },
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
              : null}
          </div>
        </motion.div>

        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d0b] via-[#0f1511]/60 to-[#101712]" />
      </motion.div>

      <div className="absolute inset-0 z-[1] pointer-events-none">
        <div className="absolute left-[8%] top-[16%] h-[34vh] w-[34vw] rounded-full bg-[rgba(109,129,104,0.18)] blur-[94px]" />
        <div className="absolute bottom-[14%] right-[9%] h-[22vh] w-[24vw] rounded-full bg-[rgba(255,255,255,0.08)] blur-[108px]" />
      </div>

      <motion.div className="absolute inset-0 z-[2] bg-black" style={{ opacity: overlayOpacity }} />

      <motion.div
        className="absolute inset-0 z-[4] pointer-events-none overflow-hidden"
        initial={false}
        animate={{ opacity: canStartVideo ? 1 : 0 }}
      >
        <motion.div
          className="absolute -left-[95%] -top-[95%] h-[190%] w-[190%]"
          initial={false}
          animate={introStarted ? { x: "105%", y: "105%" } : { x: "0%", y: "0%" }}
          transition={{ duration: 2.9, ease: [0.22, 1, 0.36, 1] }}
          style={{
            background:
              "linear-gradient(135deg, rgba(4,7,12,0) 0%, rgba(4,7,12,0.08) 12%, rgba(4,7,12,0.58) 24%, rgba(4,7,12,0.9) 34%, rgba(4,7,12,1) 46%)",
            filter: "blur(16px)",
          }}
        />
      </motion.div>

      <div
        className="absolute inset-0 z-[3] pointer-events-none opacity-[0.03]"
        style={{
          backgroundImage:
            'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 256 256\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noise\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.9\' numOctaves=\'4\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%25\' height=\'100%25\' filter=\'url(%23noise)\'/%3E%3C/svg%3E")',
          backgroundRepeat: "repeat",
        }}
      />

      <motion.div
        className="site-shell relative z-10 flex h-full min-h-screen items-end py-12 md:py-14"
        style={{ y, opacity, scale }}
      >
        <div className="section-shell w-full pt-[calc(var(--header-height)+48px)]">
            <div className="section-grid items-end lg:grid-cols-[minmax(0,620px)_minmax(180px,220px)] lg:justify-between">
            <div className="section-main w-full max-w-[620px] lg:max-w-[min(620px,42vw)]">
              <motion.p
                className="section-label text-[var(--color-hero-muted)]"
                initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
                animate={
                  introStarted
                    ? { opacity: 1, y: 0, filter: "blur(0px)" }
                    : { opacity: 0, y: 18, filter: "blur(6px)" }
                }
                transition={{ duration: 0.55, delay: 0.22, ease: EASE_STANDARD }}
              >
                <span className="section-label-line" />
                Istanbul / Surgical Hair Restoration
              </motion.p>

              <div className="mt-6 overflow-hidden">
                {HERO_TITLE_LINES.map((line, index) => (
                  <motion.span
                    key={line}
                    className="block font-[var(--font-manrope)] text-[clamp(3.8rem,11vw,8.6rem)] font-semibold leading-[0.88] tracking-[-0.08em] text-[var(--color-hero-fg)]"
                    initial={{ opacity: 0, y: 72, filter: "blur(14px)" }}
                    animate={
                      introStarted
                        ? { opacity: 1, y: 0, filter: "blur(0px)" }
                        : { opacity: 0, y: 72, filter: "blur(14px)" }
                    }
                    transition={{
                      duration: 0.95,
                      delay: 0.32 + index * 0.08,
                      ease: EASE_STANDARD,
                    }}
                  >
                    {line}
                  </motion.span>
                ))}
              </div>

              <motion.p
                className="mt-6 max-w-[32ch] text-[clamp(1rem,1.35vw,1.22rem)] leading-[1.65] text-[var(--color-hero-muted)] text-pretty"
                initial={{ opacity: 0, y: 28 }}
                animate={introStarted ? { opacity: 0.96, y: 0 } : { opacity: 0, y: 28 }}
                transition={{ duration: 0.7, delay: 0.72, ease: EASE_STANDARD }}
              >
                Natural hairline planning and measured Micro-FUE craft, shaped as a
                calm study in surgical precision.
              </motion.p>
            </div>

            <motion.div
              className="section-rail grid gap-3 border-t border-white/10 pt-5 text-[11px] uppercase tracking-[0.28em] text-[var(--color-hero-muted)] lg:max-w-[220px] lg:border-l lg:border-t-0 lg:pl-6"
              initial={{ opacity: 0, y: 24 }}
              animate={introStarted ? { opacity: 0.88, y: 0 } : { opacity: 0, y: 24 }}
              transition={{ duration: 0.7, delay: 0.84, ease: EASE_STANDARD }}
            >
              {HERO_NOTES.map((note) => (
                <span key={note}>{note}</span>
              ))}
            </motion.div>
          </div>
        </div>
      </motion.div>
    </motion.section>
  );
}
