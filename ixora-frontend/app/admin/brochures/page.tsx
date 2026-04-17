"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Audiowide } from "next/font/google";
import { FaUpload, FaTrash, FaFilePdf, FaPlus, FaDatabase } from "react-icons/fa6";

const audiowide = Audiowide({ weight: "400", subsets: ["latin"] });

// Change this to your live server URL when deploying to production
const API_BASE = "http://localhost:5000";

export default function AdminBrochures() {
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [brochures, setBrochures] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBrochures();
  }, []);

  const fetchBrochures = async () => {
    try {
      const res = await fetch(`${API_BASE}/api/brochures`);
      const data = await res.json();
      setBrochures(Array.isArray(data) ? data : []);
    } catch (error) {
      console.error("Fetch error:", error);
    }
  };

  const handleUpload = async (e: any) => {
    e.preventDefault();
    if (!file || !title) return;

    const token = localStorage.getItem("admin");
    const formData = new FormData();
    formData.append("title", title);
    formData.append("file", file);

    try {
      setLoading(true);
      await fetch(`${API_BASE}/api/brochures/upload`, {
        method: "POST",
        headers: { Authorization: token || "" },
        body: formData,
      });
      setTitle("");
      setFile(null);
      
      // Fetch fresh data from the database after a successful upload
      fetchBrochures();
    } catch (error) {
      console.error("Upload error:", error);
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id: string) => {
    const token = localStorage.getItem("admin");
    try {
      await fetch(`${API_BASE}/api/brochures/${id}`, {
        method: "DELETE",
        headers: { Authorization: token || "" },
      });
      
      // Fetch fresh data from the database after a successful deletion
      fetchBrochures();
    } catch (error) {
      console.error("Delete error:", error);
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 space-y-8">
      
      {/* ── 1. UPLOAD TERMINAL ── */}
      <div className="bg-white border border-slate-100 rounded-[2rem] p-6 md:p-10 shadow-sm">
        <div className="flex items-center gap-4 mb-8">
          <div className="w-10 h-10 bg-orange-500 rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange-500/20">
            <FaPlus />
          </div>
          <div>
            <h2 className={`${audiowide.className} text-xl uppercase tracking-tighter text-slate-950`}>
              Asset <span className="text-orange-500">Deployment</span>
            </h2>
            <p className="text-[9px] font-black uppercase tracking-[0.3em] text-slate-400">Documentation Node</p>
          </div>
        </div>

        <form onSubmit={handleUpload} className="grid grid-cols-1 md:grid-cols-12 gap-5 items-end">
          <div className="md:col-span-5 space-y-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Document Title</label>
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="E.G. TECHNICAL SPEC V3"
              className="w-full bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest outline-none focus:border-orange-500 focus:bg-white transition-all"
              required
            />
          </div>

          <div className="md:col-span-4 space-y-2">
            <label className="text-[9px] font-black uppercase tracking-widest text-slate-400 ml-2">Source PDF</label>
            <div className="relative">
              <input
                type="file"
                accept="application/pdf"
                onChange={(e: any) => setFile(e.target.files[0])}
                className="hidden"
                id="file-upload"
              />
              <label 
                htmlFor="file-upload"
                className="flex items-center justify-between w-full bg-slate-50 border border-slate-100 p-3.5 rounded-xl text-[11px] font-bold uppercase tracking-widest cursor-pointer hover:bg-slate-100 transition-all"
              >
                <span className="truncate pr-4">{file ? file.name : "Select File"}</span>
                <FaFilePdf className={file ? "text-orange-500" : "text-slate-300"} />
              </label>
            </div>
          </div>

          <div className="md:col-span-3">
            <button
              disabled={loading}
              className="w-full bg-slate-950 text-white py-4 rounded-xl font-black text-[9px] uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-orange-600 disabled:bg-slate-200 transition-all shadow-xl shadow-slate-950/10"
            >
              <FaUpload />
              {loading ? "Transmitting..." : "Initialize Upload"}
            </button>
          </div>
        </form>
      </div>

      {/* ── 2. DATA REPOSITORY ── */}
      <div className="bg-white border border-slate-100 rounded-[2rem] overflow-hidden shadow-sm">
        <div className="px-8 py-6 border-b border-slate-50 flex justify-between items-center bg-slate-50/30">
          <div className="flex items-center gap-4">
            <FaDatabase className="text-slate-300" />
            <h3 className={`${audiowide.className} text-lg uppercase tracking-tighter text-slate-950`}>
              Repository <span className="text-slate-400 font-normal">({brochures.length}/10)</span>
            </h3>
          </div>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-slate-50/50">
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Protocol Name</th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400">Status</th>
                <th className="px-8 py-4 text-[9px] font-black uppercase tracking-widest text-slate-400 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-50">
              <AnimatePresence>
                {brochures.map((item) => (
                  <motion.tr 
                    key={item._id}
                    initial={{ opacity: 0, height: 0 }}
                    animate={{ opacity: 1, height: "auto" }}
                    exit={{ opacity: 0, height: 0 }}
                    className="hover:bg-slate-50/30 transition-colors group"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <div className="w-8 h-8 rounded-lg bg-red-50 flex items-center justify-center text-red-500">
                          <FaFilePdf size={14} />
                        </div>
                        <span className="text-[11px] font-bold text-slate-950 uppercase tracking-wider">{item.title}</span>
                      </div>
                    </td>
                    <td className="px-8 py-5">
                       <span className="text-[9px] font-black uppercase tracking-widest px-3 py-1 bg-green-50 text-green-600 rounded-full">Active</span>
                    </td>
                    <td className="px-8 py-5 text-right">
                      <button
                        onClick={() => deleteItem(item._id)}
                        className="p-2.5 text-slate-300 hover:text-red-500 hover:bg-red-50 rounded-lg transition-all"
                      >
                        <FaTrash size={14} />
                      </button>
                    </td>
                  </motion.tr>
                ))}
              </AnimatePresence>
            </tbody>
          </table>
          
          {brochures.length === 0 && (
            <div className="py-20 text-center">
              <p className="text-[10px] font-black uppercase tracking-[0.4em] text-slate-300">Database Empty / No Assets Found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}