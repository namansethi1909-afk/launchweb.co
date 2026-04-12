"use client";
import React, { useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: "LetsUpgrade Pro",
    category: "Professional Learning",
    desc: "A professional learning platform with authentication, dashboards, and marketing integrations. Built with modern frontend technologies.",
    year: "2024",
    link: "https://pro.letsupgrade.in/",
    preview: "/project1-preview.mov",
    aspect: "aspect-[4/3]"
  },
  {
    title: "Visual Learning",
    category: "Interactive Education",
    desc: "Interactive visual learning platform designed for engaging educational experiences with clean UI and structured modules.",
    year: "2024",
    link: "https://visual-learning-sandy.vercel.app/week1",
    preview: "/videos/Visual_Learning.mov",
    id: "02",
    aspect: "aspect-video"
  },
  {
    title: "ParkSmart",
    category: "Smart Parking System",
    desc: "Built a smart parking management system to optimize urban mobility with a seamless interface and real-time tracking.",
    year: "2024",
    link: "https://parksmart-app.vercel.app/",
    preview: "/videos/Parksmart_Video.mp4",
    id: "03",
    isMobile: true,
    aspect: "aspect-[9/16]"
  },
  {
    title: "Supply Chain",
    category: "Blockchain Transparency",
    desc: "A blockchain-inspired platform to track products from farm to table, ensuring complete transparency and trust in the supply chain.",
    year: "2024",
    link: "https://naman1167.github.io/supply_chain/",
    preview: "/videos/Supply_Chain.mov",
    id: "04",
    aspect: "aspect-[3/2]"
  }
];

