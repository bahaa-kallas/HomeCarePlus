import express from "express";
import routes from "./category-routes.js";

const CategroryRouter = express.Router();

CategroryRouter.get("/", routes.getAllCategories);
CategroryRouter.post("/", routes.createCategory);
CategroryRouter.get("/:id", routes.getCategory);
CategroryRouter.put("/:id", routes.updateCategory);
CategroryRouter.delete("/:id", routes.deleteCategory);

export default CategroryRouter;
