import React, { useState, useEffect, useMemo } from "react";
import { socket } from "../services/socket";
import api from "../utils/api";
import {
  History,
  Clock,
  Search,
  Filter,
  Download,
  Trash2,
  ShieldCheck,
  ShieldAlert,
  Cctv,
  Fingerprint,
  Zap,
  Loader2
} from "lucide-react";

const EventLog = () => {
  const [events, setEvents] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [filter, setFilter] = useState("all"); // all, known, unknown

  // 1. Initial Fetch and Socket Setup
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await api.get("/events");
        if (Array.isArray(res.data)) setEvents(res.data);
      } catch (err) {
        console.error("Archive fetch error:", err);
      }
    };

    fetchEvents();

    socket.on("new_event", (newEvent) => {
      setEvents((prev) => {
        const exists = prev.find((e) => e.event_id === newEvent.event_id);
        if (exists) return prev;
        return [newEvent, ...prev];
      });
    });

    return () => socket.off("new_event");
  }, []);

  // 2. Filtered Data Logic
  const filteredEvents = useMemo(() => {
    return events.filter((ev) => {
      const matchesSearch = 
        ev.person_id?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        ev.camera_id?.toString().includes(searchTerm);
      
      const matchesFilter = 
        filter === "all" || 
        (filter === "known" && ev.is_known) || 
        (filter === "unknown" && !ev.is_known);

      return matchesSearch && matchesFilter;
    });
  }, [events, searchTerm, filter]);

  const exportData = () => {
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(events));
    const downloadAnchorNode = document.createElement('a');
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", "lobby_logs.json");
    document.body.appendChild(downloadAnchorNode);
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  };

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 p-6 md:p-10 pt-20">
      {/* --- HEADER --- */}
      <header className="mb-10 flex flex-col xl:flex-row xl:items-center justify-between gap-6 pt-20">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <div className="p-2 bg-blue-500/10 rounded-xl border border-blue-500/20">
              <History className="text-blue-400" size={28} />
            </div>
            <h1 className="text-4xl font-black text-white tracking-tighter uppercase">
              Event Logs
            </h1>
          </div>
          <p className="text-slate-500 text-sm font-medium tracking-wide flex items-center gap-2">
            <Clock size={14} /> Total of {events.length} logs stored in local node
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-4">
          {/* Search bar */}
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" size={16} />
            <input 
              type="text" 
              placeholder="Search ID or Camera..." 
              className="bg-slate-900/50 border border-slate-800 rounded-2xl py-3 pl-12 pr-6 text-sm focus:outline-none focus:border-blue-500/50 transition-all w-64 shadow-inner"
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Filter Switcher */}
          <div className="bg-slate-900/80 border border-slate-800 p-1 rounded-2xl flex">
            {['all', 'known', 'unknown'].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-xl text-[10px] font-black uppercase tracking-widest transition-all ${
                  filter === f ? "bg-blue-600 text-white shadow-lg shadow-blue-900/20" : "text-slate-500 hover:text-slate-300"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          <button 
            onClick={exportData}
            className="p-3 bg-slate-800 hover:bg-slate-700 border border-slate-700 rounded-2xl text-slate-300 transition-all"
            title="Export JSON"
          >
            <Download size={20} />
          </button>
        </div>
      </header>

      {/* --- DATA TABLE --- */}
      <div className="bg-slate-950/40 border border-slate-800/60 rounded-[40px] overflow-hidden backdrop-blur-xl shadow-2xl">
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/30">
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  <div className="flex items-center gap-2"><Clock size={14}/> Timestamp</div>
                </th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  <div className="flex items-center gap-2"><Cctv size={14}/> Node ID</div>
                </th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  <div className="flex items-center gap-2"><Fingerprint size={14}/> Identity</div>
                </th>
                <th className="px-8 py-5 text-left text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  <div className="flex items-center gap-2"><Zap size={14}/> Confidence</div>
                </th>
                <th className="px-8 py-5 text-right text-[10px] font-black uppercase tracking-[0.2em] text-slate-500">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/40">
              {filteredEvents.map((ev, idx) => (
                <tr key={ev.event_id || idx} className="group hover:bg-blue-500/[0.02] transition-colors">
                  <td className="px-8 py-6">
                    <span className="text-slate-400 font-mono text-sm tracking-tight">
                      {new Date(ev.timestamp).toLocaleDateString()} • {new Date(ev.timestamp).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-blue-500 shadow-[0_0_8px_rgba(59,130,246,0.5)]" />
                      <span className="text-white font-bold text-sm">CAM-{ev.camera_id}</span>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex flex-col gap-1.5">
                      <span className={`inline-flex items-center gap-1.5 w-fit px-2.5 py-0.5 rounded-md text-[10px] font-black uppercase border ${
                        ev.is_known 
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" 
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}>
                        {ev.is_known ? <ShieldCheck size={10}/> : <ShieldAlert size={10}/>}
                        {ev.is_known ? "Authorized" : "Unknown"}
                      </span>
                      <code className="text-blue-400 font-bold text-sm">ID: {ev.person_id}</code>
                    </div>
                  </td>
                  <td className="px-8 py-6">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 min-w-[100px] h-1.5 bg-slate-800 rounded-full overflow-hidden">
                        <div 
                          className={`h-full rounded-full transition-all duration-1000 ${ev.confidence > 0.8 ? 'bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]' : 'bg-amber-500'}`}
                          style={{ width: `${ev.confidence * 100}%` }}
                        />
                      </div>
                      <span className="text-xs font-mono font-bold text-slate-400">
                        {(ev.confidence * 100).toFixed(0)}%
                      </span>
                    </div>
                  </td>
                  <td className="px-8 py-6 text-right">
                    <button className="p-2 text-slate-600 hover:text-red-400 hover:bg-red-400/10 rounded-lg transition-all">
                      <Trash2 size={16} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {filteredEvents.length === 0 && (
            <div className="flex flex-col items-center justify-center py-40">
              <Loader2 className="animate-spin text-slate-700 mb-4" size={48} strokeWidth={1}/>
              <p className="text-slate-500 font-bold uppercase tracking-widest text-xs">No matching logs found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default EventLog;