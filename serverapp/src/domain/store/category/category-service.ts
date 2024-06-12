import { Collection, MongoClient } from "mongodb";
import {
  Category,
  CategoryCreateParams,
  CategoryCreateParamsSchema,
  CategoryUpdateParams,
  CategoryUpdateParamsSchema,
} from "./categrory-model.js";
import { randomUUID } from "node:crypto";

class CategoryService {
  private collection: Collection<Category>;

  constructor(private db: MongoClient) {
    this.collection = db.db().collection<Category>("categories");
  }

  async getAll(): Promise<Category[]> {
    try {
      return await this.collection.find().toArray();
    } catch (error) {
      console.error("Error fetching categories:", error);
      throw error;
    }
  }

  async create(categoryData: CategoryCreateParams): Promise<Category> {
    try {
      const validatedData = CategoryCreateParamsSchema.parse({
        ...categoryData,
        id: randomUUID(),
      });
      const result = await this.collection.insertOne(validatedData);
      return validatedData;
    } catch (error) {
      console.error("Error creating category:", error);
      throw error;
    }
  }

  async update(categoryId: string, categoryData: CategoryUpdateParams): Promise<Category> {
    try {
      const validatedData = CategoryUpdateParamsSchema.parse(categoryData);
      const result = await this.collection.updateOne(
        { id: categoryId },
        { $set: validatedData },
      );
      if (result.modifiedCount === 0) {
        throw new Error("Category not found");
      }
      return { id: categoryId, ...validatedData };
    } catch (error) {
      console.error("Error updating category:", error);
      throw error;
    }
  }

  async delete(categoryId: string): Promise<void> {
    try {
      const result = await this.collection.deleteOne({ id: categoryId });
      if (result.deletedCount === 0) {
        throw new Error("Category not found");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }

  async get(categoryId: string): Promise<Category> {
    try {
      return await this.collection.findOne({ id: categoryId });
    } catch (error) {
      console.error("Error fetching category:", error);
      throw error;
    }
  }

  async clearAll(): Promise<void> {
    try {
      const result = await this.collection.deleteMany({});
      if (result.deletedCount === 0) {
        throw new Error("Category not found");
      }
    } catch (error) {
      console.error("Error deleting category:", error);
      throw error;
    }
  }
}

export default CategoryService;