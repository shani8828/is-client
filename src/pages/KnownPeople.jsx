import React, { useState, useEffect } from "react";
import KnownPersonCard from "../components/people/KnownPersonCard";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { Users, UserPlus, Fingerprint, Database, Search, Loader2, ShieldCheck } from "lucide-react";

export default function KnownPeople() {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPeople = async () => {
      try {
        setLoading(true);
        // Updated with your team members for a better UI preview
        const hardcodedPeople = [
          { _id: "2", name: "Akash Kolanti", role: "Student", samplesCount: 17, createdAt: "2026-02-02" },
        ];
        setPeople(hardcodedPeople);
      } catch (err) {
        toast.error("Biometric Database Link Failure");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    fetchPeople();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-10">
      {/* --- PAGE HEADER --- */}
      <header className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-slate-800/50 pb-10 pt-20">
        <div className="space-y-2">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-indigo-500/10 rounded-xl border border-indigo-500/20">
              <Fingerprint className="text-indigo-400" size={28} />
            </div>
            <h2 className="text-4xl font-black text-white tracking-tighter uppercase">
              Known Peoples
            </h2>
          </div>
          <p className="text-slate-500 text-sm font-medium tracking-wide flex items-center gap-2">
            <Database size={14} className="text-slate-600" />
            {people.length} Authorized identities synced with recognition engine
          </p>
        </div>
      </header>

      {/* --- PEOPLE GRID --- */}
      {loading ? (
        <div className="flex flex-col justify-center items-center h-80 space-y-4">
          <Loader2 className="animate-spin text-indigo-500" size={48} strokeWidth={1} />
          <p className="text-slate-600 font-mono text-[10px] uppercase tracking-[0.4em]">Querying Encrypted Records...</p>
        </div>
      ) : people.length > 0 ? (
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {people.map((p) => (
            <div key={p._id} className="relative group">
              {/* Subtle hover glow effect */}
              <div className="absolute -inset-1 bg-gradient-to-b from-indigo-500/20 to-transparent rounded-[32px] blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              
              <div className="relative">
                <KnownPersonCard person={p} />
                
                {/* Visual "Verified" Badge Overlay */}
                <div className="absolute top-4 right-4 bg-emerald-500/10 border border-emerald-500/30 p-1.5 rounded-lg backdrop-blur-md">
                   <ShieldCheck size={14} className="text-emerald-400" />
                </div>
              </div>
            </div>
          ))}
        </section>
      ) : (
        <div className="flex flex-col items-center justify-center py-32 bg-slate-950/40 rounded-[40px] border-2 border-dashed border-slate-800/60 backdrop-blur-sm">
          <div className="w-20 h-20 bg-slate-900 rounded-3xl flex items-center justify-center mb-6 shadow-inner">
            <Users className="text-slate-700" size={40} />
          </div>
          <p className="text-slate-400 text-xl font-bold mb-2 tracking-tight">Registry Empty</p>
          <p className="text-slate-600 text-sm max-w-xs text-center leading-relaxed">
            No subjects have been biometriclly enrolled in the system yet.
          </p>
          <button 
            onClick={() => navigate("/register")}
            className="mt-8 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl text-xs font-black uppercase tracking-widest transition-all"
          >
            Begin Enrollment
          </button>
        </div>
      )}

      {/* --- TECHNICAL FOOTER NOTE --- */}
      <div className="mt-20 flex items-center justify-center gap-4 opacity-30 grayscale hover:grayscale-0 transition-all duration-500">
         <div className="h-[1px] w-20 bg-slate-700" />
         <span className="text-[10px] font-black uppercase tracking-[0.3em]">Neural Database v4.0.2</span>
         <div className="h-[1px] w-20 bg-slate-700" />
      </div>
    </div>
  );
}