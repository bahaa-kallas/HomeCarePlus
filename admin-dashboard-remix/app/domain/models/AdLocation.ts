import { z } from "zod";
import LocalizedStringSchema from "@/domain/models/LocalizedString";

const AdLocationSchema = z.object({
  name: LocalizedStringSchema,
    type: z.enum(["carousel", "banner"]),
    uniqueIdentifier: z.string(),    
})

type AdLocation = z.infer<typeof AdLocationSchema>;

export default AdLocationSchema
export type { AdLocation }