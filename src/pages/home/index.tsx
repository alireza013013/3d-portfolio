import * as THREE from "three";
import { Canvas } from "@react-three/fiber";

import Experience from "../../components/home/experience/index.tsx";

export default function Home() {
  return (
    <Canvas>
      <Experience />
    </Canvas>
  );
}
