import { PaymentMethod } from "@/domain/models/PaymentMethod";
import { randomUUID } from "node:crypto";

export default function getMockedPaymentMethods(): PaymentMethod[] {
  return [
    {
      id: randomUUID(),
      name: {
        ar: "بطاقة الائتمان",
        en: "Credit Card",
      },
      description: {
        ar: "ادفع ببطاقة الائتمان الخاصة بك بأمان.",
        en: "Pay with your credit card securely.",
      },
      icon: "https://example.com/credit-card-icon.png",
      enabled: false,
      additionalInformation: {
        ar: "لا توجد رسوم معالجة.",
        en: "No processing fees apply.",
      },
    },
    {
      id: randomUUID(),
      name: {
        ar: "باي بال",
        en: "PayPal",
      },
      description: {
        ar: "ادفع باستخدام حساب PayPal الخاص بك.",
        en: "Pay with your PayPal account.",
      },
      icon: "https://example.com/paypal-icon.png",
      enabled: false,
      additionalInformation: {
        ar: "قد تنطبق رسوم المعاملات.",
        en: "Transaction fees may apply.",
      },
    },
    {
      id: randomUUID(),
      name: {
        ar: "شريط",
        en: "Stripe",
      },
      description: {
        ar: "ادفع بشكل آمن باستخدام Stripe.",
        en: "Pay securely with Stripe.",
      },
      icon: "https://example.com/stripe-icon.png",
      enabled: true,
      additionalInformation: {
        ar: "يدعم عدة عملات.",
        en: "Supports various currencies.",
      },
    }];
}