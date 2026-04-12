"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function TrustStrip() {
  const logos = [
    { name: "Notion", icon: "⎵" },
    { name: "Stripe", icon: "≋" },
    { name: "Linear", icon: "⌄" },
    { name: "Vercel", icon: "▲" },
    { name: "Figma", icon: "🜎" },
    { name: "Loom", icon: "⎊" }
  ];

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
     gsap.from(".trust-item", {
        opacity: 0,
        y: 20,
        duration: 1.5,
        stagger: 0.1,
        ease: "expo.out",
        scrollTrigger: {
            trigger: containerRef.current,
            start: "top 90%"
        }
     });
  }, []);

  return (
    <section ref={containerRef} className="border-y border-black/[0.04] py-20 md:py-24 overflow-hidden">
      <div className="section-container !py-0 flex flex-col lg:flex-row items-center justify-between gap-16">
        <p className="text-[10px] uppercase tracking-[0.4em] font-extrabold text-gray-400">TRUSTED BY GLOBAL LEADERS</p>
        <div className="grid grid-cols-3 md:grid-cols-6 items-center justify-center gap-16 lg:gap-32 grayscale opacity-30 hover:grayscale-0 hover:opacity-100 transition-all duration-1000">
           {logos.map((logo, i) => (
             <div key={i} className="trust-item flex flex-col items-center gap-4 group cursor-pointer">
               <span className="text-4xl font-display font-bold group-hover:scale-110 group-hover:text-primary transition-all duration-700">{logo.icon}</span>
               <span className="text-[10px] font-extrabold uppercase tracking-[0.2em]">{logo.name}</span>
             </div>
           ))}
        </div>
      </div>
    </section>
  );
}
