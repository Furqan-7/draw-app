"use client";
import { useEffect, useRef, useState } from "react";
import { RectangleHorizontal, Circle, Pencil } from "lucide-react";
import DrawPage from "@/draw/page";

export default function Canvas({
  roomId,
  socket,
  token,
}: {
  roomId: string;
  socket: WebSocket;
  token: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currectTool, setSelectedTool] = useState<"rect" | "circle" | "pencil">(
    "rect",
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) {
      return;
    }
    console.log("Canvas component mounted with roomId: " + roomId);
    DrawPage(canvas, roomId, socket, token, currectTool);
  }, [canvasRef, currectTool, roomId, socket, token]);

  return (
    <div className="bg-black">
      <canvas id="canvas" ref={canvasRef} height={2000} width={2000}></canvas>

      <div className=" flex items-center justify-center fixed top-5 left-50 bg-gray-900 shadow-sm p-2 rounded-[10px] cursor-pointer gap-6 pl-6 pr-6">
        <div className={currectTool === "rect" ? "bg-gray-600 p-1 rounded" : ""}>
          {" "}
          <RectangleHorizontal
            onClick={() => {
              setSelectedTool("rect");
            }}
            size={21}
            color="white"
          />
        </div>

        <div className={currectTool === "circle" ? "bg-gray-600 p-1 rounded" : ""}>
          <Circle
            onClick={() => {
              setSelectedTool("circle");
            }}
            size={18}
            color="white"
          />
        </div>
        <div className={currectTool === "pencil" ? "bg-gray-600 p-1 rounded" : ""}>
          <Pencil
            onClick={() => {
              setSelectedTool("pencil");
            }}
            size={18}
            color="white"
          />
        </div>
      </div>
    </div>
  );
}
