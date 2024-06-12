import { title } from "@/config.shared";
import { MetaFunction, redirect } from "@remix-run/node";

export function loader() {
  return redirect("/auth/login");
}
