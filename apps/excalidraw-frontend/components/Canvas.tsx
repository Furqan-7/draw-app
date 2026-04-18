"use client";
import DrawPageRect from "@/draw/page";
import { useEffect, useRef,useState } from "react";
import { RectangleHorizontal ,Circle, Pencil} from "lucide-react";


export default function Canvas({ roomId,socket,token }: { roomId: string,socket: WebSocket,token: string }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [currectTool, setSelectedTool] = useState<"rect" | "circle" | "pencil">("rect");

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

       <div className="   flex items-center justify-center fixed top-5 left-50 bg-gray-900 shadow-sm p-3 rounded-[10px] cursor-pointer gap-6 pl-6 pr-6">
            <RectangleHorizontal onClick={()=>{
               alert("Selected Rect");
            }}  size={22} color="white" />
            <Circle onClick={()=>{
               alert("Selected Circle");
            }} size={18} color="white" />
            <Pencil onClick={()=>{
               alert("Selected Pencil");
            }} size={18} color="white" />
       </div>
    </div>
  );
}
