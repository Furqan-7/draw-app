import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "@repo/backend-common/config";
export function MiddleWhere(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.token;

  //   Reject The Token if it has sent as token
  if (!token || Array.isArray(token)) {
    return res.status(403).json({
      message: "Token is expired ",
    });
  }

  const decoded = jwt.verify(token, JWT_TOKEN);
  console.log(JWT_TOKEN);

  try {
    if (typeof decoded === "string") {
      return res.status(400).json({
        message: "Invalid Format",
      });
    }

    if (!decoded.userId) {
      res.status(404).json({
        message: "Invalid Token playload",
      });
    }

    res.locals.userId = decoded.userId;
   next();
  } catch (e) {
    res.status(500).json({
      message: "Internal Server issue",
    });
  }
}
