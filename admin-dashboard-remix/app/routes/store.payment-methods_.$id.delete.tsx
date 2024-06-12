import { ActionFunctionArgs, json } from "@remix-run/node";
import apiClient from "@/services/ApiClient";

export async function action({ params }: ActionFunctionArgs) {
  const paymentMethodId = params.id!;

  const response = await apiClient.deletePaymentMethod(paymentMethodId);
  return json({ ok: true });
}