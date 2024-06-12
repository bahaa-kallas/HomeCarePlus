import { z } from "zod";
import { ObjectId } from "mongodb";
import LocalizedStringSchema from "../../shared/LocalizedString.js";

const PaymentMethodSchema = z.object({
  _id: z.instanceof(ObjectId),
  id: z.string().uuid(),
  name: LocalizedStringSchema,
  description: LocalizedStringSchema,
  icon: z.string().optional(),
  enabled: z.boolean(),
  additionalInformation: LocalizedStringSchema.optional(),
});


const PaymentMethodCreateParamsSchema = PaymentMethodSchema.omit({ _id: true });
const PaymentMethodUpdateParamsSchema = PaymentMethodSchema.partial().omit({ _id: true, id: true });

type PaymentMethodCreateParams = z.infer<typeof PaymentMethodCreateParamsSchema>
type PaymentMethodUpdateParams = z.infer<typeof PaymentMethodUpdateParamsSchema>
type PaymentMethod = z.infer<typeof PaymentMethodSchema>
export default PaymentMethodSchema;

export {
  PaymentMethodUpdateParamsSchema,
  PaymentMethodCreateParamsSchema,
};

export type {
  PaymentMethodCreateParams,
  PaymentMethodUpdateParams,
  PaymentMethod,
};