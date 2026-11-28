import { Html, useCursor } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useRef, useState, type ReactNode } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CubeTag from "../cubeTag";
import "./index.css";

interface InformationCubeProps {
  position?: [number, number, number];
  size?: number;
  content: ReactNode;
  showPositionCube: [number, number, number];
}

const InformationCube = ({
  position = [5, 4, 6],
  size = 2.2,
  content,
  showPositionCube,
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
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  const meshRef = useRef<THREE.Mesh>(null);
  const [isShowInformation, setIsShowInformation] = useState(false);

  const { contextSafe } = useGSAP();

  const getShortestTarget = (current: number) => {
    const twoPi = Math.PI * 2;
    return Math.round(current / twoPi) * twoPi;
  };

  const showInformation = contextSafe(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    gsap.killTweensOf(mesh.position);
    gsap.killTweensOf(mesh.rotation);

    if (!isShowInformation) {
      gsap.to(mesh.position, {
        x: showPositionCube[0],
        y: showPositionCube[1],
        z: showPositionCube[2],
        duration: 0.5,
        ease: "power3.inOut",
      });

      gsap.to(mesh.rotation, {
        x: getShortestTarget(mesh.rotation.x),
        y: getShortestTarget(mesh.rotation.y),
        z: getShortestTarget(mesh.rotation.z),
        duration: 1.2,
        ease: "power3.out",
      });
    } else {
      gsap.to(mesh.position, {
        x: position[0],
        y: position[1],
        z: position[2],
        duration: 0.5,
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
    <mesh
      ref={meshRef}
      position={position}
      onClick={showInformation}
      onPointerOver={(e) => {
        e.stopPropagation();
        setHovered(true);
      }}
      onPointerOut={() => setHovered(false)}
    >
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
        <CubeTag
          name="Explore"
          isOpen={isShowInformation}
          onClick={showInformation}
        />
      </Html>

      {isShowInformation && (
        <Html
          position={[0, 0, size / 2 + 0.01]}
          center
          distanceFactor={6}
          zIndexRange={[99, 0]}
        >
          {content}
        </Html>
      )}
    </mesh>
  );
};

export default InformationCube;
