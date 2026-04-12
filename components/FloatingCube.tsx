"use client";

import React, { useRef, useMemo, useState, useEffect } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { RoundedBox, Environment, Lightformer, MeshTransmissionMaterial, PresentationControls } from "@react-three/drei";
import * as THREE from "three";

// Pre-define constants for consistent memory footprint
const ROTATION_SPEED_Y = 0.002; // Increased for more life
const ROTATION_SPEED_X = 0.001;
const FLOAT_FREQ = 1.0; 
const LERP_FACTOR = 0.08;
const COLOR_LERP_FACTOR = 0.05;

const CubeContent = React.memo(() => {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const materialRef = useRef<any>(null);
  
  const isHovered = useRef(false);
  
  const geometryArgs = useMemo(() => [1.3, 1.3, 1.3] as [number, number, number], []);
  const colors = useMemo(() => ({
    base: new THREE.Color("#01a86b"), // Emerald Green
    hover: new THREE.Color("#FFFFFF"),
    current: new THREE.Color("#01a86b"),
    inner: new THREE.Color("#01a86b")
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();

    // Base continuous rotation (auto-rotate)
    if (meshRef.current) {
      meshRef.current.rotation.y += ROTATION_SPEED_Y;
      meshRef.current.rotation.x += ROTATION_SPEED_X;
      
      // Subtle float
      meshRef.current.position.y = Math.sin(time * FLOAT_FREQ) * 0.1;
    }

    if (innerRef.current) {
      innerRef.current.rotation.y -= ROTATION_SPEED_Y * 2;
      innerRef.current.rotation.z += ROTATION_SPEED_X * 3;
      innerRef.current.position.y = Math.sin(time * 2) * 0.05;
    }

    if (materialRef.current) {
      colors.current.lerp(isHovered.current ? colors.hover : colors.base, COLOR_LERP_FACTOR);
      materialRef.current.color.copy(colors.current);
      materialRef.current.thickness = 0.15 + Math.sin(time * 0.5) * 0.1;
    }
  });

  const transmissionProps = useMemo(() => ({
    backside: true,
    samples: 4, 
    resolution: 256,
    thickness: 0.2,
    roughness: 0,
    transmission: 1,
    ior: 1.5,
    chromaticAberration: 0.15,
    anisotropy: 0.1,
    distortion: 0.3,
    distortionScale: 0.5,
    temporalDistortion: 0.1,
    clearcoat: 1,
    attenuationDistance: 0.5,
    attenuationColor: "#ffffff",
  }), []);

  return (
    <group>
      <RoundedBox
        ref={meshRef}
        args={geometryArgs} 
        radius={0.3} 
        smoothness={4} 
        onPointerOver={() => { isHovered.current = true; }}
        onPointerOut={() => { isHovered.current = false; }}
      >
        <MeshTransmissionMaterial
          ref={materialRef}
          {...transmissionProps}
        />
      </RoundedBox>

      <mesh ref={innerRef} scale={0.4}>
        <boxGeometry args={[1, 1, 1]} />
        <meshStandardMaterial 
            color={colors.inner} 
            emissive={colors.hover} 
            emissiveIntensity={2}
            transparent 
            opacity={0.8}
            wireframe
        />
      </mesh>
      
      <mesh rotation={[Math.PI / 2, 0, 0]} scale={2}>
         <ringGeometry args={[0.9, 0.91, 64]} />
         <meshBasicMaterial color="#01a86b" transparent opacity={0.1} />
      </mesh>
    </group>
  );
});

CubeContent.displayName = "CubeContent";

export default function FloatingCube() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="w-full h-full relative overflow-hidden cursor-grab active:cursor-grabbing">
      <Canvas 
        className="w-full h-full" 
        shadows={false}
        dpr={[1, 2]} 
        performance={{ min: 0.5 }}
        camera={{ position: [0, 0, 4.5], fov: 35 }}
        gl={{ 
          antialias: true,
          alpha: true,
          powerPreference: "high-performance",
          stencil: false,
          depth: true,
        }}
      >
        <ambientLight intensity={0.5} />
        <pointLight position={[5, 5, 5]} intensity={2} color="#01a86b" />
        <pointLight position={[-5, -5, -5]} intensity={1} color="#FFFFFF" />
        
        <Environment resolution={256}>
          <group rotation={[-Math.PI / 4, 0, 0]}>
            <Lightformer form="rect" intensity={10} rotation-x={Math.PI / 2} position={[0, 10, -10]} scale={[40, 10, 1]} />
            <Lightformer form="circle" intensity={5} rotation-y={Math.PI / 2} position={[-15, 2, 1]} scale={[20, 20, 1]} />
            <Lightformer form="circle" intensity={5} rotation-y={-Math.PI / 2} position={[15, 2, 1]} scale={[20, 20, 1]} />
            <Lightformer form="rect" intensity={2} rotation-x={Math.PI / 2} position={[0, -10, 0]} scale={[20, 20, 1]} color="#4338ca" />
          </group>
        </Environment>
        
        {/* Elite interaction: Global drag to rotate + elastic snap back */}
        <PresentationControls
          global={true} // Now responds to cursor anywhere on the screen
          config={{ mass: 2, tension: 500 }}
          snap={{ mass: 4, tension: 1500 }}
          rotation={[0, 0, 0]}
          polar={[-Math.PI / 4, Math.PI / 4]} // Restricted slightly for better control
          azimuth={[-Math.PI / 2, Math.PI / 2]} // Wider horizontal rotation
        >
          <CubeContent />
        </PresentationControls>
      </Canvas>
    </div>
  );
}
