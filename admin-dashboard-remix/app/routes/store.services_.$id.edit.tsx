"use client";

import { ChevronLeft, CirclePlus, Trash } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { json, Link, useFetcher } from "@remix-run/react";
import { z } from "zod";
import LocalizedStringSchema from "@/domain/models/LocalizedString";
import ServicePriceSchema from "@/domain/models/ServicePrice";
import { ServiceStateSchema } from "@/domain/services/Service";
import { useFieldArray, useFormContext } from "react-hook-form";
import { getValidatedFormData, RemixFormProvider, useRemixForm } from "remix-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FormControl, FormField, FormItem, FormMessage } from "@/components/ui/form";
import React, { useMemo, useState } from "react";
import { Category } from "@/domain/models/Category";
import FileUploadInput from "@/components/file-upload-input";
import LocalizedInput from "@/components/localized-input";
import LocalizedTextarea from "@/components/localized-textarea";
import { Currency } from "@/domain/models/Currency";
import { PaymentMethod } from "@/domain/models/PaymentMethod";
import ServicePropertiesEditor from "@/components/service-properties-editor";
import MultipleSelector, { Option } from "@/components/ui/multi-select";
import apiClient from "@/services/ApiClient";

const schema = z.object({
  id: z.string().uuid(),
  name: LocalizedStringSchema,
  description: LocalizedStringSchema,
  tos: LocalizedStringSchema.optional(),
  imageUrl: z.string(),
  state: z.enum(["public", "private"]),
  price: z.array(ServicePriceSchema),
  categoryId: z.string().uuid(),
  properties: z.array(z.union([
    z.object({
      id: z.string().uuid(),
      type: z.literal("text"),
      name: LocalizedStringSchema,
      options: z.array(LocalizedStringSchema),
    }),
    z.object({
      id: z.string().uuid(),
      type: z.literal("number"),
      name: LocalizedStringSchema,
      options: z.array(z.number()),
    }),
  ])),
  supportedPaymentMethods: z.array(z.string().uuid()),
});

const resolver = zodResolver(schema);
export type ServiceCreateForm = z.infer<typeof schema>

export async function loader({ params }: LoaderFunctionArgs) {
  const serviceId = params.id!;
  const paymentMethods = await apiClient.getPaymentMethods();
  const categories = await apiClient.getCategories();
  const currencies = await apiClient.getCurrencies();
  const service = await apiClient.getServiceById(serviceId);

  return typedjson({
    paymentMethods: paymentMethods,
    categories: categories,
    currencies: currencies,
    service: service,
  });
}

export async function action({ request, params }: ActionFunctionArgs) {
  const serviceId = params.id!;

  const {
    receivedValues: defaultValues,
    errors,
    data,
  } = await getValidatedFormData<ServiceCreateForm>(request, resolver);

  if (errors) {
    console.error(errors);
    return json({ errors, defaultValues });
  }
  const result = await apiClient.updateService(serviceId, data);

  return json({ ok: true });
}

export default function ServicesCreate() {
  const lang = "en";
  const fetcher = useFetcher();
  const { paymentMethods, categories, currencies, service } = useTypedLoaderData<typeof loader>();
  const { handleSubmit, register, ...rest } = useRemixForm<ServiceCreateForm>({
    resolver: resolver,
    defaultValues: {
      ...service,
    },
    submitHandlers: {
      onInvalid: errors => console.error(errors),
    },
  });

  return (
    <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
      <RemixFormProvider register={register} handleSubmit={handleSubmit} {...rest}>
        <fetcher.Form
          method="POST"
          onSubmit={handleSubmit}
        >
          <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
            <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
              <div className="flex items-center gap-4">
                <Link to="/store/services">
                  <Button variant="outline" size="icon" className="h-7 w-7">
                    <ChevronLeft className="h-4 w-4" />
                    <span className="sr-only">Back</span>
                  </Button>
                </Link>

                <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                  Editing Service: {service.name[lang] || ""}
                </h1>
                <Badge variant="outline" className="ml-auto sm:ml-0">
                  Draft
                </Badge>
                <div className="hidden items-center gap-2 md:ml-auto md:flex">
                  <Button variant="outline" size="sm">
                    Discard
                  </Button>
                  <Button size="sm" type="submit">Save</Button>
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                  <Card>
                    <CardHeader>
                      <CardTitle>Service Details</CardTitle>
                      <CardDescription>
                        Fill out all information about this service
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
                          <Label htmlFor="description">Terms of service</Label>
                          <LocalizedTextarea
                            id="tos"
                            register={register}
                            formName="tos"
                            className="min-h-32"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                  <ServicePropertiesEditor />
                  <PaymentMethodCard paymentMethods={paymentMethods} />
                  <CategoryCard categories={categories} />
                </div>
                <div className="grid auto-rows-max items-start gap-4 lg:gap-8">
                  <ServiceStatusCard />
                  <PriceCard currencies={currencies} />
                  <HeaderImageCard />
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 md:hidden">
                <Button variant="outline" size="sm">
                  Discard
                </Button>
                <Button size="sm" type="submit">Save</Button>
              </div>
            </div>
          </main>
        </fetcher.Form>
      </RemixFormProvider>
    </div>
  );
}


