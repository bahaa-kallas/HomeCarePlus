import UserService from "../domain/users/user-service.js";
import { mongoClient } from "../config/database.js";
import { Address, UserType } from "../domain/users/user-model.js";
import AuthenticationService from "../domain/auth/authentication-service.js";
import EmailSendingService from "../domain/email/email-service.js";
import mailgunClient from "../config/mailgun.js";

const userService = new UserService(mongoClient);
const emailSendingService = new EmailSendingService(mailgunClient);
const userAuthService = new AuthenticationService(userService, emailSendingService);

interface UserSignupForm {
  name: string;
  email: string;
  password: string;
  type: UserType;
  addresses: Address[];
  phoneNumber: string;
}

export default async function createUsers() {
  await userService.clearAll();


  const users: UserSignupForm[] = [
    {
      type: "admin",
      name: "Bahaa Kallas",
      email: "dev.bahaakallas@gmail.com",
      password: "root",
      addresses: [
        {
          street: "123 Main St",
          city: "Anytown",
          state: "AnyState",
          country: "AnyCountry",
          postalCode: "12345",
        },
      ],
      phoneNumber: "123-456-7890",
    },
    {
      type: "admin",
      name: "John Doe",
      email: "john.doe@example.com",
      password: "password",
      addresses: [
        {
          street: "123 Main St",
          city: "Anytown",
          state: "AnyState",
          country: "AnyCountry",
          postalCode: "12345",
        },
      ],
      phoneNumber: "123-456-7890",
    },
    {
      type: "customer",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      password: "password",
      addresses: [
        {
          street: "456 Oak St",
          city: "Othertown",
          state: "OtherState",
          country: "OtherCountry",
          postalCode: "67890",
        },
        {
          street: "789 Elm St",
          city: "Anothertown",
          state: "AnotherState",
          country: "AnotherCountry",
          postalCode: "13579",
        },
      ],
      phoneNumber: "987-654-3210",
    },
    {
      type: "customer",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      password: "password",
      addresses: [
        {
          street: "321 Pine St",
          city: "Somewhere",
          state: "SomeState",
          country: "SomeCountry",
          postalCode: "24680",
        },
      ],
      phoneNumber: "555-555-5555",
    },
  ];


  for (const user of users) {
    await userAuthService.signup(
      user.name,
      user.email,
      user.password,
      user.type,
    );
    const createdUser = await userService.getByEmail(user.email);
    await userService.update(createdUser.id, {
      addresses: user.addresses,
      phoneNumber: user.phoneNumber,
    });
  }
  return userService.getAll();
}