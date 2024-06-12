import express from "express";
import routes from "./order-routes.js";

const OrderRouter = express.Router();

OrderRouter.get("/", routes.getAllOrders);
OrderRouter.post("/", routes.createOrder);
OrderRouter.put("/:id", routes.updateOrder);
OrderRouter.delete("/:id", routes.deleteOrder);
OrderRouter.get("/:id", routes.getOrderById);
OrderRouter.get("/user/:id", routes.getOrdersByUser);


export default OrderRouter;
