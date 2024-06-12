import { z } from "zod";
import LocalizedStringSchema from "@/domain/models/LocalizedString";
import ServicePriceSchema from "@/domain/models/ServicePrice";

const ServiceStateSchema = z.enum(["public", "private"]);
const ServicePropertySchema = z.union([
  z.object({
    id: z.string().uuid(),
    type: z.literal("text"),
    name: LocalizedStringSchema,
    options: z.array(LocalizedStringSchema),
  }),
  z.object({
    id: z.string().uuid(),
    type: z.literal("number"),
    name: LocalizedStringSchema,
    options: z.array(z.number()),
  }),
]);


const ServiceSchema = z.object({
  id: z.string().uuid(),
  name: LocalizedStringSchema,
  description: LocalizedStringSchema,
  tos: LocalizedStringSchema.optional(),
  image: z.string(),
  state: ServiceStateSchema,
  price: z.array(ServicePriceSchema),
  categoryId: z.string().uuid(),
  properties: z.array(ServicePropertySchema),
  createdAt: z.date(),
  updatedAt: z.date(),
  supportedPaymentMethods: z.array(z.string().uuid()),
});

type Service = z.infer<typeof ServiceSchema>

export default ServiceSchema;

export {
  ServicePropertySchema,
  ServiceStateSchema,
};

export type {
  Service,
};