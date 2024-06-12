import { z } from "zod";
import LocalizedStringSchema from "./LocalizedString";

const PaymentMethodSchema = z.object({
    id: z.string().uuid(),
    name: LocalizedStringSchema,
    description: LocalizedStringSchema,
    icon: z.string().optional(),
  enabled: z.boolean(),
    additionalInformation: LocalizedStringSchema.optional(),
});

type PaymentMethod = z.infer<typeof PaymentMethodSchema>

export default PaymentMethodSchema

export type {
    PaymentMethod,
};