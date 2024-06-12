import express from "express";
import routes from "./authentication-routes.js";

const AuthenticationRouter = express.Router();

AuthenticationRouter.post("/login", routes.login);
AuthenticationRouter.post("/signup", routes.signup);
AuthenticationRouter.get("/currentUser", routes.getCurrentUser);
AuthenticationRouter.get("/verify-email/:verificationToken", routes.verifyEmail);

export default AuthenticationRouter;
