"use client";

import Image from "next/image";
import BodySectionVeil from "@/components/ui/BodySectionVeil";
import { LEAD_DOCTOR } from "@/lib/siteContent";

export default function AboutDrAltan() {
  const doctor = LEAD_DOCTOR;

  return (
    <section
      id="doctor"
      data-nav-section
      data-header-tone="dark"
      className="body-section relative min-h-screen h-svh overflow-hidden"
    >
      <BodySectionVeil variant="body" />

      <div className="site-shell relative flex h-full flex-col pt-[calc(var(--header-height)+28px)] pb-6 md:pt-[calc(var(--header-height)+34px)] md:pb-8">
        {/* ── header ── */}
        <div className="section-shell shrink-0">
          <p className="section-label">
            <span className="section-label-line" />
            Lead Surgeon
          </p>
        </div>

        {/* ── main content — fills remaining space ── */}
        <div className="section-shell mt-3 flex flex-1 items-center min-h-0 md:mt-4">
          <div className="grid w-full items-center gap-6 lg:grid-cols-[1fr_minmax(0,0.48fr)] lg:gap-10 xl:gap-14">
            {/* ── left: text ── */}
            <div className="order-2 flex flex-col lg:order-1">
              <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-accent-strong)]">
                {doctor.role}
              </p>
              <h2 className="mt-3 max-w-[10ch] font-[var(--font-manrope)] text-[clamp(2.8rem,7vw,6rem)] leading-[0.92] tracking-[-0.07em] text-[var(--color-ink)]">
                {doctor.name}
              </h2>

              <div className="mt-5 h-px bg-[var(--color-soft-line)] md:mt-6" />

              <p className="mt-5 max-w-[40ch] text-[clamp(0.92rem,1.1vw,1.08rem)] leading-[1.72] text-[var(--color-muted-ink)] md:mt-6">
                {doctor.summary}
              </p>

              {/* highlights grid */}
              <div className="mt-6 grid gap-2.5 sm:grid-cols-2 md:mt-7">
                {doctor.highlights.map((highlight, index) => (
                  <article
                    key={`highlight-${index}`}
                    className="rounded-xl border border-white/[0.06] bg-white/[0.02] px-4 py-3.5 transition-colors duration-300 hover:border-[rgba(109,129,104,0.2)] hover:bg-white/[0.04] md:px-5 md:py-4"
                  >
                    <p className="text-[0.65rem] uppercase tracking-[0.28em] text-[var(--color-muted-ink)]">
                      {String(index + 1).padStart(2, "0")}
                    </p>
                    <p className="mt-2 text-[0.84rem] leading-[1.56] text-[var(--color-ink)]/[0.78] md:text-[0.88rem]">
                      {highlight}
                    </p>
                  </article>
                ))}
              </div>
            </div>

            {/* ── right: portrait ── */}
            <div className="order-1 flex min-h-0 items-center justify-center lg:order-2 lg:justify-end">
              <div className="panel-surface relative w-full max-w-[380px] p-2 lg:max-w-[420px]">
                <div
                  className="relative aspect-[480/793] w-full overflow-hidden rounded-[28px]"
                  style={{
                    background:
                      "radial-gradient(circle_at_18%_18%,rgba(109,129,104,0.2),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.06),transparent_28%),linear-gradient(180deg,rgba(16,23,18,0.92),rgba(10,15,11,1))",
                  }}
                >
                  <div
                    className="absolute inset-0 z-[1]"
                    style={{
                      background:
                        "radial-gradient(ellipse 80% 40% at 50% 0%, rgba(255,255,255,0.12), transparent 60%)",
                    }}
                  />

                  <Image
                    src={doctor.image}
                    alt={`${doctor.name} portrait`}
                    fill
                    sizes="(max-width: 767px) 80vw, (max-width: 1023px) 50vw, 38vw"
                    className="relative z-[2] object-contain object-bottom"
                    priority
                  />

                  <div
                    className="absolute inset-x-0 bottom-0 z-[3] h-[80px]"
                    style={{
                      background: "linear-gradient(to top, rgba(0,0,0,0.34), transparent)",
                    }}
                  />

                  <div className="absolute inset-x-5 bottom-4 z-[4] flex items-center justify-between gap-3 text-[9px] uppercase tracking-[0.28em] text-[var(--color-hero-muted)] md:inset-x-6 md:bottom-5">
                    <span>{doctor.noteLeft}</span>
                    <span>{doctor.noteRight}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
