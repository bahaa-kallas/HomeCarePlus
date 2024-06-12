import { ActionFunctionArgs, json } from "@remix-run/node";

export async function action({ params }: ActionFunctionArgs) {
  // TODO delete the ad from the backend
  const id = params.id!!;

  // const response = apiClient.deleteAd(id)
  return json({ ok: true });
}