import { Html, useCursor } from "@react-three/drei";
import { useControls } from "leva";
import { useCallback, useRef, useState } from "react";
import * as THREE from "three";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import CompanyCard, { type Company } from "../companyCard/index";
import CubeTag from "../cubeTag";
import "./index.css";

import nitc from "../../../../assets/nitc.jpg";
import payesh from "../../../../assets/payesh.jpg";
import gamatrain from "../../../../assets/gamatrain.png";
import karlancer from "../../../../assets/karlancer.png";
import ponisha from "../../../../assets/ponisha.svg";
import { useFrame } from "@react-three/fiber";

interface CompanyCubeProps {
  position?: [number, number, number];
  size?: number;
  startIndex?: number;
  showPositionCube: [number, number, number];
}

interface FaceTransform {
  position: [number, number, number];
  rotation: [number, number, number];
}

const companies: Company[] = [
  {
    id: "gama",
    image: gamatrain,
    alt: "GAMATRAIN LOGO",
    date: "Apr 2025 - Present",
    position: "Frontend & Three.js Developer",
    desc: "Contributed to migrating a production project from Nuxt 2 to Nuxt 4, improving maintainability, scalability, and compatibility with the modern Nuxt ecosystem.",
    link: "https://gamatrain.com/",
  },
  {
    id: "freelancer",
    image: ponisha,
    secondImage: karlancer,
    alt: "Freelancer Company LOGO",
    date: "Aug 2024 - Apr 2025",
    position: "Frontend Developer(Freelancer)",
    desc: "Developed freelance web projects, building interactive applications, responsive interfaces, and custom solutions across different industries using React and Vue.js.",
    link: "https://ponisha.ir/profile/alireza013013",
    linkSecond: "https://karlancer.com/profile/703078",
  },
  {
    id: "payesh",
    image: payesh,
    alt: "PAYESH LOGO",
    date: "Sept 2022 - May 2024",
    position: "Full Stack Developer Payesh Ghodrat",
    desc: "Development of a project to manage mechanical sensors including admin panel and user panel, and a SPA compatible with 100% device sizes.",
    link: "https://www.samaneh-payesh.com/",
  },
  {
    id: "nitc",
    image: nitc,
    alt: "NITC LOGO",
    date: "Oct 2020 - Sep 2023",
    position: "Frontend Developer NITC",
    desc: "Collaborated with design, product, and back-end teams to create 10+ international fully responsive super web-application products with different panels.",
    link: "https://topwebdesign.net/en",
  },
];