function CategoryCard({ categories }: {
  categories: Category[]
}) {
  const code = "en";
  const { control } = useFormContext<ServiceCreateForm>();
  return (
    <Card>
      <CardHeader>
        <CardTitle>Service Category</CardTitle>
        <CardDescription>
          Select the category that this service belongs to.
        </CardDescription>
      </CardHeader>
      <CardContent className="grid gap-6">
        <FormField
          name="categoryId"
          control={control}
          render={({ field }) => (
            <FormItem>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Select a cetegory" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {categories.map((category, index) => {
                    return <SelectItem key={category.id} value={category.id}>{category.name[code]}</SelectItem>;
                  })}
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>)} />
      </CardContent>
    </Card>
  );
}

function PriceCard({ currencies }: {
  currencies: Currency[]
}) {
  const code = "en";
  const { control, register, watch } = useFormContext<ServiceCreateForm>();
  const priceFieldArray = useFieldArray({
    name: "price",
    control: control,
  });

  return <Card>
    <CardHeader>
      <CardTitle>Service Price</CardTitle>
      <CardDescription>
        Specify the price of the service in one or more currencies
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <div className="flex flex-col">
            {priceFieldArray.fields.map((field, index) => {
              return <section key={field.id} className="flex flex-row gap-2 mb-4">
                <Input type="number" {...register(`price.${index}.amount`)} />
                <FormField
                  name={`price.${index}.currencyId`}
                  control={control}
                  render={({ field }) => {
                    return <FormItem>
                      <Select onValueChange={field.onChange} value={field.value}>
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="USD" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {currencies.map((currency, index) => {
                            return <SelectItem
                              key={currency.id}
                              value={currency.id}>
                              {currency.code}
                            </SelectItem>;
                          })}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>;
                  }}
                />
                <Button
                  type="button"
                  onClick={() => {
                    priceFieldArray.remove(index);
                  }}
                  variant="destructive" size="icon" className="p-2">
                  <Trash className="w-4" />
                </Button>
              </section>;
            })}
            <Button type="button" onClick={() => {
              // Relax the type for currency id to accept an empty string
              const currency = currencies.at(0)!;
              priceFieldArray.append({ amount: 0, currencyId: currency.id });
            }}>
              <CirclePlus className="w-4 me-2" />Add Price
            </Button>
          </div>
        </div>
      </div>
    </CardContent>
  </Card>;
}

function ServiceStatusCard() {
  const { control } = useFormContext<ServiceCreateForm>();

  return <Card>
    <CardHeader>
      <CardTitle>Service Status</CardTitle>
      <CardDescription>
        Select whether to make the service availble to the users to purchase or keep it hidden.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-6">
        <div className="grid gap-3">
          <Label htmlFor="status">Status</Label>
          <FormField
            name="state"
            control={control}
            render={({ field }) => {
              return <FormItem>
                <Select onValueChange={field.onChange} value={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select a status" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    {ServiceStateSchema.options.map((state) => {
                      return <SelectItem key={state} value={state}>{state}</SelectItem>;
                    })}
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>;
            }}
          />
        </div>
      </div>
    </CardContent>
  </Card>;
}

function HeaderImageCard() {
  const { register } = useFormContext<ServiceCreateForm>();
  const [selectedImage, setSelectedImage] = useState<string>("");

  return <Card
    className="overflow-hidden"
  >
    <CardHeader>
      <CardTitle>Header Image</CardTitle>
      <CardDescription>
        Image to be shown to the users in the application
        whenever the service is displayed.
      </CardDescription>
    </CardHeader>
    <CardContent>
      <div className="grid gap-2">
        <FileUploadInput onChange={(value) => setSelectedImage(value)} />
        {selectedImage !== "" &&
          <Input {...register("imageUrl")} value={selectedImage} className="hidden" />}
      </div>
    </CardContent>
  </Card>;
}

function PaymentMethodCard({ paymentMethods }: {
  paymentMethods: PaymentMethod[]
}) {
  const lang = "en";
  const { control, watch } = useFormContext<ServiceCreateForm>();
  const paymentMethodsOptions = useMemo(() => {
    return paymentMethods.map(paymentMethod => ({
      label: paymentMethod.name[lang],
      value: paymentMethod.id,
      disable: !paymentMethod.enabled,
    }));
  }, []);

  return <Card>
    <CardHeader>
      <CardTitle>Payment Method</CardTitle>
      <CardDescription>
        Select the supported payment methods to purchase this service
      </CardDescription>
    </CardHeader>
    <CardContent className="grid gap-6">
      <div className="grid gap-6">
        <div className="grid gap-3">
          <FormField
            control={control}
            name="supportedPaymentMethods"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <MultipleSelector
                    value={renderMultiSelectValues(paymentMethodsOptions, field.value)}
                    onChange={(data) => field.onChange(data.map(it => it.value))}
                    defaultOptions={paymentMethodsOptions}
                    placeholder="Select from the following..."
                    emptyIndicator={
                      <p className="text-center text-lg leading-10 text-gray-600 dark:text-gray-400">
                        no results found.
                      </p>
                    }
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
      </div>
    </CardContent>
  </Card>;
}

function renderMultiSelectValues(options: Option[], value: string[]) {
  if (value && value.length == 0) {
    return [];
  }
  if (value) {
    return options.filter(it => value.includes(it.value));
  }
  return [];
}