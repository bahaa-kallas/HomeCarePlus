import { Collection, MongoClient, ObjectId } from "mongodb";
import {
  Currency,
  CurrencyCreateParams,
  CurrencyCreateParamsSchema,
  CurrencyUpdateParams,
  CurrencyUpdateParamsSchema,
} from "./currency-model.js";

class CurrencyService {
  private collection: Collection<Currency>;

  constructor(private db: MongoClient) {
    this.collection = db.db().collection<Currency>("currencies");
  }

  async getAll(): Promise<Currency[]> {
    try {
      return await this.collection.find().toArray();
    } catch (error) {
      console.error("Error fetching currencies:", error);
      throw error;
    }
  }

  async create(currencyData: CurrencyCreateParams): Promise<Currency> {
    try {
      const validatedData = CurrencyCreateParamsSchema.parse(currencyData);
      const result = await this.collection.insertOne(validatedData);
      return validatedData;
    } catch (error) {
      console.error("Error creating currency:", error);
      throw error;
    }
  }

  async update(currencyId: string, currencyData: CurrencyUpdateParams): Promise<Currency> {
    try {
      const validatedData = CurrencyUpdateParamsSchema.parse(currencyData);
      const result = await this.collection.updateOne(
        { _id: new ObjectId(currencyId) },
        { $set: validatedData },
      );
      if (result.modifiedCount === 0) {
        throw new Error("Currency not found");
      }
      return { _id: new ObjectId(currencyId), ...validatedData };
    } catch (error) {
      console.error("Error updating currency:", error);
      throw error;
    }
  }

  async delete(currencyId: string): Promise<void> {
    try {
      const result = await this.collection.deleteOne({ _id: new ObjectId(currencyId) });
      if (result.deletedCount === 0) {
        throw new Error("Currency not found");
      }
    } catch (error) {
      console.error("Error deleting currency:", error);
      throw error;
    }
  }

  async getById(currencyId: string): Promise<Currency> {
    try {
      return await this.collection.findOne({ id: currencyId });
    } catch (error) {
      console.error("Error fetching currency:", error);
      throw error;
    }
  }

  async clearAll(): Promise<void> {
    try {
      const result = await this.collection.deleteMany({});
      if (result.deletedCount === 0) {
        throw new Error("Currencies not found");
      }
    } catch (error) {
      console.error("Error clearing currencies:", error);
      throw error;
    }
  }
}

export default CurrencyService;