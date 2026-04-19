"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const moments = [
  { 
    item: "Web3 Mumbai × Avalanche Hackathon", 
    leftImage: "/images/aavani_hackathon.png",
    rightImage: "/images/aavani_interview.png" 
  },
  { 
    item: "Mumbai Hacks", 
    leftImage: "/images/mh_solo.png",
    rightImage: "/images/mh-raghu-new.png" 
  },
  { 
    item: "Mumbai Tech Week", 
    leftImage: "/images/mtw-rr-new.png",
    rightImage: "/images/mtw-sabkesath-new.png" 
  }
];

export default function Achievements() {
  const container = useRef<HTMLDivElement>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const revealRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      
      // Sync reveal position
      if (revealRef.current) {
        gsap.to(revealRef.current, {
          x: e.clientX - 250,
          y: e.clientY - 175,
          duration: 0.8,
          ease: "power3.out",
          overwrite: true
        });
      }

      // Check for dual images during movement IF we are hovering over the first item
      const hovItem = document.elementFromPoint(e.clientX, e.clientY)?.closest('.archive-item') as HTMLElement | null;
      if (hovItem && hovItem.dataset.dual === "true") {
         const rect = hovItem.getBoundingClientRect();
         const isLeft = e.clientX < rect.left + rect.width / 2;
         const itemIdx = parseInt(hovItem.getAttribute('data-index') || '0');
         const m = moments[itemIdx];
         setActiveImage((isLeft ? m.leftImage : m.rightImage) || null);
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  useEffect(() => {
    const ctx = gsap.context(() => {
        const items = document.querySelectorAll(".archive-item");
        items.forEach((item) => {
            gsap.from(item, {
                y: 30,
                duration: 1,
                ease: "power2.out",
                scrollTrigger: {
                    trigger: item,
                    start: "top 95%",
                    once: true
                }
            });
        });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} id="achievements" className="overflow-hidden relative pb-32 md:pb-32">
      <div className="section-container">
        {/* Header */}
        <div className="grid-layout mb-16 items-end">
          <div className="md:col-span-8 lg:col-span-12">
            <span className="section-tag" style={{ color: '#6366F1' }}>Historical Impact</span>
            <h2 className="text-7xl md:text-[140px] font-extrabold mb-12 text-[#0D0D0D] leading-none tracking-tight">
              Moments that <br /> defined us<span className="text-primary">.</span>
            </h2>
            <p className="text-3xl font-light text-gray-500 max-w-2xl leading-relaxed">
              From global stages to creative breakthroughs. A dual-perspective visual journey.
            </p>
          </div>
        </div>

        {/* Interactive Dual-Reveal List */}
        <div className="space-y-2 relative z-10 border-t border-black/[0.05]">
           {moments.map((m: any, i) => (
             <div 
               key={i} 
               data-index={i}
               data-dual={m.leftImage ? "true" : "false"}
               className="archive-item group flex items-center justify-between py-12 md:py-16 border-b border-black/[0.05] hover:border-black transition-all duration-700 cursor-pointer overflow-hidden relative bg-white"
               onMouseEnter={(e: any) => {
                 if (m.leftImage) {
                   const rect = e.currentTarget.getBoundingClientRect();
                   const isLeft = e.clientX < rect.left + rect.width / 2;
                   setActiveImage(isLeft ? m.leftImage : m.rightImage);
                 } else {
                   setActiveImage(m.image);
                 }
               }}
               onMouseLeave={() => setActiveImage(null)}
             >
                <div className="absolute inset-0 bg-primary/2 translate-y-full group-hover:translate-y-0 transition-transform duration-700 ease-expo" />
                <span className="text-5xl md:text-8xl font-display font-extrabold group-hover:pl-4 transition-all duration-700 relative z-10 leading-none group-hover:text-primary" style={{ color: '#0D0D0D', opacity: 1 }}>
                    {m.item}
                </span>
                
                <div className="opacity-0 group-hover:opacity-100 transition-all duration-700 translate-x-10 group-hover:translate-x-0 flex items-center gap-4 relative z-10 pr-8">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-[#0D0D0D]">
                      {m.leftImage ? "MOVE LEFT/RIGHT" : "VIEW MOMENT"}
                    </span>
                    <div className="w-12 h-[1px] bg-black" />
                </div>
             </div>
           ))}
        </div>
      </div>

      {/* High-Impact Dual Reveal Component */}
      <div 
        ref={revealRef}
        className={`fixed top-0 left-0 w-[500px] h-[350px] pointer-events-none z-[200] transition-opacity duration-300 overflow-hidden rounded-3xl shadow-[0_35px_60px_-15px_rgba(0,0,0,0.3)] ${activeImage ? 'opacity-100 scale-100 rotate-2' : 'opacity-0 scale-95 rotate-0'}`}
      >
        {activeImage && (
          <img 
            key={activeImage} // Key switch triggers clean internal transition
            src={activeImage} 
            alt="Achievement Moment" 
            className="w-full h-full object-cover"
          />
        )}
      </div>


    </section>
  );
}
