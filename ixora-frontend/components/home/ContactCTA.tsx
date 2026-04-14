"use client";

import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaWhatsapp, FaArrowRight } from "react-icons/fa6";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

export default function ContactCTA() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax effect for the technical background grid
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const gridY = useTransform(scrollYProgress, [0, 1], ["-20%", "20%"]);

  return (
    <section ref={containerRef} className="py-24 md:py-32 bg-slate-950 text-white relative overflow-hidden">
      
      {/* ── 1. KINETIC BACKGROUND ACCENTS ── */}
      <motion.div 
        style={{ y: gridY }}
        className="absolute top-0 right-0 w-full lg:w-2/3 h-[150%] opacity-10 pointer-events-none z-0"
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fb923c_1.5px,_transparent_1.5px)] [background-size:40px_40px]" />
      </motion.div>
      
      {/* Continuous "Breathing" Glow Orbs */}
      <motion.div 
        animate={{ scale: [1, 1.1, 1], opacity: [0.15, 0.25, 0.15] }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -top-24 -right-24 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-orange-500 rounded-full blur-[100px] md:blur-[150px] z-0 pointer-events-none" 
      />
      <motion.div 
        animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute -bottom-24 -left-24 w-[300px] md:w-[500px] h-[300px] md:h-[500px] bg-slate-500 rounded-full blur-[100px] md:blur-[150px] z-0 pointer-events-none" 
      />

      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 relative z-10">
        <div className="grid lg:grid-cols-12 gap-16 lg:gap-20 items-center">
          
          {/* ── 2. LEFT CONTENT (TYPOGRAPHY) ── */}
          <div className="lg:col-span-7 xl:col-span-8 text-left">
            <div className="flex items-center gap-4 mb-8 md:mb-10">
              <motion.span 
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="text-orange-500 font-black text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase whitespace-nowrap"
              >
                System Initiation
              </motion.span>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 80 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-[1px] bg-slate-700 w-full max-w-[80px]" 
              />
            </div>

            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`${audiowide.className} text-5xl sm:text-6xl md:text-7xl lg:text-[5.5rem] leading-[0.95] tracking-[-0.05em] uppercase mb-8 md:mb-10`}
            >
              Ready To <br className="hidden md:block" />
              <span className="text-orange-500 italic">Empower?</span>
            </motion.h2>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-400 text-lg md:text-xl max-w-xl font-medium leading-relaxed border-l-2 border-orange-500/50 pl-6"
            >
              Connect with Ixora Tech to architect a high-performance energy ecosystem tailored for your specific structural requirements.
            </motion.p>
          </div>

          {/* ── 3. RIGHT CONTENT (ACTION BUTTONS) ── */}
          <div className="lg:col-span-5 xl:col-span-4 flex flex-col gap-5 w-full sm:max-w-md lg:max-w-none ml-auto">
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <Link href="/contact" className="group block">
                <button className="w-full bg-white text-slate-950 px-8 md:px-10 py-6 rounded-[1.25rem] font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] flex items-center justify-between hover:bg-orange-500 hover:text-white transition-all duration-500 shadow-[0_20px_40px_-15px_rgba(255,255,255,0.1)] hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.4)] hover:-translate-y-1">
                  <span>Secure Consultation</span>
                  <FaArrowRight className="text-lg group-hover:translate-x-2 transition-transform duration-300" />
                </button>
              </Link>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 40 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.45, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              viewport={{ once: true, margin: "-50px" }}
            >
              <a
                href="https://wa.me/919037845480?text=System%20Initiation:%20I%20would%20like%20to%20request%20a%20technical%20consultation%20for%20solar%20infrastructure."
                target="_blank"
                rel="noopener noreferrer"
                className="group block"
              >
                <button className="w-full bg-transparent border border-slate-800 text-white px-8 md:px-10 py-6 rounded-[1.25rem] font-black text-[10px] md:text-[11px] uppercase tracking-[0.3em] flex items-center justify-between hover:bg-[#25D366] hover:border-[#25D366] transition-all duration-500 hover:-translate-y-1 hover:shadow-[0_20px_40px_-15px_rgba(37,211,102,0.3)]">
                  <span>WhatsApp Direct</span>
                  <FaWhatsapp className="text-2xl text-slate-500 group-hover:text-white transition-colors duration-300" />
                </button>
              </a>
            </motion.div>
          </div>

        </div>
      </div>

      {/* Subtle Footer-end line */}
      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-slate-800 to-transparent opacity-50" />
    </section>
  );
}