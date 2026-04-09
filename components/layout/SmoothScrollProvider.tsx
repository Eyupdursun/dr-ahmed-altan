"use client";

import {
  createContext,
  startTransition,
  useCallback,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
import { SITE_SECTIONS, type SiteSectionId } from "@/lib/siteContent";

/* ── scroll state exposed to consumers ── */

interface ScrollState {
  scroll: number;
  velocity: number;
  progress: number;
  direction: number;
  limit: number;
}

type ScrollToSectionOptions = {
  boundary?: "start" | "end";
  direction?: 1 | -1;
  immediate?: boolean;
  substep?: number;
};

type NavigationState = {
  activeSectionIndex: number;
  isTransitioning: boolean;
  lastDirection: 1 | -1;
  sectionSubsteps: Record<SiteSectionId, number>;
};

interface ScrollNavigationContextValue {
  activeSectionId: SiteSectionId;
  activeSectionIndex: number;
  isTransitioning: boolean;
  lastDirection: 1 | -1;
  scrollState: ScrollState;
  scrollTo: (target: string | number | HTMLElement) => void;
  scrollToSection: (
    sectionId: SiteSectionId,
    options?: ScrollToSectionOptions
  ) => void;
  sectionSubsteps: Record<SiteSectionId, number>;
}

const DEFAULT_SCROLL_STATE: ScrollState = {
  scroll: 0,
  velocity: 0,
  progress: 0,
  direction: 1,
  limit: 0,
};

const SECTION_INDEX = Object.fromEntries(
  SITE_SECTIONS.map((section, index) => [section.id, index])
) as Record<SiteSectionId, number>;

const STEP_THRESHOLD = 52;
const TOUCH_THRESHOLD = 58;
const SUBSTEP_TRANSITION_MS = 600;
const SECTION_TRANSITION_MS = 1100;

const createInitialSubsteps = () =>
  Object.fromEntries(
    SITE_SECTIONS.map((section) => [section.id, 0])
  ) as Record<SiteSectionId, number>;

const ScrollNavigationContext = createContext<ScrollNavigationContextValue>({
  activeSectionId: SITE_SECTIONS[0].id,
  activeSectionIndex: 0,
  isTransitioning: false,
  lastDirection: 1,
  scrollState: DEFAULT_SCROLL_STATE,
  scrollTo: () => undefined,
  scrollToSection: () => undefined,
  sectionSubsteps: createInitialSubsteps(),
});

export function useScrollNavigation() {
  return useContext(ScrollNavigationContext);
}

/* ── smooth scroll helper (JS-driven, no Lenis) ── */

function smoothScrollTo(
  targetY: number,
  durationMs: number,
  onComplete?: () => void
) {
  const startY = window.scrollY;
  const distance = targetY - startY;

  if (Math.abs(distance) < 1) {
    window.scrollTo(0, targetY);
    onComplete?.();
    return () => {};
  }

  const startTime = performance.now();
  let rafId = 0;
  let cancelled = false;

  // Custom easeInOutQuart — gentle start, smooth deceleration
  const ease = (t: number) =>
    t < 0.5 ? 8 * t * t * t * t : 1 - Math.pow(-2 * t + 2, 4) / 2;

  const step = (currentTime: number) => {
    if (cancelled) return;
    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / durationMs, 1);
    const eased = ease(progress);
    window.scrollTo(0, startY + distance * eased);

    if (progress < 1) {
      rafId = requestAnimationFrame(step);
    } else {
      window.scrollTo(0, targetY);
      onComplete?.();
    }
  };

  rafId = requestAnimationFrame(step);

  return () => {
    cancelled = true;
    cancelAnimationFrame(rafId);
  };
}

/* ── provider ── */

