import { randomUUID } from "node:crypto";
import { Order } from "@/domain/models/Order";

export default function getMockedOrders(): Order[] {
  return [
    {
      id: randomUUID(),
      userId: "user1",
      serviceId: randomUUID(),
      serviceProperties: [
        {
          servicePropertyId: randomUUID(),
          userSelection: { type: "string", selection: "1 hour" },
        },
        {
          servicePropertyId: randomUUID(),
          userSelection: { type: "string", selection: "Yes" },
        },
      ],
      totalPrice: { currencyId: randomUUID(), amount: 50 },
      paymentMethodId: randomUUID(),
      deliveryAddress: {
        street: "123 Main St",
        city: "Anytown",
        state: "CA",
        postalCode: "12345",
        country: "USA",
      },
      createdAt: new Date(),
      deliveryDate: null,
      state: "placed",
      trackingNumber: null,
    },
    {
      id: randomUUID(),
      userId: "user2",
      serviceId: randomUUID(),
      serviceProperties: [
        {
          servicePropertyId: randomUUID(),
          userSelection: { type: "string", selection: "2 hours" },
        },
        {
          servicePropertyId: randomUUID(),
          userSelection: { type: "string", selection: "No" },
        },
      ],
      totalPrice: { currencyId: randomUUID(), amount: 100 },
      paymentMethodId: randomUUID(),
      deliveryAddress: {
        street: "456 Elm St",
        city: "Othertown",
        state: "NY",
        postalCode: "54321",
        country: "USA",
      },
      createdAt: new Date(),
      deliveryDate: null,
      state: "scheduled",
      trackingNumber: null,
    },
    {
      id: randomUUID(),
      userId: "user3",
      serviceId: randomUUID(),
      serviceProperties: [
        {
          servicePropertyId: randomUUID(),
          userSelection: { type: "string", selection: "4 hours" },
        },
        {
          servicePropertyId: randomUUID(),
          userSelection: { type: "string", selection: "Yes" },
        },
      ],
      totalPrice: { currencyId: randomUUID(), amount: 80 },
      paymentMethodId: randomUUID(),
      deliveryAddress: {
        street: "789 Oak St",
        city: "Anothertown",
        state: "TX",
        postalCode: "67890",
        country: "USA",
      },
      createdAt: new Date(),
      deliveryDate: null,
      state: "delivered",
      trackingNumber: "123456789",
    },
  ];
}