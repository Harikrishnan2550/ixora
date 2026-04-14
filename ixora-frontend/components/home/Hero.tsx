"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link"; // <-- Added this import
import { FaArrowRight, FaWhatsapp, FaPlus } from "react-icons/fa6";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

/* ── Count-up hook ─────────────────────────────────────── */
function useCountUp(target: number, duration = 1400, start = false) {
  const [value, setValue] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const ease = 1 - Math.pow(1 - progress, 3);
      setValue(Math.round(ease * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [start, target, duration]);
  return value;
}

/* ── Premium Stat Item ─────────────────────────────────── */
function StatItem({
  label,
  value,
  delay,
}: {
  label: string;
  value: string;
  delay: number;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] }}
      whileHover={{ y: -5 }}
      className="flex flex-col items-center lg:items-start group p-6 rounded-[2rem] bg-white border border-slate-100 shadow-[0_4px_20px_-10px_rgba(0,0,0,0.02)] hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.15)] hover:border-orange-500/20 transition-all duration-500 w-full"
    >
      <span className="block text-[8px] md:text-[9px] font-black text-slate-400 uppercase tracking-[0.4em] mb-2 text-center lg:text-left transition-colors duration-500 group-hover:text-orange-500">
        {label}
      </span>
      <span
        className={`${audiowide.className} text-3xl md:text-4xl lg:text-5xl tracking-tighter text-slate-950 transition-colors duration-500`}
      >
        {value}
      </span>
    </motion.div>
  );
}

