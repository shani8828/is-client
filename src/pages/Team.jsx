import React from "react";
import {
  User,
  Code2,
  Database,
  Camera,
  Cpu,
  Github,
  ExternalLink,
  ShieldCheck,
  Award,
} from "lucide-react";

const Team = () => {
  const members = [
    {
      name: "Kewal Kumar",
      roll: "23IM10018",
      role: "Algorithm Specialist",
      tags: ["Eigenfaces", "Unique Check", "Optimization"],
      contribution:
        "Responsible for the improvement and implementation of the 'Face Recognition using Eigenfaces' algorithm. Built the recognition pipeline and ensured unique identity tracking across frames.",
      icon: <Cpu className="text-blue-400" size={24} />,
    },
    {
      name: "Kolanti Akash",
      roll: "23IM10019",
      role: "Computer Vision Engineer",
      tags: ["Python", "Face Recognition", "OpenCV"],
      contribution:
        "Developed the face recognition and identification pipeline, handling live video processing, face detection, and matching logic for distinguishing known and unknown individuals.",
      icon: <Code2 className="text-indigo-400" size={24} />,
    },
    {
      name: "Shani Maurya",
      roll: "23IM10033",
      role: "Full Stack & System Architect",
      tags: ["React", "NodeJS", "MongoDB"],
      contribution:
        "Designed and built the complete system architecture, including the frontend dashboard, backend APIs, database structure, and integration of the vision pipeline for real-time monitoring.",
      icon: <Database className="text-emerald-400" size={24} />,
    },
    {
      name: "Baki Vasanth",
      roll: "23IM30005",
      role: "Vision Engineer",
      tags: ["Face Detection", "IP Cameras", "OpenCV"],
      contribution:
        "Expertly configured IP camera streams and implemented real-time face detection models to ensure high-accuracy capture in lobby environments.",
      icon: <Camera className="text-amber-400" size={24} />,
    },
  ];

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pt-24 pb-20">
      <div className="max-w-7xl mx-auto px-6">
        {/* --- HEADER --- */}
        <header className="mb-20">
          <div className="flex flex-col items-center text-center">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-[10px] font-black tracking-[.3em] uppercase mb-6">
              <Award size={14} /> Intelligence Personnel
            </div>
            <h1 className="text-5xl md:text-6xl font-black text-white mb-4 tracking-tighter">
              The{" "}
              <span className="bg-gradient-to-r from-blue-400 to-indigo-400 bg-clip-text text-transparent">
                Development Core
              </span>
            </h1>
            <p className="text-slate-500 font-mono text-sm uppercase tracking-widest">
              Manpower Count in A Lobby • IS Project 2026
            </p>
          </div>
        </header>

        {/* --- TEAM GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-24">
          {members.map((member, idx) => (
            <div
              key={idx}
              className="group relative p-8 rounded-[40px] bg-slate-900/40 border border-slate-800 hover:border-blue-500/50 transition-all duration-500 backdrop-blur-sm overflow-hidden"
            >
              {/* Decorative Background Roll Number */}
              <div className="absolute -right-4 -top-4 text-9xl font-black text-slate-800/20 pointer-events-none group-hover:text-blue-500/5 transition-colors">
                {member.roll.slice(-2)}
              </div>

              <div className="relative flex flex-col md:flex-row gap-8 items-start">
                {/* Profile Icon Section */}
                <div className="shrink-0">
                  <div className="w-20 h-20 rounded-3xl bg-slate-800 flex items-center justify-center border border-slate-700 shadow-2xl group-hover:bg-blue-600 transition-colors duration-500">
                    {member.icon}
                  </div>
                </div>

                {/* Content Section */}
                <div className="flex-1">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h3 className="text-2xl font-bold text-white group-hover:text-blue-400 transition-colors">
                        {member.name}
                      </h3>
                      <p className="text-blue-500 text-xs font-black tracking-widest uppercase mt-1">
                        {member.role}
                      </p>
                    </div>
                    <span className="font-mono text-xs text-slate-500 bg-slate-950 px-3 py-1 rounded-lg border border-slate-800">
                      {member.roll}
                    </span>
                  </div>

                  <div className="flex flex-wrap gap-2 my-4">
                    {member.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[10px] font-bold text-slate-400 bg-slate-800/50 px-2 py-0.5 rounded-md border border-slate-700"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>

                  <p className="text-slate-400 text-sm leading-relaxed mb-6">
                    {member.contribution}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* --- BOTTOM SECTION: ROLE SUMMARY --- */}
        <section className="p-12 rounded-[50px] border border-slate-800 bg-gradient-to-br from-slate-900 to-[#020617] relative overflow-hidden">
          <div className="absolute top-0 right-0 p-10 opacity-5">
            <ShieldCheck size={200} />
          </div>

          <h2 className="text-3xl font-black text-white mb-10 tracking-tight flex items-center gap-4">
            <ShieldCheck className="text-blue-500" /> Operational Framework
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            <div className="space-y-4">
              <h4 className="text-blue-400 font-bold uppercase text-xs tracking-[.2em]">
                Vision Core
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Advanced Eigenfaces implementation tuned for Lobby environments,
                featuring optimized PCA for rapid identity verification.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-emerald-400 font-bold uppercase text-xs tracking-[.2em]">
                Data Layer
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Persistent storage via MongoDB with a custom uniqueness logic to
                prevent redundant counting across multiple camera nodes.
              </p>
            </div>
            <div className="space-y-4">
              <h4 className="text-indigo-400 font-bold uppercase text-xs tracking-[.2em]">
                Interface
              </h4>
              <p className="text-slate-400 text-sm leading-relaxed">
                Real-time React dashboard utilizing Socket.io for sub-200ms
                event propagation from the edge camera to the UI.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default Team;
