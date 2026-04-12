"use client";
import { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const posRef = useRef({ x: -200, y: -200 });
  const targetRef = useRef({ x: -200, y: -200 });
  const speedRef = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      // Calculate instantaneous speed for dynamic rotation/stretch
      speedRef.current = {
        x: e.clientX - targetRef.current.x,
        y: e.clientY - targetRef.current.y
      };
      targetRef.current = { x: e.clientX, y: e.clientY };
    };
    window.addEventListener("mousemove", onMove);

    let raf: number;
    let rotation = 0;

    const animate = () => {
      // Optimized LERP (Linear Interpolation) for butter-smooth tracking
      // Increased from 0.14 to 0.28 to better sync with real-time mouse movement
      const lerpFactor = 0.85; 
      posRef.current.x += (targetRef.current.x - posRef.current.x) * lerpFactor;
      posRef.current.y += (targetRef.current.y - posRef.current.y) * lerpFactor;

      // Dynamic rotation based on movement speed
      const targetRotation = Math.min(Math.max(speedRef.current.x * 0.1, -15), 15);
      rotation += (targetRotation - rotation) * 0.1;

      if (cursorRef.current) {
        // Single transform for hardware acceleration (3D)
        cursorRef.current.style.transform = `translate3d(${posRef.current.x}px, ${posRef.current.y}px, 0) rotate(${rotation}deg)`;
      }
      
      raf = requestAnimationFrame(animate);
    };
    raf = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <>
      {/* Hide default cursor globally */}
      <style>{`* { cursor: none !important; }`}</style>

      {/* Custom cursor element - PRO SIZE & SMOOTHNESS */}
      <div
        ref={cursorRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: 64, // Increased size for premium feel
          height: 64,
          marginLeft: -32,
          marginTop: -32,
          willChange: "transform",
        }}
      >
        <img
          src="/Images/new(Navbar).png"
          alt=""
          className="w-full h-full object-contain filter drop-shadow-[0_0_20px_rgba(1,168,107,0.4)]"
          style={{ transition: 'transform 0.1s ease-out' }}
        />
      </div>
    </>
  );
}
