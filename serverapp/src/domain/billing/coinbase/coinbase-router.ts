import express from "express";
import s from "coinbase-commerce-node";
import bodyParser from "body-parser";
import ServiceService from "../../store/service/service-service.js";
import { mongoClient } from "../../../config/database.js";
import CurrencyService from "../currency/currency-service.js";

const Webhook = s.Webhook;
const Charge = s.resources.Charge;

const serviceService = new ServiceService(mongoClient);
const currencyService = new CurrencyService(mongoClient);

const CoinbaseRouter = express.Router();


CoinbaseRouter.use(bodyParser.raw({ type: "application/json" }));
CoinbaseRouter.post("/webhook", function(request, response) {
  const rawBody = request.body;
  const signature = request.headers["x-cc-webhook-signature"] as string;
  try {
    const event = Webhook.verifyEventBody(
      JSON.stringify(rawBody),
      signature,
      process.env.COINBASE_WEBHOOK_SECRET,
    );

    if (event.type === "charge:pending") {

    }
  } catch (error) {
    console.log("Error occured", error);
    return response.status(400).send("Webhook Error:" + error);
  }
  response.send({});
});

CoinbaseRouter.post("/create-charge", async (request, response) => {
  const { serviceId, currencyId } = request.query as any;

  const service = await serviceService.get(serviceId);
  const currency = await currencyService.getById(currencyId);

  const price = service.price.filter(it => it.currencyId == currencyId)[0].amount;
  try {
    const charge = await Charge.create({
      name: service.name.en,
      description: service.description.en,
      local_price: {
        amount: (price + SERVICE_FEE).toString(),
        currency: currency.code,
      },
      pricing_type: "fixed_price",
      metadata: {
        serviceId: service.id,
      },
    });
    response.json({ chargeUrl: charge.hosted_url });
  } catch (error) {
    console.error(error);
    response.status(500).json({ error: "Failed to create charge" });
  }
});

export default CoinbaseRouter;

const SERVICE_FEE = 10.99;