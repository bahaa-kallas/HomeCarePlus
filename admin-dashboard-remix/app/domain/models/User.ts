import { z } from "zod";

const UserTypeSchema = z.enum(["admin", "customer"]);
const AddressSchema = z.object({
  street: z.string(),
  city: z.string(),
  state: z.string(),
  country: z.string(),
  postalCode: z.string(),
}).partial();


const UserSchema = z.object({
  id: z.string().uuid(),
  type: UserTypeSchema,
  name: z.string(),
  email: z.string().email(),
  emailVerified: z.boolean(),
  createdAt: z.date(),
  addresses: z.array(AddressSchema),
  phoneNumber: z.string().optional(),
});

type User = z.infer<typeof UserSchema>
type UserType = z.infer<typeof UserTypeSchema>

export default UserSchema;
export {
  UserTypeSchema,
  AddressSchema,
};
export type {
  User,
  UserType,
};