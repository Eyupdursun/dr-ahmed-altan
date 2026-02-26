"use client";

import {
    motion,
    useMotionValueEvent,
    useScroll,
    useSpring,
    useTransform,
} from "framer-motion";
import { useEffect, useRef, useState } from "react";

type FaqItem = {
    id: string;
    question: string;
    paragraphs: string[];
};

const FAQ_ITEMS: FaqItem[] = [
    {
        id: "faq-causes",
        question: "What are the causes of hair loss and thinning?",
        paragraphs: [
            "We all lose about 100 hairs a day and this is not really noticeable since we also have new hair growing. Hair loss or thinning occurs when the hair growth cycle of the scalp is disrupted or when the follicles are destroyed. The most common cause behind hair loss is hereditary condition.",
            "Apart from that, hormonal changes in the body, medications and supplements, radiation therapy, stress or hair treatments done wrong can cause hair loss or thinning.",
        ],
    },
    {
        id: "faq-types",
        question: "What are the different types of hair transplantation procedures?",
        paragraphs: [
            "There are two main types of hair transplant procedures, yet they work quite similar. The first one is called follicular unit transplantation (FUT) and it is also known as the strip method. It follows the extraction of a strip of skin from the part of the scalp where the healthiest hair growth is observed. Then the strip is dissected to separate groups of 1-3 hair follicles. Finally, the hair will be implanted into the bald patches of the scalp, where thinning or hair loss is seen.",
            "The second method, also the more modern one, is called follicular unit extraction (FUE). In this method, the grafts are extracted as individual hairs in two-step or three-step technique. Although the implantation process is still the same with FUT, the latter method is more common and leaves the patients with less scarring.",
            "It is not always the best option for everyone. People who have weaker follicles are suggested to go with FUT method because its success rate in survival and hair restoration is higher both during and after the procedure. Also, FUT should be considered if the area to be implanted is on the larger side.",
        ],
    },
    {
        id: "faq-timing",
        question: "When is the right time for hair plantation?",
        paragraphs: [
            "Hair transplants can be preferred if female or male pattern baldness is developed in the patients and it is the only long-term effective solution. Apart from that, the procedure can be applied to fill in scars or restore hair.",
            "Even if the hair starts thinning at a young age, it is safe to wait until the age of 25, as it will be easier to foresee how the patient's pattern baldness will progress with time. Nonetheless, there is no perfect time to get a transplant. If you just started losing your hair, have your hair thinning for a while or if you are completely bald, you can consult a surgeon and see the best way to move forward.",
        ],
    },
    {
        id: "faq-benefits",
        question: "What are the benefits of hair transplantation?",
        paragraphs: [
            "As mentioned above, there are two main types of transplant and the only difference between them is the way the donor hair is extracted. Transplanted hair is planted the same way to the balding areas of the scalp.",
            "In financial terms, FUT is beneficial as it is cost effective when compared to FUE. It takes less time to obtain the donor grafts. The disadvantage of FUT would be scarring as the removal of the strip of skin leaves a scar on the scalp. If the patient wears her or his hair long, this should be no problem because the scar will not be that visible. However, the scar will remain visible on the patients who like to wear their hair shorter.",
            "Despite being more expensive, FUE leaves the patients with less scarring as the donor hair is extracted individually, instead of cutting a strip of skin. Red dots appear where the donor hair is extracted and they heal within a few days. Hence, this method is preferable if the patient likes to wear hair short. Also, many celebrities like Wayne Rooney and Calum Best had this method.",
        ],
    },
    {
        id: "faq-work",
        question: "When can I return to work after hair transplant?",
        paragraphs: [
            "This mostly depends on the patient herself or himself. If the patient has a desk or basic office job, it is possible to return to work the next day after the transplantation surgery.",
            "Some patients prefer taking a few days or even weeks off, if they feel self-conscious about their condition.",
        ],
    },
    {
        id: "faq-healing",
        question: "How long does an average healing last for hair transplant?",
        paragraphs: [
            "Usually the new hair starts growing a few months after the surgery, yet you can expect to see visible results in 8-12 months. It takes almost a year for the new hair to be bedded into the bald patches.",
            "Patients who undergo hair plantation surgery and have a full head of hair now say that the procedure boosts their self-confidence and improves their quality of life. The surgery is the only long-term solution to the problem if you do not want to wear wigs or accessories constantly to cover up your balding areas.",
        ],
    },
];

const clampIndex = (value: number, total: number) =>
    Math.max(0, Math.min(total - 1, value));

