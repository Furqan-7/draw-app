"use client";
import DrawPageRect from "@/draw/page";
import { useEffect, useRef } from "react";

export default function Canvas({ roomId,socket,token }: { roomId: string,socket: WebSocket,token: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    console.log("Canvas component mounted with roomId: " + roomId);
    DrawPageRect(canvas,roomId,socket,token);
  }, [canvasRef]);

  return (
    <div className="bg-black">
      <canvas id="canvas" ref={canvasRef} height={2000} width={2000}></canvas>
    </div>
  );
}
