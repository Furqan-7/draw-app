import WebSocket, { WebSocketServer } from "ws";
// import { JWT_TOKEN } from "./config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_TOKEN } from "@repo/backend-common/config";
import { prisma } from "@repo/db/client";


const ws = new WebSocketServer({ port: 8080 });

interface UsersType {
  ws: WebSocket
  userId: string
  rooms: string[]
};

const users: UsersType[] = [];

function CHeckToken(token: string): string | null {


  try {
    const decoded = jwt.verify(token, JWT_TOKEN);

    if (typeof decoded == "string") {
      return null;
    }

    if (!decoded.userId) {
      return null;
    }

    return decoded.userId;
  } catch (e) {
    return null;
  }

  return null;

}

ws.on("connection", function connection(ws, Request) {
  const url = Request.url;

  if (!url) {
    return;
  }

  const querryParams = new URLSearchParams(url.split("?")[1]);
  const token = querryParams.get("token") || "";
  const userId = CHeckToken(token);



  if (!userId) {
    console.log("Close ws");
    ws.close();
    return;
  }

  users.push({
    userId,
    rooms: [],
    ws
  });


  ws.on("message", async function mnessage(data) {

    const ParsedData = JSON.parse(data as unknown as string);


    if (ParsedData.type === "join_room") {
      const roomId = ParsedData.roomId;
      const user = users.find((x => x.ws === ws));

      if (!user) {
        return;
      }
      user.rooms.push(roomId);
    }

    if (ParsedData.type === "leave_room") {
      const user = users.find(x => x.ws === ws);

      if (!user) {
        return;
      }

      user.rooms = user.rooms.filter(x => x === ParsedData.roomId);
    }

    if (ParsedData.type === "chat") {
      const roomId = ParsedData.roomId;
      const message = ParsedData.message;


      // DB Call to store the chats 
      try {
        await prisma.chat.create({
          data: {
            roomId: Number(roomId),
            message: message,
            userId: userId
          }
        });
      } catch (e) {
        console.error("Failed to save chat to DB:", e);
      }

      users.forEach(user => {
        if (user.rooms.includes(roomId)) {
          user.ws.send(JSON.stringify({
            type: "chat",
            message: message,
            roomId
          }))
        }
      })
    }

  });
});
