import { useFrame } from "@react-three/fiber";
import { useControls } from "leva";
import { useLayoutEffect, useMemo, useRef } from "react";
import * as THREE from "three";

interface CubeShellProps {
  cubeCount?: number;
  shellRadius?: number;
  position?: [number, number, number];
  baseCubeSize?: number;
  folderName?: string;
  rotationSpeed?: [number, number, number];
}

const CubeShell = ({
  cubeCount = 160,
  shellRadius = 3.2,
  position = [0, 0, 0],
  baseCubeSize = 1.5,
  folderName = "Cube Shell Material",
  rotationSpeed = [0.03, 0.12, 0.02],
}: CubeShellProps) => {
  const meshRef = useRef<THREE.InstancedMesh>(null);

  const materialProps = useControls(folderName, {
    metalness: {
      value: 0,
      min: 0,
      max: 1,
      step: 0.001,
    },
    roughness: {
      value: 0.08,
      min: 0,
      max: 1,
      step: 0.001,
    },
    color: { value: "#243258" },
  });

  const matrices = useMemo(() => {
    const dummy = new THREE.Object3D();
    const result: THREE.Matrix4[] = [];
    const goldenAngle = Math.PI * (3 - Math.sqrt(5));

    for (let i = 0; i < cubeCount; i++) {
      const y = cubeCount > 1 ? 1 - (i / (cubeCount - 1)) * 2 : 0;
      const ringRadius = Math.sqrt(1 - y * y);
      const theta = goldenAngle * i;

      const direction = new THREE.Vector3(
        Math.cos(theta) * ringRadius,
        y,
        Math.sin(theta) * ringRadius,
      );

      const radius = shellRadius + (Math.random() - 0.5) * 0.35;
      dummy.position.copy(direction).multiplyScalar(radius);

      dummy.rotation.set(
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        Math.random() * Math.PI,
      );

      dummy.scale.setScalar(0.12 + Math.random() * 0.22);
      dummy.updateMatrix();
      result.push(dummy.matrix.clone());
    }

    return result;
  }, [cubeCount, shellRadius]);

  useLayoutEffect(() => {
    const mesh = meshRef.current;
    if (!mesh) return;

    matrices.forEach((matrix, index) => {
      mesh.setMatrixAt(index, matrix);
    });

    mesh.instanceMatrix.needsUpdate = true;
  }, [matrices]);

  useFrame((_, delta) => {
    if (!meshRef.current) return;

    meshRef.current.rotation.x += delta * rotationSpeed[0];
    meshRef.current.rotation.y += delta * rotationSpeed[1];
    meshRef.current.rotation.z += delta * rotationSpeed[2];
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[undefined, undefined, cubeCount]}
      position={position}
    >
      <boxGeometry args={[baseCubeSize, baseCubeSize, baseCubeSize]} />
      <meshStandardMaterial
        color={materialProps.color}
        metalness={materialProps.metalness}
        roughness={materialProps.roughness}
      />
    </instancedMesh>
  );
};

export default CubeShell;
