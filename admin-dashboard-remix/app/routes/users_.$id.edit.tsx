import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Form, Link } from "@remix-run/react";
import { ActionFunctionArgs, json, LoaderFunctionArgs, redirect } from "@remix-run/node";
import { z } from "zod";
import React from "react";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { User, UserTypeSchema } from "@/domain/models/User";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Badge } from "@/components/ui/badge";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  userType: UserTypeSchema,
});
const resolver = zodResolver(schema);

type UserUpdateForm = z.infer<typeof schema>


export function loader({ params }: LoaderFunctionArgs) {
  const userId = params.id;
  if (!userId) {
    throw json("UserId wasnt found", { status: 404 });
  }
  const user: User = {
    id: "1",
    name: "Bahaa Kallas",
    email: "bahaa@gmail.com",
    createdAt: new Date(),
    type: "customer",
  };
  return typedjson({
    user: user,
  });
}


export default function UserEdit() {
  const { user } = useTypedLoaderData();

  const { register, handleSubmit } = useRemixForm<UserUpdateForm>({
    resolver,
    defaultValues: {
      name: user.name,
      email: user.email,
      userType: user.type,
    },
  });

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className=" grid flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <Link to="/users">
                  <Button variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                </Link>

                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Displaying User Information
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                  <Button disabled type="submit" size="sm">Save</Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-0">
                    <CardHeader>
                      <CardTitle>User Information</CardTitle>
                      <CardDescription>
                        Enter user details below
                      </CardDescription>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label htmlFor="name">Name</Label>
                          <Input
                            {...register("name")}
                            id="name"
                            type="text"
                            className="w-full"
                          />
                        </div>
                        <div className="grid gap-3">
                          <Label htmlFor="email">Email</Label>
                          <Input
                            {...register("email")}
                            id="email"
                            type="email"
                            className="w-full"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <Card x-chunk="dashboard-07-chunk-3">
                    <CardHeader>
                      <CardTitle>Registration</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="grid gap-6">
                        <div className="grid gap-3">
                          <Label>Registered Since {user.createdAt.toLocaleDateString()}</Label>
                          <Label>Type: <Badge>{user.type}</Badge></Label>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button disabled type="submit" size="sm">Save</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Form>
  );
}


export async function action({ request }: ActionFunctionArgs) {
  const { receivedValues, errors, data } = await getValidatedFormData<UserUpdateForm>(request, resolver);
  if (errors) {
    return json({ errors, receivedValues });
  }

  const { name, email, userType } = data;

  /*
  const result = await apiClient.createUser({
    name: name,
    email: email,
    userType: userType == UserType.ADMIN ? UserType.ADMIN : UserType.CUSTOMER,
  });

   */

  return redirect("/users");
}