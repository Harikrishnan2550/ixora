"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { FaArrowRight, FaPlus } from "react-icons/fa6";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

export default function Gallery() {
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Parallax scroll effect for the background text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const xRight = useTransform(scrollYProgress, [0, 1], ["0%", "10%"]);

  const images = [
    { src: "/img2.png", span: "lg:col-span-2 lg:row-span-2" },
    { src: "/img3.png", span: "lg:col-span-1 lg:row-span-1" },
    { src: "/img1.png", span: "lg:col-span-1 lg:row-span-2" },
    { src: "/img4.png", span: "lg:col-span-1 lg:row-span-1" },
    { src: "/img5.png", span: "lg:col-span-1 lg:row-span-1" },
  ];

  return (
    <section ref={containerRef} className="relative py-32 bg-[#FCFCFC] min-h-screen overflow-hidden">
      
      {/* ── 1. KINETIC BACKGROUND ── */}
      <div className="absolute inset-0 flex items-center pointer-events-none opacity-[0.025] z-0 overflow-hidden">
        <motion.p
          style={{ x: xRight }}
          className={`${audiowide.className} text-[20vw] whitespace-nowrap uppercase leading-none text-slate-900 select-none`}
        >
          Visual&nbsp;•&nbsp;Architecture&nbsp;•&nbsp;Nodes&nbsp;•
        </motion.p>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12">
        
        {/* ── 2. SECTION HEADER ── */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-orange-500 font-black text-[10px] tracking-[0.5em] uppercase">Visual Archive</span>
              {/* Animated Drawing Line */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-[1px] bg-slate-300" 
              />
            </div>
            <h2 className={`${audiowide.className} text-5xl md:text-8xl leading-[0.85] tracking-[-0.06em] uppercase text-slate-950`}>
              Project <br />
              <span className="text-slate-200 italic">Portfolio.</span>
            </h2>
          </motion.div>

          <motion.div 
             initial={{ opacity: 0, x: 30 }}
             whileInView={{ opacity: 1, x: 0 }}
             viewport={{ once: true, margin: "-50px" }}
             transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
             className="max-w-sm pb-4 border-l-2 border-orange-500 pl-8"
          >
            <p className="text-slate-500 text-lg font-medium leading-relaxed">
              Documenting the integration of high-performance solar technology across Kerala's architectural landscape.
            </p>
          </motion.div>
        </div>

        {/* ── 3. MASONRY-STYLE GRID (STAGGERED CASCADE) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-[300px] py-4">
          {images.map((img, index) => (
            <motion.div 
              key={index}
              initial={{ opacity: 0, y: 50, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              // Staggered delay for the waterfall effect
              transition={{ delay: index * 0.15, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.15)"
              }}
              className={`${img.span} relative group overflow-hidden rounded-[2.5rem] border border-slate-100 bg-slate-100 transition-all duration-500 cursor-pointer`}
            >
              <Image
                src={img.src}
                alt={`Solar Project Node 0${index + 1}`}
                fill
                className="object-cover  group-hover:scale-105 transition-all duration-1000 ease-[0.16,1,0.3,1]"
              />
              
              {/* Subtle Overlay Label with Animated Entrance on Hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 p-10 flex flex-col justify-end">
                <div className="translate-y-4 group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <p className={`${audiowide.className} text-white text-xl md:text-2xl uppercase tracking-tighter`}>
                    Installation Node 0{index + 1}
                  </p>
                  <div className="flex items-center gap-3 text-orange-400 text-[10px] font-black uppercase tracking-[0.2em] mt-3">
                     <FaPlus className="text-white" /> View Specification
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── 4. REFINED ACTION BUTTON ── */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-center mt-24"
        >
          <Link href="/gallery" className="group">
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="inline-flex items-center gap-5 bg-slate-950 text-white px-12 py-5 rounded-2xl font-black text-[10px] uppercase tracking-[0.3em] hover:bg-orange-500 transition-all duration-500 shadow-xl shadow-slate-200/50"
            >
              <span>Explore Full Archive</span>
              <FaArrowRight className="group-hover:translate-x-2 transition-transform duration-300" />
            </motion.button>
          </Link>
        </motion.div>
        
      </div>
    </section>
  );
}