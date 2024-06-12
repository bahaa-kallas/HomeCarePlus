import { json } from "@remix-run/node";
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
import { Input } from "@/components/ui/input";
import { Category } from "@/domain/models/Category";
import apiClient from "@/services/ApiClient";

export async function loader() {
  const categories = await apiClient.getCategories();

  return json({
    categories: categories,
  });
}

export default function StoreCategories() {
  const { categories } = useLoaderData<typeof loader>();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <Link to="create">
                <Button size="sm" className="h-7 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add Category</span>
                </Button>
              </Link>
            </div>
          </div>
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Categories</CardTitle>
              <CardDescription>
                An overview of available service categories.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <CategoryTable data={categories} />
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


const CategoryTable = ({ data }: { data: Category[] }) => {
  const fetcher = useFetcher();
  return <Table>
    <TableHeader>
      <TableRow>
        <TableCell>Name</TableCell>
        <TableCell className="text-end">Actions</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.length > 0 && data.map((item, idx) => renderCategoryRow(item, idx, fetcher))}
    </TableBody>
  </Table>
}

const renderCategoryRow = (category: Category, index: number, fetcher: FetcherWithComponents<any>) => {
  const code = "en"; // Default language code, you can adjust as needed

  return (
    <TableRow key={index}>
      <TableCell>{category.name[code]}</TableCell>
      <TableCell className="text-end">
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
            <Link to={`/store/categories/${category.id}/edit`}>
              <DropdownMenuItem>Edit</DropdownMenuItem>
            </Link>
            <fetcher.Form method="delete" action={`/store/categories/${category.id}/delete`}>
              <DropdownMenuItem>
                <Input className="hidden" type="hidden" name="id" value={category.id} />
                <button type="submit">Delete</button>
              </DropdownMenuItem>
            </fetcher.Form>
          </DropdownMenuContent>
        </DropdownMenu>
      </TableCell>
    </TableRow>
  );
};

