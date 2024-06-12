import { ActionFunctionArgs, json } from "@remix-run/node";
import apiClient from "@/services/ApiClient";

export async function action({ params }: ActionFunctionArgs) {
  const categoryId = params.id!;

  const response = await apiClient.deleteCategory(categoryId);
  return json({ ok: true });
}