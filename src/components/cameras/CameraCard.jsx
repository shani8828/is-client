import React from 'react';
import { Cctv, Signal, Activity, Wifi } from 'lucide-react';

export default function CameraCard({ camera }) {
  return (
    <div className="group relative bg-slate-900/40 backdrop-blur-xl rounded-[32px] p-6 border border-slate-800 transition-all duration-500 ease-out hover:-translate-y-2 hover:border-blue-500/50 hover:shadow-[0_20px_40px_rgba(59,130,246,0.1)] overflow-hidden">
      
      {/* --- BACKGROUND ACCENT GLOW --- */}
      <div className="absolute -inset-24 bg-blue-500/5 blur-[80px] group-hover:bg-blue-500/10 transition-colors duration-700" />

      {/* --- TOP SECTION: STATUS & ICON --- */}
      <div className="relative z-10 flex justify-between items-start mb-6">
        <div className="p-3 bg-slate-950 rounded-2xl border border-slate-800 group-hover:border-blue-500/30 group-hover:bg-blue-600/5 transition-all duration-500">
          <Cctv className="text-slate-500 group-hover:text-blue-400 transition-colors" size={24} />
        </div>
        
        <div className="flex items-center gap-2 px-3 py-1 bg-emerald-500/10 border border-emerald-500/20 rounded-full">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
          </span>
          <span className="text-[10px] font-black uppercase tracking-widest text-emerald-500">Live</span>
        </div>
      </div>

      {/* --- MIDDLE SECTION: IDENTITY --- */}
      <div className="relative z-10">
        <div className="flex items-baseline gap-2 mb-1">
          <span className="text-[10px] font-mono text-slate-600 uppercase tracking-tighter">Node ID:</span>
          <span className="text-[10px] font-mono text-blue-500/80">0x{camera._id?.slice(-4) || '7F2B'}</span>
        </div>
        <h3 className="text-xl font-black text-white tracking-tight group-hover:text-blue-400 transition-colors duration-300">
          {camera.name}
        </h3>
        <p className="text-slate-500 text-xs mt-1 font-medium italic">
          {camera.location || "Lobby Zone A"}
        </p>
      </div>

      {/* --- BOTTOM SECTION: DATA READOUT --- */}
      <div className="relative z-10 mt-6 pt-6 border-t border-slate-800/50 grid grid-cols-2 gap-4">
        <div className="flex items-center gap-2">
          <Wifi size={14} className="text-slate-600" />
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">98ms Latency</span>
        </div>
        <div className="flex items-center gap-2">
          <Activity size={14} className="text-slate-600" />
          <span className="text-[10px] font-mono text-slate-400 uppercase tracking-wider">30 FPS</span>
        </div>
      </div>

      {/* --- HOVER PROGRESS DECORATION --- */}
      <div className="absolute bottom-0 left-0 h-1 bg-blue-500 transition-all duration-500 ease-out w-0 group-hover:w-full shadow-[0_0_15px_rgba(59,130,246,0.8)]" />
    </div>
  );
}