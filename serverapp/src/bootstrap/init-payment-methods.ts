import { PaymentMethod, PaymentMethodCreateParams } from "../domain/billing/payment-method/payment-method-model.js";
import PaymentMethodService from "../domain/billing/payment-method/payment-method-service.js";
import { mongoClient } from "../config/database.js";


const paymentMethodService = new PaymentMethodService(mongoClient);

export default async function createPaymentMethods(): Promise<PaymentMethod[]> {
  await paymentMethodService.clearAll();

  const paymentMethods: PaymentMethodCreateParams[] = [
    {
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
      name: {
        ar: "شريط",
        en: "Stripe",
      },
      description: {
        ar: "ادفع بشكل آمن باستخدام Stripe.",
        en: "Pay securely with Stripe.",
      },
      icon: "https://example.com/stripe-icon.png",
      enabled: false,
      additionalInformation: {
        ar: "يدعم عدة عملات.",
        en: "Supports various currencies.",
      },
    },
    {
      name: {
        ar: "عملات رقمية",
        en: "Cryptocurrencies",
      },
      description: {
        ar: "ادفع بشكل آمن باستخدام Coinbase.",
        en: "Pay with zour own digital cash vi Coinbase commerce",
      },
      icon: "https://example.com/stripe-icon.png",
      enabled: true,
      additionalInformation: {
        ar: "يدعم عدة عملات.",
        en: "Supports various cryptocurrencies.",
      },
    }
  ];
  for (const method of paymentMethods) {
    await paymentMethodService.create(method);
  }

  return paymentMethodService.getAll();
}