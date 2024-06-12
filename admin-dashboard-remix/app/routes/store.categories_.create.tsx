"use client";

import { ChevronLeft } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ActionFunctionArgs } from "@remix-run/node";
import { Form, json, Link, redirect } from "@remix-run/react";
import { z } from "zod";
import LocalizedStringSchema from "@/domain/models/LocalizedString";
import { getValidatedFormData, RemixFormProvider, useRemixForm } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import LocalizedInput from "@/components/localized-input";
import { useToast } from "@/components/ui/use-toast";
import apiClient from "@/services/ApiClient";

const schema = z.object({
  name: LocalizedStringSchema,
});

const resolver = zodResolver(schema);
export type CategoryCreateForm = z.infer<typeof schema>

export async function action({ request }: ActionFunctionArgs) {
  const {
    receivedValues: defaultValues,
    errors,
    data,
  } = await getValidatedFormData<CategoryCreateForm>(request, resolver);

  if (errors) {
    console.log(errors);
    return json({ errors, defaultValues });
  }

  const response = await apiClient.createCategory(data);

  return redirect("/store/categories");
}

export default function ServicesCreate() {
  const lang = "en";
  const { toast } = useToast();
  const { handleSubmit, register, ...rest } = useRemixForm<CategoryCreateForm>({
    resolver: resolver,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    criteriaMode: "all",
  });

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <RemixFormProvider register={register} handleSubmit={handleSubmit} {...rest}>
        <Form
          method="POST"
          onSubmit={handleSubmit}
        >
          <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
            <div className="flex items-center gap-4">
              <Link to="/store/categories">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>

              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                New Category
              </h1>
              <Badge variant="outline" className="ml-auto sm:ml-0">
                Draft
              </Badge>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Link to={"/store/categories"}>
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                </Link>
                <Button size="sm" type="submit">Create Category</Button>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
              <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Category Details</CardTitle>
                    <CardDescription>
                      Fill out all information about this category
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="grid gap-6">
                      <div className="grid gap-3">
                        <Label htmlFor="name">Name</Label>
                        <LocalizedInput
                          register={register}
                          id="name"
                          formName="name"
                          className="w-full"
                        />
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
              <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
              </div>
            </div>
            <div className="flex items-center justify-center gap-2 md:hidden">
              <Link to={"/store/categories"}>
                <Button variant="outline" size="sm">
                  Discard
                </Button>
              </Link>
              <Button size="sm" type="submit">Create Category</Button>
            </div>
          </div>
        </Form>
      </RemixFormProvider>
    </div>
  );
}