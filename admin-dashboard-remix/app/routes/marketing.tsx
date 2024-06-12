import { BadgeDollarSign, Megaphone, Settings } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Link, Outlet, useLocation } from "@remix-run/react";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import React from "react";

export default function Marketing() {
  const location = useLocation();
  const isIndex = location.pathname == "/marketing";
  return (
    <div className="flex min-h-screen w-full flex-col bg-muted/40 relative">
      <MarketingNav />
      <div className="flex flex-col sm:gap-4 sm:py-4 sm:pl-14">
        <main className="grid flex-1 items-start gap-4 p-4 sm:px-6 sm:py-0 md:gap-8">
          {isIndex ? <Index /> : <Outlet />}
        </main>
      </div>
    </div>
  );
}

const navItems = [
  {
    label: "Push Notifications",
    icon: Megaphone,
    to: "/marketing/push-notifications",
  },
  {
    label: "Advertisments",
    icon: BadgeDollarSign,
    to: "/marketing/ads",
  },
];

function MarketingNav() {
  return <aside className="absolute inset-y-0 left-0 z-10 w-14 flex-col border-r bg-background sm:flex">
    <nav className="flex flex-col items-center gap-4 px-2 py-4">
      {navItems.map((item, index) => {
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
    <nav className="mt-auto flex flex-col items-center gap-4 px-2 py-4">
      <Tooltip>
        <TooltipTrigger asChild>
          <Link
            to="#"
            className="flex h-9 w-9 items-center justify-center rounded-lg text-muted-foreground transition-colors hover:text-foreground md:h-8 md:w-8"
          >
            <Settings className="h-5 w-5" />
            <span className="sr-only">Settings</span>
          </Link>
        </TooltipTrigger>
        <TooltipContent side="right">Settings</TooltipContent>
      </Tooltip>
    </nav>
  </aside>;
}


function Index() {

  return <div className="flex flex-col items-center justify-center h-screen">
    <h1 className="text-4xl font-bold mb-4">Welcome to Marketing Hub</h1>
    <p className="text-lg mb-8 px-4 text-center">
      To get started, with marketing your products or services, you can create ads or send push notifications to your
      users.
    </p>
    <div className="flex flex-col md:flex-row gap-4">
      <Card>
        <CardHeader>
          <CardTitle>Ads Creation</CardTitle>
          <CardDescription>
            Create engaging ads for your products or services.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/marketing/ads">
            <Button size="sm" variant="secondary">
              Creates Ads Now 🪄
            </Button>
          </Link>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Push Notifications</CardTitle>
          <CardDescription>
            Send targeted notifications to your users.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Link to="/marketing/push-notifications">
            <Button size="sm" variant="secondary">
              Send Notifications 🚀
            </Button>
          </Link>
        </CardContent>
      </Card>
    </div>
  </div>;

}
