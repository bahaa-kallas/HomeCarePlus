import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Form, Link } from "@remix-run/react";
import { ActionFunctionArgs, json, redirect } from "@remix-run/node";
import { z } from "zod";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import React from "react";
import { getValidatedFormData, useRemixForm } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import apiClient from "@/services/ApiClient";
import { UserTypeSchema } from "@/domain/models/User";

const schema = z.object({
  name: z.string(),
  email: z.string().email(),
  password: z.string().min(8),
  userType: UserTypeSchema,
});
const resolver = zodResolver(schema);

type UserCreateForm = z.infer<typeof schema>

export async function action({ request }: ActionFunctionArgs) {
  const { receivedValues, errors, data } = await getValidatedFormData<UserCreateForm>(request, resolver);
  if (errors) {
    return json({ errors, receivedValues });
  }

  const { name, email, password, userType } = data;

  const result = await apiClient.createUser({
    name: name,
    email: email,
    password: password,
    userType: userType,
  });

  return redirect("/users");
}

export default function UsersCreate() {
  const { register, handleSubmit } = useRemixForm<UserCreateForm>({
    resolver,
    defaultValues: {
      name: "",
      email: "",
      password: "",
      userType: undefined,
    },
  });

  return (
    <Form method="post" onSubmit={handleSubmit}>
      <div className="flex min-h-screen w-full flex-col bg-muted/40">
        <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className=" grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <Link to="/users">
                  <Button variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                </Link>

                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  New User
                </h1>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                  <Button type="submit" size="sm">Create User</Button>
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
                        <div className="grid gap-3">
                          <Label htmlFor="password">Password</Label>
                          <Input
                            {...register("password")}
                            id="password"
                            type="password"
                            className="w-full"
                          />
                        </div>
                        <div className="grid gap-3">
                          <RadioGroup {...register("userType")}>
                            {UserTypeSchema.options.map((userType) => {
                              return <div className="flex items-center space-x-3 space-y-0">
                                <RadioGroupItem id={userType} value={userType} />
                                <Label htmlFor={userType}>{userType}</Label>
                              </div>;
                            })}
                          </RadioGroup>
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
                <Button type="submit" size="sm">Save Product</Button>
              </div>
            </div>
          </main>
        </div>
      </div>
    </Form>
  );
}

