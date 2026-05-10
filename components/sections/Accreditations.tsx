"use client";

import Image from "next/image";
import { m as motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import BodySectionVeil from "@/components/ui/BodySectionVeil";
import ShinyText from "@/components/ui/ShinyText";

type Accreditation = {
  id: string;
  name: string;
  shortName?: string;
  image: string;
  logoScale?: number;
};

const EASE_STANDARD: [number, number, number, number] = [0.16, 1, 0.3, 1];
const ACCREDITATIONS_VIEWPORT = { once: true, amount: 0.28 };

const ACCREDITATION_HEADER_VARIANTS = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.14,
    },
  },
};

const ACCREDITATION_LABEL_VARIANTS = {
  hidden: { opacity: 0, y: 18, filter: "blur(10px)" },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.72,
      ease: EASE_STANDARD,
    },
  },
};

const ACCREDITATION_HEADLINE_LINE_VARIANTS = {
  hidden: { opacity: 0.24, y: "112%" },
  visible: (index: number) => ({
    opacity: 1,
    y: "0%",
    transition: {
      duration: 0.88,
      delay: 0.12 + index * 0.08,
      ease: EASE_STANDARD,
    },
  }),
};

const ACCREDITATION_COPY_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 30,
    filter: "blur(12px)",
    clipPath: "inset(0 0 100% 0)",
  },
  visible: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    clipPath: "inset(0 0 0% 0)",
    transition: {
      duration: 0.8,
      ease: EASE_STANDARD,
    },
  },
};

const ACCREDITATION_CARDS_VARIANTS = {
  hidden: { opacity: 1 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.14,
      delayChildren: 0.34,
    },
  },
};

const ACCREDITATION_CARD_VARIANTS = {
  hidden: {
    opacity: 0,
    y: 22,
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

const ACCREDITATION_CARD_INNER_VARIANTS = {
  hidden: {
    opacity: 0,
    scale: 0.88,
    y: 18,
    filter: "blur(10px)",
  },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    filter: "blur(0px)",
    transition: {
      duration: 0.76,
      ease: EASE_STANDARD,
      delay: 0.16,
    },
  },
};

const ACCREDITATION_HEADLINE_LINES = ["Accreditations &", "Memberships"];

const ACCREDITATIONS: Accreditation[] = [
  {
    id: "world-fue-institute",
    name: "World FUE Institute",
    shortName: "WFI",
    image: "/images/projects/accreditations/Logo-WFI-off-white.webp",
    logoScale: 1.02,
  },
  {
    id: "hair-transplant-network",
    name: "Hair Transplant Network",
    shortName: "HTN",
    image: "/images/projects/accreditations/hiar-transplant-network.webp",
    logoScale: 1.06,
  },
  {
    id: "hair-transplant-mentor",
    name: "Hair Transplant Mentor",
    shortName: "HTM",
    image: "/images/projects/accreditations/logo-bianco-1.webp",
    logoScale: 1.08,
  },
  {
    id: "reddit",
    name: "Reddit",
    shortName: "Reddit",
    image: "/images/projects/accreditations/Reddit_Lockup.webp",
    logoScale: 1.04,
  },
];

function AccreditationLogo({ item }: { item: Accreditation }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <motion.article
      className="group relative flex h-[10.75rem] w-full overflow-hidden rounded-[20px] border border-[var(--color-soft-line)] bg-[var(--color-panel)] p-3.5 shadow-[0_18px_44px_rgba(16,23,18,0.05)] transition-all duration-400 hover:border-[var(--color-soft-line-strong)] hover:bg-white/65 md:h-[12rem] md:p-4 lg:h-full lg:min-h-[16rem] lg:p-6"
      variants={ACCREDITATION_CARD_VARIANTS}
    >
      <motion.div
        className="relative z-[1] flex flex-1 flex-col"
        variants={ACCREDITATION_CARD_INNER_VARIANTS}
      >
        <div className="flex flex-1 items-center justify-center rounded-[16px] border border-[rgba(84,133,100,0.18)] bg-[linear-gradient(135deg,rgba(84,133,100,0.72),rgba(16,23,18,0.68))] px-3 py-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.2)] md:px-4 md:py-5 lg:px-5 lg:py-6">
          <div className="relative h-[3.9rem] w-full max-w-[9.5rem] md:h-[4.5rem] md:max-w-[11rem] lg:h-[6.25rem] lg:max-w-[14rem]">
            {!imageFailed ? (
              <Image
                src={item.image}
                alt={item.name}
                fill
                sizes="240px"
                className="object-contain object-center opacity-100 transition-all duration-400"
                style={{
                  transform: `scale(${item.logoScale ?? 1})`,
                }}
                onError={() => setImageFailed(true)}
              />
            ) : (
              <span className="absolute inset-0 flex items-center justify-center font-[var(--font-manrope)] text-[1rem] font-medium uppercase tracking-[0.12em] text-[rgba(84,133,100,0.22)] transition-colors duration-400 group-hover:text-[rgba(84,133,100,0.34)]">
                {item.shortName ?? item.name.slice(0, 3).toUpperCase()}
              </span>
            )}
          </div>
        </div>

        <div className="mt-3 border-t border-[var(--color-soft-line)] pt-2.5 md:mt-3.5 md:pt-3 lg:mt-5 lg:pt-4">
          <p className="text-center font-[var(--font-manrope)] text-[0.68rem] leading-[1.3] tracking-[0.08em] text-[var(--color-muted-ink)]/78 transition-colors duration-400 group-hover:text-[var(--color-muted-ink)] md:text-[0.74rem] lg:text-[0.8rem]">
            {item.name}
          </p>
        </div>
      </motion.div>
    </motion.article>
  );
}

