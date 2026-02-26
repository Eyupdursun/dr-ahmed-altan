"use client";

import { useRef, useMemo, useState, useEffect, useCallback } from "react";
import { Canvas, useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { MotionValue } from "framer-motion";
import { useLenis } from "@/components/layout/SmoothScrollProvider";
import {
    liquidVertexShader,
    liquidFragmentShader,
} from "@/lib/shaders/liquidScroll";

// ─── Types ──────────────────────────────────────────────────
export interface GalleryProject {
    title: string;
    image: string;
    category: string;
    tag: string;
    description: string;
}

interface ImagePlaneProps {
    project: GalleryProject;
    index: number;
    scrollY: React.MutableRefObject<number>;
    scrollVelocity: React.MutableRefObject<number>;
    viewportHeight: React.MutableRefObject<number>;
    sectionTop: React.MutableRefObject<number>;
    /** Ref to an array of DOM elements for each gallery item */
    itemElements: React.MutableRefObject<(HTMLElement | null)[]>;
}

// ─── Helpers ────────────────────────────────────────────────
const clamp01 = (v: number) => Math.max(0, Math.min(1, v));

// ─── Single Image Plane ─────────────────────────────────────
function ImagePlane({
    project,
    index,
    scrollY,
    scrollVelocity,
    viewportHeight,
    sectionTop,
    itemElements,
    sectionProgress,
}: ImagePlaneProps & {
    sectionProgress: MotionValue<number>;
}) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const [texture, setTexture] = useState<THREE.Texture | null>(null);
    const { viewport, size } = useThree();

    // Load texture
    useEffect(() => {
        const imageSrc = project.image.trim();
        if (!imageSrc) return;

        const loader = new THREE.TextureLoader();
        let activeTexture: THREE.Texture | null = null;
        let disposed = false;

        loader.load(
            imageSrc,
            (tex) => {
                if (disposed) {
                    tex.dispose();
                    return;
                }
                tex.minFilter = THREE.LinearFilter;
                tex.magFilter = THREE.LinearFilter;
                tex.format = THREE.RGBAFormat;
                activeTexture = tex;
                setTexture(tex);
            },
            undefined,
            () => {
                if (!disposed) setTexture(null);
            }
        );

        return () => {
            disposed = true;
            activeTexture?.dispose();
        };
    }, [project.image]);

    const uniforms = useMemo(
        () => ({
            uTexture: { value: new THREE.Texture() },
            uScrollProgress: { value: 0.5 },
            uOpacity: { value: 0.0 },
            uScale: { value: 0.9 },
            uVelocity: { value: 0.0 },
            uTime: { value: 0.0 },
            uIntro: { value: 0.0 },
        }),
        []
    );

    useEffect(() => {
        if (texture && materialRef.current) {
            materialRef.current.uniforms.uTexture.value = texture;
            materialRef.current.needsUpdate = true;
        }
    }, [texture]);



    // We can extract current progress from MotionValue on frame
    useFrame((_state, delta) => {
        if (!meshRef.current || !materialRef.current) return;
        const el = itemElements.current[index];
        if (!el) return; // wait till DOM mounts

        const rect = el.getBoundingClientRect();
        const mat = materialRef.current;
        const mesh = meshRef.current;
        const velocity = scrollVelocity.current;
        const rawProgress = sectionProgress.get();

        const pxPerUnitX = size.width / viewport.width;
        const pxPerUnitY = size.height / viewport.height;

        // Where is the DOM slot currently on screen?
        const domScreenCenterX = rect.left + rect.width / 2 - window.innerWidth / 2;
        const domScreenCenterY = -(rect.top + rect.height / 2 - window.innerHeight / 2);

        const domWorldX = domScreenCenterX / pxPerUnitX;
        const domWorldY = domScreenCenterY / pxPerUnitY;

        // Exact match with DOM springs (no lerp delay needed since DOM handles its own smooth motion)
        mesh.position.x = domWorldX;
        mesh.position.y = domWorldY;

        // Now calculate Opacity and Parallax using the sectionProgress slice
        const totalItems = 4; // Or passed from props: projects.length
        const sliceProgressRatio = 1 / totalItems;
        const start = index * sliceProgressRatio;
        const end = start + sliceProgressRatio;
        const overlap = 0.05;

        // Target opacity corresponding perfectly to GalleryDOM mapping
        let targetOpacity = 0;
        if (index === 0) {
            if (rawProgress <= end - overlap) targetOpacity = 1;
            else if (rawProgress <= end) targetOpacity = 1 - (rawProgress - (end - overlap)) / overlap;
        } else if (index === totalItems - 1) {
            if (rawProgress < start - overlap) targetOpacity = 0;
            else if (rawProgress <= start) targetOpacity = (rawProgress - (start - overlap)) / overlap;
            else targetOpacity = 1;
        } else {
            if (rawProgress < start - overlap) targetOpacity = 0;
            else if (rawProgress <= start) targetOpacity = (rawProgress - (start - overlap)) / overlap;
            else if (rawProgress <= end - overlap) targetOpacity = 1;
            else if (rawProgress <= end) targetOpacity = 1 - (rawProgress - (end - overlap)) / overlap;
        }

        // Smoothly interpolate opacity
        mat.uniforms.uOpacity.value += (targetOpacity - mat.uniforms.uOpacity.value) * 0.1;

        // Custom Parallax just for this slice
        const sliceProgress = (rawProgress - start) / (end - start);
        const clampedSlice = clamp01(sliceProgress);
        mat.uniforms.uScrollProgress.value = clampedSlice;

        // Scale effect (Ensuring standard 1:1 image bounds mapping)
        // Subtracted 2px from rect calculation to account for border
        const planeW = (rect.width - 2) / pxPerUnitX;
        const planeH = (rect.height - 2) / pxPerUnitY;

        const targetScale = targetOpacity > 0 ? 0.98 + (clampedSlice * 0.04) : 0.9;
        mat.uniforms.uScale.value += (targetScale - mat.uniforms.uScale.value) * 0.08;
        mesh.scale.set(planeW * mat.uniforms.uScale.value, planeH * mat.uniforms.uScale.value, 1);

        // Velocity distortion
        const velocityNorm = Math.min(1, Math.abs(velocity) / 5000);
        const direction = velocity >= 0 ? 1 : -1;
        const targetRotZ = direction * velocityNorm * 0.012;
        const targetRotX = -velocityNorm * 0.016;
        mesh.rotation.z = THREE.MathUtils.lerp(mesh.rotation.z, targetRotZ, 0.06);
        mesh.rotation.x = THREE.MathUtils.lerp(mesh.rotation.x, targetRotX, 0.06);

        mat.uniforms.uVelocity.value = THREE.MathUtils.lerp(
            mat.uniforms.uVelocity.value,
            velocityNorm,
            0.06
        );
        mat.uniforms.uTime.value += delta;
        mat.uniforms.uIntro.value = 1.0; // fully introduced immediately for slices
    });

    if (!project.image.trim() || !texture) return null;

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[1, 1, 1, 1]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={liquidVertexShader}
                fragmentShader={liquidFragmentShader}
                uniforms={uniforms}
                transparent
            />
        </mesh>
    );
}

