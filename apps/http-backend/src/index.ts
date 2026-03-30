import express from "express";
import type { Request, Response, NextFunction } from "express";
import * as z from "zod";
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "@repo/backend-common/config";
import { MiddleWhere } from "./MiddleWhere.js";
import { SigninSchema, SignupSchema } from "@repo/common/types";

const app = express();


app.use(express.json());

app.post("/signup", async (req, res) => {
  const Response = SignupSchema.safeParse(req.body);

  if (!Response.success) {
    res.status(403).json({
      message: "Invalid Format",
    });
  }

  const username = req.body.username;
  const password = req.body.password;

  try {
    // Add the user to the data base
    // * Add the Hash Password in The db

    res.status(200).json({
      message: "User Signup successfully",
    });
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

  const username = req.body.username;
  const password = req.body.password;

  try {
    //    Check In the Data base if is user is Valid or not

    //@ts-ignore
    const token = jwt.sign({ userId: User_id.toString() }, JWT_TOKEN, {
      expiresIn: "24h",
    });

    //@ts-ignore
    return res.status(200).json({
      token: token,
      message: "Sign up Sucessfully ",
      valid: true,
    });
  } catch (e) {
    res.status(500).json({
      message: "Internal Server issue",
      error: e,
    });
  }
});



app.post("/chat-room", MiddleWhere,async (req, res) => {
          
    return res.status(200).json({
         message:"Successfully Joined Room"
    })
});

app.listen(3001, () => {
  console.log("http-server is Running on 3001");
});
