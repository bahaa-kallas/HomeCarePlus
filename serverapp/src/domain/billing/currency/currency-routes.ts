import { Request, Response } from "express";
import { mongoClient } from "../../../config/database.js";
import CurrencyService from "./currency-service.js";

const currencyService = new CurrencyService(mongoClient);

const getAllCurrencies = async (req: Request, res: Response) => {
  try {
    const currencies = await currencyService.getAll();
    res.json(currencies);
  } catch (error) {
    console.error("Error getting all currencies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const createCurrency = async (req: Request, res: Response) => {
  try {
    const newCurrency = await currencyService.create(req.body);
    res.status(201).json(newCurrency);
  } catch (error) {
    console.error("Error creating currency:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCurrency = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedCurrency = await currencyService.update(id, req.body);
    res.json(updatedCurrency);
  } catch (error) {
    console.error("Error updating currency:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCurrency = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await currencyService.delete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting currency:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCurrency = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const currencies = await currencyService.getById(id);
    res.json(currencies);
  } catch (error) {
    console.error("Error getting all currencies:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  getAllCurrencies,
  createCurrency,
  updateCurrency,
  deleteCurrency,
  getCurrency,
};
