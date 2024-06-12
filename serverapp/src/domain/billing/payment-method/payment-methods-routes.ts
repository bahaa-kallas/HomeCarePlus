import { Request, Response } from "express";
import { mongoClient } from "../../../config/database.js";
import PaymentMethodService from "./payment-method-service.js";

const paymentMethodService = new PaymentMethodService(mongoClient);
const getAllPaymentMethods = async (req: Request, res: Response) => {
  try {
    const paymentMethods = await paymentMethodService.getAll();
    res.json(paymentMethods);
  } catch (error) {
    console.error("Error getting all payment methods:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createPaymentMethod = async (req: Request, res: Response) => {
  try {
    const newPaymentMethod = await paymentMethodService.create(req.body);
    res.status(201).json(newPaymentMethod);
  } catch (error) {
    console.error("Error creating payment method:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updatePaymentMethod = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedPaymentMethod = await paymentMethodService.update(id, req.body);
    res.json(updatedPaymentMethod);
  } catch (error) {
    console.error("Error updating payment method:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deletePaymentMethod = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await paymentMethodService.delete(id);
    res.status(204).json({ message: "Payment method deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment method:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getPaymentMethod = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const paymentMethod = await paymentMethodService.get(id);
    if (!paymentMethod) {
      res.status(404).json({ error: "Payment method not found" });
    }
    res.json(paymentMethod);
  } catch (error) {
    console.error("Error getting payment method:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export default {
  getAllPaymentMethods,
  createPaymentMethod,
  updatePaymentMethod,
  getPaymentMethod,
  deletePaymentMethod,
};