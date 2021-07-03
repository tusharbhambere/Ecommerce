import Router from "express";
import { UserInfoController } from "../controllers/userinfo.controller";

const inforouter = Router();

//! @GET
inforouter.get("/:useremail", UserInfoController.showUserInfo);

//! @POST
inforouter.post("/add-user-info", UserInfoController.addUserInfo);

//! @PUT
inforouter.put("/update/:infoId", UserInfoController.updateUserInfo);

export { inforouter };
