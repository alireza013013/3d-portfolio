import * as THREE from "three";
import { useControls } from "leva";
import { useRef } from "react";

const Lighting = () => {
  const {
    positionXDirectionalLight,
    positionYDirectionalLight,
    positionZDirectionalLight,
    intensity,
    colorDirectionalLight,
  } = useControls(
    "Directional Yellow Lights",
    {
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
    },
    { collapsed: true },
  );
  const lightRef = useRef<THREE.InstancedMesh>(null);
  // useHelper(lightRef, THREE.DirectionalLightHelper, 1.5, "#ffaa00");

  const { intensityAmbientLight, colorAmbientLight } = useControls(
    "Ambient Lights",
    {
      intensityAmbientLight: { value: 0, min: 0, max: 100, step: 0.1 },
      colorAmbientLight: { value: "#ffffff" },
    },
    { collapsed: true },
  );

  const {
    positionXBlueDirectionalLight,
    positionYBlueDirectionalLight,
    positionZBlueDirectionalLight,
    intensityBlue,
    colorBlueDirectionalLight,
  } = useControls(
    "Directional Blue Lights",
    {
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
    },
    { collapsed: true },
  );
  const lightBlueRef = useRef<THREE.InstancedMesh>(null);
  // useHelper(lightBlueRef, THREE.DirectionalLightHelper, 1.5, "#00c3ff");

  return (
    <>
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
    </>
  );
};

export default Lighting;
