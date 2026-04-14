"use client";

import { useState, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { Audiowide } from "next/font/google";
import { 
  FaArrowRight, FaPhone, FaEnvelope, FaLocationDot, 
  FaLink, FaWhatsapp, FaServer, FaMapLocationDot 
} from "react-icons/fa6";

const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

export default function Contact() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    message: "",
  });

  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const handleChange = (e: any) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Terminal Output:", form);
    // Implement your email sending logic here
  };

  const handleWhatsApp = (e: any) => {
    e.preventDefault();
    const message = `*New Inquiry*%0A*Name:* ${form.name}%0A*Location:* ${form.address}`;
    window.open(`https://wa.me/919037845480?text=${message}`, "_blank");
  };

  return (
    <section ref={containerRef} className="relative bg-[#FAFAFA] min-h-screen overflow-hidden">
      
      {/* ── 1. KINETIC BACKGROUND ── */}
      <div className="absolute inset-0 flex items-center pointer-events-none opacity-[0.02] z-0 overflow-hidden text-center">
        <motion.p
          style={{ x: xLeft }}
          className={`${audiowide.className} text-[20vw] whitespace-nowrap uppercase leading-none text-slate-900 select-none`}
        >
          Communication&nbsp;•&nbsp;Interface&nbsp;•&nbsp;Terminal&nbsp;•
        </motion.p>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-32">
        
        {/* ── 2. HEADER ── */}
        <header className="mb-20 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="flex items-center gap-4 mb-6"
          >
            <span className="text-orange-500 font-black text-[10px] tracking-[0.42em] uppercase">Connect Protocol</span>
            <motion.div 
              initial={{ width: 0 }} 
              animate={{ width: 64 }} 
              transition={{ duration: 1, delay: 0.2 }} 
              className="h-px bg-slate-300" 
            />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`${audiowide.className} text-[12vw] lg:text-[8rem] leading-[0.85] tracking-[-0.05em] uppercase text-slate-950 mb-8`}
          >
            Get In <br />
            <span className="text-orange-500 italic">Touch.</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-slate-500 text-base md:text-lg max-w-xl font-medium leading-relaxed border-l-2 border-orange-500 pl-6"
          >
            Initiate a secure transmission with our engineering team for site assessments, system design, or technical support.
          </motion.p>
        </header>

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-12 items-stretch">
          
          {/* ── 3. COMMAND CENTER (DARK CARD) ── */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-5 bg-slate-950 rounded-[3rem] p-10 lg:p-14 text-white flex flex-col justify-between shadow-2xl relative overflow-hidden"
          >
            {/* Background Glow */}
            <div className="absolute -right-32 -top-32 w-[500px] h-[500px] bg-orange-500 rounded-full blur-[120px] opacity-20 pointer-events-none" />

            <div className="relative z-10 mb-16">
              <h2 className={`${audiowide.className} text-3xl md:text-4xl uppercase tracking-tighter text-white mb-6`}>
                Ixora Tech <span className="text-orange-500">HQ</span>
              </h2>
              <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-sm">
                Solar infrastructure, direct distribution, and industrial engineering oversight.
              </p>
            </div>

            <div className="space-y-10 relative z-10 mb-16">
              {[
                { label: "Voice Link", val: "+91 9037 845 480", icon: <FaPhone /> },
                { label: "Data Uplink", val: "info@ixoratech.com", icon: <FaEnvelope /> },
                { label: "Base Location", val: "Kerala, India", icon: <FaLocationDot /> }
              ].map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 + (i * 0.15), duration: 0.5 }}
                  className="group flex items-center gap-6"
                >
                  <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 group-hover:bg-orange-500 group-hover:text-white group-hover:border-orange-500 transition-all duration-500 shadow-sm">
                    {item.icon}
                  </div>
                  <div>
                    <p className="text-[8px] font-black uppercase tracking-[0.3em] text-orange-500 mb-2">{item.label}</p>
                    <p className={`${audiowide.className} text-lg md:text-xl text-white tracking-wide`}>{item.val}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Active Deployment Zones & Status */}
            <div className="relative z-10 space-y-6">
              <div className="pt-8 border-t border-white/10">
                <div className="flex items-center gap-3 mb-4">
                  <FaMapLocationDot className="text-orange-500" />
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Active Deployment Zones</p>
                </div>
                <div className="flex flex-wrap gap-3">
                  {["Malappuram", "Kozhikode", "Kochi", "Pan-Kerala"].map((zone, i) => (
                    <span key={i} className="px-4 py-2 rounded-lg bg-white/5 border border-white/10 text-[10px] font-bold tracking-widest text-slate-300 uppercase">
                      {zone}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-6 rounded-3xl bg-white/5 border border-white/10 flex items-start gap-5 group hover:bg-white/10 transition-colors">
                <div className="mt-1">
                  <span className="relative flex h-3 w-3">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-3 w-3 bg-orange-500"></span>
                  </span>
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase tracking-[0.3em] text-orange-500 mb-2">Network Status</p>
                  <p className="text-xs text-slate-300 font-medium leading-relaxed">
                    Connected to Protech Automation industrial grid. Operational 24/7.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* ── 4. THE INQUIRY TERMINAL (WHITE FORM) ── */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="lg:col-span-7 bg-white border border-slate-200/60 p-8 md:p-12 lg:p-14 rounded-[3rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] flex flex-col justify-center"
          >
            <div className="mb-12">
               <h3 className={`${audiowide.className} text-2xl md:text-3xl uppercase text-slate-950 mb-4`}>
                 Transmission <span className="text-orange-500">Form</span>
               </h3>
               <p className="text-slate-500 text-sm font-medium">Enter your specifications below to initiate a project review.</p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6 md:space-y-8">
              <div className="grid md:grid-cols-2 gap-6 md:gap-8">
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Identified Name</label>
                  <input
                    required
                    name="name"
                    placeholder="E.G. JOHN DOE"
                    className="w-full bg-slate-50 border border-slate-200/60 p-5 rounded-2xl text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-300"
                    onChange={handleChange}
                  />
                </div>
                <div className="space-y-3">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Phone System</label>
                  <input
                    required
                    name="phone"
                    placeholder="+91 0000 000 000"
                    className="w-full bg-slate-50 border border-slate-200/60 p-5 rounded-2xl text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-300"
                    onChange={handleChange}
                  />
                </div>
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Electronic Mail</label>
                <input
                  required
                  type="email"
                  name="email"
                  placeholder="USER@DOMAIN.COM"
                  className="w-full bg-slate-50 border border-slate-200/60 p-5 rounded-2xl text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-300"
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Installation Address / Coordinates</label>
                <input
                  required
                  name="address"
                  placeholder="SITE LOCATION OR CITY"
                  className="w-full bg-slate-50 border border-slate-200/60 p-5 rounded-2xl text-xs font-bold uppercase tracking-widest focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-300"
                  onChange={handleChange}
                />
              </div>

              <div className="space-y-3">
                <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Transmission Details</label>
                <textarea
                  required
                  name="message"
                  placeholder="DESCRIBE YOUR SYSTEM REQUIREMENTS (KW, ON-GRID/HYBRID, ETC)..."
                  className="w-full bg-slate-50 border border-slate-200/60 p-5 rounded-2xl text-xs font-bold uppercase tracking-widest min-h-[140px] resize-none focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-300"
                  onChange={handleChange}
                />
              </div>

              <div className="pt-6 grid grid-cols-1 sm:grid-cols-2 gap-4">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  type="submit"
                  className="w-full bg-slate-950 text-white p-6 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-4 group hover:bg-orange-500 transition-all shadow-lg"
                >
                  <span>Initialize</span>
                  <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.98 }}
                  onClick={handleWhatsApp}
                  className="w-full bg-green-500 text-white p-6 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-4 group hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/20"
                >
                  <FaWhatsapp size={18} />
                  <span>Direct WhatsApp</span>
                </motion.button>
              </div>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}