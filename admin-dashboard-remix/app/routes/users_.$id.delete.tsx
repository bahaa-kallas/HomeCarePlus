import { ActionFunctionArgs } from "@remix-run/node";
import { json } from "@remix-run/react";
import apiClient from "@/services/ApiClient";


export async function action({ params }: ActionFunctionArgs) {
  const userId = params.id;
  if (!userId) {
    throw json("UserId was not specified", { status: 400 });
  }

  const response = await apiClient.deleteUser(userId);

  return json("ok", { status: 200 });
}