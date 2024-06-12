import { mongoClient } from "../config/database.js";
import { Currency, CurrencyCreateParams } from "../domain/billing/currency/currency-model.js";
import { randomUUID } from "node:crypto";
import CurrencyService from "../domain/billing/currency/currency-service.js";


const currencyService = new CurrencyService(mongoClient);

export default async function createCurrencies(): Promise<Currency[]> {
  await currencyService.clearAll();

  const currencies: CurrencyCreateParams[] = [
    {
      id: randomUUID(),
      name: { en: "Dollar", ar: "دولار" },
      code: "USD",
      basicUnit: { en: "cent", ar: "سنت" },
      enabled: true,
    },
    {
      id: randomUUID(),
      name: { en: "Euro", ar: "يورو" },
      code: "EUR",
      basicUnit: { en: "cent", ar: "سنت" },
      enabled: false,
    },
    {
      id: randomUUID(),
      name: { en: "Sterling Pound", ar: "جنيه" },
      code: "GBP",
      basicUnit: { en: "penny", ar: "بيني" },
      enabled: true,
    },
  ];

  for (const currency of currencies) {
    await currencyService.create(currency);
  }

  return currencyService.getAll();
}