import React from 'react';
import { Link } from 'react-router-dom';
import { CameraOff, Home, ChevronLeft, AlertCircle } from 'lucide-react';

const NoPage = () => {
  return (
    <div className="min-h-screen bg-[#020617] flex items-center justify-center px-6 overflow-hidden relative">
      {/* Cinematic Background Elements */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-600/10 blur-[120px] rounded-full" />
        {/* Film Grain Overlay Simulation */}
        <div className="absolute inset-0 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
      </div>

      <div className="max-w-2xl w-full text-center relative z-10">
        {/* Error Visual */}
        <div className="mb-8 relative inline-block">
          <div className="w-24 h-24 rounded-3xl bg-slate-900 border border-slate-800 flex items-center justify-center mx-auto shadow-2xl">
            <CameraOff size={40} className="text-slate-500" />
          </div>
          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center border-4 border-[#020617]">
            <AlertCircle size={14} className="text-white" />
          </div>
        </div>

        {/* Text Content */}
        <h1 className="text-[120px] md:text-[150px] font-black leading-none tracking-tighter text-white/5 select-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-[-1]">
          404
        </h1>
        
        <h2 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">
          Signal <span className="text-blue-500">Lost.</span>
        </h2>
        
        <p className="text-slate-400 text-lg md:text-xl font-light leading-relaxed mb-12 max-w-lg mx-auto">
          The coordinates you're looking for aren't in our database. The feed has been cut, or this module has been decommissioned.
        </p>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to="/"
            className="w-full sm:w-auto px-8 py-4 bg-white text-black font-black rounded-2xl hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2 group"
          >
            <Home size={18} />
            Back to Base
          </Link>
          
          <button
            onClick={() => window.history.back()}
            className="w-full sm:w-auto px-8 py-4 bg-slate-900 text-white font-black rounded-2xl border border-slate-800 hover:border-slate-600 transition-all flex items-center justify-center gap-2"
          >
            <ChevronLeft size={18} />
            Previous Feed
          </button>
        </div>

        {/* Professional Footer Detail */}
        <div className="mt-20 pt-8 border-t border-slate-900/50">
          <div className="flex items-center justify-center gap-6 opacity-30">
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              LobbyVision System
            </span>
            <div className="w-1 h-1 rounded-full bg-slate-700" />
            <span className="text-[10px] font-black uppercase tracking-[0.3em] text-slate-500">
              Status: 404_NOT_FOUND
            </span>
          </div>
        </div>
      </div>

      {/* Aesthetic "Scanline" effect */}
      <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent via-white/[0.02] to-transparent h-[2px] w-full animate-scan z-20" />
    </div>
  );
};

export default NoPage;