export default function Hero() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });

  // Parallax Values
  const xRight = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);
  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-15%"]);
  const imgY = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Counters
  const efficiency = useCountUp(248, 1600, inView);
  const liveSystems = useCountUp(500, 1800, inView);
  const warranty = useCountUp(25, 1200, inView);
  const install = useCountUp(72, 1100, inView);
  const reliability = useCountUp(99, 1400, inView);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen bg-[#FAFAFA] overflow-hidden flex flex-col items-center lg:items-start pt-20 lg:pt-0"
    >
      {/* ── 1. KINETIC BACKGROUND ── */}
      <div className="absolute inset-0 flex flex-col justify-center gap-6 md:gap-10 pointer-events-none opacity-[0.025] z-0 overflow-hidden text-center">
        <motion.p
          style={{ x: xRight }}
          className={`${audiowide.className} text-[26vw] md:text-[16vw] whitespace-nowrap uppercase leading-none text-slate-900 select-none`}
        >
          Sustainable&nbsp;•&nbsp;Infrastructure
        </motion.p>
        <motion.p
          style={{ x: xLeft }}
          className={`${audiowide.className} text-[26vw] md:text-[16vw] whitespace-nowrap uppercase leading-none text-slate-900 select-none`}
        >
          Precision&nbsp;•&nbsp;Engineering
        </motion.p>
      </div>

      {/* ── 2. MAIN CONTENT ── */}
      <div className="relative z-10 flex-grow max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12 pt-20 md:pt-32 pb-12 w-full flex flex-col justify-center">
        <div className="flex flex-col lg:grid lg:grid-cols-12 gap-12 lg:gap-20 items-center">
          
          {/* ── TEXT BLOCK ── */}
          <div className="lg:col-span-6 order-1 flex flex-col items-center lg:items-start text-center lg:text-left z-20">
            
            <motion.div 
              initial={{ opacity: 0, x: -30 }} 
              animate={inView ? { opacity: 1, x: 0 } : {}} 
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center justify-center lg:justify-start gap-4 mb-6 md:mb-8 w-full"
            >
              <span className="text-orange-500 font-black text-[9px] md:text-[10px] tracking-[0.42em] uppercase whitespace-nowrap">
                Efficiency Redefined
              </span>
              <motion.div 
                initial={{ width: 0 }}
                animate={inView ? { width: 64 } : { width: 0 }}
                transition={{ duration: 1, delay: 0.4 }}
                className="h-[1px] bg-slate-300 hidden lg:block max-w-[64px] w-full" 
              />
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`${audiowide.className} text-[14vw] sm:text-[12vw] lg:text-[7.5rem] xl:text-[8.5rem] leading-[0.9] lg:leading-[0.85] tracking-[-0.05em] uppercase text-slate-950 mb-6`}
            >
              Solar <br />
              <span className="text-orange-500 italic">Evolved.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-slate-500 text-base md:text-lg lg:text-xl max-w-lg font-medium leading-relaxed border-l-2 border-transparent lg:border-orange-500 lg:pl-6"
            >
              Ixora Tech merges architectural elegance with high-output energy systems to power the modern home.
            </motion.p>

            {/* PREMIUM CTAs */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="flex flex-col sm:flex-row justify-center lg:justify-start gap-4 mt-10 md:mt-12 w-full sm:w-auto"
            >
              {/* ── ROUTING ADDED HERE ── */}
              <Link href="/pricing" className="w-full sm:w-auto block">
                <motion.button
                  whileTap={{ scale: 0.98 }}
                  className="w-full bg-slate-950 text-white px-8 py-5 rounded-[1.25rem] font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-[0_10px_30px_-15px_rgba(0,0,0,0.5)] hover:bg-orange-500 hover:shadow-[0_20px_40px_-15px_rgba(249,115,22,0.4)] transition-all duration-500 group"
                >
                  <span>Get the pricing</span>
                  <FaArrowRight className="text-lg group-hover:translate-x-1.5 transition-transform duration-300" />
                </motion.button>
              </Link>

              <motion.a
                href="#"
                whileTap={{ scale: 0.98 }}
                className="w-full sm:w-auto bg-white border border-slate-200/80 text-slate-950 px-8 py-5 rounded-[1.25rem] font-black text-[10px] uppercase tracking-[0.3em] flex items-center justify-center gap-4 shadow-sm hover:bg-[#25D366] hover:text-white hover:border-[#25D366] hover:shadow-[0_20px_40px_-15px_rgba(37,211,102,0.4)] transition-all duration-500 group"
              >
                <span>Connect</span>
                <FaWhatsapp className="text-xl text-slate-400 group-hover:text-white transition-colors duration-300" />
              </motion.a>
            </motion.div>
          </div>

          {/* ── IMAGE BLOCK (PARALLAX) ── */}
          <div className="lg:col-span-6 order-2 relative w-full flex justify-center z-10">
            <div className="relative w-full max-w-[450px] lg:max-w-[550px]">
              <motion.div
                style={{ y: imgY }}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={inView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 1, ease: "easeOut" }}
                className="relative aspect-[4/5] rounded-[3rem] overflow-hidden shadow-2xl border-4 border-white bg-slate-100"
              >
                <Image 
                  src="/hero.png" 
                  alt="Premium Solar Infrastructure"
                  fill 
                  priority
                  className="object-cover" 
                  sizes="(max-w-1024px) 100vw, 50vw"
                />
                
                {/* GLASSMORPHISM EFFICIENCY BADGE */}
                <div className="absolute top-6 right-6 md:top-8 md:right-8 bg-white/70 backdrop-blur-xl border border-white/50 p-5 md:p-6 rounded-[1.5rem] shadow-xl flex flex-col items-center">
                  <span className="text-[8px] font-black uppercase tracking-[0.3em] text-slate-500 mb-1">Max Yield</span>
                  <p className={`${audiowide.className} text-2xl md:text-3xl tracking-tighter text-slate-950 leading-none`}>
                    {(efficiency / 10).toFixed(1)}%
                  </p>
                </div>
              </motion.div>

              {/* DARK LIVE SYSTEMS BADGE WITH PULSING INDICATOR */}
              <motion.div
                initial={{ opacity: 0, x: 30, y: 30 }}
                animate={inView ? { opacity: 1, x: 0, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.5, type: "spring", stiffness: 100 }}
                className="absolute -bottom-8 -left-4 md:-bottom-12 md:-left-12 bg-slate-950 border border-slate-800 p-6 md:p-8 rounded-[2rem] shadow-[0_20px_50px_-15px_rgba(0,0,0,0.5)] z-20 w-[140px] md:w-[180px] flex flex-col justify-center"
              >
                <div className="flex items-center gap-3 mb-2">
                  <span className="relative flex h-2.5 w-2.5">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500"></span>
                  </span>
                  <p className="text-[8px] md:text-[9px] font-black uppercase tracking-widest text-slate-400">Live Grid</p>
                </div>
                <p className={`${audiowide.className} text-4xl md:text-5xl tracking-tighter text-white italic leading-none`}>
                  {liveSystems}+
                </p>
              </motion.div>
            </div>
          </div>
        </div>
      </div>

      {/* ── 4. PREMIUM DATA STRIP ── */}
      <div className="relative z-20 max-w-[1400px] mx-auto px-6 md:px-12 w-full pb-16 lg:pb-24">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6 pt-10">
          <StatItem label="Linear Warranty" value={`${warranty}Y`} delay={0.6} />
          <StatItem label="Deployment"      value={`${install}H`} delay={0.7} />
          <StatItem label="Tech Support"    value="24/7"          delay={0.8} />
          <StatItem label="System Uptime"   value={`${reliability}%`} delay={0.9} />
        </div>
      </div>
    </section>
  );
}