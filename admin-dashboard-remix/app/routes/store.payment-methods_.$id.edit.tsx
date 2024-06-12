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
import LocalizedTextarea from "@/components/localized-textarea";
import { FormControl, FormDescription, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Switch } from "@/components/ui/switch";
import apiClient from "@/services/ApiClient";

const schema = z.object({
  name: LocalizedStringSchema,
  description: LocalizedStringSchema,
  icon: z.string().optional(),
  enabled: z.boolean(),
  additionalInformation: LocalizedStringSchema.optional(),
});

const resolver = zodResolver(schema);
export type PaymentMethodCreateForm = z.infer<typeof schema>


export async function loader({ params }: LoaderFunctionArgs) {
  const paymentMethodId = params.id!;
  const paymentMethod = await apiClient.getPaymentMethod(paymentMethodId);

  return json({
    paymentMethod: paymentMethod,
  });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const paymentMethodId = params.id!;

  const {
    receivedValues: defaultValues,
    errors,
    data,
  } = await getValidatedFormData<PaymentMethodCreateForm>(request, resolver);

  if (errors) {
    console.log(errors);
    return json({ errors, defaultValues });
  }

  try {
    const response = await apiClient.updatePaymentMethod(paymentMethodId, data);
    return json({ ok: true });
  } catch (e) {
    console.error(e);
    return json({ ok: false }, { status: 400 });
  }
}

export default function PaymentMethodEdit() {
  const lang = "en";
  const { paymentMethod } = useLoaderData<typeof loader>();
  const fetcher = useFetcher();
  const { handleSubmit, register, ...rest } = useRemixForm<PaymentMethodCreateForm>({
    resolver: resolver,
    mode: "onSubmit",
    reValidateMode: "onSubmit",
    criteriaMode: "all",
    defaultValues: {
      name: paymentMethod.name,
      description: paymentMethod.description,
      icon: paymentMethod.icon,
      enabled: paymentMethod.enabled,
      additionalInformation: paymentMethod.additionalInformation,
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
              <Link to="/store/payment-methods">
                <Button variant="outline" size="icon" className="h-7 w-7">
                  <ChevronLeft className="h-4 w-4" />
                  <span className="sr-only">Back</span>
                </Button>
              </Link>

              <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                Editing Payment Method: {paymentMethod.name[lang]}
              </h1>
              <div className="hidden items-center gap-2 md:ml-auto md:flex">
                <Link to={"/store/payment-methods"}>
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
                    <CardTitle>Payment Method Details</CardTitle>
                    <CardDescription>
                      Fill out all information about this payment method
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
                      <div className="grid gap-3">
                        <Label htmlFor="description">Description</Label>
                        <LocalizedTextarea
                          id="description"
                          register={register}
                          formName="description"
                          className="min-h-32"
                        />
                      </div>
                      <div className="grid gap-3">
                        <Label htmlFor="additionalInformation">Additional information</Label>
                        <LocalizedTextarea
                          id="additionalInformation"
                          register={register}
                          formName="additionalInformation"
                          className="min-h-32"
                        />
                      </div>
                      <div className="grid gap-3">
                        <FormField
                          control={rest.control}
                          name="enabled"
                          render={({ field }) => (
                            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                              <div className="space-y-0.5">
                                <FormLabel className="text-base">
                                  Disable
                                </FormLabel>
                                <FormDescription>
                                  The payment method will be disabled effect immediatly
                                </FormDescription>
                              </div>
                              <FormControl>
                                <Switch
                                  checked={field.value}
                                  onCheckedChange={field.onChange}
                                />
                              </FormControl>
                            </FormItem>
                          )}
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
              <Link to={"/store/payment-methods"}>
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