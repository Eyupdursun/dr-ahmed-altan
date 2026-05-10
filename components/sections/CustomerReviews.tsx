"use client";

import { m as motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import BodySectionVeil from "@/components/ui/BodySectionVeil";
import ShinyText from "@/components/ui/ShinyText";
import { REVIEW_STORIES } from "@/lib/siteContent";

const initialsFromName = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("")
    .slice(0, 2);

export default function CustomerReviews() {
  const viewportRef = useRef<HTMLDivElement>(null);
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const viewport = viewportRef.current;
    if (!viewport) return;

    /* Skip wheel handler on mobile — native touch scroll handles this */
    if (window.matchMedia("(max-width: 1024px), (pointer: coarse)").matches) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;

      const maxScrollLeft = viewport.scrollWidth - viewport.clientWidth;
      if (maxScrollLeft <= 0) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const atStart = viewport.scrollLeft <= 2;
      const atEnd = viewport.scrollLeft >= maxScrollLeft - 2;

      if ((direction < 0 && atStart) || (direction > 0 && atEnd)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      viewport.scrollLeft += event.deltaY;
    };

    viewport.addEventListener("wheel", handleWheel, { passive: false });
    return () => viewport.removeEventListener("wheel", handleWheel);
  }, [prefersReducedMotion]);

  return (
    <section
      id="stories"
      data-nav-section
      data-header-tone="light"
      className="mobile-flow-section body-section relative min-h-screen h-svh overflow-hidden"
    >
      <BodySectionVeil variant="body" />

      <div className="site-shell relative flex h-full flex-col pt-[calc(var(--header-height)+28px)] pb-6 md:pt-[calc(var(--header-height)+34px)] md:pb-8">
        {/* ── header area ── */}
        <div className="section-shell shrink-0">
          <p className="section-label">
            <span className="section-label-line" />
            <ShinyText text="Patient Stories" />
          </p>
          <div className="mt-5 flex items-end justify-between gap-5">
            <h2 className="max-w-[15ch] font-[var(--font-manrope)] text-[clamp(2.5rem,4.6vw,4.8rem)] leading-[0.94] tracking-[-0.06em] text-[var(--color-ink)] lg:max-w-[16ch]">
              Life-changing, told in a quieter register.
            </h2>
          </div>
        </div>

        {/* ── card rail — vertically centered in remaining space ── */}
        <div className="relative left-1/2 flex w-screen -translate-x-1/2 flex-1 items-center min-h-0">
          <div
            ref={viewportRef}
            className="-my-8 relative w-full overflow-x-auto overflow-y-visible scroll-smooth py-8 pl-[clamp(1.25rem,4vw,3.125rem)] pr-[clamp(1.25rem,4vw,3.125rem)] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
          >
            <motion.div
              className="flex w-max items-stretch gap-5 md:gap-6 lg:gap-7"
              initial={prefersReducedMotion ? false : { opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            >
              {REVIEW_STORIES.map((review, index) => {
                return (
                  <motion.article
                    key={review.id}
                    className="group relative flex shrink-0 overflow-visible"
                    style={{
                      width: "min(86vw, 520px)",
                    }}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.52,
                      ease: [0.16, 1, 0.3, 1],
                      delay: prefersReducedMotion ? 0 : index * 0.035,
                    }}
                  >
                    {/* card */}
                    <div
                      className="relative flex h-full flex-1 flex-col justify-between rounded-2xl border border-[var(--color-soft-line)] bg-[var(--color-panel)] px-7 py-6 shadow-[0_18px_44px_rgba(16,23,18,0.045)] transition-[background-color,border-color,transform] duration-500 hover:-translate-y-1 hover:border-[var(--color-soft-line-strong)] md:rounded-3xl md:px-9 md:py-8"
                    >
                      {/* quote mark */}
                      <div className="pointer-events-none absolute top-5 right-6 font-[var(--font-manrope)] text-[5rem] leading-none tracking-tighter text-[rgba(84,133,100,0.1)] md:top-4 md:right-8 md:text-[7rem]">
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
                      <div className="mt-6 h-px bg-[var(--color-soft-line)] md:mt-7" />

                      {/* author */}
                      <div className="mt-4 flex items-center gap-3.5 md:mt-5">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full border border-[var(--color-soft-line)] bg-white/45 font-[var(--font-manrope)] text-[0.72rem] uppercase tracking-[0.2em] text-[var(--color-accent-strong)] md:h-11 md:w-11 md:text-[0.78rem]">
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
                  </motion.article>
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
                className="block h-1.5 w-1.5 rounded-full bg-[rgba(84,133,100,0.22)]"
              />
            ))}
          </div>

          {/* counter */}
          <div className="text-right">
            <p className="font-[var(--font-manrope)] text-[clamp(1.4rem,2.4vw,2rem)] leading-none tracking-[-0.07em] text-[var(--color-soft-line-strong)]">
              {String(REVIEW_STORIES.length).padStart(2, "0")}
              <span className="ml-1.5 text-[0.42em] uppercase tracking-[0.22em] text-[var(--color-muted-ink)]">stories</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
