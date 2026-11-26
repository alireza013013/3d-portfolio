import { Html } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import "./index.css";

interface InformationCubeProps {
  position?: [number, number, number];
  size?: number;
  content: ReactNode;
}

const InformationCube = ({
  position = [5, 4, 6],
  size = 2.2,
  content,
}: InformationCubeProps) => {
  const materialProps = useControls("information cube", {
    metalness: {
      value: 0.24,
      min: 0,
      max: 1,
      step: 0.001,
    },
    roughness: {
      value: 0.43,
      min: 0,
      max: 1,
      step: 0.001,
    },
    color: { value: "#000000" },
  });

  const meshRef = useRef<THREE.Mesh>(null);
  const [isShowInformation, setIsShowInformation] = useState(false);
  const showPositionCube = [0, 0, 17];

  const { contextSafe } = useGSAP();

  const showInformation = contextSafe(() => {
    if (!meshRef.current) return;

    if (isShowInformation) {
      gsap.to(meshRef.current.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 0.5,
        ease: "power3.inOut",
      });
    } else {
      gsap.to(meshRef.current.position, {
        x: showPositionCube[0],
        y: showPositionCube[1],
        z: showPositionCube[2],
        duration: 0.5,
        ease: "power3.inOut",
      });
      gsap.to(meshRef.current.rotation, {
        x: 0,
        y: 0,
        z: 0,
        duration: 2,
        ease: "power3.inOut",
      });
    }
    setIsShowInformation(!isShowInformation);
  });

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    if (!isShowInformation) {
      meshRef.current.rotation.x += delta * 0.1;
      meshRef.current.rotation.y += delta * 0.2;
      meshRef.current.rotation.z += delta * 0.4;
    }
  });

  return (
    <mesh ref={meshRef} position={position} onClick={showInformation}>
      <boxGeometry args={[size, size, size]} />
      <meshStandardMaterial
        color={materialProps.color}
        metalness={materialProps.metalness}
        roughness={materialProps.roughness}
      />

      <Html
        position={[0, size / 2 + 0.8, 0]}
        center
        distanceFactor={18}
        zIndexRange={[100, 0]}
      >
        <button
          className="information-cube-tag"
          onClick={showInformation}
          type="button"
          aria-label="Explore cube"
        >
          <span className="information-cube-tag__dot" aria-hidden="true" />
          <span>{isShowInformation ? "Back" : "Explore"}</span>
          <span className="information-cube-tag__arrow" aria-hidden="true">
            ↗
          </span>
        </button>
      </Html>

      {isShowInformation && (
        <Html
          position={[0, 0, size / 2 + 0.01]}
          center
          distanceFactor={4}
          zIndexRange={[99, 0]}
          transform
        >
          {content}
        </Html>
      )}
    </mesh>
  );
};

export default InformationCube;