export default function SmoothScrollProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const initialSubsteps = createInitialSubsteps();
  const activeSectionIndexRef = useRef(0);
  const isTransitioningRef = useRef(false);
  const lastDirectionRef = useRef<1 | -1>(1);
  const sectionSubstepsRef = useRef(initialSubsteps);
  const touchStartYRef = useRef<number | null>(null);
  const wheelAccumulatorRef = useRef(0);
  const wheelResetTimerRef = useRef<number | null>(null);
  const transitionTimerRef = useRef<number | null>(null);
  const cancelScrollRef = useRef<(() => void) | null>(null);
  const lastScrollYRef = useRef(0);
  const lastScrollTimeRef = useRef(0);

  const [scrollState, setScrollState] = useState(DEFAULT_SCROLL_STATE);
  const [navigationState, setNavigationState] = useState<NavigationState>({
    activeSectionIndex: 0,
    isTransitioning: false,
    lastDirection: 1,
    sectionSubsteps: initialSubsteps,
  });

  /* ── helpers ── */

  const clearWheelAccumulator = useCallback(() => {
    wheelAccumulatorRef.current = 0;
    if (wheelResetTimerRef.current !== null) {
      window.clearTimeout(wheelResetTimerRef.current);
      wheelResetTimerRef.current = null;
    }
  }, []);

  const publishNavigationState = useCallback((nextState: NavigationState) => {
    activeSectionIndexRef.current = nextState.activeSectionIndex;
    isTransitioningRef.current = nextState.isTransitioning;
    lastDirectionRef.current = nextState.lastDirection;
    sectionSubstepsRef.current = nextState.sectionSubsteps;
    startTransition(() => {
      setNavigationState(nextState);
    });
  }, []);

  const resolveSectionElement = useCallback((sectionId: SiteSectionId) => {
    return document.getElementById(sectionId);
  }, []);

  const shouldIgnoreGestures = useCallback(() => {
    const root = document.documentElement;
    return (
      root.dataset.menuOpen === "true" ||
      root.dataset.preloaderDone !== "true"
    );
  }, []);

  const releaseTransitionLock = useCallback(() => {
    if (transitionTimerRef.current !== null) {
      window.clearTimeout(transitionTimerRef.current);
      transitionTimerRef.current = null;
    }
    isTransitioningRef.current = false;
    publishNavigationState({
      activeSectionIndex: activeSectionIndexRef.current,
      isTransitioning: false,
      lastDirection: lastDirectionRef.current,
      sectionSubsteps: sectionSubstepsRef.current,
    });
  }, [publishNavigationState]);

  /* ── scroll tracking via rAF ── */

  useEffect(() => {
    let rafId = 0;
    const tick = () => {
      const now = performance.now();
      const currentY = window.scrollY;
      const dt = now - lastScrollTimeRef.current;
      const velocity = dt > 0 ? (currentY - lastScrollYRef.current) / dt * 1000 : 0;
      const limit = document.documentElement.scrollHeight - window.innerHeight;
      const progress = limit > 0 ? currentY / limit : 0;
      const direction = currentY >= lastScrollYRef.current ? 1 : -1;

      lastScrollYRef.current = currentY;
      lastScrollTimeRef.current = now;

      setScrollState({
        scroll: currentY,
        velocity,
        progress,
        direction,
        limit,
      });

      rafId = requestAnimationFrame(tick);
    };
    rafId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(rafId);
  }, []);

  /* ── public scrollTo (generic) ── */

  const scrollTo = useCallback((target: string | number | HTMLElement) => {
    let targetY = 0;
    if (typeof target === "number") {
      targetY = target;
    } else if (typeof target === "string") {
      const el = document.querySelector(target);
      if (el instanceof HTMLElement) targetY = el.offsetTop;
    } else {
      targetY = target.offsetTop;
    }
    cancelScrollRef.current?.();
    cancelScrollRef.current = smoothScrollTo(targetY, 600);
  }, []);

  /* ── public scrollToSection ── */

  const scrollToSection = useCallback(
    (sectionId: SiteSectionId, options: ScrollToSectionOptions = {}) => {
      const previousIndex = activeSectionIndexRef.current;
      const nextIndex = SECTION_INDEX[sectionId];
      const sectionConfig = SITE_SECTIONS[nextIndex];
      const previousSubstep = sectionSubstepsRef.current[sectionId] ?? 0;
      const maxSubstep = Math.max(sectionConfig.substepCount - 1, 0);
      const nextSubstep =
        typeof options.substep === "number"
          ? Math.max(0, Math.min(maxSubstep, options.substep))
          : options.boundary === "end"
            ? maxSubstep
            : 0;
      const nextDirection =
        options.direction ??
        (nextIndex === previousIndex
          ? nextSubstep >= previousSubstep
            ? 1
            : -1
          : nextIndex > previousIndex
            ? 1
            : -1);
      const nextSubsteps = {
        ...sectionSubstepsRef.current,
        [sectionId]: nextSubstep,
      };
      const targetElement = resolveSectionElement(sectionId);

      clearWheelAccumulator();

      // Cancel any in-progress scroll animation
      cancelScrollRef.current?.();
      cancelScrollRef.current = null;

      /* immediate (no animation) */
      if (options.immediate) {
        publishNavigationState({
          activeSectionIndex: nextIndex,
          isTransitioning: false,
          lastDirection: nextDirection,
          sectionSubsteps: nextSubsteps,
        });
        if (targetElement) {
          window.scrollTo(0, targetElement.offsetTop);
        }
        return;
      }

      const isSameSection = nextIndex === previousIndex;

      /* substep transition (same section — no scroll needed) */
      if (isSameSection) {
        publishNavigationState({
          activeSectionIndex: nextIndex,
          isTransitioning: true,
          lastDirection: nextDirection,
          sectionSubsteps: nextSubsteps,
        });
        if (transitionTimerRef.current !== null) {
          window.clearTimeout(transitionTimerRef.current);
        }
        transitionTimerRef.current = window.setTimeout(() => {
          releaseTransitionLock();
        }, SUBSTEP_TRANSITION_MS);
        return;
      }

      /* cross-section transition */
      publishNavigationState({
        activeSectionIndex: nextIndex,
        isTransitioning: true,
        lastDirection: nextDirection,
        sectionSubsteps: nextSubsteps,
      });

      if (targetElement) {
        const targetOffset = targetElement.offsetTop;

        // Safety fallback timer
        if (transitionTimerRef.current !== null) {
          window.clearTimeout(transitionTimerRef.current);
        }
        transitionTimerRef.current = window.setTimeout(() => {
          releaseTransitionLock();
        }, SECTION_TRANSITION_MS + 300);

        cancelScrollRef.current = smoothScrollTo(
          targetOffset,
          SECTION_TRANSITION_MS,
          () => {
            releaseTransitionLock();
          }
        );
      } else {
        // No element found — timer fallback
        if (transitionTimerRef.current !== null) {
          window.clearTimeout(transitionTimerRef.current);
        }
        transitionTimerRef.current = window.setTimeout(() => {
          releaseTransitionLock();
        }, SECTION_TRANSITION_MS);
      }
    },
    [
      clearWheelAccumulator,
      publishNavigationState,
      releaseTransitionLock,
      resolveSectionElement,
    ]
  );

  /* ── stepping logic ── */

  const stepSections = useCallback(
    (direction: 1 | -1) => {
      if (isTransitioningRef.current) return;

      const currentIndex = activeSectionIndexRef.current;
      const currentSection = SITE_SECTIONS[currentIndex];
      const currentSubstep = sectionSubstepsRef.current[currentSection.id];

      if (direction === 1) {
        if (currentSubstep < currentSection.substepCount - 1) {
          scrollToSection(currentSection.id, {
            direction: 1,
            substep: currentSubstep + 1,
          });
          return;
        }

        const nextSection = SITE_SECTIONS[currentIndex + 1];
        if (nextSection) {
          scrollToSection(nextSection.id, { boundary: "start", direction: 1 });
        }
        return;
      }

      if (currentSubstep > 0) {
        scrollToSection(currentSection.id, {
          direction: -1,
          substep: currentSubstep - 1,
        });
        return;
      }

      const previousSection = SITE_SECTIONS[currentIndex - 1];
      if (previousSection) {
        scrollToSection(previousSection.id, { boundary: "end", direction: -1 });
      }
    },
    [scrollToSection]
  );

  /* ── initial sync on mount ── */

  useEffect(() => {
    const syncToNearestSection = () => {
      const closest = SITE_SECTIONS.reduce(
        (best, section, index) => {
          const element = resolveSectionElement(section.id);
          if (!element) return best;
          const distance = Math.abs(element.offsetTop - window.scrollY);
          return distance < best.distance ? { distance, index } : best;
        },
        { distance: Number.POSITIVE_INFINITY, index: 0 }
      );

      publishNavigationState({
        activeSectionIndex: closest.index,
        isTransitioning: false,
        lastDirection: lastDirectionRef.current,
        sectionSubsteps: sectionSubstepsRef.current,
      });

      scrollToSection(SITE_SECTIONS[closest.index].id, { immediate: true });
    };

    syncToNearestSection();

    const handleResize = () => {
      window.requestAnimationFrame(() => {
        scrollToSection(SITE_SECTIONS[activeSectionIndexRef.current].id, {
          immediate: true,
          substep:
            sectionSubstepsRef.current[
              SITE_SECTIONS[activeSectionIndexRef.current].id
            ],
        });
      });
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [publishNavigationState, resolveSectionElement, scrollToSection]);

  /* ── input handling (wheel / touch / keyboard) ── */

  useEffect(() => {
    const scheduleWheelReset = () => {
      if (wheelResetTimerRef.current !== null) {
        window.clearTimeout(wheelResetTimerRef.current);
      }
      wheelResetTimerRef.current = window.setTimeout(() => {
        clearWheelAccumulator();
      }, 180);
    };

    const handleWheel = (event: WheelEvent) => {
      if (event.ctrlKey || event.metaKey) return;
      if (shouldIgnoreGestures()) return;
      if (Math.abs(event.deltaY) < Math.abs(event.deltaX)) return;

      event.preventDefault();

      if (isTransitioningRef.current) return;

      if (wheelAccumulatorRef.current !== 0) {
        const previousDirection = Math.sign(wheelAccumulatorRef.current);
        const nextDirection = Math.sign(event.deltaY);
        if (previousDirection !== 0 && nextDirection !== previousDirection) {
          wheelAccumulatorRef.current = 0;
        }
      }

      wheelAccumulatorRef.current += event.deltaY;
      scheduleWheelReset();

      if (Math.abs(wheelAccumulatorRef.current) < STEP_THRESHOLD) return;

      const direction: 1 | -1 = wheelAccumulatorRef.current > 0 ? 1 : -1;
      clearWheelAccumulator();
      stepSections(direction);
    };

    const handleTouchStart = (event: TouchEvent) => {
      if (shouldIgnoreGestures()) return;
      touchStartYRef.current = event.touches[0]?.clientY ?? null;
    };

    const handleTouchMove = (event: TouchEvent) => {
      if (shouldIgnoreGestures()) return;
      if (touchStartYRef.current === null) return;
      const currentY = event.touches[0]?.clientY ?? touchStartYRef.current;
      if (Math.abs(touchStartYRef.current - currentY) > 6) {
        event.preventDefault();
      }
    };

    const handleTouchEnd = (event: TouchEvent) => {
      const startY = touchStartYRef.current;
      const endY = event.changedTouches[0]?.clientY;
      touchStartYRef.current = null;

      if (
        startY === null ||
        typeof endY !== "number" ||
        isTransitioningRef.current ||
        shouldIgnoreGestures()
      ) {
        return;
      }

      const delta = startY - endY;
      if (Math.abs(delta) < TOUCH_THRESHOLD) return;
      stepSections(delta > 0 ? 1 : -1);
    };

    const handleKeyDown = (event: KeyboardEvent) => {
      const target = event.target;
      if (
        target instanceof HTMLElement &&
        target.closest("input, textarea, select, [contenteditable='true']")
      ) {
        return;
      }

      if (shouldIgnoreGestures()) return;

      if (
        event.key === "ArrowDown" ||
        event.key === "PageDown" ||
        event.key === " "
      ) {
        event.preventDefault();
        stepSections(1);
      }

      if (event.key === "ArrowUp" || event.key === "PageUp") {
        event.preventDefault();
        stepSections(-1);
      }
    };

    window.addEventListener("wheel", handleWheel, { passive: false });
    window.addEventListener("touchstart", handleTouchStart, { passive: true });
    window.addEventListener("touchmove", handleTouchMove, { passive: false });
    window.addEventListener("touchend", handleTouchEnd, { passive: true });
    window.addEventListener("keydown", handleKeyDown);

    return () => {
      window.removeEventListener("wheel", handleWheel);
      window.removeEventListener("touchstart", handleTouchStart);
      window.removeEventListener("touchmove", handleTouchMove);
      window.removeEventListener("touchend", handleTouchEnd);
      window.removeEventListener("keydown", handleKeyDown);
      clearWheelAccumulator();
    };
  }, [clearWheelAccumulator, shouldIgnoreGestures, stepSections]);

  /* ── cleanup ── */

  useEffect(() => {
    return () => {
      if (transitionTimerRef.current !== null) {
        window.clearTimeout(transitionTimerRef.current);
      }
      if (wheelResetTimerRef.current !== null) {
        window.clearTimeout(wheelResetTimerRef.current);
      }
      cancelScrollRef.current?.();
    };
  }, []);


  return (
    <ScrollNavigationContext.Provider
      value={{
        activeSectionId: SITE_SECTIONS[navigationState.activeSectionIndex].id,
        activeSectionIndex: navigationState.activeSectionIndex,
        isTransitioning: navigationState.isTransitioning,
        lastDirection: navigationState.lastDirection,
        scrollState,
        scrollTo,
        scrollToSection,
        sectionSubsteps: navigationState.sectionSubsteps,
      }}
    >
      {children}
    </ScrollNavigationContext.Provider>
  );
}
