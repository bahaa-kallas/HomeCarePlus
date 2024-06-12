import { Collection, MongoClient } from "mongodb";
import {
  DateTimeSlots,
  Service,
  ServiceCreateParams,
  ServiceCreateParamsSchema,
  ServiceUpdateParams,
  ServiceUpdateParamsSchema,
} from "./service-model.js";
import { randomUUID } from "node:crypto";
import { addWeeks, eachDayOfInterval, format } from "date-fns";
import { Order } from "../order/order-model.js";

class ServiceService {
  private collection: Collection<Service>;

  constructor(private db: MongoClient) {
    this.collection = db.db().collection<Service>("services");
  }

  async getAll(): Promise<Service[]> {
    try {
      return await this.collection.find().toArray();
    } catch (error) {
      console.error("Error fetching services:", error);
      throw error;
    }
  }

  async create(serviceData: ServiceCreateParams): Promise<Service> {
    try {
      const newService: ServiceCreateParams = {
        ...serviceData,
        id: randomUUID(),
        createdAt: new Date(),
        updatedAt: new Date(),
        properties: serviceData.properties.map(property => ({ ...property, id: randomUUID() })),
      };
      const validatedData = ServiceCreateParamsSchema.parse(newService);
      const result = await this.collection.insertOne(validatedData);
      return serviceData;
    } catch (error) {
      console.error("Error creating service:", error);
      throw error;
    }
  }

  async update(serviceId: string, serviceData: ServiceUpdateParams): Promise<Service> {
    try {
      const validatedData = ServiceUpdateParamsSchema.parse(serviceData);
      const result = await this.collection.updateOne(
        { id: serviceId },
        { $set: validatedData },
      );
      console.log("Updated service:", result);
      if (result.matchedCount === 0) {
        throw new Error("Service not found");
      }
      return await this.get(serviceId);
    } catch (error) {
      console.error("Error updating service:", error);
      throw error;
    }
  }

  async delete(serviceId: string): Promise<void> {
    try {
      const result = await this.collection.deleteOne({ id: serviceId });
      if (result.deletedCount === 0) {
        throw new Error("Service not found");
      }
    } catch (error) {
      console.error("Error deleting service:", error);
      throw error;
    }
  }

  async get(serviceId: string): Promise<Service | null> {
    try {
      return await this.collection.findOne({ id: serviceId });
    } catch (error) {
      console.error("Error fetching service:", error);
      throw error;
    }
  }


  async clearAll() {
    try {
      await this.collection.deleteMany({});
    } catch (error) {
      console.error("Error clearing services:", error);
      throw error;
    }
  }

  async getAvailableTimeSlots(id: string, orders: Order[]): Promise<DateTimeSlots[]> {

    const service = await this.get(id);
    if (!service) {
      return [];
    }
    const today = new Date();
    const threeWeeksLater = addWeeks(today, 3);
    const dates = eachDayOfInterval({ start: today, end: threeWeeksLater });

    const bookedSlots = orders.reduce((acc, order) => {
      const date = format(order.deliveryDate, "yyyy-MM-dd");
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(order.selectedTimeSlot);
      return acc;
    }, {} as { [date: string]: string[] });

    return dates.map((date) => {
      const formattedDate = format(date, "yyyy-MM-dd");
      const dayOfWeek = date.getDay();
      const specialDate = service.specialDates.find((sd) => format(sd.date, "yyyy-MM-dd") === formattedDate);

      let slots: string[];

      if (specialDate) {
        slots = specialDate.slots;
      } else {
        const defaultSlot = service.defaultTimeSlots.find((ds) => ds.dayOfWeek === dayOfWeek);
        slots = defaultSlot ? defaultSlot.slots : [];
      }
      const bookedForDate = bookedSlots[formattedDate] || [];
      const availableTimeSlots = slots.filter((slot) => !bookedForDate.includes(slot));

      return {
        date,
        slots: availableTimeSlots,
      };
    });
  }
}

export default ServiceService;