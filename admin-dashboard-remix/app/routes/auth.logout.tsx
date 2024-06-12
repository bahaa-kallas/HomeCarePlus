import { ActionFunctionArgs } from "@remix-run/node";
import apiClient from "@/services/ApiClient";
import { redirect } from "@remix-run/react";
import { jwtCookie } from "@/cookies.server";

export async function action({ request }: ActionFunctionArgs) {
  apiClient.accessToken = null;
  return redirect("/auth/login", {
    headers: {
      "Set-Cookie": await jwtCookie.serialize("", {
        maxAge: 1,
      }),
    },
  });
}