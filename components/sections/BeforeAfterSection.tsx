"use client";

import Image from "next/image";
import { AnimatePresence, m as motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";
import BodySectionVeil from "@/components/ui/BodySectionVeil";
import ShinyText from "@/components/ui/ShinyText";
import { BEFORE_AFTER_CASES, type BeforeAfterCase } from "@/lib/siteContent";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── visual surface ── */

function ImageSurface({
  image,
  label,
  variant,
}: {
  image?: string;
  label: string;
  variant: "before" | "after";
}) {
  if (image) {
    return (
      <Image
        src={image}
        alt={`${label} — hair restoration result`}
        fill
        sizes="(max-width: 1023px) 92vw, 80vw"
        className="object-cover"
      />
    );
  }

  return (
    <div
      className="absolute inset-0 flex items-center justify-center"
      style={{
        background:
          variant === "before"
            ? "radial-gradient(circle at 30% 25%, rgba(180,160,135,0.22), transparent 45%), linear-gradient(140deg, #efe9dd 0%, #ddd2bf 100%)"
            : "radial-gradient(circle at 70% 30%, rgba(84,133,100,0.28), transparent 45%), linear-gradient(140deg, #e5ebe2 0%, #c8d4c2 100%)",
      }}
    >
      <span
        className="font-[var(--font-manrope)] text-[clamp(2.4rem,6vw,5rem)] tracking-[-0.05em]"
        style={{
          color:
            variant === "before"
              ? "rgba(120,100,80,0.22)"
              : "rgba(84,133,100,0.26)",
        }}
      >
        {label}
      </span>
    </div>
  );
}

/* ── arrow nav button ── */

function NavButton({
  direction,
  onClick,
  disabled,
}: {
  direction: "prev" | "next";
  onClick: () => void;
  disabled?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled}
      aria-label={direction === "prev" ? "Previous case" : "Next case"}
      className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-soft-line)] bg-white/85 text-[var(--color-ink)]/70 shadow-[0_8px_22px_rgba(16,23,18,0.07)] backdrop-blur-md transition-all duration-300 enabled:hover:scale-105 enabled:hover:border-[var(--color-accent)] enabled:hover:text-[var(--color-accent)] disabled:opacity-40 md:h-11 md:w-11"
    >
      <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
        {direction === "prev" ? (
          <path
            d="M8.5 2.5L4 7l4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        ) : (
          <path
            d="M5.5 2.5L10 7l-4.5 4.5"
            stroke="currentColor"
            strokeWidth="1.6"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        )}
      </svg>
    </button>
  );
}

