import Router from "express";
import { ProductController } from "../controllers/product.controller";

const productrouter = Router();

//! @GET
productrouter.get("/", ProductController.showProducts);
productrouter.get("/details/:productId", ProductController.loadProductDetails);

//! @POST
productrouter.post("/add-products", ProductController.addProducts);

//! @DELETE
productrouter.delete("/delete/:product_id", ProductController.deleteProduct);

export { productrouter };
