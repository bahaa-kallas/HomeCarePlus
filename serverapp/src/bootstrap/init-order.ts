import { Order, OrderCreateParams } from "../domain/store/order/order-model.js";
import { randomUUID } from "node:crypto";
import { mongoClient } from "../config/database.js";
import OrderService from "../domain/store/order/order-service.js";
import { Service } from "../domain/store/service/service-model.js";
import { User } from "../domain/users/user-model.js";
import random from "./utils.js";

const orderService = new OrderService(mongoClient);

export default async function createOrders(
  users: User[],
  services: Service[],
): Promise<Order[]> {
  await orderService.clearAll();

  const orders: OrderCreateParams[] = [
    {
      id: randomUUID(),
      userId: random(users).id,
      serviceId: random(services).id,
      serviceProperties: [
        {
          servicePropertyId: random(services).properties[0].id,
          userSelection: { type: "text", selection: { en: "1 hour", ar: "ساعة واحدة" } },
        },
        {
          servicePropertyId: random(services).properties[1].id,
          userSelection: { type: "text", selection: { en: "Yes", ar: "نعم" } },
        },
      ],
      totalPrice: { currencyId: random(services).price[0].currencyId, amount: 50 },
      paymentMethodId: random(services).supportedPaymentMethods[0],
      deliveryAddress: random(users).addresses[0],
      orderDate: new Date(),
      deliveryDate: null,
      selectedDate: new Date("2024-05-20T00:00:00Z"), // Example selected date
      selectedTimeSlot: "08:00-10:00", // Example valid time slot
      state: "placed",
      trackingNumber: null,
    },
    {
      id: randomUUID(),
      userId: random(users).id,
      serviceId: random(services).id,
      serviceProperties: [
        {
          servicePropertyId: random(services).properties[0].id,
          userSelection: { type: "text", selection: { en: "2 hours", ar: "ساعتان" } },
        },
        {
          servicePropertyId: random(services).properties[1].id,
          userSelection: { type: "text", selection: { en: "No", ar: "لا" } },
        },
      ],
      totalPrice: { currencyId: random(services).price[0].currencyId, amount: 100 },
      paymentMethodId: random(services).supportedPaymentMethods[0],
      deliveryAddress: random(users).addresses[0],
      orderDate: new Date(),
      deliveryDate: null,
      selectedDate: new Date("2024-05-21T00:00:00Z"), // Example selected date
      selectedTimeSlot: "12:00-14:00", // Example valid time slot
      state: "scheduled",
      trackingNumber: null,
    },
    {
      id: randomUUID(),
      userId: random(users).id,
      serviceId: random(services).id,
      serviceProperties: [
        {
          servicePropertyId: random(services).properties[0].id,
          userSelection: { type: "text", selection: { en: "4 hours", ar: "4 ساعات" } },
        },
        {
          servicePropertyId: random(services).properties[1].id,
          userSelection: { type: "text", selection: { en: "Yes", ar: "نعم" } },
        },
      ],
      totalPrice: { currencyId: random(services).price[0].currencyId, amount: 80 },
      paymentMethodId: random(services).supportedPaymentMethods[0],
      deliveryAddress: random(users).addresses[0],
      orderDate: new Date(),
      deliveryDate: null,
      selectedDate: new Date("2024-05-22T00:00:00Z"), // Example selected date
      selectedTimeSlot: "14:00-16:00", // Example valid time slot
      state: "delivered",
      trackingNumber: "123456789",
    },
  ];

  for (const order of orders) {
    await orderService.create(order);
  }

  return orderService.getAll();
}
