// Experimental scroll-reactive shader for gallery planes.
// Keeps imagery premium while adding controlled, cinematic motion.

export const liquidVertexShader = /* glsl */ `
  varying vec2 vUv;

  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const liquidFragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform float uScrollProgress; // 0 = entering bottom, 1 = exiting top
  uniform float uOpacity;
  uniform float uScale;
  uniform float uVelocity;
  uniform float uTime;
  uniform float uIntro;

  varying vec2 vUv;

  float easeOutCubic(float t) {
    return 1.0 - pow(1.0 - t, 3.0);
  }

  void main() {
    vec2 center = vec2(0.5);
    float intro = easeOutCubic(clamp(uIntro, 0.0, 1.0));

    // Inner zoom window for parallax room.
    float zoom = mix(1.14, 1.08, intro);
    vec2 uv = (vUv - center) / zoom + center;

    // Base counter-scroll parallax.
    float parallaxStrength = mix(0.032, 0.022, intro);
    float offset = (uScrollProgress - 0.5) * -parallaxStrength * 2.0;
    uv.y += offset;

    // Velocity-driven liquid drift (subtle, controlled).
    float vel = clamp(abs(uVelocity), 0.0, 1.0);
    float velSoft = smoothstep(0.05, 1.0, vel);
    float t = uTime * (0.42 + velSoft * 0.38);
    float waveA = sin((uv.y * 9.0) + (t * 1.08));
    float waveB = cos((uv.x * 8.0) - (t * 0.95));
    vec2 liquid = vec2(waveA, waveB) * velSoft * 0.0024;
    uv += liquid;

    // Slight breathing around center while entering.
    float radial = distance(vUv, center);
    float pulse = sin(uTime * 1.25 + radial * 16.0) * 0.00085;
    uv += (vUv - center) * pulse * (1.0 - intro);

    uv = clamp(uv, vec2(0.001), vec2(0.999));

    // Very subtle chromatic split under high velocity only.
    float split = velSoft * 0.00035;
    vec2 splitDir = normalize(vec2(uv.x - 0.5, uv.y - 0.5) + vec2(0.001));
    float r = texture2D(uTexture, uv + splitDir * split).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, uv - splitDir * split).b;
    vec3 rgb = vec3(r, g, b);

    // Softer vignette and warmer accent.
    vec2 vigUv = vUv * (1.0 - vUv);
    float vig = clamp(pow(vigUv.x * vigUv.y * 18.0, 0.24), 0.0, 1.0);
    float warm = smoothstep(0.78, 0.18, radial) * 0.011;
    rgb *= mix(0.92, 1.0, vig);
    rgb += vec3(0.13, 0.1, 0.03) * warm;

    // Radial intro reveal mask for hero->gallery cinematic transition.
    float revealRadius = mix(0.18, 1.2, intro);
    float reveal = smoothstep(revealRadius, revealRadius - 0.12, radial);

    gl_FragColor = vec4(rgb, uOpacity * reveal);
  }
`;
