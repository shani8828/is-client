import React, { useState, useEffect } from "react";
import api from "../../utils/api";

export default function CameraGrid() {
  const [cameras, setCameras] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCameras = async () => {
      try {
        const response = await api.get("/cameras/all");
        setCameras(response.data);
      } catch (err) {
        console.error("Dashboard Camera Fetch Error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCameras();
  }, []);

  const liveCount = cameras.length; // Assuming all registered cameras are intended to be live

  if (loading) {
    return (
      <div className="w-full animate-pulse">
        <div className="h-8 w-32 bg-gray-200 rounded mb-5"></div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="h-48 bg-gray-100 rounded-2xl"></div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Section Header */}
      <div className="mb-5 flex items-center justify-between">
        <h3 className="text-xl font-semibold tracking-wide text-indigo-600">
          Live Streams
        </h3>
        <span className="text-xs font-medium text-gray-500">
          {liveCount} configured
        </span>
      </div>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cameras.length > 0 ? (
          cameras.map((cam) => (
            <div
              key={cam._id}
              className="group relative overflow-hidden rounded-2xl p-5 bg-gradient-to-br from-indigo-500/10 via-purple-500/10 to-sky-500/10 backdrop-blur-xl border border-gray-200/30 shadow-lg transition-all duration-500 ease-out hover:-translate-y-2 hover:shadow-2xl hover:shadow-indigo-500/30"
            >
              {/* Ambient Hover Glow */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/20 via-indigo-500/20 to-purple-500/20 opacity-0 blur-2xl transition-opacity duration-500 group-hover:opacity-100" />

              {/* Content */}
              <div className="relative z-10">
                <div className="flex items-center justify-between mb-4">
                  <h4 className="text-lg font-medium text-indigo-600 truncate mr-2">
                    {cam.name}
                  </h4>
                  <span className="text-[11px] px-2.5 py-1 rounded-full font-semibold tracking-wide text-green-600 bg-green-500/10 border border-green-300/30">
                    Active
                  </span>
                </div>

                {/* Stream Preview Area */}
                <div className="flex items-center justify-center aspect-video rounded-xl bg-black overflow-hidden shadow-inner border border-gray-800">
                  {cam.ipAddress ? (
                    <img
                      src={cam.ipAddress}
                      alt={cam.name}
                      className="w-full h-full object-cover"
                      onError={(e) => {
                        e.target.onerror = null;
                        e.target.src =
                          "https://via.placeholder.com/640x360?text=Stream+Offline";
                      }}
                    />
                  ) : (
                    <span className="text-sm text-gray-500">No Stream URL</span>
                  )}
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full py-10 text-center bg-gray-50 rounded-2xl border border-dashed border-gray-300">
            <p className="text-gray-400">
              No cameras connected to the dashboard.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
