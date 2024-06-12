import { Service } from "@/domain/services/Service";
import { randomUUID } from "node:crypto";
import getMockedPaymentMethods from "@/domain/mocks/payment-method-mocks";

export default function getMockedServices(): Service[] {
  const paymentMethods = getMockedPaymentMethods();
  const currencies = getMockedPaymentMethods();
  const categories = getMockedPaymentMethods();
  return [{
    id: randomUUID(),
    name: {
      en: "House Cleaning",
      ar: "تنظيف المنزل",
    },
    description: {
      en: "Professional house cleaning services",
      ar: "خدمات تنظيف المنزل المحترفة",
    },
    tos: {
      en: "Terms of service for house cleaning",
      ar: "شروط الخدمة لتنظيف المنزل",
    },
    image: "https://example.com/cleaning.jpg",
    state: "public",
    price: [{ currencyId: random(currencies).id, amount: 50 }],
    categoryId: random(categories).id,
    createdAt: new Date(),
    updatedAt: new Date(),
    properties: [
      {
        id: randomUUID(),
        type: "text",
        name: { en: "Service Duration", ar: "مدة الخدمة" },
        options: [{ en: "1 hour", ar: "ساعة واحدة" }],
      },
      {
        id: randomUUID(),
        type: "text",
        name: { en: "Cleaning Supplies Included", ar: "تشمل مواد التنظيف" },
        options: [{ en: "Yes", ar: "نعم" }, { en: "No", ar: "لا" }],
      },
    ],
    supportedPaymentMethods: [random(paymentMethods).id, random(paymentMethods).id],
  },
    {
      id: randomUUID(),
      name: {
        en: "Plumbing Service",
        ar: "خدمات السباكة",
      },
      description: {
        en: "Professional plumbing repair services",
        ar: "خدمات إصلاح السباكة المحترفة",
      },
      image: "https://example.com/plumbing.jpg",
      state: "public",
      price: [{ currencyId: random(currencies).id, amount: 100 }],
      categoryId: random(categories).id,
      createdAt: new Date(),
      updatedAt: new Date(),
      properties: [
        {
          id: randomUUID(),
          type: "text",
          name: { en: "Service Duration", ar: "مدة الخدمة" },
          options: [{ en: "1 hour", ar: "ساعة واحدة" }, { en: "2 hours", ar: "ساعتان" }],
        },
        {
          id: randomUUID(),
          type: "text",
          name: { en: "Emergency Service", ar: "خدمة الطوارئ" },
          options: [{ en: "Yes", ar: "نعم" }, { en: "No", ar: "لا" }],
        },
      ],
      supportedPaymentMethods: [random(paymentMethods).id],
    },
    {
      id: randomUUID(),
      name: {
        en: "Gardening Service",
        ar: "خدمات الحدائق",
      },
      description: {
        en: "Professional gardening and landscaping services",
        ar: "خدمات الحدائق والتنسيق المحترفة",
      },
      image: "https://example.com/gardening.jpg",
      state: "public",
      price: [{ currencyId: random(currencies).id, amount: 80 }],
      categoryId: random(categories).id,
      createdAt: new Date(),
      updatedAt: new Date(),
      properties: [
        {
          id: randomUUID(),
          type: "text",
          name: { en: "Service Duration", ar: "مدة الخدمة" },
          options: [{ en: "2 hours", ar: "ساعتان" }, { en: "4 hours", ar: "4 ساعات" }],
        },
        {
          id: randomUUID(),
          type: "text",
          name: { en: "Tools Provided", ar: "الأدوات المقدمة" },
          options: [{ en: "Yes", ar: "نعم" }, { en: "No", ar: "لا" }],
        },
      ],
      supportedPaymentMethods: [random(paymentMethods).id, random(paymentMethods).id],
    },
  ];
}

function random<T>(array: T[]): T {
  const randomIndex = Math.floor(Math.random() * array.length);
  return array[randomIndex];
}