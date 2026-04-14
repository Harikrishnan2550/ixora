"use client";

import { motion } from "framer-motion";
import { 
  FaScrewdriverWrench, 
  FaUserGear, 
  FaSolarPanel, 
  FaHeadset,
  FaArrowRight 
} from "react-icons/fa6";
import { Audiowide } from "next/font/google";

const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

export default function WhyChooseUs() {
  const features = [
    {
      title: "Expert Installation",
      desc: "Our Tier-1 engineering team ensures structural integrity and maximum photovoltaic yield through precision-aligned mounting systems tailored for Kerala's terrain.",
      icon: <FaSolarPanel />,
      tag: "Engineering"
    },
    {
      title: "Quality Products",
      desc: "Exclusively utilizing high-conversion monocrystalline modules and industrial-grade smart inverters.",
      icon: <FaScrewdriverWrench />,
      tag: "Hardware"
    },
    {
      title: "End to End",
      desc: "Complete lifecycle management from initial site feasibility to final grid synchronization.",
      icon: <FaUserGear />,
      tag: "Process"
    },
    {
      title: "Client Support",
      desc: "Real-time system monitoring and a dedicated emergency response unit ensuring your energy independence remains uninterrupted 24/7.",
      icon: <FaHeadset />,
      tag: "Relations"
    },
  ];

  return (
    <section className="py-20 lg:py-32 bg-[#FCFCFC] overflow-visible">
      <div className="max-w-[1400px] mx-auto px-6 lg:px-12">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          {/* LEFT SIDE: STICKY HEADER */}
          <div className="lg:sticky lg:top-40 w-full lg:w-1/2 mb-10 lg:mb-0">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
              viewport={{ once: true }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="text-orange-500 font-black text-[10px] tracking-[0.5em] uppercase">
                  The Advantage
                </span>
                <div className="h-[1px] w-12 bg-slate-200" />
              </div>
              
              <h2 className={`${audiowide.className} text-5xl md:text-7xl lg:text-8xl leading-[0.9] tracking-[-0.05em] uppercase text-slate-900 mb-6 lg:mb-10`}>
                Why Ixora <br />
                <span className="text-slate-300 italic">Systems?</span>
              </h2>

              <p className="text-slate-500 text-lg lg:text-xl font-medium max-w-md leading-relaxed border-l-2 border-orange-500 pl-6 lg:border-none lg:pl-0">
                Advancing energy autonomy through industrial-grade components and precision architectural engineering.
              </p>
            </motion.div>
          </div>

          {/* RIGHT SIDE: STACKING & FOCUS CARDS */}
          <div className="w-full lg:w-1/2 space-y-12 lg:space-y-[30vh] pb-40">
            {features.map((item, index) => (
              <motion.div
                key={index}
                // Mobile: Stacking logic | Desktop: Relative spacing
                className="sticky lg:relative w-full transition-all duration-500"
                style={{ top: `calc(80px + ${index * 30}px)` }} 
                
                initial={{ opacity: 0.2, filter: "blur(8px)", scale: 0.95 }}
                whileInView={{ 
                  opacity: 1, 
                  filter: "blur(0px)", 
                  scale: 1 
                }}
                // This ensures it stays clear until it's actually scrolled past
                viewport={{ amount: 0.6, margin: "0px 0px -10% 0px" }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* CARD CONTAINER */}
                <div className="bg-white lg:bg-transparent border border-slate-100 lg:border-none shadow-2xl shadow-slate-200/40 lg:shadow-none p-8 lg:p-0 rounded-[2.5rem] lg:rounded-none group relative overflow-hidden lg:overflow-visible">
                  
                  {/* Decorative Number */}
                  <span className={`${audiowide.className} absolute -right-4 -top-6 text-8xl lg:text-[14rem] leading-none text-slate-100/30 lg:text-slate-50 lg:opacity-[0.03] group-hover:opacity-10 transition-opacity pointer-events-none z-0`}>
                    0{index + 1}
                  </span>

                  <div className="relative z-10">
                    <div className="flex items-center gap-4 lg:gap-6 mb-6">
                      <div className="p-3 lg:p-4 bg-orange-500 lg:bg-white shadow-lg lg:shadow-sm rounded-xl lg:rounded-2xl text-white lg:text-slate-900 text-2xl lg:text-3xl transition-all duration-500">
                        {item.icon}
                      </div>
                      <span className="text-[9px] lg:text-[10px] font-black uppercase tracking-[0.3em] text-orange-500">
                        {item.tag}
                      </span>
                    </div>

                    <h3 className={`${audiowide.className} text-2xl lg:text-4xl uppercase tracking-tighter text-slate-900 mb-4 lg:mb-6`}>
                      {item.title}
                    </h3>
                    
                    <p className="text-slate-500 text-sm lg:text-xl font-medium leading-relaxed mb-8 max-w-lg">
                      {item.desc}
                    </p>
                    
                    <button className="group/btn flex items-center gap-3 text-[10px] lg:text-[11px] font-black uppercase tracking-widest text-slate-900">
                      <span className="group-hover/btn:text-orange-500 transition-colors">Explore Specification</span>
                      <div className="w-6 lg:w-8 h-[1px] bg-slate-900 group-hover/btn:w-12 group-hover/btn:bg-orange-500 transition-all duration-300" />
                      <FaArrowRight className="text-orange-500 -ml-2 group-hover/btn:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
          
        </div>
      </div>
    </section>
  );
}