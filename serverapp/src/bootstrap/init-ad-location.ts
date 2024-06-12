import { mongoClient } from "../config/database.js";
import { Category } from "../domain/store/category/categrory-model.js";
import AdLocationService from "../domain/marketing/ad-location/ad-location-service.js";
import { AdLocationCreateParams } from "../domain/marketing/ad-location/ad-location-model.js";


const adLocationService = new AdLocationService(mongoClient);
export default async function createAdLocations(): Promise<Category[]> {
  await adLocationService.clearAll();

  const adLocations: AdLocationCreateParams[] = [];

  for (const adLocation of adLocations) {
    await adLocationService.create(adLocation);
  }

  return adLocationService.getAll();
}