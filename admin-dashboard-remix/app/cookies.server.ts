import { createCookie } from "@remix-run/node"; // or cloudflare/deno

export const jwtCookie = createCookie("accessToken", {
  // 15 days in seconds
  maxAge: 15 * 24 * 60 * 60,
  httpOnly: true,
  sameSite: "lax",
  path: "/",
  secure: process.env.NODE_ENV === "production",
});