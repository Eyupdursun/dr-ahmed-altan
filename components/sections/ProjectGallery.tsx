"use client";

import { useRef, useCallback, useEffect, useState } from "react";
import {
    motion,
    useMotionTemplate,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import dynamic from "next/dynamic";
import GalleryDOM from "@/components/three/GalleryDOM";
import type { GalleryProject } from "@/components/three/GalleryCanvas";
import { useLenis } from "@/components/layout/SmoothScrollProvider";

const GalleryCanvas = dynamic(
    () => import("@/components/three/GalleryCanvas"),
    { ssr: false }
);

// ─── Procedure Data (placeholder assets until real case photos arrive) ───
const projects: GalleryProject[] = [
    {
        title: "Brand new Sapphire MicroFUE (SMF)",
        category: "Extraction",
        tag: "Signature",
        image: "",
        description:
            "Today Dr. Ahmed ALTAN combine all new technology in one operation. 0.7 mm punches are smallest punch to harvest hair follicles from patients donor area. Now it is possible to operate patients with no scarring, no pain after operation. No over-harvesting and natural look on the back. This is the most comfortable operation in hair transplant world. Faster healing process is another plus of it.",
    },
    {
        title: "What is Sapphire Blade?",
        category: "Technology",
        tag: "Advanced",
        image: "",
        description:
            "Sapphire blades are brand new blades for hair transplant. As we understand from the name they are made of sapphire. They have a special curves and perfectly shaped for making insicions for hair follicles. They have also anti-bacterial property so they are totally safe.",
    },
    {
        title: "Beard Hair Transplant",
        category: "Facial",
        tag: "Artistry",
        image: "",
        description:
            "Man may have no hair on face and beard is one of dailly fashion for man. The solution is having a hair transplant. We harvest hair follicles from the back. Same area for scalp hair transplant and implant them on face. Can be full beard hair transplant and also we can fulfill empty areas on face.",
    },
    {
        title: "PRP Platelet-Rich Plasma",
        category: "Regenerative",
        tag: "Healing",
        image: "",
        description:
            "In recent years, doctors have learned that the body has the ability to heal itself. Platelet-rich plasma therapy is a form of regenerative medicine. It has some growth factors and faster healing process.",
    },
];
const hasProjectImages = projects.some((project) => project.image.trim().length > 0);

const MOBILE_BREAKPOINT = 767;
const clamp01 = (value: number) => Math.max(0, Math.min(1, value));

function TopSegmentBar({
    projects,
    itemElements,
    isVisible,
}: {
    projects: GalleryProject[];
    itemElements: React.MutableRefObject<(HTMLElement | null)[]>;
    isVisible: boolean;
}) {
    const { scrollState } = useLenis();
    const [viewportHeight, setViewportHeight] = useState(0);

    useEffect(() => {
        const updateViewport = () => {
            setViewportHeight(window.innerHeight);
        };

        updateViewport();
        window.addEventListener("resize", updateViewport);
        return () => window.removeEventListener("resize", updateViewport);
    }, []);

    if (!isVisible || viewportHeight === 0) return null;

    const firstEl = itemElements.current[0];
    const lastEl = itemElements.current[projects.length - 1];
    if (!firstEl || !lastEl) return null;

    const firstRect = firstEl.getBoundingClientRect();
    const lastRect = lastEl.getBoundingClientRect();

    const sectionStart = firstRect.top + window.scrollY - viewportHeight * 0.78;
    const sectionEnd = lastRect.top + window.scrollY + lastRect.height - viewportHeight * 0.28;
    const journeyProgress = clamp01(
        (scrollState.scroll - sectionStart) / Math.max(1, sectionEnd - sectionStart)
    );
    const sectionActive =
        scrollState.scroll > sectionStart - viewportHeight * 0.12 &&
        scrollState.scroll < sectionEnd + viewportHeight * 0.1;
    if (!sectionActive) return null;

    return (
        <aside
            aria-label="Section journey"
            className="fixed left-0 right-0 top-0 z-[26] hidden md:block pointer-events-none"
        >
            <div className="mx-auto w-[min(94vw,1280px)] pt-2">
                <div className="relative h-[2px] rounded-full bg-white/12 overflow-hidden">
                    <div
                        className="absolute left-0 top-0 h-full rounded-full bg-gradient-to-r from-white/85 via-white to-[var(--color-accent)]"
                        style={{ width: `${journeyProgress * 100}%` }}
                    />
                </div>
            </div>
        </aside>
    );
}

export default function ProjectGallery() {
    const sectionRef = useRef<HTMLElement>(null);
    const itemElements = useRef<(HTMLElement | null)[]>([]);
    const [isMobile, setIsMobile] = useState(false);

    const registerItem = useCallback((index: number, element: HTMLElement | null) => {
        itemElements.current[index] = element;
    }, []);

    useEffect(() => {
        const update = () => {
            const mobileView = window.matchMedia(`(max-width: ${MOBILE_BREAKPOINT}px)`).matches;
            const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
            setIsMobile(mobileView || reducedMotion);
        };

        update();
        window.addEventListener("resize", update);
        return () => window.removeEventListener("resize", update);
    }, []);

    // Create a 400vh scroll runway for the 4 projects
    const { scrollYProgress: sectionProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    const headerY = useSpring(
        useTransform(sectionProgress, [0, 0.05, 0.95, 1], [68, 0, 0, -52]),
        { stiffness: 120, damping: 24, mass: 0.9 }
    );
    const headerOpacity = useSpring(
        useTransform(sectionProgress, [0, 0.05, 0.95, 1], [0, 1, 1, 0]),
        { stiffness: 130, damping: 24, mass: 0.8 }
    );
    const headerBlur = useTransform(sectionProgress, [0, 0.05, 0.95, 1], [10, 0, 0, 10]);
    const headerFilter = useMotionTemplate`blur(${headerBlur}px)`;

    return (
        <section ref={sectionRef} className="relative h-[400vh] w-full bg-[var(--color-bg)]">
            <div className="sticky top-0 h-screen w-full overflow-hidden flex flex-col items-center justify-center">
                {/* ─── Fixed WebGL Canvas (desktop / full motion only) ─── */}
                {!isMobile && hasProjectImages ? (
                    <GalleryCanvas
                        projects={projects}
                        itemElements={itemElements}
                        sectionRef={sectionRef}
                        sectionProgress={sectionProgress} // Passed down to the canvas
                    />
                ) : null}

                <TopSegmentBar
                    projects={projects}
                    itemElements={itemElements}
                    isVisible={!isMobile}
                />

                {/* ─── Section Header ─── */}
                <div className="absolute top-0 left-0 w-full z-20 pointer-events-none">
                    <motion.div
                        className="pt-24 md:pt-32 pb-8 px-6 md:px-16 lg:px-24 w-full max-w-[100rem] mx-auto"
                        style={{
                            opacity: headerOpacity,
                            y: headerY,
                            filter: headerFilter,
                        }}
                    >
                        <div className="inline-flex items-center gap-2.5 mb-5 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-glass)] px-4 py-2 backdrop-blur-md">
                            <span className="h-1.5 w-1.5 rounded-full bg-white/80" />
                            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
                                Our Solutions
                            </p>
                        </div>
                        <h2
                            className="text-[clamp(1.9rem,4vw,3.4rem)] font-medium leading-[1.04] text-[var(--color-fg-bone)] tracking-[-0.02em] max-w-[18ch]"
                            style={{ fontFamily: "var(--font-playfair)" }}
                        >
                            Precision Crafted for
                            <span className="block text-white/82">Natural Results</span>
                        </h2>
                    </motion.div>
                </div>

                {/* ─── Scrollable DOM Layer (Sticky Content) ─── */}
                <GalleryDOM
                    projects={projects}
                    registerItem={registerItem}
                    showFallbackImages={isMobile}
                    sectionProgress={sectionProgress} // Passed down to the DOM layer
                />
            </div>
        </section>
    );
}
