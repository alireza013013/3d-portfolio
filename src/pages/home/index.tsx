import { Canvas } from "@react-three/fiber";

import Experience from "../../components/home/experience/index.tsx";

export default function Home() {
  return (
    <Canvas camera={{ position: [0, 0, 20] }}>
      <Experience />
    </Canvas>
  );
}
