"use client";

import { AnimatePresence, m as motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import BodySectionVeil from "@/components/ui/BodySectionVeil";
import ShinyText from "@/components/ui/ShinyText";

const EASE: [number, number, number, number] = [0.16, 1, 0.3, 1];

type FaqItem = {
  id: string;
  question: string;
  paragraphs: string[];
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-causes",
    question: "What causes hair loss?",
    paragraphs: [
      "We all lose about 100 hairs a day — not really noticeable since new hair is growing in too. Loss begins when the growth cycle is disrupted or the follicles are damaged. The most common cause is hereditary.",
      "Hormonal changes, certain medications, radiation therapy, stress, and harsh hair treatments can also lead to thinning.",
    ],
  },
  {
    id: "faq-types",
    question: "What types of transplant procedures exist?",
    paragraphs: [
      "Two main techniques: FUT (the strip method) and FUE — the more modern approach where grafts are extracted as individual hairs.",
      "Both achieve similar long-term results, but FUE leaves no linear scar and offers a more comfortable recovery.",
    ],
  },
  {
    id: "faq-timing",
    question: "When is the right time for a transplant?",
    paragraphs: [
      "When pattern baldness develops, a transplant is the only long-term solution. It can also fill scars or restore receded areas.",
      "If thinning starts young, it's usually safer to wait until age 25 — by then the pattern has stabilized enough to plan around.",
    ],
  },
  {
    id: "faq-benefits",
    question: "What are the benefits?",
    paragraphs: [
      "Transplanted hair behaves like the donor area — it keeps growing naturally and is permanent.",
      "FUE is more refined and leaves no visible scars, making it the preferred technique for most patients today.",
    ],
  },
  {
    id: "faq-work",
    question: "When can I return to work?",
    paragraphs: [
      "Most patients with desk-based work can return the next day. Some prefer to take a few days off until the small marks on the scalp are no longer visible.",
    ],
  },
  {
    id: "faq-healing",
    question: "How long does healing take?",
    paragraphs: [
      "New hair starts growing within a few months. Visible results appear between 8 and 12 months, with full density typically reached around the one-year mark.",
    ],
  },
];

