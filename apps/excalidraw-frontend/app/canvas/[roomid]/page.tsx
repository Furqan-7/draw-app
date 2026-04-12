"use client";
import { useEffect, useRef } from "react";

export default function CanvasPage() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }

    const context = canvas.getContext("2d");
    if (!context) {
      return;
    }

    let startX = 0;
    let startY = 0;
    let Drawing = false;
    canvas.addEventListener("mousedown", (e) => {
      Drawing = true;
      startX = e.clientX;
      startY = e.clientY;
    });
    canvas.addEventListener("mouseup", (e) => {
      Drawing = false;
      console.log(e.clientX);
      console.log(e.clientY);
    });
    canvas.addEventListener("mousemove", (e) => {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      if (Drawing) {
        context.clearRect(0, 0, canvas.width, canvas.height);
        context.strokeRect(startX,startY, width, height);
      }
    });
  }, [canvasRef]);
  return (
    <div className="bg-white">
      <canvas  id="canvas" ref={canvasRef} height={500} width={600}></canvas>
    </div>
  );
}
