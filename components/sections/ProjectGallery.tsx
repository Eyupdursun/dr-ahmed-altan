"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, m as motion, useReducedMotion } from "framer-motion";
import { useScrollNavigation } from "@/components/layout/SmoothScrollProvider";
import BodySectionVeil from "@/components/ui/BodySectionVeil";
import ShinyText from "@/components/ui/ShinyText";
import { SOLUTION_CASES, type SolutionCase } from "@/lib/siteContent";

const EASE_STANDARD: [number, number, number, number] = [0.16, 1, 0.3, 1];

function clampIndex(index: number) {
  return Math.max(0, Math.min(SOLUTION_CASES.length - 1, index));
}

function SolutionMedia({
  project,
  variant = "framed",
}: {
  project: SolutionCase;
  variant?: "framed" | "bleed";
}) {
  if (!project.image?.trim()) return null;

  return (
    <div
      className={`relative h-full w-full overflow-hidden ${
        variant === "framed" ? "rounded-2xl" : ""
      }`}
    >
      {variant === "bleed" ? (
        <Image
          src={project.image}
          alt=""
          fill
          sizes="(max-width: 1023px) 100vw, 64vw"
          className="scale-105 object-cover object-center opacity-22 blur-2xl"
          aria-hidden="true"
        />
      ) : null}
      <Image
        src={project.image}
        alt={project.imageAlt ?? project.title}
        fill
        sizes={
          variant === "bleed"
            ? "(max-width: 1023px) 100vw, 58vw"
            : "(max-width: 1023px) 90vw, 48vw"
        }
        loading={variant === "framed" ? "eager" : "lazy"}
        fetchPriority={variant === "framed" ? "high" : "auto"}
        className={
          variant === "bleed"
            ? "object-cover object-[center_center]"
            : "object-cover object-center"
        }
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(245,240,231,0.72)] via-transparent to-transparent" />
    </div>
  );
}

function SolutionPlaceholder({
  project,
  index,
  category,
}: {
  project: SolutionCase;
  index: number;
  category: string;
}) {
  const visual = getSolutionVisual(project.id);

  return (
    <div className="relative flex h-full w-full overflow-hidden bg-[linear-gradient(135deg,rgba(255,255,255,0.74),rgba(245,240,231,0.52))]">
      <div className="absolute inset-0 opacity-[0.52] [background-image:linear-gradient(rgba(84,133,100,0.08)_1px,transparent_1px),linear-gradient(90deg,rgba(84,133,100,0.08)_1px,transparent_1px)] [background-size:44px_44px]" />
      <div className="absolute inset-x-0 top-0 h-px bg-[linear-gradient(90deg,transparent,rgba(84,133,100,0.34),transparent)]" />
      <div className="absolute left-5 top-5 flex items-center gap-3">
        <span className="font-[var(--font-manrope)] text-[0.76rem] tracking-[0.22em] text-[var(--color-accent-strong)]">
          {String(index + 1).padStart(2, "0")}
        </span>
        <span className="h-px w-10 bg-[var(--color-soft-line-strong)]" />
        <span className="text-[0.62rem] uppercase tracking-[0.3em] text-[var(--color-muted-ink)]">
          {category}
        </span>
      </div>
      <div className="relative flex h-full w-full items-center justify-center px-8 pt-10 pb-12">
        <svg
          aria-hidden="true"
          viewBox="0 0 640 420"
          className="h-full max-h-[84%] w-full max-w-[92%] text-[var(--color-accent)]"
          fill="none"
        >
          <path
            d="M86 322C163 274 230 253 319 253C408 253 489 277 554 322"
            stroke="rgba(84,133,100,0.16)"
            strokeWidth="1.4"
          />
          {visual}
        </svg>
      </div>
    </div>
  );
}

