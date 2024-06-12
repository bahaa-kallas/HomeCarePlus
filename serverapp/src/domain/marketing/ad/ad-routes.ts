import { Request, Response } from "express";
import { mongoClient } from "../../../config/database.js";
import AdService from "./ad-service.js";

const adService = new AdService(mongoClient);

export const getAllAds = async (req: Request, res: Response) => {
  try {
    const ads = await adService.getAll();
    res.json(ads);
  } catch (error) {
    console.error("Error getting all ads:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const getAd = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const ad = await adService.get(id);
    if (!ad) {
      res.status(404).json({ error: "Ad not found" });
    } else {
      res.json(ad);
    }
  } catch (error) {
    console.error("Error getting ad:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const createAd = async (req: Request, res: Response) => {
  try {
    const newAd = await adService.create(req.body);
    res.status(201).json(newAd);
  } catch (error) {
    console.error("Error creating ad:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const updateAd = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedAd = await adService.update(id, req.body);
    res.json(updatedAd);
  } catch (error) {
    console.error("Error updating ad:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export const deleteAd = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await adService.delete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting ad:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  getAllAds,
  getAd,
  createAd,
  updateAd,
  deleteAd,
};