export default function Accreditations() {
  const prefersReducedMotion = useReducedMotion();

  return (
    <section
      id="accreditations"
      data-nav-section
      data-header-tone="light"
      className="mobile-flow-section body-section relative min-h-screen h-svh overflow-hidden"
    >
      <BodySectionVeil variant="body" />

      <div className="site-shell relative flex h-full flex-col pt-[calc(var(--header-height)+28px)] pb-6 md:pt-[calc(var(--header-height)+34px)] md:pb-8">
        {/* ── header ── */}
        <motion.div
          className="section-shell relative z-[1] shrink-0 text-center"
          initial={prefersReducedMotion ? false : "hidden"}
          whileInView={prefersReducedMotion ? undefined : "visible"}
          viewport={prefersReducedMotion ? undefined : ACCREDITATIONS_VIEWPORT}
          variants={ACCREDITATION_HEADER_VARIANTS}
        >
          <motion.p
            className="section-label justify-center"
            variants={ACCREDITATION_LABEL_VARIANTS}
          >
            <span className="section-label-line" />
            <ShinyText text="Recognised By" />
            <span className="section-label-line" />
          </motion.p>
          <h2 className="mx-auto mt-5 max-w-[18ch] font-[var(--font-manrope)] text-[clamp(2rem,3.8vw,3.6rem)] leading-[0.96] tracking-[-0.06em] text-[var(--color-ink)]">
            {ACCREDITATION_HEADLINE_LINES.map((line, index) => (
              <span key={line} className="block overflow-hidden pb-[0.14em]">
                <motion.span
                  className="block"
                  custom={index}
                  variants={ACCREDITATION_HEADLINE_LINE_VARIANTS}
                >
                  {line}
                </motion.span>
              </span>
            ))}
          </h2>
          <motion.div
            className="mx-auto mt-4 max-w-[42ch] overflow-hidden"
            variants={ACCREDITATION_COPY_VARIANTS}
          >
            <p className="text-[clamp(0.84rem,0.96vw,0.96rem)] leading-[1.68] text-[var(--color-muted-ink)]">
              Internationally recognised standards that hold every procedure to measurable accountability.
            </p>
          </motion.div>
        </motion.div>

        {/* ── divider ── */}
        <div className="section-shell mt-6 h-px shrink-0 bg-[var(--color-soft-line)] md:mt-7" />

        {/* ── logos grid — vertically centered ── */}
        <div className="flex min-h-0 flex-1 items-center py-5 md:py-6 lg:items-stretch lg:py-8">
          <div className="section-shell relative z-[1] w-full">
            <motion.div
              className="grid w-full grid-cols-2 gap-3 md:gap-4 lg:h-full lg:grid-cols-4 lg:gap-6"
              initial={prefersReducedMotion ? false : "hidden"}
              whileInView={prefersReducedMotion ? undefined : "visible"}
              viewport={prefersReducedMotion ? undefined : ACCREDITATIONS_VIEWPORT}
              variants={ACCREDITATION_CARDS_VARIANTS}
            >
              {ACCREDITATIONS.map((item) => (
                <AccreditationLogo key={item.id} item={item} />
              ))}
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
