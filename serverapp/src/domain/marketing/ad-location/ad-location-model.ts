import { z } from "zod";
import { ObjectId } from "mongodb";
import LocalizedStringSchema from "../../shared/LocalizedString.js";

const AdLocationSchema = z.object({
  _id: z.instanceof(ObjectId),
  id: z.string().uuid(),
  name: LocalizedStringSchema,
  locationId: z.string(),
});

const AdLocationCreateParamsSchema = AdLocationSchema.omit({ _id: true });
const AdLocationUpdateSchema = AdLocationSchema.partial().omit({ _id: true });

type AdLocationCreateParams = z.infer<typeof AdLocationCreateParamsSchema>
type AdLocationUpdate = z.infer<typeof AdLocationUpdateSchema>
type AdLocation = z.infer<typeof AdLocationSchema>;

export {
  AdLocationSchema,
  AdLocationCreateParamsSchema,
  AdLocationUpdateSchema,
};
export type {
  AdLocationCreateParams,
  AdLocationUpdate,
  AdLocation,
};