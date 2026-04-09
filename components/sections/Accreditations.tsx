"use client";

import Image from "next/image";
import { useState } from "react";
import BodySectionVeil from "@/components/ui/BodySectionVeil";

type Accreditation = {
  id: string;
  name: string;
  shortName?: string;
  image: string;
  logoScale?: number;
};

const ACCREDITATIONS: Accreditation[] = [
  {
    id: "world-fue-institute",
    name: "World FUE Institute",
    shortName: "WFI",
    image: "/images/projects/accreditations/Logo-WFI-off-white.png",
    logoScale: 1.02,
  },
  {
    id: "reddit",
    name: "Reddit",
    shortName: "Reddit",
    image: "/images/projects/accreditations/Reddit_Lockup.png",
    logoScale: 1.04,
  },
  {
    id: "hair-transplant-network",
    name: "Hair Transplant Network",
    shortName: "HTN",
    image: "/images/projects/accreditations/hiar-transplant-network.png",
    logoScale: 1.06,
  },
  {
    id: "hair-transplant-mentor",
    name: "Hair Transplant Mentor",
    shortName: "HTM",
    image: "/images/projects/accreditations/logo-bianco-1.png",
    logoScale: 1.08,
  },
];

function AccreditationLogo({ item }: { item: Accreditation }) {
  const [imageFailed, setImageFailed] = useState(false);

  return (
    <article className="group flex h-full min-h-[12.5rem] w-full flex-col rounded-[24px] border border-white/[0.06] bg-[linear-gradient(180deg,rgba(255,255,255,0.035),rgba(255,255,255,0.02))] p-4 transition-all duration-400 hover:border-[rgba(109,129,104,0.24)] hover:bg-[linear-gradient(180deg,rgba(255,255,255,0.05),rgba(255,255,255,0.025))] md:min-h-[14rem] md:p-5 lg:min-h-[16rem] lg:p-6">
      <div className="flex flex-1 items-center justify-center rounded-[18px] border border-white/[0.05] bg-black/[0.08] px-4 py-5 md:px-5 md:py-6">
        <div className="relative h-[5rem] w-full max-w-[12rem] md:h-[5.75rem] md:max-w-[13rem] lg:h-[6.25rem] lg:max-w-[14rem]">
          {!imageFailed ? (
            <Image
              src={item.image}
              alt={item.name}
              fill
              sizes="240px"
              className="object-contain object-center opacity-84 transition-all duration-400 group-hover:opacity-100"
              style={{
                transform: `scale(${item.logoScale ?? 1})`,
              }}
              onError={() => setImageFailed(true)}
            />
          ) : (
            <span className="absolute inset-0 flex items-center justify-center font-[var(--font-manrope)] text-[1rem] font-medium uppercase tracking-[0.12em] text-white/[0.18] transition-colors duration-400 group-hover:text-white/[0.28]">
              {item.shortName ?? item.name.slice(0, 3).toUpperCase()}
            </span>
          )}
        </div>
      </div>

      <div className="mt-4 border-t border-white/[0.06] pt-3 md:mt-5 md:pt-4">
        <p className="text-center font-[var(--font-manrope)] text-[0.74rem] leading-[1.35] tracking-[0.08em] text-[var(--color-muted-ink)]/78 transition-colors duration-400 group-hover:text-[var(--color-muted-ink)] md:text-[0.8rem]">
          {item.name}
        </p>
      </div>
    </article>
  );
}

export default function Accreditations() {
  return (
    <section
      id="accreditations"
      data-nav-section
      data-header-tone="dark"
      className="body-section relative min-h-screen h-svh overflow-hidden"
    >
      <BodySectionVeil variant="body" />

      <div className="site-shell relative flex h-full flex-col pt-[calc(var(--header-height)+28px)] pb-6 md:pt-[calc(var(--header-height)+34px)] md:pb-8">
        {/* ── header ── */}
        <div className="section-shell shrink-0 text-center">
          <p className="section-label justify-center">
            <span className="section-label-line" />
            Recognised By
            <span className="section-label-line" />
          </p>
          <h2 className="mx-auto mt-5 max-w-[18ch] font-[var(--font-manrope)] text-[clamp(2rem,3.8vw,3.6rem)] leading-[0.96] tracking-[-0.06em] text-[var(--color-ink)]">
            Accreditations &amp; Memberships
          </h2>
          <p className="mx-auto mt-4 max-w-[42ch] text-[clamp(0.84rem,0.96vw,0.96rem)] leading-[1.68] text-[var(--color-muted-ink)]">
            Internationally recognised standards that hold every procedure to measurable accountability.
          </p>
        </div>

        {/* ── divider ── */}
        <div className="section-shell mt-6 h-px shrink-0 bg-[var(--color-soft-line)] md:mt-7" />

        {/* ── logos grid — vertically centered ── */}
        <div className="flex flex-1 items-stretch min-h-0 py-6 md:py-8">
          <div className="section-shell w-full">
            <div className="grid h-full w-full grid-cols-2 gap-4 md:gap-5 lg:grid-cols-4 lg:gap-6">
              {ACCREDITATIONS.map((item) => (
                <AccreditationLogo key={item.id} item={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