function ComparisonCard({
  item,
  rm,
}: {
  item: BeforeAfterCase;
  rm: boolean;
}) {
  const [mode, setMode] = useState<"before" | "after">("before");

  return (
    <div className="group relative aspect-[3/4] h-[min(54svh,520px)] min-h-[360px] w-full select-none overflow-hidden rounded-[24px] border border-[var(--color-soft-line)] bg-[var(--color-panel)] shadow-[0_18px_48px_rgba(16,23,18,0.06)]">
      {/* before — base layer always rendered */}
      <ImageSurface image={item.beforeImage} label="Before" variant="before" />

      {/* after — fades over before */}
      <motion.div
        className="absolute inset-0"
        animate={{ opacity: mode === "after" ? 1 : 0 }}
        transition={
          rm ? { duration: 0 } : { duration: 0.45, ease: EASE }
        }
      >
        <ImageSurface image={item.afterImage} label="After" variant="after" />
      </motion.div>

      {/* status pill — top */}
      <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/50 bg-white/80 px-3.5 py-1.5 backdrop-blur-md">
        <AnimatePresence mode="wait" initial={false}>
          <motion.span
            key={mode}
            className="block text-[0.56rem] uppercase tracking-[0.26em]"
            initial={rm ? false : { opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            exit={rm ? undefined : { opacity: 0, y: -4 }}
            transition={{ duration: 0.22, ease: EASE }}
            style={{
              color:
                mode === "after"
                  ? "var(--color-accent-strong)"
                  : "rgba(60,60,60,0.7)",
            }}
          >
            {mode === "before" ? "Before" : `After · ${item.timeline}`}
          </motion.span>
        </AnimatePresence>
      </div>

      {/* case title — top right */}
      <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/50 bg-white/80 px-3.5 py-1.5 backdrop-blur-md">
        <span className="text-[0.56rem] uppercase tracking-[0.26em] text-[var(--color-ink)]/65">
          {item.title}
        </span>
      </div>

      {/* before/after toggle — bottom center */}
      <div className="absolute inset-x-0 bottom-4 flex justify-center">
        <div className="inline-flex rounded-full border border-[var(--color-soft-line)] bg-white/92 p-1 shadow-[0_10px_28px_rgba(16,23,18,0.1)] backdrop-blur-md">
          {(["before", "after"] as const).map((m) => (
            <button
              key={m}
              type="button"
              onClick={() => setMode(m)}
              aria-pressed={mode === m}
              className={`rounded-full px-5 py-2 text-[0.6rem] uppercase tracking-[0.26em] transition-colors duration-200 ${
                mode === m
                  ? "bg-[var(--color-accent)] text-white"
                  : "text-[var(--color-muted-ink)] hover:text-[var(--color-ink)]"
              }`}
            >
              {m}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ── section ── */

export default function BeforeAfterSection() {
  const rm = useReducedMotion();
  const [activeIndex, setActiveIndex] = useState(0);
  const [mobileMode, setMobileMode] = useState<"before" | "after">("before");
  const [navStep, setNavStep] = useState(1);

  const cases = BEFORE_AFTER_CASES;
  const total = cases.length;
  const activeCase: BeforeAfterCase = cases[activeIndex];
  const secondaryCase: BeforeAfterCase = cases[(activeIndex + 1) % total] ?? activeCase;

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");
    const syncNavStep = () => setNavStep(media.matches ? 2 : 1);

    syncNavStep();
    media.addEventListener("change", syncNavStep);

    return () => media.removeEventListener("change", syncNavStep);
  }, []);

  const goTo = (idx: number) => {
    const next = ((idx % total) + total) % total;
    setActiveIndex(next);
    setMobileMode("before");
  };

  return (
    <section
      id="results"
      data-nav-section
      data-header-tone="light"
      className="mobile-flow-section body-section-alt relative min-h-screen h-svh overflow-hidden"
    >
      <BodySectionVeil variant="alt" />

      <div className="site-shell relative flex h-full flex-col pt-[calc(var(--header-height)+28px)] pb-6 md:pt-[calc(var(--header-height)+34px)] md:pb-8">
        {/* ── header ── */}
        <motion.div
          className="section-shell shrink-0"
          initial={rm ? false : { opacity: 0, y: 14 }}
          whileInView={rm ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.6, ease: EASE }}
        >
          <p className="section-label">
            <span className="section-label-line" />
            <ShinyText text="Before / After" />
          </p>
          <div className="mt-4 flex items-end justify-between gap-6 md:mt-5">
            <h2 className="max-w-[14ch] font-[var(--font-manrope)] text-[clamp(2.2rem,4.4vw,4.4rem)] leading-[0.96] tracking-[-0.06em] text-[var(--color-ink)]">
              See the difference.
            </h2>
            <p className="hidden max-w-[28ch] text-[0.9rem] leading-[1.65] text-[var(--color-muted-ink)] md:block">
              Real cases from our clinic. Tap to compare before and after.
            </p>
          </div>
        </motion.div>

        {/* ── comparison surface ── */}
        <motion.div
          className="section-shell mt-5 flex min-h-0 flex-1 items-center md:mt-6"
          initial={rm ? false : { opacity: 0, y: 28 }}
          whileInView={rm ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.7, ease: EASE, delay: 0.08 }}
        >
          <div className="relative w-full">
            {/* desktop: two comparison cards */}
            <div className="hidden grid-cols-2 gap-5 md:grid lg:gap-6">
              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={`${activeCase.id}-${secondaryCase.id}`}
                  className="contents"
                  initial={rm ? false : { opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={rm ? undefined : { opacity: 0, y: -14 }}
                  transition={{ duration: 0.38, ease: EASE }}
                >
                  <ComparisonCard item={activeCase} rm={!!rm} />
                  <ComparisonCard item={secondaryCase} rm={!!rm} />
                </motion.div>
              </AnimatePresence>
            </div>

            {/* mobile: tap-to-toggle — portrait aspect */}
            <div className="md:hidden">
              <div className="relative mx-auto aspect-[3/4] h-auto w-full max-w-[min(80vw,360px)] overflow-hidden rounded-[22px] border border-[var(--color-soft-line)] bg-[var(--color-panel)] shadow-[0_14px_36px_rgba(16,23,18,0.06)]">
                <AnimatePresence mode="wait" initial={false}>
                  <motion.div
                    key={`${activeCase.id}-${mobileMode}`}
                    className="absolute inset-0"
                    initial={rm ? false : { opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={rm ? undefined : { opacity: 0 }}
                    transition={{ duration: 0.28, ease: EASE }}
                  >
                    <ImageSurface
                      image={
                        mobileMode === "before"
                          ? activeCase.beforeImage
                          : activeCase.afterImage
                      }
                      label={mobileMode === "before" ? "Before" : "After"}
                      variant={mobileMode}
                    />
                  </motion.div>
                </AnimatePresence>

                {/* timeline pill */}
                <div className="pointer-events-none absolute left-4 top-4 rounded-full border border-white/50 bg-white/80 px-3 py-1.5 backdrop-blur-md">
                  <span className="text-[0.55rem] uppercase tracking-[0.24em] text-[var(--color-ink)]/65">
                    {mobileMode === "before"
                      ? "Before"
                      : `After · ${activeCase.timeline}`}
                  </span>
                </div>

                {/* case title pill */}
                <div className="pointer-events-none absolute right-4 top-4 rounded-full border border-white/50 bg-white/80 px-3 py-1.5 backdrop-blur-md">
                  <span className="text-[0.55rem] uppercase tracking-[0.24em] text-[var(--color-ink)]/65">
                    {String(activeIndex + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
                  </span>
                </div>

                {/* toggle pill */}
                <div className="absolute inset-x-0 bottom-4 flex justify-center">
                  <div className="inline-flex rounded-full border border-[var(--color-soft-line)] bg-white/90 p-1 shadow-[0_10px_28px_rgba(16,23,18,0.1)] backdrop-blur-md">
                    {(["before", "after"] as const).map((mode) => (
                      <button
                        key={mode}
                        type="button"
                        onClick={() => setMobileMode(mode)}
                        className={`rounded-full px-5 py-2 text-[0.62rem] uppercase tracking-[0.26em] transition-colors duration-200 ${
                          mobileMode === mode
                            ? "bg-[var(--color-accent)] text-white"
                            : "text-[var(--color-muted-ink)]"
                        }`}
                      >
                        {mode}
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </motion.div>

        {/* ── footer: case info + pagination ── */}
        <motion.div
          className="section-shell mt-auto flex shrink-0 flex-col items-start gap-4 pt-5 sm:flex-row sm:items-end sm:justify-between md:pt-6"
          initial={rm ? false : { opacity: 0 }}
          whileInView={rm ? undefined : { opacity: 1 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
        >
          {/* case meta — animates between cases */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`meta-${activeCase.id}`}
              className="min-w-0"
              initial={rm ? false : { opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={rm ? undefined : { opacity: 0, y: -8 }}
              transition={{ duration: 0.3, ease: EASE }}
            >
              <p className="font-[var(--font-manrope)] text-[clamp(1.2rem,2vw,1.8rem)] leading-[1.05] tracking-[-0.04em] text-[var(--color-ink)]">
                {activeCase.timeline}
              </p>
              <p className="mt-1 text-[0.72rem] leading-[1.5] text-[var(--color-muted-ink)] md:text-[0.78rem]">
                {activeCase.technique} · {activeCase.focusArea}
              </p>
            </motion.div>
          </AnimatePresence>

          {/* pagination controls */}
          <div className="flex items-center gap-4 self-stretch sm:self-end">
            {/* dots */}
            <div className="flex items-center gap-2">
              {cases.map((c, i) => (
                <button
                  key={c.id}
                  type="button"
                  onClick={() => goTo(i)}
                  aria-label={`Case ${i + 1}: ${c.title}`}
                  aria-current={i === activeIndex}
                  className="block rounded-full transition-all duration-400"
                  style={{
                    width: i === activeIndex ? 22 : 6,
                    height: 6,
                    backgroundColor:
                      i === activeIndex
                        ? "var(--color-accent-strong)"
                        : "rgba(84,133,100,0.22)",
                  }}
                />
              ))}
            </div>

            {/* counter */}
            <p className="font-[var(--font-manrope)] text-[0.95rem] leading-none tracking-[-0.04em] text-[var(--color-ink)]/55 md:text-[1.05rem]">
              {String(activeIndex + 1).padStart(2, "0")}
              <span className="mx-1 text-[var(--color-muted-ink)]">/</span>
              {String(total).padStart(2, "0")}
            </p>

            {/* arrows */}
            <div className="ml-auto flex items-center gap-2 sm:ml-0">
              <NavButton direction="prev" onClick={() => goTo(activeIndex - navStep)} />
              <NavButton direction="next" onClick={() => goTo(activeIndex + navStep)} />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
