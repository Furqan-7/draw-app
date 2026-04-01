import express, { response } from "express";
import type { Request, Response, NextFunction } from "express";
import * as z from "zod";
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "@repo/backend-common/config";
import { MiddleWhere } from "./MiddleWhere.js";
import { SigninSchema, SignupSchema ,RoomSchema} from "@repo/common/types";
import { prisma } from "@repo/db/client";


const app = express();


app.use(express.json());

app.post("/signup", async (req, res) => {
  const Response = SignupSchema.safeParse(req.body);

  if (!Response.success) {
    res.status(403).json({
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
        photo: photo
      }
    });

    if (user.success) {
      res.status(200).json({
        message: "User Signup successfully",
      });
    }
    else {
      res.status(400).json({
        message: "User Already Exists"
      })
    }
  } catch (e) {
    res.status(500).json({
      message: "Internal server issue",
      error: e,
    });
  }
});

app.post("/signin", async (req, res) => {
  const Response = SigninSchema.safeParse(req.body);

  if (!Response.success) {
    res.status(402).json({
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
        password: password
      }
    });

    if (user.success) {
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
    }
    else {
      res.status(200).json({
        message: "Invalid Credentials",
        valid: false
      })
    }

  } catch (e) {
    res.status(500).json({
      message: "Internal Server issue",
      error: e,
    });
  }
});



app.post("/chat-room", MiddleWhere, async (req, res) => {

  const Response = RoomSchema.safeParse(req.body);

  if(!Response.success){
      return res.status(400).json({
        message:"Invalid Format",
        error:Response.error
      });
  }

  const slug = req.body.slug;
  const adminId = req.body.adminId;


  return res.status(200).json({
    message: "Successfully Joined Room"
  })
});

app.listen(3001, () => {
  console.log("http-server is Running on 3001");
});
