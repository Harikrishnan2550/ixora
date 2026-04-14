"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { FaSolarPanel, FaCheck, FaArrowRight, FaXmark, FaWhatsapp } from "react-icons/fa6";
import { useState, useRef } from "react";
import { Audiowide } from "next/font/google";
import Image from "next/image";

const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

export default function Pricing() {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", type: "Residential", capacity: "" });

  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effect for the background
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const xRight = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  const plans = [
    {
      name: "Essential Grid",
      power: "3 KW On-Grid",
      price: "₹2,10,000",
      image: "/3kw.png", // Ensure this path is correct in your public folder
      features: ["Brand: Customer Choice", "25Y On-Site Warranty", "Mounting Structure Incl.", "Residential Optimized"],
      highlight: false,
    },
    {
      name: "Performance Node",
      power: "5 KW On-Grid",
      price: "₹3,10,000",
      image: "/5kw.png", // Ensure this path is correct in your public folder
      features: ["Brand: Customer Choice", "25Y On-Site Warranty", "High-Load Mounting Structure", "Performance Inverter"],
      highlight: true,
    },
  ];

  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*New Solar Inquiry*%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Type:* ${formData.type}%0A*Requested Capacity:* ${formData.capacity}kW`;
    window.open(`https://wa.me/918714302550?text=${message}`, "_blank"); // Replace with your company number
    setOpen(false);
  };

  return (
    <section ref={containerRef} className="relative py-32 bg-[#FCFCFC] overflow-hidden min-h-screen">
      
      {/* ── 1. KINETIC BACKGROUND ── */}
      <div className="absolute inset-0 flex items-center pointer-events-none opacity-[0.025] z-0 overflow-hidden">
        <motion.p 
          style={{ x: xRight }} 
          className={`${audiowide.className} text-[20vw] whitespace-nowrap uppercase leading-none text-slate-900 select-none`}
        >
          Investment&nbsp;•&nbsp;Deployment&nbsp;•&nbsp;Yield&nbsp;•
        </motion.p>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12">
        
        {/* ── 2. HEADER SECTION ── */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10 mb-24">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8 }} 
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-orange-500 font-black text-[10px] tracking-[0.5em] uppercase">The Infrastructure</span>
              {/* Animated Drawing Line */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-[1px] bg-slate-300" 
              />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`${audiowide.className} text-5xl md:text-8xl leading-[0.85] tracking-[-0.06em] uppercase text-slate-950`}
            >
              Solar <br /> <span className="text-orange-500 italic">Packages.</span>
            </motion.h2>
          </div>

          <motion.div 
            initial={{ opacity: 0, x: 30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="max-w-sm pb-4 border-l-2 border-orange-500 pl-8"
          >
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Industrial-grade energy nodes. Select our core tiers or request a custom capacity for your project.
            </p>
          </motion.div>
        </div>

        {/* ── 3. PRICING CARDS (STAGGERED SLIDE FROM RIGHT) ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 overflow-hidden py-4">
          {plans.map((plan, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: 150 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`relative p-8 rounded-[3rem] border transition-all duration-700 flex flex-col justify-between min-h-[620px] hover:-translate-y-2 ${
                plan.highlight ? "bg-slate-950 border-slate-900 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.3)] text-white" : "bg-white border-slate-200/60 text-slate-950 shadow-sm hover:shadow-xl"
              }`}
            >
              <div>
                {/* Image Section */}
                <div className="relative h-48 w-full mb-8 rounded-[2rem] overflow-hidden transition-all duration-700 bg-slate-100">
                  <Image src={plan.image} alt={plan.power} fill className="object-cover" />
                  {plan.highlight && (
                    <span className="absolute top-4 right-4 text-[8px] font-black tracking-widest uppercase bg-orange-500 text-white px-4 py-2 rounded-full shadow-lg">
                      Optimized
                    </span>
                  )}
                </div>

                <p className={`text-[10px] font-black tracking-[0.3em] uppercase mb-2 ${plan.highlight ? "text-orange-400" : "text-slate-400"}`}>
                  {plan.power}
                </p>
                <h3 className={`${audiowide.className} text-3xl uppercase tracking-tighter mb-6`}>{plan.name}</h3>
                
                <div className={`h-[1px] w-full mb-8 ${plan.highlight ? "bg-slate-800" : "bg-slate-100"}`} />

                <ul className="space-y-4">
                  {plan.features.map((item, i) => (
                    <li key={i} className="flex items-center gap-3 text-[11px] font-bold uppercase tracking-wider">
                      <FaCheck className={plan.highlight ? "text-orange-400" : "text-orange-500"} />
                      <span className={plan.highlight ? "text-slate-300" : "text-slate-500"}>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <div className="mt-12">
                <h2 className={`${audiowide.className} text-4xl md:text-5xl tracking-tighter mb-8`}>{plan.price}</h2>
                <button
                  onClick={() => setOpen(true)}
                  className={`group w-full flex items-center justify-between py-5 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${
                    plan.highlight ? "bg-orange-500 text-white hover:bg-white hover:text-slate-950" : "bg-slate-950 text-white hover:bg-orange-500"
                  }`}
                >
                  <span>Initiate Enquiry</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}

          {/* CUSTOM CAPACITY CARD (Last to slide in) */}
          <motion.div 
            initial={{ opacity: 0, x: 150 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-10 rounded-[3rem] bg-orange-500 text-white flex flex-col justify-center items-center text-center group overflow-hidden shadow-2xl min-h-[620px] hover:-translate-y-2 transition-all duration-500"
          >
             <div className="absolute inset-0 opacity-10 group-hover:scale-110 transition-transform duration-1000 flex items-center justify-center pointer-events-none">
                <FaSolarPanel size={300} />
             </div>
             
             <div className="relative z-10 flex flex-col items-center">
               <h3 className={`${audiowide.className} text-4xl md:text-5xl uppercase leading-[0.9] mb-6`}>
                 Request <br /> Custom kW
               </h3>
               <p className="text-white/90 text-sm font-medium mb-10 leading-relaxed max-w-[200px]">
                 For industrial or higher capacity residential needs.
               </p>
               <button 
                  onClick={() => setOpen(true)}
                  className="bg-white text-orange-500 w-full px-10 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-950 hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center gap-4 group/btn"
               >
                  <span>Start Configurator</span>
                  <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
               </button>
             </div>
          </motion.div>
        </div>
      </div>

      {/* ── 4. CUSTOM INQUIRY FORM MODAL ── */}
      <AnimatePresence>
        {open && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            {/* Modal Backdrop Blur */}
            <motion.div 
              initial={{ opacity: 0 }} 
              animate={{ opacity: 1 }} 
              exit={{ opacity: 0 }} 
              onClick={() => setOpen(false)} 
              className="absolute inset-0 bg-slate-950/60 backdrop-blur-md" 
            />
            
            {/* Modal Card */}
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }} 
              animate={{ scale: 1, opacity: 1, y: 0 }} 
              exit={{ scale: 0.9, opacity: 0, y: 20 }} 
              transition={{ type: "spring", damping: 25, stiffness: 300 }}
              className="relative bg-white w-full max-w-lg rounded-[2.5rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]"
            >
              <button 
                onClick={() => setOpen(false)} 
                className="absolute top-8 right-8 text-slate-400 hover:text-slate-950 transition-colors"
              >
                <FaXmark size={24} />
              </button>
              
              <h2 className={`${audiowide.className} text-2xl uppercase mb-8 text-slate-950`}>
                Custom <span className="text-orange-500">Configuration</span>
              </h2>
              
              <form onSubmit={handleWhatsAppSubmit} className="space-y-5 text-left">
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                  <input required type="text" className="w-full bg-slate-50 border border-slate-200/60 p-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-300" 
                    onChange={(e) => setFormData({...formData, name: e.target.value})} />
                </div>
                
                <div className="space-y-2">
                  <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">WhatsApp Number</label>
                  <input required type="tel" className="w-full bg-slate-50 border border-slate-200/60 p-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-300" 
                    onChange={(e) => setFormData({...formData, phone: e.target.value})} />
                </div>
                
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Site Type</label>
                    <select className="w-full bg-slate-50 border border-slate-200/60 p-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-slate-700"
                      onChange={(e) => setFormData({...formData, type: e.target.value})}>
                      <option>Residential</option>
                      <option>Commercial</option>
                      <option>Industrial</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Required kW</label>
                    <input required type="number" placeholder="e.g. 10" className="w-full bg-slate-50 border border-slate-200/60 p-4 rounded-2xl text-[11px] font-bold uppercase tracking-widest outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-300" 
                      onChange={(e) => setFormData({...formData, capacity: e.target.value})} />
                  </div>
                </div>
                
                <motion.button 
                  whileTap={{ scale: 0.98 }}
                  type="submit" 
                  className="w-full py-6 mt-4 rounded-2xl bg-green-500 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/25"
                >
                  <FaWhatsapp size={18} />
                  <span>Send to WhatsApp</span>
                </motion.button>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}