"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import Image from "next/image";
import { useScrollNavigation } from "@/components/layout/SmoothScrollProvider";
import type { SiteSectionId } from "@/lib/siteContent";
import {
  type MenuChildItem,
  type MenuItem,
  MENU_ITEMS,
  OFFICES,
  SECTION_MENU_MAP,
} from "@/lib/siteData";

const PRELOADER_COMPLETE_EVENT = "preloader:complete";
const EASE_STANDARD: [number, number, number, number] = [0.16, 1, 0.3, 1];
const DEFAULT_SECTION_ID = MENU_ITEMS[0]?.sectionIds[0] ?? "intro";
const ACTIVE_SECTION_LABEL_MAP: Partial<Record<SiteSectionId, string>> = {
  stories: "Stories",
  faq: "FAQ",
};
const ROOT_INFO_TITLE = "Reputation";
const ROOT_INFO_SUMMARY =
  "A motion-led portrait of surgical restraint, natural density, and measured confidence.";

const MENU_OVERLAY_VARIANTS = {
  closed: {
    opacity: 0,
    transition: {
      duration: 0.35,
      ease: EASE_STANDARD,
      when: "afterChildren",
      staggerChildren: 0.05,
      staggerDirection: -1,
    },
  },
  open: {
    opacity: 1,
    transition: {
      duration: 0.35,
      ease: EASE_STANDARD,
      when: "beforeChildren",
      staggerChildren: 0.05,
      delayChildren: 0.04,
    },
  },
};

const MENU_HEADER_VARIANTS = {
  closed: {
    opacity: 0,
    y: -24,
    transition: { duration: 0.45, ease: EASE_STANDARD },
  },
  open: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_STANDARD },
  },
};

const ROOT_SCENE_VARIANTS = {
  initial: { opacity: 0, y: 12 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.45, ease: EASE_STANDARD, staggerChildren: 0.05 },
  },
  exit: {
    opacity: 0,
    y: 0,
    transition: { duration: 0.24, ease: EASE_STANDARD },
  },
};

const ROOT_ITEM_VARIANTS = {
  initial: { opacity: 0, y: 24 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: EASE_STANDARD },
  },
};

const SUBMENU_SCENE_VARIANTS = {
  initial: { opacity: 0, y: 0 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.42, ease: EASE_STANDARD },
  },
  exit: {
    opacity: 0,
    y: 0,
    transition: { duration: 0.24, ease: EASE_STANDARD },
  },
};

const SUBMENU_LIST_VARIANTS = {
  initial: {},
  animate: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.16,
    },
  },
};

const SUBMENU_ITEM_VARIANTS = {
  initial: { opacity: 0, y: 34 },
  animate: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.48, ease: EASE_STANDARD },
  },
};

function hasChildren(
  item: MenuItem
): item is MenuItem & { children: NonNullable<MenuItem["children"]> } {
  return Array.isArray(item.children) && item.children.length > 0;
}

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

function MenuInfoPanel({
  title,
  summary,
}: {
  title: string;
  summary: string;
}) {
  return (
    <div className="w-full max-w-[27rem] space-y-8 self-center lg:mt-[2vh]">
      <div className="min-h-[8.75rem] md:min-h-[10rem]">
        <AnimatePresence initial={false} mode="wait">
          <motion.div
            key={`${title}-${summary}`}
            className="space-y-4"
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.34, ease: EASE_STANDARD }}
          >
            <p className="section-label text-[var(--color-hero-muted)]">
              <span className="section-label-line" />
              {title}
            </p>
            <p className="max-w-[28ch] text-[clamp(1.1rem,1.5vw,1.55rem)] leading-[1.45] text-[var(--color-hero-fg)]">
              {summary}
            </p>
          </motion.div>
        </AnimatePresence>
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
            <p className="text-sm text-[var(--color-hero-fg)]">{office.phone}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

