import { useState, useEffect } from "react";
import { socket } from "../services/socket";
import axios from "axios";

const API_URL = import.meta.env.VITE_BACKEND_URI || "http://localhost:5000";

export function useLiveStats() {
  const [stats, setStats] = useState({ known: 0, unknown: 0, total: 0 });
  const [events, setEvents] = useState([]);
  const [currentSession, setCurrentSession] = useState(null);
  const [isConnected, setIsConnected] = useState(socket.connected);

  useEffect(() => {
    // 1. Initial Load of Stats
    const fetchStats = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/stats`);
        setStats(res.data);
        setCurrentSession(res.data.session_id);
      } catch (err) {
        console.error("Stats fetch error:", err);
      }
    };

    fetchStats();

    // 2. Socket Listeners
    const onConnect = () => setIsConnected(true);
    const onDisconnect = () => setIsConnected(false);

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    
    socket.on("countUpdate", (data) => {
      // If server restarted and session changed, clear events list
      if (currentSession && data.session_id !== currentSession) {
        setEvents([]);
        setCurrentSession(data.session_id);
      }
      setStats(data);
    });

    socket.on("new_event", (event) => {
      setEvents((prev) => [event, ...prev].slice(0, 10));
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
      socket.off("countUpdate");
      socket.off("new_event");
    };
  }, [currentSession]);

  return { 
    totalKnown: stats.known, 
    totalUnknown: stats.unknown, 
    totalCount: stats.total,
    recentEvents: events,
    isConnected 
  };
}