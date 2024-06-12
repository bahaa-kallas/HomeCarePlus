import { z } from "zod";
import { ObjectId } from "mongodb";
import LocalizedStringSchema from "../../shared/LocalizedString.js";
import timeSlotPattern from "../../shared/TimeSlotPattern.js";

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

const ServicePriceSchema = z.object({
  currencyId: z.string().uuid(),
  amount: z.number(),
});

const TimeSlotSchema = z.object({
  dayOfWeek: z.number().min(0).max(6), // 0 (Sunday) to 6 (Saturday)
  slots: z.array(z.string().regex(timeSlotPattern)),
});

const DateTimeSlotsSchema = z.object({
  date: z.date(),
  slots: z.array(z.string().regex(timeSlotPattern)), // Time slots in "HH:mm-HH:mm" format
});

const ServiceSchema = z.object({
  _id: z.instanceof(ObjectId),
  id: z.string().uuid(),
  name: LocalizedStringSchema,
  description: LocalizedStringSchema,
  tos: LocalizedStringSchema.optional(),
  imageUrl: z.string(),
  state: ServiceStateSchema,
  price: z.array(ServicePriceSchema),
  categoryId: z.string().uuid(),
  properties: z.array(ServicePropertySchema),
  createdAt: z.date(),
  updatedAt: z.date(),
  deletedAt: z.date().optional(),
  supportedPaymentMethods: z.array(z.string().uuid()),
  defaultTimeSlots: z.array(TimeSlotSchema),
  specialDates: z.array(DateTimeSlotsSchema),
});

const ServiceCreateParamsSchema = ServiceSchema.omit({ _id: true });
const ServiceUpdateParamsSchema = ServiceSchema.partial().omit({ _id: true });

type ServiceCreateParams = z.infer<typeof ServiceCreateParamsSchema>
type ServiceUpdateParams = z.infer<typeof ServiceUpdateParamsSchema>
type Service = z.infer<typeof ServiceSchema>
type DateTimeSlots = z.infer<typeof DateTimeSlotsSchema>
export default ServiceSchema;

export {
  ServicePriceSchema,
  ServicePropertySchema,
  ServiceCreateParamsSchema,
  ServiceUpdateParamsSchema,
  DateTimeSlotsSchema,
};

export type {
  Service,
  ServiceCreateParams,
  ServiceUpdateParams,
  DateTimeSlots,
};