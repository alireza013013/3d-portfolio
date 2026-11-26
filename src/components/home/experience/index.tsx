import { OrbitControls } from "@react-three/drei";
import { useControls } from "leva";
import { Perf } from "r3f-perf";

// import { EffectComposer, Bloom, Vignette } from "@react-three/postprocessing";
import Sun from "./sun";
import Lighting from "./lighting";
import CubeShell from "./cubeShell/index";
import InformationCube from "./InformationCube";
import Explore from "./explore";

const Experience = () => {
  const { backgroundColor } = useControls(
    "Environment",
    {
      backgroundColor: { value: "#17212a" },
    },
    { collapsed: true },
  );

  return (
    <>
      <Perf position="top-left" />
      <OrbitControls enableZoom />
      {/* <axesHelper args={[5]} /> */}

      <color args={[backgroundColor]} attach="background" />

      {/* <EffectComposer>
        <Bloom
          intensity={1.2}
          luminanceThreshold={0.8}
          luminanceSmoothing={0.3}
          mipmapBlur
        />
        <Vignette eskil={false} offset={0.25} darkness={0.85} />
      </EffectComposer> */}
      <Lighting />

      <Sun />

      <InformationCube content={<Explore />} />

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
