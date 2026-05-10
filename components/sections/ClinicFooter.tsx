"use client";

import { m as motion, useReducedMotion } from "framer-motion";
import { OFFICES } from "@/lib/siteData";
import { SOLUTION_CASES } from "@/lib/siteContent";
import { useScrollNavigation } from "@/components/layout/SmoothScrollProvider";
import ShinyText from "@/components/ui/ShinyText";

const phoneHref = (phone: string) => `tel:${phone.replace(/\s+/g, "")}`;
const EASE_STANDARD: [number, number, number, number] = [0.16, 1, 0.3, 1];
const FOOTER_VIEWPORT = { once: true, amount: 0.28 };

const FOOTER_TEXT_VARIANTS = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.16,
    },
  },
};

const FOOTER_LABEL_VARIANTS = {
  hidden: { opacity: 0, y: 22, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.74,
      ease: EASE_STANDARD,
    },
  },
};

const FOOTER_HEADLINE_LINE_VARIANTS = {
  hidden: { opacity: 0.2, y: "112%" },
  visible: (index: number) => ({
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.88,
      delay: 0.12 + index * 0.09,
      ease: EASE_STANDARD,
    },
  }),
};

const FOOTER_COPY_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 34,
    filter: "blur(14px)",
    clipPath: "inset(0 0 100% 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.82,
      ease: EASE_STANDARD,
    },
  },
};

const FOOTER_LINKS_VARIANTS = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.09,
      delayChildren: 0.1,
    },
  },
};

const FOOTER_LINK_VARIANTS = {
  hidden: { opacity: 0, y: 26, scale: 0.86, filter: "blur(8px)" },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    filter: "blur(0px)",
    transition: {
      duration: 0.68,
      ease: EASE_STANDARD,
    },
  },
};

const FOOTER_CARDS_VARIANTS = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.34,
    },
  },
};

const FOOTER_CARD_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 24,
    scale: 0.985,
  },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.64,
      ease: EASE_STANDARD,
    },
  },
};

const FOOTER_SPOTLIGHT_VARIANTS = {
  hidden: { opacity: 0.18, scale: 0.72, x: "-14%", y: "-10%" },
  visible: {
    opacity: [0.18, 0.78, 0.24],
    scale: [0.72, 1.06, 0.98],
    x: ["-14%", "2%", "0%"],
    y: ["-10%", "-2%", "0%"],
    transition: {
      duration: 1.2,
      ease: EASE_STANDARD,
      times: [0, 0.52, 1],
    },
  },
};

const FOOTER_SWEEP_VARIANTS = {
  hidden: { opacity: 0, x: "-34%", rotate: 16 },
  visible: {
    opacity: [0, 0.92, 0],
    x: ["-34%", "36%", "112%"],
    rotate: [16, 12, 8],
    transition: {
      duration: 1.14,
      ease: EASE_STANDARD,
      times: [0, 0.42, 1],
    },
  },
};

type SocialLink = {
  label: string;
  href: string;
  icon: "instagram" | "whatsapp";
};

function SocialIcon({ type }: { type: SocialLink["icon"] }) {
  if (type === "instagram") {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[0.92rem] w-[0.92rem]"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <rect x="3.75" y="3.75" width="16.5" height="16.5" rx="5" />
        <circle cx="12" cy="12" r="4.1" />
        <circle cx="17.55" cy="6.45" r="0.8" fill="currentColor" stroke="none" />
      </svg>
    );
  }

  return (
    <svg
      viewBox="0 0 24 24"
      aria-hidden="true"
      className="h-[0.92rem] w-[0.92rem]"
      fill="currentColor"
    >
      <path d="M19.1 4.9A9.85 9.85 0 0 0 3.4 16.8L2 22l5.33-1.4A9.85 9.85 0 0 0 22 12.55 9.6 9.6 0 0 0 19.1 4.9Zm-7.04 14.92c-1.57 0-3.1-.42-4.44-1.22l-.32-.19-3.16.83.85-3.07-.2-.32a8.08 8.08 0 0 1 1.42-10 8.1 8.1 0 0 1 11.43 0 7.84 7.84 0 0 1 2.37 5.65c0 4.48-3.62 8.32-7.95 8.32Zm4.42-5.92c-.24-.12-1.4-.7-1.62-.77-.21-.08-.36-.12-.5.12-.15.23-.58.76-.71.91-.13.16-.27.18-.5.06-.24-.12-1-.36-1.9-1.16-.7-.62-1.17-1.38-1.31-1.62-.14-.24-.02-.37.1-.5.11-.11.24-.27.36-.4.12-.14.16-.24.24-.4.08-.16.04-.3-.02-.42-.06-.12-.5-1.27-.7-1.74-.18-.45-.37-.38-.5-.39h-.43c-.16 0-.42.06-.64.3-.22.23-.84.82-.84 2 0 1.18.86 2.32.98 2.48.12.16 1.68 2.68 4.16 3.64 2.48.96 2.48.64 2.93.6.45-.05 1.4-.58 1.59-1.15.2-.56.2-1.04.14-1.14-.06-.1-.21-.16-.45-.28Z" />
    </svg>
  );
}

