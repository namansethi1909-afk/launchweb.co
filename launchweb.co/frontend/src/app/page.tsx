"use client"
import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, useScroll, useTransform, useMotionValue, useSpring, AnimatePresence } from 'framer-motion';
import { ArrowUpRight, Layers, MonitorPlay, Infinity as InfinityIcon, Paperclip } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

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
        }, 80); // Quick typing!
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
            {/* The invisible skeleton to reserve exact space to prevent jumping layout */}
            <div className="opacity-0 pointer-events-none select-none flex flex-col items-start" aria-hidden="true">
                <div>ABOUT</div>
                <div>US.</div>
            </div>
            
            {/* The absolute overlay where actual typing happens */}
            <div className="absolute inset-0 flex flex-col items-start">
                <div className="flex items-center">
                    <span style={{ whiteSpace: 'pre' }}>{aboutPart}</span>
                    {lines.length === 1 && <BlinkingCursor />}
                </div>
                
                {lines.length > 1 && (
                <div className="flex items-center text-gray-200 relative overflow-hidden w-max">
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
        setDisplayedText("");
        let i = 0;
        const timer = setInterval(() => {
            if (i < text.length) {
                setDisplayedText(prev => prev + text.charAt(i));
                i++;
            } else {
                clearInterval(timer);
            }
        }, 15);
        return () => clearInterval(timer);
    }, [text, active]);

    return <span>{displayedText}</span>;
};

