import * as THREE from "three";
import { OrbitControls, Billboard } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

import glowVertex from "../../../shaders/glow/vertex.glsl";
import glowFragment from "../../../shaders/glow/fragment.glsl";
import CubeShell from "./cubeShell/index";
import { useRef } from "react";

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
    glowTint: { value: "#ff4d00" },
    glowStrength: { value: 5.9, min: 0, max: 400, step: 0.1 },
    haloRadius: { value: 0.03, min: 0, max: 0.5, step: 0.01 },
    haloSoftness: { value: 0.01, min: 0.01, max: 1, step: 0.01 },
    haloWeight: { value: 0.82, min: 0, max: 3, step: 0.01 },
    coreWeight: { value: 6.41, min: 0, max: 50, step: 0.01 },
    coreFalloff: { value: 19, min: 0, max: 100, step: 0.1 },
  });

  const { backgroundColor } = useControls("Environment", {
    backgroundColor: { value: "#17212a" },
  });

  const {
    positionXDirectionalLight,
    positionYDirectionalLight,
    positionZDirectionalLight,
    intensity,
    colorDirectionalLight,
  } = useControls("Directional Yellow Lights", {
    positionXDirectionalLight: {
      value: 0,
      min: -40,
      max: 40,
      step: 1,
    },
    positionYDirectionalLight: {
      value: 9,
      min: -40,
      max: 40,
      step: 1,
    },
    positionZDirectionalLight: {
      value: -7,
      min: -40,
      max: 40,
      step: 1,
    },
    intensity: { value: 100, min: 0, max: 100, step: 0.1 },
    colorDirectionalLight: { value: "#ffa300" },
  });
  const lightRef = useRef<THREE.InstancedMesh>(null);
  // useHelper(lightRef, THREE.DirectionalLightHelper, 1.5, "#ffaa00");

  const { intensityAmbientLight, colorAmbientLight } = useControls(
    "Ambient Lights",
    {
      intensityAmbientLight: { value: 0, min: 0, max: 100, step: 0.1 },
      colorAmbientLight: { value: "#ffffff" },
    },
  );

  const {
    positionXBlueDirectionalLight,
    positionYBlueDirectionalLight,
    positionZBlueDirectionalLight,
    intensityBlue,
    colorBlueDirectionalLight,
  } = useControls("Directional Blue Lights", {
    positionXBlueDirectionalLight: {
      value: 0,
      min: -40,
      max: 40,
      step: 1,
    },
    positionYBlueDirectionalLight: {
      value: 0,
      min: -40,
      max: 40,
      step: 1,
    },
    positionZBlueDirectionalLight: {
      value: 10,
      min: -40,
      max: 40,
      step: 1,
    },
    intensityBlue: { value: 6, min: 0, max: 100, step: 0.1 },
    colorBlueDirectionalLight: { value: "#ffffff" },
  });
  const lightBlueRef = useRef<THREE.InstancedMesh>(null);
  // useHelper(lightBlueRef, THREE.DirectionalLightHelper, 1.5, "#00c3ff");

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls enableZoom />
      <axesHelper args={[5]} />

      <color args={[backgroundColor]} attach="background" />

      <ambientLight
        intensity={intensityAmbientLight}
        color={colorAmbientLight}
      />
      <directionalLight
        ref={lightRef}
        position={[
          positionXDirectionalLight,
          positionYDirectionalLight,
          positionZDirectionalLight,
        ]}
        intensity={intensity}
        color={colorDirectionalLight}
      />
      <directionalLight
        ref={lightBlueRef}
        position={[
          positionXBlueDirectionalLight,
          positionYBlueDirectionalLight,
          positionZBlueDirectionalLight,
        ]}
        intensity={intensityBlue}
        color={colorBlueDirectionalLight}
      />

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

      <CubeShell
        cubeCount={220}
        shellRadius={4.2}
        position={[0, 0, 0]}
        baseCubeSize={1.8}
        rotationSpeed={[0.02, 0.14, 0.01]}
        folderName="Inner Shell"
      />

      <CubeShell
        cubeCount={140}
        shellRadius={6.2}
        position={[0, 0, 0]}
        baseCubeSize={2.2}
        rotationSpeed={[-0.015, -0.07, 0.02]}
        folderName="Middle Shell"
      />

      <CubeShell
        cubeCount={70}
        shellRadius={8.5}
        position={[0, 0, 0]}
        baseCubeSize={3.0}
        rotationSpeed={[0.01, 0.03, -0.015]}
        folderName="Outer Shell"
      />

      <CubeShell
        cubeCount={30}
        shellRadius={16}
        position={[0, 0, 0]}
        baseCubeSize={4.0}
        rotationSpeed={[0.002, 0.006, -0.003]}
        folderName="Outer Shell 1"
      />
    </>
  );
};

export default Experience;
