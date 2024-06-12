import { z } from "zod";

const ServicePriceSchema = z.object({
  currencyId: z.string().uuid(),
  amount: z.coerce.number(),
});

type ServicePrice = z.infer<typeof ServicePriceSchema>

export default ServicePriceSchema;
export type {
  ServicePrice,
};