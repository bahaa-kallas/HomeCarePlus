import { randomUUID } from "node:crypto";
import { Currency } from "@/domain/models/Currency";

export default function getMockedCurrencies(): Currency[] {
  return [
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
}