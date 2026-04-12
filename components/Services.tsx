"use client";
import React, { useRef, useState, useMemo } from "react";
import { motion } from "framer-motion";
import { Canvas, useFrame } from "@react-three/fiber";
import { 
  Float, 
  MeshDistortMaterial, 
  MeshWobbleMaterial, 
  PresentationControls,
  Text,
  Html
} from "@react-three/drei";
import * as THREE from 'three';

const serviceData = [
  {
    id: "web",
    title: "Web Development",
    tag: "High Performance",
    color: "#01a86b",
    bullets: [
      "Create fast and responsive websites",
      "Works smoothly on mobile, tablet & desktop",
      "Clean design and easy to use",
      "Built for long-term performance",
    ],
    geometry: "torus"
  },
  {
    id: "mobile",
    title: "Mobile Applications",
    tag: "Multi-Platform",
    color: "#01a86b",
    bullets: [
      "Apps for Android & iOS",
      "Smooth and user-friendly design",
      "Strong performance and reliability",
      "Can grow with business needs",
    ],
    geometry: "box"
  },
  {
    id: "custom",
    title: "Custom Web Applications",
    tag: "Tailored Systems",
    color: "#01a86b",
    bullets: [
      "Websites or systems made as per requirement",
      "Can include special features & integrations",
      "Secure and scalable structure",
      "Useful for business operations",
    ],
    geometry: "knot"
  },
  {
    id: "launch",
    title: "End to End Launch Support",
    tag: "Full Deployment",
    color: "#01a86b",
    bullets: [
      "Help in launching website or app",
      "Setup hosting and app store publishing",
      "Monitor performance after launch",
      "Ensure everything runs smoothly",
    ],
    geometry: "sphere"
  },
];

function Model({ type, color, hovered }: { type: string, color: string, hovered: boolean }) {
  const mesh = useRef<THREE.Mesh>(null);
  
  useFrame((state) => {
    if (mesh.current) {
        mesh.current.rotation.x += 0.008;
        mesh.current.rotation.y += 0.012;
        if (hovered) {
            mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, 1.3, 0.1));
        } else {
            mesh.current.scale.setScalar(THREE.MathUtils.lerp(mesh.current.scale.x, 1, 0.1));
        }
    }
  });

  return (
    <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={mesh}>
            {type === "torus" && <torusKnotGeometry args={[1.2, 0.4, 128, 32]} />}
            {type === "box" && <boxGeometry args={[1.8, 1.8, 1.8]} />}
            {type === "knot" && <octahedronGeometry args={[1.8, 0]} />}
            {type === "sphere" && <sphereGeometry args={[1.5, 64, 64]} />}
            
            {/* Clear Premium Glass-like Material to REMOVE BLACK BLOBS */}
            <meshPhysicalMaterial
                color={hovered ? "#01a86b" : "#ffffff"}
                transmission={0.9} 
                thickness={2}
                roughness={0.05}
                metalness={0.1}
                envMapIntensity={1.5}
                clearcoat={1}
                clearcoatRoughness={0}
                opacity={0.6}
                transparent={true}
            />
        </mesh>
    </Float>
  );
}

function ServiceCard({ item, index }: { item: typeof serviceData[0]; index: number }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ duration: 0.8, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      className="group relative h-[600px] w-full cursor-pointer"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* 3D Canvas in background */}
      <div className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none">
        {hovered && (
          <Canvas camera={{ position: [0, 0, 5], fov: 45 }} dpr={[1, 1.5]}>
            <ambientLight intensity={0.5} />
            <spotLight position={[10, 10, 10]} intensity={1} />
            <pointLight position={[-10, -10, -10]} intensity={0.5} />
            <PresentationControls
              global
              config={{ mass: 2, tension: 500 }}
              snap={{ mass: 4, tension: 1500 }}
              rotation={[0, 0.3, 0]}
              polar={[-Math.PI / 3, Math.PI / 3]}
              azimuth={[-Math.PI / 1.4, Math.PI / 1.4]}
            >
              <Model type={item.geometry} color={item.color} hovered={hovered} />
            </PresentationControls>
          </Canvas>
        )}
      </div>

      {/* Glassy Content Card */}
      <div className="relative z-10 h-full flex flex-col p-6 md:p-8 rounded-[40px] border border-black/5 bg-white/20 backdrop-blur-3xl overflow-hidden transition-all duration-700 group-hover:bg-white/60 group-hover:border-[#01a86b]/30 shadow-sm">

        {/* Glow corner */}
        <div className="absolute -top-10 -right-10 w-48 h-48 bg-[#01a86b]/10 blur-3xl rounded-full group-hover:w-64 group-hover:h-64 transition-all duration-1000" />
        
        <div className="relative flex flex-col h-full">
          <span className="inline-flex self-start px-4 py-1.5 rounded-full text-[10px] font-black tracking-[0.22em] uppercase bg-black/[0.05] text-black/40 mb-6 group-hover:bg-[#01a86b]/15 group-hover:text-[#01a86b] transition-all duration-500">
            {item.tag}
          </span>

          <h3 className="text-3xl md:text-4xl font-black text-black tracking-[-0.07em] uppercase leading-[0.8] italic mb-6">
            {item.title}
          </h3>

          <div className="w-16 h-[3px] bg-black/5 mb-8 group-hover:bg-[#01a86b] group-hover:w-24 transition-all duration-700" />

          {/* Bullet Points - INCREASED SIZE */}
          <ul className="flex flex-col gap-6">
            {item.bullets.map((b, idx) => (
              <li key={idx} className="flex items-start gap-5 text-[15px] md:text-[16px] text-[#111] leading-[1.3] font-bold antialiased">
                <span className="mt-[7px] flex-shrink-0 w-[7px] h-[7px] rounded-full bg-[#01a86b] shadow-[0_0_15px_rgba(1,168,107,0.6)] transition-transform group-hover:scale-125" />
                {b}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default function Services() {
  return (
    <section id="services" className="relative overflow-hidden py-32">
      <div className="relative z-10 px-4 md:px-10 mx-auto max-w-[1550px]">
        {/* Header */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 mb-24 items-end">
          <div>
            <span className="section-tag mb-4 inline-block" style={{ color: "#6366F1" }}>
              Next-Gen Services
            </span>
            <h2 className="text-6xl md:text-[90px] font-extrabold text-[#111] leading-[0.8] tracking-[-0.05em] uppercase italic">
              Services <br /> in space<span className="text-[#01a86b]">.</span>
            </h2>
          </div>
          <div className="max-w-xl pb-4 border-l border-black/5 pl-8">
            <p className="text-lg md:text-xl font-medium text-gray-500 leading-snug mb-8 antialiased">
              We leverage modern engineering and creative design to build products that scale beautifully across every platform.
            </p>
            <div className="flex items-center gap-6">
              <div className="h-[1px] w-16 bg-gray-200" />
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">
                Design / Build / Launch
              </span>
            </div>
          </div>
        </div>

        {/* Dynamic 3D Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {serviceData.map((item, i) => (
            <ServiceCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Ambient Gradient Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] bg-gradient-to-br from-[#01a86b]/5 via-transparent to-[#6366F1]/5 rounded-full blur-[160px] pointer-events-none -z-10" />
    </section>
  );
}
