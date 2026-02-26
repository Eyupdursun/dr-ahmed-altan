"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const cursorRef = useRef<HTMLDivElement>(null);
    const [isHovering, setIsHovering] = useState(false);
    const [isVisible, setIsVisible] = useState(false);
    const position = useRef({ x: 0, y: 0 });
    const animatedPosition = useRef({ x: 0, y: 0 });
    const rafId = useRef<number>(0);

    useEffect(() => {
        // Check for touch device
        const isTouchDevice =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const handleMouseMove = (e: MouseEvent) => {
            position.current = { x: e.clientX, y: e.clientY };
            if (!isVisible) setIsVisible(true);
        };

        const handleMouseEnterInteractive = () => setIsHovering(true);
        const handleMouseLeaveInteractive = () => setIsHovering(false);

        const handleMouseLeave = () => setIsVisible(false);
        const handleMouseEnter = () => setIsVisible(true);

        // Animate cursor position with lerp for smoothness
        function animate() {
            const lerp = 0.15;
            animatedPosition.current.x +=
                (position.current.x - animatedPosition.current.x) * lerp;
            animatedPosition.current.y +=
                (position.current.y - animatedPosition.current.y) * lerp;

            if (cursorRef.current) {
                cursorRef.current.style.transform = `translate3d(${animatedPosition.current.x}px, ${animatedPosition.current.y}px, 0)`;
            }

            rafId.current = requestAnimationFrame(animate);
        }

        rafId.current = requestAnimationFrame(animate);

        // Listen for mouse events
        window.addEventListener("mousemove", handleMouseMove);
        document.addEventListener("mouseleave", handleMouseLeave);
        document.addEventListener("mouseenter", handleMouseEnter);

        // Attach hover listeners to interactive elements
        const interactiveElements = document.querySelectorAll(
            'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
        );
        interactiveElements.forEach((el) => {
            el.addEventListener("mouseenter", handleMouseEnterInteractive);
            el.addEventListener("mouseleave", handleMouseLeaveInteractive);
        });

        return () => {
            cancelAnimationFrame(rafId.current);
            window.removeEventListener("mousemove", handleMouseMove);
            document.removeEventListener("mouseleave", handleMouseLeave);
            document.removeEventListener("mouseenter", handleMouseEnter);
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnterInteractive);
                el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
            });
        };
    }, [isVisible]);

    // Use MutationObserver to re-attach hover listeners when DOM changes
    useEffect(() => {
        const isTouchDevice =
            "ontouchstart" in window || navigator.maxTouchPoints > 0;
        if (isTouchDevice) return;

        const handleMouseEnterInteractive = () => setIsHovering(true);
        const handleMouseLeaveInteractive = () => setIsHovering(false);

        const observer = new MutationObserver(() => {
            const interactiveElements = document.querySelectorAll(
                'a, button, [role="button"], input, textarea, select, [data-cursor-hover]'
            );
            interactiveElements.forEach((el) => {
                el.removeEventListener("mouseenter", handleMouseEnterInteractive);
                el.removeEventListener("mouseleave", handleMouseLeaveInteractive);
                el.addEventListener("mouseenter", handleMouseEnterInteractive);
                el.addEventListener("mouseleave", handleMouseLeaveInteractive);
            });
        });

        observer.observe(document.body, { childList: true, subtree: true });

        return () => observer.disconnect();
    }, []);

    return (
        <motion.div
            ref={cursorRef}
            className="fixed top-0 left-0 pointer-events-none z-[9999]"
            style={{
                mixBlendMode: "difference",
            }}
            animate={{
                width: isHovering ? 64 : 24,
                height: isHovering ? 64 : 24,
                marginLeft: isHovering ? -32 : -12,
                marginTop: isHovering ? -32 : -12,
                opacity: isVisible ? 1 : 0,
            }}
            transition={{
                width: { type: "spring", stiffness: 300, damping: 25 },
                height: { type: "spring", stiffness: 300, damping: 25 },
                marginLeft: { type: "spring", stiffness: 300, damping: 25 },
                marginTop: { type: "spring", stiffness: 300, damping: 25 },
                opacity: { duration: 0.2 },
            }}
        >
            <div className="w-full h-full rounded-full bg-white" />
        </motion.div>
    );
}
