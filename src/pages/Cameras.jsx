import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import api from "../utils/api"; 
import toast from "react-hot-toast";
import { Plus, Video, Monitor, AlertCircle, Loader2, Signal } from "lucide-react";
import CameraCard from "../components/cameras/CameraCard";
import CameraGrid from "../components/dashboard/CameraGrid";

export default function Cameras() {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  
  useEffect(() => {
    const fetchCameras = async () => {
      try {
        setLoading(true);
        const response = await api.get("/cameras/all");
        setCameras(response.data);
      } catch (err) {
        console.error("Error fetching cameras:", err);
        toast.error("Network Link Failed: Unable to reach camera nodes.");
      } finally {
        setLoading(false);
      }
    };
    fetchCameras();
  }, []);

  return (
    <div className="min-h-screen bg-[#020617] text-slate-200 pt-24 px-10 pb-6">
        {/* --- PAGE HEADER --- */}
        <header className="mb-10 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 border-b border-slate-800/50 pb-8">
          <div>
            <div className="flex items-center gap-3 mb-2">
              <div className="p-2 bg-blue-500/10 rounded-lg">
                <Monitor className="text-blue-400" size={24} />
              </div>
              <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
                Camera Stream
              </h2>
            </div>
            <p className="text-slate-500 text-sm font-medium tracking-wide flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              Direct access to {cameras.length} distributed monitoring units
            </p>
          </div>

          <button
            onClick={() => navigate("/add-camera")}
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-500 text-white rounded-xl font-bold transition-all shadow-lg shadow-blue-600/20 active:scale-95 text-sm uppercase tracking-widest"
          >
            <Plus size={18} strokeWidth={3} />
            Initialize New Node
          </button>
        </header>

        {/* --- CAMERA STATUS OVERVIEW --- */}
        {loading ? (
          <div className="flex flex-col justify-center items-center h-96 space-y-4">
            <Loader2 className="animate-spin text-blue-500" size={48} strokeWidth={1.5} />
            <p className="text-slate-500 font-mono text-xs tracking-[0.3em] uppercase animate-pulse">
              Synchronizing Feeds...
            </p>
          </div>
        ) : cameras.length > 0 ? (
          <div className="space-y-12">
            {/* Main Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {cameras.map((cam) => (
                <div key={cam._id || cam.id} className="relative group">
                   {/* Decorative border glow on hover */}
                  <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-500 to-indigo-500 rounded-3xl blur opacity-0 group-hover:opacity-20 transition duration-500"></div>
                  
                  <div className="relative">
                    <CameraCard camera={cam} />
                  </div>
                </div>
              ))}
            </div>
            
            {/* System Grid Section */}
            <div className="pt-10 border-t border-slate-800/50">
               <div className="flex items-center gap-2 mb-6 text-slate-400">
                  <Signal size={16} />
                  <span className="text-xs font-black uppercase tracking-widest">Multi-View Matrix</span>
               </div>
               <CameraGrid />
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-32 bg-slate-900/20 rounded-[40px] border-2 border-dashed border-slate-800 backdrop-blur-sm group">
            <div className="p-6 bg-slate-800/50 rounded-full mb-6 group-hover:scale-110 transition-transform duration-500">
              <Video className="text-slate-600" size={48} strokeWidth={1} />
            </div>
            <p className="text-slate-400 text-xl font-bold mb-2">No Active Nodes Detected</p>
            <p className="text-slate-600 text-sm max-w-xs text-center leading-relaxed">
              Your surveillance matrix is currently offline. Connect a camera node to begin manpower tracking.
            </p>
            <button 
              onClick={() => navigate("/add-camera")}
              className="mt-8 px-8 py-3 bg-slate-800 hover:bg-slate-700 text-white rounded-xl text-xs font-black uppercase tracking-widest transition-colors"
            >
              Add Node-01
            </button>
          </div>
        )}

        {/* --- FLOATING ACTION BUTTON (Optional if Header button is enough) --- */}
        <div className="fixed bottom-8 right-8 z-50">
          <button
            onClick={() => navigate("/add-camera")}
            className="flex items-center justify-center w-16 h-16 bg-blue-600 hover:bg-blue-500 text-white rounded-2xl shadow-2xl shadow-blue-500/40 transition-all hover:rotate-90 active:scale-90"
            title="Add New Camera"
          >
            <Plus size={32} />
          </button>
        </div>
    </div>
  );
}