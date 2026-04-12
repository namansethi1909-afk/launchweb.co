"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";

/**
 * FIXED PORTAL PRELOADER (LW SYMBOL FOCUS)
 * Fixes the 'white screen' issue by ensuring the LW symbol is visible
 * and then morphs into a portal for the cinematic entry.
 */
interface PreloaderProps {
  onComplete?: () => void;
}

export default function Preloader({ onComplete }: PreloaderProps) {
  const [isFinished, setIsFinished] = useState(false);
  const portalMaskRef = useRef<SVGTextElement>(null);
  const solidTextRef = useRef<SVGTextElement>(null);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    
    // Safety Fallback (3s total)
    const safetyTimer = setTimeout(() => {
      handleFinalize();
    }, 3000);

    return () => {
      document.body.style.overflow = "";
      clearTimeout(safetyTimer);
    };
  }, []);

  const handleFinalize = () => {
    document.body.style.overflow = "";
    setIsFinished(true);
    if (onComplete) onComplete();
  };

  useEffect(() => {
    if (isFinished) return;

    const tl = gsap.timeline({
      onComplete: () => {
        setTimeout(handleFinalize, 50);
      }
    });

    // Ensure hero content is hidden initially so it only emerges from the LW
    gsap.set(".hero-reveal, .premium-card, .orb-3d", { opacity: 0 });

    // Reset initial states for a silky materialization
    gsap.set([portalMaskRef.current, solidTextRef.current], {
      scale: 0.96, // Start slightly smaller for a classy 'breath-in' effect
      transformOrigin: "center center",
      opacity: 0,
      filter: "blur(4px)" // Soft entry
    });

    // 1. MATERIALIZATION: Warp materialization
    tl.to([portalMaskRef.current, solidTextRef.current], {
      opacity: 1,
      scale: 1,
      filter: "blur(0px)",
      duration: 0.15, // Warp entry
      ease: "power2.out"
    });

    // 3. CONTENT EMERGENCE: Website elements bloom from the LW center
    // We target existing hero elements and 'generate' them from the logo
    const heroElements = document.querySelectorAll(".hero-reveal, .premium-card, .orb-3d");
    
    tl.add(() => {
      heroElements.forEach((el) => {
        const rect = el.getBoundingClientRect();
        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;
        
        // Calculate the vector from the logo center to the element's final position
        const dx = centerX - (rect.left + rect.width / 2);
        const dy = centerY - (rect.top + rect.height / 2);

        gsap.fromTo(el, 
          { 
            x: dx, 
            y: dy, 
            scale: 0.3, 
            opacity: 0,
            filter: "blur(5px)"
          }, 
          { 
            x: 0, 
            y: 0, 
            scale: 1, 
            opacity: 1,
            filter: "blur(0px)",
            duration: 0.4,
            ease: "power3.out",
            overwrite: "auto"
          }
        );
      });
    }, "-=0.05");

    // 3. TRIGGER EMERGENCE: Website elements bloom from the LW center
    tl.add(() => {
      if (onComplete) onComplete();
    }, "-=0.05");

    // 4. THE LW SYMBOL FADES AS CONTENT EMERGES
    tl.to([portalMaskRef.current, solidTextRef.current], {
      scale: 4,
      opacity: 0,
      filter: "blur(5px)",
      duration: 0.1,
      ease: "power3.inOut",
    }, "-=0.15");

    // 5. CLEAN OVERLAY EXIT
    tl.to(overlayRef.current, {
      opacity: 0,
      duration: 0.1,
      ease: "power2.inOut",
    }, "-=0.15");

    return () => {
      tl.kill();
    };
  }, [isFinished]);

  if (isFinished) return null;

  return (
    <div
      ref={overlayRef}
      id="preloader-overlay"
      className="fixed inset-0 z-[99999] bg-[#FFFFFF] flex items-center justify-center overflow-hidden pointer-events-none"
    >
      <svg 
        className="w-full h-full"
        viewBox="0 0 100 100"
        preserveAspectRatio="xMidYMid slice"
        aria-hidden="true"
      >
        <defs>
          <mask id="lw-portal-mask-fixed">
            <rect x="0" y="0" width="100" height="100" fill="white" />
            <text
              ref={portalMaskRef}
              x="50"
              y="50"
              fill="black"
              dominantBaseline="central"
              textAnchor="middle"
              className="font-black uppercase tracking-tighter"
              style={{
                fontSize: '24px',
                fontFamily: "'Syne', sans-serif"
              }}
            >
              LW
            </text>
          </mask>
        </defs>

        {/* The white overlay with the portal hole */}
        <rect 
          x="0" 
          y="0" 
          width="100" 
          height="100" 
          fill="white" 
          mask="url(#lw-portal-mask-fixed)" 
        />

        {/* The SOLID SYMBOL (Visible initially) */}
        {/* We keep this on top initially so the user sees the LW logo */}
        {/* Then we fade it out during zoom to 'enter' the portal */}
        <text
          ref={solidTextRef}
          x="50"
          y="50"
          fill="black"
          dominantBaseline="central"
          textAnchor="middle"
          className="font-black uppercase tracking-tighter"
          style={{
            fontSize: '24px',
            fontFamily: "'Syne', sans-serif"
          }}
        >
          LW
        </text>
      </svg>
    </div>
  );
}
