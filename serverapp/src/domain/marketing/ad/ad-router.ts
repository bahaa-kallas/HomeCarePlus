import express from "express";
import routes from "./ad-routes.js";

const AdRouter = express.Router();

AdRouter.get("/", routes.getAllAds);
AdRouter.post("/", routes.createAd);
AdRouter.get("/:id", routes.getAd);
AdRouter.put("/:id", routes.updateAd);
AdRouter.delete("/:id", routes.deleteAd);

export default AdRouter;