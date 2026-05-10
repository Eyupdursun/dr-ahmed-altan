"use client";

import Image from "next/image";
import { AnimatePresence, m as motion, useReducedMotion } from "framer-motion";
import { useEffect, useRef } from "react";
import { useScrollNavigation } from "@/components/layout/SmoothScrollProvider";
import BodySectionVeil from "@/components/ui/BodySectionVeil";
import ShinyText from "@/components/ui/ShinyText";
import {
  TEAM_MEMBERS,
  TEAM_GROUP_SIZE,
  TEAM_GROUP_COUNT,
  type DoctorProfile,
} from "@/lib/siteContent";

const EASE_STANDARD: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── editorial team card ── */

function TeamCard({
  member,
  index,
}: {
  member: DoctorProfile;
  index: number;
}) {
  return (
    <article
      className="group relative flex min-h-[430px] min-w-[84vw] snap-center flex-col overflow-hidden rounded-[20px] shadow-[0_8px_34px_rgba(13,19,15,0.08)] transition-all duration-500 hover:-translate-y-0.5 hover:shadow-[0_12px_42px_rgba(13,19,15,0.13)] md:min-h-[320px] md:min-w-0 lg:min-h-[410px]"
      style={{
        background:
          "radial-gradient(ellipse at 50% 8%, rgba(84,133,100,0.22) 0%, transparent 55%), linear-gradient(165deg, var(--color-cream-light) 0%, var(--color-cream-deep) 100%)",
      }}
    >
      {/* full-bleed portrait */}
      <Image
        src={member.image}
        alt={`${member.name} portrait`}
        fill
        sizes="(max-width: 768px) 80vw, 400px"
        className="object-contain object-bottom transition-transform duration-700 will-change-transform group-hover:scale-[1.03]"
      />

      {/* index badge — top right */}
      <span className="absolute right-4 top-4 font-[var(--font-manrope)] text-[0.58rem] tracking-[0.18em] text-[var(--color-ink)]/30">
        {String(index + 1).padStart(2, "0")}
      </span>

      {/* frosted glass info panel */}
      <div className="absolute bottom-3 left-3 right-3 rounded-[14px] border border-white/50 p-4 backdrop-blur-[16px] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] md:p-4 lg:p-5"
        style={{ background: "rgba(242,238,228,0.76)" }}
      >
        <h3 className="font-[var(--font-manrope)] text-[1.25rem] leading-[1.1] tracking-[-0.05em] text-[var(--color-ink)] lg:text-[1.5rem]">
          {member.name}
        </h3>
        <p className="mt-1 text-[0.52rem] uppercase tracking-[0.24em] text-[var(--color-accent-strong)]">
          {member.role}
        </p>

        {/* description — slides in on hover */}
        <p className="mt-0 max-h-0 overflow-hidden text-[0.76rem] leading-[1.58] text-[var(--color-muted-ink)] transition-all duration-500 ease-[cubic-bezier(0.16,1,0.3,1)] group-hover:mt-2.5 group-hover:max-h-[5rem] lg:text-[0.8rem]">
          {member.summary}
        </p>
      </div>

      {/* inset ring */}
      <div className="pointer-events-none absolute inset-0 rounded-[20px] ring-1 ring-inset ring-[var(--color-soft-line)] transition-all duration-400 group-hover:ring-[var(--color-soft-line-strong)]" />
    </article>
  );
}

/* ── section ── */