// --- PREMIUM TEXTURE BACKGROUND COMPONENT ---
// Recreates a subtle, scrolling mathematical/programming symbol texture loop.
const TextureOverlay = () => {
  const pattern = "+=-01/*XLW".repeat(30);

  return (
    <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden opacity-[0.06] mix-blend-color-burn">
      <style>{`
        @keyframes textureDrift {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); } 
        }
        @keyframes textureDriftRev {
          0% { transform: translateX(-50%); }
          100% { transform: translateX(0); }
        }
        .anim-texture-drift { animation: textureDrift 120s linear infinite; }
        .anim-texture-drift-rev { animation: textureDriftRev 120s linear infinite; }
      `}</style>

      {/* Oversized container to prevent edge clipping during rotation */}
      <div className="absolute top-[-15%] left-[-10%] w-[120vw] h-[130vh] flex flex-col justify-start rotate-[2deg] scale-[1.05]">
        {Array.from({ length: 24 }).map((_, i) => (
          <div key={i} className="flex w-max whitespace-nowrap mb-4 select-none opacity-80">
            <div className={`flex w-fit ${i % 2 === 0 ? 'anim-texture-drift' : 'anim-texture-drift-rev'}`}>
              <p className="font-mono text-[20px] font-black text-black tracking-[0.4em]">
                {pattern}
              </p>
              <p className="font-mono text-[20px] font-black text-black tracking-[0.4em]">
                {pattern}
              </p>
            </div>
          </div>
        ))}
      </div>

      {/* Soft volumetric gradients back to white */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/40 via-transparent to-white/90" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(255,255,255,0.6)_100%)]" />
    </div>
  );
};

export default function Portfolio() {
  const containerRef = useRef<HTMLDivElement>(null);
  const svgRef = useRef<SVGSVGElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress: lineProgress } = useScroll({
    target: galleryRef,
    offset: ["start center", "end center"]
  });

  useEffect(() => {
    const ctx = gsap.context(() => {
        // --- PERFORMANCE OPTIMIZED TIMELINE ---
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=250%", // Increased scroll distance for more stable tracking
                pin: true,
                scrub: 2, // Smoothness multiplier (Higher = Lighter on GPU)
                anticipatePin: 1
            }
        });

        // Use standard scale(1) baseline for better hardware acceleration
        gsap.set(svgRef.current, {
            rotationX: 12.5,
            rotationY: 22,
            rotationZ: 15,
            scale: 0.55,
            transformPerspective: 2500,
            opacity: 1,
            force3D: true,
            backfaceVisibility: "hidden"
        });

        // Sequence 1: Smooth 3D Zoom
        tl.to(svgRef.current, {
            scale: 140, // Deep scale to clear viewport
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            transformOrigin: "50% 50%",
            ease: "none", // Linear for consistent scroll response
            force3D: true,
        }, 0);

        // Sequence 2: Precision Opacity Curve (Prevents flickering)
        tl.to(svgRef.current, {
            opacity: 0,
            ease: "power2.inOut",
        }, 0.82);

        // Sequence 3: Content Rise
        tl.from(contentRef.current, {
            y: 300,
            opacity: 0,
            scale: 0.98,
            ease: "power2.out"
        }, 0.65);

    });
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="work" className="relative w-full overflow-hidden bg-transparent">
        
        {/* Animated Background Overlay */}
        <TextureOverlay />
        
        {/* --- PERFORMANCE ARCHITECTURE: Optimized Portal Mask --- */}
        <div className="absolute top-0 left-0 w-full h-screen z-40 pointer-events-none" style={{ perspective: "2500px" }}>
            <svg
                ref={svgRef}
                className="absolute z-10 w-[300vw] h-[300vh] top-[-100vh] left-[-100vw] object-cover pointer-events-none"
                style={{ 
                    willChange: "transform, opacity", 
                    transformStyle: "preserve-3d" 
                }}
                viewBox="0 0 2100 1200"
                preserveAspectRatio="xMidYMid slice"
            >
                <defs>
                    {/* Digital Grid Pattern inside the letters */}
                    <pattern id="digitalGrid" x="0" y="0" width="18" height="18" patternUnits="userSpaceOnUse">
                        <rect width="18" height="18" fill="transparent" />
                        <line x1="0" y1="0" x2="18" y2="0" stroke="#888" strokeWidth="0.6" />
                        <line x1="0" y1="0" x2="0" y2="18" stroke="#888" strokeWidth="0.6" />
                        <rect x="0" y="0" width="2.5" height="2.5" fill="#555" opacity="0.7" rx="0.4" />
                    </pattern>
                </defs>

                {/* PROJECTS text — only letters visible, no white background */}
                <text
                    x="50%"
                    y="52%"
                    dominantBaseline="central"
                    textAnchor="middle"
                    fill="url(#digitalGrid)"
                    stroke="#333"
                    strokeWidth="1.5"
                    style={{
                        fontFamily: "'Unbounded', sans-serif",
                        fontSize: '162px',
                        fontWeight: 900,
                        letterSpacing: '-0.04em',
                        textTransform: 'uppercase',
                        opacity: 0.85
                    }}
                >
                    PROJ<tspan dx="-30">ECTS</tspan>
                </text>
            </svg>
        </div>

        {/* --- MAIN PORTFOLIO CONTENT --- */}
        <div ref={contentRef} className="relative z-30 min-h-screen pt-48 pb-0 px-6 md:px-24">
            <div className="section-container !py-0 max-w-[1500px]">
                <div className="mb-48">
                  <span className="font-mono text-[11px] tracking-[0.5em] uppercase mb-10 font-bold text-[#01a86b]">Portfolio Node 1.0</span>
                  <h2 className="text-8xl md:text-[11vw] font-black tracking-tighter leading-[0.75] text-black uppercase">
                    OUR <br /> <span className="text-black italic" style={{ WebkitTextStroke: '2px black' }}>PROJECTS</span>
                  </h2>
                </div>

                <div className="relative max-w-7xl mx-auto" ref={galleryRef}>
                  {/* Animated Path Line */}
                  <div className="absolute inset-0 z-0 pointer-events-none hidden md:block" style={{ top: '6%', bottom: '5%' }}>
                    <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                      {/* Strictly Dotted Base Path */}
                      <path 
                        d="M 25,0 C 25,20 75,15 75,33 C 75,50 25,50 25,66 C 25,85 75,80 75,100" 
                        fill="none" 
                        stroke="rgba(0,0,0,0.15)" 
                        strokeWidth="2" 
                        strokeDasharray="12 12" 
                        vectorEffect="non-scaling-stroke" 
                      />
                      {/* Solid Progress Line on Scroll */}
                      <motion.path 
                        d="M 25,0 C 25,20 75,15 75,33 C 75,50 25,50 25,66 C 25,85 75,80 75,100" 
                        fill="none" 
                        stroke="#01a86b" 
                        strokeWidth="3" 
                        vectorEffect="non-scaling-stroke" 
                        style={{ pathLength: lineProgress }} 
                       />
                    </svg>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-x-24 gap-y-64 items-start relative z-10">
                    {projects.map((project, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, y: 100 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true, amount: 0.3 }}
                        className={`flex flex-col ${i % 2 !== 0 ? 'md:mt-64' : ''}`}
                      >
                        <motion.div
                          whileHover={{ scale: 1.04, rotateX: 3, rotateY: -3 }}
                          transition={{ duration: 0.5, ease: "easeOut" }}
                          className={`group relative w-full rounded-[48px] overflow-hidden bg-white/40 backdrop-blur-3xl shadow-[0_50px_150px_-30px_rgba(0,0,0,0.15)] border border-black/[0.04] ${project.isMobile ? 'aspect-[9/16] md:max-w-[400px] mx-auto' : project.aspect || 'aspect-[4/3]'}`}
                        >
                          <a href={project.link} target="_blank" rel="noopener noreferrer" className="block w-full h-full relative">
                            {project.preview ? (
                              <video 
                                src={project.preview} 
                                autoPlay 
                                muted 
                                loop 
                                playsInline 
                                className={`absolute inset-0 w-full h-full object-cover ${project.title === 'Visual Learning' ? 'object-top' : ''}`} 
                              />
                            ) : (
                              <div className="absolute inset-0 flex items-center justify-center bg-gray-50/10">
                                 <span className="text-gray-100 font-black text-[12vw] opacity-30 uppercase tracking-widest">{project.id || `0${i+1}`}</span>
                              </div>
                            )}
                            <div className="absolute inset-0 bg-gradient-to-br from-[#01a86b]/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                            <div className="absolute top-10 right-10 w-16 h-16 rounded-full border border-white/20 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-4 group-hover:translate-y-0 transition-all duration-300 bg-white shadow-2xl">
                              <ArrowUpRight className="w-7 h-7 text-black" />
                            </div>
                          </a>
                        </motion.div>
                        
                        <div className="mt-14 border-b-2 border-black/[0.02] pb-14 group">
                           <div className="flex justify-between items-start mb-4">
                              <h3 className="text-4xl font-black tracking-tighter text-[#111] font-display">{project.title}</h3>
                              <span className="text-gray-300 font-mono text-[11px] uppercase font-bold">{project.year}</span>
                           </div>
                           <p className="font-mono text-[12px] uppercase tracking-[0.4em] font-black mb-6 text-primary">{project.category}</p>
                           <p className="text-[#111] opacity-60 text-xl font-medium leading-relaxed max-w-md">
                              {project.desc}
                           </p>
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </div>
            </div>
        </div>
    </section>
  );
}