function SolutionVisualSurface({
  project,
  index,
  variant = "framed",
}: {
  project: SolutionCase;
  index: number;
  variant?: "framed" | "bleed";
}) {
  const hasImage = !!project.image?.trim();
  const surfaceClass =
    variant === "framed"
      ? "overflow-hidden rounded-2xl border border-[var(--color-soft-line)] bg-[var(--color-panel-muted)] shadow-[0_28px_80px_rgba(16,23,18,0.08)]"
      : "overflow-hidden bg-[var(--color-panel-muted)]";

  return (
    <div className={`relative h-full w-full ${surfaceClass}`}>
      {hasImage ? (
        <SolutionMedia project={project} variant={variant} />
      ) : (
        <SolutionPlaceholder
          project={project}
          index={index}
          category={project.category}
        />
      )}

      <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-4 py-3 backdrop-blur-sm sm:px-5 sm:py-3.5">
        <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-muted-ink)]">
          {project.category}
        </span>
        <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent-strong)]">
          {project.tag}
        </span>
      </div>
    </div>
  );
}

function getSolutionVisual(id: string) {
  switch (id) {
    case "reconstruction":
      return <ReconstructionVisual />;
    case "hairline-design":
      return <HairlineDesignVisual />;
    case "beard-transplant":
      return <BeardTransplantVisual />;
    case "medical-treatment":
      return <MedicalTreatmentVisual />;
    case "hair-transplant":
    default:
      return <HairTransplantVisual />;
  }
}

function HairTransplantVisual() {
  const grafts = [
    [198, 152],
    [236, 132],
    [278, 122],
    [320, 120],
    [362, 126],
    [404, 142],
    [218, 206],
    [260, 190],
    [302, 182],
    [344, 184],
    [386, 198],
    [240, 260],
    [282, 246],
    [324, 242],
    [366, 250],
  ];

  return (
    <>
      <path
        d="M164 286C206 205 250 164 319 154C392 144 456 185 492 284"
        stroke="rgba(84,133,100,0.34)"
        strokeWidth="2"
      />
      <path
        d="M188 295C226 232 267 202 321 198C379 194 428 225 462 294"
        stroke="rgba(84,133,100,0.18)"
        strokeWidth="1.4"
      />
      {grafts.map(([x, y], index) => (
        <g key={`${x}-${y}`}>
          <path
            d={`M${x} ${y + 34}C${x - 5} ${y + 18} ${x - 2} ${y + 7} ${x + 8} ${y}`}
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            opacity={index % 2 === 0 ? 0.72 : 0.48}
          />
          <circle cx={x + 9} cy={y - 1} r="3.5" fill="currentColor" opacity="0.42" />
        </g>
      ))}
      <path
        d="M132 332H508"
        stroke="rgba(84,133,100,0.22)"
        strokeWidth="1"
        strokeDasharray="6 12"
      />
    </>
  );
}

function ReconstructionVisual() {
  return (
    <>
      {[0, 1, 2, 3].map((offset) => (
        <path
          key={offset}
          d={`M158 ${154 + offset * 34}C220 ${118 + offset * 20} 277 ${
            112 + offset * 14
          } 334 ${137 + offset * 22}C392 ${162 + offset * 24} 438 ${
            156 + offset * 20
          } 494 ${128 + offset * 18}`}
          stroke="rgba(84,133,100,0.28)"
          strokeWidth={offset === 1 ? "2.2" : "1.3"}
        />
      ))}
      <path
        d="M170 278C232 246 272 244 318 264C370 286 420 281 482 246"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      <path
        d="M206 276L224 252M262 258L276 232M326 267L342 240M386 278L404 250M442 264L456 238"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        opacity="0.48"
      />
      <rect
        x="202"
        y="316"
        width="236"
        height="34"
        rx="17"
        stroke="rgba(84,133,100,0.26)"
      />
      <path
        d="M240 333H400"
        stroke="rgba(84,133,100,0.28)"
        strokeWidth="1"
        strokeDasharray="4 10"
      />
    </>
  );
}

