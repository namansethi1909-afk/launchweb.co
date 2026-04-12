"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import FloatingCube from "./FloatingCube";


gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const container = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const orbRef = useRef<HTMLDivElement>(null);
  const magneticRef = useRef<HTMLAnchorElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 1. Reveal Animation with Staggered Chars (Pseudo)
      gsap.from(".hero-reveal", {
        y: 100,
        opacity: 0,
        rotate: 4,
        duration: 2,
        stagger: 0.15,
        ease: "expo.out",
      });

      // 2. Orb Cursor Interaction
      const onMove = (e: MouseEvent) => {
        const { clientX, clientY } = e;
        const x = (clientX - window.innerWidth / 2) * 0.1;
        const y = (clientY - window.innerHeight / 2) * 0.1;
        
        gsap.to(orbRef.current, {
           x: x,
           y: y,
           duration: 1.5,
           ease: "power2.out"
        });
      };
      window.addEventListener("mousemove", onMove);

      // 3. Parallax Scroll
      gsap.to(".parallax-layer", {
        y: (i, target) => -100 * (i + 1),
        ease: "none",
        scrollTrigger: {
          trigger: container.current,
          start: "top top",
          end: "bottom top",
          scrub: 1.5,
        },
      });

      // 4. Magnetic Effect on CTA
      const magOnMove = (e: MouseEvent) => {
          const rect = magneticRef.current?.getBoundingClientRect();
          if (rect) {
              const x = (e.clientX - rect.left - rect.width / 2) * 0.4;
              const y = (e.clientY - rect.top - rect.height / 2) * 0.4;
              gsap.to(magneticRef.current, { x, y, duration: 0.5 });
          }
      };
      magneticRef.current?.addEventListener("mousemove", magOnMove);
      magneticRef.current?.addEventListener("mouseleave", () => {
          gsap.to(magneticRef.current, { x: 0, y: 0, duration: 0.8, ease: "elastic.out(1, 0.3)" });
      });

    }, container);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} id="hero" className="relative min-h-[90vh] flex items-center overflow-hidden py-24 md:py-32">
      {/* Premium Orb 3D Background */}
      <div ref={orbRef} className="orb-3d absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] z-0 blur-[100px]" />

      <div className="section-container relative z-10 w-full">
        <div className="grid-layout">
          {/* Main Content: Columns 1 to 8 */}
          <div className="md:col-span-4 lg:col-span-7 flex flex-col justify-center">
            <span className="section-tag hero-reveal inline-flex select-none">Innovate / Design / Scale</span>
            <h1 ref={titleRef} className="text-7xl md:text-[110px] font-extrabold leading-[0.9] mb-12 hero-reveal text-black select-none tracking-[-0.06em]">
              Launch <br /> Web<span className="text-primary">.</span>co
            </h1>
            <p className="text-lg md:text-xl font-light leading-relaxed max-w-xl mb-10 hero-reveal text-on-bg-variant">
              We engineer elite digital experiences for brands that refuse to settle. No clutter, just pure impact.
            </p>
            <div className="flex flex-wrap items-center gap-12 hero-reveal">
              <a ref={magneticRef} href="#contact" className="btn-premium group">
                <span className="flex items-center gap-4">
                  Start Your Journey
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none" className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-500">
                    <path d="M1 13L13 1M13 1H3.5M13 1V10.5" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </span>
              </a>
              <a href="#work" className="text-[10px] font-bold uppercase tracking-[0.5em] hover:text-primary transition-all py-4 relative group">
                Explore Case Studies
                <span className="absolute bottom-3 left-0 w-0 h-[1px] bg-primary group-hover:w-full transition-all duration-500" />
              </a>
            </div>
          </div>

          {/* Depth Elements: Columns 9 to 12 */}
          <div className="md:col-span-4 lg:col-span-5 relative hidden lg:flex items-center justify-end">
            <div className="parallax-layer premium-card w-full aspect-square overflow-hidden group">
               <div className="absolute inset-0 bg-mesh opacity-40 group-hover:scale-110 transition-transform duration-1000" />
               <div className="absolute inset-0 flex items-center justify-center p-12">
                  <div className="w-full h-full border border-black/5 rounded-3xl flex items-center justify-center backdrop-blur-3xl bg-white/5 overflow-hidden">
                     <FloatingCube />
                  </div>
               </div>
            </div>
            
            {/* Floating Floating Stat */}
            <div className="parallax-layer absolute -bottom-8 -left-8 premium-card p-8 backdrop-blur-xl bg-white/80 z-20 max-w-[240px]">
               <div className="flex items-center gap-3 mb-4">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse" />
                  <p className="text-[9px] font-bold uppercase tracking-widest text-[#888]">Live Project Stats</p>
               </div>
               <p className="text-3xl font-display font-extrabold mb-1">+400%</p>
               <p className="text-[10px] text-[#666] font-medium leading-relaxed">Average growth delivered across all fintech clients in 2025.</p>
            </div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <div className="absolute bottom-10 left-12 hidden lg:flex items-center gap-4 text-[9px] uppercase font-bold tracking-[0.5em] text-gray-400">
           <div className="w-[1px] h-14 bg-gray-100 overflow-hidden relative">
              <div className="absolute top-0 left-0 w-full h-1/2 bg-primary animate-[scroll_2.5s_infinite]" />
           </div>
           <span>Scroll Down</span>
        </div>
      </div>
      
      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
      `}</style>
    </section>
  );
}
