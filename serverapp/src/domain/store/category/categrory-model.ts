import { z } from "zod";
import { ObjectId } from "mongodb";
import LocalizedStringSchema from "../../shared/LocalizedString.js";

const CategorySchema = z.object({
  _id: z.instanceof(ObjectId),
  id: z.string().uuid(),
  name: LocalizedStringSchema,
});
const CategoryCreateParamsSchema = CategorySchema.omit({ _id: true });
const CategoryUpdateParamsSchema = CategorySchema.partial().omit({ _id: true });

type Category = z.infer<typeof CategorySchema>
type CategoryCreateParams = z.infer<typeof CategoryCreateParamsSchema>
type CategoryUpdateParams = z.infer<typeof CategoryUpdateParamsSchema>

export default CategorySchema;
export {
  CategoryCreateParamsSchema,
  CategoryUpdateParamsSchema,
};
export type {
  Category,
  CategoryCreateParams,
  CategoryUpdateParams,
};