function RootMenuScene({
  activeItem,
  onAction,
}: {
  activeItem: MenuItem;
  onAction: (item: MenuItem) => void;
}) {
  return (
    <motion.nav
      key="root-scene"
      className="flex h-full flex-col justify-center gap-7 md:gap-8 lg:min-h-[56vh]"
      aria-label="Primary"
      variants={ROOT_SCENE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      {MENU_ITEMS.map((item) => {
        const hasNestedMenu = hasChildren(item);
        const isActive = activeItem.id === item.id;

        return (
          <motion.div
            key={item.id}
            variants={ROOT_ITEM_VARIANTS}
            className="space-y-3"
          >
            <button
              type="button"
              onClick={() => onAction(item)}
              aria-current={isActive ? "page" : undefined}
              aria-haspopup={hasNestedMenu ? "dialog" : undefined}
              className="group flex w-full items-start justify-between gap-6 text-left focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
            >
              <div className="flex items-baseline gap-4">
                <span className="min-w-8 pt-2 text-[11px] uppercase tracking-[0.24em] text-[var(--color-hero-muted)]">
                  {item.index}
                </span>
                <motion.div
                  style={{ transformOrigin: "left center" }}
                  className={`font-[var(--font-manrope)] text-[clamp(2.8rem,8vw,7rem)] leading-[0.9] tracking-[-0.06em] transition-colors duration-300 ${
                    isActive
                      ? "text-[var(--color-hero-fg)]"
                      : "text-[var(--color-hero-fg)]/58 group-hover:text-[var(--color-hero-fg)]/88"
                  }`}
                >
                  {item.label}
                </motion.div>
              </div>

              <span className="hidden pt-4 text-[10px] uppercase tracking-[0.3em] text-[var(--color-hero-muted)]/70 md:block">
                {hasNestedMenu ? "Explore" : "Visit"}
              </span>
            </button>
          </motion.div>
        );
      })}
    </motion.nav>
  );
}

function SubmenuScene({
  item,
  onBack,
  onNavigate,
}: {
  item: MenuItem & { children: MenuChildItem[] };
  onBack: () => void;
  onNavigate: (id?: SiteSectionId, substep?: number) => void;
}) {
  const isCompact = item.children.length >= 4;

  return (
    <motion.div
      key={`submenu-${item.id}`}
      className="flex h-full min-h-0 items-center"
      variants={SUBMENU_SCENE_VARIANTS}
      initial="initial"
      animate="animate"
      exit="exit"
    >
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <motion.div
          className={`absolute left-[2.85rem] font-[var(--font-manrope)] leading-[0.84] tracking-[-0.08em] text-white/[0.06] ${
            isCompact
              ? "top-[17%] text-[clamp(4rem,10vw,7.6rem)] md:left-[3.7rem] md:top-[14%]"
              : "top-[18%] text-[clamp(4.5rem,11vw,8.25rem)] md:left-[3.8rem] md:top-[14%]"
          }`}
          initial={{ opacity: 0, y: 18 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 0 }}
          transition={{ duration: 0.52, ease: EASE_STANDARD }}
        >
          {item.label}
        </motion.div>
      </div>

      <button
        type="button"
        onClick={onBack}
        className="absolute left-0 top-0 z-20 flex items-center gap-3 text-[10px] uppercase tracking-[0.34em] text-[var(--color-hero-fg)]/84 transition-opacity duration-300 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
      >
        <span>Back</span>
        <span className="h-px w-9 bg-white/16" />
      </button>

      <div className="relative z-10 flex h-full w-full flex-col justify-center pt-12 md:pt-14">
        <motion.div
          className={`relative flex-none ${isCompact ? "mt-12 md:mt-14" : "mt-14 md:mt-16"}`}
          variants={SUBMENU_LIST_VARIANTS}
          initial="initial"
          animate="animate"
        >
          <div
            className={`w-full ${
              isCompact ? "max-w-[58rem] md:ml-[0.5rem]" : "max-w-[60rem]"
            }`}
          >
            <div className="mb-3 flex items-center gap-4 md:mb-4">
              <span className="min-w-8 text-[10px] uppercase tracking-[0.32em] text-[var(--color-hero-muted)]">
                {item.index}
              </span>
              <span className="h-px w-12 bg-white/12" />
            </div>

            {item.children.map((child, childIndex) => {
              const targetId = child.targetId ?? item.targetId;

              return (
                <motion.button
                  key={child.id}
                  type="button"
                  onClick={() => onNavigate(targetId, child.substep)}
                  variants={SUBMENU_ITEM_VARIANTS}
                  className={`group grid w-full grid-cols-[2.1rem_minmax(0,1fr)_auto] items-start gap-4 border-t border-white/10 text-left transition-colors duration-300 first:border-t-0 md:grid-cols-[2.4rem_minmax(0,1fr)_auto] md:gap-5 ${
                    isCompact ? "py-2.5 md:py-3" : "py-3.5 md:py-4.5"
                  }`}
                >
                  <span
                    className={`uppercase tracking-[0.24em] text-[var(--color-hero-muted)]/68 ${
                      isCompact ? "pt-1.5 text-[9px]" : "pt-2 text-[10px]"
                    }`}
                  >
                    {String(childIndex + 1).padStart(2, "0")}
                  </span>

                  <div className="min-w-0">
                    <p
                      className={`font-[var(--font-manrope)] leading-[0.92] tracking-[-0.07em] text-[var(--color-hero-fg)]/76 transition-colors duration-300 group-hover:text-[var(--color-hero-fg)] ${
                        isCompact
                          ? "text-[clamp(1.72rem,3.65vw,3.35rem)]"
                          : "text-[clamp(2rem,4.35vw,4.15rem)]"
                      }`}
                    >
                      {child.label}
                    </p>
                  </div>

                  <span
                    className={`hidden pt-2 text-[10px] uppercase tracking-[0.3em] text-[var(--color-hero-muted)]/62 transition-all duration-300 group-hover:translate-x-1 group-hover:text-[var(--color-hero-fg)]/78 md:block ${
                      isCompact ? "pt-2" : "pt-3"
                    }`}
                  >
                    Explore
                  </span>
                </motion.button>
              );
            })}
          </div>
        </motion.div>
      </div>
    </motion.div>
  );
}

export default function Header() {
  const { scrollToSection } = useScrollNavigation();
  const previousOverflowRef = useRef("");
  const menuNavigationFrameRef = useRef<number | null>(null);
  const [visible, setVisible] = useState(
    () =>
      typeof document !== "undefined" &&
      document.documentElement.dataset.preloaderDone === "true"
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMenuClosing, setIsMenuClosing] = useState(false);
  const [activeSection, setActiveSection] = useState(DEFAULT_SECTION_ID);
  const [activeTone, setActiveTone] = useState<"light" | "dark">("dark");
  const [submenuParentId, setSubmenuParentId] = useState<MenuItem["id"] | null>(
    null
  );
  const isMenuVisible = isMenuOpen || isMenuClosing;

  const activeItem =
    MENU_ITEMS.find((item) => item.id === SECTION_MENU_MAP[activeSection]) ??
    MENU_ITEMS[0];
  const activeLabel = ACTIVE_SECTION_LABEL_MAP[activeSection] ?? activeItem.label;
  const selectedParent =
    MENU_ITEMS.find((item) => item.id === submenuParentId) ?? null;
  const submenuItem =
    selectedParent && hasChildren(selectedParent) ? selectedParent : null;
  const infoPanelTitle = submenuItem ? submenuItem.label : ROOT_INFO_TITLE;
  const infoPanelSummary = submenuItem ? submenuItem.summary : ROOT_INFO_SUMMARY;

  const openMenu = useCallback(() => {
    setIsMenuClosing(false);
    setSubmenuParentId(null);
    setIsMenuOpen(true);
  }, []);

  const backToRoot = useCallback(() => {
    setSubmenuParentId(null);
  }, []);

  const closeMenu = useCallback(() => {
    if (!isMenuOpen) return;
    setIsMenuClosing(true);
    setSubmenuParentId(null);
    setIsMenuOpen(false);
  }, [isMenuOpen]);

  const openSubmenu = useCallback((itemId: MenuItem["id"]) => {
    setSubmenuParentId(itemId);
  }, []);

  const navigateTo = useCallback(
    (id?: SiteSectionId, substep?: number) => {
      if (!id) return;

      window.setTimeout(() => {
        scrollToSection(
          id,
          typeof substep === "number" ? { substep } : undefined
        );
      }, 180);
    },
    [scrollToSection]
  );

  const navigateFromMenu = useCallback(
    (id?: SiteSectionId, substep?: number) => {
      closeMenu();
      if (!id) return;

      if (menuNavigationFrameRef.current !== null) {
        window.cancelAnimationFrame(menuNavigationFrameRef.current);
      }

      menuNavigationFrameRef.current = window.requestAnimationFrame(() => {
        menuNavigationFrameRef.current = null;
        scrollToSection(id, {
          immediate: true,
          ...(typeof substep === "number" ? { substep } : {}),
        });
      });
    },
    [closeMenu, scrollToSection]
  );

  const handlePrimaryAction = useCallback(
    (item: MenuItem) => {
      if (hasChildren(item)) {
        openSubmenu(item.id);
        return;
      }

      navigateFromMenu(resolvePrimaryTargetId(item));
    },
    [navigateFromMenu, openSubmenu]
  );

  useEffect(() => {
    if (visible) return;

    const handler = () => setVisible(true);
    window.addEventListener(PRELOADER_COMPLETE_EVENT, handler, { once: true });
    return () => window.removeEventListener(PRELOADER_COMPLETE_EVENT, handler);
  }, [visible]);

  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    root.dataset.menuOpen = isMenuVisible ? "true" : "false";

    if (isMenuVisible) {
      previousOverflowRef.current = body.style.overflow;
      body.style.overflow = "hidden";
    } else {
      body.style.overflow = previousOverflowRef.current;
    }

    return () => {
      root.dataset.menuOpen = "false";
      body.style.overflow = previousOverflowRef.current;
    };
  }, [isMenuVisible]);

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

      const nextSection =
        (activeTarget?.id as SiteSectionId | undefined) ?? DEFAULT_SECTION_ID;
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

  useEffect(() => {
    if (!isMenuVisible) return;

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      event.preventDefault();
      closeMenu();
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [closeMenu, isMenuVisible]);

  useEffect(() => {
    return () => {
      if (menuNavigationFrameRef.current !== null) {
        window.cancelAnimationFrame(menuNavigationFrameRef.current);
      }
    };
  }, []);

  return (
    <>
      <motion.header
        className="pointer-events-none fixed inset-x-0 top-0 z-[9000]"
        initial={{ opacity: 0, y: -10 }}
        animate={{
          opacity: visible && !isMenuVisible ? 1 : 0,
          y: visible && !isMenuVisible ? 0 : -12,
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
                  {activeLabel}
                </p>
              </div>

              <button
                type="button"
                aria-expanded={isMenuOpen}
                aria-controls="site-navigation"
                aria-label="Open navigation"
                onClick={openMenu}
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

      <AnimatePresence onExitComplete={() => setIsMenuClosing(false)}>
        {isMenuOpen ? (
          <motion.aside
            id="site-navigation"
            className="fixed inset-0 z-[9100] overflow-hidden bg-[var(--color-hero-bg)] text-[var(--color-hero-fg)]"
            initial="closed"
            animate="open"
            exit="closed"
            variants={MENU_OVERLAY_VARIANTS}
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(109,129,104,0.22),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(16,23,18,0.92),rgba(10,15,11,1))]" />

            <div className="site-shell relative flex h-full flex-col py-5 md:py-6">
              <motion.div
                className="flex min-h-[var(--header-height)] items-center justify-between gap-4"
                variants={MENU_HEADER_VARIANTS}
              >
                <BrandLockup tone="dark" size="menu" />

                <button
                  type="button"
                  onClick={closeMenu}
                  className="text-[10px] uppercase tracking-[0.34em] text-[var(--color-hero-fg)]/88 transition-opacity duration-300 hover:opacity-100 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[var(--color-accent)]"
                >
                  Close
                </button>
              </motion.div>

              <div className="relative flex min-h-0 flex-1 overflow-hidden py-8 md:py-10 lg:py-[4rem]">
                <div className="grid flex-1 items-center gap-12 lg:grid-cols-[minmax(0,1fr)_420px] lg:gap-[4.5rem]">
                  <div className="relative min-h-0 flex-1">
                    <AnimatePresence initial={false} mode="wait">
                      {submenuItem ? (
                        <SubmenuScene
                          item={submenuItem}
                          onBack={backToRoot}
                          onNavigate={navigateFromMenu}
                        />
                      ) : (
                        <RootMenuScene
                          key="root-scene"
                          activeItem={activeItem}
                          onAction={handlePrimaryAction}
                        />
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.div
                    className="space-y-8"
                    initial={{ opacity: 0, x: 16 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 10 }}
                    transition={{ duration: 0.38, ease: EASE_STANDARD }}
                  >
                    <MenuInfoPanel
                      title={infoPanelTitle}
                      summary={infoPanelSummary}
                    />
                  </motion.div>
                </div>
              </div>
            </div>
          </motion.aside>
        ) : null}
      </AnimatePresence>
    </>
  );
}
