"use client";
import { useEffect, useState } from "react";
import Canvas from "./Canvas";

export default function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  const token = "Hello";

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/ws?token=${token}`);

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setSocket(ws);
    };
  }, []);

  if (!socket) {
    return <div>Connecting to WebSocket...</div>;
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} />
    </div>
  );
}
