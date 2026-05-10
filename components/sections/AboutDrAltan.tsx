"use client";

import Image from "next/image";
import { m as motion, useReducedMotion } from "framer-motion";
import BodySectionVeil from "@/components/ui/BodySectionVeil";
import ShinyText from "@/components/ui/ShinyText";
import { LEAD_DOCTOR } from "@/lib/siteContent";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

export default function AboutDrAltan() {
  const doctor = LEAD_DOCTOR;
  const rm = useReducedMotion();

  return (
    <section
      id="doctor"
      data-nav-section
      data-header-tone="light"
      className="mobile-flow-section body-section relative min-h-screen h-svh overflow-hidden"
    >
      <BodySectionVeil variant="body" />

      <div className="site-shell relative flex h-full flex-col pt-[calc(var(--header-height)+28px)] pb-6 md:pt-[calc(var(--header-height)+34px)] md:pb-8">

        {/* ── section label ── */}
        <motion.div
          className="section-shell shrink-0"
          initial={rm ? false : { opacity: 0, y: 10 }}
          whileInView={rm ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.5, ease: EASE }}
        >
          <p className="section-label">
            <span className="section-label-line" />
            <ShinyText text="Lead Surgeon" />
          </p>
        </motion.div>

        {/* ── main grid ── */}
        <div className="section-shell mt-4 flex min-h-0 flex-1 items-center md:mt-5">
          <div className="grid w-full min-h-0 items-center gap-4 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.15fr)] lg:gap-12 xl:gap-16">

            {/* ── portrait card ── */}
            <motion.div
              className="order-2 lg:order-1 lg:h-full lg:flex lg:items-stretch"
              initial={rm ? false : { opacity: 0, y: 40, scale: 0.97 }}
              whileInView={rm ? undefined : { opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.85, ease: EASE }}
            >
              <div
                  className="relative h-[min(27svh,220px)] w-full overflow-hidden rounded-[22px] lg:h-[70svh] lg:max-h-[680px]"
                style={{
                  background:
                    "radial-gradient(ellipse at 46% 12%, rgba(84,133,100,0.2) 0%, transparent 52%), linear-gradient(160deg, var(--color-cream-light) 0%, var(--color-cream-deep) 100%)",
                }}
              >
                <Image
                  src={doctor.image}
                  alt={`${doctor.name} portrait`}
                  fill
                  sizes="(max-width: 1023px) 90vw, 42vw"
                  className="object-contain object-bottom"
                  loading="eager"
                  fetchPriority="high"
                  style={{
                    objectPosition: doctor.portraitPosition ?? "center bottom",
                    filter: "sepia(0.1) saturate(0.9) brightness(0.97) contrast(1.02)",
                  }}
                />

                {/* subtle bottom veil for notes */}
                <div
                  className="pointer-events-none absolute inset-x-0 bottom-0 h-[40%]"
                  style={{
                    background:
                      "linear-gradient(to top, rgba(12,18,14,0.48) 0%, rgba(12,18,14,0.0) 100%)",
                  }}
                />

                {/* frosted bottom bar */}
                <div className="absolute bottom-3 left-3 right-3 rounded-[14px] border border-white/40 px-4 py-3 backdrop-blur-[14px] lg:bottom-4 lg:left-4 lg:right-4 lg:px-5 lg:py-4"
                  style={{ background: "rgba(240,236,226,0.72)" }}
                >
                  <p className="font-[var(--font-manrope)] text-[1.05rem] leading-[1.1] tracking-[-0.05em] text-[var(--color-ink)] lg:text-[1.65rem]">
                    {doctor.name}
                  </p>
                  <div className="mt-1.5 flex items-center justify-between gap-3">
                    <p className="text-[0.5rem] uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
                      {doctor.role}
                    </p>
                    <div className="flex items-center gap-3">
                      {doctor.noteLeft && (
                        <span className="text-[0.48rem] uppercase tracking-[0.2em] text-[var(--color-muted-ink)]">
                          {doctor.noteLeft}
                        </span>
                      )}
                      {doctor.noteRight && (
                        <span className="text-[0.48rem] uppercase tracking-[0.2em] text-[var(--color-muted-ink)]">
                          {doctor.noteRight}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* inset ring */}
                <div className="pointer-events-none absolute inset-0 rounded-[22px] ring-1 ring-inset ring-[var(--color-soft-line)]" />
              </div>
            </motion.div>

            {/* ── content ── */}
            <div className="order-1 flex min-w-0 flex-col lg:order-2">

              {/* name — desktop only (mobile shown in portrait bar) */}
              <motion.div
                className="hidden lg:block"
                initial={rm ? false : { opacity: 0, y: 22 }}
                whileInView={rm ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.6, ease: EASE, delay: 0.08 }}
              >
                <p className="text-[0.6rem] uppercase tracking-[0.28em] text-[var(--color-accent-strong)]">
                  {doctor.role}
                </p>
                <h2 className="mt-3 font-[var(--font-manrope)] text-[clamp(2.4rem,4.2vw,4rem)] leading-[0.92] tracking-[-0.07em] text-[var(--color-ink)]">
                  {doctor.name}
                </h2>
              </motion.div>

              {/* name — mobile only */}
              <motion.div
                className="lg:hidden"
                initial={rm ? false : { opacity: 0, y: 18 }}
                whileInView={rm ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.56, ease: EASE }}
              >
                <p className="text-[0.58rem] uppercase tracking-[0.26em] text-[var(--color-accent-strong)]">
                  {doctor.role}
                </p>
                <h2 className="mt-2 font-[var(--font-manrope)] text-[clamp(1.75rem,7vw,2.5rem)] leading-[0.94] tracking-[-0.06em] text-[var(--color-ink)]">
                  {doctor.name}
                </h2>
              </motion.div>

              {/* divider + bio */}
              <motion.div
                className="mt-4 lg:mt-6"
                initial={rm ? false : { opacity: 0, y: 14 }}
                whileInView={rm ? undefined : { opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.15 }}
                transition={{ duration: 0.56, ease: EASE, delay: 0.14 }}
              >
                <div className="h-px bg-[var(--color-soft-line)]" />
                <p className="mt-3 text-[clamp(0.8rem,3.4vw,0.98rem)] leading-[1.55] text-[var(--color-muted-ink)] lg:mt-5 lg:max-w-[38ch] lg:leading-[1.7]">
                  {doctor.summary}
                </p>
              </motion.div>

              {/* highlights */}
              <div className="mt-3 border-t border-[var(--color-soft-line)] lg:mt-6">
                {doctor.highlights.map((highlight, i) => (
                  <motion.article
                    key={`hl-${i}`}
                    className="flex gap-3 border-b border-[var(--color-soft-line)] py-2.5 lg:gap-4 lg:py-4"
                    initial={rm ? false : { opacity: 0, x: -14 }}
                    whileInView={rm ? undefined : { opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.15 }}
                    transition={{
                      duration: 0.46,
                      ease: EASE,
                      delay: rm ? 0 : 0.1 + i * 0.08,
                    }}
                  >
                    <span className="shrink-0 pt-px text-[0.6rem] uppercase tracking-[0.26em] text-[var(--color-accent)] lg:text-[0.62rem]">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <p className="text-[0.72rem] leading-[1.42] text-[var(--color-ink)]/75 lg:text-[0.86rem] lg:leading-[1.6]">
                      {highlight}
                    </p>
                  </motion.article>
                ))}
              </div>

            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
