"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { Audiowide } from "next/font/google";
import { FaShieldHalved, FaLock, FaUser, FaArrowRight } from "react-icons/fa6";

const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

// Change this to your live server URL when deploying to production
const API_BASE = "http://localhost:5000";

export default function AdminLogin() {
  const router = useRouter();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    setError("");

    if (!username || !password) {
      setError("Authorization keys required");
      return;
    }

    try {
      setLoading(true);

      // ── REAL BACKEND AUTHENTICATION ──
      const res = await fetch(`${API_BASE}/api/admin/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });
      
      const data = await res.json();
      
      if (data.success) {
        localStorage.setItem("admin", data.token);
        router.push("/admin/brochures");
      } else {
        setError("Invalid Terminal Credentials");
      }
    } catch (error) {
      setError("Network Uplink Failure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <section className="min-h-screen flex items-center justify-center bg-slate-950 relative overflow-hidden">
      
      {/* ── 1. KINETIC BACKGROUND ── */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute inset-0 opacity-[0.03]" 
             style={{ backgroundImage: 'linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-transparent opacity-20" />
      </div>

      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative z-10 w-full max-w-md px-6"
      >
        <div className="bg-white/5 backdrop-blur-xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl">
          
          {/* Header */}
          <div className="flex flex-col items-center mb-10">
            <div className="w-16 h-16 bg-orange-500 rounded-2xl flex items-center justify-center text-white text-2xl mb-6 shadow-lg shadow-orange-500/20">
              <FaShieldHalved />
            </div>
            <h1 className={`${audiowide.className} text-2xl uppercase tracking-tighter text-white`}>
              Admin <span className="text-orange-500">Terminal</span>
            </h1>
            <p className="text-[9px] font-black uppercase tracking-[0.4em] text-slate-500 mt-2">
              Ixora Tech Security Node
            </p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            {/* Username */}
            <div className="relative group">
              <FaUser className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
              <input
                placeholder="OPERATOR ID"
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <FaLock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-orange-500 transition-colors" />
              <input
                type="password"
                placeholder="ACCESS PASSCODE"
                className="w-full bg-white/5 border border-white/10 p-4 pl-12 rounded-2xl text-[11px] font-bold uppercase tracking-widest text-white focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition-all"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>

            {error && (
              <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="flex items-center gap-2 text-orange-500 text-[10px] font-black uppercase tracking-widest bg-orange-500/10 p-3 rounded-xl border border-orange-500/20">
                <span className="w-1.5 h-1.5 bg-orange-500 rounded-full animate-pulse" />
                {error}
              </motion.div>
            )}

            <button 
              disabled={loading}
              className="group w-full bg-orange-500 text-white py-5 rounded-2xl font-black text-[10px] uppercase tracking-widest flex items-center justify-center gap-4 hover:bg-white hover:text-slate-950 transition-all shadow-xl shadow-orange-500/10 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Decrypting..." : "Initialize Uplink"}
              <FaArrowRight className="group-hover:translate-x-1 transition-transform" />
            </button>
          </form>

          {/* Footer Metadata */}
          <div className="mt-8 pt-8 border-t border-white/5 flex justify-between items-center text-[8px] font-bold text-slate-600 uppercase tracking-[0.2em]">
            <span>System v3.0</span>
            <span>Auth: RSA-4096</span>
          </div>
        </div>

        <p className="text-center mt-8 text-[9px] font-bold text-slate-500 uppercase tracking-[0.4em]">
          Restricted Access Area
        </p>
      </motion.div>
    </section>
  );
}