"use client"
import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BlinkingCursor = () => (
    <motion.span
        animate={{ opacity: [1, 0] }}
        transition={{ repeat: Infinity, duration: 0.8, ease: "linear" }}
        className="inline-block w-[0.08em] h-[0.85em] bg-[#111] ml-2 align-baseline"
        style={{ transform: 'translateY(0.1em)' }}
    />
);

const AboutTypewriter = () => {
    const fullText = "ABOUT\nUS.";
    const [displayed, setDisplayed] = useState("");
    const [started, setStarted] = useState(false);

    useEffect(() => {
        if (!started) return;
        let i = 0;
        const interval = setInterval(() => {
            setDisplayed(fullText.substring(0, i + 1));
            i++;
            if (i === fullText.length) clearInterval(interval);
        }, 80); 
        return () => clearInterval(interval);
    }, [started]);

    const lines = displayed.split('\n');
    const aboutPart = lines[0] || "";
    const usPart = lines.length > 1 ? lines[1] : "";

    return (
        <motion.div 
            onViewportEnter={() => setStarted(true)} 
            viewport={{ once: true, amount: 0.6 }}
            className="flex flex-col relative"
        >
            <div className="opacity-0 pointer-events-none select-none flex flex-col items-start" aria-hidden="true">
                <div>ABOUT</div>
                <div>US.</div>
            </div>
            
            <div className="absolute inset-0 flex flex-col items-start">
                <div className="flex items-center">
                    <span style={{ whiteSpace: 'pre' }}>{aboutPart}</span>
                    {lines.length === 1 && <BlinkingCursor />}
                </div>
                
                {lines.length > 1 && (
                <div className="flex items-center text-gray-200/40 relative overflow-hidden w-max">
                    {usPart}
                    <BlinkingCursor />
                    <motion.div
                        className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-[200%] opacity-40 hidden md:block"
                        animate={{ x: ["-100%", "100%"] }}
                        transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                        style={{ mixBlendMode: 'overlay' }}
                    />
                </div>
                )}
            </div>
        </motion.div>
    );
};

const TypewriterText = ({ text, active }: { text: string, active: number }) => {
    const [displayedText, setDisplayedText] = useState("");
    
    useEffect(() => {
        let isMounted = true;
        setDisplayedText("");
        let i = 0;
        
        const type = () => {
            if (!isMounted) return;
            if (i < text.length) {
                setDisplayedText(text.substring(0, i + 1));
                i++;
                setTimeout(type, 25); // Throttled slightly for stability
            }
        };

        const startTimeout = setTimeout(type, 100); // Small initial delay

        return () => {
            isMounted = false;
            clearTimeout(startTimeout);
        };
    }, [text, active]);

    return <span>{displayedText}</span>;
};

const team = [
    { name: "AAVANI", role: "VISUAL IDENTITY & DESIGN", imageUrl: "/aavani.jpeg", desc: "Aavani transforms brand visions into high-impact visual identities. She blends art and strategy to create design systems that resonate." },
    { name: "SAHIL", role: "BACKEND DEVELOPER", imageUrl: "/images/sahil_card_image.jpeg", desc: "Sahil works on the core systems that run behind the scenes. From handling data to building scalable logic, he makes sure everything functions efficiently." },
    { name: "NAMAN", role: "SECURITY & TESTING", imageUrl: "/images/naman_id.png", desc: "Naman ensures that every product is secure, stable, and production-ready. He handles deployment, hosting, and testing in real-world conditions." }
];