export default function TeamSection() {
  const { lastDirection, sectionSubsteps, scrollToSection } = useScrollNavigation();
  const prefersReducedMotion = useReducedMotion();
  const mobileRailRef = useRef<HTMLDivElement>(null);
  const activeGroupIndex = sectionSubsteps.team ?? 0;
  const direction = lastDirection >= 0 ? 1 : -1;

  const cardVariants = {
    hidden: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? 36 : -36,
    }),
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.55, ease: EASE_STANDARD },
    },
    exit: (dir: number) => ({
      opacity: 0,
      y: dir > 0 ? -28 : 28,
      transition: { duration: 0.32, ease: EASE_STANDARD },
    }),
  };

  const gridVariants = {
    hidden: { opacity: 1 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.05 },
    },
    exit: {
      opacity: 1,
      transition: { staggerChildren: 0.06, staggerDirection: -1 },
    },
  };

  // Build groups of TEAM_GROUP_SIZE
  const groups: DoctorProfile[][] = [];
  for (let i = 0; i < TEAM_MEMBERS.length; i += TEAM_GROUP_SIZE) {
    groups.push(TEAM_MEMBERS.slice(i, i + TEAM_GROUP_SIZE));
  }

  const activeGroup = groups[activeGroupIndex] ?? groups[0];

  useEffect(() => {
    const rail = mobileRailRef.current;
    if (!rail) return;

    /* Skip wheel handler on mobile — native touch scroll handles this */
    if (window.matchMedia("(max-width: 1024px), (pointer: coarse)").matches) return;

    const handleWheel = (event: WheelEvent) => {
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;

      const maxScrollLeft = rail.scrollWidth - rail.clientWidth;
      if (maxScrollLeft <= 0) return;

      const direction = event.deltaY > 0 ? 1 : -1;
      const atStart = rail.scrollLeft <= 2;
      const atEnd = rail.scrollLeft >= maxScrollLeft - 2;

      if ((direction < 0 && atStart) || (direction > 0 && atEnd)) {
        return;
      }

      event.preventDefault();
      event.stopPropagation();
      rail.scrollBy({
        left: event.deltaY,
        behavior: prefersReducedMotion ? "auto" : "smooth",
      });
    };

    rail.addEventListener("wheel", handleWheel, { passive: false });
    return () => rail.removeEventListener("wheel", handleWheel);
  }, [prefersReducedMotion]);

  return (
    <section
      id="team"
      data-nav-section
      data-header-tone="light"
      className="mobile-flow-section body-section relative min-h-screen h-svh overflow-hidden"
    >
      <BodySectionVeil variant="body" />

      <div className="site-shell relative flex h-full flex-col pt-[calc(var(--header-height)+28px)] pb-6 md:pt-[calc(var(--header-height)+34px)] md:pb-8">
        {/* ── header ── */}
        <div className="section-shell flex shrink-0 items-end justify-between gap-4">
          <div>
            <p className="section-label">
              <span className="section-label-line" />
              <ShinyText text="Our Team" />
            </p>
            <h2 className="mt-4 max-w-[14ch] font-[var(--font-manrope)] text-[clamp(2rem,3.8vw,3.6rem)] leading-[0.96] tracking-[-0.06em] text-[var(--color-ink)]">
              The people behind every procedure.
            </h2>
          </div>

          <p className="hidden text-[0.82rem] leading-[1.6] text-[var(--color-muted-ink)] sm:block sm:max-w-[24ch] md:max-w-[28ch]">
            A multidisciplinary team that keeps surgical quality, patient comfort, and recovery visibility in focus.
          </p>
        </div>

        {/* ── divider ── */}
        <div className="section-shell mt-5 h-px shrink-0 bg-[var(--color-soft-line)] md:mt-6" />

        {/* ── team cards ── */}
        <div className="section-shell flex min-h-0 flex-1 items-center overflow-visible py-4 lg:py-0">
          <div className="w-full min-w-0 overflow-visible">

            {/* mobile: flat horizontal carousel — all members, no substep conflict */}
            <div
              ref={mobileRailRef}
              className="-mx-[var(--page-gutter)] flex snap-x snap-mandatory gap-4 overflow-x-auto overflow-y-visible overscroll-x-contain scroll-smooth px-[var(--page-gutter)] py-8 md:hidden [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
            >
              {TEAM_MEMBERS.map((member, i) => (
                <TeamCard key={member.id} member={member} index={i} />
              ))}
            </div>

            {/* md+: animated paginated grid with staggered cards */}
            <AnimatePresence initial={false} mode="wait" custom={direction}>
              <motion.div
                key={activeGroupIndex}
                custom={direction}
                variants={prefersReducedMotion ? undefined : gridVariants}
                initial={prefersReducedMotion ? false : "hidden"}
                animate={prefersReducedMotion ? undefined : "visible"}
                exit={prefersReducedMotion ? undefined : "exit"}
                className="hidden md:grid md:grid-cols-3 md:gap-4 lg:gap-5"
              >
                {activeGroup.map((member, i) => (
                  <motion.div
                    key={member.id}
                    custom={direction}
                    variants={prefersReducedMotion ? undefined : cardVariants}
                  >
                    <TeamCard member={member} index={i} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>

          </div>
        </div>

        {/* ── bottom: pagination (md+ only) ── */}
        <div className="section-shell mt-auto hidden shrink-0 items-center justify-between pt-5 md:flex md:pt-6">
          {/* dot pagination */}
          <div className="flex items-center gap-2.5">
            {groups.map((_, idx) => (
              <button
                key={`team-dot-${idx}`}
                type="button"
                onClick={() => scrollToSection("team", { substep: idx })}
                className="block rounded-full transition-all duration-400"
                style={{
                  width: idx === activeGroupIndex ? 24 : 6,
                  height: 6,
                  backgroundColor:
                    idx === activeGroupIndex
                      ? "var(--color-accent-strong)"
                      : "rgba(84,133,100,0.2)",
                }}
              />
            ))}
          </div>

          {/* counter */}
          <p className="font-[var(--font-manrope)] text-[clamp(1.2rem,2vw,1.6rem)] leading-none tracking-[-0.07em] text-[var(--color-soft-line-strong)]">
            {String(activeGroupIndex + 1).padStart(2, "0")}
            <span className="mx-1.5 text-[0.7em] text-[var(--color-muted-ink)]">/</span>
            {String(TEAM_GROUP_COUNT).padStart(2, "0")}
          </p>
        </div>
      </div>
    </section>
  );
}