export default function FaqStory() {
    const sectionRef = useRef<HTMLElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isMobile, setIsMobile] = useState(false);

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

    const { scrollYProgress } = useScroll({
        target: sectionRef,
        offset: ["start start", "end end"],
    });

    useMotionValueEvent(scrollYProgress, "change", (latest) => {
        if (isMobile) return;
        const nextIndex = clampIndex(Math.floor(latest * FAQ_ITEMS.length), FAQ_ITEMS.length);
        setActiveIndex((prev) => (prev === nextIndex ? prev : nextIndex));
    });

    const contentY = useSpring(
        useTransform(scrollYProgress, [0, 1], [16, -16]),
        { stiffness: 120, damping: 26, mass: 0.9 }
    );
    const progress = useSpring(
        useTransform(scrollYProgress, [0, 1], [0, 1]),
        { stiffness: 140, damping: 30, mass: 0.85 }
    );

    if (isMobile) {
        return (
            <section ref={sectionRef} className="relative w-full bg-[var(--color-bg)] py-16">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[18%] left-[8%] h-[30vh] w-[42vw] rounded-full bg-[rgba(84,128,100,0.12)] blur-[94px]" />
                    <div className="absolute right-[10%] bottom-[12%] h-[30vh] w-[42vw] rounded-full bg-[rgba(255,255,255,0.05)] blur-[112px]" />
                </div>

                <div
                    className="relative z-10 mx-auto w-full max-w-[760px] mobile-inline-gutter text-center"
                    style={{ paddingLeft: 15, paddingRight: 15 }}
                >
                    <div className="inline-flex items-center gap-2.5 mb-4 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-glass)] px-4 py-2 backdrop-blur-md">
                        <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                        <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
                            FAQ
                        </p>
                    </div>
                    <h2
                        className="text-[clamp(2rem,9vw,3.2rem)] leading-[1.04] tracking-[-0.02em] text-[var(--color-fg-bone)]"
                        style={{ fontFamily: "var(--font-playfair)" }}
                    >
                        Common Questions
                    </h2>

                    <div className="mt-8 space-y-4">
                        {FAQ_ITEMS.map((faq, index) => {
                            const isActive = activeIndex === index;
                            return (
                                <motion.article
                                    key={faq.id}
                                    className="rounded-[24px] border border-[var(--color-border-soft)] bg-[rgba(17,24,20,0.58)] p-5 backdrop-blur-md text-center"
                                    initial={{ opacity: 0, y: 30 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true, amount: 0.25 }}
                                    transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1], delay: index * 0.03 }}
                                >
                                    <button
                                        type="button"
                                        onClick={() => setActiveIndex(index)}
                                        className="w-full text-center"
                                    >
                                        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] mb-2">
                                            Q{String(index + 1).padStart(2, "0")}
                                        </p>
                                        <h3 className="text-[clamp(1.35rem,6vw,2rem)] leading-[1.1] tracking-[-0.02em] text-[var(--color-fg-bone)] font-semibold">
                                            {faq.question}
                                        </h3>
                                    </button>

                                    <div
                                        className={`grid transition-all duration-500 ease-out ${isActive ? "grid-rows-[1fr] opacity-100 mt-4" : "grid-rows-[0fr] opacity-0 mt-0"}`}
                                    >
                                        <div className="overflow-hidden">
                                            <div className="space-y-4">
                                                {faq.paragraphs.map((paragraph, paragraphIndex) => (
                                                    <p
                                                        key={`${faq.id}-mobile-${paragraphIndex}`}
                                                        className="text-base leading-relaxed text-[var(--color-muted)]"
                                                    >
                                                        {paragraph}
                                                    </p>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </motion.article>
                            );
                        })}
                    </div>
                </div>
            </section>
        );
    }

    const activeFaq = FAQ_ITEMS[activeIndex];

    return (
        <section ref={sectionRef} className="relative h-[520vh] w-full bg-[var(--color-bg)]">
            <div className="sticky top-0 h-screen overflow-hidden">
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-[16%] left-[8%] h-[28vh] w-[24vw] rounded-full bg-[rgba(84,128,100,0.12)] blur-[94px]" />
                    <div className="absolute right-[10%] bottom-[12%] h-[30vh] w-[25vw] rounded-full bg-[rgba(255,255,255,0.05)] blur-[112px]" />
                    <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_30%,rgba(255,255,255,0.06),transparent_52%)]" />
                </div>

                <motion.div
                    className="relative z-10 h-full w-full"
                    style={{ y: contentY }}
                >
                    <div className="absolute left-1/2 top-1/2 w-[min(97vw,1500px)] -translate-x-1/2 -translate-y-1/2">
                        <div className="grid w-full items-center gap-8 lg:gap-12 lg:grid-cols-[620px_minmax(0,1fr)]">
                            <aside className="rounded-[28px] border border-[var(--color-border-soft)] bg-[rgba(17,24,20,0.48)] backdrop-blur-md">
                                <div
                                    className="space-y-9"
                                    style={{ padding: "44px 28px 48px 28px" }}
                                >
                                    <div>
                                        <div className="inline-flex items-center gap-2.5 mb-4 rounded-full border border-[var(--color-border-soft)] bg-[var(--color-glass)] px-4 py-2 backdrop-blur-md">
                                            <span className="h-1.5 w-1.5 rounded-full bg-[var(--color-accent)]" />
                                            <p className="text-xs uppercase tracking-[0.3em] text-[var(--color-muted)]">
                                                FAQ
                                            </p>
                                        </div>
                                        <h2
                                            className="text-[clamp(1.8rem,3.4vw,3.2rem)] leading-[1.04] tracking-[-0.02em] text-[var(--color-fg-bone)]"
                                            style={{ fontFamily: "var(--font-playfair)" }}
                                        >
                                            Common Questions
                                        </h2>
                                    </div>

                                    <div className="space-y-5">
                                        {FAQ_ITEMS.map((faq, index) => {
                                            const isActive = index === activeIndex;
                                            return (
                                                <button
                                                    key={faq.id}
                                                    type="button"
                                                    onClick={() => setActiveIndex(index)}
                                                    className={`w-full rounded-2xl border px-8 py-5 md:px-9 md:py-6 text-left transition-colors duration-300 ${isActive
                                                        ? "border-[var(--color-accent)] bg-[var(--color-accent-soft)]"
                                                        : "border-[var(--color-border-soft)] bg-[rgba(255,255,255,0.02)] hover:bg-[rgba(255,255,255,0.05)]"
                                                        }`}
                                                >
                                                    <div className="px-3 py-2">
                                                        <p className="text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)] mb-1.5">
                                                            {String(index + 1).padStart(2, "0")}
                                                        </p>
                                                        <p className="text-[0.98rem] leading-snug text-[var(--color-fg-bone)]/92 whitespace-nowrap overflow-hidden text-ellipsis">
                                                            {faq.question}
                                                        </p>
                                                    </div>
                                                </button>
                                            );
                                        })}
                                    </div>

                                    <div className="h-[2px] w-full overflow-hidden rounded-full bg-white/12">
                                        <motion.div
                                            className="h-full bg-gradient-to-r from-[var(--color-accent)] via-white/90 to-white"
                                            style={{ scaleX: progress, transformOrigin: "0% 50%" }}
                                        />
                                    </div>
                                </div>
                            </aside>

                            <motion.article
                                key={activeFaq.id}
                                initial={{ opacity: 0, y: 24, filter: "blur(7px)" }}
                                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                className="rounded-[30px] border border-[var(--color-border-soft)] bg-[rgba(17,24,20,0.66)] backdrop-blur-md shadow-[0_22px_60px_rgba(0,0,0,0.35)]"
                            >
                                <div style={{ padding: "56px 64px 60px 64px" }}>
                                    <p className="mb-4 inline-flex items-center rounded-full border border-[var(--color-border-soft)] bg-[rgba(255,255,255,0.02)] px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-[var(--color-muted)]">
                                        Q{String(activeIndex + 1).padStart(2, "0")}
                                    </p>
                                    <h3 className="text-[clamp(1.6rem,2.8vw,3rem)] leading-[1.06] tracking-[-0.02em] text-[var(--color-fg-bone)] font-semibold mb-7">
                                        {activeFaq.question}
                                    </h3>
                                    <div className="space-y-5">
                                        {activeFaq.paragraphs.map((paragraph, index) => (
                                            <p
                                                key={`${activeFaq.id}-paragraph-${index}`}
                                                className="text-[clamp(1.01rem,1.05vw,1.16rem)] leading-relaxed text-[var(--color-muted)]"
                                            >
                                                {paragraph}
                                            </p>
                                        ))}
                                    </div>
                                </div>
                            </motion.article>
                        </div>
                    </div>
                </motion.div>
            </div>
        </section>
    );
}