function HairlineDesignVisual() {
  const points = [
    [166, 254],
    [214, 216],
    [270, 194],
    [322, 188],
    [376, 196],
    [430, 220],
    [476, 258],
  ];

  return (
    <>
      <path
        d="M144 272C188 220 242 186 316 181C395 176 461 215 502 274"
        stroke="currentColor"
        strokeWidth="2.6"
        strokeLinecap="round"
      />
      <path
        d="M190 312C230 260 270 238 320 238C371 238 412 261 450 312"
        stroke="rgba(84,133,100,0.18)"
        strokeWidth="1.6"
      />
      {points.map(([x, y]) => (
        <g key={`${x}-${y}`}>
          <circle cx={x} cy={y} r="5" fill="currentColor" opacity="0.62" />
          <path
            d={`M${x} ${y + 13}V${y + 52}`}
            stroke="rgba(84,133,100,0.22)"
            strokeWidth="1"
            strokeDasharray="4 8"
          />
        </g>
      ))}
      <path
        d="M128 148H512M128 338H512"
        stroke="rgba(84,133,100,0.16)"
        strokeWidth="1"
      />
      <path
        d="M320 126V356"
        stroke="rgba(84,133,100,0.16)"
        strokeWidth="1"
      />
    </>
  );
}

function BeardTransplantVisual() {
  const dots = [
    [198, 178],
    [236, 202],
    [274, 222],
    [318, 232],
    [362, 224],
    [404, 204],
    [442, 178],
    [214, 258],
    [256, 286],
    [302, 302],
    [350, 300],
    [394, 282],
    [430, 254],
  ];

  return (
    <>
      <path
        d="M170 152C178 250 218 326 320 344C421 326 464 252 470 152"
        stroke="rgba(84,133,100,0.3)"
        strokeWidth="2"
      />
      <path
        d="M214 156C222 234 252 285 320 302C388 285 418 234 426 156"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
      />
      {dots.map(([x, y], index) => (
        <circle
          key={`${x}-${y}`}
          cx={x}
          cy={y}
          r={index % 3 === 0 ? "4.6" : "3.4"}
          fill="currentColor"
          opacity={index % 2 === 0 ? 0.46 : 0.28}
        />
      ))}
      <path
        d="M246 148C270 126 294 115 320 115C346 115 370 126 394 148"
        stroke="rgba(84,133,100,0.2)"
        strokeWidth="1.5"
      />
    </>
  );
}

function MedicalTreatmentVisual() {
  return (
    <>
      <path
        d="M246 118H394M276 118V170L224 270C204 309 231 354 275 354H365C409 354 436 309 416 270L364 170V118"
        stroke="currentColor"
        strokeWidth="2.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path
        d="M250 286C286 262 329 318 390 280"
        stroke="rgba(84,133,100,0.36)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="286" cy="236" r="13" stroke="rgba(84,133,100,0.34)" />
      <circle cx="354" cy="246" r="18" stroke="rgba(84,133,100,0.26)" />
      <circle cx="320" cy="302" r="10" fill="currentColor" opacity="0.26" />
      <path
        d="M160 214C196 186 217 166 229 128M480 214C444 186 423 166 411 128"
        stroke="rgba(84,133,100,0.16)"
        strokeWidth="1.4"
      />
      <path
        d="M176 248H216M424 248H464M198 316H238M402 316H442"
        stroke="rgba(84,133,100,0.22)"
        strokeWidth="1.2"
        strokeLinecap="round"
      />
    </>
  );
}

