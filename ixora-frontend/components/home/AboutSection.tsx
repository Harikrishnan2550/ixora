"use client";

import Image from "next/image";
import { motion, useScroll, useTransform, useInView, Variants } from "framer-motion";
import { useRef } from "react";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

export default function AboutSection() {
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, margin: "-10%" });
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Parallax effect: subtle on mobile, pronounced on desktop
  const yParallax = useTransform(scrollYProgress, [0, 1], [-30, 30]);

  // Explicity typed as "Variants" to satisfy Vercel's strict TypeScript checks
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.2 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section ref={containerRef} className="py-20 md:py-32 bg-[#FCFCFC] overflow-hidden">
      <div className="max-w-[1400px] mx-auto px-6 md:px-8 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
          
          {/* ── LEFT: Layered Image Composition ── */}
          <div className="lg:col-span-6 relative order-2 lg:order-1">
            
            <motion.div 
              style={{ y: yParallax }}
              className="relative aspect-[4/5] sm:aspect-video lg:aspect-[4/5] rounded-[2rem] md:rounded-[2.5rem] overflow-hidden border border-slate-100 shadow-2xl"
            >
              {/* Premium Image Reveal Sweep */}
              <motion.div 
                initial={{ x: "0%" }}
                animate={isInView ? { x: "100%" } : { x: "0%" }}
                transition={{ duration: 1.2, ease: "easeOut", delay: 0.2 }}
                className="absolute inset-0 bg-slate-900 z-10"
              />

              <motion.div
                initial={{ scale: 1.2 }}
                animate={isInView ? { scale: 1 } : { scale: 1.2 }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.3 }}
                className="w-full h-full"
              >
                <Image
                  src="/about.png"
                  alt="Solar Installation"
                  fill
                  className="object-cover"
                  sizes="(max-w-1024px) 100vw, 50vw"
                  priority
                />
              </motion.div>
            </motion.div>

            {/* Floating Experience Card (Continuous Animation) */}
            <motion.div 
              initial={{ x: -20, opacity: 0 }}
              animate={isInView ? { x: 0, opacity: 1 } : {}}
              transition={{ delay: 1, duration: 0.8 }}
              className="absolute -bottom-6 -right-2 md:-bottom-10 md:-right-6 z-20"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 4, ease: "easeInOut" }}
                className="bg-slate-950 p-6 md:p-10 rounded-[1.5rem] md:rounded-[2.5rem] text-white shadow-[0_20px_40px_-15px_rgba(0,0,0,0.3)] min-w-[140px] md:min-w-[200px]"
              >
                <p className={`${audiowide.className} text-3xl md:text-5xl tracking-tighter mb-1 md:mb-2 italic`}>
                  15<span className="text-orange-500 text-xl md:text-2xl ml-1">Y</span>
                </p>
                <p className="text-[8px] md:text-[10px] font-black uppercase tracking-[0.2em] md:tracking-[0.3em] text-slate-400">
                  Industry Excellence
                </p>
              </motion.div>
            </motion.div>
            
          </div>

          {/* ── RIGHT: Content with High-Contrast Typography ── */}
          <motion.div 
            className="lg:col-span-6 order-1 lg:order-2"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"}
          >
            <motion.div variants={itemVariants} className="flex items-center gap-4 mb-6 md:mb-8">
              <span className="text-orange-500 font-black text-[9px] md:text-[10px] tracking-[0.4em] md:tracking-[0.5em] uppercase whitespace-nowrap">
                The Infrastructure
              </span>
              <motion.div 
                initial={{ width: 0 }}
                animate={isInView ? { width: "100%" } : { width: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="h-[1px] max-w-[80px] bg-slate-300" 
              />
            </motion.div>

            <motion.h2 
              variants={itemVariants}
              className={`${audiowide.className} text-[11vw] sm:text-[8vw] lg:text-[4.5rem] xl:text-[5.5rem] leading-[0.95] md:leading-[0.9] tracking-[-0.05em] uppercase text-slate-900 mb-8 md:mb-10`}
            >
              Engineering <br />
              <span className="text-slate-300 italic">Power Autonomy.</span>
            </motion.h2>

            <motion.div 
              variants={itemVariants}
              className="space-y-6 text-slate-500 text-base md:text-lg font-medium leading-relaxed max-w-xl relative"
            >
              {/* Subtle accent line next to paragraph */}
              <div className="absolute left-0 top-2 bottom-2 w-0.5 bg-gradient-to-b from-orange-500 to-transparent -ml-6 hidden md:block opacity-50" />
              
              <p>
                Ixora Tech is the solar systems vertical of <span className="text-slate-900 font-bold">Protech Automation</span>. We design high-performance energy nodes that integrate with the structural integrity of modern architecture.
              </p>
              <p>
                From precision installation to intelligent distribution, we specialize in 
                residential and commercial energy ecosystems tailored for Kerala’s unique climate.
              </p>
            </motion.div>

            {/* BENTO STATS (Staggered Pop) */}
            <motion.div 
              variants={itemVariants}
              className="grid grid-cols-3 gap-4 mt-12 md:mt-16 pt-8 md:pt-10 border-t border-slate-100"
            >
              {[
                { val: "500+", label: "Units" },
                { val: "100%", label: "Uptime" },
                { val: "24/7", label: "Care" },
              ].map((stat, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.6 + (i * 0.15), duration: 0.5, type: "spring", stiffness: 100 }}
                >
                  <h3 className={`${audiowide.className} text-xl sm:text-2xl md:text-3xl tracking-tighter text-slate-950 text-center`}>
                    {stat.val}
                  </h3>
                  <p className="text-[8px] md:text-[10px] font-black uppercase tracking-widest text-slate-400 mt-1 text-center">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

        </div>

        {/* ── PARENT COMPANY INTEGRATION ── */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
          className="mt-24 md:mt-32 p-8 md:p-12 lg:p-16 bg-white border border-slate-200/60 rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] flex flex-col lg:flex-row items-center justify-between gap-10 lg:gap-16 group"
        >
          {/* Parent Company Logo Side */}
          <div className="lg:w-1/2 flex flex-col items-center lg:items-start text-center lg:text-left w-full border-b lg:border-b-0 lg:border-r border-slate-100 pb-10 lg:pb-0 lg:pr-16">
            <p className="text-[9px] md:text-[10px] font-black uppercase tracking-[0.4em] text-orange-500 mb-8">
              Backed By Industrial Expertise
            </p>
            <div className="relative h-28 sm:h-20 md:h-32 w-full max-w-[420px] transition-all duration-500">
              <Image 
                src="/Protech-Automation-logo.png" 
                alt="Protech Automation" 
                fill 
                className="object-contain lg:object-left" 
              />
            </div>
          </div>
          
          {/* Parent Company Description Side */}
          <div className="lg:w-1/2 w-full">
            <p className="text-slate-500 text-base md:text-lg leading-relaxed font-medium">
              Ixora Tech operates as the dedicated solar infrastructure division of <strong className="text-slate-900">Protech Automation</strong>. By leveraging Protech's deep expertise in smart security supply chains and industrial automation, we deliver solar ecosystems with uncompromising technical reliability and grid-sync precision.
            </p>
          </div>
        </motion.div>

      </div>
    </section>
  );
}