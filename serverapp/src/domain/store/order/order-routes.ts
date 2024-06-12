import { Request, Response } from "express";
import { mongoClient } from "../../../config/database.js";
import OrderService from "./order-service.js";

const service = new OrderService(mongoClient);
const getAllOrders = async (req: Request, res: Response): Promise<void> => {
  try {
    const orders = await service.getAll();
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
  ;
};
const createOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const order = await service.create(req.body);
    res.status(201).json(order);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = req.params.id;
    const order = await service.update(orderId, req.body);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteOrder = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = req.params.id;
    const result = await service.delete(orderId);
    if (!result) {
      res.status(404).json({ message: "Order not found" });
    } else {
      res.status(204).send();
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOrderById = async (req: Request, res: Response): Promise<void> => {
  try {
    const orderId = req.params.id;
    const order = await service.get(orderId);
    if (!order) {
      res.status(404).json({ message: "Order not found" });
    } else {
      res.status(200).json(order);
    }
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

const getOrdersByUser = async (req: Request, res: Response): Promise<void> => {
  const userId = req.params.id as string;

  try {
    const orders = await service.getAllByUserId(userId);
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  getAllOrders,
  createOrder,
  updateOrder,
  deleteOrder,
  getOrderById,
  getOrdersByUser,
};
