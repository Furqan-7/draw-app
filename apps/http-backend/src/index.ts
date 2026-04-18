import express, { response } from "express";
import type { Request, Response, NextFunction } from "express";
import * as z from "zod";
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "@repo/backend-common/config";
import { MiddleWhere } from "./MiddleWhere.js";
import { SigninSchema, SignupSchema, RoomSchema } from "@repo/common/types";
import { prisma } from "@repo/db/client";
import { error } from "node:console";
import cors from "cors";

console.log("Starting server...");

const app = express();

app.use(express.json());

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  }),
);

app.post("/signup", async (req, res) => {
  const Response = SignupSchema.safeParse(req.body);

  console.log("Reached Signup");

  if (!Response.success) {
    return res.status(403).json({
      message: "Invalid Format",
    });
  }

  const email = req.body.email;
  const password = req.body.password;
  const name = req.body.name;
  const photo = req.body.photo;

  try {
    // Add the user to the data base
    // * Add the Hash Password in The db

    const user = await prisma.user.create({
      data: {
        email: email,
        password: password,
        name: name,
      },
    });

    if (user) {
      const User_id = user.id;
      const token = jwt.sign({ userId: User_id.toString() }, JWT_TOKEN, {
        expiresIn: "24h",
      });
      return res.status(200).json({
        message: "User Signup successfully",
        valid: true,
        token: token,
      });
    } else {
      return res.status(400).json({
        message: "User Already Exists",
        valid: false,
      });
    }
  } catch (e) {
    return res.status(500).json({
      message: "Internal server issue",
      error: e,
      valid: false,
    });
  }
});

app.post("/signin", async (req, res) => {
  const Response = SigninSchema.safeParse(req.body);

  if (!Response.success) {
    return res.status(402).json({
      message: "Invalid Format",
      error: Response.error,
    });
  }

  const email = req.body.email;
  const password = req.body.password;

  try {
    //    Check In the Data base if is user is Valid or not

    const user = await prisma.user.findFirst({
      where: {
        email: email,
        password: password,
      },
    });

    if (user) {
      const User_id = user.id;
      const token = jwt.sign({ userId: User_id.toString() }, JWT_TOKEN, {
        expiresIn: "24h",
      });

      //@ts-ignore
      return res.status(200).json({
        token: token,
        message: "Sign up Sucessfully ",
        valid: true,
      });
    } else {
      res.status(200).json({
        message: "Invalid Credentials",
        valid: false,
      });
    }
  } catch (e) {
    res.status(500).json({
      message: "Internal Server issue",
      error: e,
    });
  }
});

app.post("/room", MiddleWhere, async (req, res) => {
  console.log("Reached /room ");

  const Response = RoomSchema.safeParse({
    slug: req.body.slug,
    adminId: res.locals.userId,
  });

  if (!Response.success) {
    return res.status(400).json({
      message: "Invalid Format",
      error: Response.error,
      valid: false,
    });
  }

  const slug = req.body.slug;
  const userId = res.locals.userId;

  // First Check If the Room with the same slug already exists or not

  const existingRoom = await prisma.room.findFirst({
    where:{
      slug: slug,
      adminId: userId,
    }
  })

  if(existingRoom){
    return res.status(400).json({
      message: "Room with the same slug already exists",
      valid: false,
      Exits:true,
      roomId: existingRoom.id,
    });
  }

  console.log("Creating Room with slug: " + slug + " and adminId: " + userId);

  try {
    const room = await prisma.room.create({
      data: {
        slug: slug,
        adminId: userId,
      },
    });

    return res.status(200).json({
      message: "Successfully Joined Room",
      roomId: room.id,
      valid: true,
    });
  } catch (e) {
    return res.status(400).json({
      messgae: "Falied to create room",
      error: e,
      valid: false,
    });
  }
});

app.get("/chats/:slug", MiddleWhere, async (req, res) => {
  const slug = Number(req.params.slug);
  
  console.log("Reached chats ");
  console.log("Reached Chats And This is Id " + slug);
  if (!slug) {
    return res.status(403).json({
      message: "invalid",
    });
  }

  try {
    const messages = await prisma.chat.findMany({
      where: {
        roomId: slug,
      },
      orderBy: {
        message: "desc",
      },
      take: 100,
    });

    return res.status(200).json({
      message: messages,
      status: "success",
    });
  } catch (e) {
    return res.status(404).json({
      message: "Failed to fetch the messages",
      error: e,
    });
  }
});

// app.get("/room/:slug", async (req, res) => {
//   const slug = Number(req.params.slug);
//   if (!slug) {
//     return res.status(403).json({
//       message: "invalid",
//     });
//   }

//   try {
//     const room = await prisma.room.findFirst({
//       where: {
//         slug: slug,
//       },
//     });

//     return res.status(200).json({
//       room: room,
//       status: "success",
//     });
//   } catch (e) {
//     return res.status(404).json({
//       message: "Failed to fetch the messages",
//       error: e,
//     });
//   }
// });

// Error handlers
process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  // Do NOT exit — keep the server alive
});

const PORT = process.env.PORT || 3002;

const server = app.listen(PORT, () => {
  console.log(`http-server is Running on ${PORT}`);
});

server.on("error", (error) => {
  console.error("Server error:", error);
});

console.log("Server setup complete");
