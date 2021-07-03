import Router from "express";
import { AuthenticationController } from "../controllers/authentication.controller";

const authrouter = Router();

//! @GET
authrouter.get("/verify", AuthenticationController.decodeUserData);

//!POST
authrouter.post("/signup", AuthenticationController.signUp);
authrouter.post("/login", AuthenticationController.login);

export { authrouter };