const CompanyCube = ({
  position = [0, 0, 0],
  size = 2.2,
  startIndex = 0,
  showPositionCube,
}: CompanyCubeProps) => {
  const materialProps = useControls("Company cube", {
    metalness: { value: 0.24, min: 0, max: 1, step: 0.001 },
    roughness: { value: 0.43, min: 0, max: 1, step: 0.001 },
    color: { value: "#000000" },
  });
  const [hovered, setHovered] = useState(false);

  useCursor(hovered);

  const rootRef = useRef<THREE.Group>(null);
  const rotationGroupRef = useRef<THREE.Group>(null);

  const initialIndex = Math.min(
    Math.max(Math.trunc(startIndex), 0),
    companies.length - 1,
  );

  const [activeIndex, setActiveIndex] = useState(initialIndex);
  const [isOpen, setIsOpen] = useState(false);
  const isOpenRef = useRef(false);
  const isChangingRef = useRef(false);
  const [isCardEntered, setIsCardEntered] = useState(false);
  const navRef = useRef<HTMLDivElement>(null);

  const handleCardEnterComplete = useCallback(() => {
    setIsCardEntered(true);
  }, []);

  const { contextSafe } = useGSAP();

  const changeCompany = contextSafe((direction: -1 | 1) => {
    const rotationGroup = rotationGroupRef.current;

    if (!rotationGroup || companies.length < 2 || isChangingRef.current) {
      return;
    }

    isChangingRef.current = true;

    const nextIndex =
      (activeIndex + direction + companies.length) % companies.length;

    gsap.to(rotationGroup.rotation, {
      y: rotationGroup.rotation.y - direction * (Math.PI / 2),
      duration: 0.65,
      ease: "power2.inOut",
      onComplete: () => {
        setActiveIndex(nextIndex);
        isChangingRef.current = false;
      },
    });
  });

  const getShortestTarget = (current: number) => {
    const twoPi = Math.PI * 2;
    return Math.round(current / twoPi) * twoPi;
  };

  const toggleCube = contextSafe(() => {
    const mesh = rootRef.current;
    if (!mesh) return;

    const nextIsOpen = !isOpenRef.current;
    isOpenRef.current = nextIsOpen;
    gsap.killTweensOf(mesh.position);
    gsap.killTweensOf(mesh.rotation);

    if (!isOpen) {
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

    setIsCardEntered(false);
    setIsOpen(!isOpen);
  });

  const halfSize = size / 2 + 0.015;

  const faces: FaceTransform[] = [
    {
      position: [0, 0, halfSize],
      rotation: [0, 0, 0],
    },
    {
      position: [halfSize, 0, 0],
      rotation: [0, Math.PI / 2, 0],
    },
    {
      position: [0, 0, -halfSize],
      rotation: [0, Math.PI, 0],
    },
    {
      position: [-halfSize, 0, 0],
      rotation: [0, -Math.PI / 2, 0],
    },
  ];

  useGSAP(
    () => {
      if (!isOpen || !isCardEntered || !navRef.current) return;

      gsap.fromTo(
        navRef.current,
        { autoAlpha: 0, y: -15 },
        {
          autoAlpha: 1,
          y: 0,
          duration: 0.45,
          ease: "power3.out",
        },
      );
    },
    {
      dependencies: [isOpen, isCardEntered],
      revertOnUpdate: true,
    },
  );

  useFrame((_, delta) => {
    if (!rootRef.current) return;

    if (!isOpen) {
      rootRef.current.rotation.x += delta * 0.2;
      rootRef.current.rotation.y += delta * 0.1;
      rootRef.current.rotation.z += delta * 0.1;
    }
  });

  return (
    <group ref={rootRef} position={position}>
      <group
        ref={rotationGroupRef}
        rotation={[0, -initialIndex * (Math.PI / 2), 0]}
      >
        <mesh
          onPointerOver={(e) => {
            e.stopPropagation();
            setHovered(true);
          }}
          onPointerOut={() => setHovered(false)}
          onClick={toggleCube}
        >
          <boxGeometry args={[size, size, size]} />
          <meshStandardMaterial
            color={materialProps.color}
            metalness={materialProps.metalness}
            roughness={materialProps.roughness}
          />
        </mesh>

        {isOpen &&
          (() => {
            const company = companies[activeIndex];
            const face = faces[activeIndex];
            if (!company || !face) return null;

            return (
              <Html
                key={company.id}
                position={face.position}
                rotation={face.rotation}
                center
                zIndexRange={[99, 0]}
                occlude
              >
                <CompanyCard
                  company={company}
                  onEnterComplete={handleCardEnterComplete}
                />
              </Html>
            );
          })()}
      </group>

      <Html
        position={[0, size / 2 + 0.8, 0]}
        center
        distanceFactor={18}
        zIndexRange={[100, 0]}
      >
        <CubeTag name="Experience" isOpen={isOpen} onClick={toggleCube} />
      </Html>

      {isOpen && (
        <Html
          position={[0, -size / 2 - 0.15, 0]}
          center
          distanceFactor={6}
          zIndexRange={[100, 0]}
        >
          <div
            ref={navRef}
            className="company-nav"
            onClick={(event) => event.stopPropagation()}
            aria-label="Company navigation"
          >
            <button
              className="company-nav__button"
              type="button"
              onClick={() => changeCompany(-1)}
              aria-label="Previous company"
            >
              <span aria-hidden="true">←</span>
            </button>

            <span className="company-nav__count" aria-live="polite">
              <span>{String(activeIndex + 1).padStart(2, "0")}</span>
              <span className="company-nav__separator">/</span>
              <span>{String(companies.length).padStart(2, "0")}</span>
            </span>

            <button
              className="company-nav__button"
              type="button"
              onClick={() => changeCompany(1)}
              aria-label="Next company"
            >
              <span aria-hidden="true">→</span>
            </button>
          </div>
        </Html>
      )}
    </group>
  );
};

export default CompanyCube;
