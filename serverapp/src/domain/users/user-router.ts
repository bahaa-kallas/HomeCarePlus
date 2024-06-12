import express from "express";
import routes from "./user-routes.js";

const UserRouter = express.Router();

UserRouter.get("/", routes.getAllUsers);
UserRouter.post("/", routes.createUser);
UserRouter.put("/:id", routes.updateUser);
UserRouter.get("/:id", routes.getUser);
UserRouter.delete("/:id", routes.deleteUser);

export default UserRouter;
