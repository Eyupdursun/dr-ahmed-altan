"use client";

import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import BodySectionVeil from "@/components/ui/BodySectionVeil";

type FaqItem = {
  id: string;
  question: string;
  paragraphs: string[];
};

const FAQ_ITEMS: FaqItem[] = [
  {
    id: "faq-causes",
    question: "What are the causes of hair loss and thinning?",
    paragraphs: [
      "We all lose about 100 hairs a day and this is not really noticeable since we also have new hair growing. Hair loss or thinning occurs when the hair growth cycle of the scalp is disrupted or when the follicles are destroyed. The most common cause behind hair loss is hereditary condition.",
      "Apart from that, hormonal changes in the body, medications and supplements, radiation therapy, stress or hair treatments done wrong can cause hair loss or thinning.",
    ],
  },
  {
    id: "faq-types",
    question: "What are the different types of hair transplantation procedures?",
    paragraphs: [
      "There are two main types of hair transplant procedures, yet they work quite similar. The first one is called follicular unit transplantation (FUT) and it is also known as the strip method.",
      "The second method, also the more modern one, is called follicular unit extraction (FUE). In this method, the grafts are extracted as individual hairs in two-step or three-step technique.",
    ],
  },
  {
    id: "faq-timing",
    question: "When is the right time for hair transplantation?",
    paragraphs: [
      "Hair transplants can be preferred if female or male pattern baldness is developed in the patients and it is the only long-term effective solution. Apart from that, the procedure can be applied to fill in scars or restore hair.",
      "Even if the hair starts thinning at a young age, it is safe to wait until the age of 25, as it will be easier to foresee how the patient's pattern baldness will progress with time.",
    ],
  },
  {
    id: "faq-benefits",
    question: "What are the benefits of hair transplantation?",
    paragraphs: [
      "Transplanted hair is planted the same way to the balding areas of the scalp. In financial terms, FUT is cost effective when compared to FUE and takes less time to obtain the donor grafts.",
      "Despite being more expensive, FUE leaves the patients with less scarring as the donor hair is extracted individually, instead of cutting a strip of skin.",
    ],
  },
  {
    id: "faq-work",
    question: "When can I return to work after hair transplant?",
    paragraphs: [
      "This mostly depends on the patient. If you have a desk or basic office job, it is possible to return to work the next day after surgery. Some patients prefer taking a few days or even weeks off.",
    ],
  },
  {
    id: "faq-healing",
    question: "How long does the healing process take?",
    paragraphs: [
      "Usually the new hair starts growing a few months after the surgery, yet you can expect to see visible results in 8–12 months. It takes almost a year for the new hair to be bedded into the bald patches.",
    ],
  },
];

export default function FaqStory() {
  const [openIndex, setOpenIndex] = useState(0);
  const prefersReducedMotion = useReducedMotion();

  const toggle = (index: number) => {
    setOpenIndex(openIndex === index ? -1 : index);
  };

  return (
    <section
      id="faq"
      data-nav-section
      data-header-tone="dark"
      className="body-section-alt relative min-h-screen h-svh overflow-hidden"
    >
      <BodySectionVeil variant="alt" />

      <div className="site-shell relative flex h-full flex-col pt-[calc(var(--header-height)+28px)] pb-6 md:pt-[calc(var(--header-height)+34px)] md:pb-8">
        {/* ── header row ── */}
        <div className="section-shell flex shrink-0 items-end justify-between gap-4">
          <div>
            <p className="section-label">
              <span className="section-label-line" />
              FAQ
            </p>
            <h2 className="mt-4 font-[var(--font-manrope)] text-[clamp(2rem,3.8vw,3.6rem)] leading-[0.96] tracking-[-0.06em] text-[var(--color-ink)]">
              Common Questions
            </h2>
          </div>
          <p className="hidden text-[0.82rem] leading-[1.6] text-[var(--color-muted-ink)] sm:block sm:max-w-[26ch] md:max-w-[32ch]">
            Everything you need to know about hair transplantation and the recovery process.
          </p>
        </div>

        {/* ── divider ── */}
        <div className="section-shell mt-5 h-px shrink-0 bg-[var(--color-soft-line)] md:mt-6" />

        {/* ── accordion ── */}
        <div className="section-shell mt-0 flex flex-1 items-center min-h-0">
          <div className="w-full max-w-[900px]">
            {FAQ_ITEMS.map((faq, index) => {
              const isOpen = index === openIndex;
              return (
                <div
                  key={faq.id}
                  className="border-b border-[var(--color-soft-line)]"
                >
                  <button
                    type="button"
                    onClick={() => toggle(index)}
                    className="group flex w-full items-center gap-4 py-4 text-left transition-colors duration-300 md:py-5"
                  >
                    {/* number */}
                    <span className="shrink-0 text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-muted-ink)] transition-colors duration-300 md:text-[0.75rem]"
                      style={{ width: "2.2rem" }}
                    >
                      {String(index + 1).padStart(2, "0")}
                    </span>

                    {/* question */}
                    <span
                      className={`flex-1 font-[var(--font-manrope)] text-[clamp(0.88rem,1.06vw,1.12rem)] leading-[1.36] tracking-[-0.02em] transition-colors duration-300 ${
                        isOpen
                          ? "text-[var(--color-ink)]"
                          : "text-[var(--color-muted-ink)] group-hover:text-[var(--color-ink)]"
                      }`}
                    >
                      {faq.question}
                    </span>

                    {/* toggle icon */}
                    <motion.span
                      className="relative flex h-7 w-7 shrink-0 items-center justify-center rounded-full border border-[var(--color-soft-line)] transition-colors duration-300 md:h-8 md:w-8"
                      animate={{
                        backgroundColor: isOpen
                          ? "rgba(109,129,104,0.18)"
                          : "rgba(255,255,255,0.03)",
                      }}
                      transition={{ duration: 0.3 }}
                    >
                      {/* horizontal bar (always visible) */}
                      <span className="absolute h-px w-3 bg-[var(--color-accent-strong)] md:w-3.5" />
                      {/* vertical bar (rotates away when open) */}
                      <motion.span
                        className="absolute h-3 w-px bg-[var(--color-accent-strong)] md:h-3.5"
                        animate={{ rotate: isOpen ? 90 : 0, opacity: isOpen ? 0 : 1 }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : { duration: 0.25, ease: [0.16, 1, 0.3, 1] }
                        }
                      />
                    </motion.span>
                  </button>

                  {/* answer */}
                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={
                          prefersReducedMotion
                            ? { duration: 0 }
                            : {
                                height: { duration: 0.35, ease: [0.16, 1, 0.3, 1] },
                                opacity: { duration: 0.25, delay: 0.06 },
                              }
                        }
                        className="overflow-hidden"
                      >
                        <div className="flex gap-6 pb-5 pl-[2.2rem] md:gap-8 md:pb-6 lg:gap-10">
                          <div className="h-auto w-px shrink-0 bg-[var(--color-accent)] opacity-30" />
                          <div className="flex flex-col gap-3 md:flex-row md:gap-8">
                            {faq.paragraphs.map((paragraph, pIndex) => (
                              <p
                                key={`${faq.id}-p-${pIndex}`}
                                className="max-w-[42ch] text-[0.88rem] leading-[1.68] text-[var(--color-muted-ink)] md:text-[0.92rem]"
                              >
                                {paragraph}
                              </p>
                            ))}
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
