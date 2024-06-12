import { z } from "zod";
import { ServicePriceSchema } from "../service/service-model.js";
import { ObjectId } from "mongodb";
import { AddressSchema } from "../../users/user-model.js";
import timeSlotPattern from "../../shared/TimeSlotPattern.js";
import LocalizedStringSchema from "../../shared/LocalizedString.js";

const OrderStateSchema = z.enum(["placed", "scheduled", "delivered", "cancelled"]);

const ServicePropertyAnswerSchema = z.object({
  servicePropertyId: z.string().uuid(),
  userSelection: z.discriminatedUnion("type", [
    z.object({
      type: z.literal("text"),
      selection: LocalizedStringSchema,
    }),
    z.object({
      type: z.literal("date"),
      selection: z.date(),
    }),
    z.object({
      type: z.literal("number"),
      selection: z.number(),
    }),
  ]),
});

const OrderSchema = z.object({
  _id: z.instanceof(ObjectId),
  id: z.string().uuid(),
  userId: z.string().uuid(),
  serviceId: z.string().uuid(),
  serviceProperties: z.array(ServicePropertyAnswerSchema),
  totalPrice: ServicePriceSchema,
  paymentMethodId: z.string().uuid(),
  deliveryAddress: AddressSchema,
  orderDate: z.date(),
  deliveryDate: z.date().nullable().optional(),
  state: OrderStateSchema,
  trackingNumber: z.string().nullable().optional(),
  cancelledAt: z.date().optional().nullable(),
  selectedDate: z.preprocess((val) => {
    if (typeof val === "string" || val instanceof Date) {
      return new Date(val);
    }
    return val;
  }, z.date()),
  selectedTimeSlot: z.string().regex(timeSlotPattern),
  notes: z.string().nullable().optional(),
});
const OrderCreateParamsSchema = OrderSchema.omit({ _id: true });
const OrderUpdateParamsSchema = OrderSchema.partial().omit({ _id: true });

type Order = z.infer<typeof OrderSchema>
type OrderCreateParams = z.infer<typeof OrderCreateParamsSchema>
type OrderUpdateParams = z.infer<typeof OrderUpdateParamsSchema>
export default OrderSchema;

export {
  OrderCreateParamsSchema,
  OrderUpdateParamsSchema,
  OrderStateSchema,
};
export type {
  Order,
  OrderCreateParams,
  OrderUpdateParams,
};