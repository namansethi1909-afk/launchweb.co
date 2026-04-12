"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { Paperclip, CheckCircle2 } from "lucide-react";

const OUR_PLANS = ["Basic", "Standard", "Premium", "Custom"];

export default function Contact() {
  const [interests, setInterests] = useState<string[]>([]);
  const [selectedPlan, setSelectedPlan] = useState<string>("");
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [projectDetails, setProjectDetails] = useState('');

  const handleSendWhatsApp = () => {
    let text = `*New Lead from launchweb.co*\n\n`;
    text += `*Name:* ${name}\n`;
    text += `*Email:* ${email}\n`;
    text += `*Selected Plan:* ${selectedPlan || "None"}\n`;
    text += `*Interested in:* ${interests.join(', ') || "Not specified"}\n`;
    text += `*Details:* ${projectDetails}\n\n`;
    
    if (selectedPlan) {
      text += `_I want the ${selectedPlan} Plan_`;
    }

    const encodedText = encodeURIComponent(text);
    window.open(`https://wa.me/8452056470?text=${encodedText}`, '_blank');
  };

  const handleSendEmail = () => {
    const serviceCategory = interests.join(', ') || "Custom Project";
    const subject = `Project Inquiry | ${serviceCategory} | ${name || "New Client"}`;
    
    let body = `PROJECT INQUIRY\n\n`;
    body += `I. CLIENT IDENTIFICATION\n\n`;
    body += `Name: ${name || "[Client Name]"}\n`;
    body += `Email: ${email || "[Client Email]"}\n\n`;
    
    body += `II. SERVICE SCOPE\n\n`;
    body += `Category: ${serviceCategory}\n\n`;
    
    body += `III. PROJECT BRIEF\n`;
    body += `${projectDetails || "[Project Description]"}\n\n`;
    
    body += `IV. ATTACHMENTS\n`;
    body += `[Please attach any relevant project documentation or assets to this email.]\n\n`;
    
    body += `I look forward to your response regarding the next steps and project timeline.\n\n`;
    body += `Regards,\n`;
    body += `${name || "[Client Name]"}`;

    const mailtoUrl = `mailto:namansethi1909@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailtoUrl;
  };

  return (
    <section id="contact" className="relative z-30 min-h-screen bg-white text-black px-6 md:px-24 py-32 rounded-t-[3rem] shadow-[0_-20px_40px_rgba(0,0,0,0.05)] border-t border-gray-100 flex items-center mt-[-3rem]">
      <div className="w-full max-w-4xl mx-auto flex flex-col items-center">
        <h2 className="text-6xl md:text-[5.5rem] font-semibold tracking-tighter leading-[1.0] mb-11 md:mb-20 text-center text-[#111] antialiased">
          {"Let’s discuss".split('').map((char, i) => (
            <motion.span
              key={`row1-${i}`}
              className="inline-block"
              initial={{ opacity: 0, rotateX: -90, y: 15 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: i * 0.03 }}
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
              initial={{ opacity: 0, rotateX: -90, y: 15 }}
              whileInView={{ opacity: 1, rotateX: 0, y: 0 }}
              viewport={{ once: true, margin: '-10%' }}
              transition={{ duration: 0.5, delay: ("Let’s discuss".length + i) * 0.03 }}
              style={{ transformOrigin: "50% 100% -20px", transformStyle: "preserve-3d" }}
            >
              {char === ' ' ? '\u00A0' : char}
            </motion.span>
          ))}
        </h2>

        <div className="w-full max-w-2xl relative">
          
          {/* Plan Selection Section */}
          <div className="mb-16">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-8 text-[#111] flex items-center gap-3">
               Choose your plan
            </h3>
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              {OUR_PLANS.map(plan => (
                <button
                  key={plan}
                  onClick={() => setSelectedPlan(plan)}
                  className={`relative p-4 rounded-2xl border transition-all duration-500 flex flex-col items-center gap-2 group ${
                    selectedPlan === plan 
                    ? 'border-primary bg-primary/5 text-primary shadow-[0_10px_30px_rgba(1,168,107,0.1)]' 
                    : 'border-gray-200 hover:border-gray-400 text-gray-500'
                  }`}
                >
                  <span className={`text-[10px] uppercase font-black tracking-widest ${selectedPlan === plan ? 'text-primary' : ''}`}>
                    {plan}
                  </span>
                  {selectedPlan === plan && (
                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="absolute -top-2 -right-2">
                      <CheckCircle2 className="w-5 h-5 fill-primary text-white" />
                    </motion.div>
                  )}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-16">
            <h3 className="text-xl md:text-2xl font-bold tracking-tight mb-8 text-[#111] flex items-center gap-3">
               What are you looking for?
            </h3>
            <div className="flex flex-wrap gap-2.5">
              {['Web Development', 'Mobile Applications', 'Custom Web Applications', 'Brand Identity Design'].map(tag => (
                <button
                  key={tag}
                  onClick={() => setInterests(prev => prev.includes(tag) ? prev.filter(t => t !== tag) : [...prev, tag])}
                  className={`px-8 py-4 rounded-full border border-gray-300 text-[16px] font-medium tracking-tight transition-all duration-300 antialiased ${interests.includes(tag) ? 'bg-[#111] text-white border-[#111]' : 'hover:border-gray-400 text-[#111] bg-white hover:bg-gray-50'}`}
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
                className="w-full border-b border-gray-300 pb-4 bg-transparent outline-none placeholder:text-[#9ca3af] text-xl md:text-2xl transition-all focus:border-[#111] text-[#111] font-medium tracking-tight antialiased"
              />
            </div>
            <div className="relative">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full border-b border-gray-300 pb-4 bg-transparent outline-none placeholder:text-[#9ca3af] text-xl md:text-2xl transition-all focus:border-[#111] text-[#111] font-medium tracking-tight antialiased"
              />
            </div>
            <div className="relative">
              <input
                type="text"
                placeholder="Tell us about your project"
                value={projectDetails}
                onChange={(e) => setProjectDetails(e.target.value)}
                className="w-full border-b border-gray-300 pb-4 bg-transparent outline-none placeholder:text-[#9ca3af] text-xl md:text-2xl transition-all focus:border-[#111] text-[#111] font-medium tracking-tight antialiased"
              />
            </div>
          </div>

          <div className="mb-24">
            <label className="flex items-center gap-3 cursor-pointer w-max group py-2">
              <Paperclip className="w-5 h-5 text-black transform group-hover:-rotate-12 transition-transform duration-300" />
              <span className="text-2xl font-bold text-black border-b-[2px] border-black pb-[2px] mb-[-2px] group-hover:text-gray-600 group-hover:border-gray-600 transition-colors">Add attachment</span>
              <input type="file" className="hidden" />
            </label>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center gap-4 mt-12 w-full">
            <button
              onClick={handleSendWhatsApp}
              className="w-full md:w-auto px-10 py-5 rounded-full bg-[#25D366] text-white text-[16px] font-bold hover:bg-[#128C7E] transition-all duration-300 shadow-lg flex items-center justify-center gap-3 uppercase tracking-widest whitespace-nowrap"
            >
              Reach via WhatsApp
            </button>
            <button
              onClick={handleSendEmail}
              className="w-full md:w-auto px-10 py-5 rounded-full bg-[#111] text-white text-[16px] font-bold hover:bg-black transition-all duration-300 shadow-md flex items-center justify-center gap-3 uppercase tracking-widest whitespace-nowrap"
            >
              Send via Email
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
