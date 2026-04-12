"use client";
import React from "react";
import { motion } from "framer-motion";

const testimonials = [
  "“They quickly understood what we were trying to build and delivered a solution that felt clean, thoughtful, and exactly aligned with our needs.”",
  "“The entire process was smooth and well-managed, and the final product feels reliable, fast, and easy to use.”",
  "“What stood out was their attention to detail — everything was carefully done and nothing felt rushed or overlooked.”",
  "“They were easy to communicate with, very responsive, and delivered everything on time without unnecessary delays.”",
  "“They didn’t just execute the project, but also helped refine the idea and improve it along the way.”",
  "“From start to finish, the experience was straightforward and professional, with clear communication at every stage.”",
  "“The final result exceeded our expectations in terms of both design and performance — everything feels polished.”",
  "“They took the time to understand our goals and translated them into a product that actually works well in real use.”",
  "“Very reliable team — they delivered what was promised and ensured everything was working perfectly before completion.”",
  "“The balance between design and functionality was handled really well, making the overall experience feel seamless.”",
];

// Double the array for seamless looping
const doubledTestimonials = [...testimonials, ...testimonials];

export default function Testimonials() {
  return (
    <section id="testimonials" className="w-full py-16 pb-24 overflow-hidden relative">
      <div className="section-container !py-0 mb-10">
        <div className="flex items-center gap-3 mb-4">
          <div className="w-8 h-[1px] bg-[#01a86b]" />
          <span className="font-mono text-[9px] uppercase font-bold tracking-[0.4rem] text-[#01a86b]">Feedback.data</span>
        </div>
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-black uppercase antialiased">
          Trusted by builders.
        </h2>
      </div>

      <div className="relative flex whitespace-nowrap overflow-hidden pt-6 pb-6 mt-4">
        <motion.div 
          className="flex gap-6 pr-6"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            duration: 25, 
            repeat: Infinity, 
            ease: "linear",
            repeatType: "loop"
          }}
        >
          {doubledTestimonials.map((text, idx) => (
            <div 
              key={idx} 
              className="flex-shrink-0 bg-white/40 backdrop-blur-xl border border-[#01a86b]/20 px-10 py-8 rounded-2xl w-[420px] group transition-all duration-700 hover:border-[#01a86b] hover:shadow-[0_20px_60px_-15px_rgba(1,168,107,0.15)] hover:translate-y-[-4px]"
            >
              <p className="text-gray-700 text-[14px] leading-relaxed font-medium tracking-tight whitespace-normal antialiased">
                {text}
              </p>
              <div className="mt-6 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                <div className="flex gap-1.5">
                  {[1, 2, 3].map((s) => (
                    <div key={s} className="w-1 h-1 rounded-full bg-[#01a86b]/20 group-hover:bg-[#01a86b] transition-colors" />
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#01a86b] animate-pulse" />
                  <span className="font-mono text-[7px] font-bold text-[#01a86b] uppercase tracking-widest">LIVE_FEED</span>
                </div>
              </div>
            </div>
          ))}
        </motion.div>
      </div>
      
      {/* Edge Gradients */}
      <div className="absolute top-0 bottom-0 left-0 w-40 bg-gradient-to-r from-bg to-transparent z-10 pointer-events-none" />
      <div className="absolute top-0 bottom-0 right-0 w-40 bg-gradient-to-l from-bg to-transparent z-10 pointer-events-none" />
    </section>
  );
}