function SolutionStageContent({
  project,
  index,
  direction,
}: {
  project: SolutionCase;
  index: number;
  direction: 1 | -1;
}) {
  const prefersReducedMotion = useReducedMotion();
  const enterY = direction > 0 ? 26 : -26;
  const exitY = direction > 0 ? -22 : 22;
  const motionProps = prefersReducedMotion
    ? {
        initial: false as const,
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0 },
      }
    : {
        initial: { opacity: 0 },
        animate: { opacity: 1 },
        exit: { opacity: 0 },
        transition: { duration: 0.34, ease: EASE_STANDARD },
      };

  return (
    <motion.div
      key={project.id}
      className="flex min-h-0 flex-1 flex-col justify-center lg:max-w-[42vw]"
      {...motionProps}
    >
      <motion.div
        className="relative mb-4 h-[clamp(180px,30svh,260px)] lg:hidden"
        initial={
          prefersReducedMotion
            ? false
            : {
                opacity: 0,
                y: direction > 0 ? 32 : -24,
                scale: 0.992,
                clipPath:
                  direction > 0
                    ? "inset(16% 0% 0% 0% round 16px)"
                    : "inset(0% 0% 16% 0% round 16px)",
              }
        }
        animate={{
          opacity: 1,
          y: 0,
          scale: 1,
          clipPath: "inset(0% 0% 0% 0% round 16px)",
        }}
        exit={
          prefersReducedMotion
            ? { opacity: 0 }
            : {
                opacity: 0,
                y: direction > 0 ? -20 : 20,
                scale: 0.992,
                clipPath:
                  direction > 0
                    ? "inset(0% 0% 16% 0% round 16px)"
                    : "inset(16% 0% 0% 0% round 16px)",
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.72, ease: EASE_STANDARD }
        }
      >
        <SolutionVisualSurface project={project} index={index} />
      </motion.div>

      <div className="flex min-h-0 flex-col justify-center">
        <div className="flex items-start gap-4">
          <motion.span
            className="mt-1 shrink-0 font-[var(--font-manrope)] text-[clamp(1.6rem,9vw,4rem)] leading-none tracking-[-0.06em] text-[rgba(84,133,100,0.12)]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: enterY * 0.6 }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              prefersReducedMotion
                ? { opacity: 0 }
                : { opacity: 0, y: exitY * 0.6 }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.52, ease: EASE_STANDARD, delay: 0.06 }
            }
          >
            {String(index + 1).padStart(2, "0")}
          </motion.span>
          <motion.h3
            className="max-w-[12ch] font-[var(--font-manrope)] text-[clamp(1.85rem,12vw,5.4rem)] leading-[0.94] tracking-[-0.06em] text-[var(--color-ink)]"
            initial={prefersReducedMotion ? false : { opacity: 0, y: enterY }}
            animate={{ opacity: 1, y: 0 }}
            exit={
              prefersReducedMotion ? { opacity: 0 } : { opacity: 0, y: exitY }
            }
            transition={
              prefersReducedMotion
                ? { duration: 0 }
                : { duration: 0.62, ease: EASE_STANDARD, delay: 0.08 }
            }
          >
            {project.title}
          </motion.h3>
        </div>

        <motion.div
          className="mt-4 h-px bg-[var(--color-soft-line)] md:mt-7"
          initial={prefersReducedMotion ? false : { scaleX: 0 }}
          animate={{ scaleX: 1 }}
          exit={prefersReducedMotion ? { opacity: 0 } : { scaleX: 0 }}
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.58, ease: EASE_STANDARD, delay: 0.18 }
          }
          style={{ transformOrigin: "left" }}
        />

        <motion.p
          className="mt-4 max-w-[50ch] text-[clamp(0.82rem,3.7vw,1.08rem)] leading-[1.58] text-[var(--color-muted-ink)] md:mt-7 md:leading-[1.72]"
          initial={prefersReducedMotion ? false : { opacity: 0, y: enterY * 0.7 }}
          animate={{ opacity: 1, y: 0 }}
          exit={
            prefersReducedMotion
              ? { opacity: 0 }
              : { opacity: 0, y: exitY * 0.7 }
          }
          transition={
            prefersReducedMotion
              ? { duration: 0 }
              : { duration: 0.58, ease: EASE_STANDARD, delay: 0.24 }
          }
        >
          {project.description}
        </motion.p>
      </div>
    </motion.div>
  );
}

