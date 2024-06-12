import { Collection, MongoClient } from "mongodb";
import { Ad, AdCreateParams, AdCreateParamsSchema, AdUpdateParams, AdUpdateParamsSchema } from "./ad-model.js";

class AdService {
  private collection: Collection<Ad>;

  constructor(private db: MongoClient) {
    this.collection = db.db().collection<Ad>("ads");
  }

  async getAll(): Promise<Ad[]> {
    try {
      return await this.collection.find().toArray();
    } catch (error) {
      console.error("Error fetching ads:", error);
      throw error;
    }
  }

  async get(id: string): Promise<Ad | null> {
    try {
      return await this.collection.findOne({ id: id });
    } catch (error) {
      console.error("Error fetching ad:", error);
      throw error;
    }
  }

  async create(adData: AdCreateParams): Promise<boolean> {
    try {
      const validatedData = AdCreateParamsSchema.parse(adData);
      const result = await this.collection.insertOne(validatedData);
      return true;
    } catch (error) {
      console.error("Error creating ad:", error);
      throw error;
    }
  }

  async update(id: string, adData: AdUpdateParams): Promise<Ad | null> {
    try {
      const validatedData = AdUpdateParamsSchema.parse(adData);
      return await this.collection.findOneAndUpdate(
        { id: id },
        { $set: validatedData },
        { returnDocument: "after" },
      );
    } catch (error) {
      console.error("Error updating ad:", error);
      throw error;
    }
  }

  async delete(id: string): Promise<void> {
    try {
      const result = await this.collection.deleteOne({ id: id });
      if (result.deletedCount === 0) {
        throw new Error("Ad not found");
      }
    } catch (error) {
      console.error("Error deleting ad:", error);
      throw error;
    }
  }

  async clearAll(): Promise<void> {
    try {
      const result = await this.collection.deleteMany({});
      if (result.deletedCount === 0) {
        throw new Error("Ads not found");
      }
    } catch (error) {
      console.error("Error clearing ads:", error);
      throw error;
    }
  }
}

export default AdService;