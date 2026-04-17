import RoomCanvas from "@/components/RoomCanvas";

export default async function CanvasPage({
  params,
}: {
  params: Promise<{ roomid: string }>;
}) {
  const values = await params;
  console.log("CanvasPage received params: ", values);
  const roomId = values.roomid;
  console.log("CanvasPage loaded with roomId: " + roomId);
    
  return <RoomCanvas roomId={roomId} />;
}
