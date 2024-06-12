import { z } from "zod";
import ServicePriceSchema from "@/domain/models/ServicePrice";
import { AddressSchema } from "@/domain/models/User";

const OrderStateSchema = z.enum(["placed", "scheduled", "delivered", "cancelled"]);
const ServicePropertyAnswerSchema = z.object({
  servicePropertyId: z.string().uuid(),
  userSelection: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("string"),
      selection: z.string(),
    }),
    z.object({
      type: z.literal("number"),
      selection: z.number(),
    }),
  ]),
});

const OrderSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  serviceId: z.string().uuid(),
  serviceProperties: z.array(ServicePropertyAnswerSchema),
  totalPrice: ServicePriceSchema,
  paymentMethodId: z.string().uuid(),
  deliveryAddress: AddressSchema,
  createdAt: z.date(),
  deliveryDate: z.date().nullable(),
  state: OrderStateSchema,
  trackingNumber: z.string().nullable(),
  cancelledAt: z.date().optional().nullable(),
});


type Order = z.infer<typeof OrderSchema>

export default OrderSchema;

export {
  ServicePropertyAnswerSchema,
  OrderStateSchema,
};
export type {
  Order,
};