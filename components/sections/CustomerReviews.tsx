"use client";

import { motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { useScrollNavigation } from "@/components/layout/SmoothScrollProvider";
import BodySectionVeil from "@/components/ui/BodySectionVeil";
import { REVIEW_STORIES } from "@/lib/siteContent";

const initialsFromName = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

export default function CustomerReviews() {
  const { sectionSubsteps } = useScrollNavigation();
  const viewportRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const [trackPositions, setTrackPositions] = useState<number[]>([0]);
  const activeIndex = sectionSubsteps.stories ?? 0;
  const activeTrackX = trackPositions[activeIndex] ?? trackPositions[0] ?? 0;

  useEffect(() => {
    const measure = () => {
      const viewport = viewportRef.current;
      const track = trackRef.current;
      if (!viewport || !track) return;

      const cards = Array.from(track.children) as HTMLElement[];
      if (cards.length === 0) return;

      const viewportWidth = viewport.clientWidth;
      const trackWidth = track.scrollWidth;
      const railInset =
        viewportWidth >= 1440
          ? 30
          : viewportWidth >= 1024
            ? 22
            : viewportWidth >= 768
              ? 18
              : 12;
      const minTrackX = viewportWidth - railInset - trackWidth;
      const maxTrackX = railInset;
      const nextPositions = cards.map((card) => {
        const alignedLeft = railInset - card.offsetLeft;
        return Math.max(minTrackX, Math.min(maxTrackX, alignedLeft));
      });

      setTrackPositions(nextPositions);
    };

    measure();

    const observer = new ResizeObserver(measure);
    if (viewportRef.current) observer.observe(viewportRef.current);
    if (trackRef.current) observer.observe(trackRef.current);

    window.addEventListener("resize", measure);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", measure);
    };
  }, []);

  return (
    <section
      id="stories"
      data-nav-section
      data-header-tone="dark"
      className="body-section relative min-h-screen h-svh overflow-hidden"
    >
      <BodySectionVeil variant="body" />

      <div className="site-shell relative flex h-full flex-col pt-[calc(var(--header-height)+28px)] pb-6 md:pt-[calc(var(--header-height)+34px)] md:pb-8">
        {/* ── header area ── */}
        <div className="section-shell shrink-0">
          <p className="section-label">
            <span className="section-label-line" />
            Patient Stories
          </p>
          <div className="mt-5 flex items-end justify-between gap-5">
            <h2 className="max-w-[15ch] font-[var(--font-manrope)] text-[clamp(2.5rem,4.6vw,4.8rem)] leading-[0.94] tracking-[-0.06em] text-[var(--color-ink)] lg:max-w-[16ch]">
              Life-changing, told in a quieter register.
            </h2>
          </div>
        </div>

        {/* ── card rail — vertically centered in remaining space ── */}
        <div className="relative flex flex-1 items-center min-h-0">
          <div
            ref={viewportRef}
            className="relative left-1/2 w-screen -translate-x-1/2 overflow-hidden px-3 md:px-5 lg:px-6"
          >
            <motion.div
              ref={trackRef}
              className="flex items-stretch gap-5 will-change-transform md:gap-6 lg:gap-7"
              animate={{ x: activeTrackX }}
              transition={
                prefersReducedMotion
                  ? { duration: 0 }
                  : { type: "spring", stiffness: 100, damping: 22, mass: 0.85 }
              }
            >
              {REVIEW_STORIES.map((review, index) => {
                const isActive = index === activeIndex;

                return (
                  <article
                    key={review.id}
                    className="group relative flex shrink-0 overflow-hidden transition-all duration-500"
                    style={{
                      width: "min(86vw, 520px)",
                      opacity: isActive ? 1 : 0.5,
                      transform: isActive ? "scale(1)" : "scale(0.97)",
                    }}
                  >
                    {/* card */}
                    <div
                      className={`relative flex h-full flex-1 flex-col justify-between rounded-2xl border px-7 py-6 transition-[background-color,border-color] duration-500 md:rounded-3xl md:px-9 md:py-8 ${
                        isActive
                          ? "border-[rgba(109,129,104,0.32)] bg-[rgba(255,255,255,0.05)]"
                          : "border-[var(--color-soft-line)] bg-[rgba(255,255,255,0.02)]"
                      }`}
                    >
                      {/* quote mark */}
                      <div className="pointer-events-none absolute top-5 right-6 font-[var(--font-manrope)] text-[5rem] leading-none tracking-tighter text-white/[0.04] md:top-4 md:right-8 md:text-[7rem]">
                        &ldquo;
                      </div>

                      {/* stars */}
                      <div className="flex gap-1 text-[var(--color-accent-strong)]">
                        {[...Array(review.rating)].map((_, ratingIndex) => (
                          <span
                            key={`${review.id}-star-${ratingIndex}`}
                            className="text-[0.9rem] leading-none md:text-[1rem]"
                          >
                            ★
                          </span>
                        ))}
                      </div>

                      {/* review text */}
                      <p className="mt-5 text-[clamp(0.95rem,1.12vw,1.18rem)] leading-[1.65] tracking-[-0.01em] text-[var(--color-ink)] md:mt-6">
                        &ldquo;{review.text}&rdquo;
                      </p>

                      {/* divider */}
                      <div className="mt-6 h-px bg-white/[0.08] md:mt-7" />

                      {/* author */}
                      <div className="mt-4 flex items-center gap-3.5 md:mt-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] font-[var(--font-manrope)] text-[0.72rem] uppercase tracking-[0.2em] text-[var(--color-accent-strong)] md:h-11 md:w-11 md:text-[0.78rem]">
                          {initialsFromName(review.author)}
                        </div>
                        <div>
                          <h3 className="font-[var(--font-manrope)] text-[0.92rem] font-medium text-[var(--color-ink)] md:text-[1rem]">
                            {review.author}
                          </h3>
                          <p className="mt-0.5 text-[0.82rem] text-[var(--color-muted-ink)] md:text-[0.88rem]">
                            {review.location}
                          </p>
                        </div>
                      </div>
                    </div>
                  </article>
                );
              })}
            </motion.div>
          </div>
        </div>

        {/* ── bottom bar: pagination + counter ── */}
        <div className="section-shell mt-auto flex shrink-0 items-center justify-between pt-5 md:pt-6">
          {/* dot pagination */}
          <div className="flex items-center gap-2.5">
            {REVIEW_STORIES.map((_, idx) => (
              <span
                key={`dot-${idx}`}
                className="block rounded-full transition-all duration-400"
                style={{
                  width: idx === activeIndex ? 24 : 6,
                  height: 6,
                  backgroundColor:
                    idx === activeIndex
                      ? "var(--color-accent-strong)"
                      : "rgba(255,255,255,0.15)",
                }}
              />
            ))}
          </div>

          {/* counter */}
          <div className="text-right">
            <p className="font-[var(--font-manrope)] text-[clamp(1.4rem,2.4vw,2rem)] leading-none tracking-[-0.07em] text-[var(--color-soft-line-strong)]">
              {String(activeIndex + 1).padStart(2, "0")}
              <span className="mx-1.5 text-[0.7em] text-[var(--color-muted-ink)]">/</span>
              {String(REVIEW_STORIES.length).padStart(2, "0")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
