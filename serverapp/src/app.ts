import { config } from "dotenv";
import express, { ErrorRequestHandler, NextFunction, Request, Response } from "express";
import bodyParser from "body-parser";
import startServer from "./server.js";
import cors from "cors";
import PaymentMethodRouter from "./domain/billing/payment-method/payment-method-router.js";
import CategoryRouter from "./domain/store/category/category-router.js";
import CurrencyRouter from "./domain/billing/currency/currency-router.js";
import AdLocationRouter from "./domain/marketing/ad-location/ad-location-router.js";
import ServiceRouter from "./domain/store/service/service-router.js";
import OrderRouter from "./domain/store/order/order-router.js";
import UserRouter from "./domain/users/user-router.js";
import AuthenticationRouter from "./domain/auth/authentication-router.js";
import LoggerMiddleware from "./middleware/logger-middleware.js";
import StorageRouter from "./domain/storage/storage-router.js";
import AdRouter from "./domain/marketing/ad/ad-router.js";
import CoinbaseRouter from "./domain/billing/coinbase/coinbase-router.js";

//import "./bootstrap/index.js"
config();

const app = express();

app.use(LoggerMiddleware);
app.use(cors());
app.use(bodyParser.json());

app.use("/api/authentication", AuthenticationRouter);
app.use("/api/user", UserRouter);
app.use("/api/ad-location", AdLocationRouter);
app.use("/api/payment-method", PaymentMethodRouter);
app.use("/api/category", CategoryRouter);
app.use("/api/currency", CurrencyRouter);
app.use("/api/service", ServiceRouter);
app.use("/api/ad", AdRouter);
app.use("/api/order", OrderRouter);
app.use("/uploads", StorageRouter);
app.use("/api/coinbase", CoinbaseRouter);

// Default route handler
app.use((req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// Error handler
const errorHandler: ErrorRequestHandler = (
  err: any,
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  console.error(err.stack);
	res.status(500).json({ message: err });
};
app.use(errorHandler);

// Start the server
startServer();
export default app;
