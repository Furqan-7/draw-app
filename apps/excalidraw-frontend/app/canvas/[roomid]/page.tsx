import Canvas from "@/components/Canvas";

export default async function CanvasPage(params: { roomid: string }) {
  const roomId = (await params).roomid;

  return <Canvas roomId={roomId} />;
}
