import express from "express";
import routes from "./currency-routes.js";

const CurrencyRouter = express.Router();

CurrencyRouter.get("/", routes.getAllCurrencies);
CurrencyRouter.post("/", routes.createCurrency);
CurrencyRouter.get("/:id", routes.getCurrency);
CurrencyRouter.put("/:id", routes.updateCurrency);
CurrencyRouter.delete("/:id", routes.deleteCurrency);

export default CurrencyRouter;
