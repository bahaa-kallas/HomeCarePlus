import { Service, ServiceCreateParams } from "../domain/store/service/service-model.js";
import { Currency } from "../domain/billing/currency/currency-model.js";
import { PaymentMethod } from "../domain/billing/payment-method/payment-method-model.js";
import { Category } from "../domain/store/category/categrory-model.js";
import { randomUUID } from "node:crypto";
import ServiceService from "../domain/store/service/service-service.js";
import { mongoClient } from "../config/database.js";
import random from "./utils.js";

const serviceService = new ServiceService(mongoClient);

export default async function createServices(
  currencies: Currency[],
  paymentMethods: PaymentMethod[],
  categories: Category[],
): Promise<Service[]> {
  await serviceService.clearAll();

  const services: ServiceCreateParams[] = [
    {
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
      imageUrl: "https://home-services-bucket.s3.eu-central-1.amazonaws.com/bootstrap/service/home-cleaning.jpg",
      state: "public",
      price: currencies.map(c => ({ currencyId: c.id, amount: 50 })),
      categoryId: random(categories).id,
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
      defaultTimeSlots: [
        { dayOfWeek: 1, slots: ["08:00-10:00", "12:00-14:00", "14:00-16:00"] },
        { dayOfWeek: 3, slots: ["08:00-10:00", "12:00-14:00", "14:00-16:00"] },
        { dayOfWeek: 5, slots: ["08:00-10:00", "12:00-14:00", "14:00-16:00"] },
      ],
      specialDates: [
        { date: new Date("2024-05-19T00:00:00.000Z"), slots: ["08:00-10:00", "14:00-16:00"] },
        { date: new Date("2024-06-01T00:00:00.000Z"), slots: ["10:00-12:00", "16:00-18:00"] },
      ],
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
      imageUrl: "https://home-services-bucket.s3.eu-central-1.amazonaws.com/bootstrap/service/plumbing.jpg",
      state: "public",
      price: currencies.map(c => ({ currencyId: c.id, amount: 100 })),
      categoryId: random(categories).id,
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
      defaultTimeSlots: [
        { dayOfWeek: 2, slots: ["07:00-10:00", "13:00-15:00"] },
        { dayOfWeek: 4, slots: ["07:00-10:00", "13:00-15:00"] },
        { dayOfWeek: 6, slots: ["07:00-10:00", "13:00-15:00"] },
      ],
      specialDates: [
        { date: new Date("2024-07-04T00:00:00.000Z"), slots: ["08:00-11:00", "14:00-17:00"] },
      ],
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
      imageUrl: "https://home-services-bucket.s3.eu-central-1.amazonaws.com/bootstrap/service/gerdening-service.jpg",
      state: "public",
      price: currencies.map(c => ({ currencyId: c.id, amount: 80 })),
      categoryId: random(categories).id,
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
      defaultTimeSlots: [
        { dayOfWeek: 1, slots: ["08:00-10:00", "12:00-14:00", "16:00-18:00"] },
        { dayOfWeek: 3, slots: ["08:00-10:00", "12:00-14:00", "16:00-18:00"] },
        { dayOfWeek: 5, slots: ["08:00-10:00", "12:00-14:00", "16:00-18:00"] },
      ],
      specialDates: [
        { date: new Date("2024-08-15T00:00:00.000Z"), slots: ["09:00-11:00", "13:00-15:00"] },
      ],
    },
  ];

  for (const service of services) {
    await serviceService.create(service);
  }
  return serviceService.getAll();
}
