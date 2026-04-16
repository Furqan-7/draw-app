"use client";
import { useEffect, useState } from "react";
import Canvas from "./Canvas";

export default function RoomCanvas({ roomId }: { roomId: string }) {
  const [socket, setSocket] = useState<WebSocket | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      alert("You must be logged in to access this page.");
      return;
    }
    setToken(storedToken);
  }, []);

  useEffect(() => {
    const ws = new WebSocket(`ws://localhost:8080/ws?token=${token}`);

    ws.onopen = () => {
      console.log("WebSocket connection established");
      setSocket(ws);
      ws.send(JSON.stringify({ type: "join_room", roomId }));
    };
  }, []);

  if (!socket) {
    return <div>Connecting to WebSocket...</div>;
  }

  if(!token){
    return <div>Loading...</div>;
  }

  return (
    <div>
      <Canvas roomId={roomId} socket={socket} token={token} />
    </div>
  );
}
