"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

const INTERACTIVE_SELECTOR =
  "a, button, [role=\"button\"], input, textarea, select, summary, label[for], [data-cursor-hover]";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const hoverRef = useRef(false);
  const visibleRef = useRef(false);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const [isEnabled, setIsEnabled] = useState(false);
  const position = useRef({ x: 0, y: 0 });
  const animatedPosition = useRef({ x: 0, y: 0 });
  const rafId = useRef<number>(0);

  useEffect(() => {
    const media = window.matchMedia("(hover: hover) and (pointer: fine)");
    const sync = () => setIsEnabled(media.matches);

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  useEffect(() => {
    const root = document.documentElement;

    if (isEnabled) {
      root.dataset.cursorReady = "true";
    } else {
      delete root.dataset.cursorReady;
    }

    return () => {
      delete root.dataset.cursorReady;
    };
  }, [isEnabled]);

  useEffect(() => {
    if (!isEnabled) return;

    const setHoverState = (nextState: boolean) => {
      if (hoverRef.current === nextState) return;
      hoverRef.current = nextState;
      setIsHovering(nextState);
    };

    const setVisibility = (nextState: boolean) => {
      if (visibleRef.current === nextState) return;
      visibleRef.current = nextState;
      setIsVisible(nextState);
    };

    const handlePointerMove = (event: PointerEvent) => {
      position.current = { x: event.clientX, y: event.clientY };
      setVisibility(true);

      if (event.target instanceof Element) {
        setHoverState(Boolean(event.target.closest(INTERACTIVE_SELECTOR)));
      }
    };

    const handlePointerLeave = () => setVisibility(false);
    const handlePointerEnter = () => setVisibility(true);

    const animate = () => {
      const lerp = 0.15;

      animatedPosition.current.x +=
        (position.current.x - animatedPosition.current.x) * lerp;
      animatedPosition.current.y +=
        (position.current.y - animatedPosition.current.y) * lerp;

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${animatedPosition.current.x}px, ${animatedPosition.current.y}px, 0)`;
      }

      rafId.current = requestAnimationFrame(animate);
    };

    rafId.current = requestAnimationFrame(animate);

    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    document.addEventListener("pointerleave", handlePointerLeave);
    document.addEventListener("pointerenter", handlePointerEnter);

    return () => {
      cancelAnimationFrame(rafId.current);
      window.removeEventListener("pointermove", handlePointerMove);
      document.removeEventListener("pointerleave", handlePointerLeave);
      document.removeEventListener("pointerenter", handlePointerEnter);
    };
  }, [isEnabled]);

  if (!isEnabled) return null;

  return (
    <motion.div
      ref={cursorRef}
      className="pointer-events-none fixed left-0 top-0 z-[9999]"
      animate={{
        width: isHovering ? 34 : 24,
        height: isHovering ? 34 : 24,
        marginLeft: isHovering ? -17 : -12,
        marginTop: isHovering ? -17 : -12,
        opacity: isVisible ? 1 : 0,
        scale: isHovering ? 1.06 : 1,
      }}
      transition={{
        width: { type: "spring", stiffness: 320, damping: 30 },
        height: { type: "spring", stiffness: 320, damping: 30 },
        marginLeft: { type: "spring", stiffness: 320, damping: 30 },
        marginTop: { type: "spring", stiffness: 320, damping: 30 },
        scale: { type: "spring", stiffness: 280, damping: 24 },
        opacity: { duration: 0.2 },
      }}
    >
      <div className="absolute inset-0 rounded-full border border-[rgba(242,245,238,0.92)] bg-white/5 shadow-[0_0_0_1px_rgba(16,23,18,0.18),0_10px_22px_rgba(16,23,18,0.18)]" />
      <div className="absolute left-1/2 top-1/2 h-1.5 w-1.5 -translate-x-1/2 -translate-y-1/2 rounded-full bg-[var(--color-accent-strong)] shadow-[0_0_0_2px_rgba(255,255,255,0.7)]" />
    </motion.div>
  );
}
