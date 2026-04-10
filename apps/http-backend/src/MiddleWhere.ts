import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { JWT_TOKEN } from "@repo/backend-common/config";
export function MiddleWhere(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.token;
  console.log("Reached Middle where");
  console.log("ANd This is Token "+token);

  //   Reject The Token if it has sent as token
  if (!token || Array.isArray(token)) {
    return res.status(403).json({
      message: "Token is expired ",
    });
  }

  try {
    const decoded = jwt.verify(token, JWT_TOKEN);
    console.log(JWT_TOKEN);

    if (typeof decoded === "string") {
      return res.status(400).json({
        message: "Invalid Format",
      });
    }

    if (!decoded.userId) {
      return res.status(404).json({
        message: "Invalid Token payload",
      });
    }

    console.log("Middle Where decoded id " + decoded.userId);
    res.locals.userId = decoded.userId;
    next();
  } catch (e) {
    return res.status(403).json({
      message: "Invalid or expired token",
    });
  }
}
