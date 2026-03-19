import React, { useState, useEffect } from "react";
// Assuming api.js has a default export or a named fetch method
import api from "../api/api"; 

const LiveStats = () => {
  const [stats, setStats] = useState({
    total: 0,
    known: 0,
    unknown: 0,
    session_id: ""
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchStats = async () => {
    try {
      setLoading(true);
      // Adjust the endpoint string based on your server setup
      const response = await api.get("/stats/live-stats"); 
      setStats(response.data);
      setError(null);
    } catch (err) {
      console.error("Failed to fetch live stats:", err);
      setError("Could not load statistics.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStats();
    // Optional: Set up polling every 30 seconds for "live" updates
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, []);

  if (loading && !stats.session_id) return <p>Loading stats...</p>;
  if (error) return <p style={{ color: "red" }}>{error}</p>;

  return (
    <div style={{ padding: "20px", border: "1px solid #ccc", borderRadius: "8px" }}>
      <h2>Live Session Stats</h2>
      <p><strong>Session ID:</strong> {stats.session_id}</p>
      
      <div style={{ display: "flex", gap: "20px", marginTop: "10px" }}>
        <div>
          <h3>Total</h3>
          <p>{stats.total}</p>
        </div>
        <div>
          <h3>Known</h3>
          <p style={{ color: "green" }}>{stats.known}</p>
        </div>
        <div>
          <h3>Unknown</h3>
          <p style={{ color: "orange" }}>{stats.unknown}</p>
        </div>
      </div>
      
      <button onClick={fetchStats} style={{ marginTop: "15px" }}>
        Refresh Now
      </button>
    </div>
  );
};

export default LiveStats;