import { z } from "zod";
import { ObjectId } from "mongodb";
import LocalizedStringSchema from "../../shared/LocalizedString.js";

const AdTypeSchema = z.enum(["banner_image", "banner_text", "full_screen_image"]);
const AdStateSchema = z.enum(["active", "inactive"]);

const AdSchema = z.object({
  _id: z.instanceof(ObjectId),
  id: z.string().uuid(),
  name: LocalizedStringSchema,
  type: AdTypeSchema,
  imageUrl: z.string(),
  duration: z.object({
    start: z.date(),
    end: z.date(),
  }),
  state: AdStateSchema,
  associatedService: z.string().uuid().nullable(),
});

const AdCreateParamsSchema = AdSchema.omit({
  _id: true,
});
const AdUpdateParamsSchema = AdSchema.partial().omit({
  _id: true,
});

type Ad = z.infer<typeof AdSchema>
type AdCreateParams = z.infer<typeof AdCreateParamsSchema>
type AdUpdateParams = z.infer<typeof AdUpdateParamsSchema>

export default AdSchema;

export {
  AdTypeSchema,
  AdStateSchema,
  AdCreateParamsSchema,
  AdUpdateParamsSchema,
};

export type {
  Ad,
  AdCreateParams,
  AdUpdateParams,
};