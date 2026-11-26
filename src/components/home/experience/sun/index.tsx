import * as THREE from "three";
import { Billboard } from "@react-three/drei";
import { useControls } from "leva";
import glowVertex from "../../../../shaders/glow/vertex.glsl";
import glowFragment from "../../../../shaders/glow/fragment.glsl";

const Sun = () => {
  const {
    glowTint,
    glowStrength,
    haloRadius,
    haloSoftness,
    haloWeight,
    coreWeight,
    coreFalloff,
  } = useControls(
    "Plane Glow",
    {
      glowTint: { value: "#ff4d00" },
      glowStrength: { value: 5.9, min: 0, max: 400, step: 0.1 },
      haloRadius: { value: 0.03, min: 0, max: 0.5, step: 0.01 },
      haloSoftness: { value: 0.01, min: 0.01, max: 1, step: 0.01 },
      haloWeight: { value: 0.82, min: 0, max: 3, step: 0.01 },
      coreWeight: { value: 6.41, min: 0, max: 50, step: 0.01 },
      coreFalloff: { value: 19, min: 0, max: 100, step: 0.1 },
    },
    { collapsed: true },
  );
  return (
    <>
      <Billboard position={[0, 0, 0]}>
        <mesh>
          <planeGeometry args={[14, 14]} />
          <shaderMaterial
            vertexShader={glowVertex}
            fragmentShader={glowFragment}
            key={`${glowVertex}-${glowFragment}`}
            transparent
            blending={THREE.AdditiveBlending}
            uniforms={{
              uGlowTint: { value: new THREE.Color(glowTint) },
              uGlowStrength: { value: glowStrength },
              uHaloRadius: { value: haloRadius },
              uHaloSoftness: { value: haloSoftness },
              uHaloWeight: { value: haloWeight },
              uCoreWeight: { value: coreWeight },
              uCoreFalloff: { value: coreFalloff },
            }}
          />
        </mesh>
      </Billboard>
    </>
  );
};

export default Sun;
