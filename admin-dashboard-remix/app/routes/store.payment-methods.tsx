import { PaymentMethod } from "@/domain/models/PaymentMethod";
import { ActionFunctionArgs, json } from "@remix-run/node";
import { FetcherWithComponents, Link, useFetcher, useLoaderData } from "@remix-run/react";
import { Button } from "@/components/ui/button";
import { MoreHorizontal, PlusCircle } from "lucide-react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import React from "react";
import { Table, TableBody, TableCell, TableHeader, TableRow } from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import apiClient from "@/services/ApiClient";
import { Badge } from "@/components/ui/badge";

export async function loader() {
  const paymentMethods = await apiClient.getPaymentMethods();
  return json({
    paymentMethods: paymentMethods,
  });
}

export default function StorePaymentMethods() {
  const { paymentMethods } = useLoaderData<typeof loader>();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <Link to="create">
                <Button size="sm" className="h-7 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Payment Method</span>
                </Button>
              </Link>
            </div>
          </div>
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Payment Methods</CardTitle>
              <CardDescription>
                An overview of your application users accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <PaymentMethodTable data={paymentMethods} />
            </CardContent>
            <CardFooter>
              <div className="text-xs text-muted-foreground">
                Showing <strong>1-10</strong> of <strong>32</strong>{" "}
                PaymentMethods
              </div>
            </CardFooter>
          </Card>
        </main>
      </div>
    </div>
  );
}


const PaymentMethodTable = ({ data }: { data: PaymentMethod[] }) => {
  const fetcher = useFetcher();
  return <Table>
    <TableHeader>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell>Description</TableCell>
        <TableCell>Additional Information</TableCell>
        <TableCell>State</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map((item, idx) => renderRow(item, idx, fetcher))}
    </TableBody>
  </Table>;
};

const renderRow = (paymentMethod: PaymentMethod, index: number, fetcher: FetcherWithComponents<any>) => {
  const code = "en";

  return (
    <TableRow key={index}>
      <TableCell>{paymentMethod.name[code]}</TableCell>
      <TableCell>{paymentMethod.description[code]}</TableCell>
      <TableCell>{paymentMethod.additionalInformation ? paymentMethod.additionalInformation[code] : "-"}</TableCell>
      <TableCell>
        <Badge variant="default">{paymentMethod.enabled ? "Enabled" : "Disabled"}</Badge>
      </TableCell>
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
            <Link to={`/store/payment-methods/${paymentMethod.id}/edit`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <fetcher.Form method="delete" action={`/store/payment-methods/${paymentMethod.id}/delete`}>
              <DropdownMenuItem>
                <button type="submit">Delete</button>
              </DropdownMenuItem>
            </fetcher.Form>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};


export async function action(args: ActionFunctionArgs) {

}
