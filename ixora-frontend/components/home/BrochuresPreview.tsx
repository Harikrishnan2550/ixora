"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { FaFilePdf, FaDownload, FaEye } from "react-icons/fa6";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

export default function Brochures() {
  const [brochures, setBrochures] = useState<any[]>([]);
  const containerRef = useRef<HTMLDivElement>(null);

  // Parallax scroll effect for the background text
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const xRight = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    fetchBrochures();
  }, []);

  const fetchBrochures = async () => {
    // ── TEMPORARY MOCK DATA FOR VERCEL DEMO ──
    const dummyData = [
      { _id: "1", title: "3kW Essential Grid Spec", fileUrl: "#" },
      { _id: "2", title: "5kW Performance Node", fileUrl: "#" },
      { _id: "3", title: "Hybrid Inverter Datasheet", fileUrl: "#" },
    ];
    setBrochures(dummyData);

    /* BACKEND FETCH LOGIC (Commented out for UI demo)
    try {
      const res = await fetch(`http://localhost:5000/api/brochures`);
      const data = await res.json();
      setBrochures(data);
    } catch (error) {
      console.error("Technical Archive Error:", error);
    }
    */
  };

  return (
    <section ref={containerRef} className="py-32 bg-[#FAFAFA] overflow-hidden min-h-screen relative">
      
      {/* ── 1. KINETIC BACKGROUND ── */}
      <div className="absolute inset-0 flex items-center pointer-events-none opacity-[0.025] z-0 overflow-hidden">
        <motion.p
          style={{ x: xRight }}
          className={`${audiowide.className} text-[20vw] whitespace-nowrap uppercase leading-none text-slate-900 select-none`}
        >
          Technical&nbsp;•&nbsp;Documentation&nbsp;•&nbsp;Assets&nbsp;•
        </motion.p>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-8 lg:px-12">
        
        {/* ── 2. SECTION HEADER ── */}
        <div className="flex flex-col md:flex-row justify-between items-end gap-10 mb-20">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="text-orange-500 font-black text-[10px] tracking-[0.5em] uppercase">Document Repository</span>
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 64 }}
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.3 }}
                className="h-[1px] bg-slate-300" 
              />
            </div>
            <h2 className={`${audiowide.className} text-5xl md:text-8xl leading-[0.85] tracking-[-0.06em] uppercase text-slate-950`}>
              Technical <br />
              <span className="text-slate-300 italic">Archive.</span>
            </h2>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            className="max-w-sm pb-4 border-l-2 border-orange-500 pl-8 text-slate-500 text-lg font-medium leading-relaxed"
          >
            Access our comprehensive solar specifications, structural blueprints, and maintenance protocols.
          </motion.p>
        </div>

        {/* ── 3. BROCHURE GRID (STAGGERED CASCADE) ── */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4">
          {brochures.map((item, index) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              whileHover={{ 
                y: -8, 
                boxShadow: "0 25px 50px -12px rgba(0,0,0,0.08)",
                borderColor: "rgba(249, 115, 22, 0.2)"
              }}
              className="group bg-white p-10 rounded-[2.5rem] border border-slate-100 flex flex-col justify-between min-h-[340px] relative overflow-hidden transition-colors duration-500"
            >
              <div className="absolute -bottom-6 -right-4 opacity-[0.02] group-hover:opacity-[0.06] transition-opacity duration-700 pointer-events-none transform group-hover:scale-110">
                <FaFilePdf size={180} />
              </div>

              <div className="relative z-10">
                <div className="flex justify-between items-start mb-10">
                  <div className="text-slate-950 text-4xl group-hover:text-orange-500 transition-colors duration-500">
                    <FaFilePdf />
                  </div>
                  <span className={`${audiowide.className} text-slate-100 text-6xl leading-none transition-colors duration-500 group-hover:text-slate-200`}>
                    0{index + 1}
                  </span>
                </div>

                <h3 className={`${audiowide.className} text-2xl uppercase tracking-tighter text-slate-950 group-hover:text-orange-500 transition-colors duration-500 leading-tight`}>
                  {item.title}
                </h3>
                <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 mt-3">
                  PDF Documents // Technical Specifications
                </p>
              </div>

              <div className="flex gap-4 mt-12 relative z-10">
                <a
                  href={item.fileUrl}
                  className="flex-1 flex items-center justify-center gap-2 bg-slate-950 text-white text-[10px] font-black uppercase tracking-widest py-4 rounded-xl hover:bg-orange-500 transition-all duration-300 shadow-md hover:shadow-orange-500/20 group/view"
                >
                  <FaEye className="group-hover/view:scale-110 transition-transform" /> View
                </a>
                <a
                  href={item.fileUrl}
                  className="flex-1 flex items-center justify-center gap-2 border border-slate-200 text-slate-900 text-[10px] font-black uppercase tracking-widest py-4 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-all duration-300 group/dl"
                >
                  <FaDownload className="text-slate-400 group-hover/dl:text-slate-900 transition-colors" /> Get Copy
                </a>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}