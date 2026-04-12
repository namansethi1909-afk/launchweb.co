"use client";
import React, { useState, useEffect } from "react";
import gsap from "gsap";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 w-full z-[100] transition-all duration-700 h-28 flex items-center ${
        scrolled ? "bg-transparent h-24" : "bg-transparent"
      }`}
    >
      <div className="w-full px-6 flex items-center justify-between">
        {/* Brand Name - MOVED TO FAR LEFT AND INCREASED SIZE */}
        <a href="#hero" className="flex items-center gap-3 group relative -ml-4">
          <div className="h-40 w-auto">
            <img 
              src="/Images/new(Navbar).png" 
              alt="Launchweb Logo" 
              className="h-full w-auto object-contain"
            />
          </div>
        </a>

        {/* Global Links */}
        <div className="hidden md:flex items-center gap-16">
          {[
            { name: "Services", href: "#services" },
            { name: "Tools", href: "#stack" },
            { name: "Work", href: "#work" },
            { name: "Pricing", href: "#pricing" }
          ].map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-[14px] font-bold uppercase tracking-[0.4em] transition-all hover:text-black relative group"
            >
              {item.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-primary group-hover:w-full transition-all duration-700 ease-in-out" />
            </a>
          ))}
          <a
            href="/LAUNCHWEB.BROCHER.pdf"
            download="LAUNCHWEB.BROCHER.pdf"
            className="px-10 py-5 bg-black text-white text-[13px] font-bold uppercase tracking-[0.3em] rounded-full hover:shadow-[0_0_20px_rgba(1,168,107,0.4)] transition-all duration-500 hover:scale-105"
          >
            Brochure
          </a>
          <a
            href="#contact"
            className="px-10 py-5 bg-black text-white text-[13px] font-bold uppercase tracking-[0.3em] rounded-full hover:shadow-[0_0_20px_rgba(1,168,107,0.4)] transition-all duration-500 hover:scale-105"
          >
            Start Work
          </a>
        </div>

        {/* Dynamic Toggle for Elite Mobile Experience */}
        <div className="md:hidden flex flex-col gap-1.5 cursor-pointer">
          <div className="w-8 h-[2px] bg-black" />
          <div className="w-4 h-[2px] bg-black" />
        </div>
      </div>
    </nav>
  );
}
