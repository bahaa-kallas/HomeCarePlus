import { Collection, MongoClient } from "mongodb";
import {
  User,
  UserCreateParams,
  UserCreateParamsSchema,
  UserUpdateParams,
  UserUpdateParamsSchema,
} from "./user-model.js";

export default class UserService {
  private readonly collection: Collection<User>;

  constructor(client: MongoClient) {
    this.collection = client.db().collection("users");
  }

  async create(user: UserCreateParams): Promise<User> {
    const validatedUser = UserCreateParamsSchema.parse(user);
    const result = await this.collection.insertOne(validatedUser);
    return validatedUser;
  }

  async update(id: string, updates: UserUpdateParams): Promise<User | null> {
    const validatedUpdates = UserUpdateParamsSchema.parse(updates);
    return await this.collection.findOneAndUpdate(
      { id: id },
      { $set: validatedUpdates },
    );
  }

  async get(id: string): Promise<User | null> {
    return this.collection.findOne({ id: id });
  }

  async getAll(): Promise<User[]> {
    return this.collection.find().toArray();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.collection.deleteOne({ id: id });
    return result.deletedCount === 1;
  }

  async getByEmail(email: string): Promise<User | null> {
    return this.collection.findOne({ email: email });
  }

  async getByVerificationToken(token: string): Promise<User | null> {
    return this.collection.findOne({ emailVerificationToken: token });
  }

  async clearAll(): Promise<void> {
    await this.collection.deleteMany({});
  }
}
