import { useForm } from "react-hook-form";
import { z } from "zod";
import { Form, Link, redirect, useNavigate } from "@remix-run/react";
import { json } from "@remix-run/node";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

// Define the schema for the login form
const loginFormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6),
});


// Load the login form data from the server
export const loader = async () => {
  return json({});
};

// Handle the form submission and redirect to the home page
export const action = async ({ request }) => {
  const formData = await request.formData();
  const data = Object.fromEntries(formData.entries());

  const isValid = loginFormSchema.safeParse(data);

  if (!isValid.success) {
    console.error("Invalid login form data", { status: 400 });
    throw json("Invalid login form data", { status: 400 });
  }

  // Simulate a successful login by redirecting to the home page
  return redirect("/");
};

// Render the login form
export default function LoginRoute() {
  const navigate = useNavigate();
  // Define the form state and handleSubmit function
  const { register, handleSubmit, formState: { errors } } = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {},
  });

  return (
    <div className="flex h-full flex-col items-center justify-center bg-gray-100">
      <div className="mx-auto w-full max-w-md">
        <Form method="post" onSubmit={handleSubmit(onSubmit)}>
          <FormField name="email">
            <FormItem>
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input type="email" {...register("email")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <FormField name="password">
            <FormItem>
              <FormLabel>Password</FormLabel>
              <FormControl>
                <Input type="password" {...register("password")} />
              </FormControl>
              <FormMessage />
            </FormItem>
          </FormField>
          <Button type="submit" className="mt-4 w-full">
            Login
          </Button>
        </Form>
        <div className="mt-8 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <Link to="/register" className="font-medium text-gray-600 hover:text-gray-800">
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}