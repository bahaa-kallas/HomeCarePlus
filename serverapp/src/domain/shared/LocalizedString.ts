import { z } from "zod";

const LocalizedStringSchema = z.object({
    en: z.string(),
    ar: z.string(),
  },
);


export type LocalizedString = z.infer<typeof LocalizedStringSchema>

export default LocalizedStringSchema;