"use client";
import React from "react";
import { motion } from "framer-motion";

export default function DecorativeWorks() {
  const letters = "WORKS".split("");

  return (
    <div className="relative w-full bg-white py-32 overflow-hidden flex items-center justify-center">
      {/* Container for the 3D text effect */}
      <div 
        className="pointer-events-none text-[22vw] md:text-[20vw] font-black text-black leading-none select-none whitespace-nowrap flex" 
        style={{ perspective: "1000px" }}
      >
        {letters.map((char, i) => (
          <motion.span
            key={i}
            initial={{ opacity: 0, y: 150, rotateX: -80, scale: 0.8, filter: "blur(20px)" }}
            whileInView={{ opacity: 0.2, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
            viewport={{ once: false, margin: "0px 0px -10% 0px" }}
            transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
            className="inline-block transform-gpu"
            style={{ transformOrigin: "50% 100%" }}
          >
            {char}
          </motion.span>
        ))}
      </div>
    </div>
  );
}







