import React, { useState } from 'react';
import api from '../../utils/api'; // Corrected path based on previous files
import toast from 'react-hot-toast';
import { Cctv, Network, Plus, ShieldCheck, Terminal } from 'lucide-react';

const AddCamera = () => {
  const [formData, setFormData] = useState({ name: '', ipAddress: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const cameraPromise = api.post('/cameras/add', formData);

    toast.promise(cameraPromise, {
      loading: 'Initializing Node Connection...',
      success: (res) => {
        const name = formData.name;
        setFormData({ name: '', ipAddress: '' });
        return `Node "${name}" successfully linked to registry.`;
      },
      error: (err) => {
        const errorMsg = err.response?.data?.error || 'Network handshake failed';
        return <b>{errorMsg}</b>;
      },
    }, {
      style: {
        borderRadius: '16px',
        background: '#0f172a',
        color: '#f1f5f9',
        border: '1px solid #1e293b',
        fontSize: '14px',
        fontFamily: 'monospace',
      },
    });
  };

  return (
    <div className="pt-20 pb-20 px-6 min-h-screen bg-[#020617] flex items-center justify-center">
      <div className="relative group w-full max-w-lg">
        {/* Animated Glow Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-[32px] blur opacity-20 group-hover:opacity-40 transition duration-1000"></div>
        
        <div className="relative p-8 md:p-12 bg-slate-900/50 backdrop-blur-2xl rounded-[32px] border border-slate-800 shadow-2xl">
          {/* Header */}
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-600/10 border border-blue-500/20 text-blue-400 mb-6">
              <Cctv size={32} />
            </div>
            <h2 className="text-3xl font-black text-white tracking-tighter uppercase">
              Node Provisioning
            </h2>
            <p className="text-slate-500 text-sm mt-2 font-medium tracking-wide">
              Integrate a new biometric stream into the network
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Display Name Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                <Terminal size={12} className="text-blue-500" />
                Identifier Name
              </label>
              <input
                type="text"
                placeholder="e.g. Lobby Entrance North"
                className="w-full bg-slate-950/50 border border-slate-800 text-slate-200 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all placeholder:text-slate-700"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
              />
            </div>

            {/* IP Address Input */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 ml-1">
                <Network size={12} className="text-blue-500" />
                Network Endpoint (IP)
              </label>
              <input
                type="text"
                placeholder="http://192.168.1.100:5000/live"
                className="w-full bg-slate-950/50 border border-slate-800 text-slate-200 p-4 rounded-2xl focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 outline-none transition-all font-mono text-sm placeholder:text-slate-700"
                value={formData.ipAddress}
                onChange={(e) => setFormData({ ...formData, ipAddress: e.target.value })}
                required
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="group/btn w-full relative overflow-hidden bg-blue-600 text-white py-4 rounded-2xl font-black text-xs uppercase tracking-[0.2em] hover:bg-blue-500 transition-all shadow-lg shadow-blue-900/20 active:scale-[0.98]"
            >
              <span className="relative z-10 flex items-center justify-center gap-2">
                <Plus size={18} />
                Register Node
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover/btn:translate-x-full transition-transform duration-1000"></div>
            </button>
          </form>

          {/* Technical Note */}
          <div className="mt-10 pt-8 border-t border-slate-800/50">
            <div className="flex items-start gap-3 bg-blue-500/5 p-4 rounded-2xl border border-blue-500/10">
              <ShieldCheck className="text-blue-500 shrink-0" size={16} />
              <p className="text-[10px] text-slate-500 leading-relaxed uppercase tracking-wider">
                Ensure the camera endpoint is accessible via the local subnet. Encrypted handshake will initiate upon registration.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddCamera;