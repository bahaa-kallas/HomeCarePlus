import { NextFunction, Request, Response } from "express";
import AuthenticationService from "./authentication-service.js";
import UserService from "../users/user-service.js";
import { mongoClient } from "../../config/database.js";
import EmailSendingService from "../email/email-service.js";
import mailgunClient from "../../config/mailgun.js";
import { z } from "zod";
import { SessionUser, UserTypeSchema } from "../users/user-model.js";
import jwt from "jsonwebtoken";

const userService = new UserService(mongoClient);
const emailService = new EmailSendingService(mailgunClient);
const authService = new AuthenticationService(userService, emailService);

async function login(req: Request, res: Response, next: NextFunction) {
  const { email, password } = req.body;
  try {
    const token = await authService.login(email, password);
    if (!token) {
      res.status(401).json({ message: "Invalid email or password" });
      return;
    }
    console.log("Genereated token: ", token);
    res.json({ accessToken: token });
  } catch (error) {
    next(error);
  }
}

async function signup(req: Request, res: Response, next: NextFunction) {
  const schema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string(),
    type: UserTypeSchema,
  });
  const { name, email, password, type } = schema.parse(req.body);
  try {
    await authService.signup(name, email, password, type);
    res.status(201).json({ message: "User signed up successfully" });
  } catch (error) {
    next(error);
  }
}

async function verifyEmail(req: Request, res: Response, next: NextFunction) {
  const { verificationToken } = req.params;
  console.log(verificationToken);
  try {
    await authService.verifyEmail(verificationToken);
    res.json({ message: "Email verified successfully" });
  } catch (error) {
    res.status(401).json({ message: error });
  }
}

async function getCurrentUser(req: Request, res: Response, next: NextFunction) {
  const { accessToken } = req.params;
  try {
    const decoded: SessionUser = jwt.decode(accessToken, { complete: true, json: true }).payload as SessionUser;
    res.json(decoded);
  } catch (error) {
    res.status(401).json({ message: error });
  }
}


export default {
  login,
  signup,
  verifyEmail,
  getCurrentUser,
};
