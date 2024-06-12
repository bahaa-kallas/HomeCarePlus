import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import { SessionUser } from "../users/user-model.js";

export default function JwtMiddleware(req: Request, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(" ")[1];
  if (token) {
    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
      if (err) {
        console.error("JWT verification failed:", err);
        return res.status(403).json({ message: "Unauthorized" });
      }
      req.sessionUser = decoded as SessionUser;
      next();
    });
  } else {
    console.error("No token provided");
    res.status(401).json({ message: "Unauthorized" });
  }
}