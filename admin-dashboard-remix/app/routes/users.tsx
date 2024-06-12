import { MoreHorizontal, PlusCircle } from "lucide-react";
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

import { Link, useFetcher } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { User } from "@/domain/models/User";
import { Input } from "@/components/ui/input";
import React from "react";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Badge } from "@/components/ui/badge";
import getMockedUsers from "@/domain/mocks/user-mocks";

export async function loader(args: LoaderFunctionArgs) {
  return typedjson({
    users: getMockedUsers(),
  });
}

export default function Users() {
  const { users } = useTypedLoaderData();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          <div className="flex items-center">
            <div className="ml-auto flex items-center gap-2">
              <Link to="create">
                <Button size="sm" className="h-7 gap-1">
                  <PlusCircle className="h-3.5 w-3.5" />
                  <span className="sr-only sm:not-sr-only sm:whitespace-nowrap">Add User</span>
                </Button>
              </Link>
            </div>
          </div>
          <Card x-chunk="dashboard-06-chunk-0">
            <CardHeader>
              <CardTitle>Users</CardTitle>
              <CardDescription>
                An overview of your application users accounts
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UserTable data={users} />
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


const UserTable = ({ data }: { data: User[] }) => (
  <Table>
    <TableHeader>
      <TableRow>
        <TableCell>Full Name</TableCell>
        <TableCell>Email</TableCell>
        <TableCell>Creation Date</TableCell>
        <TableCell>User Type</TableCell>
        <TableCell>Actions</TableCell>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map(renderRow)}
    </TableBody>
  </Table>
);

const renderRow = (user: User, index: number) => {
  const fetcher = useFetcher();

  return <TableRow key={index}>
    <TableCell>{user.name}</TableCell>
    <TableCell>{user.email}</TableCell>
    <TableCell>{user.createdAt.toLocaleDateString()}</TableCell>
    <TableCell><Badge>{user.type}</Badge></TableCell>
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
          <Link to={`/users/${user.id}/edit`}>
            <DropdownMenuItem>Edit</DropdownMenuItem>
          </Link>

          <fetcher.Form method="delete" action="/marketing/ads/delete">
            <DropdownMenuItem>
              <Input className="hidden" type="hidden" name="id" value={user.id} />
              <button type="submit">Delete</button>
            </DropdownMenuItem>
          </fetcher.Form>
        </DropdownMenuContent>
      </DropdownMenu>
    </TableCell>
  </TableRow>;
};