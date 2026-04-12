"use client";
import React from "react";
import { motion } from "framer-motion";

export default function WorksTransition() {
    return (
        <section className="relative w-full bg-white overflow-hidden h-[80vh] flex items-center justify-center z-[100]">
            {/* Subtle Grid Background from launchweb.co */}
            <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%2301a86b' fill-opacity='1'/%3E%3C/svg%3E")`,
                        backgroundSize: '40px 40px'
                    }}
                />
                
            <div className="relative z-10 text-[22vw] md:text-[23vw] font-black text-black leading-none select-none whitespace-nowrap flex" style={{ perspective: "2000px" }}>
                {"WORKS".split('').map((char, i) => (
                    <motion.span
                        key={i}
                        initial={{ opacity: 0, y: 100, rotateX: -60, scale: 0.8 }}
                        whileInView={{ opacity: 0.85, y: 0, rotateX: 0, scale: 1 }}
                        viewport={{ once: false, amount: 0.1 }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: i * 0.08 }}
                        className="inline-block transform-gpu"
                        style={{ transformOrigin: "50% 100%" }}
                    >
                        {char}
                    </motion.span>
                ))}
            </div>
        </section>
    );
}
