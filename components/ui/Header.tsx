"use client";

import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useLenis } from "@/components/layout/SmoothScrollProvider";
import type { SiteSectionId } from "@/lib/siteContent";
import {
  type MenuItem,
  MENU_ITEMS,
  OFFICES,
  SECTION_MENU_MAP,
} from "@/lib/siteData";

const PRELOADER_COMPLETE_EVENT = "preloader:complete";
const EASE_STANDARD: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DEFAULT_SECTION_ID = MENU_ITEMS[0]?.sectionIds[0] ?? "intro";

function resolvePrimaryTargetId(item: MenuItem) {
  return item.targetId ?? item.children?.find((child) => child.targetId)?.targetId;
}

function BrandLockup({
  tone,
  size = "header",
}: {
  tone: "light" | "dark";
  size?: "header" | "menu";
}) {
  const isMenu = size === "menu";

  return (
    <div className={`flex min-w-0 items-center ${isMenu ? "gap-3.5" : "gap-3"}`}>
      <div
        className={`relative overflow-hidden rounded-full border ${
          tone === "dark"
            ? "border-white/16 bg-white/4"
            : "border-[rgba(23,32,25,0.18)] bg-[var(--color-ink)] shadow-[0_10px_30px_rgba(23,32,25,0.18)]"
        } ${isMenu ? "h-11 w-11 md:h-12 md:w-12" : "h-8 w-8 md:h-9 md:w-9"}`}
      >
        <Image
          src="/images/projects/ahmed-altan-logo-icon.png"
          alt="Dr. Ahmed Altan"
          fill
          priority
          className="object-contain object-center scale-[0.92]"
        />
      </div>

      <div className="min-w-0">
        <p
          className={`uppercase tracking-[0.34em] ${
            isMenu ? "text-[9px]" : "text-[8px]"
          } ${
            tone === "dark"
              ? "text-[var(--color-hero-muted)]"
              : "text-[var(--color-muted-ink)]"
          }`}
        >
          Showcase
        </p>
        <p
          className={`mt-1.5 font-[var(--font-manrope)] uppercase tracking-[0.24em] ${
            isMenu ? "text-[1rem]" : "text-[0.9rem]"
          } ${
            tone === "dark"
              ? "text-[var(--color-hero-fg)]"
              : "text-[var(--color-ink)]"
          }`}
        >
          Dr.Altan
        </p>
      </div>
    </div>
  );
}

