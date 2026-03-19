import { useEffect, useState } from "react";
import { socket } from "../socket";

export default function useLiveCounts() {
  const [counts, setCounts] = useState({
    known: 0,
    unknown: 0,
    total: 0,
  });

  useEffect(() => {
    socket.on("countUpdate", (data) => {
      setCounts(data);
    });

    return () => {
      socket.off("countUpdate");
    };
  }, []);

  return counts;
}