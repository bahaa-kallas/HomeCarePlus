import { MoreHorizontal, PlusCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import { Link, useFetcher } from "@remix-run/react";
import { Ad } from "@/domain/models/Ad";
import { LoaderFunctionArgs } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import React from "react";
import { Input } from "@/components/ui/input";

export async function loader({ request }: LoaderFunctionArgs) {
  // TODO fetch ads from the backend
  const mockedAds: Ad[] = [
    {
      id: "1",
      title: "Ad Title 1",
      description: "Ad Description 1",
      images: ["https://example.com/image1.jpg"],
      targetLink: "https://example.com/ad1",
      location: { name: { en: "Location", ar: "" }, type: "banner", uniqueIdentifier: "home-banner-1" },
      state: "private",
      createdAt: new Date(),
    },
    {
      id: "2",
      title: "Ad Title 2",
      description: "Ad Description 2",
      images: ["https://example.com/image2.jpg"],
      targetLink: "https://example.com/ad2",
      location: { name: { en: "Location", ar: "" }, type: "banner", uniqueIdentifier: "home-banner-1" },
      state: "public",
      createdAt: new Date(),
    },
    {
      id: "3",
      title: "Ad Title 3",
      description: "Ad Description 3",
      images: ["https://example.com/image3.jpg"],
      targetLink: "https://example.com/ad3",
      location: { name: { en: "Location", ar: "" }, type: "banner", uniqueIdentifier: "home-banner-1" },
      state: "private",
      createdAt: new Date(),
    },
    {
      id: "4",
      title: "Ad Title 4",
      description: "Ad Description 4",
      images: ["https://example.com/image4.jpg"],
      targetLink: "https://example.com/ad4",
      location: { name: { en: "Location", ar: "" }, type: "banner", uniqueIdentifier: "home-banner-1" },
      state: "public",
      createdAt: new Date(),
    },
    {
      id: "5",
      title: "Ad Title 5",
      description: "Ad Description 5",
      images: ["https://example.com/image5.jpg"],
      targetLink: "https://example.com/ad5",
      location: { name: { en: "Location", ar: "" }, type: "banner", uniqueIdentifier: "home-banner-1" },
      state: "private",
      createdAt: new Date(),
    },
  ];
  return typedjson({
    ads: mockedAds,
  });
}

export default function Ads() {
  const { ads } = useTypedLoaderData<typeof loader>();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <Tabs defaultValue="all">
            <div className="flex items-center">
              <div className="ml-auto flex items-center gap-2">
                <Link to="create">
                  <Button size="sm" className="h-7 gap-1">
                    <PlusCircle className="h-3.5 w-3.5" />
                    <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">
                      Create Add
                    </span>
                  </Button>
                </Link>
              </div>
            </div>
            <TabsContent value="all">
              <Card x-chunk="dashboard-06-chunk-0">
                <CardHeader>
                  <CardTitle>Ads</CardTitle>
                  <CardDescription>
                    Manage your Ads and view their sales performance.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <AdsTable data={ads} />
                </CardContent>
                <CardFooter>
                  <div className="text-xs text-muted-foreground">
                    Showing <strong>1-10</strong> of <strong>32</strong> Ads
                  </div>
                </CardFooter>
              </Card>
            </TabsContent>
          </Tabs>
        </main>
      </div>
    </div>
  );
}


const AdsTable = ({ data }: { data: Ad[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableCell>Title</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Creation Date</TableCell>
        <TableCell>Status</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>{data.map((ad, index) => renderRow(ad, index))}</TableBody>
  </Table>
);

const renderRow = (ad: Ad, index: number) => {
  const fetcher = useFetcher();
  return (
    <TableRow key={index}>
      <TableCell>{ad.title}</TableCell>
      <TableCell>{ad.description}</TableCell>
      <TableCell>{ad.createdAt.toLocaleDateString()}</TableCell>
      <TableCell>
        <Badge variant={ad.state === "private" ? "secondary" : "default"}>
          {ad.state}
        </Badge>
      </TableCell>
      <TableCell>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-haspopup="true" size="icon" variant="ghost">
              <MoreHorizontal className="h-4 w-4" />
              <span className="sr-only">Toggle menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem>
              <Link to={`/marketing/ads/${ad.id}/edit`}>Edit</Link>
            </DropdownMenuItem>
            <fetcher.Form method="delete" action="/marketing/ads/delete">
              <DropdownMenuItem>
                <Input className="hidden" type="hidden" name="id" value={ad.id} />
                <button type="submit">Delete</button>
              </DropdownMenuItem>
            </fetcher.Form>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};