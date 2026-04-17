"use client";

import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { FaArrowRight } from "react-icons/fa6";
import { Michroma } from "next/font/google";

const michroma = Michroma({ weight: "400", subsets: ["latin"] });

const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Services", href: "/services" },
  { name: "Pricing", href: "/pricing" },
  { name: "Brochures", href: "/brochures" },
  { name: "Contact", href: "/contact" },
];

export default function Footer() {
  return (
    <footer className="bg-[#FAFAFA] pb-12 px-6 md:px-12 pt-16 overflow-hidden">
      
      {/* ── THE MAIN CONTAINER CARD ── */}
      <motion.div 
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-50px" }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-[1400px] mx-auto bg-white border border-slate-200/60 rounded-[2.5rem] shadow-[0_20px_50px_-20px_rgba(0,0,0,0.05)] overflow-hidden"
      >
        <div className="p-10 md:p-14 lg:p-16 pb-0 lg:pb-0">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-12 lg:gap-16 pb-16">
            
            {/* 1. BRAND COLUMN */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="md:col-span-5 flex flex-col items-start"
            >
              <Link href="/" className="group flex flex-col items-start mb-8">
                {/* Ixora Primary Logo */}
                <div className="relative h-8 w-32 md:h-10 md:w-36 transition-transform duration-300 group-hover:scale-105 mb-5">
                  <Image 
                    src="/logo-ixora.png" 
                    alt="Ixora Logo"
                    fill
                    className="object-contain object-left"
                  />
                </div>
                
                {/* 📸 PROTECH AUTOMATION LOGO INTEGRATION HERE 📸 */}
                <div className="flex items-center gap-3 bg-slate-50 px-5 py-2.5 rounded-full border border-slate-100 hover:border-orange-200 transition-colors shadow-sm">
                  <div className="relative flex h-1.5 w-1.5 shrink-0">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-orange-500"></span>
                  </div>
                  <div className="flex items-center gap-3">
                    <p className="text-[8px] font-black uppercase tracking-[0.25em] text-slate-400 mt-0.5">
                      Powered by
                    </p>
                    {/* The Parent Logo Container - Grayscale to Color on Hover */}
                    <div className="relative h-12 w-32 md:h-12 md:w-40 transition-all duration-500 ">
                      <Image 
                        src="/Protech-Automation-logo.png" 
                        alt="Protech Automation"
                        fill
                        className="object-contain object-left"
                      />
                    </div>
                  </div>
                </div>
              </Link>
              <p className="text-slate-500 text-sm font-medium leading-relaxed max-w-sm mt-2">
                Architecting sustainable energy autonomy through precision technical engineering and high-output solar modules.
              </p>
            </motion.div>

            {/* 2. DIRECTORY COLUMN */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.3 }}
              className="md:col-span-3"
            >
              <h4 className={`${michroma.className} text-[10px] uppercase tracking-[0.3em] text-slate-950 mb-8 [-webkit-text-stroke:0.5px_currentColor]`}>
                Directory
              </h4>
              <ul className="flex flex-col gap-5">
                {NAV_LINKS.map((link, i) => (
                  <li key={i}>
                    <Link 
                      href={link.href}
                      className={`${michroma.className} text-[9px] tracking-[0.2em] uppercase text-slate-400 hover:text-orange-500 transition-colors duration-300 flex items-center gap-3 group [-webkit-text-stroke:0.5px_currentColor]`}
                    >
                      <span className="w-0 h-[1px] bg-orange-500 group-hover:w-4 transition-all duration-300" />
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </motion.div>

            {/* 3. COMMAND CENTER COLUMN */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.4 }}
              className="md:col-span-4"
            >
              <h4 className={`${michroma.className} text-[10px] uppercase tracking-[0.3em] text-slate-950 mb-8 [-webkit-text-stroke:0.5px_currentColor]`}>
                System Updates
              </h4>
              
              <div className="relative flex items-center w-full mb-10 group">
                <input 
                  type="email" 
                  placeholder="Enter access email..." 
                  className="w-full bg-slate-50 border border-slate-200 text-slate-900 text-xs font-medium rounded-xl pl-5 pr-14 py-4 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all placeholder:text-slate-400"
                />
                <button className="absolute right-2 w-9 h-9 rounded-lg bg-slate-950 text-white flex items-center justify-center hover:bg-orange-500 hover:-rotate-45 transition-all duration-300">
                  <FaArrowRight size={12} />
                </button>
              </div>

              <div className="flex flex-col gap-3">
                <a href="mailto:sys-admin@ixoratech.com" className="text-sm font-bold text-slate-600 hover:text-orange-500 transition-colors">
                  info@protechautomationsolar.com
                </a>
                <p className={`${michroma.className} text-[8px] uppercase tracking-[0.3em] text-slate-400`}>
                  Kerala, India  ||   Operations HQ
                </p> 
              </div>
            </motion.div>

          </div>

          {/* ── BOTTOM SECTION ── */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="pt-8 pb-8 border-t border-slate-100 flex flex-col md:flex-row justify-between items-center gap-6"
          >
            <div className="flex items-center gap-4">
              <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
                © {new Date().getFullYear()} IXORA TECH
              </p>
              <div className="hidden md:block h-3 w-px bg-slate-200" />
              <div className="hidden md:flex items-center gap-4">
                <Link href="#" className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 hover:text-slate-500 transition-colors">Privacy</Link>
                <Link href="#" className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-300 hover:text-slate-500 transition-colors">Terms</Link>
              </div>
            </div>

            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">
              Developed by{" "}
              <Link 
                href="https://winshineinfotech.com/" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-slate-950 hover:text-orange-500 transition-colors duration-300 underline underline-offset-4 decoration-slate-200 hover:decoration-orange-500"
              >
                Winshine Infotech
              </Link>
            </p>
          </motion.div>
        </div>

        {/* ── DECORATIVE KINETIC ACCENT LINE ── */}
        <motion.div 
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4, ease: "easeInOut" }}
          className="w-full h-1.5 bg-gradient-to-r from-orange-500 to-slate-900 origin-left" 
        />
      </motion.div>
    </footer>
  );
}