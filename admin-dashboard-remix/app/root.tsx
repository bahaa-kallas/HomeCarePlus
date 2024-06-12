import { Links, Meta, Outlet, redirect, Scripts, ScrollRestoration, useLocation } from "@remix-run/react";

import { GlobalPendingIndicator } from "@/components/global-pending-indicator";
import { Header } from "@/components/header";
import { ThemeSwitcherSafeHTML, ThemeSwitcherScript } from "@/components/theme-switcher";

import "./globals.css";
import React from "react";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";
import { json, LoaderFunctionArgs } from "@remix-run/node";
import apiClient from "@/services/ApiClient";
import { jwtCookie } from "@/cookies.server";


export async function loader({ request }: LoaderFunctionArgs) {
  const requestUrl = new URL(request.url);
  const isNotLoginPage = requestUrl.pathname !== "/auth/login";
  const existingJwtCookie = await jwtCookie.parse(
    request.headers.get("Cookie"),
  );

  if (isNotLoginPage && !existingJwtCookie) {
    console.log("Not logged in, Redirecting to login page...");
    return redirect("/auth/login");
  }
  apiClient.accessToken = existingJwtCookie;
  return json({ ok: true });
}

function App() {
  return (
    <ThemeSwitcherSafeHTML lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />
        <ThemeSwitcherScript />
      </head>
      <body>
      <GlobalPendingIndicator />
      {renderNavBar()}
      <main>
        <TooltipProvider>
          <Outlet />
        </TooltipProvider>
        <Toaster />
      </main>
      <ScrollRestoration />
      <Scripts />
      </body>
    </ThemeSwitcherSafeHTML>
  );
}

export default function Root() {
  return <App />;
}

function renderNavBar() {
  const location = useLocation();
  if (location?.pathname == "/auth/login") {
    return <></>;
  } else {
    return <Header />;
  }
}