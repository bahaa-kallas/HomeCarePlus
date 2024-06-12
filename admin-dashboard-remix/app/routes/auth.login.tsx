import React from "react";
import { ActionFunctionArgs, json, LoaderFunctionArgs } from "@remix-run/node";
import apiClient from "@/services/ApiClient";
import { Form, redirect } from "@remix-run/react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { getValidatedFormData, RemixFormProvider, useRemixForm } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/components/ui/use-toast";
import { jwtCookie } from "@/cookies.server";

const schema = z.object({
  email: z.string().email(),
  password: z.string(),
});
const resolver = zodResolver(schema);

type LoginForm = z.infer<typeof schema>


export async function loader({ request }: LoaderFunctionArgs) {
  const existingJwtCookie = await jwtCookie.parse(
    request.headers.get("Cookie"),
  );
  console.log(existingJwtCookie);
  if (existingJwtCookie) {
    console.log("Already logged in, Redirecting to main page...");
    return redirect("/store");
  }

  return json({ ok: true });
}

export default function AuthLogin() {
  const { toast } = useToast();
  const { register, handleSubmit, ...rest } = useRemixForm<LoginForm>({
    resolver,
    defaultValues: {
      email: "",
      password: "",
    },
  });
  return (
    <RemixFormProvider register={register} handleSubmit={handleSubmit} {...rest}>
      <Form method="POST" onSubmit={handleSubmit}>
        <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
          <div className="flex items-center justify-center py-12">
            <div className="mx-auto grid w-[350px] gap-6">
              <div className="grid gap-2 text-center">
                <h1 className="text-3xl font-bold">Login</h1>
                <p className="text-balance text-muted-foreground">
                  Enter your email below to login to your account
                </p>
              </div>
              <div className="grid gap-4">
                <div className="grid gap-2">
                  <FormField
                    control={rest.control}
                    name="email"
                    render={({ field }) => {
                      return <FormItem>
                        <FormLabel>Email</FormLabel>
                        <FormControl>
                          <Input type="email" placeholder="m@example.com" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>;
                    }}
                  />
                </div>
                <div className="grid gap-2">
                  <FormField
                    control={rest.control}
                    name="password"
                    render={({ field }) => {
                      return <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input type="password" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>;
                    }}
                  />
                </div>
                <Button type="submit" className="w-full">
                  Login
                </Button>
              </div>
            </div>
          </div>
          <div className="hidden bg-primary lg:block">
          </div>
        </div>
      </Form>
    </RemixFormProvider>

  );
}

export async function action({ request }: ActionFunctionArgs) {
  const {
    receivedValues: defaultValues,
    errors,
    data,
  } = await getValidatedFormData<LoginForm>(request, resolver);

  if (errors) {
    console.error(errors);
    throw json("Invalid login form data", { status: 400 });
  }
  const { email, password } = data;
  const response = await apiClient.login(email, password);
  if (!response.accessToken) {
    console.error("Couldn't get access token, Check backend logs.");
  }

  console.log("Login successful, Redirecting to main page...");
  return redirect("/store", {
    headers: {
      "Set-Cookie": await jwtCookie.serialize(response.accessToken),
    },
  });
}