import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { FetcherWithComponents, Link, useFetcher } from "@remix-run/react";
import React from "react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Service } from "@/domain/services/Service";
import apiClient from "@/services/ApiClient";


export async function loader() {
  const services = await apiClient.getServices();

  return typedjson({
    services: services,
  });
}

export default function Services() {
  const { services } = useTypedLoaderData<typeof loader>();
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <Link to="create">
                <Button size="sm" className="h-7 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">New Service</span>
                </Button>
              </Link>
            </div>
          </div>
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Services</CardTitle>
              <CardDescription>
                An overview of your store catlog of services
              </CardDescription>
            </CardHeader>
            <CardContent>
              <ServiceTable data={services} />
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                Users
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}


const renderRow = (service: Service, index: number, fetcher: FetcherWithComponents<any>) => {
  const lang = "en";

  return <TableRow key={index}>
    <TableCell>{service.name[lang]}</TableCell>
    <TableCell>{service.createdAt.toLocaleString()}</TableCell>
    <TableCell><Badge>{service.state}</Badge></TableCell>
    <TableCell>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button
            aria-haspopup="true"
            size="icon"
            variant="ghost"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Toggle menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <DropdownMenuLabel>Actions</DropdownMenuLabel>
          <Link to={`/store/services/${service.id}/edit`}>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </Link>

          <fetcher.Form method="delete" action={`/store/services/${service.id}/delete`}>
            <DropdownMenuItem>
              <button type="submit">Delete</button>
            </DropdownMenuItem>
          </fetcher.Form>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>;
};

const ServiceTable = ({ data }: { data: Service[] }) => {
  const fetcher = useFetcher();

  return <Table>
    <TableHeader>
      <TableRow>
        <TableCell>Service Name</TableCell>
        <TableCell>Creation Date</TableCell>
        <TableCell>State</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((item, idx) => renderRow(item, idx, fetcher))}
    </TableBody>
  </Table>;
};
