"use client";

import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { useLenis } from "@/components/layout/SmoothScrollProvider";
import BodySectionVeil from "@/components/ui/BodySectionVeil";
import {
  TEAM_MEMBERS,
  TEAM_GROUP_SIZE,
  TEAM_GROUP_COUNT,
  type DoctorProfile,
} from "@/lib/siteContent";

const EASE_STANDARD: [number, number, number, number] = [0.16, 1, 0.3, 1];

/* ── compact team card ── */

function TeamCard({
  member,
  index,
}: {
  member: DoctorProfile;
  index: number;
}) {
  return (
    <article className="group flex items-center gap-4 rounded-[24px] border border-white/[0.06] bg-white/[0.02] p-5 transition-all duration-400 hover:border-[rgba(109,129,104,0.22)] hover:bg-white/[0.04] sm:min-h-[200px] md:gap-6 md:p-6 md:min-h-[260px] lg:gap-7 lg:p-7 lg:min-h-[340px]">
      {/* portrait thumbnail */}
      <div
        className="relative h-[12rem] w-[8.5rem] shrink-0 overflow-hidden rounded-[14px] md:h-[15rem] md:w-[10rem] lg:h-[18rem] lg:w-[12rem]"
        style={{
          background:
            "radial-gradient(circle_at_50%_30%,rgba(109,129,104,0.18),transparent_60%),linear-gradient(180deg,rgba(16,23,18,0.9),rgba(10,15,11,1))",
        }}
      >
        <Image
          src={member.image}
          alt={`${member.name} portrait`}
          fill
          sizes="200px"
          className="object-contain object-bottom"
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[40px]"
          style={{
            background: "linear-gradient(to top, rgba(0,0,0,0.4), transparent)",
          }}
        />
      </div>

      {/* info */}
      <div className="flex min-w-0 flex-1 flex-col justify-center py-1">
        <p className="text-[0.64rem] uppercase tracking-[0.28em] text-[var(--color-accent-strong)] md:text-[0.68rem]">
          {member.role}
        </p>
        <h3 className="mt-2 font-[var(--font-manrope)] text-[clamp(1.05rem,1.4vw,1.3rem)] leading-[1.12] tracking-[-0.03em] text-[var(--color-ink)]">
          {member.name}
        </h3>
        <p className="mt-3 line-clamp-4 text-[0.82rem] leading-[1.62] text-[var(--color-muted-ink)] lg:text-[0.86rem]">
          {member.summary}
        </p>
      </div>
    </article>
  );
}

/* ── section ── */

export default function TeamSection() {
  const { sectionSubsteps, scrollToSection } = useLenis();
  const prefersReducedMotion = useReducedMotion();
  const activeGroupIndex = sectionSubsteps.team ?? 0;

  // Build groups of TEAM_GROUP_SIZE
  const groups: DoctorProfile[][] = [];
  for (let i = 0; i < TEAM_MEMBERS.length; i += TEAM_GROUP_SIZE) {
    groups.push(TEAM_MEMBERS.slice(i, i + TEAM_GROUP_SIZE));
  }

  const activeGroup = groups[activeGroupIndex] ?? groups[0];

  return (
    <section
      id="team"
      data-nav-section
      data-header-tone="dark"
      className="body-section relative min-h-screen h-svh overflow-hidden"
    >
      <BodySectionVeil variant="body" />

      <div className="site-shell relative flex h-full flex-col pt-[calc(var(--header-height)+28px)] pb-6 md:pt-[calc(var(--header-height)+34px)] md:pb-8">
        {/* ── header ── */}
        <div className="section-shell flex shrink-0 items-end justify-between gap-4">
          <div>
            <p className="section-label">
              <span className="section-label-line" />
              Our Team
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

        {/* ── team cards — vertically centered ── */}
        <div className="section-shell flex flex-1 items-center min-h-0">
          <div className="w-full">
            <AnimatePresence initial={false} mode="wait">
              <motion.div
                key={activeGroupIndex}
                initial={prefersReducedMotion ? false : { opacity: 0, y: 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={prefersReducedMotion ? undefined : { opacity: 0, y: -14 }}
                transition={{ duration: 0.4, ease: EASE_STANDARD }}
                className="grid gap-3 md:grid-cols-3 md:gap-4 lg:gap-5"
              >
                {activeGroup.map((member, memberIndex) => (
                  <TeamCard
                    key={member.id}
                    member={member}
                    index={activeGroupIndex * TEAM_GROUP_SIZE + memberIndex}
                  />
                ))}
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── bottom: pagination ── */}
        <div className="section-shell mt-auto flex shrink-0 items-center justify-between pt-5 md:pt-6">
          {/* dot pagination */}
          <div className="flex items-center gap-2.5">
            {groups.map((_, idx) => (
              <button
                key={`team-dot-${idx}`}
                type="button"
                onClick={() =>
                  scrollToSection("team", { substep: idx })
                }
                className="block rounded-full transition-all duration-400"
                style={{
                  width: idx === activeGroupIndex ? 24 : 6,
                  height: 6,
                  backgroundColor:
                    idx === activeGroupIndex
                      ? "var(--color-accent-strong)"
                      : "rgba(255,255,255,0.15)",
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
