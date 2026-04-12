"use client";
import React from "react";

const footerLinks = {
  Services: ["UI/UX Design", "Web Development", "Strategy", "Branding"],
  Company: ["Work", "Team", "Pricing", "Brochure"],
  Social: ["Twitter", "LinkedIn", "Dribbble", "GitHub"],
};

export default function Footer() {
  return (
    <footer className="border-t border-black/[0.03] pb-24 pt-48 md:pt-64 overflow-hidden relative">
      <div className="section-container !py-0">
        <div className="grid-layout mb-48">
          {/* Brand & Mission: Columns 1 to 4 */}
          <div className="md:col-span-4 lg:col-span-4">
            <a href="#" className="flex items-center gap-3 group mb-12">
              <div className="w-10 h-10 rounded-full bg-black group-hover:bg-primary transition-all duration-700" />
              <span className="font-display font-extrabold text-3xl tracking-tighter">
                launchweb<span className="text-primary">.</span>co
              </span>
            </a>
            <p className="text-lg font-medium leading-relaxed text-on-bg-variant max-w-sm opacity-60">
              The premium engine for digital expansion. We specialize in mission-critical design and high-performance engineering for the next generation of industry leaders.
            </p>
          </div>

          {/* Functional Links: Columns 6 to 12 with gaps */}
          <div className="md:col-span-8 lg:col-span-8 grid grid-cols-2 md:grid-cols-3 gap-24">
            {Object.entries(footerLinks).map(([category, links]) => (
              <div key={category}>
                <p className="text-[10px] font-extrabold uppercase tracking-[0.4em] mb-12 text-gray-400 underline decoration-primary underline-offset-8">
                  {category}
                </p>
                <ul className="space-y-6">
                  {links.map((link) => (
                    <li key={link}>
                      <a
                        href={link === "Brochure" ? "/LAUNCHWEB.BROCHER.pdf" : "#"}
                        download={link === "Brochure" ? "LAUNCHWEB.BROCHER.pdf" : undefined}
                        className="text-sm font-extrabold text-on-bg-variant hover:text-primary transition-all duration-500 hover:pl-2"
                      >
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Global Footer Meta */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12 pt-16 border-t border-black/[0.03] mt-auto">
          <p className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-gray-300">
            © 2026 launchweb.co. Built with GSAP & Intent.
          </p>
          <div className="flex items-center gap-16">
            <a href="#" className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-gray-300 hover:text-primary transition-colors">Privacy Mission</a>
            <a href="#" className="text-[10px] font-extrabold uppercase tracking-[0.4em] text-gray-300 hover:text-primary transition-colors">Terms of Scale</a>
          </div>
        </div>
      </div>
      
      {/* Absolute Bottom Logo Watermark */}
      <div className="absolute -bottom-20 -right-20 pointer-events-none opacity-[0.03] select-none">
          <span className="font-display text-[400px] font-extrabold tracking-tighter">LW</span>
      </div>
    </footer>
  );
}
