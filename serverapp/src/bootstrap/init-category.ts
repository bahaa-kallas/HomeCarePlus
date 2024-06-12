import { randomUUID } from "node:crypto";
import CategoryService from "../domain/store/category/category-service.js";
import { mongoClient } from "../config/database.js";
import { Category, CategoryCreateParams } from "../domain/store/category/categrory-model.js";


const categoryService = new CategoryService(mongoClient);
export default async function createCategories(): Promise<Category[]> {
  await categoryService.clearAll();

  const categories: CategoryCreateParams[] = [
    {
      id: randomUUID(),
      name: { en: "Plumbing", ar: "السباكة" },
    },
    {
      id: randomUUID(),
      name: { en: "Electrician", ar: "كهربائي" },
    },
    {
      id: randomUUID(),
      name: { en: "Cleaning", ar: "تنظيف" },
    },
  ];

  for (const category of categories) {
    await categoryService.create(category);
  }

  return categoryService.getAll();
}