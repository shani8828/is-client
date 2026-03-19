import {
  LayoutDashboard,
  History,
  Video,
  UserCircle,
  ChevronRight,
  ArrowUpRight,
  Activity,
  GraduationCap,
  Fingerprint,
  Zap,
  Database,
  Cctv,
  LinkIcon,
} from "lucide-react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const navLinks = [
    {
      name: "Live Dashboard",
      icon: <LayoutDashboard size={24} />,
      path: "/dashboard",
      desc: "Real-time unique person counting with sub-second latency.",
      color: "blue",
    },
    {
      name: "Event Logs",
      icon: <History size={24} />,
      path: "/events",
      desc: "Historical capture data with classification audit trails.",
      color: "purple",
    },
    {
      name: "Camera Feeds",
      icon: <Video size={24} />,
      path: "/cameras",
      desc: "Direct streams from distributed edge monitoring nodes.",
      color: "emerald",
    },
    {
      name: "Identity Database",
      icon: <UserCircle size={24} />,
      path: "/people",
      desc: "Management of known entities and facial signatures.",
      color: "amber",
    },
  ];
  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 font-sans selection:bg-blue-500/30 overflow-x-hidden">
      <main className="relative z-10 pt-20">
        {/* --- HERO SECTION --- */}
        <section className="pt-20 pb-32 px-6 text-center max-w-5xl mx-auto">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900 border border-slate-800 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-8 shadow-2xl">
            <Activity size={14} className="animate-pulse" />
            Information System Project 2026
          </div>

          <h1 className="text-6xl md:text-8xl font-black tracking-tighter text-white mb-8 leading-[0.9]">
            Manpower Count in a <br />
            <span className="bg-gradient-to-r from-blue-400 via-indigo-400 to-emerald-400 bg-clip-text text-transparent">
              Lobby
            </span>
          </h1>

          <p className="text-slate-400 text-xl md:text-2xl max-w-3xl mx-auto leading-relaxed font-light mb-12">
            A real-time computer vision system that processes live camera feeds
            to detect, track, and distinguish between known and unknown
            individuals, with results displayed on a monitoring dashboard.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              to="/dashboard"
              className="w-full sm:w-auto px-10 py-5 bg-white text-black font-black rounded-2xl hover:bg-blue-500 hover:text-white transition-all duration-300 flex items-center justify-center gap-2"
            >
              Dashboard <ChevronRight size={20} />
            </Link>
            <Link
              to="/about"
              className="w-full sm:w-auto px-10 py-5 bg-slate-900 text-white font-black rounded-2xl border border-slate-800 hover:border-slate-600 transition-all"
            >
              Documentation
            </Link>
          </div>
        </section>

        {/* --- THE FACULTY SECTION --- */}
        <section id="about" className="max-w-7xl mx-auto px-6 mb-40">
          <div className="flex flex-col lg:flex-row gap-8">
            <div className="lg:w-1/3 flex flex-col justify-center">
              <h2 className="text-4xl font-black text-white mb-6 tracking-tight">
                Guided by <br />
                Academic Excellence
              </h2>
              <p className="text-slate-500 leading-relaxed mb-8">
                Developed under the Department of Industrial & Systems
                Engineering, this project explores the intersection of AI,
                security, and real-world problem solving.
              </p>
              <div className="flex items-center gap-4 p-4 rounded-2xl bg-blue-500/5 border border-blue-500/10">
                <GraduationCap className="text-blue-400" size={32} />
                <span className="text-xs font-bold text-blue-300 tracking-wider">
                  IIT KHARAGPUR <br /> EST. 1951
                </span>
              </div>
            </div>

            <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-10 rounded-[40px] border border-slate-800 bg-gradient-to-b from-slate-900 to-transparent flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-indigo-500/20 flex items-center justify-center text-indigo-400 text-3xl font-black mb-6 border-2 border-indigo-500/30">
                  MJ
                </div>
                <h4 className="text-sm font-black text-indigo-400 uppercase tracking-widest mb-2">
                  Project Supervisor
                </h4>
                <p className="text-3xl font-bold text-white mb-1">
                  Mrs. Mamata Jenamani
                </p>
                <p className="text-slate-500 italic">
                  Professor, Industrial & Systems Engineering
                </p>
              </div>

              <div className="p-10 rounded-[40px] border border-slate-800 bg-gradient-to-b from-slate-900 to-transparent flex flex-col items-center text-center">
                <div className="w-24 h-24 rounded-full bg-emerald-500/20 flex items-center justify-center text-emerald-400 text-3xl font-black mb-6 border-2 border-emerald-500/30">
                  TS
                </div>
                <h4 className="text-sm font-black text-emerald-400 uppercase tracking-widest mb-2">
                  Technical Guidance
                </h4>
                <p className="text-3xl font-bold text-white mb-1">
                  Mr. Tathagatha
                </p>
                <p className="text-slate-500 italic">Teaching Assistant</p>
              </div>
            </div>
          </div>
        </section>

        {/* --- TECHNICAL ARCHITECTURE OVERVIEW --- */}
        <section className="max-w-7xl mx-auto px-6 pb-40">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
            <div>
              <h2 className="text-5xl font-black text-white mb-8 tracking-tighter">
                Engineered for <br />
                <span className="text-blue-500">Real-Time Precision.</span>
              </h2>
              <div className="space-y-10">
                {/* Eigenfaces Implementation */}
                <div className="flex gap-6">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-indigo-600/20 flex items-center justify-center text-indigo-400 border border-indigo-500/20 shadow-lg shadow-indigo-500/10">
                    <Fingerprint size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2 tracking-tight">
                      Eigenfaces Optimization
                    </h4>
                    <p className="text-slate-500 leading-relaxed text-sm">
                      Advanced PCA-based recognition improved for high-traffic
                      environments. Our model effectively filters known
                      personnel from "Unknown" visitor counts.
                    </p>
                  </div>
                </div>

                {/* Real-Time Sync */}
                <div className="flex gap-6">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-blue-600/20 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/10">
                    <Zap size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2 tracking-tight">
                      Socket.IO Event Stream
                    </h4>
                    <p className="text-slate-500 leading-relaxed text-sm">
                      Low-latency data transmission via WebSockets. Every
                      detected face is transmitted to the UI in sub-200ms,
                      ensuring the dashboard reflects reality instantly.
                    </p>
                  </div>
                </div>

                {/* MongoDB Persistence */}
                <div className="flex gap-6">
                  <div className="shrink-0 w-14 h-14 rounded-2xl bg-emerald-600/20 flex items-center justify-center text-emerald-400 border border-emerald-500/20 shadow-lg shadow-emerald-500/10">
                    <Database size={28} />
                  </div>
                  <div>
                    <h4 className="text-xl font-bold text-white mb-2 tracking-tight">
                      Uniqueness Validation
                    </h4>
                    <p className="text-slate-500 leading-relaxed text-sm">
                      Strict database logic ensuring unique track IDs. Known
                      individuals are verified against our registry, while new
                      entities are cataloged without redundancy.
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Side Visual Module */}
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/10 blur-[120px] rounded-full" />
              <div className="relative p-1 rounded-[42px] bg-gradient-to-b from-slate-700 to-slate-900 shadow-2xl">
                <div className="relative p-8 rounded-[40px] bg-[#020617] backdrop-blur-2xl overflow-hidden">
                  <div className="absolute left-0 right-0 h-1 bg-blue-500/50 shadow-[0_0_15px_rgba(59,130,246,0.5)] animate-scan z-20 pointer-events-none" />
                  <div className="aspect-video rounded-2xl bg-slate-950 border border-slate-800 overflow-hidden flex items-center justify-center group relative">
                    {/* <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 pointer-events-none" /> */}
                    <div className="text-center relative z-10">
                      <div className="w-20 h-20 rounded-full bg-blue-600/10 border border-blue-500/30 flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-700">
                        <Cctv size={36} className="text-blue-400" />
                      </div>
                      <p className="text-[10px] font-black uppercase tracking-[0.4em] text-blue-500 animate-pulse">
                        Processing Live Feed...
                      </p>
                    </div>
                  </div>
                  <div className="mt-8 flex items-center justify-between px-2">
                    <div className="flex gap-1.5">
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.3s]"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce [animation-delay:-0.15s]"></div>
                      <div className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-bounce"></div>
                    </div>
                    <span className="text-[10px] font-mono text-slate-600 uppercase tracking-widest">
                      Buffered Data: 0.12ms
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* --- SYSTEM CAPABILITIES GRID --- */}
        <section className="max-w-7xl mx-auto px-6 mb-40">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {navLinks.map((link) => (
              <Link
                key={link.name}
                to={link.path}
                className="group relative block p-8 rounded-[32px] border border-slate-800 bg-slate-900/20 hover:bg-slate-900/40 transition-all duration-500 overflow-hidden"
              >
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity">
                  <ArrowUpRight size={32} className="text-white" />
                </div>
                <div className="w-14 h-14 rounded-2xl bg-slate-800 flex items-center justify-center mb-6 text-blue-400 group-hover:bg-blue-600 group-hover:text-white transition-all duration-500">
                  {link.icon}
                </div>
                <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">
                  {link.name}
                </h3>
                <p className="text-slate-500 text-sm leading-relaxed mb-4">
                  {link.desc}
                </p>
                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-blue-500 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                  Enter Module <ChevronRight size={12} />
                </div>
              </Link>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default HomePage;
