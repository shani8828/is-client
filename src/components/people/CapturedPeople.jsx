import React, { useEffect, useState } from "react";
import api from "../../utils/api";
import { socket } from "../../services/socket"; // Adjust path as needed
import { Camera, UserCheck, Clock, X, Maximize2, Loader2, Zap } from "lucide-react";

const url = import.meta.env.VITE_BACKEND_URI || "http://localhost:5000";

const CapturedPeople = () => {
  const [people, setPeople] = useState([]);
  const [loading, setLoading] = useState(true);
  const [lightboxImage, setLightboxImage] = useState(null);

  /**
   * Logical Update:
   * 1. If person doesn't exist, add them.
   * 2. If current is 100% and new is < 100% but still high (> 50%), prefer the new one for realism.
   * 3. Otherwise, stick to the highest confidence.
   */
  const mergePerson = (currentList, person) => {
    const idx = currentList.findIndex((p) => p.label === person.label);
    if (idx === -1) return [person, ...currentList];

    const current = currentList[idx];
    const newConf = person.confidence;
    const oldConf = current.confidence;

    let shouldUpdate = false;

    // Rule: Prefer the most realistic "High Confidence" shot that isn't exactly 100%
    if (oldConf >= 0.99 && newConf < 1.0 && newConf > 0.70) {
      shouldUpdate = true;
    } 
    // Default: Just get the better match
    else if (newConf > oldConf) {
      shouldUpdate = true;
    }

    if (shouldUpdate) {
      const updated = [...currentList];
      updated[idx] = person;
      return updated;
    }
    return currentList;
  };

  useEffect(() => {
    (async () => {
      try {
        const { data } = await api.get("/captured-faces");
        // Sort by date first so reduce processes them in order
        const sortedData = data.sort((a, b) => new Date(a.createdAt) - new Date(b.createdAt));
        const grouped = sortedData.reduce((acc, p) => mergePerson(acc, p), []);
        setPeople(grouped);
      } catch (err) {
        console.error("Fetch error:", err);
      }
      setLoading(false);
    })();

    socket.on("new-face-capture", (p) => setPeople((prev) => mergePerson(prev, p)));
    return () => socket.off("new-face-capture");
  }, []);

  return (
    <div className="p-4 md:p-8 min-h-screen bg-slate-950 text-slate-200 selection:bg-blue-500/30">
      <header className="max-w-7xl mx-auto mb-10 pt-14 px-4">
        <div className="flex items-center gap-4">
          <div className="p-3 bg-blue-600/10 rounded-xl border border-blue-500/20">
            <Camera className="text-blue-500" />
          </div>
          <h1 className="text-4xl font-black text-white uppercase italic">
            Captured <span className="text-slate-500 font-light not-italic">Faces</span>
          </h1>
        </div>
        <div className="mt-4 h-px w-24 bg-gradient-to-r from-blue-600 to-transparent" />
      </header>

      <main className="max-w-7xl mx-auto">
        {loading ? (
          <div className="flex flex-col justify-center items-center h-80 text-slate-500 animate-pulse">
            <Loader2 className="w-10 h-10 text-blue-500 animate-spin mb-4" />
            <p>Syncing encrypted history...</p>
          </div>
        ) : people.length === 0 ? (
          <div className="flex flex-col items-center py-24 bg-slate-900/30 rounded-3xl border border-slate-800 border-dashed">
            <Zap className="w-12 h-12 text-slate-600 mb-6" />
            <h3 className="text-2xl font-bold">The lobby is currently clear</h3>
            <p className="text-slate-500 mt-2">Intelligence monitoring active.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5">
            {people.map((p) => (
              <div
                key={p._id}
                onClick={() => setLightboxImage(`${url}${p.imagePath}`)}
                className="group bg-slate-900 rounded-2xl border border-slate-800 overflow-hidden cursor-pointer transition-all hover:border-blue-500/50 shadow-lg hover:shadow-blue-500/10"
              >
                <div className="relative aspect-[4/5] overflow-hidden">
                  <img
                    src={`${url}${p.imagePath}`}
                    alt={p.label}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale-[30%] group-hover:grayscale-0"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 to-transparent" />
                  <div className="absolute top-2 right-2 bg-slate-950/80 backdrop-blur text-[10px] font-black text-blue-400 px-2 py-1 rounded-lg border border-white/5">
                    {(p.confidence * 100).toFixed(1)}%{" "}
                    <span className="text-slate-500 font-normal">MATCH</span>
                  </div>
                  <Maximize2 className="absolute bottom-3 left-3 w-7 h-7 p-1.5 bg-blue-600 text-white rounded-lg opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="p-4">
                  <div className="flex items-center gap-2 mb-1">
                    <UserCheck className="w-3.5 h-3.5 text-blue-500" />
                    <p className="font-bold text-sm truncate tracking-tight text-slate-100">
                      {p.label}
                      {/* {p.label.replace("unknown_", "ID-")} */}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 text-slate-500 text-[11px] font-mono">
                    <Clock className="w-3 h-3" />
                    {new Date(p.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', second: '2-digit' })}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {lightboxImage && (
        <div
          className="fixed inset-0 bg-slate-950/98 backdrop-blur-xl z-[100] flex items-center justify-center p-4 transition-all duration-300"
          onClick={() => setLightboxImage(null)}
        >
          <button className="absolute top-6 right-6 p-2 bg-slate-800/50 text-slate-300 rounded-full hover:bg-slate-700 transition-colors">
            <X size={24} />
          </button>
          <div
            className="relative flex flex-col items-center max-w-full max-h-full scale-in-center"
            onClick={(e) => e.stopPropagation()}
          >
            <img
              src={lightboxImage}
              className="max-w-[95vw] max-h-[80vh] object-contain rounded-2xl shadow-2xl border border-white/10 ring-1 ring-white/20"
              alt="HD View"
            />
            <p className="mt-6 text-slate-500 text-[10px] font-mono tracking-[0.4em] animate-pulse uppercase">
              Identity Verification Protocol Active
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default CapturedPeople;