const MacTerminalTeam = ({ team, inline = false }: { team: any[], inline?: boolean }) => {
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
        <div className={`w-full flex justify-center ${inline ? 'py-0' : 'py-20'} px-4 md:px-0 relative z-10 bg-white`}>
            {/* THE FLOATING TERMINAL WINDOW */}
            <motion.div 
                initial={inline ? { opacity: 1 } : { opacity: 0, y: 40, scale: 0.95 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`w-full ${inline ? 'max-w-full' : 'max-w-3xl'} bg-white border border-gray-200 rounded-xl shadow-[0_40px_120px_-20px_rgba(0,0,0,0.15)] flex flex-col overflow-hidden h-[480px]`}
            >
                
                {/* MAC TITLE BAR */}
                <div className="h-10 bg-[#f1f1f1] border-b border-gray-200 flex items-center px-4 justify-between">
                    <div className="flex gap-2">
                        <div className="w-3 h-3 rounded-full bg-[#ff5f56] shadow-sm" />
                        <div className="w-3 h-3 rounded-full bg-[#ffbd2e] shadow-sm" />
                        <div className="w-3 h-3 rounded-full bg-[#27c93f] shadow-sm" />
                    </div>
                    <div className="font-mono text-[9px] text-gray-400 uppercase tracking-[0.3em] flex items-center gap-2">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#01a86b] animate-pulse" />
                        LW_TERMINAL — zsh
                    </div>
                    <div className="w-12 text-right">
                        <span className="font-mono text-[9px] text-gray-300">80x24</span>
                    </div>
                </div>

                <div className="flex flex-row flex-grow overflow-hidden">
                    
                    {/* SIDE NAV PANEL */}
                    <div className="w-40 md:w-48 border-r border-gray-100 flex flex-col bg-gray-50/30">
                        <div className="p-4 border-b border-gray-100">
                            <span className="font-mono text-[8px] uppercase font-bold text-gray-300 tracking-widest">/nodes/team</span>
                        </div>
                        <div className="flex flex-col py-2">
                            {team.map((member, i) => (
                                <button 
                                    key={i}
                                    onMouseEnter={() => setActiveIndex(i)}
                                    className={`group flex items-center gap-3 px-5 py-3.5 transition-all duration-300 relative ${activeIndex === i ? 'bg-white text-[#01a86b]' : 'text-gray-400 hover:text-gray-600'}`}
                                >
                                    <span className={`font-mono text-[10px] font-bold ${activeIndex === i ? 'opacity-100' : 'opacity-20'}`}>
                                        {`0${i + 1}`}
                                    </span>
                                    <span className={`font-mono text-[11px] font-bold uppercase tracking-widest truncate ${glitch && activeIndex === i ? 'animate-pulse' : ''}`}>
                                        {member.name}
                                    </span>
                                    {activeIndex === i && (
                                        <motion.div layoutId="nav-pill" className="absolute right-0 w-[2px] h-full bg-[#01a86b]" />
                                    )}
                                </button>
                            ))}
                        </div>
                        
                        <div className="mt-auto p-4 opacity-20 hidden md:block">
                            <div className="font-mono text-[7px] space-y-1 mb-4">
                                <p>MEM: 4.2GB</p>
                                <p>CPU: 12%</p>
                                <p>NET: OK</p>
                            </div>
                            <div className="h-10 w-full bg-gray-200 rounded-sm overflow-hidden relative">
                                <motion.div animate={{ x: ["-100%", "100%"] }} transition={{ duration: 2, repeat: Infinity, ease: "linear" }} className="absolute top-0 left-0 w-1/3 h-full bg-gray-300 transform -skew-x-12" />
                            </div>
                        </div>
                    </div>

                    {/* MAIN CONTENT AREA */}
                    <div className="flex-grow flex flex-col md:flex-row bg-white relative">
                        
                        {/* INFO SECTION */}
                        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col h-full bg-white relative z-10">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.1 }}
                                    className="flex flex-col h-full"
                                >
                                    <div className="mb-6">
                                        <div className="flex items-center gap-2 mb-2">
                                            <span className="text-[#01a86b] font-mono font-bold text-[10px]">{'>'}</span>
                                            <span className="font-mono text-[9px] text-gray-300">SYSTEM.FETCH_INTERNAL("{team[activeIndex].name.toUpperCase()}")</span>
                                        </div>
                                        <h3 className={`text-3xl md:text-4xl font-mono font-black text-black leading-none tracking-tighter uppercase mb-1 ${glitch ? 'skew-x-2 translate-x-1' : ''}`}>
                                            {team[activeIndex].name}
                                            <span className="inline-block w-4 h-6 bg-[#01a86b] ml-2 animate-pulse align-middle" />
                                        </h3>
                                        <p className="font-mono text-[10px] font-bold uppercase text-[#01a86b]/70 tracking-widest">
                                            {team[activeIndex].role}
                                        </p>
                                    </div>

                                    <div className="space-y-4 flex-grow border-l border-gray-50 pl-4">
                                        <div className="flex flex-col gap-1">
                                            <span className="font-mono text-[8px] text-gray-400">DATA_01_RECAP</span>
                                            <p className="font-mono text-[11px] text-gray-500 leading-relaxed max-w-[280px]">
                                                <TypewriterText text={team[activeIndex].desc} active={activeIndex} />
                                            </p>
                                        </div>
                                    </div>

                                    <div className="mt-8 flex flex-col gap-4">
                                        <div className="p-3 bg-gray-50 border border-gray-100 rounded flex items-center justify-between">
                                            <span className="font-mono text-[8px] text-gray-400">ENCRYPTION</span>
                                            <span className="font-mono text-[8px] font-bold text-[#01a86b]">AES_256_ACTIVE</span>
                                        </div>
                                        <div className="flex justify-between items-end">
                                            <div className="flex flex-col gap-1">
                                                <span className="font-mono text-[7px] text-gray-300">LOG_LAST_MODIFIED</span>
                                                <span className="font-mono text-[8px] text-gray-400 font-bold uppercase">26.03.2026 // 22:04</span>
                                            </div>
                                            <div className="w-10 h-10 border border-gray-100 rounded-sm flex items-center justify-center bg-gray-50 p-1">
                                                <div className="w-full h-full bg-[#01a86b] opacity-20 animate-pulse" />
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>

                        {/* IMAGE SECTION */}
                        <div className="hidden md:flex w-1/2 p-6 md:p-8 items-center justify-center bg-gray-50/20 border-l border-gray-100 relative overflow-hidden">
                            {/* Scanning Pattern overlay */}
                            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" 
                                style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '15px 15px' }} 
                            />

                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={activeIndex}
                                    initial={{ opacity: 0, scale: 0.98 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    exit={{ opacity: 0, scale: 1.02 }}
                                    transition={{ duration: 0.2 }}
                                    className="relative w-full aspect-[4/5] max-w-[200px]"
                                >
                                    <div className="absolute inset-0 border border-gray-200 rounded-sm shadow-xl overflow-hidden bg-white">
                                        {team[activeIndex].imageUrl ? (
                                            <img 
                                                src={team[activeIndex].imageUrl} 
                                                alt={team[activeIndex].name} 
                                                className="w-full h-full object-cover"
                                            />
                                        ) : (
                                            <div className="w-full h-full flex items-center justify-center bg-[#fafafa] relative overflow-hidden">
                                                <div className="absolute top-0 right-0 p-2 font-mono text-[6px] text-gray-300">NULL_PTR_ERROR</div>
                                                <div className="w-10 h-10 rounded-full border border-gray-100 flex items-center justify-center z-10 bg-white">
                                                    <span className="text-gray-200 font-bold text-lg">{team[activeIndex].name[0]}</span>
                                                </div>
                                            </div>
                                        )}

                                        {/* Scanner Line Effect */}
                                        {isScanning && (
                                            <motion.div 
                                                initial={{ top: "0%" }}
                                                animate={{ top: "100%" }}
                                                transition={{ duration: 0.6 }}
                                                className="absolute left-0 w-full h-[2px] bg-[#01a86b] shadow-[0_0_10px_#01a86b] z-30"
                                            />
                                        )}
                                        
                                        {/* CRT Flicker effect */}
                                        {glitch && (
                                            <div className="absolute inset-0 bg-white/20 z-40 animate-pulse" />
                                        )}

                                        {/* Digital Scanlines */}
                                        <div className="absolute inset-0 pointer-events-none bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.03)_50%),linear-gradient(90deg,rgba(255,0,0,0.01),rgba(0,255,0,0.01),rgba(0,0,255,0.01))] bg-[size:100%_2px,3px_100%] z-20" />
                                    </div>

                                    {/* Tech Label */}
                                    <div className="absolute -top-3 -right-3 font-mono text-[7px] text-white uppercase bg-black px-1.5 py-0.5 z-50">
                                        ID: {team[activeIndex].name.toUpperCase()}
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

const TestimonialMarquee = () => {
    const testimonials = [
        "“They quickly understood what we were trying to build and delivered a solution that felt clean, thoughtful, and exactly aligned with our needs.”",
        "“The entire process was smooth and well-managed, and the final product feels reliable, fast, and easy to use.”",
        "“What stood out was their attention to detail — everything was carefully done and nothing felt rushed or overlooked.”",
        "“They were easy to communicate with, very responsive, and delivered everything on time without unnecessary delays.”",
        "“They didn’t just execute the project, but also helped refine the idea and improve it along the way.”",
        "“From start to finish, the experience was straightforward and professional, with clear communication at every stage.”",
        "“The final result exceeded our expectations in terms of both design and performance — everything feels polished.”",
        "“They took the time to understand our goals and translated them into a product that actually works well in real use.”",
        "“Very reliable team — they delivered what was promised and ensured everything was working perfectly before completion.”",
        "“The balance between design and functionality was handled really well, making the overall experience feel seamless.”",
    ];

    // Double the array for seamless looping
    const doubledTestimonials = [...testimonials, ...testimonials];

    return (
        <section className="w-full bg-white py-16 pb-24 overflow-hidden relative">
            <div className="max-w-7xl mx-auto px-6 md:px-24 mb-10">
                <div className="flex items-center gap-3 mb-4">
                    <div className="w-8 h-[1px] bg-[#01a86b]" />
                    <span className="font-mono text-[9px] uppercase font-bold tracking-[0.4rem] text-[#01a86b]">Feedback.data</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-black uppercase antialiased" style={{ fontFamily: '"ITC Franklin Gothic LT", sans-serif' }}>
                    Trusted by builders.
                </h2>
            </div>

            <div className="relative flex whitespace-nowrap overflow-hidden pt-6 pb-6">
                <motion.div 
                    className="flex gap-6 pr-6"
                    animate={{ x: ["0%", "-50%"] }}
                    transition={{ 
                        duration: 9, 
                        repeat: Infinity, 
                        ease: "linear",
                        repeatType: "loop"
                    }}
                >
                    {doubledTestimonials.map((text, idx) => (
                        <div 
                            key={idx} 
                            className="flex-shrink-0 bg-white border border-[#01a86b]/20 px-10 py-2 rounded-xl w-[420px] group transition-all duration-700 hover:border-[#01a86b] hover:shadow-[0_20px_60px_-15px_rgba(1,168,107,0.15)] hover:translate-y-[-4px]"
                        >
                            <p className="text-gray-700 text-[14px] leading-relaxed font-medium tracking-tight whitespace-normal antialiased" style={{ fontFamily: '"ITC Franklin Gothic LT", sans-serif' }}>
                                {text}
                            </p>
                            <div className="mt-4 flex items-center justify-between opacity-40 group-hover:opacity-100 transition-opacity duration-500">
                                <div className="flex gap-1.5">
                                    {[1, 2, 3].map((s) => (
                                        <div key={s} className="w-1 h-1 rounded-full bg-[#01a86b]/20 group-hover:bg-[#01a86b] transition-colors" />
                                    ))}
                                </div>
                                <div className="flex items-center gap-2">
                                    <div className="w-1.5 h-1.5 rounded-full bg-[#01a86b] animate-pulse" />
                                    <span className="font-mono text-[7px] font-bold text-[#01a86b] uppercase tracking-widest">LIVE_FEED</span>
                                </div>
                            </div>
                        </div>
                    ))}
                </motion.div>
            </div>
            
            {/* Edge Gradients */}
            <div className="absolute top-0 bottom-0 left-0 w-40 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
            <div className="absolute top-0 bottom-0 right-0 w-40 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />
        </section>
    );
};

export default function Home() {
    const containerRef = useRef<HTMLDivElement>(null);
    const svgRef = useRef<SVGSVGElement>(null);
    const contentRef = useRef<HTMLDivElement>(null);
    const videoRef = useRef<HTMLVideoElement>(null);

    const [interests, setInterests] = useState<string[]>([]);
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [projectDetails, setProjectDetails] = useState('');

    const projectListRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress: lineProgress } = useScroll({
        target: projectListRef,
        offset: ["start center", "end center"]
    });

    const { scrollYProgress } = useScroll({
        target: contentRef,
        offset: ["start end", "end start"]
    });

    const textY = useTransform(scrollYProgress, [0, 1], [0, -30]);
    const textOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0.8]);
    const mockupY = useTransform(scrollYProgress, [0, 1], [0, -10]);

    const handleSendWhatsApp = () => {
        const text = `*New Lead*\nName: ${name}\nEmail: ${email}\nInterested in: ${interests.join(', ')}\nProject Details: ${projectDetails}`;
        const encodedText = encodeURIComponent(text);
        window.open(`https://wa.me/8452056470?text=${encodedText}`, '_blank');
    };

    useEffect(() => {
        // Dynamic import for LocomotiveScroll to avoid SSR errors
        let locomotiveScroll: any;
        (async () => {
            const LocomotiveScroll = (await import('locomotive-scroll')).default;
            locomotiveScroll = new LocomotiveScroll({
                lenisOptions: {
                    wrapper: window,
                    content: document.documentElement,
                    lerp: 0.1,
                    duration: 1.5,
                    orientation: 'vertical',
                    smoothWheel: true,
                }
            });
        })();

        // Init ScrollTrigger later to sync with layout
        setTimeout(() => { ScrollTrigger.refresh(); }, 100);

        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: "top top",
                end: "+=150%", // Tighter pinned scroll distance to prevent stuck feeling
                pin: true,
                scrub: 1,
            }
        });

        // Reverse inclination: P low, S high (Top-Right to Bottom-Left flow)
        gsap.set(svgRef.current, {
            rotationX: 8,
            rotationY: 15,
            rotationZ: 10,
            scale: 0.55,
            transformPerspective: 2500,
        });

        tl.to(svgRef.current, {
            scale: 130,
            rotationX: 0,
            rotationY: 0,
            rotationZ: 0,
            transformOrigin: "50% 50%",
            ease: "power2.in"
        }, 0);

        tl.to(svgRef.current, {
            opacity: 0,
            ease: "power4.in",
        }, 0.85);

        // Removed the background color transition so it's seamlessly white

        return () => {
            tl.kill();
            if (locomotiveScroll) locomotiveScroll.destroy();
            ScrollTrigger.getAll().forEach(t => t.kill());
        };
    }, []);

    const containerVariants = {
        hidden: { opacity: 0 },
        show: { opacity: 1, transition: { staggerChildren: 0.15, delayChildren: 0.3 } }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 30 },
        show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 80, damping: 20 } }
    };


    return (
        <main className="bg-white text-black selection:bg-[#01a86b] selection:text-white">

            {/* ABOUT US SECTION */}
            <section className="w-full bg-white text-[#111] flex flex-col items-center justify-start px-6 md:px-24 pt-32 pb-16 relative z-50 overflow-hidden">
                {/* Tech Grid Background */}
                <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='40' height='40' viewBox='0 0 40 40' xmlns='http://www.w3.org/2000/svg'%3E%3Cpath d='M0 0h40v40H0V0zm1 1h38v38H1V1z' fill='%2301a86b' fill-opacity='1'/%3E%3C/svg%3E")`,
                        backgroundSize: '40px 40px'
                    }}
                />

                {/* Vertical Scanning Line */}
                <motion.div 
                    initial={{ top: "-10%" }}
                    animate={{ top: "110%" }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute left-0 right-0 h-[30vh] bg-gradient-to-b from-transparent via-[#01a86b]/10 to-transparent pointer-events-none z-0"
                />

                <div className="max-w-7xl w-full mx-auto relative z-10">
                    <h1 className="text-5xl md:text-[7vw] font-black tracking-tighter leading-[0.85] text-black uppercase antialiased mb-20" style={{ fontFamily: '"ITC Franklin Gothic LT", sans-serif' }}>
                        <AboutTypewriter />
                    </h1>
                    <div className="grid grid-cols-1 lg:grid-cols-[0.8fr_1.2fr] gap-20 items-start">
                        {/* Description Column */}
                        <motion.div 
                            initial={{ opacity: 0, x: -40 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.8 }}
                            className="space-y-8 pr-4 relative"
                        >
                            {/* Corner HUD Brackets */}
                            <div className="absolute -top-4 -left-4 w-8 h-8 border-t border-l border-[#01a86b]/40 pointer-events-none" />
                            <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b border-r border-[#01a86b]/40 pointer-events-none" />

                            <div className="space-y-12">
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.2 }}
                                    className="text-base md:text-[18px] text-gray-500 leading-relaxed font-medium tracking-tight antialiased" style={{ fontFamily: '"ITC Franklin Gothic LT", sans-serif' }}
                                >
                                    We are <span className="text-black font-bold border-b border-[#01a86b]/20">LaunchWeb</span>, a freelance digital studio focused on building high-performance websites and applications. We combine design, technology, and strategy to help ideas launch, scale, and stand out.
                                </motion.p>
                                
                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.4 }}
                                    className="text-base md:text-[18px] text-gray-400 leading-relaxed font-medium tracking-tight antialiased" style={{ fontFamily: '"ITC Franklin Gothic LT", sans-serif' }}
                                >
                                    Our approach is simple — <span className="text-black/80 font-bold border-b border-[#01a86b]/20">clean design</span>, powerful development, and seamless user experience. Every product we build is crafted with precision to perform efficiently in real-world conditions.
                                </motion.p>

                                <motion.p 
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ duration: 0.8, delay: 0.6 }}
                                    className="text-base md:text-[18px] text-gray-400 leading-relaxed font-medium tracking-tight antialiased" style={{ fontFamily: '"ITC Franklin Gothic LT", sans-serif' }}
                                >
                                    We create <span className="text-[#01a86b] font-bold">fast, reliable, and scalable</span> solutions — delivering digital experiences that make a real impact.
                                </motion.p>
                            </div>

                            <div className="pt-8 border-t border-gray-100 flex gap-12 opacity-30">
                                <div className="flex flex-col">
                                    <span className="font-mono text-[7px] uppercase mb-1">DATA_STATUS</span>
                                    <span className="font-mono text-[9px] text-black">ACTIVE</span>
                                </div>
                                <div className="flex flex-col">
                                    <span className="font-mono text-[7px] uppercase mb-1">STREAK_ID</span>
                                    <span className="font-mono text-[9px] text-black">LW_01</span>
                                </div>
                            </div>
                        </motion.div>

                        {/* Terminal Column */}
                        <div className="relative translate-y-0 lg:translate-y-[-10%] transition-transform duration-700">
                            <MacTerminalTeam team={[
                                { name: "AAVANI", role: "Visual Identity & Design", imageUrl: "/image.png", desc: "Aavani transforms brand visions into high-impact visual identities. She blends art and strategy to create design systems that resonate." },
                                { name: "Sahil", role: "Backend Developer", imageUrl: "", desc: "Sahil works on the core systems that run behind the scenes. From handling data to building scalable logic, he makes sure everything functions efficiently." },
                                { name: "Naman", role: "Security & Testing", imageUrl: "", desc: "Naman ensures that every product is secure, stable, and production-ready. He handles deployment, hosting, and testing in real-world conditions." }
                            ]} inline />
                        </div>
                    </div>
                </div>
            </section>

            <TestimonialMarquee />

            <div ref={containerRef} className="relative w-full bg-white overflow-hidden">

                {/* Small Coded Tech Pattern Overlay */}
                <div className="absolute inset-0 z-0 opacity-[0.025] pointer-events-none mix-blend-multiply"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='180' height='180' viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Ctext x='15' y='25' font-family='monospace' font-size='10' letter-spacing='2' fill='%23000'%3E01 / xLW+ - 01%3C/text%3E%3Ctext x='45' y='70' font-family='monospace' font-size='10' letter-spacing='2' fill='%2301a86b'%3E* XLW = - 01%3C/text%3E%3Ctext x='15' y='115' font-family='monospace' font-size='10' letter-spacing='2' fill='%23000'%3E01 / xLW+%3C/text%3E%3Ctext x='75' y='160' font-family='monospace' font-size='10' letter-spacing='2' fill='%23000'%3EXLW = - 01%3C/text%3E%3C/svg%3E")`,
                        backgroundSize: '180px 180px',
                        backgroundRepeat: 'repeat'
                    }}
                />

                {/* Flashy Shiny White Layer - Blinding Screen Over Tech Pattern */}
                <motion.div
                    className="absolute inset-0 z-10 pointer-events-none mix-blend-screen opacity-100"
                    animate={{ backgroundPosition: ["200% 0%", "-200% 0%"] }}
                    transition={{ repeat: Infinity, duration: 6, ease: "linear" }}
                    style={{
                        backgroundImage: "linear-gradient(110deg, transparent 25%, rgba(255,255,255,0.7) 40%, rgba(255,255,255,1) 50%, rgba(255,255,255,0.7) 60%, transparent 75%)",
                        backgroundSize: "200% 100%"
                    }}
                />

                {/* 1. Cinematic Hero Portal MASK */}
                <div className="absolute top-0 left-0 w-full h-screen z-40 pointer-events-none" style={{ perspective: "2500px" }}>
                    <svg
                        ref={svgRef}
                        className="absolute z-10 w-[330%] h-[330%] top-[-115%] left-[-115%] object-cover pointer-events-none"
                        viewBox="0 0 2100 1200"
                        preserveAspectRatio="xMidYMid slice"
                    >
                        <defs>
                            <mask id="hero-mask">
                                <rect width="100%" height="100%" fill="white" />
                                <text
                                    x="50%"
                                    y="50%"
                                    dominantBaseline="central"
                                    textAnchor="middle"
                                    fill="black"
                                    style={{
                                        fontFamily: 'var(--font-unbounded), sans-serif',
                                        fontSize: '132px',
                                        fontWeight: 900,
                                        letterSpacing: '-0.04em'
                                    }}
                                >
                                    PROJ<tspan dx="-25">ECTS</tspan>
                                </text>
                            </mask>
                        </defs>
                        <rect width="100%" height="100%" fill="#e5e7eb" mask="url(#hero-mask)" />
                    </svg>

                    <div className="absolute top-0 left-0 w-full p-10 flex justify-end items-center z-20 pointer-events-none">
                        <div className="flex items-center gap-12 pointer-events-auto">
                            <div className="hidden md:flex gap-10 tracking-[0.3em] text-white mix-blend-difference text-[9px] font-black uppercase transition-all">
                                <span className="hover:text-[#01a86b] cursor-pointer transition-colors">Cases</span>
                                <span className="hover:text-[#01a86b] cursor-pointer transition-colors">About</span>
                                <span className="hover:text-[#01a86b] cursor-pointer transition-colors">Culture</span>
                            </div>
                            <div className="group flex items-center gap-3 text-white px-8 py-3.5 rounded-full font-black text-xs uppercase tracking-widest cursor-pointer hover:bg-black transition-all active:scale-95 shadow-lg" style={{ backgroundColor: '#01a86b', boxShadow: '0 4px 24px rgba(1,168,107,0.35)' }}>
                                Contact
                                <ArrowUpRight className="w-5 h-5 transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* 2. New Theme: Minimalist Light Gallery */}
                <section ref={contentRef} className="relative z-30 min-h-screen pt-32 pb-[30vw] md:pb-[25vw] px-6 md:px-24 border-t-0">
                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{ once: true, margin: "-10%" }}
                        className="max-w-7xl mx-auto"
                    >
                        <motion.div
                            initial="hidden"
                            whileInView="visible"
                            viewport={{ once: true, amount: 0.6 }}
                            className="flex flex-col lg:flex-row justify-between items-start lg:items-center mb-32 gap-16 relative w-full pt-10"
                        >
                            {/* Text Section */}
                            <motion.div style={{ y: textY, opacity: textOpacity }} className="max-w-2xl relative z-20">
                                <h2 className="font-mono text-[10px] tracking-[0.5em] uppercase mb-6 font-bold" style={{ color: '#01a86b' }}>The Portfolio</h2>
                                <h1 className="text-6xl md:text-[9vw] font-black tracking-tighter leading-[0.85] text-black uppercase flex flex-col">
                                    <motion.div
                                        variants={{
                                            hidden: { opacity: 0, x: -40, y: 20, scale: 0.98 },
                                            visible: {
                                                opacity: [0, 1, 1],
                                                x: [-40, 0, 0],
                                                y: [20, 0, 0],
                                                scale: [0.98, 0.98, 1],
                                                transition: { delay: 1, duration: 0.8, times: [0, 0.625, 1], ease: "easeOut" }
                                            }
                                        }}
                                    >
                                        OUR
                                    </motion.div>
                                    <motion.div
                                        variants={{
                                            hidden: { opacity: 0, x: 0, y: 20, scale: 0.98 },
                                            visible: {
                                                opacity: [0, 1, 1],
                                                y: [20, 0, 0],
                                                scale: [0.98, 0.98, 1],
                                                transition: { delay: 1.15, duration: 0.8, times: [0, 0.625, 1], ease: "easeOut" }
                                            }
                                        }}
                                        className="text-gray-200 relative overflow-hidden inline-block"
                                    >
                                        <motion.div
                                            className="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent w-[200%] opacity-40 hidden md:block"
                                            animate={{ x: ["-100%", "100%"] }}
                                            transition={{ duration: 4, ease: "linear", repeat: Infinity }}
                                            style={{ mixBlendMode: 'overlay' }}
                                        />
                                        PROJECTS
                                    </motion.div>
                                </h1>
                            </motion.div>


                        </motion.div>

                        <div className="max-w-5xl mx-auto relative" ref={projectListRef}>
                            {/* SVG Animated Wavy Line connecting projects */}
                            <div className="absolute inset-0 z-0 pointer-events-none hidden md:block" style={{ top: '8%', bottom: '5%' }}>
                                <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 100 100">
                                    <defs>
                                        <mask id="dash-mask">
                                            <motion.path 
                                                d="M 25,0 C 25,20 75,15 75,33 C 75,50 25,50 25,66 C 25,85 75,80 75,100" 
                                                fill="none" 
                                                stroke="white" 
                                                strokeWidth="10" 
                                                vectorEffect="non-scaling-stroke" 
                                                initial={{ pathLength: 0 }}
                                                whileInView={{ pathLength: 1 }}
                                                viewport={{ once: true, amount: 0.1 }}
                                                transition={{ duration: 1.5, ease: "easeOut" }}
                                            />
                                        </mask>
                                    </defs>
                                    <path 
                                        d="M 25,0 C 25,20 75,15 75,33 C 75,50 25,50 25,66 C 25,85 75,80 75,100" 
                                        fill="none" 
                                        stroke="#e5e7eb" 
                                        strokeWidth="2" 
                                        strokeDasharray="4 4" 
                                        vectorEffect="non-scaling-stroke" 
                                        mask="url(#dash-mask)"
                                    />
                                    <motion.path 
                                        d="M 25,0 C 25,20 75,15 75,33 C 75,50 25,50 25,66 C 25,85 75,80 75,100" 
                                        fill="none" 
                                        stroke="#111" 
                                        strokeWidth="2" 
                                        vectorEffect="non-scaling-stroke" 
                                        style={{ pathLength: lineProgress }} 
                                    />
                                </svg>
                            </div>
                            <div className="flex flex-col md:flex-row gap-x-12 gap-y-24 items-start relative z-10 w-full" style={{ perspective: '1200px' }}>
                                {/* LEFT COLUMN */}
                                <div className="flex flex-col gap-y-24 w-full md:w-1/2">
                                    {/* Card 1 — LetsUpgrade Pro */}
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: false, amount: 0.6 }}
                                        onViewportEnter={() => videoRef.current?.play()}
                                        onViewportLeave={() => videoRef.current?.pause()}
                                        className="group relative"
                                    >
                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0, scale: 0.9, y: 80, rotate: -3 },
                                                visible: {
                                                    opacity: 1, scale: [1, 1.04, 1], y: 0, rotate: 0,
                                                    transition: { scale: { delay: 0.1, duration: 0.3, ease: 'easeOut' }, default: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                                                }
                                            }}
                                            whileHover={{ scale: 1.05, rotateX: 2, rotateY: -3, boxShadow: "0px 30px 60px rgba(0,0,0,0.15)" }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="transform-gpu"
                                        >
                                            <a
                                                href="https://pro.letsupgrade.in/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block relative aspect-[4/3] w-full rounded-[32px] overflow-hidden bg-gray-50 cursor-pointer"
                                                aria-label="Open LetsUpgrade Pro"
                                            >
                                                <video
                                                    ref={videoRef}
                                                    src="/project1-preview.mov"
                                                    muted
                                                    loop
                                                    playsInline
                                                    autoPlay
                                                    className="absolute inset-0 w-full h-full object-contain transition-opacity duration-300 pointer-events-none"
                                                    style={{ opacity: 1 }}
                                                />
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#01a86b]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <div className="absolute top-5 right-5 w-9 h-9 rounded-full border border-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-3 group-hover:translate-y-0 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm">
                                                    <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                                                </div>
                                            </a>
                                        </motion.div>
                                        <div className="mt-5 border-b border-gray-100 pb-6 group-hover:border-[#01a86b]/60 transition-colors duration-300">
                                            <div className="flex justify-between items-start mb-1.5 overflow-hidden">
                                                <motion.h3
                                                    variants={{ hidden: { opacity: 0, y: 60, skewY: 5 }, visible: { opacity: 1, y: 0, skewY: 0, transition: { delay: 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                                    className="text-xl md:text-2xl font-semibold tracking-tight text-[#111] antialiased transition-transform duration-300 group-hover:-translate-y-0.5 leading-tight"
                                                >
                                                    LetsUpgrade Pro
                                                </motion.h3>
                                                <motion.span
                                                    variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                                    className="text-gray-300 font-mono text-[7px] uppercase font-light mt-1 shrink-0"
                                                >
                                                    © 2024
                                                </motion.span>
                                            </div>
                                            <motion.p
                                                variants={{ hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0, transition: { delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                                className="font-mono text-[8px] uppercase tracking-[0.3em] font-bold mb-2.5" style={{ color: '#01a86b' }}
                                            >
                                                Professional Learning
                                            </motion.p>
                                            <motion.p
                                                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                                className="text-[#111] opacity-70 text-[15px] font-medium tracking-tight leading-relaxed antialiased"
                                            >
                                                A professional learning platform with authentication, dashboards, and marketing integrations. Built with modern frontend technologies.
                                            </motion.p>
                                        </div>
                                    </motion.div>

                                    {/* Card 3 — ParkSmart */}
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: false, amount: 0.6 }}
                                        className="group relative"
                                    >
                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0, scale: 0.9, y: 80, rotate: -3 },
                                                visible: {
                                                    opacity: 1, scale: [1, 1.04, 1], y: 0, rotate: 0,
                                                    transition: { scale: { delay: 0.1, duration: 0.3, ease: 'easeOut' }, default: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                                                }
                                            }}
                                            whileHover={{ scale: 1.05, rotateX: 2, rotateY: -3, boxShadow: "0px 30px 60px rgba(0,0,0,0.15)" }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="transform-gpu"
                                        >
                                            <a
                                                href="https://parksmart-app.vercel.app/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block relative aspect-[4/3] w-full rounded-[32px] overflow-hidden bg-gray-50 cursor-pointer"
                                                aria-label="Open ParkSmart"
                                            >
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-gray-100 font-black text-[6vw] group-hover:text-gray-200 transition-colors uppercase tracking-widest opacity-30 select-none">03</span>
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#01a86b]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <div className="absolute top-5 right-5 w-9 h-9 rounded-full border border-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-3 group-hover:translate-y-0 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm">
                                                    <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                                                </div>
                                            </a>
                                        </motion.div>
                                        <div className="mt-5 border-b border-gray-100 pb-6 group-hover:border-[#01a86b]/60 transition-colors duration-300">
                                            <div className="flex justify-between items-start mb-1.5 overflow-hidden">
                                                <motion.h3
                                                    variants={{ hidden: { opacity: 0, y: 60, skewY: 5 }, visible: { opacity: 1, y: 0, skewY: 0, transition: { delay: 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                                    className="text-xl md:text-2xl font-semibold tracking-tight text-[#111] antialiased transition-transform duration-300 group-hover:-translate-y-0.5 leading-tight"
                                                >
                                                    ParkSmart
                                                </motion.h3>
                                                <motion.span
                                                    variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                                    className="text-gray-300 font-mono text-[7px] uppercase font-light mt-1 shrink-0"
                                                >
                                                    © 2024
                                                </motion.span>
                                            </div>
                                            <motion.p
                                                variants={{ hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0, transition: { delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                                className="font-mono text-[8px] uppercase tracking-[0.3em] font-bold mb-2.5" style={{ color: '#01a86b' }}
                                            >
                                                Smart Parking System
                                            </motion.p>
                                            <motion.p
                                                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                                className="text-[#111] opacity-70 text-[15px] font-medium tracking-tight leading-relaxed antialiased"
                                            >
                                                Built a smart parking management system to optimize urban mobility with a seamless interface and real-time tracking.
                                            </motion.p>
                                        </div>
                                    </motion.div>
                                </div>

                                {/* RIGHT COLUMN */}
                                <div className="flex flex-col gap-y-24 w-full md:w-1/2 md:mt-32">
                                    {/* Card 2 — Visual Learning */}
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: false, amount: 0.6 }}
                                        className="group relative"
                                    >
                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0, scale: 0.9, y: 80, rotate: -3 },
                                                visible: {
                                                    opacity: 1, scale: [1, 1.04, 1], y: 0, rotate: 0,
                                                    transition: { scale: { delay: 0.1, duration: 0.3, ease: 'easeOut' }, default: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                                                }
                                            }}
                                            whileHover={{ scale: 1.05, rotateX: 2, rotateY: -3, boxShadow: "0px 30px 60px rgba(0,0,0,0.15)" }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="transform-gpu"
                                        >
                                            <a
                                                href="https://visual-learning-sandy.vercel.app/week1"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block relative aspect-[3/4] w-full rounded-[32px] overflow-hidden bg-gray-50 cursor-pointer"
                                                aria-label="Open Visual Learning Platform"
                                            >
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-gray-100 font-black text-[6vw] group-hover:text-gray-200 transition-colors uppercase tracking-widest opacity-30 select-none">02</span>
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#01a86b]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <div className="absolute top-5 right-5 w-9 h-9 rounded-full border border-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-3 group-hover:translate-y-0 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm">
                                                    <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                                                </div>
                                            </a>
                                        </motion.div>
                                        <div className="mt-5 border-b border-gray-100 pb-6 group-hover:border-[#01a86b]/60 transition-colors duration-300">
                                            <div className="flex justify-between items-start mb-1.5 overflow-hidden">
                                                <motion.h3
                                                    variants={{ hidden: { opacity: 0, y: 60, skewY: 5 }, visible: { opacity: 1, y: 0, skewY: 0, transition: { delay: 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                                    className="text-xl md:text-2xl font-semibold tracking-tight text-[#111] antialiased transition-transform duration-300 group-hover:-translate-y-0.5 leading-tight"
                                                >
                                                    Visual Learning
                                                </motion.h3>
                                                <motion.span
                                                    variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                                    className="text-gray-300 font-mono text-[7px] uppercase font-light mt-1 shrink-0"
                                                >
                                                    © 2024
                                                </motion.span>
                                            </div>
                                            <motion.p
                                                variants={{ hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0, transition: { delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                                className="font-mono text-[8px] uppercase tracking-[0.3em] font-bold mb-2.5" style={{ color: '#01a86b' }}
                                            >
                                                Interactive Education
                                            </motion.p>
                                            <motion.p
                                                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                                className="text-[#111] opacity-70 text-[15px] font-medium tracking-tight leading-relaxed antialiased"
                                            >
                                                Interactive visual learning platform designed for engaging educational experiences with clean UI and structured modules.
                                            </motion.p>
                                        </div>
                                    </motion.div>

                                    {/* Card 4 — Supply Chain */}
                                    <motion.div
                                        initial="hidden"
                                        whileInView="visible"
                                        viewport={{ once: false, amount: 0.6 }}
                                        className="group relative"
                                    >
                                        <motion.div
                                            variants={{
                                                hidden: { opacity: 0, scale: 0.9, y: 80, rotate: -3 },
                                                visible: {
                                                    opacity: 1, scale: [1, 1.04, 1], y: 0, rotate: 0,
                                                    transition: { scale: { delay: 0.1, duration: 0.3, ease: 'easeOut' }, default: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } }
                                                }
                                            }}
                                            whileHover={{ scale: 1.05, rotateX: 2, rotateY: -3, boxShadow: "0px 30px 60px rgba(0,0,0,0.15)" }}
                                            transition={{ duration: 0.2, ease: "easeOut" }}
                                            className="transform-gpu"
                                        >
                                            <a
                                                href="https://naman1167.github.io/supply_chain/"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="block relative aspect-[3/4] w-full rounded-[32px] overflow-hidden bg-gray-50 cursor-pointer"
                                                aria-label="Open Supply Chain Platform"
                                            >
                                                <div className="absolute inset-0 flex items-center justify-center">
                                                    <span className="text-gray-100 font-black text-[6vw] group-hover:text-gray-200 transition-colors uppercase tracking-widest opacity-30 select-none">04</span>
                                                </div>
                                                <div className="absolute inset-0 bg-gradient-to-br from-[#01a86b]/10 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                                                <div className="absolute top-5 right-5 w-9 h-9 rounded-full border border-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 -translate-y-3 group-hover:translate-y-0 transition-all duration-300 bg-white/90 backdrop-blur-sm shadow-sm">
                                                    <ArrowUpRight className="w-3.5 h-3.5 text-black" />
                                                </div>
                                            </a>
                                        </motion.div>
                                        <div className="mt-5 border-b border-gray-100 pb-6 group-hover:border-[#01a86b]/60 transition-colors duration-300">
                                            <div className="flex justify-between items-start mb-1.5 overflow-hidden">
                                                <motion.h3
                                                    variants={{ hidden: { opacity: 0, y: 60, skewY: 5 }, visible: { opacity: 1, y: 0, skewY: 0, transition: { delay: 0.05, duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                                    className="text-xl md:text-2xl font-semibold tracking-tight text-[#111] antialiased transition-transform duration-300 group-hover:-translate-y-0.5 leading-tight"
                                                >
                                                    Supply Chain
                                                </motion.h3>
                                                <motion.span
                                                    variants={{ hidden: { opacity: 0, scale: 0.8 }, visible: { opacity: 1, scale: 1, transition: { delay: 0.1, duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                                    className="text-gray-300 font-mono text-[7px] uppercase font-light mt-1 shrink-0"
                                                >
                                                    © 2024
                                                </motion.span>
                                            </div>
                                            <motion.p
                                                variants={{ hidden: { opacity: 0, x: -60 }, visible: { opacity: 1, x: 0, transition: { delay: 0.15, duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                                className="font-mono text-[8px] uppercase tracking-[0.3em] font-bold mb-2.5" style={{ color: '#01a86b' }}
                                            >
                                                Blockchain Transparency
                                            </motion.p>
                                            <motion.p
                                                variants={{ hidden: { opacity: 0, y: 40 }, visible: { opacity: 1, y: 0, transition: { delay: 0.2, duration: 0.4, ease: [0.16, 1, 0.3, 1] } } }}
                                                className="text-gray-400 text-[12px] leading-relaxed"
                                            >
                                                A blockchain-inspired platform to track products from farm to table, ensuring complete transparency and trust in the supply chain.
                                            </motion.p>
                                        </div>
                                    </motion.div>
                                </div>
                            </div>
                        </div>


                    </motion.div>

                    {/* Decorative background text */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 pointer-events-none text-[22vw] md:text-[20vw] font-black text-black leading-none select-none -mb-[5vw] whitespace-nowrap flex" style={{ perspective: "1000px" }}>
                        {"WORKS".split('').map((char, i) => (
                            <motion.span
                                key={i}
                                initial={{ opacity: 0, y: 150, rotateX: -80, scale: 0.8, filter: "blur(20px)" }}
                                whileInView={{ opacity: 0.2, y: 0, rotateX: 0, scale: 1, filter: "blur(0px)" }}
                                viewport={{ once: false, margin: "0px 0px -10% 0px" }}
                                transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: i * 0.1 }}
                                className="inline-block transform-gpu"
                                style={{ transformOrigin: "50% 100%" }}
                            >
                                {char}
                            </motion.span>
                        ))}
                    </div>
                </section>

                {/* 3. Contact Section */}
                <section className="relative z-30 min-h-screen bg-white text-black px-6 md:px-24 py-32 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] border-t border-gray-100 flex items-center mt-[-3rem]">
                    <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
                        <h2 className="text-5xl md:text-[4.5rem] font-semibold tracking-tighter leading-[1.0] mb-11 md:mb-20 text-center text-[#111] antialiased" style={{ perspective: '1200px' }}>
                            {"Let’s discuss".split('').map((char, i) => (
                                <motion.span
                                    key={`row1-${i}`}
                                    className="inline-block"
                                    initial={{ opacity: 0, rotateX: -90, y: 15, filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.1))" }}
                                    whileInView={{ opacity: 1, rotateX: 0, y: 0, filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))" }}
                                    viewport={{ once: true, margin: '-10%' }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: i * 0.03 }}
                                    style={{ transformOrigin: "50% 100% -20px", transformStyle: "preserve-3d" }}
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                            <br />
                            {"your project".split('').map((char, i) => (
                                <motion.span
                                    key={`row2-${i}`}
                                    className="inline-block"
                                    initial={{ opacity: 0, rotateX: -90, y: 15, filter: "drop-shadow(0px 10px 15px rgba(0,0,0,0.1))" }}
                                    whileInView={{ opacity: 1, rotateX: 0, y: 0, filter: "drop-shadow(0px 0px 0px rgba(0,0,0,0))" }}
                                    viewport={{ once: true, margin: '-10%' }}
                                    transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1], delay: ("Let’s discuss".length + i) * 0.03 }}
                                    style={{ transformOrigin: "50% 100% -20px", transformStyle: "preserve-3d" }}
                                >
                                    {char === ' ' ? '\u00A0' : char}
                                </motion.span>
                            ))}
                        </h2>

                        <div className="w-full max-w-2xl relative">

                            <div className="mb-12">
                                <h3 className="text-xl md:text-2xl font-semibold tracking-tight mb-6 text-[#111] antialiased">What services are you looking for?</h3>
                                <div className="flex flex-wrap gap-2.5">
                                    {['Web Development', 'Mobile Applications', 'Custom Web Applications', 'Brand Identity Design'].map(tag => (
                                        <button
                                            key={tag}
                                            onClick={() => setInterests(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                                            className={`px-6 py-3 rounded-full border border-gray-300 text-[15px] font-medium tracking-tight transition-all duration-300 antialiased ${interests.includes(tag) ? 'bg-[#111] text-white border-[#111]' : 'hover:border-gray-400 text-[#111] bg-white hover:bg-gray-50'}`}
                                        >
                                            {tag}
                                        </button>
                                    ))}
                                </div>
                            </div>

                            <div className="space-y-8 mb-16">
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Your name"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        className="w-full border-b border-gray-300 pb-4 bg-transparent outline-none placeholder:text-[#9ca3af] text-lg md:text-xl transition-all focus:border-[#111] text-[#111] font-medium tracking-tight antialiased"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="email"
                                        placeholder="Email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full border-b border-gray-300 pb-4 bg-transparent outline-none placeholder:text-[#9ca3af] text-lg md:text-xl transition-all focus:border-[#111] text-[#111] font-medium tracking-tight antialiased"
                                    />
                                </div>
                                <div className="relative">
                                    <input
                                        type="text"
                                        placeholder="Tell us about your project"
                                        value={projectDetails}
                                        onChange={(e) => setProjectDetails(e.target.value)}
                                        className="w-full border-b border-gray-300 pb-4 bg-transparent outline-none placeholder:text-[#9ca3af] text-lg md:text-xl transition-all focus:border-[#111] text-[#111] font-medium tracking-tight antialiased"
                                    />
                                </div>
                            </div>

                            <div className="mb-24">
                                <label className="flex items-center gap-3 cursor-pointer w-max group py-2">
                                    <Paperclip className="w-5 h-5 text-black transform group-hover:-rotate-12 transition-transform duration-300" />
                                    <span className="text-xl font-bold text-black border-b-[2px] border-black pb-[2px] mb-[-2px] group-hover:text-gray-600 group-hover:border-gray-600 transition-colors">Add attachment</span>
                                    <input type="file" className="hidden" />
                                </label>
                            </div>

                            <div className="flex flex-col md:flex-row items-center md:items-start justify-between gap-6 md:gap-0 mt-8 relative">

                                <button
                                    onClick={handleSendWhatsApp}
                                    className="w-full md:w-auto px-12 py-5 rounded-[40px] border border-gray-300 text-[15px] font-medium text-black bg-white hover:bg-black hover:text-white hover:border-black transition-all duration-300 shadow-sm whitespace-nowrap"
                                >
                                    Send request
                                </button>


                            </div>

                        </div>
                    </div>
                </section>

            </div>
        </main>
    );
}
