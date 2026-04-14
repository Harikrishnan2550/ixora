"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { 
  FaSolarPanel, 
  FaScrewdriverWrench, 
  FaTruckFast, 
  FaCartPlus,
  FaArrowRight 
} from "react-icons/fa6";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

export default function Services() {
  const targetRef = useRef(null);
  const scrollRef = useRef(null);
  const [scrollRange, setScrollRange] = useState(0);

  const services = [
    {
      title: "Installation",
      desc: "Full-scale deployment of residential and industrial solar arrays with localised structural reinforcement.",
      icon: <FaSolarPanel />,
      tag: "Deployment",
      bg: "bg-white"
    },
    {
      title: "Maintenance",
      desc: "System health checks, cleaning, and performance tuning for 100% yield optimisation and longevity.",
      icon: <FaScrewdriverWrench />,
      tag: "Optimisation",
      bg: "bg-slate-50"
    },
    {
      title: "Distribution",
      desc: "Direct supply chain of Tier-1 solar modules and smart-grid ready components for global logistics.",
      icon: <FaTruckFast />,
      tag: "Logistics",
      bg: "bg-white"
    },
    {
      title: "Sales",
      desc: "Consultative energy planning and premium equipment procurement for high-end industrial projects.",
      icon: <FaCartPlus />,
      tag: "Procurement",
      bg: "bg-slate-950 text-white"
    },
  ];

  // The perfect formula to stop exactly when the last card is on screen
  useEffect(() => {
    const calculateScroll = () => {
      if (scrollRef.current) {
        const trackWidth = scrollRef.current.scrollWidth;
        const viewportWidth = window.innerWidth;
        
        // This math says: "Slide left only enough to show the end of the track"
        setScrollRange(trackWidth - viewportWidth);
      }
    };

    calculateScroll();
    
    // Robust listeners to recalculate if the user resizes or fonts load late
    const resizeObserver = new ResizeObserver(() => calculateScroll());
    if (scrollRef.current) resizeObserver.observe(scrollRef.current);
    window.addEventListener("resize", calculateScroll);
    
    return () => {
      resizeObserver.disconnect();
      window.removeEventListener("resize", calculateScroll);
    };
  }, []);

  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ["start start", "end end"],
  });

  const xTranslate = useTransform(scrollYProgress, [0, 1], [0, -scrollRange]);
  const x = useSpring(xTranslate, { stiffness: 100, damping: 20 });

  return (
    <section ref={targetRef} className="relative h-[300vh] bg-white">
      <div className="sticky top-0 flex h-screen items-center overflow-hidden pt-20">
        <div className="w-full">
          
          {/* Header Section */}
          <div className="max-w-[1400px] mx-auto px-8 lg:px-12 mb-12">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              className="flex items-center gap-4 mb-4"
            >
              <span className="text-orange-500 font-black text-[10px] tracking-[0.5em] uppercase">Core Capabilities</span>
              <div className="h-[1px] w-12 bg-slate-200" />
            </motion.div>
            
            <h2 className={`${audiowide.className} text-5xl md:text-8xl leading-tight tracking-[-0.05em] uppercase text-slate-950`}>
              Energy <span className="text-slate-200 italic outline-text">Solutions.</span>
            </h2>
          </div>

          {/* THE MOVING TRACK */}
          <motion.div 
            ref={scrollRef}
            style={{ x }} 
            className="flex gap-8 pl-8 lg:pl-12 w-max"
          >
            {services.map((service, index) => (
              <ServiceCard key={index} service={service} index={index} scrollYProgress={scrollYProgress} />
            ))}
            
            {/* FIXED: Removed the massive 100vw spacer.
              This w-12 spacer acts as your final right margin. 
              The moment this invisible block hits the right side of the monitor, 
              horizontal scrolling finishes and vertical scrolling to the next section begins.
            */}
            <div className="shrink-0 w-8 lg:w-12 h-10" />
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index, scrollYProgress }) {
  const numberY = useTransform(scrollYProgress, [0, 1], [20, -60]);
  const isDark = service.bg.includes('slate-950');

  return (
    <motion.div
      className={`
        ${service.bg} 
        shrink-0 
        w-[85vw] md:w-[500px] lg:w-[650px] 
        min-h-[200px] lg:min-h-[240px]
        group p-6 md:p-8 rounded-[2rem] border border-slate-100 flex flex-col justify-between 
        relative overflow-hidden transition-all duration-700 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)]
      `}
    >
      <motion.span 
        style={{ y: numberY }}
        className={`${audiowide.className} absolute -right-2 -bottom-6 text-[8rem] md:text-[12rem] leading-none pointer-events-none z-0 select-none opacity-[0.03]
          ${isDark ? 'text-white' : 'text-slate-900'} 
        `}>
        0{index + 1}
      </motion.span>

      <div className="relative z-10 flex justify-between items-start">
        <motion.div 
          whileHover={{ rotate: -5, scale: 1.05 }}
          className={`p-3 md:p-4 rounded-2xl text-2xl shadow-sm transition-colors
            ${isDark ? 'bg-slate-800 text-orange-400' : 'bg-white text-slate-950 border border-slate-50'}
          `}>
          {service.icon}
        </motion.div>
        
        <div className="flex flex-col items-end gap-2">
          <span className={`text-[9px] font-black uppercase tracking-widest py-1.5 px-4 rounded-full border
            ${isDark ? 'border-slate-800 text-slate-500' : 'border-slate-100 text-slate-400'}
          `}>
            {service.tag}
          </span>
          <div className="flex items-center gap-2 px-1">
            <span className="relative flex h-1.5 w-1.5">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
            </span>
            <span className="text-[7px] uppercase font-bold tracking-tighter text-slate-400">System Active</span>
          </div>
        </div>
      </div>

      <div className="relative z-10 mt-auto pt-6">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
          <div className="max-w-[320px]">
            <h3 className={`${audiowide.className} text-xl md:text-3xl uppercase tracking-tighter mb-2 ${isDark ? 'text-white' : 'text-slate-950'}`}>
              {service.title}
            </h3>
            <p className={`text-xs md:text-sm font-medium leading-relaxed ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
              {service.desc}
            </p>
          </div>
          
          <motion.button 
            whileHover={{ x: 5 }}
            className={`flex items-center gap-3 text-[10px] font-black uppercase tracking-[0.2em] shrink-0 group/btn
            ${isDark ? 'text-orange-400' : 'text-slate-950'}`}>
            <span className="hidden md:inline-block">Protocol</span>
            <div className={`w-10 h-10 rounded-full border flex items-center justify-center transition-colors
              ${isDark ? 'border-slate-800 group-hover/btn:bg-orange-400 group-hover/btn:text-slate-950' : 'border-slate-100 group-hover/btn:bg-slate-950 group-hover/btn:text-white'}
            `}>
              <FaArrowRight className="transition-transform group-hover/btn:-rotate-45" />
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}