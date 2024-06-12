import { Request, Response } from "express";
import ServiceService from "./service-service.js";
import { mongoClient } from "../../../config/database.js";
import OrderService from "../order/order-service.js";
import { addWeeks } from "date-fns";

const serviceService = new ServiceService(mongoClient);
const orderService = new OrderService(mongoClient);

const getAllServices = async (req: Request, res: Response) => {
  try {
    const services = await serviceService.getAll();
    res.json(services);
  } catch (error) {
    console.error("Error getting all services:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createService = async (req: Request, res: Response) => {
  try {
    const newService = await serviceService.create(req.body);
    res.status(201).json(newService);
  } catch (error) {
    console.error("Error creating service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateService = async (req: Request, res: Response) => {
  const { id } = req.params;
  console.log("recieved id ", id);
  try {
    const updatedService = await serviceService.update(id, req.body);
    res.json(updatedService);
  } catch (error) {
    console.error("Error updating service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteService = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await serviceService.delete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getService = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const service = await serviceService.get(id);
    if (!service) {
      res.status(404).json({ error: "Service not found" });
    } else {
      res.json(service);
    }
  } catch (error) {
    console.error("Error getting service:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


const getAvailableTimeSlots = async (req: Request, res: Response) => {
  const { id } = req.params;
  const today = new Date();
  const threeWeeksLater = addWeeks(today, 3);

  try {
    const ordersInThreeWeeksFromNow = await orderService.getAllByServiceIdAndDelieveryDateInBetween(
      id,
      today,
      threeWeeksLater,
    );
    const availableTimeSlots = await serviceService.getAvailableTimeSlots(
      id,
      ordersInThreeWeeksFromNow,
    );
    res.send(availableTimeSlots);
  } catch (e) {
    console.error("Error getting available time slots:", e);
    res.status(500).json({ error: "Internal server error" });
  }
};
export default {
  getAllServices,
  createService,
  updateService,
  deleteService,
  getService,
  getAvailableTimeSlots,
};