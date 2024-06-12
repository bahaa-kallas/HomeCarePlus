import { Collection, MongoClient, ObjectId } from "mongodb";
import {
  Order,
  OrderCreateParams,
  OrderCreateParamsSchema,
  OrderUpdateParams,
  OrderUpdateParamsSchema,
} from "./order-model.js";
import { randomUUID } from "node:crypto";

export default class OrderService {
  private collection: Collection<any>;

  constructor(private client: MongoClient) {
    this.collection = this.client.db().collection("orders");
  }

  async getAll(): Promise<any[]> {
    return await this.collection.find().toArray();
  }

  async getAllByUserId(userId: string): Promise<any[]> {
    return await this.collection.find({ userId: userId }).toArray();
  }

  async create(data: OrderCreateParams): Promise<any> {
    try {
      console.log(data.serviceProperties);
      const newOrder: OrderCreateParams = {
        ...data,
        id: randomUUID(),
        orderDate: new Date(),
        state: "placed",
      };
      const validatedData = OrderCreateParamsSchema.parse(newOrder);
      const result = await this.collection.insertOne(validatedData);
      return newOrder;
    } catch (error) {
      console.error("Error creating service:", error);
      throw error;
    }
  }

  async update(id: string, data: OrderUpdateParams): Promise<any> {
    const validatedData = OrderUpdateParamsSchema.parse(data);
    const result = await this.collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: validatedData },
    );
    return result.value;
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ id: id });
    return result.deletedCount === 1;
  }

  async get(id: string): Promise<any> {
    return await this.collection.findOne({ id: id });
  }

  async clearAll(): Promise<void> {
    await this.collection.deleteMany({});
  }


  async getAllByServiceIdAndDelieveryDateInBetween(
    serviceId: string,
    deliveryDateFrom: Date,
    deliveryDateTo: Date,
  ): Promise<Order[]> {
    return this.collection.find({
      serviceId,
      deliveryDate: { $gte: deliveryDateFrom, $lte: deliveryDateTo },
    }).toArray();
  }
}
