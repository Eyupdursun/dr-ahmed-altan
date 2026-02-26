"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import Lenis from "lenis";

interface ScrollState {
  scroll: number;
  velocity: number;
  progress: number;
  direction: number;
  limit: number;
}

interface LenisContextValue {
  scrollState: ScrollState;
}

const LenisContext = createContext<LenisContextValue>({
  scrollState: { scroll: 0, velocity: 0, progress: 0, direction: 1, limit: 0 },
});

export function useLenis() {
  return useContext(LenisContext);
}

export default function SmoothScrollProvider({ children }: { children: React.ReactNode }) {
  const [scrollState, setScrollState] = useState<ScrollState>({
    scroll: 0,
    velocity: 0,
    progress: 0,
    direction: 1,
    limit: 0,
  });

  const onScroll = useCallback((e: Lenis) => {
    setScrollState({
      scroll: e.scroll,
      velocity: e.velocity,
      progress: e.progress,
      direction: e.direction,
      limit: e.limit,
    });
  }, []);

  useEffect(() => {
    const lenisInstance = new Lenis({
      lerp: 0.06,
      duration: 1.4,
      smoothWheel: true,
    });

    lenisInstance.on("scroll", onScroll);

    let rafId = 0;
    const raf = (time: number) => {
      lenisInstance.raf(time);
      rafId = requestAnimationFrame(raf);
    };

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenisInstance.off("scroll", onScroll);
      lenisInstance.destroy();
    };
  }, [onScroll]);

  return (
    <LenisContext.Provider value={{ scrollState }}>
      {children}
    </LenisContext.Provider>
  );
}
