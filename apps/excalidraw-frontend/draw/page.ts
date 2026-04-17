import axios from "axios";

type Shape =
  | {
      type: "rect";
      x: number;
      y: number;
      width: number;
      height: number;
    }
  | {
      type: "circle";
      x: number;
      y: number;
      radius: number;
    };

export default async function DrawPageRect(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket,
  token: string,
) {
  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  console.log("Getting existing shapes for room: " + roomId);

  let ExsistingShpae: Shape[] = await getExistingShapes(roomId, token);
  redraw(context, ExsistingShpae);

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "chat") {
      ExsistingShpae.push(message.message);
      redraw(context, ExsistingShpae);
    }
  };

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
    const width = e.clientX - startX;
    const height = e.clientY - startY;
    ExsistingShpae.push({
      type: "rect",
      x: startX,
      y: startY,
      width,
      height,
    });

    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          type: "rect",
          x: startX,
          y: startY,
          width,
          height,
        }),
        roomId: roomId,
      }),
    );
    
  });
  canvas.addEventListener("mousemove", (e) => {
    if (Drawing) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      console.log("Drawing shape at: ", { x: startX, y: startY, width, height });
      redraw(context, ExsistingShpae);
      context.strokeStyle = "white";
      context.strokeRect(startX, startY, width, height);
    }
  });
}

function redraw(context: CanvasRenderingContext2D, shapes: Shape[]) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  shapes.forEach((shape) => {
    if (shape.type === "rect") {
      context.strokeStyle = "white";
      context.strokeRect(shape.x, shape.y, shape.width, shape.height);
    }
  });
}

async function getExistingShapes(roomId: string, token: string) {
  console.log("RoomId "+ roomId);
  const response = await axios.get(`http://localhost:3002/chats/${roomId}`, {
    headers: {
      token: token
    },
  });

  console.log("Existing shapes response: ", response.data);

  if(response.data.message.length === 0){
    console.log("No existing shapes found for room: " + roomId);
    return [];
  }

  const Shapes: Shape[] = response.data.message.map((msg: any) => {
    try{
      const shape = JSON.parse(msg.message);
      console.log("Parsed shape: ", shape);
      return shape;
    }catch(e){
      console.error("Failed to parse shape from message: ", msg.message, "Error: ", e);
      return [];
    }
  },);
  console.log("Existing shapes for room " + roomId + ": ", Shapes);
  return Shapes;
}