export default function Team() {
    const [activeIndex, setActiveIndex] = useState(0);
    const [isScanning, setIsScanning] = useState(false);
    const [glitch, setGlitch] = useState(false);

    useEffect(() => {
        setIsScanning(true);
        setGlitch(true);
        const timer1 = setTimeout(() => setIsScanning(false), 800);
        const timer2 = setTimeout(() => setGlitch(false), 300);
        return () => {
            clearTimeout(timer1);
            clearTimeout(timer2);
        };
    }, [activeIndex]);

    return (
        <section id="team" className="w-full flex justify-center pt-20 pb-40 px-4 md:px-0 relative z-50 bg-white overflow-visible">
            {/* Massive WORKS text peek-a-boo from top */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-[45%] md:-translate-y-[55%] pointer-events-none select-none whitespace-nowrap flex z-0" style={{ perspective: "1500px" }}>
                {"WORKS".split('').map((char, i) => (
                    <motion.span
                        key={i}
                        className="text-[22vw] md:text-[23vw] font-black text-black leading-none inline-block transform-gpu"
                        initial={{ opacity: 0, y: 100, rotateX: -60, scale: 0.8 }}
                        whileInView={{ opacity: 0.2, y: 0, rotateX: 0, scale: 1 }}
                        viewport={{ once: false, amount: 0.2 }}
                        transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                        style={{ transformOrigin: "50% 100%" }}
                    >
                        {char}
                    </motion.span>
                ))}
            </div>

            {/* CONTAINER MAX WIDTH: 1650px */}
            <div className="section-container relative z-10 max-w-[1700px]">
                <h1 className="text-[9.5vw] font-black tracking-tighter leading-[0.82] text-black uppercase antialiased mb-32 relative">
                    <AboutTypewriter />
                </h1>

                {/* GRID: Increased Gap by 40% for terminal-to-right impact */}
                <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-32 items-start">
                    {/* Description Column - PARAGRAPH FONT SIZE INCREASED BY 20% */}
                    <motion.div 
                        initial={{ opacity: 0, x: -40 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="space-y-12 pr-10 relative"
                    >
                        {/* Corner HUD Brackets for high-tech aesthetic */}
                        <div className="absolute -top-6 -left-6 w-12 h-12 border-t border-l border-[#01a86b]/40 pointer-events-none" />
                        <div className="absolute -bottom-6 -right-6 w-12 h-12 border-b border-r border-[#01a86b]/40 pointer-events-none" />

                        <div className="space-y-12">
                            <motion.p className="text-xl md:text-[25px] text-gray-500 leading-relaxed font-medium tracking-tight" style={{ fontFamily: '"Libre Franklin", sans-serif' }}>
                                We are <span className="text-black font-bold">LaunchWeb</span>, a freelance digital studio focused on building high-performance websites and applications. We combine design, technology, and strategy to help ideas launch, scale, and stand out.
                            </motion.p>
                            <motion.p className="text-xl md:text-[25px] text-gray-400 leading-relaxed font-medium tracking-tight" style={{ fontFamily: '"Libre Franklin", sans-serif' }}>
                                Our approach is simple — <span className="text-black/80 font-bold">clean design</span>, powerful development, and seamless user experience. Every product we build is crafted with precision to perform efficiently in real-world conditions.
                            </motion.p>
                            <motion.p className="text-xl md:text-[25px] text-gray-400 leading-relaxed font-medium tracking-tight" style={{ fontFamily: '"Libre Franklin", sans-serif' }}>
                                We create <span className="text-[#01a86b] font-bold">fast, reliable, and scalable</span> solutions — delivering digital experiences that make a real impact.
                            </motion.p>
                        </div>

                        <div className="pt-10 border-t border-gray-100 flex gap-10 opacity-30">
                            <div className="flex flex-col">
                                <span className="font-mono text-[8px] uppercase mb-1">DATA_STATUS</span>
                                <span className="font-mono text-[9px] text-black font-bold">ACTIVE</span>
                            </div>
                            <div className="flex flex-col">
                                <span className="font-mono text-[8px] uppercase mb-1">STREAK_ID</span>
                                <span className="font-mono text-[9px] text-black font-bold">LW_01</span>
                            </div>
                        </div>
                    </motion.div>

                    {/* TERMINAL START */}
                    <motion.div 
                        initial={{ opacity: 0, y: 40, scale: 0.98 }}
                        whileInView={{ opacity: 1, y: 0, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="w-full bg-white border border-gray-100 rounded-sm shadow-[0_45px_160px_-40px_rgba(0,0,0,0.1)] flex flex-col overflow-hidden h-[630px] relative"
                    >
                        {/* Title Bar */}
                        <div className="h-12 bg-[#f1f1f1] border-b border-gray-200 flex items-center px-6 justify-between shrink-0">
                            <div className="flex gap-2.5">
                                <div className="w-3.5 h-3.5 rounded-full bg-[#ff5f56]" />
                                <div className="w-3.5 h-3.5 rounded-full bg-[#ffbd2e]" />
                                <div className="w-3.5 h-3.5 rounded-full bg-[#27c93f]" />
                            </div>
                            <div className="font-mono text-[10px] text-gray-400 uppercase tracking-[0.4em] flex items-center gap-2">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#01a86b] animate-pulse" />
                                LW_TERMINAL — ZSH
                            </div>
                            <div className="w-16 text-right">
                                <span className="font-mono text-[10px] text-gray-300">80x24</span>
                            </div>
                        </div>

                        <div className="flex flex-row grow overflow-hidden">
                            {/* Side Panel */}
                            <div className="w-56 md:w-64 border-r border-gray-50 flex flex-col bg-white">
                                <div className="p-10 border-b border-gray-50">
                                    <span className="font-mono text-[11px] uppercase font-bold text-gray-200 tracking-widest">/NODES/TEAM</span>
                                </div>
                                <div className="flex flex-col py-6">
                                    {team.map((member, i) => (
                                        <button 
                                            key={i}
                                            onClick={() => setActiveIndex(i)}
                                            className={`flex items-center gap-6 px-10 py-6 transition-all duration-300 relative ${activeIndex === i ? 'text-[#01a86b]' : 'text-gray-300'}`}
                                        >
                                            <span className={`font-mono text-[13px] font-bold ${activeIndex === i ? 'opacity-100' : 'opacity-25'}`}>
                                                {`0${i + 1}`}
                                            </span>
                                            <span className={`font-mono text-[15px] font-bold uppercase tracking-widest truncate`}>
                                                {member.name}
                                            </span>
                                            {activeIndex === i && (
                                                <motion.div layoutId="t-pill" className="absolute right-0 w-[4px] h-[60%] bg-[#01a86b]" />
                                            )}
                                        </button>
                                    ))}
                                </div>
                                <div className="mt-auto p-10 flex flex-col gap-4">
                                    <div className="font-mono text-[11px] text-gray-200 space-y-1.5">
                                        <p>MEM: 4.2GB</p>
                                        <p>CPU: 12%</p>
                                        <p>NET: OK</p>
                                    </div>
                                    <div className="w-24 h-12 bg-gray-50/50 rounded-sm" />
                                </div>
                            </div>

                            {/* Main Viewport */}
                            <div className="grow flex flex-col md:flex-row bg-white relative">
                                <div className="w-full md:w-[60%] p-14 pt-8 flex flex-col h-full bg-white relative z-10 shrink-0">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeIndex}
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            className="flex flex-col h-full"
                                        >
                                            {/* TERMINAL TEXT INCREASED BY 10% */}
                                            <div className="mb-8">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <span className="text-[#01a86b] font-mono font-bold text-[14px]">{'>'}</span>
                                                    <span className="font-mono text-[12px] text-gray-300 tracking-wider font-medium">SYSTEM.FETCH_INTERNAL("{team[activeIndex].name}")</span>
                                                </div>
                                                <div className="flex items-center gap-6 mb-4">
                                                    <h3 className="text-8xl font-black text-black leading-none tracking-tighter uppercase" style={{ fontFamily: '"Libre Franklin", sans-serif' }}>
                                                        {team[activeIndex].name}
                                                    </h3>
                                                    <div className="w-12 h-16 bg-[#97d8c0]" />
                                                </div>
                                                <p className="font-mono text-[15px] font-bold uppercase text-[#01a86b] tracking-[0.14em] mb-12" style={{ fontFamily: '"Libre Franklin", sans-serif' }}>
                                                    {team[activeIndex].role}
                                                </p>
                                            </div>

                                            <div className="space-y-8 border-l-2 border-gray-50 pl-12">
                                                <span className="font-mono text-[12px] text-gray-200 uppercase tracking-widest block mb-1.5 font-bold">DATA_01_RECAP</span>
                                                <div className="font-mono text-[19px] text-gray-500 leading-relaxed max-w-[440px]" style={{ fontFamily: '"Libre Franklin", sans-serif' }}>
                                                    <TypewriterText text={team[activeIndex].desc} active={activeIndex} />
                                                </div>
                                            </div>

                                            <div className="mt-auto pt-12 flex flex-col gap-10">
                                                <div className="bg-gray-50/60 p-6 rounded-sm flex items-center justify-between border border-gray-50">
                                                    <span className="font-mono text-[12px] text-gray-400 font-bold uppercase tracking-widest">ENCRYPTION</span>
                                                    <span className="font-mono text-[12px] font-bold text-[#01a86b] tracking-wider">AES_256_ACTIVE</span>
                                                </div>
                                                <div className="flex justify-between items-end">
                                                    <div className="flex flex-col">
                                                        <span className="font-mono text-[11px] text-gray-200 mb-2 uppercase font-bold tracking-widest">LOG_LAST_MODIFIED</span>
                                                        <span className="font-mono text-[13px] text-gray-400 font-bold uppercase tracking-tight opacity-80">26.03.2026 // 22:04</span>
                                                    </div>
                                                    <div className="w-18 h-18 bg-[#97d8c0] rounded-sm shadow-sm" />
                                                </div>
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>

                                {/* Photo Panel */}
                                <div className="hidden md:flex grow p-14 items-center justify-center bg-white border-l border-gray-50 relative pointer-events-none">
                                    <div className="absolute inset-0 opacity-10"
                                        style={{
                                            backgroundImage: `linear-gradient(#f0f0f0 1px, transparent 1px), linear-gradient(90deg, #f0f0f0 1px, transparent 1px)`,
                                            backgroundSize: '28px 28px'
                                        }}
                                    />
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={activeIndex}
                                            initial={{ opacity: 0, scale: 0.96 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className="relative w-full aspect-[4/5] max-w-[530px] shadow-[0_30px_70px_-20px_rgba(0,0,0,0.12)] rounded-sm overflow-hidden bg-white"
                                        >
                                            {/* IMAGE SIZE INCREASED BY OVER 20% (max-w-[530px]) */}
                                            {team[activeIndex].imageUrl ? (
                                                <img 
                                                    src={team[activeIndex].imageUrl} 
                                                    alt={team[activeIndex].name} 
                                                    className="w-full h-full object-cover object-top"
                                                />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-50/50">
                                                    <span className="text-gray-100 font-bold text-9xl">{team[activeIndex].name[0]}</span>
                                                </div>
                                            )}
                                            {isScanning && (
                                                <motion.div 
                                                    initial={{ top: "0%" }}
                                                    animate={{ top: "100%" }}
                                                    transition={{ duration: 0.6 }}
                                                    className="absolute left-0 w-full h-[4px] bg-[#01a86b] shadow-[0_0_15px_#01a86b] z-30"
                                                />
                                            )}
                                            <div className="absolute bottom-0 right-0 bg-black text-white font-mono text-[12px] px-6 py-2.5 font-bold z-50 shadow-lg">
                                                ID: {team[activeIndex].name}
                                            </div>
                                        </motion.div>
                                    </AnimatePresence>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
