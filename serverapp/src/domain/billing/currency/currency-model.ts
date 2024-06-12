import { z } from "zod";
import { ObjectId } from "mongodb";
import LocalizedStringSchema from "../../shared/LocalizedString.js";

const CurrencySchema = z.object({
  _id: z.instanceof(ObjectId),
  id: z.string().uuid(),
  name: LocalizedStringSchema,
  code: z.string(),
  basicUnit: LocalizedStringSchema,
  enabled: z.boolean(),
});


const CurrencyCreateParamsSchema = CurrencySchema.omit({ _id: true });
const CurrencyUpdateParamsSchema = CurrencySchema.partial().omit({ _id: true });

type CurrencyCreateParams = z.infer<typeof CurrencyCreateParamsSchema>
type CurrencyUpdateParams = z.infer<typeof CurrencyUpdateParamsSchema>
type Currency = z.infer<typeof CurrencySchema>
export default CurrencySchema;
export {
  CurrencyCreateParamsSchema,
  CurrencyUpdateParamsSchema,
};

export type {
  CurrencyCreateParams,
  CurrencyUpdateParams,
  Currency,
};