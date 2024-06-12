import { Collection, MongoClient, ObjectId } from "mongodb";
import {
  AdLocation,
  AdLocationCreateParams,
  AdLocationCreateParamsSchema,
  AdLocationUpdate,
  AdLocationUpdateSchema,
} from "./ad-location-model.js";

class AdLocationService {
  private collection: Collection<AdLocation>;

  constructor(private db: MongoClient) {
    this.collection = db.db().collection<AdLocation>("adLocations");
  }

  async getAll(): Promise<AdLocation[]> {
    try {
      return await this.collection.find().toArray();
    } catch (error) {
      console.error("Error fetching ad locations:", error);
      throw error;
    }
  }

  async create(adLocationData: AdLocationCreateParams): Promise<ObjectId> {
    try {
      const validatedData = AdLocationCreateParamsSchema.parse(adLocationData);
      const res = await this.collection.insertOne(validatedData);
      return res.insertedId;
    } catch (error) {
      console.error("Error creating ad location:", error);
      throw error;
    }
  }

  async update(adLocationId: string, adLocationData: AdLocationUpdate): Promise<AdLocation> {
    try {
      const validatedData = AdLocationUpdateSchema.parse(adLocationData);
      const result = await this.collection.updateOne(
        { _id: new ObjectId(adLocationId) },
        { $set: validatedData },
      );
      if (result.modifiedCount === 0) {
        throw new Error("Ad location not found");
      }
      return { _id: new ObjectId(adLocationId), ...validatedData };
    } catch (error) {
      console.error("Error updating ad location:", error);
      throw error;
    }
  }

  async delete(adLocationId: string): Promise<void> {
    try {
      const result = await this.collection.deleteOne({ _id: new ObjectId(adLocationId) });
      if (result.deletedCount === 0) {
        throw new Error("Ad location not found");
      }
    } catch (error) {
      console.error("Error deleting ad location:", error);
      throw error;
    }
  }

  async clearAll(): Promise<void> {
    try {
      const result = await this.collection.deleteMany({});
      if (result.deletedCount === 0) {
        throw new Error("Ad location not found");
      }
    } catch (error) {
      console.error("Error deleting ad location:", error);
      throw error;
    }
  }
}

export default AdLocationService;