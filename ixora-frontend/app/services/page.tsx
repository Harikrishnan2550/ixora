"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Audiowide } from "next/font/google";
import { 
  FaSolarPanel, 
  FaGear, 
  FaTruckFast, 
  FaCartFlatbed, 
  FaArrowRight, 
  FaShieldHalved, 
  FaMicrochip, 
  FaArrowTrendUp, 
  FaCheckDouble 
} from "react-icons/fa6";

const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

// ── COUNTER COMPONENT FOR PERFORMANCE METRICS ──
function Counter({ value, suffix = "" }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView) {
      let start = 0;
      const end = parseInt(value);
      const duration = 2; // seconds
      let timer = setInterval(() => {
        start += end / (duration * 60);
        if (start >= end) {
          setCount(end);
          clearInterval(timer);
        } else {
          setCount(Math.floor(start));
        }
      }, 1000 / 60);
      return () => clearInterval(timer);
    }
  }, [inView, value]);

  return <span ref={ref}>{count}{suffix}</span>;
}

export default function ExpandedServices() {
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Background Typography Parallax
  const xLeft = useTransform(scrollYProgress, [0, 1], ["-10%", "10%"]);
  const xRight = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  
  // Card Column Parallax (Left column moves slightly faster than right)
  const yCol1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const yCol2 = useTransform(scrollYProgress, [0, 1], [0, -250]);

  const services = [
    {
      id: "01",
      title: "Precision Install",
      kpi: "3-5 Day Deployment",
      desc: "Deploying Tier-1 monocrystalline arrays with high-tensile structural mounting engineered for Kerala's 180km/h wind loads.",
      specs: ["Azimuth Optimization", "AC/DC Load Balance", "Structural Certification"],
      icon: <FaSolarPanel />,
    },
    {
      id: "02",
      title: "Active Maintenance",
      kpi: "24H Response Time",
      desc: "Solar is an asset. We utilize thermal imaging and IV-curve tracing to ensure your system performs at 100% yield for 25+ years.",
      specs: ["Thermal Hotspot Scan", "Panel De-soiling", "Inverter Health Logs"],
      icon: <FaGear />,
    },
    {
      id: "03",
      title: "Smart Distribution",
      kpi: "Tier-1 Hardware",
      desc: "Direct supply-chain access to industrial-grade smart inverters and energy storage nodes for large-scale residential projects.",
      specs: ["Hybrid Grid Logistics", "Smart Meter Sync", "Node Management"],
      icon: <FaTruckFast />,
    },
    {
      id: "04",
      title: "Strategic Sales",
      kpi: "Direct Procurement",
      desc: "End-to-end solar packages including bifacial panels, hybrid inverters, and architectural mounting accessories.",
      specs: ["Custom System Design", "Net-Metering Liaison", "Component Sourcing"],
      icon: <FaCartFlatbed />,
    },
  ];

  const protocols = [
    { 
      title: "Tier-1 Hardware", 
      icon: <FaMicrochip />, 
      desc: "Bloomberg-rated modules for 25-year linear performance." 
    },
    { 
      title: "Precision Mounting", 
      icon: <FaShieldHalved />, 
      desc: "Anodized aluminum structures tested for Kerala's coastal winds." 
    },
    { 
      title: "Thermal Optimization", 
      icon: <FaArrowTrendUp />, 
      desc: "Advanced scanning to maintain 99.8% inverter uptime." 
    },
    { 
      title: "Liaison Support", 
      icon: <FaCheckDouble />, 
      desc: "Full KSEB net-metering and subsidy processing." 
    }
  ];

  const partners = ["TATA POWER", "ADANI SOLAR", "WAREE", "LUMINOUS", "VIKRAM SOLAR", "GROWATT", "SUNGROW"];

  return (
    <section ref={containerRef} className="relative bg-[#FCFCFC] overflow-hidden">
      
      {/* ── 1. KINETIC BACKGROUND (PARALLAX TYPOGRAPHY) ── */}
      <div className="absolute inset-0 flex flex-col justify-center pointer-events-none opacity-[0.03] z-0 overflow-hidden">
        <motion.p style={{ x: xLeft }} className={`${audiowide.className} text-[15vw] whitespace-nowrap uppercase leading-none text-slate-900 mb-10`}>
          Infrastructure • Engineering • Power •
        </motion.p>
        <motion.p style={{ x: xRight }} className={`${audiowide.className} text-[15vw] whitespace-nowrap uppercase leading-none text-slate-900`}>
          Ixora Systems • Technology • Future •
        </motion.p>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 py-24 md:py-44">
        
        {/* ── 2. HEADER ── */}
        <header className="mb-20 md:mb-32 flex flex-col md:flex-row md:items-end justify-between gap-10">
          <div className="max-w-3xl">
            <motion.div 
              initial={{ opacity: 0, x: -40 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-4 mb-6"
            >
              <span className="text-orange-500 font-black text-[9px] tracking-[0.5em] uppercase">Service Architecture</span>
              {/* Animated drawing line */}
              <motion.div 
                initial={{ width: 0 }}
                whileInView={{ width: 64 }} // w-16 equivalent
                viewport={{ once: true }}
                transition={{ duration: 1, delay: 0.2 }}
                className="h-px bg-slate-300" 
              />
            </motion.div>
            
            <motion.h2 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className={`${audiowide.className} text-5xl md:text-8xl tracking-tight uppercase text-slate-950 leading-[0.9]`}
            >
              Technical <span className="text-orange-500 italic">Ecosystem.</span>
            </motion.h2>
          </div>
          
          <motion.p 
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-slate-500 text-base md:text-xl max-w-sm font-medium leading-relaxed border-l-2 border-orange-500 pl-8"
          >
            Defining the standard for high-output solar infrastructure in Kerala through industrial-grade precision.
          </motion.p>
        </header>

        {/* ── 3. DETAILED SERVICE TIERS (PARALLAX CARDS) ── */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-10 items-start mb-44">
          {services.map((service, index) => {
            // Apply different parallax speeds based on column (even vs odd)
            const yMovement = index % 2 === 0 ? yCol1 : yCol2;
            const isRightColumn = index % 2 !== 0;

            return (
              <motion.div
                key={index}
                style={{ y: yMovement }} // Attach parallax
                initial={{ opacity: 0, y: 100 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
                className={`group relative bg-white border border-slate-100 p-8 md:p-14 rounded-[3rem] shadow-[0_10px_40px_-15px_rgba(0,0,0,0.05)] hover:shadow-[0_50px_100px_-20px_rgba(0,0,0,0.1)] transition-all duration-700 overflow-hidden ${isRightColumn ? 'md:mt-32' : ''}`}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-orange-50/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                
                {/* Animated Background Number */}
                <motion.div 
                  initial={{ scale: 0.5, opacity: 0, rotate: -10 }}
                  whileInView={{ scale: 1, opacity: 1, rotate: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 1, delay: 0.3 }}
                  className={`${audiowide.className} absolute -right-6 -top-6 text-[10rem] md:text-[14rem] text-slate-50 group-hover:text-orange-50/80 transition-colors duration-700 pointer-events-none -z-0`}
                >
                  {service.id}
                </motion.div>

                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-12">
                    <motion.div 
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="w-16 h-16 md:w-20 md:h-20 rounded-3xl bg-slate-950 text-white flex items-center justify-center text-3xl group-hover:bg-orange-500 transition-all duration-500 shadow-2xl"
                    >
                      {service.icon}
                    </motion.div>
                    <div className="text-right">
                      <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-300 mb-1">Target KPI</p>
                      <p className={`${audiowide.className} text-xs md:text-sm text-slate-950`}>{service.kpi}</p>
                    </div>
                  </div>

                  <h3 className={`${audiowide.className} text-2xl md:text-4xl uppercase tracking-tighter text-slate-950 mb-6 group-hover:text-orange-600 transition-colors`}>
                    {service.title}
                  </h3>
                  <p className="text-slate-500 text-base md:text-lg leading-relaxed mb-10 max-w-md font-medium">
                    {service.desc}
                  </p>

                  <div className="space-y-4 mb-12">
                    {service.specs.map((spec, i) => (
                      <motion.div 
                        key={i} 
                        initial={{ opacity: 0, x: -10 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + (i * 0.1) }}
                        className="flex items-center gap-4"
                      >
                        <div className="w-2 h-2 rounded-full bg-orange-500 shadow-[0_0_10px_rgba(249,115,22,0.5)]" />
                        <span className="text-[10px] md:text-[11px] font-bold text-slate-400 uppercase tracking-widest">{spec}</span>
                      </motion.div>
                    ))}
                  </div>

                  <button className="flex items-center gap-5 text-[10px] font-black uppercase tracking-[0.4em] group/btn">
                    <span className="group-hover/btn:text-orange-600 transition-colors">Architecture Protocol</span>
                    <div className="h-px w-8 bg-slate-900 group-hover/btn:w-12 group-hover/btn:bg-orange-600 transition-all" />
                    <FaArrowRight className="text-orange-500 group-hover/btn:translate-x-2 transition-transform" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Animated Divider Line */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, ease: "easeInOut" }}
          className="h-px w-full bg-slate-200 origin-left mb-20" 
        />

        {/* ── 4. PERFORMANCE STATS (Animated Counter) ── */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-12 mb-44">
          {[
            { label: "Energy Generated", value: "450", suffix: "MWh+" },
            { label: "Industrial Installs", value: "120", suffix: "+" },
            { label: "System Uptime", value: "99", suffix: "%" },
            { label: "Carbon Offset", value: "12", suffix: "k Tons" },
          ].map((stat, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15, duration: 0.6 }}
              className="flex flex-col items-center lg:items-start text-center lg:text-left"
            >
              <p className="text-orange-500 font-black text-[9px] tracking-[0.4em] uppercase mb-4">{stat.label}</p>
              <h3 className={`${audiowide.className} text-3xl md:text-5xl text-slate-900`}>
                <Counter value={stat.value} suffix={stat.suffix} />
              </h3>
            </motion.div>
          ))}
        </div>

        {/* ── 5. QUALITY ASSURANCE PROTOCOLS (STAGGERED LIST) ── */}
        <div className="grid lg:grid-cols-4 gap-12 mb-44">
          {protocols.map((p, i) => (
            <motion.div 
              key={i} 
              initial={{ opacity: 0, y: 40 }} 
              whileInView={{ opacity: 1, y: 0 }} 
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: i * 0.15, ease: "easeOut" }}
              whileHover={{ y: -10 }}
              className="group bg-white p-8 rounded-[2rem] border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300"
            >
              <div className="w-14 h-14 rounded-2xl bg-slate-50 flex items-center justify-center text-2xl text-slate-400 group-hover:text-white group-hover:bg-orange-500 transition-colors duration-500 mb-6">
                {p.icon}
              </div>
              <h4 className={`${audiowide.className} text-sm uppercase mb-4 tracking-tight text-slate-900`}>{p.title}</h4>
              <p className="text-slate-500 text-xs leading-relaxed font-medium">{p.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── 6. PARTNER MARQUEE (Infinite Loop) ── */}
      <div className="bg-slate-950 py-6 overflow-hidden relative">
  {/* Side Fades */}
  <div className="absolute left-0 top-0 h-full w-40 bg-gradient-to-r from-slate-950 to-transparent z-10 pointer-events-none" />
  <div className="absolute right-0 top-0 h-full w-40 bg-gradient-to-l from-slate-950 to-transparent z-10 pointer-events-none" />
  
  <motion.div 
    animate={{ x: [0, -1035] }} 
    transition={{ duration: 10, repeat: Infinity, ease: "linear" }} 
    className="flex whitespace-nowrap gap-20"
  >
    {[...partners, ...partners].map((p, i) => (
      <motion.span 
        key={i} 
        // 1. Start as slate-800 (#1e293b)
        initial={{ color: "#1e293b" }} 
        // 2. Turn orange-500 (#f97316) when in the "view" box
        whileInView={{ color: "#f97316" }} 
        // 3. Keep the hover effect for desktop users
        whileHover={{ color: "#f97316" }} 
        viewport={{ 
          // 4. This is the magic: Shrinks the trigger box by 35% on the left and right!
          // It forces the text to only highlight when it reaches the middle 30% of the screen.
          margin: "0px -35% 0px -35%", 
          amount: "some" 
        }}
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className={`${audiowide.className} text-3xl md:text-4xl cursor-default`}
      >
        {p}
      </motion.span>
    ))}
  </motion.div>
</div>
    </section>
  );
}