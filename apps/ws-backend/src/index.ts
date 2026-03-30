import { WebSocketServer } from "ws";
// import { JWT_TOKEN } from "./config";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_TOKEN } from "@repo/backend-common/config";

const ws = new WebSocketServer({ port: 8080 });

ws.on("connection", function connection(ws, Request) {
  const url = Request.url;

  if (!url) {
    return;
  }

  const querryParams = new URLSearchParams(url.split("?")[1]);

  const token = querryParams.get("token") || "";

  const decoded = jwt.verify(token, JWT_TOKEN);

  if (!decoded || !(decoded as JwtPayload).userId) {
    ws.close();
    return;
  }

  ws.on("message", function mnessage(data) {
    ws.send("Someting ");
  });
});
