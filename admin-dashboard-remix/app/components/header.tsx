import { LaptopIcon, MobileIcon, MoonIcon, SunIcon } from "@radix-ui/react-icons";
import { Form, NavLink } from "@remix-run/react";
import * as React from "react";
import { useHydrated } from "remix-utils/use-hydrated";

import { getTheme, setTheme as setSystemTheme } from "@/components/theme-switcher";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { CircleUser, Languages, Megaphone, Menu, ReceiptTextIcon, Store, Users } from "lucide-react";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { getActiveClassName } from "./utils/css-utils";


const navItems = [
  {
    label: "Store",
    icon: Store,
    to: "/store",
  },
  {
    label: "Customers",
    icon: Users,
    to: "/users",
  },
  {
    label: "Marketing",
    icon: Megaphone,
    to: "/marketing",
  },
  {
    label: "App",
    icon: MobileIcon,
    to: "/app",
  },
  {
    label: "Sales",
    icon: ReceiptTextIcon,
    to: "/sales",
  },
];

export function Header() {
  const hydrated = useHydrated();
  const [, rerender] = React.useState({});
  const setTheme = React.useCallback((theme: string) => {
    setSystemTheme(theme);
    rerender({});
  }, []);

  const setLanguage = React.useCallback((theme: string) => {
    setSystemTheme(theme);
    rerender({});
  }, []);
  const theme = getTheme();

  return (
    <header className=" top-0 flex h-16 items-center gap-4 border-b bg-muted px-4 md:px-6">
      <nav
        className="hidden flex-col gap-6 text-lg font-medium md:flex md:flex-row md:items-center md:gap-5 md:text-sm lg:gap-6">
        {navItems.map((item) => {
          return <div key={item.to} className="flex flex-row gap-2 items-center">
            <item.icon className="h-4 w-4" />
            <NavLink to={item.to} className={({ isActive }) => getActiveClassName(isActive)}>
              {item.label}
            </NavLink>
          </div>;
        })}
      </nav>
      <Sheet>
        <SheetTrigger asChild>
          <Button
            variant="outline"
            size="icon"
            className="shrink-0 md:hidden"
          >
            <Menu className="h-5 w-5" />
            <span className="sr-only">Toggle navigation menu</span>
          </Button>
        </SheetTrigger>
        <SheetContent side="left">
          <nav className="grid gap-6 text-lg font-medium">
            {navItems.map((item) => {
              return <NavLink key={item.to} to={item.to} className={({ isActive }) => getActiveClassName(isActive)}>
                {item.label}
              </NavLink>;
            })}
          </nav>
        </SheetContent>
      </Sheet>
      <div className="flex w-full items-center md:ml-auto md:gap-2 lg:gap-4">
        <div className="ml-auto flex gap-2 sm:flex-initial">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full border">
                <CircleUser className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>My Account</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>Settings</DropdownMenuItem>
              <DropdownMenuItem>Support</DropdownMenuItem>
              <DropdownMenuSeparator />
              <Form method="POST" action="/auth/logout">
                <DropdownMenuItem asChild>
                  <Button className="w-full" type="submit" variant="ghost">
                    Logout
                  </Button>
                </DropdownMenuItem>
              </Form>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="w-10 h-10 rounded-full border"
                size="icon"
                variant="ghost"
              >
                <span className="sr-only">Theme selector</span>
                {!hydrated ? null : theme === "dark" ? (
                  <MoonIcon />
                ) : theme === "light" ? (
                  <SunIcon />
                ) : (
                  <LaptopIcon />
                )}
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="mt-2">
              <DropdownMenuLabel>Theme</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <button
                  type="button"
                  className="w-full"
                  onClick={() => setTheme("light")}
                  aria-selected={theme === "light"}
                >
                  Light
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button
                  type="button"
                  className="w-full"
                  onClick={() => setTheme("dark")}
                  aria-selected={theme === "dark"}
                >
                  Dark
                </button>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <button
                  type="button"
                  className="w-full"
                  onClick={() => setTheme("system")}
                  aria-selected={theme === "system"}
                >
                  System
                </button>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="icon" className="w-10 h-10 rounded-full border">
                <Languages className="h-5 w-5" />
                <span className="sr-only">Toggle user menu</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuLabel>Select Language</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuItem>English</DropdownMenuItem>
              <DropdownMenuItem>العربية</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  );
}