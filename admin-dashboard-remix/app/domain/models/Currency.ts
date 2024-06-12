import { z } from "zod";
import LocalizedStringSchema from "@/domain/models/LocalizedString";

const CurrencySchema = z.object({
  id: z.string().uuid(),
  name: LocalizedStringSchema,
  code: z.string(),
  basicUnit: LocalizedStringSchema,
  enabled: z.boolean(),
});

type Currency = z.infer<typeof CurrencySchema>
export default CurrencySchema;

export type {
  Currency,
};