export default function FaqStory() {
  const [activeIndex, setActiveIndex] = useState(0);
  const rm = useReducedMotion();
  const active = FAQ_ITEMS[activeIndex];

  const itemVariants = {
    hidden: { opacity: 0, y: 8 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4, ease: EASE },
    },
  };

  const listVariants = {
    hidden: {},
    visible: { transition: { staggerChildren: 0.05, delayChildren: 0.15 } },
  };

  return (
    <section
      id="faq"
      data-nav-section
      data-header-tone="light"
      className="mobile-flow-section body-section-alt relative min-h-screen h-svh overflow-hidden"
    >
      <BodySectionVeil variant="alt" />

      <div className="site-shell relative flex h-full flex-col pt-[calc(var(--header-height)+28px)] pb-6 md:pt-[calc(var(--header-height)+34px)] md:pb-8">
        {/* ── header ── */}
        <motion.div
          className="section-shell shrink-0"
          initial={rm ? false : { opacity: 0, y: 12 }}
          whileInView={rm ? undefined : { opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.15 }}
          transition={{ duration: 0.55, ease: EASE }}
        >
          <p className="section-label">
            <span className="section-label-line" />
            <ShinyText text="FAQ" />
          </p>
          <div className="mt-4 flex items-end justify-between gap-6 md:mt-5">
            <h2 className="max-w-[14ch] font-[var(--font-manrope)] text-[clamp(1.85rem,4vw,4rem)] leading-[0.96] tracking-[-0.05em] text-[var(--color-ink)]">
              Questions, answered.
            </h2>
            <p className="hidden max-w-[28ch] text-[0.88rem] leading-[1.6] text-[var(--color-muted-ink)] md:block">
              Clear answers around timing, technique, healing, and what to expect.
            </p>
          </div>
        </motion.div>

        {/* ── content ── */}
        <div className="section-shell mt-5 flex min-h-0 flex-1 md:mt-8 md:items-start lg:items-center">

          {/* ─── DESKTOP: list + panel ─── */}
          <div className="hidden w-full min-h-0 md:grid md:grid-cols-[minmax(0,0.95fr)_minmax(0,1.05fr)] md:gap-10 lg:gap-14">
            {/* question list */}
            <motion.ol
              className="list-none"
              variants={rm ? undefined : listVariants}
              initial={rm ? false : "hidden"}
              whileInView={rm ? undefined : "visible"}
              viewport={{ once: true, amount: 0.15 }}
            >
              {FAQ_ITEMS.map((faq, i) => {
                const isActive = i === activeIndex;
                return (
                  <motion.li
                    key={faq.id}
                    variants={rm ? undefined : itemVariants}
                  >
                    <button
                      type="button"
                      onClick={() => setActiveIndex(i)}
                      aria-pressed={isActive}
                      className="group relative flex w-full items-baseline gap-5 border-b border-[var(--color-soft-line)] py-3.5 text-left"
                    >
                      <span
                        className={`shrink-0 font-[var(--font-manrope)] text-[0.62rem] uppercase tracking-[0.24em] transition-colors duration-300 ${
                          isActive
                            ? "text-[var(--color-accent-strong)]"
                            : "text-[var(--color-muted-ink)]/60 group-hover:text-[var(--color-ink)]/60"
                        }`}
                      >
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <span
                        className={`flex-1 font-[var(--font-manrope)] text-[clamp(0.92rem,1.18vw,1.18rem)] leading-[1.35] tracking-[-0.025em] transition-colors duration-300 ${
                          isActive
                            ? "text-[var(--color-ink)]"
                            : "text-[var(--color-muted-ink)] group-hover:text-[var(--color-ink)]"
                        }`}
                      >
                        {faq.question}
                      </span>
                      {isActive && (
                        <motion.span
                          layoutId="faq-active-line"
                          className="absolute bottom-[-1px] left-0 h-px bg-[var(--color-accent-strong)]"
                          transition={{ duration: 0.4, ease: EASE }}
                          style={{ width: "100%" }}
                        />
                      )}
                    </button>
                  </motion.li>
                );
              })}
            </motion.ol>

            {/* answer panel */}
            <motion.div
              className="relative min-h-[18rem] md:pl-2"
              initial={rm ? false : { opacity: 0, y: 16 }}
              whileInView={rm ? undefined : { opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.15 }}
              transition={{ duration: 0.55, ease: EASE, delay: 0.18 }}
            >
              <span
                aria-hidden
                className="pointer-events-none absolute -top-3 right-0 font-[var(--font-manrope)] text-[clamp(5rem,9vw,8rem)] leading-none tracking-[-0.07em] text-[rgba(84,133,100,0.08)]"
              >
                {String(activeIndex + 1).padStart(2, "0")}
              </span>

              <AnimatePresence mode="wait" initial={false}>
                <motion.div
                  key={active.id}
                  initial={rm ? false : { opacity: 0, y: 12 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={rm ? undefined : { opacity: 0, y: -8 }}
                  transition={{ duration: 0.32, ease: EASE }}
                  className="relative"
                >
                  <p className="text-[0.6rem] uppercase tracking-[0.26em] text-[var(--color-accent-strong)]">
                    Answer
                  </p>
                  <h3 className="mt-3 max-w-[22ch] font-[var(--font-manrope)] text-[clamp(1.3rem,2.2vw,2rem)] leading-[1.2] tracking-[-0.04em] text-[var(--color-ink)]">
                    {active.question}
                  </h3>

                  <div className="mt-5 h-px w-12 bg-[var(--color-accent)]/55" />

                  <div className="mt-5 space-y-4">
                    {active.paragraphs.map((p, i) => (
                      <motion.p
                        key={`${active.id}-p-${i}`}
                        className="max-w-[52ch] text-[0.92rem] leading-[1.72] text-[var(--color-muted-ink)]"
                        initial={rm ? false : { opacity: 0, y: 8 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          ease: EASE,
                          delay: rm ? 0 : 0.1 + i * 0.06,
                        }}
                      >
                        {p}
                      </motion.p>
                    ))}
                  </div>
                </motion.div>
              </AnimatePresence>
            </motion.div>
          </div>

          {/* ─── MOBILE: accordion ─── */}
          <motion.ol
            className="flex w-full flex-col list-none md:hidden"
            variants={rm ? undefined : listVariants}
            initial={rm ? false : "hidden"}
            whileInView={rm ? undefined : "visible"}
            viewport={{ once: true, amount: 0.2 }}
          >
            {FAQ_ITEMS.map((faq, i) => {
              const isActive = i === activeIndex;
              return (
                <motion.li
                  key={faq.id}
                  variants={rm ? undefined : itemVariants}
                  className="border-b border-[var(--color-soft-line)]"
                >
                  <button
                    type="button"
                    onClick={() => setActiveIndex(isActive ? -1 : i)}
                    aria-expanded={isActive}
                    className="flex w-full items-center gap-4 py-3.5 text-left"
                  >
                    <span
                      className={`shrink-0 font-[var(--font-manrope)] text-[0.58rem] uppercase tracking-[0.24em] transition-colors duration-300 ${
                        isActive
                          ? "text-[var(--color-accent-strong)]"
                          : "text-[var(--color-muted-ink)]/60"
                      }`}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      className={`flex-1 font-[var(--font-manrope)] text-[0.92rem] leading-[1.32] tracking-[-0.025em] transition-colors duration-300 ${
                        isActive
                          ? "text-[var(--color-ink)]"
                          : "text-[var(--color-muted-ink)]"
                      }`}
                    >
                      {faq.question}
                    </span>
                    <motion.span
                      animate={{ rotate: isActive ? 45 : 0 }}
                      transition={{ duration: 0.3, ease: EASE }}
                      className="relative flex h-7 w-7 shrink-0 items-center justify-center"
                    >
                      <span className="absolute h-px w-3 bg-[var(--color-ink)]/55" />
                      <span className="absolute h-3 w-px bg-[var(--color-ink)]/55" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={
                          rm
                            ? { duration: 0 }
                            : {
                                height: { duration: 0.36, ease: EASE },
                                opacity: { duration: 0.24, delay: 0.06 },
                              }
                        }
                        className="overflow-hidden"
                      >
                        <div className="space-y-3 pb-4 pl-[calc(0.58rem+1rem)] pr-2">
                          {faq.paragraphs.map((p, pi) => (
                            <p
                              key={`${faq.id}-p-${pi}`}
                              className="text-[0.82rem] leading-[1.6] text-[var(--color-muted-ink)]"
                            >
                              {p}
                            </p>
                          ))}
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.li>
              );
            })}
          </motion.ol>
        </div>
      </div>
    </section>
  );
}
