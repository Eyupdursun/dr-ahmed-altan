// Vertex + Fragment shaders for glass-refraction distortion
// Tuned for "refracting glass" feel — strong liquid warp, subtle RGB shift

export const distortionVertexShader = /* glsl */ `
  varying vec2 vUv;
  
  void main() {
    vUv = uv;
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
  }
`;

export const distortionFragmentShader = /* glsl */ `
  uniform sampler2D uTexture;
  uniform vec2 uMouse;
  uniform vec2 uVelocity;
  uniform float uStrength;
  uniform float uOpacity;
  uniform float uTime;
  
  varying vec2 vUv;
  
  void main() {
    vec2 uv = vUv;
    
    // ─── Glass Refraction Zone ───────────────────────────────
    // Mouse-relative influence (wider radius for glass feel)
    vec2 mouseUV = uMouse;
    float dist = distance(uv, mouseUV);
    float influence = smoothstep(0.6, 0.0, dist);
    
    // Multi-layered liquid warp (refracting glass, not glitch)
    float warp1X = sin(uv.y * 8.0 + uTime * 1.5) * uVelocity.x * 0.005;
    float warp1Y = cos(uv.x * 8.0 + uTime * 1.5) * uVelocity.y * 0.005;
    
    // Second harmonic for organic glass caustic feel
    float warp2X = sin(uv.y * 16.0 + uTime * 3.0) * uVelocity.x * 0.002;
    float warp2Y = cos(uv.x * 16.0 + uTime * 3.0) * uVelocity.y * 0.002;
    
    vec2 liquidWarp = vec2(warp1X + warp2X, warp1Y + warp2Y) * uStrength * influence;
    
    // ─── Jelly Stretch (global, velocity-based) ──────────────
    float velMag = length(uVelocity);
    vec2 stretchOffset = uVelocity * 0.001 * uStrength;
    vec2 jelly = stretchOffset * (0.5 - uv);
    
    vec2 warpedUV = uv + liquidWarp + jelly;
    
    // ─── Subtle RGB Shift (glass prismatic, not digital glitch)
    // Reduced from 0.0015 to 0.0004 for elegance
    float rgbShift = velMag * 0.0004 * uStrength;
    
    float r = texture2D(uTexture, warpedUV + vec2(rgbShift, rgbShift * 0.5)).r;
    float g = texture2D(uTexture, warpedUV).g;
    float b = texture2D(uTexture, warpedUV - vec2(rgbShift, rgbShift * 0.5)).b;
    
    vec4 color = vec4(r, g, b, 1.0);
    
    // Apply opacity
    color.a = uOpacity;
    
    gl_FragColor = color;
  }
`;
