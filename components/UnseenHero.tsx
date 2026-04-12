"use client";
import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";


export default function UnseenHero() {
  const container = useRef<HTMLDivElement>(null);
  const preloaderOverlay = useRef<HTMLDivElement>(null);
  const portalMaskRef = useRef<SVGTextElement>(null);
  const solidTextRef = useRef<any>(null);
  
  // Layer Refs

  const partLaunch = useRef<HTMLSpanElement>(null);
  const partWeb = useRef<HTMLSpanElement>(null);
  const partCo = useRef<HTMLSpanElement>(null);
  const taglineLayer = useRef<HTMLDivElement>(null);
  const uiLayer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        defaults: { ease: "power4.inOut" }
      });

      // --- INITIAL HIDDEN STATES ---
      gsap.set(preloaderOverlay.current, { opacity: 1 });
      gsap.set(solidTextRef.current, { 
        scale: 0.9, 
        opacity: 0,
        transformOrigin: "center center"
      });

      // Z-axis for 3D ecosystem
      const layers = [taglineLayer.current, uiLayer.current];
      gsap.set(layers, { opacity: 0, scale: 0.5, z: -400, filter: "blur(10px)" });

      // THE CORE STACK: 'web' and '.co' are TRULY hidden behind 'launch'
      gsap.set(partLaunch.current, { x: 0, opacity: 0, scale: 1.1, z: 10 });
      gsap.set(partWeb.current, { x: 0, opacity: 0, scale: 0.9, z: -10 });
      gsap.set(partCo.current, { x: 0, opacity: 0, scale: 0.8, z: -20 });

      // --- 1. BRAND MATERIALIZATION ---
      tl.to(solidTextRef.current, {
        opacity: 1,
        scale: 1,
        duration: 2,
        ease: "power2.out"
      })
      .to({}, { duration: 0.5 }); // Static hold

      // --- 2. DEEP PORTAL DESCENT ---
      tl.addLabel("descent")
      .to(solidTextRef.current, {
        scale: 60,
        opacity: 0,
        duration: 2.5,
        ease: "expo.inOut"
      }, "descent")
      
      .to(preloaderOverlay.current, {
        opacity: 0,
        duration: 2,
        ease: "power2.inOut",
        onComplete: () => {
          gsap.set(preloaderOverlay.current, { display: "none" });
        }
      }, "descent+=0.5")

      // --- 3. THE MECHANICAL UNVEILING ---
      .addLabel("unfold", "descent+=1.4")
      
      // Phase A: 'launch' manifests primarily
      .to(partLaunch.current, {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        ease: "expo.out"
      }, "unfold")

      // Phase B: 'web' slides out from BEHIND 'launch'
      .to(partWeb.current, {
        opacity: 1,
        scale: 1,
        x: () => (partLaunch.current?.getBoundingClientRect().width ?? 420) * 0.65 + 10,
        duration: 1.5,
        ease: "power4.out"
      }, "unfold+=0.3")
      
      // Phase C: '.co' slides out from BEHIND 'web'
      .to(partCo.current, {
        opacity: 1,
        scale: 1,
        x: () => {
          const lw = partLaunch.current?.getBoundingClientRect().width ?? 420;
          const ww = partWeb.current?.getBoundingClientRect().width ?? 220;
          return lw * 0.65 + 10 + ww + 48; // Increased gap to 48
        },
        duration: 1.6,
        ease: "power4.out"
      }, "unfold+=0.6")

      // Final Alignment Settle (Move combined word to center)
      .to(partLaunch.current, { 
        x: () => {
          const lw = partLaunch.current?.getBoundingClientRect().width ?? 420;
          const ww = partWeb.current?.getBoundingClientRect().width ?? 220;
          const cw = partCo.current?.getBoundingClientRect().width ?? 100;
          const totalWidth = lw * 0.65 + 10 + ww + 48 + cw; // Re-calculate total seen width
          return -(totalWidth / 2 - lw / 2);
        },
        duration: 1.8, ease: "expo.inOut" }, "unfold+=0.6")
      
      // Subtle pulse to indicate 'Combination Locked'
      .to([partLaunch.current, partWeb.current, partCo.current], {
        letterSpacing: "0.05em",
        duration: 0.5,
        ease: "back.out(2)"
      }, "unfold+=2.2")

      // --- 4. SUCCESSIVE NARRATIVE REVEALS ---


      .to(taglineLayer.current, {
        opacity: 1,
        scale: 1,
        z: 0,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power3.out"
      }, "unfold+=2.2")

      .to(uiLayer.current, {
        opacity: 1,
        scale: 1,
        z: 0,
        filter: "blur(0px)",
        duration: 1.5,
        ease: "power3.out"
      }, "unfold+=2.5")

      .to(".hud-element", {
        opacity: 1,
        stagger: 0.1,
        duration: 1.2
      }, "unfold+=2.8");

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} className="relative w-full h-screen overflow-hidden text-black flex items-center justify-center">



      {/* CONTINUOUS PRELOADER */}
      <div ref={preloaderOverlay} className="fixed inset-0 z-[200] flex flex-col items-center justify-center pointer-events-none overflow-hidden" style={{ backgroundColor: '#ffffff' }}>
        {/* Digital Grid Background */}
        <svg className="absolute inset-0 w-full h-full" xmlns="http://www.w3.org/2000/svg">
          <defs>
            <pattern id="preloaderGrid" x="0" y="0" width="28" height="28" patternUnits="userSpaceOnUse">
              <rect width="28" height="28" fill="white" />
              {/* Horizontal line */}
              <line x1="0" y1="0" x2="28" y2="0" stroke="#e0e0e0" strokeWidth="0.5" />
              {/* Vertical line */}
              <line x1="0" y1="0" x2="0" y2="28" stroke="#e0e0e0" strokeWidth="0.5" />
              {/* Corner dot */}
              <rect x="0" y="0" width="1.5" height="1.5" fill="#c8c8c8" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#preloaderGrid)" />
          {/* Subtle radial fade so center stays clean for the logo */}
          <radialGradient id="gridFade" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="white" stopOpacity="0.85" />
            <stop offset="100%" stopColor="white" stopOpacity="0" />
          </radialGradient>
          <rect width="100%" height="100%" fill="url(#gridFade)" />
        </svg>

        <div className="relative flex flex-col items-center">
            <img 
              ref={solidTextRef} 
              src="/Images/Logo(New).png" 
              alt="Launchweb Logo" 
              className="w-72 md:w-[350px] h-auto object-contain"
            />
        </div>
      </div>

      {/* 🧩 MECHANICAL REVEAL ENVIRONMENT */}
      <div className="relative z-10 w-full h-full flex flex-col items-center justify-center pointer-events-none translate-y-[6vh] translate-x-[20px]">
        


        {/* Layer 2: The Mechanical Unveiling Stack */}
        <div className="relative mb-8 h-[120px] flex items-center justify-center w-full">
           <h1 className="text-[10vw] md:text-[100px] font-extrabold tracking-[-0.05em] leading-none text-black select-none flex items-center justify-around w-full relative">
             <span ref={partLaunch} className="absolute inline-block">Launch</span>
             <span ref={partWeb} className="absolute inline-block text-primary">web</span>
             <span ref={partCo} className="absolute inline-block">.co</span>
           </h1>
        </div>

        {/* Layer 3: Narrative Interface */}
        <div ref={taglineLayer} className="flex flex-col items-center gap-6">
           <p className="text-lg font-bold tracking-[0.2em] text-gray-400 select-none text-center">
             Digital Engineering × Creative Excellence
           </p>
           <div className="flex gap-4 items-center opacity-40">
              <div className="w-12 h-[1px] bg-black" />
              <span className="text-[13px] font-mono tracking-widest">Serving Clients Worldwide</span>
              <div className="w-12 h-[1px] bg-black" />
           </div>
        </div>

        {/* Layer 4: Interactive Mission */}
        <div ref={uiLayer} className="mt-14 pointer-events-auto">
           <button className="group relative px-8 py-4 bg-black text-white rounded-full overflow-hidden transition-all duration-500 hover:scale-[1.05] hover:shadow-2xl">
              <span className="relative z-10 text-[11px] font-bold uppercase tracking-[0.4em]">Initialize Deployment</span>
              <div className="absolute inset-0 bg-primary -translate-x-full group-hover:translate-x-0 transition-transform duration-700 ease-expo" />
           </button>
        </div>
      </div>

      {/* Interface HUD */}
      <div className="absolute top-12 left-12 hud-element text-[8px] font-mono uppercase tracking-[0.6em] text-gray-300 select-none">[SYSTEM_MANIFEST_v.4.0]</div>
      <div className="absolute top-12 right-12 hud-element flex gap-8 text-[8px] font-mono uppercase tracking-widest text-gray-300 select-none">
        <span>[LI]</span> <span>[IG]</span> <span>[X]</span>
      </div>
      
      <div className="absolute bottom-12 left-12 hud-element flex items-center gap-4">
         <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
         <span className="text-[8px] font-bold tracking-[0.4em] uppercase text-black/40">Status: Operational Everywhere</span>
      </div>

    </section>
  );
}









