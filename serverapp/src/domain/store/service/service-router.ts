import express from "express";
import routes from "./service-routes.js";

const ServiceRouter = express.Router();

ServiceRouter.get("/", routes.getAllServices);
ServiceRouter.post("/", routes.createService);
ServiceRouter.put("/:id", routes.updateService);
ServiceRouter.delete("/:id", routes.deleteService);
ServiceRouter.get("/:id", routes.getService);
ServiceRouter.get("/:id/available-slots", routes.getAvailableTimeSlots);
export default ServiceRouter;
