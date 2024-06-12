import { Request, Response } from "express";
import AdLocationService from "./ad-location-service.js";
import { mongoClient } from "../../../config/database.js";


const adLocationService = new AdLocationService(mongoClient);
const getAllAdLocations = async (req: Request, res: Response) => {
  try {
    const adLocations = await adLocationService.getAll();
    res.json(adLocations);
  } catch (error) {
    console.error("Error getting all ad locations:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createAdLocation = async (req: Request, res: Response) => {
  try {
    const newAdLocation = await adLocationService.create(req.body);
    res.status(201).json(newAdLocation);
  } catch (error) {
    console.error("Error creating ad location:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateAdLocation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedAdLocation = await adLocationService.update(id, req.body);
    res.json(updatedAdLocation);
  } catch (error) {
    console.error("Error updating ad location:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteAdLocation = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await adLocationService.delete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting ad location:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};


export default {
  getAllAdLocations,
  deleteAdLocation,
  createAdLocation,
  updateAdLocation,
};