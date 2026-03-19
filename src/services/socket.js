import { io } from "socket.io-client";

const SOCKET_URL = import.meta.env.VITE_BACKEND_URI || "http://localhost:5000";

export const socket = io(SOCKET_URL, {
  autoConnect: true,
  reconnection: true,
  reconnectionAttempts: 5,
});

// Helper to check current status
export const isSocketConnected = () => socket.connected;