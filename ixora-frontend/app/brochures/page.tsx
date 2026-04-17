"use client";

import { useState, useEffect, useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import Link from "next/link";
import { Audiowide } from "next/font/google";
import { 
  FaFilePdf, FaDownload, FaArrowRight, FaEye, 
  FaBookBookmark, FaCertificate, FaGlobe, FaShieldHalved, FaFileShield
} from "react-icons/fa6";

const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

// Change this to your live server URL when deploying to production
const API_BASE = "http://localhost:5000";

const compliances = [
  { title: "IEC 61215 & 61730", desc: "Design qualification and type approval for terrestrial photovoltaic modules.", icon: <FaCertificate /> },
  { title: "MNRE Approved", desc: "Certified under the Ministry of New and Renewable Energy guidelines.", icon: <FaShieldHalved /> },
  { title: "ISO 9001:2015", desc: "International standard for quality management systems in engineering.", icon: <FaGlobe /> },
  { title: "IP68 Enclosures", desc: "Maximum protection against dust ingress and continuous water submersion.", icon: <FaFileShield /> },
];

export default function BrochurePage() {
  const [brochures, setBrochures] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  // Kinetic Background Animation
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });
  const xRight = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  useEffect(() => {
    fetchBrochures();
  }, []);

  const fetchBrochures = async () => {
    try {
      setLoading(true);
      const res = await fetch(`${API_BASE}/api/brochures`);
      const data = await res.json();
      setBrochures(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  // Helper to ensure URLs are formatted correctly from the backend
  const getFileUrl = (url: string) => {
    if (!url) return "#";
    if (url.startsWith("http")) return url;
    return `${API_BASE}/${url.replace(/^\//, '')}`;
  };

  return (
    <div ref={containerRef} className="relative bg-[#FAFAFA] min-h-screen overflow-hidden mt-6 lg:mt-14">
      
      {/* ── 1. KINETIC BACKGROUND ── */}
      <div className="absolute inset-0 flex items-center pointer-events-none opacity-[0.02] z-0 overflow-hidden">
        <motion.p
          style={{ x: xRight }}
          className={`${audiowide.className} text-[20vw] whitespace-nowrap uppercase leading-none text-slate-900 select-none`}
        >
          Technical&nbsp;•&nbsp;Documentation&nbsp;•&nbsp;Assets&nbsp;•
        </motion.p>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-24">
        
        {/* ── 2. PAGE HEADER ── */}
        <header className="mb-20 md:mb-32">
          <div className="flex items-center gap-4 mb-6">
            <motion.span 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              className="text-orange-500 font-black text-[10px] tracking-[0.4em] uppercase"
            >
              Resource Center
            </motion.span>
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: 64 }}
              transition={{ duration: 1, delay: 0.2 }}
              className="h-px bg-slate-300" 
            />
          </div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className={`${audiowide.className} text-[11vw] lg:text-[8rem] leading-[0.85] tracking-[-0.05em] uppercase text-slate-950 mb-8`}
          >
            Technical <br />
            <span className="text-orange-500 italic">Library.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-500 text-base md:text-lg max-w-2xl font-medium leading-relaxed border-l-2 border-orange-500 pl-6"
          >
            Access precision engineering specs, structural compliance sheets, and Tier-1 
            infrastructure documentation for all Ixora Tech systems.
          </motion.p>
        </header>

        {/* ── 3. FEATURED ASSET: THE MASTER PROTOCOL ── */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8 }}
          className="bg-slate-950 rounded-[3rem] p-10 md:p-16 mb-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden group"
        >
          <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-orange-500 rounded-full blur-[100px] opacity-10 pointer-events-none group-hover:opacity-20 transition-opacity duration-1000" />
          
          <div className="lg:w-2/3 relative z-10">
            <div className="flex items-center gap-3 mb-6">
              <div className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
              </div>
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300">Featured Document</span>
            </div>
            <h2 className={`${audiowide.className} text-3xl md:text-5xl uppercase text-white mb-6 leading-tight`}>
              Ixora Tech 2026 <br /> <span className="text-orange-500">Master Catalog</span>
            </h2>
            <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-xl">
              The complete overview of our Tier-1 hardware ecosystem, regional deployment strategies, and full technical specifications for residential and industrial scaling.
            </p>
          </div>

          <div className="lg:w-1/3 w-full relative z-10 flex flex-col gap-4">
            <button className="w-full flex items-center justify-between bg-orange-500 text-white px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-white hover:text-slate-950 transition-all duration-500 shadow-xl group/btn">
              <span>Download Master PDF</span>
              <FaDownload className="group-hover/btn:-translate-y-1 transition-transform" />
            </button>
            <p className="text-center text-[9px] font-black uppercase tracking-[0.2em] text-slate-500 mt-2">
              PDF Document // 12.8 MB
            </p>
          </div>
        </motion.div>

        {/* ── 4. DYNAMIC BROCHURE GRID ── */}
        <section className="relative mb-40">
          <div className="mb-10 flex items-center gap-4">
            <h3 className={`${audiowide.className} text-2xl uppercase text-slate-950`}>Component Specs</h3>
            <div className="h-px flex-grow bg-slate-200" />
          </div>

          {loading ? (
            <div className="flex justify-center py-20">
               <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(249,115,22,0.5)]" />
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
              {brochures.map((item, index) => (
                <motion.div
                  key={item._id}
                  initial={{ opacity: 0, y: 40 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.15, duration: 0.6, ease: "easeOut" }}
                  whileHover={{ y: -10 }}
                  className="group bg-white border border-slate-200/60 p-8 md:p-10 rounded-[2.5rem] shadow-sm hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.05)] hover:border-orange-500/30 transition-all duration-500 flex flex-col"
                >
                  <div className="flex justify-between items-start mb-10">
                    <div className="p-4 md:p-5 bg-slate-50 rounded-2xl group-hover:bg-orange-50 transition-colors duration-500">
                      <FaFilePdf className="text-slate-400 text-3xl group-hover:text-orange-500 transition-colors" />
                    </div>
                    <span className="text-[9px] font-black text-slate-400 uppercase tracking-[0.2em] pt-2">
                      PDF / Spec
                    </span>
                  </div>

                  <h3 className={`${audiowide.className} text-xl md:text-2xl uppercase tracking-tighter text-slate-950 mb-8 flex-grow leading-tight`}>
                    {item.title}
                  </h3>

                  <div className="flex flex-col gap-3 mt-auto">
                    <a
                      href={getFileUrl(item.fileUrl)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-between bg-slate-950 text-white px-6 py-4.5 rounded-xl font-black text-[9px] uppercase tracking-widest group/view hover:bg-orange-500 transition-all duration-300"
                    >
                      <span>View Protocol</span>
                      <FaEye className="group-hover/view:scale-110 transition-transform" />
                    </a>

                    <a
                      href={getFileUrl(item.fileUrl)}
                      download
                      className="flex items-center justify-between border border-slate-200 text-slate-950 px-6 py-4.5 rounded-xl font-black text-[9px] uppercase tracking-widest hover:border-slate-950 hover:bg-slate-50 transition-all duration-300 group/dl"
                    >
                      <span>Download File</span>
                      <FaDownload className="text-slate-400 group-hover/dl:text-slate-950 transition-colors" />
                    </a>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {!loading && brochures.length === 0 && (
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="text-center py-32 border-2 border-dashed border-slate-200 rounded-[3rem] bg-slate-50/50"
            >
              <FaBookBookmark className="mx-auto text-4xl text-slate-300 mb-6" />
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                0 Documents / Database Syncing...
              </p>
            </motion.div>
          )}
        </section>

        {/* ── 5. COMPLIANCE & STANDARDS GRID ── */}
        <motion.section 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="mb-32"
        >
          <div className="text-center mb-16">
            <h2 className={`${audiowide.className} text-3xl md:text-4xl uppercase text-slate-950 mb-4`}>
              Compliance <span className="text-orange-500">Standards</span>
            </h2>
            <p className="text-slate-500 font-medium">All hardware documented above adheres to strict global regulations.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {compliances.map((comp, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15, duration: 0.6 }}
                className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-sm text-center flex flex-col items-center hover:border-orange-500/30 transition-colors"
              >
                <div className="text-orange-500 text-3xl mb-6">
                  {comp.icon}
                </div>
                <h4 className={`${audiowide.className} text-sm md:text-base uppercase tracking-tight text-slate-900 mb-3`}>
                  {comp.title}
                </h4>
                <p className="text-slate-500 text-xs leading-relaxed">
                  {comp.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* ── 6. PREMIUM FOOTER CALLOUT ── */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="bg-orange-500 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center justify-between gap-10 shadow-2xl shadow-orange-500/20"
        >
           <div className="text-center md:text-left">
             <h2 className={`${audiowide.className} text-3xl md:text-5xl uppercase text-white mb-4`}>
               Need Custom <br className="hidden md:block" /> Specs?
             </h2>
             <p className="text-white/90 text-sm md:text-base font-medium">
               Our engineering team can provide site-specific CAD drawings and yield reports.
             </p>
           </div>
           
           <Link href="/contact" className="flex-shrink-0 group">
             <button className="bg-white text-orange-500 px-8 py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-950 hover:text-white transition-all duration-500 shadow-xl flex items-center gap-4">
               <span>Contact Engineering</span>
               <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
             </button>
           </Link>
        </motion.div>

      </div>
    </div>
  );
}