"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, motion, useSpring } from "framer-motion";

const REVIEWS = [
    {
        id: 1,
        author: "Marcus T.",
        location: "London, UK",
        rating: 5,
        text: "The Sapphire Micro-FUE procedure was completely painless. Six months in, and the density is incredible. Dr. Altan's team is truly world-class.",
        image: "/images/projects/sculpture.svg" // Placeholder avatar
    },
    {
        id: 2,
        author: "David L.",
        location: "New York, USA",
        rating: 5,
        text: "I was hesitant about traveling for a hair transplant, but the natural results speak for themselves. The hairline design is a work of art.",
        image: "/images/projects/vogue.svg" // Placeholder avatar
    },
    {
        id: 3,
        author: "Omar S.",
        location: "Dubai, UAE",
        rating: 5,
        text: "Professionalism at its finest. They didn't just transplant hair; they restored my confidence. The healing process was remarkably fast.",
        image: "/images/projects/noir.svg" // Placeholder avatar
    }
];

export default function CustomerReviews() {
    const containerRef = useRef<HTMLElement>(null);
    const trackRef = useRef<HTMLDivElement>(null);
    const [isMobile, setIsMobile] = useState(false);
    const [mobileTrackShift, setMobileTrackShift] = useState(0);

    useEffect(() => {
        const update = () => {
            const mobile = window.matchMedia("(max-width: 767px)").matches;
            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            setIsMobile(mobile || reducedMotion);
        };
        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    useEffect(() => {
        if (!isMobile) return;

        const measure = () => {
            const track = trackRef.current;
            if (!track) return;
            const viewportWidth = track.parentElement?.clientWidth ?? window.innerWidth;
            const shift = Math.max(0, track.scrollWidth - viewportWidth);
            setMobileTrackShift(shift);
        };

        measure();
        window.addEventListener("resize", measure);
        return () => window.removeEventListener("resize", measure);
    }, [isMobile]);

    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const springProgress = useSpring(scrollYProgress, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    // Horizontal scroll calculation
    const cardsXMobile = useTransform(scrollYProgress, [0.14, 1], [0, -mobileTrackShift]);
    const cardsXDesktop = useTransform(springProgress, [0.2, 0.8], ["10%", "-60%"]);
    const cardsX = isMobile ? cardsXMobile : cardsXDesktop;

    // Header fade in
    const headerOpacity = useTransform(springProgress, [0.1, 0.3], [0, 1]);
    const headerY = useTransform(springProgress, [0.1, 0.3], [50, 0]);

    return (
            <section
            ref={containerRef}
            className={`relative bg-[var(--color-bg)] w-full ${isMobile ? "h-[280vh]" : "h-[250vh]"}`}
        >
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col justify-center">
                {/* Background ambient glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[var(--color-accent)] opacity-[0.03] blur-[120px] rounded-full pointer-events-none" />

                <div
                    className="w-full max-w-[760px] mx-auto mobile-inline-gutter md:pl-16 md:pr-0 lg:pl-24 mb-12 md:mb-24"
                    style={isMobile ? { paddingLeft: 15, paddingRight: 15 } : undefined}
                >
                    <motion.div
                        style={{ opacity: headerOpacity, y: headerY }}
                        className="max-w-[100rem] mx-auto text-center md:text-left"
                    >
                        <div className="inline-flex items-center gap-2.5 mb-5 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-glass)] px-4 py-2 backdrop-blur-md mx-auto md:mx-0">
                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
                                Patient Stories
                            </p>
                        </div>
                        <h2
                            className="text-[clamp(2rem,9vw,4.5rem)] font-medium leading-[1.04] text-[var(--color-fg-bone)] tracking-[-0.02em] max-w-[20ch] mx-auto md:mx-0"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Life-Changing
                            <span className="block text-white/50 italic">Transformations</span>
                        </h2>
                    </motion.div>
                </div>

                <div className="relative w-full">
                    <motion.div
                        ref={trackRef}
                        className="flex gap-6 md:gap-12 mobile-inline-gutter md:px-16 lg:px-24 w-max"
                        style={isMobile ? { paddingLeft: 15, paddingRight: 15, x: cardsX } : { x: cardsX }}
                    >
                        {REVIEWS.map((review) => (
                            <div
                                key={review.id}
                                className="w-[88vw] sm:w-[82vw] md:w-[600px] lg:w-[700px] min-h-[400px] shrink-0 rounded-[40px] border border-[var(--color-border-soft)] bg-[#111814]/80 backdrop-blur-xl relative overflow-hidden group flex flex-col justify-center"
                            >
                                {/* Hover Gradient effect */}
                                <div className="absolute inset-0 bg-gradient-to-br from-[var(--color-accent)]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none" />

                                <div className="relative z-10 w-full h-full box-border px-8 py-12 md:px-14 md:py-16 lg:px-20 lg:py-20 flex flex-col justify-center gap-8 md:gap-10 text-center md:text-left">
                                    <div className="flex gap-1 justify-center md:justify-start">
                                        {[...Array(review.rating)].map((_, i) => (
                                            <svg key={i} className="w-6 h-6 text-[var(--color-accent)]" fill="currentColor" viewBox="0 0 20 20">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                                            </svg>
                                        ))}
                                    </div>
                                    <p className="text-2xl md:text-3xl font-medium text-[var(--color-fg-bone)] leading-relaxed tracking-tight">
                                        &ldquo;{review.text}&rdquo;
                                    </p>

                                    <div className="flex items-center gap-5 pt-4 justify-center md:justify-start">
                                        <div className="w-16 h-16 rounded-full overflow-hidden bg-[var(--color-bg-elevated)] border border-[var(--color-border-soft)] shrink-0 flex items-center justify-center">
                                            {/* Empty placeholder as requested */}
                                        </div>
                                        <div>
                                            <h4 className="text-xl font-medium text-white mb-2">{review.author}</h4>
                                            <p className="text-base text-[var(--color-muted)]">{review.location}</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                        {isMobile ? <div className="shrink-0 w-[22vw]" aria-hidden="true" /> : null}
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
