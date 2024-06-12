import { Category } from "@/domain/models/Category";
import { randomUUID } from "node:crypto";

export default function getMockedCategories(): Category[] {
  return [
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
}
