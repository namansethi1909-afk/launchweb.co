"use client";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const plans = [
    {
      title: "BASIC PLAN",
      price: "₹9,999",
      desc: "Single-page website (clean & structured)",
      features: [
          "Fully responsive across devices",
          "Modern, minimal design",
          "SEO-ready setup (basic optimization)",
          "Fast loading & performance-focused"
      ],
      isPopular: false,
      btn: "START BASIC PROJECT",
      accent: "#6366F1"
    },
    {
      title: "STANDARD PLAN",
      price: "₹29,999",
      desc: "Multi-page website (structured layout)",
      features: [
          "Modern UI/UX design",
          "Smooth animations & interactions",
          "Fully responsive design",
          "SEO-ready setup",
          "Scalable architecture"
      ],
      isPopular: true,
      btn: "START STANDARD PROJECT",
      accent: "#01a86b"
    },
    {
      title: "PREMIUM PLAN",
      price: "₹44,999",
      desc: "Premium UI/UX with refined design",
      features: [
          "Custom features based on requirements",
          "Advanced development & optimization",
          "High-performance build",
          "Priority support & faster delivery",
          "Scalable and future-ready system"
      ],
      isPopular: false,
      btn: "START PREMIUM PROJECT",
      accent: "#8B5CF6"
    },
    {
      title: "CUSTOM PLAN",
      price: "CUSTOM",
      desc: "Fully customized web solutions",
      features: [
          "Web systems & app integrations",
          "Advanced custom features",
          "Dedicated development approach",
          "Built for complex requirements",
          "Flexible & scalable architecture"
      ],
      isPopular: false,
      btn: "REQUEST CUSTOM QUOTE",
      accent: "#F59E0B"
    }
];

