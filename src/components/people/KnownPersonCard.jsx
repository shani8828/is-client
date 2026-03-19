import React from 'react';
import { User, ShieldCheck, Fingerprint, Calendar } from 'lucide-react';

export default function KnownPersonCard({ person }) {
  // Use first image or fallback
  const displayPhoto = person.images && person.images[0];

  return (
    <div className="group relative bg-slate-900/40 backdrop-blur-md rounded-[32px] p-5 border border-slate-800 transition-all duration-500 hover:border-blue-500/50 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)] hover:-translate-y-1 overflow-hidden">
      
      {/* --- BACKGROUND DECORATION --- */}
      <div className="absolute -right-2 -bottom-2 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-500">
        <Fingerprint size={120} className="text-blue-400" />
      </div>

      <div className="flex items-center gap-5 relative z-10">
        {/* Profile Image with Biometric Ring */}
        <div className="relative">
          <div className="h-20 w-20 rounded-2xl overflow-hidden bg-slate-950 border border-slate-700 p-1 group-hover:border-blue-500 transition-colors duration-500">
            {displayPhoto ? (
              <img 
                src={displayPhoto} 
                alt={person.name} 
                className="h-full w-full object-cover rounded-xl grayscale group-hover:grayscale-0 transition-all duration-700"
              />
            ) : (
              <div className="flex items-center justify-center h-full w-full text-slate-700 group-hover:text-blue-500 transition-colors">
                <User size={32} strokeWidth={1.5} />
              </div>
            )}
          </div>
          {/* Status Indicator */}
          <div className="absolute -bottom-1 -right-1 w-5 h-5 bg-[#020617] rounded-full flex items-center justify-center">
             <div className="w-3 h-3 bg-emerald-500 rounded-full animate-pulse" />
          </div>
        </div>

        {/* Info Cluster */}
        <div className="flex-1 overflow-hidden">
          <h4 className="text-lg font-black text-white truncate tracking-tight mb-1">
            {person.name}
          </h4>
          
          <div className="flex flex-col gap-1.5">
            <div className="flex items-center gap-1.5 w-fit px-2 py-0.5 rounded-md bg-blue-500/10 border border-blue-500/20">
              <ShieldCheck size={12} className="text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">
                {person.role || "Authorized"}
              </span>
            </div>
            
            <div className="flex items-center gap-3 mt-2">
              <div className="flex items-center gap-1 text-slate-500">
                 <Fingerprint size={10} />
                 <span className="text-[10px] font-mono">{person.samplesCount || 0} Samples</span>
              </div>
              <div className="flex items-center gap-1 text-slate-500">
                 <Calendar size={10} />
                 <span className="text-[10px] font-mono">
                   {person.createdAt ? new Date(person.createdAt).getFullYear() : '2026'}
                 </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Interactive Scan Line (Only visible on hover) */}
      <div className="absolute left-0 right-0 top-0 h-[1px] bg-gradient-to-r from-transparent via-blue-500 to-transparent opacity-0 group-hover:opacity-100 group-hover:animate-scan-slow" />
    </div>
  );
}