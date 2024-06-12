import { Ad, AdCreateParams } from "../domain/marketing/ad/ad-model.js";
import AdService from "../domain/marketing/ad/ad-service.js";
import { mongoClient } from "../config/database.js";
import { Service } from "../domain/store/service/service-model.js";
import random from "./utils.js";

const adService = new AdService(mongoClient);
export default async function createAds(
  services: Service[],
): Promise<Ad[]> {

  await adService.clearAll();

  const ads: AdCreateParams[] = [
    {
      id: "550e8400-e29b-41d4-a716-446655440000",
      name: {
        en: "Home Cleaning Service",
        ar: "خدمة تنظيف المنزل",
      },
      type: "banner_image",
      imageUrl: `https://home-services-bucket.s3.eu-central-1.amazonaws.com/bootstrap/ad/home-cleaning-service-${random(images)}.jpeg`,
      duration: {
        start: new Date("2024-06-01T00:00:00Z"),
        end: new Date("2024-06-30T23:59:59Z"),
      },
      state: "active",
      associatedService: random(services).id,
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440001",
      name: {
        en: "Gardening Service",
        ar: "خدمة البستنة",
      },
      type: "banner_text",
      imageUrl: `https://home-services-bucket.s3.eu-central-1.amazonaws.com/bootstrap/ad/gardening-service-${random(images)}.jpeg`,
      duration: {
        start: new Date("2024-07-01T00:00:00Z"),
        end: new Date("2024-07-31T23:59:59Z"),
      },
      state: "active",
      associatedService: random(services).id,
    },
    {
      id: "550e8400-e29b-41d4-a716-446655440002",
      name: {
        en: "Cooking Service",
        ar: "خدمة الطبخ",
      },
      type: "full_screen_image",
      imageUrl: `https://home-services-bucket.s3.eu-central-1.amazonaws.com/bootstrap/ad/cooking-service-${random(images)}.jpeg`,
      duration: {
        start: new Date("2024-08-01T00:00:00Z"),
        end: new Date("2024-08-31T23:59:59Z"),
      },
      state: "inactive",
      associatedService: random(services).id,
    },
  ];

  for (const ad of ads) {
    await adService.create(ad);
  }

  return adService.getAll();
}

const images = ["1", "2", "3", "4"];