export default function Pricing() {
  const container = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
        // Entry animation for header
        gsap.from(".pricing-header-reveal", {
            y: 100,
            opacity: 0,
            duration: 1.5,
            ease: "expo.out",
            stagger: 0.1,
            scrollTrigger: {
                trigger: container.current,
                start: "top 80%"
            }
        });

        // Sophisticated card staggered entry
        gsap.from(".pricing-card-reveal", {
            scale: 0.9,
            opacity: 0,
            y: 100,
            duration: 1.8,
            stagger: 0.1,
            ease: "power4.out",
            scrollTrigger: {
                trigger: ".pricing-grid",
                start: "top 90%"
            }
        });
    }, container);
    return () => ctx.revert();
  }, []);

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>, target: HTMLDivElement) => {
    const rect = target.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const xPercent = (x / rect.width - 0.5) * 10; 
    const yPercent = (y / rect.height - 0.5) * -10;
    
    gsap.to(target, {
        rotateY: xPercent,
        rotateX: yPercent,
        duration: 0.5,
        ease: "power2.out",
        transformPerspective: 1000
    });
  };

  const onMouseLeave = (target: HTMLDivElement) => {
    gsap.to(target, {
        rotateY: 0,
        rotateX: 0,
        duration: 1.2,
        ease: "elastic.out(1, 0.3)"
    });
  };

  return (
    <section ref={container} id="pricing" className="relative py-16 md:py-24 overflow-visible bg-transparent">
        <div className="section-container !max-w-[1400px] relative z-10">
            {/* Elite Header Rendering - Compact */}
            <div className="flex flex-col md:flex-row items-end justify-between gap-8 mb-16">
                <div className="max-w-xl">
                    <span className="section-tag pricing-header-reveal text-xs tracking-[0.3em]" style={{ color: '#01a86b' }}>Architecture & Investment</span>
                    <h2 className="text-6xl md:text-[80px] font-extrabold text-[#0D0D0D] leading-[0.9] tracking-tighter pricing-header-reveal">
                        Pricing <br /> Models<span className="text-primary">.</span>
                    </h2>
                </div>
                <div className="max-w-xs pricing-header-reveal pb-2">
                    <p className="text-lg font-medium text-gray-400 italic mb-4 border-l-2 border-primary pl-4 leading-relaxed">
                        "Price is what you pay. Value is what you get."
                    </p>
                    <div className="flex items-center gap-3 opacity-20">
                        <div className="w-8 h-[1px] bg-black" />
                        <span className="text-[9px] font-black uppercase tracking-[0.4em]">Premium Scale</span>
                    </div>
                </div>
            </div>

            {/* Pricing Matrix - Compact Grid */}
            <div className="pricing-grid grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 items-stretch">
                {plans.map((plan, i) => (
                    <div 
                        key={i}
                        className="pricing-card-reveal"
                        onMouseMove={(e) => onMouseMove(e, e.currentTarget)}
                        onMouseLeave={(e) => onMouseLeave(e.currentTarget)}
                    >
                        <div 
                            className={`relative h-full p-8 md:p-10 flex flex-col justify-between rounded-[2.5rem] transition-all duration-700 border-t border-l border-white/80 border-b border-r border-black/[0.04] overflow-hidden bg-white/10 backdrop-blur-3xl shadow-[0_15px_40px_rgba(0,0,0,0.02)] group hover:shadow-[inset_0_0_40px_rgba(1,168,107,0.05),_0_30px_60px_rgba(0,0,0,0.05)] hover:bg-primary/[0.08] hover:border-primary/40`}
                            style={{ transformStyle: "preserve-3d", perspective: "1500px" }}
                        >
                            
                            {/* Subtle Glass Glare */}
                            <div className="absolute top-0 left-0 w-full h-[40%] bg-gradient-to-b from-white/30 to-transparent pointer-events-none rounded-t-[2.5rem]" />

                            <div className="relative z-10 flex flex-col h-full transition-transform duration-700 group-hover:duration-300" style={{ transform: "translateZ(15px)" }}>
                                
                                <div className="flex items-center justify-between mb-8 relative">
                                    <span className={`text-[9px] font-black tracking-[0.4em] uppercase ${plan.isPopular ? 'text-primary' : 'text-gray-400'}`}>
                                        {plan.title}
                                    </span>
                                    {plan.isPopular && (
                                        <div className="px-3 py-1 bg-primary/20 border border-primary/30 rounded-full">
                                            <span className="text-[8px] font-black text-primary tracking-widest uppercase">Popular</span>
                                        </div>
                                    )}
                                </div>

                                <div className="mb-6 flex flex-col gap-1">
                                    <h3 className={`flex flex-row items-baseline gap-1 whitespace-nowrap font-bold tracking-tighter text-[#0D0D0D] group-hover:text-black transition-colors ${plan.price === "CUSTOM" ? "text-3xl md:text-4xl" : "text-4xl md:text-5xl"}`}>
                                        <span className="shrink-0">₹</span>
                                        <span className="shrink-0">{plan.price === "CUSTOM" ? "CUSTOM" : plan.price.replace('₹', '').trim()}</span>
                                        {plan.price !== "CUSTOM" && (
                                            <span className="text-[12px] font-black opacity-30 uppercase tracking-widest ml-1">
                                                /proj
                                            </span>
                                        )}
                                    </h3>
                                    <div className="flex items-center gap-2 opacity-20">
                                        <div className="w-6 h-[1px] bg-black" />
                                        <span className="text-[8px] font-black uppercase tracking-[0.2em]">Agency standard</span>
                                    </div>
                                </div>
                                <p className={`text-xs md:text-[13px] font-bold mb-8 leading-relaxed text-gray-400 min-h-[40px] group-hover:text-gray-700 transition-colors uppercase tracking-tight`}>
                                    {plan.desc}
                                </p>

                                <div className="w-12 h-0.5 bg-primary mb-10 rounded-full opacity-30" />

                                <ul className="space-y-6 mb-16 grow text-left pt-2">
                                    {plan.features.map((feat, k) => (
                                        <li key={k} className="flex items-start gap-4 text-[9px] md:text-[10px] font-black uppercase tracking-[0.25em] group/feat leading-normal">
                                            <div className={`mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 transition-all duration-500 group-hover/feat:scale-125 bg-primary shadow-[0_0_10px_rgba(1,168,107,0.8)]`} />
                                            <span className={`transition-all duration-500 text-gray-500 group-hover/feat:text-black`}>
                                                {feat}
                                            </span>
                                        </li>
                                    ))}
                                </ul>

                                <div className="mt-auto pt-6 border-t border-black/[0.03]">
                                    <p className="text-[9px] font-black uppercase tracking-[0.3em] text-primary opacity-50">Request in Contact Section ↓</p>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            
            {/* Matrix Footer - Compact */}
            <div className="mt-16 pt-12 border-t border-black/[0.03] flex flex-col md:flex-row items-center justify-between gap-8 opacity-30">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0D0D0D]">Guaranteed scalability since 2024</p>
                <div className="flex gap-8">
                   <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0D0D0D]">Next-Gen Dev</span>
                   <span className="text-[9px] font-black uppercase tracking-[0.4em] text-[#0D0D0D]">3D Engineering</span>
                </div>
            </div>
        </div>
    </section>
  );
}
