"use client";

import { useRef, useMemo, useState, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import {
    distortionVertexShader,
    distortionFragmentShader,
} from "@/lib/shaders/distortion";

interface DistortionPlaneProps {
    imageUrl: string;
    opacity: number;
    mousePosition: React.MutableRefObject<{ x: number; y: number }>;
    mouseVelocity: React.MutableRefObject<{ x: number; y: number }>;
    isActive: boolean;
}

export default function DistortionPlane({
    imageUrl,
    opacity,
    mousePosition,
    mouseVelocity,
    isActive,
}: DistortionPlaneProps) {
    const meshRef = useRef<THREE.Mesh>(null);
    const materialRef = useRef<THREE.ShaderMaterial>(null);
    const [texture, setTexture] = useState<THREE.Texture | null>(null);

    const uniforms = useMemo(
        () => ({
            uTexture: { value: new THREE.Texture() },
            uMouse: { value: new THREE.Vector2(0.5, 0.5) },
            uVelocity: { value: new THREE.Vector2(0, 0) },
            uStrength: { value: 1.0 },
            uOpacity: { value: 0 },
            uTime: { value: 0 },
        }),
        []
    );

    useEffect(() => {
        const loader = new THREE.TextureLoader();
        let activeTexture: THREE.Texture | null = null;

        loader.crossOrigin = "anonymous";
        loader.load(
            imageUrl,
            (loadedTexture) => {
                loadedTexture.minFilter = THREE.LinearFilter;
                loadedTexture.magFilter = THREE.LinearFilter;
                loadedTexture.format = THREE.RGBAFormat;
                activeTexture = loadedTexture;
                setTexture(loadedTexture);
            },
            undefined,
            (error) => {
                console.warn(`Failed to load texture: ${imageUrl}`, error);
                const canvas = document.createElement("canvas");
                canvas.width = 512;
                canvas.height = 320;
                const ctx = canvas.getContext("2d")!;
                const gradient = ctx.createRadialGradient(256, 160, 0, 256, 160, 256);
                gradient.addColorStop(0, "#c8a96e");
                gradient.addColorStop(1, "#0a0a0a");
                ctx.fillStyle = gradient;
                ctx.fillRect(0, 0, 512, 320);
                const fallback = new THREE.CanvasTexture(canvas);
                activeTexture = fallback;
                setTexture(fallback);
            }
        );

        return () => {
            activeTexture?.dispose();
        };
    }, [imageUrl]);

    useEffect(() => {
        if (texture && materialRef.current) {
            materialRef.current.uniforms.uTexture.value = texture;
            materialRef.current.needsUpdate = true;
        }
    }, [texture]);

    useFrame((_state, delta) => {
        if (!materialRef.current) return;

        const mat = materialRef.current;
        const targetOpacity = isActive ? opacity : 0;
        mat.uniforms.uOpacity.value +=
            (targetOpacity - mat.uniforms.uOpacity.value) * 0.08;

        if (mat.uniforms.uOpacity.value > 0.01) {
            mat.uniforms.uTime.value += delta;
            mat.uniforms.uMouse.value.set(
                mousePosition.current.x,
                mousePosition.current.y
            );

            const velocityTarget = new THREE.Vector2(
                mouseVelocity.current.x,
                mouseVelocity.current.y
            );
            mat.uniforms.uVelocity.value.lerp(velocityTarget, 0.1);

            const velMag = mat.uniforms.uVelocity.value.length();
            const targetStrength = Math.min(velMag * 0.05, 3.0);
            mat.uniforms.uStrength.value +=
                (targetStrength - mat.uniforms.uStrength.value) * 0.05;
        }
    });

    if (!texture) return null;

    return (
        <mesh ref={meshRef}>
            <planeGeometry args={[3.2, 2.0, 32, 32]} />
            <shaderMaterial
                ref={materialRef}
                vertexShader={distortionVertexShader}
                fragmentShader={distortionFragmentShader}
                uniforms={uniforms}
                transparent
            />
        </mesh>
    );
}
