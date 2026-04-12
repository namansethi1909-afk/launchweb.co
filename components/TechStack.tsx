"use client";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const tools = [
  { name: "React", icon: "https://skillicons.dev/icons?i=react" },
  { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
  { name: "Tailwind", icon: "https://skillicons.dev/icons?i=tailwind" },
  { name: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
  { name: "Figma", icon: "https://skillicons.dev/icons?i=figma" },
  { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
  { name: "PostgreSQL", icon: "https://skillicons.dev/icons?i=postgres" },
  { name: "Vercel", icon: "https://skillicons.dev/icons?i=vercel" },
  { name: "Supabase", icon: "https://skillicons.dev/icons?i=supabase" },
  { name: "Prisma", icon: "https://skillicons.dev/icons?i=prisma" },
  { name: "Stripe", icon: "https://cdn.simpleicons.org/stripe" },
  // Duplicate for seamless loop
  { name: "React", icon: "https://skillicons.dev/icons?i=react" },
  { name: "Next.js", icon: "https://skillicons.dev/icons?i=nextjs" },
  { name: "Tailwind", icon: "https://skillicons.dev/icons?i=tailwind" },
  { name: "TypeScript", icon: "https://skillicons.dev/icons?i=ts" },
  { name: "Figma", icon: "https://skillicons.dev/icons?i=figma" },
  { name: "Node.js", icon: "https://skillicons.dev/icons?i=nodejs" },
  { name: "PostgreSQL", icon: "https://skillicons.dev/icons?i=postgres" },
  { name: "Vercel", icon: "https://skillicons.dev/icons?i=vercel" },
  { name: "Supabase", icon: "https://skillicons.dev/icons?i=supabase" },
  { name: "Prisma", icon: "https://skillicons.dev/icons?i=prisma" },
  { name: "Stripe", icon: "https://cdn.simpleicons.org/stripe" }
];

export default function TechStack() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".header-reveal", {
        opacity: 0,
        y: 40,
        duration: 1.5,
        ease: "expo.out",
        stagger: 0.2,
        scrollTrigger: {
          trigger: container.current,
          start: "top 85%",
        },
      });
    }, container);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={container} id="stack" className="relative overflow-hidden py-32 md:py-48">
      <div className="section-container">
        {/* Header Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12 items-end">
          <div className="header-reveal">
            <span className="section-tag" style={{ color: '#6366F1' }}>Elite Collective</span>
            <h2 className="text-5xl md:text-[96px] font-extrabold text-[#0D0D0D] leading-[0.9] tracking-tight">
              Tools of <br /> trust<span className="text-primary">.</span>
            </h2>
          </div>
          
          <div className="header-reveal max-w-lg pb-4">
            <p className="text-lg md:text-xl leading-relaxed text-black/60 font-medium italic mb-6">
              "We don't settle for average. Every digital experience we engineer is powered by the world's most sophisticated technologies."
            </p>
            <p className="text-base text-black/40 leading-relaxed font-medium">
              We leverage a world-class tech stack to build products that are hyper-scalable and future-coded.
            </p>
          </div>
        </div>
      </div>

      {/* Marquee Section */}
      <div className="relative w-full mask-fade py-6 overflow-hidden">
        <div className="flex w-fit animate-marquee" style={{ animationDuration: '20s' }}>
          {tools.map((tool, i) => (
             <div key={i} className="flex-shrink-0 flex flex-col items-center gap-6 py-8 px-8 mx-2 min-w-[160px] md:min-w-[210px] rounded-[2rem] bg-white border border-black/[0.05] shadow-[0_15px_30px_-15px_rgba(0,0,0,0.1)] hover:shadow-[0_45px_100px_-20px_rgba(0,0,0,0.1)] hover:-translate-y-3 transition-all duration-700 group">
                <div className="w-16 h-16 md:w-20 md:h-20 flex items-center justify-center relative">
                    <img 
                        src={tool.icon} 
                        alt={tool.name} 
                        className="w-full h-full object-contain filter drop-shadow-[0_10px_10px_rgba(0,0,0,0.05)] transition-transform duration-700 group-hover:scale-110"
                    />
                </div>
                <span className="text-[12px] font-black uppercase tracking-[0.5em] text-black/40 group-hover:text-black transition-colors duration-700">{tool.name}</span>
             </div>
          ))}
        </div>
      </div>
    </section>
  );
}
