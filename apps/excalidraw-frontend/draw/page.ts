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
      centerX: number;
      centerY: number;
      radius: number;
    };

let ExsistingShpae: Shape[] = [];

export default async function DrawPage(
  canvas: HTMLCanvasElement,
  roomId: string,
  socket: WebSocket,
  token: string,
  currentTool: "rect" | "circle" | "pencil",
) {
  const context = canvas.getContext("2d");
  if (!context) {
    return;
  }

  console.log("Getting existing shapes for room: " + roomId);

  ExsistingShpae = await getExistingShapes(roomId, token);
  redraw(context, ExsistingShpae);

  alert("Current tool: " + currentTool);

  socket.onmessage = (event) => {
    const message = JSON.parse(event.data);
    if (message.type === "chat") {
      const shape = JSON.parse(message.message); // Parse the JSON string
      ExsistingShpae.push(shape);
      redraw(context, ExsistingShpae);
    }
  };

  if (currentTool == "rect") {
    DrawRect({ canvas, roomId, socket, context });
  } else if (currentTool == "circle") {
    // Call the function to draw circles
    DrawCircle({ context, canvas, roomId, socket });
  } else {
    return;
  }
}
// DrawRect
function DrawRect({
  canvas,
  roomId,
  socket,
  context,
}: {
  canvas: HTMLCanvasElement;
  roomId: string;
  socket: WebSocket;
  context: CanvasRenderingContext2D;
}) {
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
      console.log("Drawing shape at: ", {
        x: startX,
        y: startY,
        width,
        height,
      });
      redraw(context, ExsistingShpae);
      context.strokeStyle = "white";
      context.strokeRect(startX, startY, width, height);
    }
  });
}



//Draw Circle

function DrawCircle({
  context,
  canvas,
  roomId,
  socket,
}: {
  canvas: HTMLCanvasElement;
  roomId: string;
  socket: WebSocket;
  context: CanvasRenderingContext2D;
}) {
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
      type: "circle",
      centerX: startX,
      centerY: startY,
      radius: Math.max(height, width) / 2,
    });

    socket.send(
      JSON.stringify({
        type: "chat",
        message: JSON.stringify({
          type: "circle",
          centerX: startX,
          centerY: startY,
          radius: Math.max(height, width) / 2,
        }),
        roomId: roomId,
      }),
    );
  });

  canvas.addEventListener("mousemove", (e) => {
    if (Drawing) {
      const width = e.clientX - startX;
      const height = e.clientY - startY;
      const centerX = startX + width / 2;
      const centerY = startY + height / 2;
      const radius = Math.max(height, width) / 2;

      context.beginPath();
      context.strokeStyle = "white";
      context.arc(centerX, centerY, radius, 0, 2 * Math.PI);
      context.stroke();
      context.closePath();
    }
  });
}


// Function For the Redraw
function redraw(context: CanvasRenderingContext2D, shapes: Shape[]) {
  context.clearRect(0, 0, context.canvas.width, context.canvas.height);

  shapes.forEach((shape) => {
    if (shape.type === "rect") {
      context.strokeStyle = "white";
      context.strokeRect(shape.x, shape.y, shape.width, shape.height);
    } else if (shape.type === "circle") {
      context.beginPath();
      context.strokeStyle = "white";
      context.arc(shape.centerX, shape.centerY, shape.radius, 0, 2 * Math.PI);
      context.stroke();
      context.closePath();
    }
  });
}

// Function to Get the Exsisting Shapes from the DB
async function getExistingShapes(roomId: string, token: string) {
  console.log("RoomId " + roomId);
  const response = await axios.get(`http://localhost:3002/chats/${roomId}`, {
    headers: {
      token: token,
    },
  });

  console.log("Existing shapes response: ", response.data);

  if (response.data.message.length === 0) {
    console.log("No existing shapes found for room: " + roomId);
    return [];
  }

  const Shapes: Shape[] = response.data.message.map((msg: any) => {
    try {
      const shape = JSON.parse(msg.message);
      console.log("Parsed shape: ", shape);
      return shape;
    } catch (e) {
      console.error(
        "Failed to parse shape from message: ",
        msg.message,
        "Error: ",
        e,
      );
      return [];
    }
  });
  console.log("Existing shapes for room " + roomId + ": ", Shapes);
  return Shapes;
}
