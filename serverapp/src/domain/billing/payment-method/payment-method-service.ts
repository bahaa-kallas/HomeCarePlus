import {
  PaymentMethod,
  PaymentMethodCreateParams,
  PaymentMethodCreateParamsSchema,
  PaymentMethodUpdateParams,
  PaymentMethodUpdateParamsSchema,
} from "./payment-method-model.js";
import { Collection, MongoClient } from "mongodb";
import { randomUUID } from "node:crypto";

class PaymentMethodService {
  private collection: Collection<PaymentMethod>;

  constructor(private db: MongoClient) {
    this.collection = db.db().collection<PaymentMethod>("paymentMethods");
  }

  async getAll(): Promise<PaymentMethod[]> {
    try {
      return await this.collection.find().toArray();
    } catch (error) {
      console.error("Error fetching payment methods:", error);
      throw error;
    }
  }

  async create(paymentMethodData: PaymentMethodCreateParams): Promise<PaymentMethod> {
    try {
      const validatedData = PaymentMethodCreateParamsSchema.parse({
        ...paymentMethodData,
        id: randomUUID(),
      });
      const result = await this.collection.insertOne(validatedData);
      return validatedData;
    } catch (error) {
      console.error("Error creating payment method:", error);
      throw error;
    }
  }

  async update(paymentMethodId: string, paymentMethodData: PaymentMethodUpdateParams): Promise<PaymentMethod> {
    try {
      const validatedData = PaymentMethodUpdateParamsSchema.parse(paymentMethodData);
      const result = await this.collection.updateOne(
        { id: paymentMethodId },
        { $set: validatedData },
      );
      if (result.modifiedCount === 0) {
        throw new Error("Payment method not found");
      }
      return { id: paymentMethodId, ...validatedData };
    } catch (error) {
      console.error("Error updating payment method:", error);
      throw error;
    }
  }

  async delete(paymentMethodId: string): Promise<void> {
    try {
      const result = await this.collection.deleteOne({ id: paymentMethodId });
      if (result.deletedCount === 0) {
        throw new Error("Payment method not found");
      }
    } catch (error) {
      console.error("Error deleting payment method:", error);
      throw error;
    }
  }

  async get(paymentMethodId: string): Promise<PaymentMethod> {
    try {
      return await this.collection.findOne({ id: paymentMethodId });
    } catch (error) {
      console.error("Error fetching payment method:", error);
      throw error;
    }
  }

  async clearAll(): Promise<void> {
    try {
      const result = await this.collection.deleteMany({});
      if (result.deletedCount === 0) {
        throw new Error("Payment method not found");
      }
    } catch (error) {
      console.error("Error deleting payment method:", error);
      throw error;
    }
  }
}

export default PaymentMethodService;