// ─── Scene ──────────────────────────────────────────────────
function Scene({
    projects,
    scrollY,
    scrollVelocity,
    viewportHeight,
    sectionTop,
    itemElements,
    sectionProgress,
}: {
    projects: GalleryProject[];
    scrollY: React.MutableRefObject<number>;
    scrollVelocity: React.MutableRefObject<number>;
    viewportHeight: React.MutableRefObject<number>;
    sectionTop: React.MutableRefObject<number>;
    itemElements: React.MutableRefObject<(HTMLElement | null)[]>;
    sectionProgress: MotionValue<number>;
}) {
    return (
        <>
            {projects.map((project, index) => {
                return (
                    <ImagePlane
                        key={project.title}
                        project={project}
                        index={index}
                        scrollY={scrollY}
                        scrollVelocity={scrollVelocity}
                        viewportHeight={viewportHeight}
                        sectionTop={sectionTop}
                        itemElements={itemElements}
                        sectionProgress={sectionProgress}
                    />
                );
            })}
        </>
    );
}

// ─── Exported Canvas ────────────────────────────────────────
export default function GalleryCanvas({
    projects,
    itemElements,
    sectionRef,
    sectionProgress,
}: {
    projects: GalleryProject[];
    itemElements: React.MutableRefObject<(HTMLElement | null)[]>;
    sectionRef: React.RefObject<HTMLElement | null>;
    sectionProgress: MotionValue<number>;
}) {
    const { scrollState } = useLenis();
    const scrollY = useRef(0);
    const scrollVelocity = useRef(0);
    const viewportHeight = useRef(0);
    const sectionTop = useRef(0);

    useEffect(() => {
        scrollY.current = scrollState.scroll;
        scrollVelocity.current = scrollState.velocity;
    }, [scrollState.scroll, scrollState.velocity]);

    const measureViewportAndSection = useCallback(() => {
        viewportHeight.current = window.innerHeight;
        if (!sectionRef.current) return;

        const rect = sectionRef.current.getBoundingClientRect();
        sectionTop.current = rect.top + window.scrollY;
    }, [sectionRef]);

    useEffect(() => {
        measureViewportAndSection();
        window.addEventListener("resize", measureViewportAndSection);
        window.addEventListener("scroll", measureViewportAndSection, { passive: true });
        return () => {
            window.removeEventListener("resize", measureViewportAndSection);
            window.removeEventListener("scroll", measureViewportAndSection);
        };
    }, [measureViewportAndSection]);

    return (
        <Canvas
            className="!fixed inset-0 !z-[2]"
            gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
            camera={{ position: [0, 0, 5], fov: 50 }}
            style={{ pointerEvents: "none" }}
            dpr={[1, 1.5]}
        >
            <Scene
                projects={projects}
                scrollY={scrollY}
                scrollVelocity={scrollVelocity}
                viewportHeight={viewportHeight}
                sectionTop={sectionTop}
                itemElements={itemElements}
                sectionProgress={sectionProgress}
            />
        </Canvas>
    );
}
