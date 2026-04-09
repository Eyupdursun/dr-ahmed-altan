"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useScrollNavigation } from "@/components/layout/SmoothScrollProvider";
import BodySectionVeil from "@/components/ui/BodySectionVeil";
import { SOLUTION_CASES, type SolutionCase } from "@/lib/siteContent";

const EASE_STANDARD: [number, number, number, number] = [0.16, 1, 0.3, 1];

function SolutionMedia({ project }: { project: SolutionCase }) {
  if (!project.image?.trim()) return null;

  return (
    <div className="relative h-full w-full overflow-hidden">
      <Image
        src={project.image}
        alt={project.imageAlt ?? project.title}
        fill
        sizes="(max-width: 1023px) 90vw, 48vw"
        className="object-cover object-center transition-transform duration-700"
      />
      {/* subtle gradient overlay for text legibility */}
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[rgba(10,15,11,0.6)] via-transparent to-transparent" />
    </div>
  );
}

export default function ProjectGallery() {
  const { sectionSubsteps, scrollToSection } = useScrollNavigation();
  const prefersReducedMotion = useReducedMotion();
  const activeIndex = sectionSubsteps.solutions ?? 0;
  const activeProject = SOLUTION_CASES[activeIndex] ?? SOLUTION_CASES[0];

  return (
    <section
      id="solutions"
      data-nav-section
      data-header-tone="dark"
      className="body-section-alt relative min-h-screen h-svh overflow-hidden"
    >
      <BodySectionVeil variant="alt" />

      <div className="site-shell relative flex h-full flex-col pt-[calc(var(--header-height)+28px)] pb-6 md:pt-[calc(var(--header-height)+34px)] md:pb-8">
        {/* ── header ── */}
        <div className="section-shell flex shrink-0 items-end justify-between gap-4">
          <div>
            <p className="section-label">
              <span className="section-label-line" />
              Our Solutions
            </p>
            <h2 className="mt-4 max-w-[14ch] font-[var(--font-manrope)] text-[clamp(2rem,3.8vw,3.6rem)] leading-[0.96] tracking-[-0.06em] text-[var(--color-ink)]">
              Precision, Explained Without Decoration.
            </h2>
          </div>
          <p className="hidden text-[0.82rem] leading-[1.6] text-[var(--color-muted-ink)] sm:block sm:max-w-[24ch] md:max-w-[28ch]">
            Each procedure is presented as a calm study in technique, comfort, and healing.
          </p>
        </div>

        {/* ── main content area ── */}
        <div className="relative mt-5 flex flex-1 items-center min-h-0 md:mt-6">
          <div className="section-shell w-full">
            <div className="grid h-full gap-5 lg:grid-cols-[1fr_1fr] lg:gap-6 xl:gap-8">
              {/* ── left: image area ── */}
              <div className="relative hidden overflow-hidden rounded-2xl border border-[var(--color-soft-line)] bg-[var(--color-panel-muted)] lg:block lg:h-[min(52svh,460px)]">
                <AnimatePresence initial={false} mode="wait">
                  <motion.div
                    key={activeProject.id}
                    className="absolute inset-0"
                    initial={prefersReducedMotion ? false : { opacity: 0, scale: 1.04 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, scale: 0.98 }}
                    transition={{ duration: 0.5, ease: EASE_STANDARD }}
                  >
                    {activeProject.image?.trim() ? (
                      <SolutionMedia project={activeProject} />
                    ) : (
                      /* placeholder when no image */
                      <div className="flex h-full w-full items-center justify-center">
                        <div className="text-center">
                          <span className="font-[var(--font-manrope)] text-[5rem] leading-none tracking-[-0.06em] text-white/[0.04]">
                            {String(activeIndex + 1).padStart(2, "0")}
                          </span>
                          <p className="mt-2 text-[0.7rem] uppercase tracking-[0.3em] text-[var(--color-muted-ink)]">
                            {activeProject.category}
                          </p>
                        </div>
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>

                {/* bottom label bar */}
                <div className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-3.5 backdrop-blur-sm">
                  <span className="text-[10px] uppercase tracking-[0.28em] text-white/60">
                    {activeProject.category}
                  </span>
                  <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent-strong)]">
                    {activeProject.tag}
                  </span>
                </div>
              </div>

              {/* ── right: content area ── */}
              <div className="flex flex-col">
                {/* active content */}
                <AnimatePresence initial={false} mode="wait">
                  <motion.article
                    key={activeProject.id}
                    initial={prefersReducedMotion ? false : { opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={prefersReducedMotion ? undefined : { opacity: 0, y: -12 }}
                    transition={{ duration: 0.4, ease: EASE_STANDARD }}
                    className="flex flex-col"
                  >
                    {/* mobile image */}
                    {activeProject.image?.trim() ? (
                      <div className="relative mb-5 h-[180px] overflow-hidden rounded-2xl border border-[var(--color-soft-line)] lg:hidden">
                        <SolutionMedia project={activeProject} />
                      </div>
                    ) : null}

                    {/* mobile category / tag */}
                    <div className="mb-4 flex items-center justify-between gap-3 lg:hidden">
                      <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-muted-ink)]">
                        {activeProject.category}
                      </span>
                      <span className="text-[10px] uppercase tracking-[0.28em] text-[var(--color-accent-strong)]">
                        {activeProject.tag}
                      </span>
                    </div>

                    {/* number + title */}
                    <div className="flex items-start gap-4">
                      <span className="mt-2 shrink-0 font-[var(--font-manrope)] text-[clamp(2rem,3.4vw,3rem)] leading-none tracking-[-0.06em] text-white/[0.08]">
                        {String(activeIndex + 1).padStart(2, "0")}
                      </span>
                      <h3 className="font-[var(--font-manrope)] text-[clamp(1.8rem,3.4vw,3rem)] leading-[1] tracking-[-0.05em] text-[var(--color-ink)]">
                        {activeProject.title}
                      </h3>
                    </div>

                    {/* divider */}
                    <div className="mt-5 h-px bg-[var(--color-soft-line)] md:mt-6" />

                    {/* description */}
                    <p className="mt-5 max-w-[48ch] text-[clamp(0.88rem,1vw,1.02rem)] leading-[1.72] text-[var(--color-muted-ink)] md:mt-6">
                      {activeProject.description}
                    </p>
                  </motion.article>
                </AnimatePresence>

                {/* ── tab navigation (bottom) ── */}
                <div className="mt-auto pt-6 md:pt-8">
                  <div className="flex flex-wrap gap-2">
                    {SOLUTION_CASES.map((solution, index) => {
                      const isActive = index === activeIndex;
                      return (
                        <button
                          key={solution.id}
                          type="button"
                          onClick={() =>
                            scrollToSection("solutions", { substep: index })
                          }
                          className={`group flex items-center gap-2 rounded-full border px-3.5 py-2 text-left transition-all duration-300 md:px-4 md:py-2.5 ${
                            isActive
                              ? "border-[rgba(109,129,104,0.36)] bg-[rgba(255,255,255,0.06)]"
                              : "border-[var(--color-soft-line)] bg-transparent hover:border-[rgba(109,129,104,0.22)] hover:bg-[rgba(255,255,255,0.03)]"
                          }`}
                        >
                          <span
                            className={`text-[0.65rem] uppercase tracking-[0.2em] transition-colors duration-300 ${
                              isActive
                                ? "text-[var(--color-accent-strong)]"
                                : "text-[var(--color-muted-ink)] group-hover:text-[var(--color-accent)]"
                            }`}
                          >
                            {String(index + 1).padStart(2, "0")}
                          </span>
                          <span
                            className={`font-[var(--font-manrope)] text-[0.78rem] leading-[1.2] tracking-[-0.01em] transition-colors duration-300 md:text-[0.84rem] ${
                              isActive
                                ? "text-[var(--color-ink)]"
                                : "text-[var(--color-muted-ink)] group-hover:text-[var(--color-ink)]"
                            }`}
                          >
                            {solution.title}
                          </span>
                        </button>
                      );
                    })}
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
