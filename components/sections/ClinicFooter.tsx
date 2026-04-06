"use client";

import Image from "next/image";
import { OFFICES } from "@/lib/siteData";
import { SOLUTION_CASES } from "@/lib/siteContent";
import { useLenis } from "@/components/layout/SmoothScrollProvider";

const phoneHref = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;

const FOOTER_LINKS = [
  { label: "Instagram", href: "https://instagram.com/drahmedaltan" },
  { label: "WhatsApp", href: "https://wa.me/905412116126" },
];

export default function ClinicFooter() {
  const { scrollToSection } = useLenis();

  return (
    <footer
      id="offices"
      data-nav-section
      data-header-tone="dark"
      className="dark-section relative min-h-screen h-svh overflow-hidden"
    >
      {/* ── ambient background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(109,129,104,0.18),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.06),transparent_28%),linear-gradient(180deg,rgba(16,23,18,0.96),rgba(10,15,11,1))]" />
        <div className="absolute left-[8%] top-[18%] h-[24vh] w-[20vw] rounded-full bg-[rgba(109,129,104,0.14)] blur-[92px]" />
        <div className="absolute bottom-[12%] right-[10%] h-[22vh] w-[22vw] rounded-full bg-white/[0.06] blur-[120px]" />
      </div>

      <div className="site-shell relative flex h-full flex-col pt-[calc(var(--header-height)+28px)] pb-6 md:pt-[calc(var(--header-height)+34px)] md:pb-8">
        {/* ── top: brand + tagline ── */}
        <div className="section-shell shrink-0">
          <div className="flex items-start justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="relative h-10 w-10 overflow-hidden rounded-full border border-white/[0.12] bg-white/[0.04] md:h-11 md:w-11">
                <Image
                  src="/images/projects/ahmed-altan-logo-icon.png"
                  alt="Dr. Ahmed Altan"
                  fill
                  className="object-contain object-center scale-[0.92]"
                />
              </div>
              <div>
                <p className="text-[8px] uppercase tracking-[0.34em] text-[var(--color-hero-muted)]">
                  Showcase
                </p>
                <p className="mt-1 font-[var(--font-manrope)] text-[0.95rem] uppercase tracking-[0.24em] text-[var(--color-hero-fg)]">
                  Dr.Altan
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => scrollToSection("intro")}
              className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--color-hero-muted)] transition-colors duration-300 hover:text-[var(--color-hero-fg)]"
            >
              Back to top
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
            </button>
          </div>
        </div>

        {/* ── divider ── */}
        <div className="section-shell mt-5 h-px shrink-0 bg-white/[0.08] md:mt-6" />

        {/* ── main content — vertically centered ── */}
        <div className="section-shell flex flex-1 items-center min-h-0">
          <div className="w-full">
            <div className="grid w-full gap-10 lg:grid-cols-[1fr_1fr] lg:gap-14 xl:gap-20">
              {/* ── left: headline + description ── */}
              <div className="flex flex-col justify-center">
                <p className="section-label text-[var(--color-hero-muted)]">
                  <span className="section-label-line" />
                  Get in Touch
                </p>

                <h2 className="mt-5 max-w-[12ch] font-[var(--font-manrope)] text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[0.94] tracking-[-0.06em] text-[var(--color-hero-fg)]">
                  Begin the conversation.
                </h2>

                <p className="mt-5 max-w-[36ch] text-[clamp(0.88rem,1vw,1rem)] leading-[1.72] text-[var(--color-hero-muted)]">
                  Connect with the Istanbul clinic or speak with one of our European representatives before planning treatment.
                </p>

                {/* social links */}
                <div className="mt-7 flex gap-3 md:mt-8">
                  {FOOTER_LINKS.map((link) => (
                    <a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rounded-full border border-white/[0.1] bg-white/[0.03] px-4 py-2 text-[0.78rem] tracking-[-0.01em] text-[var(--color-hero-muted)] transition-all duration-300 hover:border-[rgba(109,129,104,0.3)] hover:bg-white/[0.05] hover:text-[var(--color-hero-fg)]"
                    >
                      {link.label}
                    </a>
                  ))}
                </div>
              </div>

              {/* ── right: office cards ── */}
              <div className="flex flex-col gap-3 md:gap-4">
                {OFFICES.map((office) => (
                  <article
                    key={office.title}
                    className="group flex items-start justify-between gap-5 rounded-2xl border border-white/[0.08] bg-white/[0.02] px-5 py-4 transition-colors duration-300 hover:border-[rgba(109,129,104,0.22)] hover:bg-white/[0.04] md:px-6 md:py-5"
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--color-hero-muted)]">
                        {office.title}
                      </p>
                      <p className="mt-2.5 max-w-[30ch] text-[0.86rem] leading-[1.6] text-[var(--color-hero-fg)]/[0.72]">
                        {office.address}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <a
                        href={phoneHref(office.phone)}
                        className="block text-[0.88rem] leading-relaxed text-[var(--color-hero-fg)] transition-colors duration-300 hover:text-[var(--color-accent-strong)]"
                      >
                        {office.phone}
                      </a>
                      {office.email ? (
                        <a
                          href={`mailto:${office.email}`}
                          className="mt-1 block text-[0.78rem] leading-relaxed text-[var(--color-hero-muted)] transition-colors duration-300 hover:text-[var(--color-hero-fg)]"
                        >
                          {office.email}
                        </a>
                      ) : null}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ── bottom bar ── */}
        <div className="section-shell mt-auto shrink-0">
          <div className="h-px bg-white/[0.08]" />
          <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between md:pt-5">
            {/* treatments quick-links */}
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {SOLUTION_CASES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToSection("solutions", { substep: i })}
                  className="text-[0.72rem] tracking-[0.02em] text-[var(--color-hero-muted)]/60 transition-colors duration-300 hover:text-[var(--color-hero-fg)]"
                >
                  {s.title}
                </button>
              ))}
            </div>

            {/* copyright */}
            <p className="shrink-0 text-[0.72rem] tracking-[0.02em] text-[var(--color-hero-muted)]/40">
              © {new Date().getFullYear()} Dr. Ahmed Altan. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
