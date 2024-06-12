import { ChevronLeft, CircleX } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Form, json, Link, redirect } from "@remix-run/react";
import { getValidatedFormData, RemixFormProvider, useRemixForm } from "remix-hook-form";
import { ActionFunctionArgs, LoaderFunctionArgs } from "@remix-run/node";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import FileUploadInput from "@/components/file-upload-input";
import { FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import LocalizedInput from "@/components/localized-input";
import LocalizedStringSchema from "@/domain/models/LocalizedString";
import LocalizedTextarea from "@/components/localized-textarea";

const schema = z.object({
  title: LocalizedStringSchema,
  description: z.string(),
  images: z.array(z.string()).min(1).max(5),
  targetLink: z.string().url().or(z.literal("").transform(() => null)),
  location: z.string(),
  state: z.enum(["private", "public"]),
}).partial();

const resolver = zodResolver(schema);
type AdEditForm = z.infer<typeof schema>;

export function loader({ params }: LoaderFunctionArgs) {
  const adId = params.id;

  if (!adId) {
    throw redirect("/404");
  }

  // TODO fetch from the database

  // const adLocations = await apiClient.getAdLocations();
  // const ad = await apiClient.getAdById(adId);

  return typedjson({
    ad: {
      id: "1",
      title: {
        ar: "Hellom",
        en: "Hello",
      },
      description: "Ad Description 1",
      images: ["/uploads/uploadedMedia-1714767117560.png"],
      targetLink: "https://example.com/ad1",
      location: { name: { en: "Home Banner" }, locationId: "banner" },
      state: "private" as const,
      createdAt: new Date(),
    },
    adLocations: [
      { name: { en: "Home Banner" }, locationId: "banner" },
    ],
  });
}


export default function MarketingAdEdit() {
  const { ad, adLocations } = useTypedLoaderData<typeof loader>();
  const [selectedImages, setSelectedImages] = useState<string[]>(ad.images);
  const { handleSubmit, register, ...formRest } = useRemixForm<AdEditForm>({
    resolver,
    defaultValues: {
      title: ad.title,
      description: ad.description,
      images: ad.images,
      targetLink: ad.targetLink,
      location: ad.location.locationId,
      state: ad.state,
    },
  });

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <RemixFormProvider register={register} handleSubmit={handleSubmit} {...formRest}>
            <Form
              method="POST"
              onSubmit={handleSubmit}
            >
              <div className="mx-auto grid max-w-[59rem] flex-1 auto-rows-max gap-4">
                <div className="flex items-center gap-4">
                  <Link to={"/marketing/ads"}>
                    <Button variant="outline" size="icon" className="h-7 w-7">
                      <ChevronLeft className="h-4 w-4" />
                      <span className="sr-only">Back</span>
                    </Button>
                  </Link>
                  <h1 className="flex-1 shrink-0 whitespace-nowrap text-xl font-semibold tracking-tight sm:grow-0">
                    Edit Advertisment
                  </h1>
                  <div className="hidden items-center gap-2 md:ml-auto md:flex">
                    <Link to={"/marketing/ads"}>
                      <Button variant="outline" size="sm">
                        Discard
                      </Button>
                    </Link>
                    <Button size="sm" type="submit">
                      Save
                    </Button>
                  </div>
                </div>
                <div className="grid gap-4 md:grid-cols-[1fr_250px] lg:grid-cols-3 lg:gap-8">
                  <div className="grid auto-rows-max items-start gap-4 lg:col-span-2 lg:gap-8">
                    <Card x-chunk="dashboard-07-chunk-0">
                      <CardHeader>
                        <CardTitle>Ad Details</CardTitle>
                        <CardDescription>
                          Please fill in the details of the ad
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <Label htmlFor="name">Title</Label>
                            <LocalizedInput
                              className="w-full"
                              type="text"
                              id="name"
                              register={register}
                              formName="title" />
                          </div>
                          <div className="grid gap-3">

                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="description">Description</Label>
                            <LocalizedTextarea
                              register={register}
                              formName="description"
                              id="description"
                              className="min-h-32"
                            />
                          </div>
                          <div className="grid gap-3">
                            <FormField
                              {...register("location")}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Advertisment location</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <SelectTrigger id="location">
                                      <SelectValue placeholder="Select a location in the app to show your ad" />
                                    </SelectTrigger>
                                    <SelectContent>
                                      {adLocations.map((location) => (
                                        <SelectItem key={location.locationId}
                                                    value={location.locationId}>{location.name.en}</SelectItem>
                                      ))}
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                          <div className="grid gap-3">
                            <Label htmlFor="targetLink">Target Link</Label>
                            <Input
                              id="targetLink"
                              {...register("targetLink")}
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
                        <CardTitle>Ad Status</CardTitle>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-6">
                          <div className="grid gap-3">
                            <FormField
                              {...register("state")}
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel>Status</FormLabel>
                                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                                    <FormControl>
                                      <SelectTrigger id="status">
                                        <SelectValue placeholder="Select status" />
                                      </SelectTrigger>
                                    </FormControl>
                                    <SelectContent>
                                      <SelectItem value="private">Private</SelectItem>
                                      <SelectItem value="public">Public</SelectItem>
                                    </SelectContent>
                                  </Select>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                    <Card
                      className="overflow-hidden"
                      x-chunk="dashboard-07-chunk-4"
                    >
                      <CardHeader>
                        <CardTitle>Ad Images</CardTitle>
                        <CardDescription>
                          Images to be shown to the users in the application
                          whenever the ad is displayed.
                        </CardDescription>
                      </CardHeader>
                      <CardContent>
                        <div className="grid gap-2">
                          <div className="grid grid-cols-3 gap-2">
                            {selectedImages.map((value) => {
                              return <div className="relative aspect-square w-full rounded-md object-cover">
                                <button className="absolute">
                                  <CircleX size="16px"
                                           onClick={() => setSelectedImages(selectedImages.filter(it => it != value))} />
                                </button>
                                <img
                                  className="object-cover"
                                  alt="uploaded image"
                                  height="84"
                                  width="84"
                                  src={value}
                                />
                              </div>;
                            })}
                          </div>
                          <FileUploadInput onChange={(value) => setSelectedImages([...selectedImages, value])} />
                          {selectedImages.map((url, idx) => <Input {...register(`images.${idx}`)} value={url}
                                                                   className="hidden" />)}
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
                <div className="flex items-center justify-center gap-2 md:hidden">
                  <Link to={"/marketing/ads"}>
                    <Button variant="outline" size="sm">
                      Discard
                    </Button>
                  </Link>
                  <Button size="sm" type="submit">
                    Save
                  </Button>
                </div>
              </div>
            </Form>
          </RemixFormProvider>
        </main>
      </div>
    </div>
  );
}

export async function action({ request, params }: ActionFunctionArgs) {
  const adId = params.id;
  if (!adId) {
    return redirect("/404");
  }

  const {
    receivedValues: defaultValues,
    errors,
    data,
  } = await getValidatedFormData<AdEditForm>(request, resolver);

  if (errors) {
    console.log(errors);
    return json({ errors, defaultValues });
  }

  console.log(data);

  /*
  const { title, description, images, location, state } = data;
  const result = await apiClient.updateAd(adId, {
    title,
    description,
    images,
    location,
    state,
  });
  */

  return redirect("/marketing/ads");
}