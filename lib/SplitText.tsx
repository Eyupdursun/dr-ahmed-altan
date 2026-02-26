"use client";

import { motion } from "framer-motion";

interface SplitTextProps {
    text: string;
    className?: string;
    delay?: number;
    stagger?: number;
    animateOnScroll?: boolean;
}

export default function SplitText({
    text,
    className = "",
    delay = 0,
    stagger = 0.03,
}: SplitTextProps) {
    const words = text.split(" ");

    const containerVariants = {
        hidden: {},
        visible: {
            transition: {
                staggerChildren: stagger,
                delayChildren: delay,
            },
        },
    };

    const charVariants = {
        hidden: {
            y: 120,
            opacity: 0,
            rotateX: -80,
        },
        visible: {
            y: 0,
            opacity: 1,
            rotateX: 0,
            transition: {
                type: "spring",
                stiffness: 100,
                damping: 12,
                mass: 0.5,
            },
        },
    };

    return (
        <motion.span
            className={`inline-flex flex-wrap ${className}`}
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            style={{ perspective: "1000px" }}
        >
            {words.map((word, wordIndex) => (
                <span key={wordIndex} className="inline-flex mr-[0.35em]">
                    {word.split("").map((char, charIndex) => (
                        <motion.span
                            key={`${wordIndex}-${charIndex}`}
                            variants={charVariants}
                            className="inline-block will-change-transform"
                            style={{ transformOrigin: "bottom center" }}
                        >
                            {char}
                        </motion.span>
                    ))}
                </span>
            ))}
        </motion.span>
    );
}
