"use client";
import React, { useEffect, useRef } from "react";

export default function DigitalGrid() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let width = (canvas.width = document.documentElement.clientWidth);
    let height = (canvas.height = document.documentElement.clientHeight);

    const chars = "LW+=-01/*X".split("");
    const fontSize = 18; // Increased size to reduce draw calls by ~50%
    const columns = Math.ceil(width / fontSize);
    const rows = Math.ceil(height / fontSize);
    
    let scrollOffset = 0;
    let launchProgress = 0;
    let isLaunching = false;

    // Mouse tracking for highlight effect
    let mouseX = -1000;
    let mouseY = -1000;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const triggerNextLaunch = () => {
      isLaunching = true;
      launchProgress = 0;
      setTimeout(triggerNextLaunch, 12000); 
    };
    
    setTimeout(triggerNextLaunch, 4500);

    const onResize = () => {
      width = canvas.width = document.documentElement.clientWidth;
      height = canvas.height = document.documentElement.clientHeight;
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("mousemove", onMouseMove);

    const render = () => {
      ctx.fillStyle = "#FFFFFF";
      ctx.fillRect(0, 0, width, height);

      ctx.font = `${fontSize}px monospace`;
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      scrollOffset += 0.4;
      if (isLaunching) {
        launchProgress += 0.0035; 
        if (launchProgress > 1.2) isLaunching = false;
      }

      // DIAGONAL Trajectory: Bottom-Right to Top-Left
      const rX = width - (launchProgress * (width + 1200));
      const rY = height - (launchProgress * (height + 1200));
      const rAngle = Math.atan2(-1, -1) + Math.PI / 2; 

      for (let i = 0; i < columns; i++) {
        for (let j = 0; j < rows; j++) {
          const x = i * fontSize;
          const y = Math.floor((j * fontSize + scrollOffset) % height);

          // Skip drawing if characters are too far outside viewport to save cycles
          if (x < -fontSize || x > width + fontSize || y < -fontSize || y > height + fontSize) continue;

          // Local coordinates for the rocket
          const rx = (x - rX) * Math.cos(rAngle) + (y - rY) * Math.sin(rAngle);
          const ry = -(x - rX) * Math.sin(rAngle) + (y - rY) * Math.cos(rAngle);

          // 1. Mouse Fluid Highlight (Organic Wobble)
          const dx = x - mouseX;
          const dy = y - mouseY;
          const distToMouseSq = dx * dx + dy * dy; // Use squared distance to avoid sqrt
          
          const time = Date.now() * 0.002;
          const wobble = Math.sin(time + i * 0.3) * 20 + Math.cos(time * 0.8 + j * 0.3) * 20;
          const threshold = 80 + wobble;
          const isHighlighted = distToMouseSq < (threshold * threshold);

          let isInRocket = false;
          let isPart = "";

          // Rocket Logic
          if (ry < 0 && ry > -40 && Math.abs(rx) < (40 + ry) * 0.8) {
            isInRocket = true;
            isPart = "nose";
          }
          const bodyW = 45;
          const normalizedY = (ry - 100) / 100;
          const bulge = Math.sqrt(Math.max(0, 1 - normalizedY * normalizedY));
          if (ry >= 0 && ry < 200 && Math.abs(rx) < bulge * bodyW) {
             isInRocket = true;
             const distToWin = Math.sqrt(rx * rx + (ry - 100) * (ry - 100));
             if (distToWin < 18) isPart = "window";
             else isPart = "body";
          }
          if (ry > 140 && ry < 220) {
            const finX = Math.abs(rx);
            if (finX > bodyW * 0.8 && finX < 85) {
               const finProg = (ry - 140) / 80;
               if (finX < 40 + (finProg * 60)) isInRocket = true;
            }
          }
          if (ry >= 200 && ry < 220 && Math.abs(rx) < 25) isInRocket = true;
          
          let isFlame = false;
          if (ry >= 220 && ry < 500 && Math.abs(rx) < (500 - ry) * 0.3) isFlame = true;

          const char = chars[Math.floor((i + j + Math.floor(scrollOffset / 10)) % chars.length)];

          if (isInRocket) {
              ctx.fillStyle = isPart === "window" ? "rgba(0,0,0,0.1)" : "#01a86b";
              ctx.fillText(char, x, y);
          } else if (isFlame) {
              ctx.fillStyle = `rgba(0, 0, 0, ${Math.random() * 0.4})`;
              ctx.fillText(char, x, y);
          } else if (isHighlighted) {
              // Interactive Highlight: Turn characters green and slightly more opaque when mouse is near
              ctx.fillStyle = `rgba(1, 168, 107, 0.4)`; // Emerald Green highlight
              ctx.fillText(char, x, y);
          } else {
              ctx.fillStyle = `rgba(0, 0, 0, 0.08)`;
              ctx.fillText(char, x, y);
          }
        }
      }
      requestAnimationFrame(render);
    };

    render();

    return () => {
      window.removeEventListener("resize", onResize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 z-0 pointer-events-none"
      style={{ width: '100vw', height: '100vh' }}
    />
  );
}
