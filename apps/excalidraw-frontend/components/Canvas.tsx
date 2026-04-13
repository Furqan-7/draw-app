"use client";
import DrawPageRect from "@/draw/page";
import { useEffect, useRef } from "react";

export default function Canvas({ roomId }: { roomId: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    DrawPageRect(canvas, roomId);
  }, [canvasRef]);

  return (
    <div className="bg-black">
      <canvas id="canvas" ref={canvasRef} height={2000} width={2000}></canvas>
    </div>
  );
}
