import React, { useState, useEffect, useMemo } from "react";
import { socket } from "../services/socket";
import api from "../utils/api";
import {
  Activity,
  RotateCcw,
  Users,
  UserCheck,
  UserMinus,
  Cctv,
  Loader2,
  ShieldCheck,
  ShieldAlert,
  Radio,
  WifiOff,
} from "lucide-react";

const LiveDashboard = () => {
  const [events, setEvents] = useState([]);
  const [isConnected, setIsConnected] = useState(socket.connected);

  // 1. Logic to calculate stats directly from the events array
  const stats = useMemo(() => {
    const knownSet = new Set();
    const unknownSet = new Set();
    events.forEach((ev) => {
      if (ev.is_known) {
        knownSet.add(ev.person_id);
      } else {
        unknownSet.add(ev.person_id);
      }
    });
    return {
      known: knownSet.size,
      unknown: unknownSet.size,
      total: knownSet.size + unknownSet.size,
    };
  }, [events]);
  // 2. Reset Handler - Clears local state to start from zero
  const handleReset = () => {
    if (
      window.confirm(
        "Are you sure you want to reset the current dashboard? This will clear the counts and log list.",
      )
    ) {
      setEvents([]);
    }
  };
  useEffect(() => {
    // 1. Initial Fetch for historical events
    const fetchInitialEvents = async () => {
      try {
        const res = await api.get("/events");
        if (Array.isArray(res.data)) {
          setEvents(res.data);
        }
      } catch (err) {
        console.error("Error fetching initial events:", err);
      }
    };
    fetchInitialEvents();
    // 2. Socket Listeners
    socket.on("connect", () => setIsConnected(true));
    socket.on("disconnect", () => setIsConnected(false));
    socket.on("new_event", (newEvent) => {
      setEvents((prev) => {
        const exists = prev.find((e) => e.event_id === newEvent.event_id);
        if (exists) return prev;
        return [newEvent, ...prev];
      });
    });
    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("new_event");
    };
  }, []);
  return (
    <div className="p-8 font-sans bg-[#0f172a] text-slate-200 min-h-screen pt-24">
      {/* --- HEADER SECTION --- */}
      <header className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
        <div>
          <h1 className="text-3xl font-bold bg-gradient-to-r from-blue-400 to-emerald-400 bg-clip-text text-transparent flex justify-center items-center gap-2">
            <Activity className="text-blue-400" size={24} strokeWidth={1.5} />{" "}
            Manpower Count in A Lobby
          </h1>
          <p className="text-slate-400 mt-1 flex items-center gap-2">
            <span className="relative flex h-3 w-3">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-3 w-3 bg-sky-500"></span>
            </span>
            Streaming unique Person IDs in real-time
          </p>
        </div>

        <div className="flex items-center gap-3 bg-slate-900/40 p-1.5 rounded-[22px] border border-slate-800 shadow-inner">
          {/* --- RESET BUTTON (Unified Design) --- */}
          <button
            onClick={handleReset}
            className="group flex items-center justify-center gap-3 px-5 py-2.5 rounded-2xl text-xs tracking-widest font-black border border-slate-700 bg-slate-800/40 text-slate-400 hover:text-red-400 hover:border-red-500/30 hover:bg-red-500/5 transition-all duration-300 shadow-md"
          >
            <div className="relative flex items-center justify-center group-hover:rotate-[-180deg] transition-transform duration-500">
              <RotateCcw size={18} strokeWidth={1.5} />
            </div>
            <span className="flex flex-col items-start leading-none uppercase">
              <span className="text-[10px] opacity-60 font-medium tracking-normal mb-0.5 group-hover:text-red-300">
                Action
              </span>
              Reset Session
            </span>
          </button>

          {/* --- STATUS BADGE (Unified Design) --- */}
          <div
            className={`flex items-center justify-center gap-3 px-5 py-2.5 rounded-2xl text-xs tracking-widest font-black border transition-all duration-700 shadow-lg backdrop-blur-md ${
              isConnected
                ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/30 shadow-emerald-500/10"
                : "bg-rose-500/10 text-rose-400 border-rose-500/30 shadow-rose-500/10"
            }`}
          >
            <div className="relative flex items-center justify-center">
              {isConnected && (
                <span className="absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75 animate-ping" />
              )}
              <div
                className={`relative z-10 ${isConnected ? "animate-pulse" : ""}`}
              >
                {isConnected ? (
                  <Radio size={18} strokeWidth={1.5} />
                ) : (
                  <WifiOff size={18} strokeWidth={1.5} />
                )}
              </div>
            </div>
            <span className="flex flex-col items-start leading-none uppercase">
              <span className="text-[10px] opacity-60 font-medium tracking-normal mb-0.5">
                Network
              </span>
              {isConnected ? "System Online" : "System Offline"}
            </span>
          </div>
        </div>
      </header>

      {/* --- STATS CARDS --- */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        <StatCard
          title="Total Unique Persons"
          value={stats.total}
          icon={<Users className="text-blue-400" size={24} strokeWidth={1.5} />}
          gradient="from-blue-600/20 to-blue-400/5"
          borderColor="border-blue-500/30"
        />
        <StatCard
          title="Known Persons"
          value={stats.known}
          icon={
            <UserCheck
              className="text-emerald-400"
              size={24}
              strokeWidth={1.5}
            />
          }
          gradient="from-emerald-600/20 to-emerald-400/5"
          borderColor="border-emerald-500/30"
        />
        <StatCard
          title="Unknown Persons"
          value={stats.unknown}
          icon={
            <UserMinus
              className="text-orange-400"
              size={24}
              strokeWidth={1.5}
            />
          }
          gradient="from-orange-600/20 to-orange-400/5"
          borderColor="border-orange-500/30"
        />
      </div>

      {/* --- DATA TABLE SECTION --- */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-3xl overflow-hidden backdrop-blur-md shadow-2xl">
        <div className="p-6 border-b border-slate-800 flex justify-between items-center bg-slate-900/30">
          <h2 className="text-xl font-semibold text-white">
            Live Event Stream
          </h2>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-slate-800 rounded-full text-xs text-slate-400 border border-slate-700">
              {events.length} logs captured
            </span>
          </div>
        </div>

        <div className="max-h-[600px] overflow-y-auto">
          <table className="w-full border-collapse">
            <thead className="sticky top-0 bg-slate-900 shadow-sm z-10">
              <tr className="text-left">
                <th className="px-6 py-4 text-xs font-uppercase tracking-wider text-slate-500">
                  Timestamp
                </th>
                <th className="px-6 py-4 text-xs font-uppercase tracking-wider text-slate-500">
                  Source
                </th>
                <th className="px-6 py-4 text-xs font-uppercase tracking-wider text-slate-500">
                  Identifiers
                </th>
                <th className="px-6 py-4 text-xs font-uppercase tracking-wider text-slate-500">
                  Classification
                </th>
                <th className="px-6 py-4 text-xs font-uppercase tracking-wider text-slate-500">
                  Confidence
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {events.map((ev, index) => (
                <tr
                  key={ev.event_id || index}
                  className="hover:bg-blue-500/5 transition-colors group"
                >
                  <td className={tableStyle}>
                    <span className="text-slate-400 font-mono">
                      {new Date(ev.timestamp).toLocaleTimeString()}
                    </span>
                  </td>
                  <td className={tableStyle}>
                    <span className="bg-slate-800 px-2 py-1 rounded-md text-xs border border-slate-700">
                      CAM-{ev.camera_id}
                    </span>
                  </td>
                  <td className={tableStyle}>
                    <div className="flex flex-col">
                      <span className="text-xs text-slate-500 italic">
                        Track: {ev.track_id}
                      </span>
                      <code className="text-blue-400 font-bold">
                        {ev.person_id}
                      </code>
                    </div>
                  </td>
                  <td className={tableStyle}>
                    <span
                      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${
                        ev.is_known
                          ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                          : "bg-rose-500/10 text-rose-400 border-rose-500/20"
                      }`}
                    >
                      {ev.is_known ? (
                        <ShieldCheck size={14} />
                      ) : (
                        <ShieldAlert size={14} />
                      )}
                      {ev.is_known ? "Known" : "Unknown"}
                    </span>
                  </td>
                  <td className={tableStyle}>
                    <div className="w-full max-w-[100px]">
                      <div className="flex justify-between mb-1 text-[10px]">
                        <span>{(ev.confidence * 100).toFixed(0)}%</span>
                      </div>
                      <div className="w-full bg-slate-800 rounded-full h-1.5">
                        <div
                          className={`h-1.5 rounded-full transition-all duration-1000 ${
                            ev.confidence > 0.8
                              ? "bg-emerald-500"
                              : "bg-amber-500"
                          }`}
                          style={{ width: `${ev.confidence * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {events.length === 0 && (
            <div className="flex flex-col items-center justify-center p-20 text-slate-500 space-y-4">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
              <p className="animate-pulse">
                Listening for incoming data stream...
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const StatCard = ({ title, value, icon, gradient, borderColor }) => (
  <div
    className={`p-6 rounded-3xl border ${borderColor} bg-gradient-to-br ${gradient} backdrop-blur-sm shadow-lg`}
  >
    <div className="flex justify-between items-start">
      <div>
        <p className="text-slate-400 text-sm font-medium mb-1">{title}</p>
        <h3 className="text-4xl font-bold text-white tracking-tight">
          {value}
        </h3>
      </div>
      <span className="text-2xl bg-slate-900/50 p-3 rounded-2xl shadow-inner">
        {icon}
      </span>
    </div>
  </div>
);
const tableStyle = "px-6 py-4 text-sm text-slate-300 border-b border-slate-800";
export default LiveDashboard;
