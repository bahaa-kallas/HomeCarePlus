import express from "express";
import routes from "./payment-methods-routes.js";

const PaymentMethodRouter = express.Router();

PaymentMethodRouter.get("/", routes.getAllPaymentMethods);
PaymentMethodRouter.post("/", routes.createPaymentMethod);
PaymentMethodRouter.get("/:id", routes.getPaymentMethod);
PaymentMethodRouter.put("/:id", routes.updatePaymentMethod);
PaymentMethodRouter.delete("/:id", routes.deletePaymentMethod);

export default PaymentMethodRouter;
