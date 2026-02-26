"use client";

import Image from "next/image";
import { motion, useMotionValueEvent, useScroll, useSpring, useTransform } from "framer-motion";
import { useRef, useState } from "react";

const STORY_STEPS = [
    "My name is Dr Ahmed Altan and I am the chief surgeon in our hair transplant clinic. I personally complete the most important steps of the procedure.",
    "The number of monthly treatments is intentionally limited to only several dozen, and my presence during each hair transplant stands for our quality and professionalism.",
    "The price, quality and short waiting time for the treatment are the greatest benefits of hair transplant in our clinic in Turkiye.",
    "Having representatives of the clinic in many European countries, we encourage you to meet them in your country and get the best advice before having hair transplantation in Turkiye.",
];

const clampStep = (value: number, total: number) => {
    return Math.max(0, Math.min(total - 1, value));
};

export default function AboutDrAltan() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeStep, setActiveStep] = useState(0);

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const imageY = useSpring(
        useTransform(scrollYProgress, [0, 1], [24, -24]),
        { stiffness: 110, damping: 24, mass: 0.9 }
    );
    const imageRotate = useTransform(scrollYProgress, [0, 1], [-2.5, 2]);
    const copyY = useSpring(
        useTransform(scrollYProgress, [0, 1], [12, -12]),
        { stiffness: 120, damping: 26, mass: 0.9 }
    );
    const timelineProgress = useSpring(
        useTransform(scrollYProgress, [0.08, 0.92], [0, 1]),
        { stiffness: 140, damping: 28, mass: 0.85 }
    );

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        const total = STORY_STEPS.length;
        const nextStep = clampStep(Math.floor(latest * total), total);
        setActiveStep((prev) => (prev === nextStep ? prev : nextStep));
    });

    return (
        <section ref={sectionRef} className="relative h-[220vh] w-full bg-[var(--color-bg)]">
            <div className="sticky top-0 h-screen overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute left-[8%] top-[14%] h-[34vh] w-[26vw] rounded-full bg-[rgba(84,128,100,0.14)] blur-[96px]" />
                    <div className="absolute right-[8%] bottom-[12%] h-[36vh] w-[28vw] rounded-full bg-[rgba(255,255,255,0.05)] blur-[112px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_72%_24%,rgba(255,255,255,0.06),transparent_48%)]" />
                </div>

                <div className="relative z-10 h-full w-full px-4 md:px-8 lg:px-10">
                    <div className="mx-auto flex h-full w-full items-center justify-center">
                        <div className="grid w-full max-w-[1160px] items-center justify-items-center gap-8 md:gap-10 lg:gap-12 md:grid-cols-[440px_620px]">
                        <motion.figure
                            className="relative mx-auto md:mx-0 w-full max-w-[440px]"
                            style={{ y: imageY, rotate: imageRotate }}
                        >
                            <div className="relative aspect-[480/793] overflow-hidden rounded-[30px] border border-[var(--color-border-soft)] shadow-[0_30px_90px_rgba(0,0,0,0.5)]">
                                <Image
                                    src="/images/projects/ahmed-altan-480x793.png"
                                    alt="Dr Ahmed Altan portrait"
                                    fill
                                    sizes="(max-width: 768px) 84vw, 420px"
                                    className="object-cover object-top"
                                />
                                <div className="absolute inset-0 bg-gradient-to-b from-black/5 via-transparent to-black/55" />
                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.18),transparent_44%)]" />
                            </div>

                            <figcaption className="mt-4 inline-flex items-center rounded-full border border-[var(--color-border-soft)] bg-[var(--color-glass)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-fg-bone)]">
                                Chief Surgeon
                            </figcaption>
                        </motion.figure>

                            <motion.div className="relative w-full max-w-[620px] md:justify-self-start" style={{ y: copyY }}>
                            <div className="inline-flex items-center gap-2.5 mb-5 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-glass)] px-4 py-2 backdrop-blur-md">
                                <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                                <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
                                    About The Doctor
                                </p>
                            </div>

                            <h2
                                className="text-[clamp(2.2rem,4.3vw,4.25rem)] font-medium leading-[1.03] tracking-[-0.02em] text-[var(--color-fg-bone)]"
                                style={{ fontFamily: "var(--font-playfair)" }}
                            >
                                Dr Ahmed Altan
                            </h2>

                            <p className="mt-4 text-[clamp(1rem,1.16vw,1.18rem)] text-[var(--color-muted)] leading-[1.62]">
                                Our clinic is a specialist hair transplant clinic located in Turkiye, distinguished by an individual approach to each patient.
                            </p>

                            <div className="mt-8 space-y-4 md:space-y-5">
                                {STORY_STEPS.map((paragraph, index) => {
                                    const isActive = activeStep === index;
                                    const isRevealed = activeStep >= index;

                                    return (
                                        <motion.div
                                            key={`story-step-${index}`}
                                            className="grid grid-cols-[auto_1fr] gap-3.5 items-start"
                                            animate={{
                                                opacity: isRevealed ? 1 : 0.36,
                                                x: isActive ? 0 : 10,
                                            }}
                                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                                        >
                                            <span
                                                className={`mt-1 inline-flex h-2.5 w-2.5 rounded-full border ${isActive
                                                    ? "border-[var(--color-accent)] bg-[var(--color-accent)]"
                                                    : "border-[var(--color-border-soft)] bg-transparent"
                                                    }`}
                                            />
                                            <div>
                                                <p className="text-[10px] uppercase tracking-[0.24em] text-[var(--color-muted)] mb-1">
                                                    {String(index + 1).padStart(2, "0")}
                                                </p>
                                                <p className="text-[clamp(1.02rem,1.1vw,1.2rem)] text-[var(--color-fg-bone)]/88 leading-[1.56]">
                                                    {paragraph}
                                                </p>
                                            </div>
                                        </motion.div>
                                    );
                                })}
                            </div>

                            <div className="mt-7 h-[2px] w-full max-w-[620px] overflow-hidden rounded-full bg-white/12">
                                <motion.div
                                    className="h-full bg-gradient-to-r from-[var(--color-accent)] via-white/85 to-white"
                                    style={{
                                        scaleX: timelineProgress,
                                        transformOrigin: "0% 50%",
                                    }}
                                />
                            </div>
                            </motion.div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
