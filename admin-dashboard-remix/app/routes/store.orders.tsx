import { ExternalLink, ListFilter } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Link, Outlet, useParams } from "@remix-run/react";
import { LoaderFunctionArgs } from "@remix-run/node";
import { typedjson, useTypedLoaderData } from "remix-typedjson";
import { Order } from "@/domain/models/Order";
import apiClient from "@/services/ApiClient";
import { User } from "@/domain/models/User";
import { Service } from "@/domain/services/Service";
import { PaymentMethod } from "@/domain/models/PaymentMethod";
import { Currency } from "@/domain/models/Currency";


type AugmentedOrder = Order & {
  user: User;
  service: Service;
  currency: Currency;
  paymentMethod: PaymentMethod;
}

export async function loader(args: LoaderFunctionArgs) {
  const orders = await apiClient.getOrders();
  const augmentedOrders: AugmentedOrder[] = [];
  for (const order of orders) {
    augmentedOrders.push(
      {
        ...order,
        user: await apiClient.getUserById(order.userId),
        service: await apiClient.getServiceById(order.serviceId),
        currency: await apiClient.getCurrencyById(order.totalPrice.currencyId),
        paymentMethod: await apiClient.getPaymentMethodById(order.paymentMethodId),
      },
    );
  }
  return typedjson({
    orders: augmentedOrders,
  });
}

export default function StoreOrders() {
  const { orders } = useTypedLoaderData<typeof loader>();

  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40">
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8 lg:grid-cols-3 xl:grid-cols-3">
          <div className="grid auto-rows-max items-start gap-4 md:gap-8 lg:col-span-2">
            <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-2 xl:grid-cols-4">
              <Card
                className="sm:col-span-2" x-chunk="dashboard-05-chunk-0"
              >
                <CardHeader className="pb-3">
                  <CardTitle>Store Orders</CardTitle>
                  <CardDescription className="max-w-lg text-balance leading-relaxed">
                    Dynamic Orders Dashboard for Seamless
                    Management and Insightful Analysis.
                  </CardDescription>
                </CardHeader>
              </Card>
              <Card x-chunk="dashboard-05-chunk-1">
                <CardHeader className="pb-2">
                  <CardDescription>This Week</CardDescription>
                  <CardTitle className="text-4xl">$1,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +25% from last week
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={25} aria-label="25% increase" />
                </CardFooter>
              </Card>
              <Card x-chunk="dashboard-05-chunk-2">
                <CardHeader className="pb-2">
                  <CardDescription>This Month</CardDescription>
                  <CardTitle className="text-4xl">$5,329</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="text-xs text-muted-foreground">
                    +10% from last month
                  </div>
                </CardContent>
                <CardFooter>
                  <Progress value={12} aria-label="12% increase" />
                </CardFooter>
              </Card>
            </div>
            <Tabs defaultValue="week">
              <div className="flex items-center">
                <TabsList>
                  <TabsTrigger value="week">Week</TabsTrigger>
                  <TabsTrigger value="month">Month</TabsTrigger>
                  <TabsTrigger value="year">Year</TabsTrigger>
                </TabsList>
                <div className="ml-auto flex items-center gap-2">
                  <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                      <Button
                        variant="outline"
                        size="sm"
                        className="h-7 gap-1 text-sm"
                      >
                        <ListFilter className="h-3.5 w-3.5" />
                        <span className="sr-only sm:not-sr-only">Filter</span>
                      </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                      <DropdownMenuLabel>Filter by</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <DropdownMenuCheckboxItem checked>
                        Fulfilled
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Declined
                      </DropdownMenuCheckboxItem>
                      <DropdownMenuCheckboxItem>
                        Refunded
                      </DropdownMenuCheckboxItem>
                    </DropdownMenuContent>
                  </DropdownMenu>
                </div>
              </div>
              <TabsContent value="week">
                <Card x-chunk="dashboard-05-chunk-3">
                  <CardHeader className="px-7">
                    <CardTitle>Orders</CardTitle>
                    <CardDescription>
                      Recent orders from your store.
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <OrderList data={orders} />
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
          <div>
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}


function OrderList({ data }: { data: AugmentedOrder[] }) {

  const params = useParams();

  function renderRow(order: AugmentedOrder, idx: number) {
    const isActive = params.id == order.id;

    return <TableRow key={order.id} className={isActive ? "bg-accent" : ""}>
      <TableCell>
        <div className="font-medium">{order.user.name}</div>
        <div className="hidden text-sm text-muted-foreground md:inline">
          {order.user.email}
        </div>
      </TableCell>
      <TableCell className="hidden sm:table-cell">
        <Badge className="text-xs" variant="secondary">
          {order.state}
        </Badge>
      </TableCell>
      <TableCell className="hidden md:table-cell">
        {order.createdAt}
      </TableCell>
      <TableCell className="text-end">{`${order.currency.code} ${order.totalPrice.amount}`}</TableCell>
      <TableCell className="text-end">
        <Link to={`/store/orders/${order.id}/details`}>
          <Button variant="outline" size="sm">
            Open <ExternalLink className="ms-2 w-4" />
          </Button>
        </Link>
      </TableCell>
    </TableRow>;
  }

  return <Table>
    <TableHeader>
      <TableRow>
        <TableHead>Customer</TableHead>
        <TableHead className="hidden sm:table-cell">
          Status
        </TableHead>
        <TableHead className="hidden md:table-cell">
          Date
        </TableHead>
        <TableHead className="text-right">Amount</TableHead>
      </TableRow>
    </TableHeader>
    <TableBody>
      {data.map(renderRow)}
    </TableBody>
  </Table>;
}