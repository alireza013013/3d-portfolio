import * as THREE from "three";
import { OrbitControls, Billboard } from "@react-three/drei";
import { useControls } from "leva";

import glowVertex from "../../../shaders/glow/vertex.glsl";
import glowFragment from "../../../shaders/glow/fragment.glsl";

const Experience = () => {
  const {
    glowTint,
    glowStrength,
    haloRadius,
    haloSoftness,
    haloWeight,
    coreWeight,
    coreFalloff,
  } = useControls("Plane Glow", {
    glowTint: {
      value: "#ff7300",
    },
    glowStrength: {
      value: 4.8,
      min: 0,
      max: 20,
      step: 0.1,
    },
    haloRadius: {
      value: 0.07,
      min: 0,
      max: 0.5,
      step: 0.01,
    },
    haloSoftness: {
      value: 0.53,
      min: 0.01,
      max: 1,
      step: 0.01,
    },
    haloWeight: {
      value: 1.34,
      min: 0,
      max: 3,
      step: 0.01,
    },
    coreWeight: {
      value: 0.96,
      min: 0,
      max: 5,
      step: 0.01,
    },
    coreFalloff: {
      value: 27,
      min: 0,
      max: 100,
      step: 0.1,
    },
  });

  return (
    <>
      <OrbitControls />

      <color args={["#000000"]} attach="background" />

      <Billboard position={[0, 0, -24]}>
        <mesh>
          <planeGeometry args={[14, 14]} />

          <shaderMaterial
            vertexShader={glowVertex}
            fragmentShader={glowFragment}
            key={`${glowVertex}-${glowFragment}`}
            transparent
            blending={THREE.AdditiveBlending}
            uniforms={{
              uGlowTint: {
                value: new THREE.Color(glowTint),
              },
              uGlowStrength: {
                value: glowStrength,
              },
              uHaloRadius: {
                value: haloRadius,
              },
              uHaloSoftness: {
                value: haloSoftness,
              },
              uHaloWeight: {
                value: haloWeight,
              },
              uCoreWeight: {
                value: coreWeight,
              },
              uCoreFalloff: {
                value: coreFalloff,
              },
            }}
          />
        </mesh>
      </Billboard>
    </>
  );
};

export default Experience;
