"use client";

import { m as motion, useReducedMotion } from "framer-motion";
import { useEffect, useState } from "react";

type BodySectionVeilProps = {
  variant?: "body" | "alt";
};

const VEIL_STYLES = {
  body: {
    base:
      "absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(84,133,100,0.2),transparent_34%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.68),transparent_30%),linear-gradient(180deg,var(--color-cream-light)_0%,var(--color-cream)_48%,var(--color-cream-deep)_100%)]",
    orbOne: "bg-[rgba(84,133,100,0.16)]",
    orbTwo: "bg-white/70",
    orbThree: "bg-[rgba(84,133,100,0.12)]",
  },
  alt: {
    base:
      "absolute inset-0 bg-[radial-gradient(circle_at_22%_16%,rgba(84,133,100,0.16),transparent_34%),radial-gradient(circle_at_78%_82%,rgba(255,255,255,0.74),transparent_30%),linear-gradient(180deg,var(--color-cream)_0%,var(--color-cream-light)_48%,var(--color-cream-deep)_100%)]",
    orbOne: "bg-[rgba(84,133,100,0.13)]",
    orbTwo: "bg-white/72",
    orbThree: "bg-[rgba(84,133,100,0.1)]",
  },
} as const;

export default function BodySectionVeil({
  variant = "body",
}: BodySectionVeilProps) {
  const prefersReducedMotion = useReducedMotion();
  const [isMobileSurface, setIsMobileSurface] = useState(false);
  const palette = VEIL_STYLES[variant];
  const shouldAnimate = !prefersReducedMotion && !isMobileSurface;

  useEffect(() => {
    const media = window.matchMedia("(max-width: 1024px), (pointer: coarse)");

    const sync = () => {
      setIsMobileSurface(media.matches);
    };

    sync();
    media.addEventListener("change", sync);
    return () => media.removeEventListener("change", sync);
  }, []);

  /* On mobile, skip animated orbs entirely — render only the static gradient */
  if (isMobileSurface) {
    return (
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className={palette.base} />
      </div>
    );
  }

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className={palette.base}
        animate={
          !shouldAnimate
            ? undefined
            : {
                opacity: [0.72, 0.9, 0.76],
                scale: [1, 1.03, 1],
              }
        }
        transition={{
          duration: 18,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      <motion.div
        className={`absolute left-[8%] top-[14%] h-[28vh] w-[28vw] rounded-full blur-[92px] ${palette.orbOne}`}
        animate={
          !shouldAnimate
            ? undefined
            : {
                x: [0, 32, -12, 0],
                y: [0, -18, 12, 0],
                opacity: [0.58, 0.8, 0.62, 0.58],
              }
        }
        transition={{
          duration: 24,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      <motion.div
        className={`absolute bottom-[12%] right-[8%] h-[24vh] w-[24vw] rounded-full blur-[118px] ${palette.orbTwo}`}
        animate={
          !shouldAnimate
            ? undefined
            : {
                x: [0, -28, 10, 0],
                y: [0, 18, -14, 0],
                opacity: [0.32, 0.52, 0.36, 0.32],
              }
        }
        transition={{
          duration: 21,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />

      <motion.div
        className={`absolute left-[34%] top-[26%] h-[34vh] w-[24vw] rounded-full blur-[126px] ${palette.orbThree}`}
        animate={
          !shouldAnimate
            ? undefined
            : {
                x: [0, -18, 20, 0],
                y: [0, 18, -8, 0],
                opacity: [0.22, 0.34, 0.24, 0.22],
              }
        }
        transition={{
          duration: 27,
          ease: "easeInOut",
          repeat: Number.POSITIVE_INFINITY,
        }}
      />
    </div>
  );
}
