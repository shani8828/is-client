import React from 'react';
import { 
  ShieldCheck, 
  Cpu, 
  Globe, 
  Database, 
  Layers, 
  Zap, 
  Target, 
  Lightbulb, 
  Camera, 
  Users, 
  Code2,
  Server
} from 'lucide-react';

const About = () => {
  const technologies = [
    { name: "OpenCV", desc: "Advanced Image Processing", icon: <Camera size={20} /> },
    { name: "InsightFace", desc: "Buffalo_L Model Integration", icon: <Target size={20} /> },
    { name: "ArcFace", desc: "512D Vector Embeddings", icon: <FingerprintIcon /> },
    { name: "Node.js", desc: "High-performance Backend", icon: <Server size={20} /> },
    { name: "Socket.io", desc: "Low-latency WebSocket Data", icon: <Zap size={20} /> },
    { name: "MongoDB", desc: "NoSQL Data Persistence", icon: <Database size={20} /> },
    { name: "ReactJS", desc: "Dynamic UI Components", icon: <Code2 size={20} /> },
  ];

  const ideationSteps = [
    { title: "IP Camera", desc: "Capture live video from the monitored area.", icon: <Camera /> },
    { title: "Face Detection", desc: "Isolate facial regions in each video frame.", icon: <Target /> },
    { title: "Face Recognition", desc: "Match faces with known identities using Eigenfaces/ArcFace.", icon: <ShieldCheck /> },
    { title: "Uniqueness Check", desc: "Ensure each person is counted only once per session.", icon: <Users /> },
    { title: "Backend API", desc: "Process and transmit validated data streams.", icon: <Layers /> },
    { title: "Database", desc: "Immutable record storage in MongoDB.", icon: <Database /> },
    { title: "Dashboard", desc: "Live visualization of metrics and events.", icon: <Globe /> },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pt-24 pb-20 selection:bg-blue-500/30">
      <div className="max-w-6xl mx-auto px-6">
        
        {/* --- HERO HEADER --- */}
        <section className="text-center mb-24 animate-fade-in">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[0.3em] uppercase mb-6">
            Documentation Phase
          </div>
          <h1 className="text-5xl md:text-7xl font-black text-white mb-4 tracking-tighter">
            Manpower Count <span className="text-blue-500">In A Lobby</span>
          </h1>
          <p className="text-slate-500 font-mono tracking-widest uppercase text-sm">
            IS Project 2025-26 • System Architecture
          </p>
        </section>

        {/* --- PROBLEM STATEMENT --- */}
        <section className="mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl font-bold text-white mb-8 flex items-center gap-3">
                <Lightbulb className="text-amber-400" /> Problem Statement
              </h2>
              <div className="space-y-6">
                <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/30 transition-all group">
                  <h4 className="text-blue-400 font-bold mb-2 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <ShieldCheck size={14}/> Identity Filtering
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Creating a database of known individuals who do not need to be counted as Unknown ones, optimizing security focus.
                  </p>
                </div>
                <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/30 transition-all group">
                  <h4 className="text-emerald-400 font-bold mb-2 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <Users size={14}/> Unique Tracking
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Detect and count unique unknown faces entering the convention area using high-resolution video streams.
                  </p>
                </div>
                <div className="p-6 rounded-3xl bg-slate-900/40 border border-slate-800 hover:border-blue-500/30 transition-all group">
                  <h4 className="text-indigo-400 font-bold mb-2 flex items-center gap-2 uppercase text-xs tracking-widest">
                    <Globe size={14}/> Real-time Monitoring
                  </h4>
                  <p className="text-slate-400 text-sm leading-relaxed">
                    Build a web application to monitor and display real-time counts of both known and unknown faces during the event.
                  </p>
                </div>
              </div>
            </div>
            <div className="relative">
              <div className="absolute inset-0 bg-blue-500/10 blur-[100px] rounded-full" />
              <div className="relative p-10 rounded-[40px] border border-slate-800 bg-slate-900/50 backdrop-blur-xl">
                <h3 className="text-xl font-bold text-white mb-6 uppercase tracking-tighter">Algorithm Implementation</h3>
                <p className="text-slate-400 leading-relaxed mb-6">
                  Our core intelligence relies on the <span className="text-blue-400 font-mono underline decoration-blue-500/30">Eigenfaces</span> algorithm, significantly improved for real-world lighting conditions and lobby traffic patterns.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* --- OUR IDEATION (Timeline) --- */}
        <section className="mb-32">
            <h2 className="text-3xl font-bold text-white mb-16 text-center">System Pipeline Ideation</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {ideationSteps.map((step, idx) => (
                    <div key={idx} className="relative p-8 rounded-[32px] border border-slate-800 bg-gradient-to-b from-slate-900/80 to-transparent hover:-translate-y-2 transition-transform duration-500">
                        <div className="w-10 h-10 rounded-full bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 mb-6 font-black italic">
                            {idx + 1}
                        </div>
                        <h4 className="text-lg font-bold text-white mb-2">{step.title}</h4>
                        <p className="text-slate-500 text-xs leading-relaxed">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>

        {/* --- TECHNOLOGIES GRID --- */}
        <section className="bg-slate-900/30 rounded-[60px] p-12 border border-slate-800/50">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-white mb-4">Underlying Technologies</h2>
            <p className="text-slate-500">A hybrid stack built for performance and accuracy.</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {technologies.map((tech, idx) => (
              <div key={idx} className="flex flex-col items-center text-center group">
                <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center text-slate-400 mb-4 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300 border border-slate-700">
                  {tech.icon}
                </div>
                <h5 className="text-white font-bold text-sm mb-1 uppercase tracking-widest">{tech.name}</h5>
                <p className="text-[10px] text-slate-600 font-mono">{tech.desc}</p>
              </div>
            ))}
          </div>
          <div className="mt-16 p-6 rounded-2xl bg-blue-500/5 border border-blue-500/10 text-center">
             <p className="text-xs font-mono text-blue-400 tracking-tighter uppercase">
               Deep Learning Models: <span className="font-black">InsightFace (buffalo_l) & ArcFace (512D) Integration</span>
             </p>
          </div>
        </section>

      </div>
    </div>
  );
};

const FingerprintIcon = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 10a2 2 0 0 0-2 2c0 1.02-.1 2.02-.3 3"/><path d="M14 13.12c0 2.38 0 4.38-.14 4.38-.13 0-.13-2-.13-4.38"/><path d="M18 11c0 4.42-3 7-6 7s-6-2.58-6-7a6 6 0 0 1 12 0"/><path d="M12 20c-3.31 0-6-2.69-6-6"/><path d="M20 11a8 8 0 0 0-16 0"/><path d="M12 4a8 8 0 0 0-8 8"/><path d="M9 14c.66 0 1.2.54 1.2 1.2s-.54 1.2-1.2 1.2-1.2-.54-1.2-1.2.54-1.2 1.2-1.2"/></svg>
);

export default About;