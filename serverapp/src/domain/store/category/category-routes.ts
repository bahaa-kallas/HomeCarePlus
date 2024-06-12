import { Request, Response } from "express";
import { mongoClient } from "../../../config/database.js";
import CategoryService from "./category-service.js";

const categoryService = new CategoryService(mongoClient);

const getAllCategories = async (req: Request, res: Response) => {
  try {
    const categories = await categoryService.getAll();
    res.json(categories);
  } catch (error) {
    console.error("Error getting all categories:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const getCategory = async (req: Request, res: Response) => {
  try {
    const category = await categoryService.get(req.params.id);
    res.status(200).json(category);
  } catch (error) {
    console.error("Error getting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};
const createCategory = async (req: Request, res: Response) => {
  try {
    const newCategory = await categoryService.create(req.body);
    res.status(201).json(newCategory);
  } catch (error) {
    console.error("Error creating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const updateCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    const updatedCategory = await categoryService.update(id, req.body);
    res.json(updatedCategory);
  } catch (error) {
    console.error("Error updating category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

const deleteCategory = async (req: Request, res: Response) => {
  const { id } = req.params;
  try {
    await categoryService.delete(id);
    res.status(204).end();
  } catch (error) {
    console.error("Error deleting category:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

export default {
  getAllCategories,
  createCategory,
  getCategory,
  updateCategory,
  deleteCategory,
};