function SolutionBackgroundMedia({
  project,
  index,
}: {
  project: SolutionCase;
  index: number;
}) {
  const prefersReducedMotion = useReducedMotion();

  /* Skip rendering entirely on mobile — these images are lg:block only */
  const [isDesktop, setIsDesktop] = useState(
    () =>
      typeof window !== "undefined" &&
      window.matchMedia("(min-width: 1024px)").matches
  );
  useEffect(() => {
    const mql = window.matchMedia("(min-width: 1024px)");
    const handler = (e: MediaQueryListEvent) => setIsDesktop(e.matches);
    mql.addEventListener("change", handler);
    return () => mql.removeEventListener("change", handler);
  }, []);

  if (!isDesktop) return null;

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={project.id}
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[clamp(720px,64vw,1180px)] overflow-hidden lg:block [mask-image:linear-gradient(90deg,transparent_0%,rgba(0,0,0,0.1)_8%,rgba(0,0,0,0.72)_22%,black_38%)]"
        initial={
          prefersReducedMotion
            ? false
            : {
                opacity: 0,
                x: 28,
                scale: 1.015,
              }
        }
        animate={{
          opacity: 1,
          x: 0,
          scale: 1,
        }}
        exit={
          prefersReducedMotion
            ? { opacity: 0 }
            : {
                opacity: 0,
                x: -18,
                scale: 1.01,
              }
        }
        transition={
          prefersReducedMotion
            ? { duration: 0 }
            : { duration: 0.78, ease: EASE_STANDARD }
        }
      >
        <SolutionVisualSurface project={project} index={index} variant="bleed" />
      </motion.div>
    </AnimatePresence>
  );
}

