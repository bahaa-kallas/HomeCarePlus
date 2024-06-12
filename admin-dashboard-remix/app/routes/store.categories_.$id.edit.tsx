"use client";

import { ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { json, Link, useFetcher, useLoaderData } from "@remix-run/react";
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
export type CategoryUpdateForm = z.infer<typeof schema>

export async function loader({ params }: LoaderFunctionArgs) {
  const categoryId = params.id!;
  const category = await apiClient.getCategoryById(categoryId);

  return json({
    category: category,
  });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const categoryId = params.id!;
  const {
    receivedValues: defaultValues,
    errors,
    data,
  } = await getValidatedFormData<CategoryUpdateForm>(request, resolver);

  if (errors) {
    return json({ errors, defaultValues });
  }

  try {
    const response = await apiClient.updateCategory(categoryId, data);
    return json({ ok: true });
  } catch (e) {
    console.error(e);
    return json({ ok: false }, { status: 400 });
  }
}

export default function CategoryEdit() {
  const { category } = useLoaderData<typeof loader>();
  const lang = "en";
  const { toast } = useToast();
  const fetcher = useFetcher();
  const { handleSubmit, register, ...rest } = useRemixForm<CategoryUpdateForm>({
    resolver: resolver,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    criteriaMode: "all",
    defaultValues: {
      name: category.name,
    },
  });

  return (
    <div className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
      <RemixFormProvider register={register} handleSubmit={handleSubmit} {...rest}>
        <fetcher.Form
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
                Editing Category: {category.name[lang]}
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Link to={"/store/categories"}>
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                </Link>
                <Button size="sm" type="submit">Save</Button>
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
              <Button size="sm" type="submit">Save</Button>
            </div>
          </div>
        </fetcher.Form>
      </RemixFormProvider>
    </div>
  );
}