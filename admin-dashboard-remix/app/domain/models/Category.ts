import { z } from "zod";
import LocalizedStringSchema from "@/domain/models/LocalizedString";

const CategorySchema = z.object({
  id: z.string().uuid(),
  name: LocalizedStringSchema,
});
type Category = z.infer<typeof CategorySchema>

export default CategorySchema;
export type {
  Category,
};