export default function ProjectGallery() {
  const { lastDirection, sectionSubsteps, scrollToSection } =
    useScrollNavigation();
  const prefersReducedMotion = useReducedMotion();
  const activeIndex = clampIndex(sectionSubsteps.solutions ?? 0);
  const activeProject = SOLUTION_CASES[activeIndex] ?? SOLUTION_CASES[0];
  const touchStartXRef = useRef<number | null>(null);
  const touchStartYRef = useRef<number | null>(null);

  const goToIndex = (index: number) => {
    const clamped = clampIndex(index);
    if (clamped === activeIndex) return;
    scrollToSection("solutions", { substep: clamped });
  };

  const handleTouchStart = (event: React.TouchEvent) => {
    const touch = event.touches[0];
    if (!touch) return;
    touchStartXRef.current = touch.clientX;
    touchStartYRef.current = touch.clientY;
  };

  const handleTouchEnd = (event: React.TouchEvent) => {
    const startX = touchStartXRef.current;
    const startY = touchStartYRef.current;
    touchStartXRef.current = null;
    touchStartYRef.current = null;
    if (startX === null || startY === null) return;

    const touch = event.changedTouches[0];
    if (!touch) return;
    const dx = touch.clientX - startX;
    const dy = touch.clientY - startY;
    if (Math.abs(dx) < 48 || Math.abs(dx) < Math.abs(dy) * 1.2) return;

    goToIndex(activeIndex + (dx < 0 ? 1 : -1));
  };

  return (
    <section
      id="solutions"
      data-nav-section
      data-header-tone="light"
      className="mobile-flow-section body-section-alt relative h-svh min-h-screen overflow-hidden"
      onTouchStart={handleTouchStart}
      onTouchEnd={handleTouchEnd}
    >
      <BodySectionVeil variant="alt" />
      <SolutionBackgroundMedia
        project={activeProject}
        index={activeIndex}
      />
      <div className="pointer-events-none absolute inset-y-0 left-0 z-[1] hidden w-[58vw] bg-[linear-gradient(90deg,var(--color-body-alt)_0%,rgba(245,240,231,0.99)_58%,rgba(245,240,231,0.78)_76%,rgba(245,240,231,0.22)_92%,transparent_100%)] lg:block" />
      <div className="pointer-events-none absolute inset-y-0 left-[40vw] z-[1] hidden w-[26vw] backdrop-blur-[14px] [mask-image:linear-gradient(90deg,transparent_0%,black_26%,black_74%,transparent_100%)] lg:block" />
      <div className="pointer-events-none absolute inset-x-0 bottom-0 z-[1] hidden h-[22svh] bg-[linear-gradient(0deg,var(--color-body-alt)_0%,rgba(245,240,231,0.78)_34%,rgba(245,240,231,0.22)_72%,transparent_100%)] lg:block" />

      <div className="mobile-flow-shell relative z-[2] flex h-full overflow-hidden">
        <div className="site-shell relative flex min-h-0 w-full flex-col pt-[calc(var(--header-height)+18px)] pb-5 md:pt-[calc(var(--header-height)+34px)] md:pb-8">
          <div className="flex w-full shrink-0 items-end justify-between gap-4 lg:max-w-[48vw]">
            <div>
              <p className="section-label">
                <span className="section-label-line" />
                <ShinyText text="Our Solutions" />
              </p>
              <h2 className="mt-3 max-w-[15ch] font-[var(--font-manrope)] text-[clamp(1.58rem,7vw,3.4rem)] leading-[0.96] tracking-[-0.06em] text-[var(--color-ink)] md:mt-4">
                Precision, Explained Without Decoration.
              </h2>
            </div>
            <p className="hidden max-w-[28ch] text-[0.82rem] leading-[1.6] text-[var(--color-muted-ink)] sm:block lg:hidden">
              Each procedure is presented as a calm study in technique, comfort,
              and healing.
            </p>
          </div>

          <div className="relative mt-3 flex min-h-0 w-full flex-1 md:mt-7 lg:max-w-[48vw]">
            <AnimatePresence mode="wait" initial={false}>
              <SolutionStageContent
                key={activeProject.id}
                project={activeProject}
                index={activeIndex}
                direction={lastDirection}
              />
            </AnimatePresence>
          </div>

          <div className="w-full shrink-0 pt-3 md:pt-5">
            <div className="flex items-center justify-between gap-4">
              <div className="flex gap-1.5">
                {SOLUTION_CASES.map((solution, index) => (
                  <button
                    key={solution.id}
                    type="button"
                    aria-label={`Go to ${solution.title}`}
                    aria-current={index === activeIndex ? "true" : undefined}
                    onClick={() => goToIndex(index)}
                    className={`relative h-1.5 overflow-hidden rounded-full transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] ${
                      index === activeIndex
                        ? "w-9 bg-[rgba(84,133,100,0.18)]"
                        : "w-1.5 bg-[rgba(84,133,100,0.22)]"
                    }`}
                  >
                    {index === activeIndex ? (
                      <motion.span
                        className="absolute inset-y-0 left-0 rounded-full bg-[var(--color-accent)]"
                        initial={{ width: "18%" }}
                        animate={{ width: "100%" }}
                        transition={{ duration: 0.52, ease: EASE_STANDARD }}
                      />
                    ) : null}
                  </button>
                ))}
              </div>
              <span className="font-[var(--font-manrope)] text-[0.78rem] tracking-[0.2em] text-[var(--color-muted-ink)]">
                {String(activeIndex + 1).padStart(2, "0")} /{" "}
                {String(SOLUTION_CASES.length).padStart(2, "0")}
              </span>
            </div>
          </div>
        </div>

        {!prefersReducedMotion ? (
          <motion.div
            className="pointer-events-none absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-[var(--color-body-alt)] to-transparent lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, ease: EASE_STANDARD }}
          />
        ) : null}
      </div>
    </section>
  );
}
