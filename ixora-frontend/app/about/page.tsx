"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";
import { Audiowide } from "next/font/google";
import { 
  FaArrowRight, FaSolarPanel, 
  FaBatteryFull, FaSun, FaNetworkWired,
  FaLeaf, FaUsers, FaMicroscope, FaMicrochip
} from "react-icons/fa6";

const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

export default function AboutPage() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  const xLeft = useTransform(scrollYProgress, [0, 1], ["0%", "-20%"]);

  const valueStats = [
    { label: "Engineering Precision", icon: <FaMicrochip />, detail: "Standardizing Tier-1 components across all Kerala deployments." },
    { label: "Community Impact", icon: <FaUsers />, detail: "Powering local infrastructure with sustainable autonomy." },
    { label: "Environmental ROI", icon: <FaLeaf />, detail: "Off-setting industrial carbon footprints through smart-grid tech." },
    { label: "R&D Focused", icon: <FaMicroscope />, detail: "Continuous yield optimization for regional weather patterns." },
  ];

  const techEcosystem = [
    { 
      title: "Photovoltaic Modules", 
      icon: <FaSolarPanel />, 
      desc: "N-Type TOPCon and Half-Cut monocrystalline bifacial panels. Generating up to 20% more yield by capturing scattered light."
    },
    { 
      title: "Intelligent Inverters", 
      icon: <FaNetworkWired />, 
      desc: "AI-driven hybrid inverters that automatically route power between the solar array, the KSEB grid, and battery storage."
    },
    { 
      title: "High-Density Storage", 
      icon: <FaBatteryFull />, 
      desc: "LiFePO4 battery banks. Designed for a 10+ year lifespan with deep-discharge capabilities for absolute grid independence."
    },
    { 
      title: "Solar Irradiation Mapping", 
      icon: <FaSun />, 
      desc: "3D topological software to map your roof's solar irradiance, eliminating shade-loss and calculating precise ROI."
    }
  ];

  return (
    <section ref={containerRef} className="relative bg-[#FAFAFA] overflow-hidden">
      
      {/* ── 1. KINETIC BACKGROUND ── */}
      <div className="absolute inset-0 flex items-center pointer-events-none opacity-[0.02] z-0 overflow-hidden">
        <motion.p
          style={{ x: xLeft }}
          className={`${audiowide.className} text-[20vw] whitespace-nowrap uppercase leading-none text-slate-900 select-none`}
        >
          Engineering&nbsp;•&nbsp;Ixora&nbsp;•&nbsp;Architecture&nbsp;•
        </motion.p>
      </div>

      <div className="relative z-10 pt-32 pb-44">
        
        {/* ── 2. HERO HEADER (CENTERED) ── */}
        <div className="max-w-[1000px] mx-auto px-6 text-center mb-24 md:mb-32">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center justify-center gap-4 mb-8"
          >
            <div className="h-px w-12 bg-orange-500" />
            <span className="text-orange-500 font-black text-[10px] tracking-[0.5em] uppercase">Origin Story</span>
            <div className="h-px w-12 bg-orange-500" />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.8 }}
            className={`${audiowide.className} text-6xl md:text-[7rem] lg:text-[8rem] leading-[0.85] tracking-[-0.05em] uppercase text-slate-950 mb-10`}
          >
            Defining <br />
            <span className="text-orange-500 italic">Standards.</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.8 }}
            className="text-slate-500 text-xl md:text-2xl font-medium leading-relaxed max-w-4xl mx-auto"
          >
            Ixora Tech was founded to bridge the gap between basic solar installation and industrial-grade energy architecture. Based in Kerala, we build for the future of regional energy independence.
          </motion.p>
        </div>

        {/* ── 3. HORIZONTAL METRICS BANNER (ANIMATED) ── */}
        <div className="bg-slate-950 text-white py-16 mb-32 border-y border-slate-800">
          <div className="max-w-[1400px] mx-auto px-6 md:px-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center divide-y md:divide-y-0 md:divide-x divide-slate-800">
              {[
                { label: "MW Installed", value: "12.5+" },
                { label: "Active Nodes", value: "850+" },
                { label: "Uptime Verified", value: "99.9%" }
              ].map((stat, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: i * 0.2, duration: 0.6, ease: "easeOut" }}
                  className="pt-8 md:pt-0"
                >
                  <p className={`${audiowide.className} text-5xl md:text-7xl mb-4 text-orange-500`}>
                    {stat.value}
                  </p>
                  <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-400">
                    {stat.label}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        <div className="max-w-[1400px] mx-auto px-6 md:px-12 space-y-32 md:space-y-48">
          
          {/* ── 4. ALTERNATING SECTION: THE IMPERATIVE ── */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <motion.div 
              initial={{ opacity: 0, x: -40 }} 
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
            >
              <h2 className={`${audiowide.className} text-4xl md:text-5xl uppercase text-slate-950 mb-8`}>
                The Solar <span className="text-orange-500 italic">Imperative</span>
              </h2>
              <p className="text-slate-500 text-lg leading-relaxed mb-6">
                Energy isn't just a utility anymore; it's a strategic asset. With rising KSEB tariffs and unpredictable grid loads, transitioning to a localized solar micro-grid is the most critical infrastructure upgrade a business or premium residence can make.
              </p>
              <p className="text-slate-500 text-lg leading-relaxed mb-8">
                By capturing pure photovoltaic energy, we don't just offset your electricity bill—we turn your roof into an active, revenue-generating power plant that pays for itself in 3 to 5 years while drastically cutting your carbon footprint.
              </p>
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: 40 }} 
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square lg:aspect-video rounded-[3rem] overflow-hidden border border-slate-300 shadow-2xl"
            >
              <Image 
                src="/solar-array.png" 
                alt="Premium Residential Solar Array Installation by Ixora Tech"
                fill
                className="object-cover"
                sizes="(max-w-768px) 100vw, 50vw"
                priority
              />
            </motion.div>
          </div>

          {/* ── 5. ALTERNATING SECTION: HARDWARE ECOSYSTEM (STAGGERED LIST) ── */}
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, x: -40 }} 
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.8 }}
              className="relative aspect-square lg:aspect-video bg-white rounded-[3rem] overflow-hidden flex items-center justify-center order-2 lg:order-1 shadow-2xl border border-slate-100 p-8"
            >
              <Image 
                src="/solar-diagram1.png" 
                alt="Ixora Tech Complete Solar Hardware Ecosystem Diagram"
                fill
                className="object-cover" 
                sizes="(max-w-768px) 100vw, 50vw"
              />
            </motion.div>

            <div className="order-1 lg:order-2">
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                className={`${audiowide.className} text-4xl md:text-5xl uppercase text-slate-950 mb-8`}
              >
                Hardware <span className="text-slate-300 italic">Ecosystem</span>
              </motion.h2>
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ delay: 0.1 }}
                className="text-slate-500 text-lg leading-relaxed mb-12"
              >
                A solar plant is only as reliable as its weakest component. Ixora refuses to compromise, partnering strictly with Tier-1 Bloomberg-rated manufacturers to build an uncompromising energy stack.
              </motion.p>
              
              <div className="space-y-8">
                {techEcosystem.map((tech, i) => (
                  <motion.div 
                    key={i} 
                    initial={{ opacity: 0, x: 40 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ duration: 0.6, delay: 0.2 + (i * 0.15) }}
                    className="flex gap-6 items-start group"
                  >
                    <div className="w-14 h-14 rounded-2xl bg-white border border-slate-100 shadow-sm flex items-center justify-center text-orange-500 text-xl shrink-0 group-hover:bg-orange-500 group-hover:text-white transition-colors duration-500">
                      {tech.icon}
                    </div>
                    <div>
                      <h4 className={`${audiowide.className} text-lg uppercase tracking-tight text-slate-900 mb-2`}>
                        {tech.title}
                      </h4>
                      <p className="text-slate-500 text-sm md:text-base leading-relaxed font-medium">
                        {tech.desc}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* ── 6. FULL WIDTH GRID: THE IXORA DNA (STAGGERED) ── */}
          <div>
            <motion.div 
              initial={{ opacity: 0, y: 30 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-100px" }}
              className="text-center mb-16"
            >
              <h2 className={`${audiowide.className} text-4xl md:text-5xl uppercase text-slate-950 mb-6`}>
                The <span className="text-orange-500">Ixora</span> DNA
              </h2>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Our approach is rooted in technical rigor. From site topology drone-mapping to calculating exact wind-load stress on structural mounts, every project is a masterpiece of precision.
              </p>
            </motion.div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {valueStats.map((item, i) => (
                <motion.div 
                  key={i} 
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
                  whileHover={{ y: -10, boxShadow: "0 20px 40px -15px rgba(249, 115, 22, 0.15)" }}
                  className="bg-white p-8 md:p-10 rounded-[2.5rem] border border-slate-100 shadow-sm group hover:border-orange-500 transition-all duration-300 text-center flex flex-col items-center"
                >
                  <div className="text-orange-500 text-4xl mb-8 flex justify-center group-hover:scale-110 transition-transform duration-500">
                    {item.icon}
                  </div>
                  <h4 className={`${audiowide.className} text-base uppercase tracking-wider mb-4 text-slate-900`}>
                    {item.label}
                  </h4>
                  <p className="text-slate-500 text-[11px] leading-relaxed uppercase tracking-widest font-bold">
                    {item.detail}
                  </p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* ── 7. CENTERED CTA: REGIONAL SPECIALIZATION ── */}
          <motion.div 
            initial={{ opacity: 0, y: 40, scale: 0.95 }} 
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.8 }}
            className="bg-slate-950 rounded-[3rem] p-10 md:p-20 text-center relative overflow-hidden shadow-2xl"
          >
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_#fb923c_1px,_transparent_1px)] [background-size:30px_30px] opacity-10" />
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h2 className={`${audiowide.className} text-4xl md:text-5xl uppercase text-white mb-8`}>
                Regional <span className="text-orange-500 italic">Specialization</span>
              </h2>
              <p className="text-slate-400 text-lg leading-relaxed mb-12">
                Kerala's terrain presents unique engineering challenges—high humidity, heavy monsoons, and salt-mist corrosion. We utilize anodized aluminum structures and IP68-rated enclosures to ensure 25+ years of uninterrupted yield.
              </p>
              <button className="mx-auto flex items-center gap-4 text-[10px] font-black uppercase tracking-[0.5em] text-slate-950 bg-white px-8 py-5 rounded-full hover:bg-orange-500 hover:text-white transition-all duration-500 group shadow-xl">
                Download Technical Manifesto <FaArrowRight className="group-hover:translate-x-2 transition-transform" />
              </button>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}