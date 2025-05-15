import { useEffect, useRef } from "react";
import { io, Socket } from "socket.io-client";

const SOCKET_SERVER_URL = "http://localhost:3000";

export function useSocket(): Socket | null {
  const socketRef = useRef<Socket | null>(null);

  useEffect(() => {
    const socket = io(SOCKET_SERVER_URL, { transports: ["websocket"] });
    socketRef.current = socket;

    return () => {
      socket.disconnect();
    };
  }, []);

  return socketRef.current;
}
