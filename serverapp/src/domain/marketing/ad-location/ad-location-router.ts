import express from "express";
import routes from "./ad-location-routes.js";

const AdLocationRouter = express.Router();

AdLocationRouter.get("/", routes.getAllAdLocations);
AdLocationRouter.post("/", routes.createAdLocation);
AdLocationRouter.put("/:id", routes.updateAdLocation);
AdLocationRouter.delete("/:id", routes.deleteAdLocation);

export default AdLocationRouter;