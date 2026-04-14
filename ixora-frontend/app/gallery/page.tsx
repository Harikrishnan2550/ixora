"use client";

import Image from "next/image";
import { useState, useRef } from "react";
import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { Audiowide } from "next/font/google";
import { FaPlus, FaArrowRight, FaLocationDot, FaBolt } from "react-icons/fa6";

const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

const CATEGORIES = ["All Systems", "Residential", "Commercial", "Industrial"];

const PROJECTS = [
  { id: 1, src: "/about.png", size: "lg", title: "Residential Array", category: "Residential", capacity: "15 kW", location: "Kochi, Kerala" },
  { id: 2, src: "/img1.png", size: "sm", title: "Smart Inverter Tech", category: "Residential", capacity: "5 kW Hybrid", location: "Malappuram" },
  { id: 3, src: "/img2.png", size: "sm", title: "Industrial Grid", category: "Industrial", capacity: "120 kW", location: "Palakkad Facility" },
  { id: 4, src: "/img4.png", size: "lg", title: "Commercial Rooftop", category: "Commercial", capacity: "45 kW", location: "Trivandrum Tech Park" },
  { id: 5, src: "/img3.png", size: "sm", title: "Energy Storage Node", category: "Industrial", capacity: "200 kWh", location: "Protech HQ" },
  { id: 6, src: "/img5.png", size: "sm", title: "Hybrid Architecture", category: "Commercial", capacity: "25 kW", location: "Kozhikode" },
];

export default function Gallery() {
  const [activeFilter, setActiveFilter] = useState("All Systems");
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Kinetic Background Parallax
  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-10%"]);

  const filteredProjects = activeFilter === "All Systems" 
    ? PROJECTS 
    : PROJECTS.filter(project => project.category === activeFilter);

  return (
    <section ref={containerRef} className="relative py-32 bg-[#FAFAFA] min-h-screen overflow-hidden">
      
      {/* ── 1. KINETIC BACKGROUND ── */}
      <div className="absolute inset-0 flex items-center pointer-events-none opacity-[0.025] z-0 overflow-hidden">
        <motion.p
          style={{ x: xLeft }}
          className={`${audiowide.className} text-[18vw] whitespace-nowrap uppercase leading-none text-slate-900 select-none`}
        >
          Visual&nbsp;Archive&nbsp;•&nbsp;Project&nbsp;Logs&nbsp;•
        </motion.p>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12">
        
        {/* ── 2. HEADER & FILTER BAR ── */}
        <header className="mb-16 md:mb-24">
          <div className="flex flex-col lg:flex-row justify-between lg:items-end gap-10">
            <motion.div 
              initial={{ opacity: 0, x: -40 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="max-w-2xl"
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-orange-500 font-black text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase">Visual Archive</span>
                <motion.div 
                  initial={{ width: 0 }}
                  whileInView={{ width: 64 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className="h-[1px] bg-slate-300" 
                />
              </div>
              <h2 className={`${audiowide.className} text-5xl md:text-7xl lg:text-8xl tracking-tighter uppercase text-slate-950 mb-6 leading-[0.85]`}>
                Project <br className="hidden md:block" />
                <span className="text-orange-500 italic">Logs.</span>
              </h2>
              <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed border-l-2 border-orange-500/50 pl-6">
                Documenting the precise integration of high-performance solar infrastructure across varied architectural landscapes.
              </p>
            </motion.div>

            {/* Dynamic Filter Pills */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="flex flex-wrap gap-2 lg:justify-end"
            >
              {CATEGORIES.map((category) => (
                <button
                  key={category}
                  onClick={() => setActiveFilter(category)}
                  className={`relative px-6 py-3 rounded-full text-[10px] font-black uppercase tracking-widest transition-colors duration-300 ${
                    activeFilter === category ? "text-white" : "text-slate-500 hover:text-slate-900 bg-white border border-slate-200 shadow-sm hover:border-slate-300"
                  }`}
                >
                  {activeFilter === category && (
                    <motion.div 
                      layoutId="activeFilter"
                      className="absolute inset-0 bg-slate-950 rounded-full z-0"
                      transition={{ type: "spring", stiffness: 300, damping: 25 }}
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              ))}
            </motion.div>
          </div>
        </header>

        {/* ── 3. BENTO GRID (WITH LAYOUT ANIMATIONS) ── */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[350px] md:auto-rows-[400px]">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className={`relative group overflow-hidden rounded-[2.5rem] bg-slate-100 cursor-pointer shadow-sm hover:shadow-[0_30px_60px_-15px_rgba(0,0,0,0.15)] transition-all duration-500 ${
                  project.size === "lg" && activeFilter === "All Systems" ? "md:col-span-2" : "md:col-span-1"
                }`}
              >
                {/* IMAGE */}
                <Image
                  src={project.src}
                  alt={project.title}
                  fill
                  className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000 ease-[0.16,1,0.3,1] group-hover:scale-105"
                />

                {/* OVERLAY WITH METADATA */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 flex flex-col justify-between p-8 md:p-10">
                  
                  {/* Top Badges */}
                  <div className="flex justify-between items-start translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                    <div className="bg-orange-500/90 backdrop-blur-sm text-white px-4 py-2 rounded-xl text-[9px] font-black uppercase tracking-[0.2em] shadow-lg">
                      {project.category}
                    </div>
                    <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center border border-white/20 shadow-xl">
                      <FaPlus className="text-white text-sm" />
                    </div>
                  </div>

                  {/* Bottom Content */}
                  <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out delay-75">
                    <h3 className={`${audiowide.className} text-2xl md:text-3xl text-white uppercase mb-4 leading-tight shadow-black/50 drop-shadow-md`}>
                      {project.title}
                    </h3>
                    
                    <div className="flex flex-wrap items-center gap-4 md:gap-6 text-white/80 text-[10px] font-bold uppercase tracking-widest border-t border-white/20 pt-4">
                      <div className="flex items-center gap-2">
                        <FaBolt className="text-orange-400 text-sm" />
                        {project.capacity}
                      </div>
                      <div className="flex items-center gap-2">
                        <FaLocationDot className="text-orange-400 text-sm" />
                        {project.location}
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* ── 4. FOOTER INDICATOR ── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="mt-20 flex justify-center"
        >
          <button className="flex items-center gap-6 px-10 py-5 rounded-2xl bg-white border border-slate-200/60 shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] hover:border-slate-300 hover:-translate-y-1 transition-all duration-500 group">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-950">Load More Infrastructure</span>
            <div className="w-8 h-px bg-slate-300 group-hover:w-16 group-hover:bg-orange-500 transition-all duration-500" />
            <FaArrowRight className="text-slate-400 group-hover:text-orange-500 transition-colors duration-500 -ml-2" />
          </button>
        </motion.div>

      </div>
    </section>
  );
}