const FOOTER_LINKS = [
  { label: "Instagram", href: "https://instagram.com/drahmedaltan", icon: "instagram" },
  { label: "WhatsApp", href: "https://wa.me/905412116126", icon: "whatsapp" },
] satisfies SocialLink[];

const FOOTER_HEADLINE_LINES = ["Begin the", "conversation."];

export default function ClinicFooter() {
  const { scrollToSection } = useScrollNavigation();
  const prefersReducedMotion = useReducedMotion();

  return (
    <footer
      id="offices"
      data-nav-section
      data-header-tone="light"
      className="mobile-flow-section relative min-h-screen lg:h-svh overflow-hidden bg-[var(--color-body)] text-[var(--color-text)] flex flex-col"
    >
      {/* ── ambient background ── */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(84,133,100,0.2),transparent_34%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.68),transparent_30%),linear-gradient(180deg,var(--color-cream-light)_0%,var(--color-cream)_48%,var(--color-cream-deep)_100%)]" />
        <div className="absolute left-[8%] top-[18%] h-[24vh] w-[20vw] rounded-full bg-[rgba(84,133,100,0.16)] blur-[92px]" />
        <div className="absolute bottom-[12%] right-[10%] h-[22vh] w-[22vw] rounded-full bg-white/70 blur-[120px]" />
      </div>

      <div className="site-shell relative flex flex-1 flex-col pt-[calc(var(--header-height)+28px)] pb-6 md:pt-[calc(var(--header-height)+34px)] md:pb-8">
        {/* ── top: brand + tagline ── */}
        <div className="section-shell shrink-0">
          <div className="flex items-start justify-end gap-6">
            <button
              type="button"
              onClick={() => scrollToSection("intro")}
              className="group flex items-center gap-2 text-[10px] uppercase tracking-[0.28em] text-[var(--color-hero-muted)] transition-colors duration-300 hover:text-[var(--color-accent)]"
            >
              Back to top
              <span className="inline-block transition-transform duration-300 group-hover:-translate-y-0.5">↑</span>
            </button>
          </div>
        </div>

        {/* ── divider ── */}
        <div className="section-shell mt-5 h-px shrink-0 bg-[var(--color-hero-line)] md:mt-6" />

        {/* ── main content — vertically centered ── */}
        <div className="section-shell flex flex-1 items-center min-h-0">
          <div className="relative w-full overflow-visible">
            {!prefersReducedMotion ? (
              <div className="pointer-events-none absolute inset-x-[-8%] inset-y-[-14%] z-0 overflow-hidden">
                <motion.div
                  className="absolute left-[-4%] top-[6%] h-[22rem] w-[22rem] rounded-full bg-[radial-gradient(circle,rgba(84,133,100,0.26),rgba(84,133,100,0.08)_48%,transparent_76%)] blur-[42px]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={FOOTER_VIEWPORT}
                  variants={FOOTER_SPOTLIGHT_VARIANTS}
                />
                <motion.div
                  className="absolute inset-y-[-12%] left-[-24%] w-[38%] bg-[linear-gradient(90deg,transparent,rgba(255,255,255,0.58),rgba(84,133,100,0.2),transparent)] blur-[24px]"
                  initial="hidden"
                  whileInView="visible"
                  viewport={FOOTER_VIEWPORT}
                  variants={FOOTER_SWEEP_VARIANTS}
                />
              </div>
            ) : null}

            <div className="-my-8 grid w-full gap-10 overflow-visible py-8 lg:grid-cols-[1fr_1fr] lg:gap-14 xl:gap-20">
              {/* ── left: headline + description ── */}
              <motion.div
                className="relative z-[1] flex flex-col justify-center"
                initial={prefersReducedMotion ? false : "hidden"}
                whileInView={prefersReducedMotion ? undefined : "visible"}
                viewport={prefersReducedMotion ? undefined : FOOTER_VIEWPORT}
                variants={FOOTER_TEXT_VARIANTS}
              >
                <motion.p
                  className="section-label text-[var(--color-hero-muted)]"
                  variants={FOOTER_LABEL_VARIANTS}
                >
                  <span className="section-label-line" />
                  <ShinyText text="Get in Touch" />
                </motion.p>

                <h2 className="mt-5 max-w-[12ch] font-[var(--font-manrope)] text-[clamp(2.2rem,4.6vw,4.2rem)] leading-[0.94] tracking-[-0.06em] text-[var(--color-ink)]">
                  {FOOTER_HEADLINE_LINES.map((line, index) => (
                    <span key={line} className="block overflow-hidden pb-[0.14em]">
                      <motion.span
                        className="block"
                        custom={index}
                        variants={FOOTER_HEADLINE_LINE_VARIANTS}
                      >
                        {line}
                      </motion.span>
                    </span>
                  ))}
                </h2>

                <motion.div
                  className="mt-5 overflow-hidden"
                  variants={FOOTER_COPY_VARIANTS}
                >
                  <p className="max-w-[36ch] text-[clamp(0.88rem,1vw,1rem)] leading-[1.72] text-[var(--color-muted-ink)]">
                    Connect with the Istanbul clinic or speak with one of our European representatives before planning treatment.
                  </p>
                </motion.div>

                {/* social links */}
                <motion.div
                  className="mt-7 flex gap-3 md:mt-8"
                  variants={FOOTER_LINKS_VARIANTS}
                >
                  {FOOTER_LINKS.map((link) => (
                    <motion.a
                      key={link.label}
                      href={link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 rounded-full border border-[var(--color-soft-line)] bg-[var(--color-panel)] px-4 py-2 text-[0.78rem] tracking-[-0.01em] text-[var(--color-hero-muted)] shadow-[0_14px_34px_rgba(16,23,18,0.06)] transition-all duration-300 hover:border-[var(--color-soft-line-strong)] hover:bg-[rgba(84,133,100,0.12)] hover:text-[var(--color-accent)]"
                      variants={FOOTER_LINK_VARIANTS}
                    >
                      <SocialIcon type={link.icon} />
                      {link.label}
                    </motion.a>
                  ))}
                </motion.div>
              </motion.div>

              {/* ── right: office cards ── */}
              <motion.div
                className="relative z-[1] flex flex-col gap-3 md:gap-4"
                initial={prefersReducedMotion ? false : "hidden"}
                whileInView={prefersReducedMotion ? undefined : "visible"}
                viewport={prefersReducedMotion ? undefined : FOOTER_VIEWPORT}
                variants={FOOTER_CARDS_VARIANTS}
              >
                {OFFICES.map((office) => (
                  <motion.article
                    key={office.title}
                    className="group flex items-start justify-between gap-5 rounded-2xl border border-[var(--color-soft-line)] bg-[var(--color-panel)] px-5 py-4 shadow-[0_18px_44px_rgba(16,23,18,0.055)] transition-colors duration-300 hover:border-[var(--color-soft-line-strong)] hover:bg-[rgba(255,255,255,0.68)] md:px-6 md:py-5"
                    variants={FOOTER_CARD_VARIANTS}
                  >
                    <div className="min-w-0 flex-1">
                      <p className="text-[0.68rem] uppercase tracking-[0.28em] text-[var(--color-hero-muted)]">
                        {office.title}
                      </p>
                      <p className="mt-2.5 max-w-[30ch] text-[0.86rem] leading-[1.6] text-[var(--color-muted-ink)]">
                        {office.address}
                      </p>
                    </div>

                    <div className="shrink-0 text-right">
                      <a
                        href={phoneHref(office.phone)}
                        className="block text-[0.88rem] leading-relaxed text-[var(--color-accent)] transition-colors duration-300 hover:text-[var(--color-accent-strong)]"
                      >
                        {office.phone}
                      </a>
                      {office.email ? (
                        <a
                          href={`mailto:${office.email}`}
                          className="mt-1 block text-[0.78rem] leading-relaxed text-[var(--color-muted-ink)] transition-colors duration-300 hover:text-[var(--color-accent)]"
                        >
                          {office.email}
                        </a>
                      ) : null}
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </div>
          </div>
        </div>

        {/* ── bottom bar ── */}
        <div className="section-shell mt-auto shrink-0">
          <div className="h-px bg-[var(--color-hero-line)]" />
          <div className="flex flex-col gap-4 pt-4 sm:flex-row sm:items-center sm:justify-between md:pt-5">
            {/* treatments quick-links */}
            <div className="flex flex-wrap gap-x-5 gap-y-1.5">
              {SOLUTION_CASES.map((s, i) => (
                <button
                  key={s.id}
                  type="button"
                  onClick={() => scrollToSection("solutions", { substep: i })}
                  className="text-[0.72rem] tracking-[0.02em] text-[var(--color-hero-muted)] transition-colors duration-300 hover:text-[var(--color-accent)]"
                >
                  {s.title}
                </button>
              ))}
            </div>

            {/* copyright */}
            <p className="shrink-0 text-[0.72rem] tracking-[0.02em] text-[var(--color-muted-ink)]/70">
              © {new Date().getFullYear()} Dr. Ahmed Altan. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
