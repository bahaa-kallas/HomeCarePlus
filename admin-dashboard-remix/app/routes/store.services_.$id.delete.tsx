import { ActionFunctionArgs, json } from "@remix-run/node";
import apiClient from "@/services/ApiClient";

export async function action({ params }: ActionFunctionArgs) {
  const serviceId = params.id!;

  const response = await apiClient.deleteService(serviceId);
  return json({ ok: true });
}