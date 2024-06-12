import { User } from "@/domain/models/User";

export default function getMockedUsers(): User[] {
  return [
    {
      id: "a701bdc6-683e-4a33-bc5a-f8af36ab5472",
      type: "admin",
      name: "John Doe",
      email: "john.doe@example.com",
      emailVerified: true,
      createdAt: new Date("2024-05-12T12:00:00Z"),
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
      id: "7a2fb9ee-42db-48a6-aaeb-17fd96af308c",
      type: "customer",
      name: "Jane Smith",
      email: "jane.smith@example.com",
      emailVerified: false,
      createdAt: new Date("2024-05-12T13:00:00Z"),
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
      id: "9f1e8c41-4e3a-4916-a5b9-567abf53c74b",
      type: "customer",
      name: "Bob Johnson",
      email: "bob.johnson@example.com",
      emailVerified: true,
      createdAt: new Date("2024-05-12T14:00:00Z"),
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
}