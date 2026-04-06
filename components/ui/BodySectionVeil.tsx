"use client";

import { motion, useReducedMotion } from "framer-motion";

type BodySectionVeilProps = {
  variant?: "body" | "alt";
};

const VEIL_STYLES = {
  body: {
    base:
      "absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(109,129,104,0.24),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(16,23,18,0.94),rgba(10,15,11,1))]",
    orbOne: "bg-[rgba(109,129,104,0.2)]",
    orbTwo: "bg-[rgba(255,255,255,0.08)]",
    orbThree: "bg-[rgba(37,50,40,0.62)]",
  },
  alt: {
    base:
      "absolute inset-0 bg-[radial-gradient(circle_at_18%_18%,rgba(109,129,104,0.24),transparent_32%),radial-gradient(circle_at_82%_78%,rgba(255,255,255,0.08),transparent_28%),linear-gradient(180deg,rgba(16,23,18,0.94),rgba(10,15,11,1))]",
    orbOne: "bg-[rgba(109,129,104,0.2)]",
    orbTwo: "bg-[rgba(255,255,255,0.08)]",
    orbThree: "bg-[rgba(37,50,40,0.62)]",
  },
} as const;

export default function BodySectionVeil({
  variant = "body",
}: BodySectionVeilProps) {
  const prefersReducedMotion = useReducedMotion();
  const palette = VEIL_STYLES[variant];

  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <motion.div
        className={palette.base}
        animate={
          prefersReducedMotion
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
          prefersReducedMotion
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
          prefersReducedMotion
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
          prefersReducedMotion
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