export default function Header() {
  const { scrollToSection } = useLenis();
  const previousOverflowRef = useRef("");
  const [visible, setVisible] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.dataset.preloaderDone === "true"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState(DEFAULT_SECTION_ID);
  const [activeTone, setActiveTone] = useState<"light" | "dark">("dark");

  useEffect(() => {
    if (visible) return;

    const handler = () => setVisible(true);
    window.addEventListener(PRELOADER_COMPLETE_EVENT, handler, { once: true });
    return () => window.removeEventListener(PRELOADER_COMPLETE_EVENT, handler);
  }, [visible]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.dataset.menuOpen = isMenuOpen ? "true" : "false";

    if (isMenuOpen) {
      previousOverflowRef.current = body.style.overflow;
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = previousOverflowRef.current;
    }

    return () => {
      root.dataset.menuOpen = "false";
      body.style.overflow = previousOverflowRef.current;
    };
  }, [isMenuOpen]);

  useEffect(() => {
    const sections = Array.from(
      document.querySelectorAll<HTMLElement>("[data-nav-section]")
    );

    if (sections.length === 0) return;
    let frameId = 0;

    const resolveActiveSection = () => {
      const rootStyles = window.getComputedStyle(document.documentElement);
      const headerHeight = Number.parseFloat(
        rootStyles.getPropertyValue("--header-height")
      );
      const referenceY = (Number.isFinite(headerHeight) ? headerHeight : 58) + 18;

      const activeTarget =
        sections.find((section) => {
          const rect = section.getBoundingClientRect();
          return rect.top <= referenceY && rect.bottom > referenceY;
        }) ??
        sections.reduce<HTMLElement | null>((closest, section) => {
          const rect = section.getBoundingClientRect();
          const distance = Math.min(
            Math.abs(rect.top - referenceY),
            Math.abs(rect.bottom - referenceY)
          );

          if (!closest) return section;

          const closestRect = closest.getBoundingClientRect();
          const closestDistance = Math.min(
            Math.abs(closestRect.top - referenceY),
            Math.abs(closestRect.bottom - referenceY)
          );

          return distance < closestDistance ? section : closest;
        }, null);

      const nextSection = (activeTarget?.id as SiteSectionId | undefined) ?? DEFAULT_SECTION_ID;
      const nextTone = activeTarget?.dataset.headerTone === "dark" ? "dark" : "light";

      setActiveSection((previous) =>
        previous === nextSection ? previous : nextSection
      );
      setActiveTone((previous) => (previous === nextTone ? previous : nextTone));
    };

    const scheduleResolve = () => {
      window.cancelAnimationFrame(frameId);
      frameId = window.requestAnimationFrame(resolveActiveSection);
    };

    scheduleResolve();
    window.addEventListener("scroll", scheduleResolve, { passive: true });
    window.addEventListener("resize", scheduleResolve);

    return () => {
      window.cancelAnimationFrame(frameId);
      window.removeEventListener("scroll", scheduleResolve);
      window.removeEventListener("resize", scheduleResolve);
    };
  }, []);

  const activeItem =
    MENU_ITEMS.find((item) => item.id === SECTION_MENU_MAP[activeSection]) ??
    MENU_ITEMS[0];

  const navigateTo = (id?: SiteSectionId, substep?: number) => {
    setIsMenuOpen(false);
    if (!id) return;

    window.setTimeout(() => {
      scrollToSection(id, typeof substep === "number" ? { substep } : undefined);
    }, 90);
  };

  return (
    <>
      <motion.header
        className="pointer-events-none fixed inset-x-0 top-0 z-[9000]"
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: visible && !isMenuOpen ? 1 : 0,
          y: visible && !isMenuOpen ? 0 : -12,
        }}
        transition={{ duration: 0.5, ease: EASE_STANDARD }}
      >
        <div className="site-shell pt-3 md:pt-4">
          <div className="pointer-events-auto flex min-h-[var(--header-height)] items-center justify-between gap-4">
            <button
              type="button"
              aria-label="Back to intro"
              onClick={() => navigateTo("intro")}
              className="rounded-full px-0.5 py-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
            >
              <BrandLockup tone={activeTone} />
            </button>

            <div
              className={`flex items-center gap-4 md:gap-6 ${
                activeTone === "dark"
                  ? "text-[var(--color-hero-muted)]"
                  : "text-[var(--color-muted-ink)]"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-current opacity-35" />
                <p className="text-[9px] uppercase tracking-[0.32em]">
                  {activeItem.label}
                </p>
              </div>

              <button
                type="button"
                aria-expanded={isMenuOpen}
                aria-controls="site-navigation"
                aria-label="Open navigation"
                onClick={() => setIsMenuOpen(true)}
                className={`text-[10px] uppercase tracking-[0.34em] transition-opacity duration-300 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)] ${
                  activeTone === "dark"
                    ? "text-[var(--color-hero-fg)]/88"
                    : "text-[var(--color-ink)]/86"
                }`}
              >
                Menu
              </button>
            </div>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {isMenuOpen ? (
          <motion.aside
            id="site-navigation"
            className="fixed inset-0 z-[9100] overflow-hidden bg-[var(--color-hero-bg)] text-[var(--color-hero-fg)]"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE_STANDARD }}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(109,129,104,0.22),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(16,23,18,0.92),rgba(10,15,11,1))]" />

            <div className="site-shell relative flex h-full flex-col py-5 md:py-6">
              <div className="flex min-h-[var(--header-height)] items-center justify-between gap-4">
                <BrandLockup tone="dark" size="menu" />

                <button
                  type="button"
                  onClick={() => setIsMenuOpen(false)}
                  className="text-[10px] uppercase tracking-[0.34em] text-[var(--color-hero-fg)]/88 transition-opacity duration-300 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
                >
                  Close
                </button>
              </div>

              <div className="grid flex-1 items-start gap-14 py-8 md:py-10 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-[4.5rem] lg:py-[4rem]">
                <nav
                  className="flex flex-col gap-7 md:gap-8"
                  aria-label="Primary"
                >
                  {MENU_ITEMS.map((item, index) => {
                    const isActive = activeItem.id === item.id;
                    const targetId = resolvePrimaryTargetId(item);

                    return (
                      <motion.div
                        key={item.id}
                        initial={{ opacity: 0, y: 24 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 18 }}
                        transition={{
                          duration: 0.55,
                          ease: EASE_STANDARD,
                          delay: 0.06 + index * 0.04,
                        }}
                        className="space-y-4"
                      >
                        <button
                          type="button"
                          onClick={() => navigateTo(targetId)}
                          className="group flex items-baseline gap-4 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
                        >
                          <span className="min-w-8 text-[11px] uppercase tracking-[0.24em] text-[var(--color-hero-muted)]">
                            {item.index}
                          </span>
                          <span
                            className={`font-[var(--font-manrope)] text-[clamp(2.8rem,8vw,7rem)] leading-[0.9] tracking-[-0.06em] transition-colors duration-300 ${
                              isActive
                                ? "text-[var(--color-hero-fg)]"
                                : "text-[var(--color-hero-fg)]/58 group-hover:text-[var(--color-hero-fg)]/88"
                            }`}
                          >
                            {item.label}
                          </span>
                        </button>

                        {item.children?.length ? (
                          <div className="ml-12 border-l border-white/10 pl-5 md:ml-14 md:pl-7">
                            <div className="flex flex-col gap-2.5">
                              {item.children.map((child, childIndex) => {
                                const childTargetId = child.targetId ?? item.targetId;

                                return (
                                  <button
                                    key={child.id}
                                    type="button"
                                    onClick={() => navigateTo(childTargetId, child.substep)}
                                    className="group flex items-center gap-3 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
                                  >
                                    <span className="min-w-8 text-[10px] uppercase tracking-[0.24em] text-[var(--color-hero-muted)]/72">
                                      {String(childIndex + 1).padStart(2, "0")}
                                    </span>
                                    <span className="text-[clamp(1rem,1.65vw,1.45rem)] leading-[1.08] tracking-[-0.03em] text-[var(--color-hero-fg)]/62 transition-colors duration-300 group-hover:text-[var(--color-hero-fg)]/88">
                                      {child.label}
                                    </span>
                                  </button>
                                );
                              })}
                            </div>
                          </div>
                        ) : null}
                      </motion.div>
                    );
                  })}
                </nav>

                <motion.div
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 18 }}
                  transition={{ duration: 0.6, ease: EASE_STANDARD, delay: 0.22 }}
                  className="max-w-[420px] space-y-8"
                >
                  <div className="space-y-4">
                    <p className="section-label text-[var(--color-hero-muted)]">
                      <span className="section-label-line" />
                      Reputation
                    </p>
                    <p className="max-w-[28ch] text-[clamp(1.1rem,1.5vw,1.55rem)] leading-[1.45] text-[var(--color-hero-fg)]">
                      A motion-led portrait of surgical restraint, natural density,
                      and measured confidence.
                    </p>
                  </div>

                  <div className="space-y-6 border-t border-white/10 pt-7">
                    {OFFICES.map((office) => (
                      <div key={office.title} className="space-y-2">
                        <p className="text-[11px] uppercase tracking-[0.28em] text-[var(--color-hero-muted)]">
                          {office.title}
                        </p>
                        <p className="break-words text-sm leading-relaxed text-[var(--color-hero-fg)]/78">
                          {office.address}
                        </p>
                        <p className="text-sm text-[var(--color-hero-fg)]">
                          {office.phone}
                        </p>
                      </div>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
