uniform vec3 uGlowTint;
uniform float uGlowStrength;
uniform float uHaloRadius;
uniform float uHaloSoftness;
uniform float uHaloWeight;
uniform float uCoreWeight;
uniform float uCoreFalloff;

varying vec2 vUv;

void main() {
    vec2 centeredUv = vUv - 0.5;
    float distanceFromCenter = length(centeredUv);

    float halo = 1.0 - smoothstep(
        uHaloRadius,
        uHaloRadius + uHaloSoftness,
        distanceFromCenter
    );

    float core = exp(-distanceFromCenter * distanceFromCenter * uCoreFalloff);
    float glowAmount = halo * uHaloWeight + core * uCoreWeight;
    vec3 color = uGlowTint * glowAmount * uGlowStrength;
    float alpha = clamp(glowAmount, 0.0, 1.0);

    gl_FragColor = vec4(color, alpha);

    #include <colorspace_fragment>
}