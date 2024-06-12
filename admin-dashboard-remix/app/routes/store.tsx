import { BoxIcon, CreditCard, Filter, ShoppingCart } from "lucide-react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { Link, Outlet, useLocation } from "@remix-run/react";
import React from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";


export default function Store() {
  const location = useLocation();
  const isIndex = location.pathname == "/store";
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 relative">
      <StoreNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {isIndex ? <Index /> : <Outlet />}
        </main>
      </div>
    </div>
  );
}

function Index() {
  return <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl font-bold mb-4">Welcome to Store Hub</h1>
    <p className="text-lg mb-8 px-4 text-center">
      To get started, with building your online services store, you can create services and categories and enable
      payment methods.
    </p>
    <div className="flex flex-col md:flex-row gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Services</CardTitle>
          <CardDescription>
            Add, edit, and remove services from your store catalog.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/store/services">
            <Button size="sm" variant="secondary">
              Creates Services Now 🪄
            </Button>
          </Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Service Categories</CardTitle>
          <CardDescription>
            Organize your products into categories for easier navigation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/store/categories">
            <Button size="sm" variant="secondary">
              Orginaze Services Now 🚀
            </Button>
          </Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Payment Methods</CardTitle>
          <CardDescription>
            Manage and update payment methods for your online store.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/marketing/push-notifications">
            <Button size="sm" variant="secondary">
              Add Payment Methods 🚀
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  </div>;
}

const menuItems = [
  {
    icon: BoxIcon,
    label: "Services",
    to: "/store/services",
  },
  {
    icon: ShoppingCart,
    label: "Orders",
    to: "/store/orders",
  },
  {
    icon: Filter,
    label: "Categories",
    to: "/store/categories",
  },
  {
    icon: CreditCard,
    label: "Payment Methods",
    to: "/store/payment-methods",
  },
];

function StoreNav() {
  // implement active style based on current link
  return <aside className="absolute inset-y-0 left-0 z-10 w-14 flex-col border-r bg-background sm:flex">
    <nav className="flex flex-col items-center gap-4 px-2 py-4">
      {menuItems.map((item, index) => {
        return <Tooltip key={index}>
          <TooltipTrigger asChild>
            <Link
              to={item.to}
              className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
            >
              <item.icon className="h-5 w-5" />
              <span className="sr-only">{item.label}</span>
            </Link>
          </TooltipTrigger>
          <TooltipContent side="right">{item.label}</TooltipContent>
        </Tooltip>;
      })}
    </nav>
  </aside>;
}