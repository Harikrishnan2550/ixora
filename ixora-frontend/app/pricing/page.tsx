"use client";

import { motion, useScroll, useTransform, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import { Audiowide } from "next/font/google";
import { 
  FaArrowRight, FaBolt, FaMicrochip, FaXmark, FaWhatsapp, 
  FaFileContract, FaScrewdriverWrench, FaChartLine, FaTowerBroadcast 
} from "react-icons/fa6";
import Image from "next/image";

const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

// Automatically use live backend URL if it exists, otherwise fall back to localhost
const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

const tiers = [
  {
    name: "Essential Grid",
    power: "3kW System",
    price: "₹2,10,000",
    image: "/3kw.png", 
    features: [
      "Brand: Customer Choice", 
      "25 Years On-Site Warranty", 
      "Mounting Structure Included", 
      "Professional Installation"
    ],
    icon: <FaBolt />,
    popular: false,
  },
  {
    name: "Performance Node",
    power: "5kW System",
    price: "₹3,10,000",
    image: "/5kw.png", 
    features: [
      "Brand: Customer Choice", 
      "25 Years On-Site Warranty", 
      "High-Load Mounting Structure", 
      "Optimized Yield Tech"
    ],
    icon: <FaMicrochip />,
    popular: true,
  }
];

const standardFeatures = [
  { title: "KSEB Net-Metering", desc: "We handle 100% of the grid-integration paperwork and utility approvals.", icon: <FaFileContract /> },
  { title: "Structural Integrity", desc: "Anodized aluminum mounts engineered for high wind-loads and monsoons.", icon: <FaScrewdriverWrench /> },
  { title: "App Telemetry", desc: "Real-time monitoring of your energy yield via dedicated mobile dashboard.", icon: <FaTowerBroadcast /> },
  { title: "Yield Guarantee", desc: "25-year performance warranty on all Tier-1 photovoltaic modules.", icon: <FaChartLine /> },
];

const faqs = [
  { q: "Do these prices include KSEB subsidies?", a: "The prices listed are baseline estimations. Subsidies vary based on exact residential eligibility and current state allocations. We calculate exact subsidy deductions during your technical consultation." },
  { q: "How long does deployment take?", a: "Once the hardware is procured, physical installation takes 2-4 days. However, KSEB net-metering approvals can take an additional 2-4 weeks depending on the regional office." },
  { q: "What if I need a battery backup?", a: "The listed packages are On-Grid. If you require hybrid inverters and LiFePO4 battery banks for power-outage protection, request a 'Custom kW' configuration." },
  { q: "Is maintenance included?", a: "Every deployment includes 1 year of comprehensive free maintenance. Following that, we offer affordable annual maintenance contracts (AMC) for cleaning and telemetry audits." },
];

export default function PricingPage() {
  const [modalConfig, setModalConfig] = useState({ isOpen: false, selectedPlan: "" });
  const [formData, setFormData] = useState({ name: "", phone: "", email: "", address: "", type: "Residential", capacity: "" });
  
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");
  
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: containerRef, offset: ["start end", "end start"] });
  const xRight = useTransform(scrollYProgress, [0, 1], ["0%", "15%"]);

  // Helper to ensure only numbers are typed in the phone field
  const handlePhoneChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value.replace(/[^0-9]/g, ''); // Strip non-numeric characters
    setFormData({ ...formData, phone: value });
  };

  // ── EMAIL SUBMISSION HANDLER ──
  const handleEmailSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setStatus("idle");

    try {
      const res = await fetch(`${API_BASE}/api/contact`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          targetEmail: "info@protechautomationsolar.com",
          subject: `New Plan Enquiry: ${modalConfig.selectedPlan}`,
          customerName: formData.name,
          phone: formData.phone,
          email: formData.email,
          address: formData.address,
          plan: modalConfig.selectedPlan,
          message: `Site Type: ${formData.type} | Requested Capacity: ${formData.capacity}kW`
        }),
      });

      if (!res.ok) {
        throw new Error("Backend rejected the transmission.");
      }

      setStatus("success");
      
      // Close modal automatically after 2.5 seconds on success
      setTimeout(() => {
        setModalConfig({ isOpen: false, selectedPlan: "" });
        setStatus("idle");
        setFormData({ name: "", phone: "", email: "", address: "", type: "Residential", capacity: "" });
      }, 2500);

    } catch (error) {
      console.error("Transmission failed:", error);
      setStatus("error");
    } finally {
      setLoading(false);
    }
  };

  // ── WHATSAPP SUBMISSION HANDLER ──
  const handleWhatsAppSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const message = `*New System Inquiry*%0A*Plan:* ${modalConfig.selectedPlan}%0A*Name:* ${formData.name}%0A*Phone:* ${formData.phone}%0A*Location:* ${formData.address}%0A*Type:* ${formData.type}%0A*Requested Capacity:* ${formData.capacity}kW`;
    window.open(`https://wa.me/918891785527?text=${message}`, "_blank"); 
  };

  return (
    <div ref={containerRef} className="relative bg-[#FAFAFA] min-h-screen overflow-hidden mt-4 lg:mt-12">
      
      {/* ── 1. KINETIC BACKGROUND ── */}
      <div className="absolute inset-0 flex items-center pointer-events-none opacity-[0.025] z-0 overflow-hidden">
        <motion.p style={{ x: xRight }} className={`${audiowide.className} text-[20vw] whitespace-nowrap uppercase leading-none text-slate-900 select-none`}>
          Investment&nbsp;•&nbsp;Deployment&nbsp;•&nbsp;Yield&nbsp;•
        </motion.p>
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-12 pt-32 pb-24">
        
        {/* ── 2. HERO HEADER ── */}
        <header className="mb-24">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
            <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }} className="max-w-3xl">
              <div className="flex items-center gap-4 mb-6">
                <span className="text-orange-500 font-black text-[10px] tracking-[0.4em] uppercase">The Infrastructure</span>
                <div className="h-[1px] w-16 bg-slate-300" />
              </div>
              <h1 className={`${audiowide.className} text-[12vw] lg:text-[8rem] leading-[0.85] tracking-[-0.05em] uppercase text-slate-950`}>
                Solar <br /> <span className="text-orange-500 italic">Packages.</span>
              </h1>
            </motion.div>

            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }} className="max-w-sm pb-4 border-l-2 border-orange-500 pl-6">
              <p className="text-slate-500 text-base md:text-lg font-medium leading-relaxed">
                Industrial-grade energy nodes. Select our core tiers or request a custom capacity configuration for your project.
              </p>
            </motion.div>
          </div>
        </header>

        {/* ── 3. PRICING GRID (CASCADE FROM RIGHT) ── */}
        <div className="grid lg:grid-cols-3 gap-8 mb-32 items-stretch overflow-hidden py-4">
          {tiers.map((tier, index) => (
            <motion.div 
              key={index} 
              initial={{ opacity: 0, x: 150 }} 
              whileInView={{ opacity: 1, x: 0 }} 
              viewport={{ once: true, margin: "-50px" }} 
              transition={{ delay: index * 0.2, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className={`relative p-8 md:p-10 rounded-[3rem] border transition-all duration-700 flex flex-col ${
                tier.popular ? "bg-slate-950 border-slate-900 shadow-2xl text-white" : "bg-white border-slate-200/60 text-slate-950 shadow-sm hover:shadow-xl"
              }`}
            >
              {/* Product Image */}
              <div className="relative h-56 w-full mb-8 rounded-[2rem] overflow-hidden bg-slate-100">
                <Image src={tier.image} alt={tier.power} fill className="object-cover" />
                <div className="absolute top-5 right-5 bg-white/90 backdrop-blur-sm p-3.5 rounded-2xl text-slate-950 shadow-lg">
                  {tier.icon}
                </div>
                {tier.popular && (
                  <div className="absolute bottom-5 left-5 bg-orange-500 text-white px-4 py-2 rounded-full text-[8px] font-black tracking-widest uppercase shadow-lg">
                    Optimized Tier
                  </div>
                )}
              </div>

              <p className={`text-[10px] font-black tracking-[0.3em] uppercase mb-3 ${tier.popular ? "text-orange-400" : "text-slate-400"}`}>
                {tier.name}
              </p>
              <h3 className={`${audiowide.className} text-4xl uppercase tracking-tighter mb-6`}>{tier.power}</h3>
              
              <div className={`h-[1px] w-full mb-8 ${tier.popular ? "bg-slate-800" : "bg-slate-100"}`} />

              <div className="space-y-5 mb-12 flex-grow">
                {tier.features.map((feat, i) => (
                  <div key={i} className="flex items-start gap-4">
                    <div className={`mt-0.5 w-1.5 h-1.5 rounded-full shrink-0 ${tier.popular ? "bg-orange-500" : "bg-slate-300"}`} />
                    <span className={`text-[11px] font-bold uppercase tracking-wider leading-relaxed ${tier.popular ? "text-slate-300" : "text-slate-600"}`}>
                      {feat}
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-auto">
                <h2 className={`${audiowide.className} text-5xl tracking-tighter mb-8`}>{tier.price}</h2>
                <button
                  onClick={() => setModalConfig({ isOpen: true, selectedPlan: `${tier.name} (${tier.power})` })}
                  className={`group w-full flex items-center justify-between py-5 px-8 rounded-2xl font-black text-[10px] uppercase tracking-widest transition-all duration-500 ${
                    tier.popular ? "bg-orange-500 text-white hover:bg-white hover:text-slate-950" : "bg-slate-950 text-white hover:bg-orange-500"
                  }`}
                >
                  <span>Initiate Enquiry</span>
                  <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          ))}

          {/* CUSTOM CAPACITY CARD (Last to slide in from right) */}
          <motion.div 
            initial={{ opacity: 0, x: 150 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-50px" }} 
            transition={{ delay: 0.4, duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
            className="relative p-10 rounded-[3rem] bg-orange-500 text-white flex flex-col justify-center items-center text-center group overflow-hidden shadow-2xl h-full min-h-[600px]"
          >
             <div className="absolute inset-0 opacity-[0.08] group-hover:scale-110 transition-transform duration-1000 flex items-center justify-center pointer-events-none">
                <FaBolt size={300} />
             </div>
             
             <div className="relative z-10 flex flex-col items-center">
               <h3 className={`${audiowide.className} text-4xl md:text-5xl uppercase leading-[0.9] mb-8`}>
                 Request <br /> Custom kW
               </h3>
               <p className="text-white/90 text-sm md:text-base font-medium mb-12 leading-relaxed max-w-[250px]">
                 For industrial complexes, large residences, or off-grid hybrid battery requirements.
               </p>
               <button 
                  onClick={() => setModalConfig({ isOpen: true, selectedPlan: "Custom Capacity" })}
                  className="bg-white text-orange-500 w-full py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest hover:bg-slate-950 hover:text-white transition-all duration-500 shadow-xl flex items-center justify-center gap-4"
               >
                 <span>Start Configurator</span>
                 <FaArrowRight />
               </button>
             </div>
          </motion.div>
        </div>

        {/* ── 4. WHAT'S INCLUDED GRID (CASCADE FROM RIGHT) ── */}
        <div className="mb-32 overflow-hidden py-4">
          <motion.div 
            initial={{ opacity: 0, x: -30 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }} 
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className={`${audiowide.className} text-3xl md:text-4xl uppercase text-slate-950 mb-4`}>
              The <span className="text-orange-500">Ixora</span> Standard
            </h2>
            <p className="text-slate-500 font-medium">Every deployment tier includes these fundamental infrastructure pillars.</p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {standardFeatures.map((feat, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, x: 100 }} 
                whileInView={{ opacity: 1, x: 0 }} 
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: i * 0.15, ease: [0.16, 1, 0.3, 1] }}
                className="bg-white p-8 rounded-[2rem] border border-slate-200/60 shadow-sm text-center flex flex-col items-center hover:-translate-y-2 hover:shadow-xl transition-all duration-300"
              >
                <div className="w-14 h-14 rounded-2xl bg-slate-50 text-orange-500 flex items-center justify-center text-xl mb-6">
                  {feat.icon}
                </div>
                <h4 className={`${audiowide.className} text-base uppercase tracking-tight text-slate-900 mb-3`}>{feat.title}</h4>
                <p className="text-slate-500 text-xs leading-relaxed">{feat.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* ── 5. ROI / FINANCIALS BANNER ── */}
        <motion.div initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-100px" }}
          className="bg-slate-950 rounded-[3rem] p-10 md:p-16 lg:p-20 flex flex-col lg:flex-row items-center justify-between gap-12 mb-32 shadow-2xl relative overflow-hidden"
        >
          <div className="absolute -right-20 -top-20 w-[400px] h-[400px] bg-orange-500 rounded-full blur-[100px] opacity-20 pointer-events-none" />
          
          <div className="lg:w-1/2 relative z-10">
            <h2 className={`${audiowide.className} text-3xl md:text-5xl uppercase text-white mb-6 leading-tight`}>
              Capital <br /> <span className="text-orange-500 italic">Returns.</span>
            </h2>
            <p className="text-slate-400 text-lg leading-relaxed">
              Solar infrastructure is not an expense; it is a high-yield asset. Most Ixora Tech deployments achieve total capital payback within 3 to 5 years via KSEB bill elimination and net-metering credits.
            </p>
          </div>

          <div className="lg:w-1/2 grid grid-cols-2 gap-6 relative z-10 w-full">
             <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 text-center backdrop-blur-md">
               <p className={`${audiowide.className} text-4xl text-orange-500 mb-2`}>3-5</p>
               <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">Years Payback</p>
             </div>
             <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6 text-center backdrop-blur-md">
               <p className={`${audiowide.className} text-4xl text-white mb-2`}>25+</p>
               <p className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300">Years Yield</p>
             </div>
          </div>
        </motion.div>

        {/* ── 6. FAQ SECTION (STAGGERED ANIMATIONS) ── */}
        <div className="flex flex-col md:flex-row gap-16 lg:gap-24 overflow-hidden py-10">
          
          <motion.div 
            initial={{ opacity: 0, x: -40 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 0.7, ease: "easeOut" }}
            className="md:w-1/3"
          >
            <h2 className={`${audiowide.className} text-3xl md:text-4xl uppercase text-slate-950 mb-6`}>
              System <br /> <span className="text-orange-500 italic">Inquiries</span>
            </h2>
            <p className="text-slate-500 text-sm leading-relaxed mb-8">
              Technical and financial clarity for your solar deployment. Need more details? Initiate an enquiry above.
            </p>
          </motion.div>
          
          <div className="md:w-2/3 space-y-6">
            {faqs.map((faq, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 30 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.5, delay: i * 0.15, ease: "easeOut" }}
                whileHover={{ 
                  y: -5, 
                  boxShadow: "0 20px 40px -15px rgba(0,0,0,0.05)",
                  borderColor: "rgba(249, 115, 22, 0.3)" 
                }}
                className="bg-white p-8 rounded-[2.5rem] border border-slate-200/60 shadow-sm transition-colors duration-300"
              >
                <h4 className={`${audiowide.className} text-sm md:text-base tracking-tight text-slate-900 mb-4 uppercase`}>
                  {faq.q}
                </h4>
                <p className="text-slate-500 text-sm leading-relaxed font-medium">
                  {faq.a}
                </p>
              </motion.div>
            ))}
          </div>
          
        </div>

      </div>

      {/* ── ENQUIRY MODAL ── */}
      <AnimatePresence>
        {modalConfig.isOpen && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center px-6">
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setModalConfig({ ...modalConfig, isOpen: false })} className="absolute inset-0 bg-slate-950/80 backdrop-blur-md" />
            <motion.div initial={{ scale: 0.95, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }} exit={{ scale: 0.95, opacity: 0, y: 20 }} 
              className="relative bg-white w-full max-w-2xl rounded-[2.5rem] p-8 md:p-10 shadow-2xl"
            >
              <button onClick={() => setModalConfig({ ...modalConfig, isOpen: false })} className="absolute top-8 right-8 text-slate-400 hover:text-slate-950 transition-colors"><FaXmark size={24} /></button>
              
              <div className="mb-8">
                <h2 className={`${audiowide.className} text-2xl uppercase text-slate-950`}>
                  {modalConfig.selectedPlan === "Custom Capacity" ? "Custom Configurator" : "Plan Enquiry"}
                </h2>
                <p className="text-[10px] font-black tracking-[0.2em] text-orange-500 uppercase mt-2">Target: {modalConfig.selectedPlan}</p>
              </div>
              
              {/* ── CONDITIONAL RENDER: EMAIL FORM OR WHATSAPP FORM ── */}
              {modalConfig.selectedPlan !== "Custom Capacity" ? (
                /* FIXED PLAN EMAIL FORM */
                <form onSubmit={handleEmailSubmit} className="space-y-4 md:space-y-5 text-left">
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                      <input required value={formData.name} type="text" className="w-full bg-slate-50 border border-slate-200/60 p-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" 
                        onChange={(e) => setFormData({...formData, name: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">WhatsApp Number</label>
                      <input 
                        required 
                        type="tel" 
                        maxLength={10}
                        pattern="[0-9]{10}"
                        value={formData.phone} 
                        placeholder="10 Digits"
                        className="w-full bg-slate-50 border border-slate-200/60 p-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-300" 
                        onChange={handlePhoneChange} 
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-5">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Email Address</label>
                      <input required value={formData.email} type="email" placeholder="Required for Reply" className="w-full bg-slate-50 border border-slate-200/60 p-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-300" 
                        onChange={(e) => setFormData({...formData, email: e.target.value})} />
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Location / City</label>
                      <input required value={formData.address} type="text" className="w-full bg-slate-50 border border-slate-200/60 p-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" 
                        onChange={(e) => setFormData({...formData, address: e.target.value})} />
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-4 md:gap-5">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Site Type</label>
                      <select value={formData.type} className="w-full bg-slate-50 border border-slate-200/60 p-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                        onChange={(e) => setFormData({...formData, type: e.target.value})}>
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Industrial</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Required kW</label>
                      <input required value={formData.capacity} type="number" placeholder="e.g. 5" className="w-full bg-slate-50 border border-slate-200/60 p-3.5 rounded-2xl text-[11px] font-bold uppercase tracking-widest outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-300" 
                        onChange={(e) => setFormData({...formData, capacity: e.target.value})} />
                    </div>
                  </div>

                  {status === "success" && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-green-50 text-green-600 text-[9px] font-black uppercase tracking-widest rounded-xl text-center">
                      Transmission Successful. We will contact you shortly.
                    </motion.div>
                  )}
                  {status === "error" && (
                    <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="p-3 bg-red-50 text-red-600 text-[9px] font-black uppercase tracking-widest rounded-xl text-center">
                      Transmission Failed. Please use WhatsApp.
                    </motion.div>
                  )}

                  <div className="pt-4 grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <motion.button whileTap={{ scale: 0.98 }} disabled={loading || formData.phone.length !== 10} type="submit" 
                      className="w-full py-4 rounded-2xl bg-slate-950 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-orange-500 transition-all shadow-lg disabled:opacity-70 disabled:cursor-not-allowed group">
                      <span>{loading ? "Transmitting..." : "Send Email"}</span>
                    </motion.button>
                    <motion.button type="button" whileTap={{ scale: 0.98 }} onClick={handleWhatsAppSubmit} 
                      className="w-full py-4 rounded-2xl bg-green-500 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/25">
                      <FaWhatsapp size={16} />
                      <span>Direct WhatsApp</span>
                    </motion.button>
                  </div>
                </form>
              ) : (
                /* CUSTOM CAPACITY WHATSAPP FORM */
                <form onSubmit={handleWhatsAppSubmit} className="space-y-5 text-left">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Full Name</label>
                    <input required type="text" className="w-full bg-slate-50 border border-slate-200/60 p-4 rounded-2xl text-xs font-bold uppercase tracking-widest outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all" 
                      onChange={(e) => setFormData({...formData, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">WhatsApp Number</label>
                    <input 
                      required 
                      type="tel" 
                      maxLength={10}
                      pattern="[0-9]{10}"
                      value={formData.phone}
                      placeholder="10 Digits"
                      className="w-full bg-slate-50 border border-slate-200/60 p-4 rounded-2xl text-xs font-bold uppercase tracking-widest outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-300" 
                      onChange={handlePhoneChange} 
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Site Type</label>
                      <select className="w-full bg-slate-50 border border-slate-200/60 p-4 rounded-2xl text-xs font-bold uppercase tracking-widest outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all text-slate-700"
                        onChange={(e) => setFormData({...formData, type: e.target.value})}>
                        <option>Residential</option>
                        <option>Commercial</option>
                        <option>Industrial</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Required kW</label>
                      <input required type="number" placeholder="e.g. 10" className="w-full bg-slate-50 border border-slate-200/60 p-4 rounded-2xl text-xs font-bold uppercase tracking-widest outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-300" 
                        onChange={(e) => setFormData({...formData, capacity: e.target.value})} />
                    </div>
                  </div>
                  <button type="submit" disabled={formData.phone.length !== 10} className="w-full py-5 mt-6 rounded-2xl bg-green-500 text-white font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-3 hover:bg-green-600 transition-all shadow-lg hover:shadow-green-500/25 disabled:opacity-70 disabled:cursor-not-allowed">
                    <FaWhatsapp size={18} />
                    <span>Send to WhatsApp</span>
                  </button>
                </form>
              )}
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}