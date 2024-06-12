import { NextFunction, Request, Response } from "express";
import UserService from "./user-service.js";
import { mongoClient } from "../../config/database.js";

const userService = new UserService(mongoClient);

function errorHandler(err: any, req: Request, res: Response, next: NextFunction) {
  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
}

async function createUser(req: Request, res: Response, next: NextFunction) {
  try {
    const newUser = await userService.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

async function updateUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const updatedUser = await userService.update(id, req.body);
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(updatedUser);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

async function getUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const user = await userService.get(id);
    if (!user) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json(user);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

async function getAllUsers(req: Request, res: Response, next: NextFunction) {
  try {
    const users = await userService.getAll();
    res.json(users);
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}

async function deleteUser(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  try {
    const deleted = await userService.delete(id);
    if (!deleted) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    res.json({ message: "User deleted successfully" });
  } catch (error) {
    errorHandler(error, req, res, next);
  }
}


export default {
  createUser,
  updateUser,
  getUser,
  getAllUsers,
  deleteUser,
};