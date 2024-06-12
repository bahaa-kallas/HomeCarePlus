import { z } from "zod";
import { ObjectId } from "mongodb";

const UserTypeSchema = z.enum(["admin", "customer"]);
const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
}).partial();


const UserSchema = z.object({
  _id: z.instanceof(ObjectId),
  id: z.string().uuid(),
  type: UserTypeSchema,
  name: z.string(),
  email: z.string().email(),
  hashedPassword: z.string(),
  salt: z.string(),
  emailVerificationToken: z.string().nullable(),
  emailVerified: z.boolean(),
  createdAt: z.date(),
  addresses: z.array(AddressSchema),
  phoneNumber: z.string().optional(),
});

const SessionUserSchema = UserSchema.omit({
  _id: true,
  hashedPassword: true,
  salt: true,
  emailVerificationToken: true,
}).strip();

const UserCreateParamsSchema = UserSchema.omit({ _id: true });
const UserUpdateParamsSchema = UserSchema.partial().omit({ _id: true });


type Address = z.infer<typeof AddressSchema>
type User = z.infer<typeof UserSchema>
type SessionUser = z.infer<typeof SessionUserSchema>
type UserCreateParams = z.infer<typeof UserCreateParamsSchema>
type UserUpdateParams = z.infer<typeof UserUpdateParamsSchema>
type UserType = z.infer<typeof UserTypeSchema>

export default UserSchema;

export {
  UserCreateParamsSchema,
  UserUpdateParamsSchema,
  AddressSchema,
  UserTypeSchema,
  SessionUserSchema,
};

export type {
  User,
  Address,
  UserCreateParams,
  UserUpdateParams,
  UserType,
  SessionUser,
};