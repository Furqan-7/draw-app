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

  export default async function DrawPageRect(canvas: HTMLCanvasElement,roomId:string,socket: WebSocket) {
  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  let ExsistingShpae: Shape[] = await getExistingShapes(roomId);

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
  });
  canvas.addEventListener("mousemove", (e) => {
    if (Drawing) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
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

async function getExistingShapes(roomId: string) {
  const response = await axios.get(`http://localhost:3000/chats/${roomId}`);

   const Shapes =  response.data.messages.map((x:{message:string}) => {
     JSON.parse(x.message);
  });

  return Shapes;
}
