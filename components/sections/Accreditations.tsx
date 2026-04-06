"use client";

import Image from "next/image";
import BodySectionVeil from "@/components/ui/BodySectionVeil";

type Accreditation = {
  id: string;
  name: string;
  shortName?: string;
  image: string;
};

const ACCREDITATIONS: Accreditation[] = [
  {
    id: "fue-europe",
    name: "FUE Europe",
    image: "/images/accreditations/fue-europe.png",
  },
  {
    id: "royal-college",
    name: "Royal College of Surgeons",
    shortName: "RCS",
    image: "/images/accreditations/royal-college.png",
  },
  {
    id: "care-quality",
    name: "CareQuality Commission",
    shortName: "CQC",
    image: "/images/accreditations/care-quality.png",
  },
  {
    id: "crs",
    name: "Cosmetic Redress Scheme",
    shortName: "CRS",
    image: "/images/accreditations/crs.png",
  },
  {
    id: "gmc",
    name: "General Medical Council",
    shortName: "GMC",
    image: "/images/accreditations/gmc.png",
  },
  {
    id: "iahrs",
    name: "IAHRS Member",
    shortName: "IAHRS",
    image: "/images/accreditations/iahrs.png",
  },
  {
    id: "ahla",
    name: "American Hair Loss Association",
    shortName: "AHLA",
    image: "/images/accreditations/ahla.png",
  },
  {
    id: "htn",
    name: "Hair Transplant Network",
    shortName: "HTN",
    image: "/images/accreditations/htn.png",
  },
  {
    id: "htm",
    name: "HairTransplantMentor.com",
    shortName: "HTM",
    image: "/images/accreditations/htm.png",
  },
];

function AccreditationLogo({ item }: { item: Accreditation }) {
  // Try to load image; if it fails, show the placeholder initials
  return (
    <div className="group relative flex flex-col items-center gap-3">
      <div className="relative flex h-16 w-28 items-center justify-center overflow-hidden rounded-xl border border-white/[0.06] bg-white/[0.03] transition-all duration-400 group-hover:border-[rgba(109,129,104,0.24)] group-hover:bg-white/[0.05] md:h-20 md:w-32 lg:h-[5.5rem] lg:w-36">
        {/* 
          PLACEHOLDER: Replace images in /public/images/accreditations/
          Use transparent PNGs or white-on-transparent SVGs for best results.
          Recommended size: 240×140px 
        */}
        <Image
          src={item.image}
          alt={item.name}
          fill
          sizes="144px"
          className="object-contain object-center p-3 opacity-70 transition-opacity duration-400 group-hover:opacity-100 md:p-4"
          onError={(e) => {
            // Hide broken image and let the fallback show
            (e.target as HTMLImageElement).style.display = "none";
          }}
        />
        {/* Fallback initials when image is missing */}
        <span className="absolute inset-0 flex items-center justify-center font-[var(--font-manrope)] text-[0.9rem] font-medium uppercase tracking-[0.12em] text-white/[0.18] transition-colors duration-400 group-hover:text-white/[0.28]">
          {item.shortName ?? item.name.slice(0, 3).toUpperCase()}
        </span>
      </div>
      <p className="max-w-[14ch] text-center text-[0.66rem] leading-[1.36] tracking-[0.04em] text-[var(--color-muted-ink)]/60 transition-colors duration-400 group-hover:text-[var(--color-muted-ink)] md:text-[0.7rem]">
        {item.name}
      </p>
    </div>
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
        <div className="flex flex-1 items-center min-h-0">
          <div className="section-shell w-full">
            <div className="mx-auto max-w-[860px]">
              {/* top row: 4 items */}
              <div className="flex flex-wrap items-start justify-center gap-x-6 gap-y-8 md:gap-x-10 lg:gap-x-14">
                {ACCREDITATIONS.slice(0, 4).map((item) => (
                  <AccreditationLogo key={item.id} item={item} />
                ))}
              </div>

              {/* middle row: 4 items */}
              <div className="mt-8 flex flex-wrap items-start justify-center gap-x-6 gap-y-8 md:mt-10 md:gap-x-10 lg:gap-x-14">
                {ACCREDITATIONS.slice(4, 8).map((item) => (
                  <AccreditationLogo key={item.id} item={item} />
                ))}
              </div>

              {/* bottom row: remaining */}
              {ACCREDITATIONS.length > 8 && (
                <div className="mt-8 flex flex-wrap items-start justify-center gap-x-6 gap-y-8 md:mt-10 md:gap-x-10 lg:gap-x-14">
                  {ACCREDITATIONS.slice(8).map((item) => (
                    <AccreditationLogo key={item.id} item={item} />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
