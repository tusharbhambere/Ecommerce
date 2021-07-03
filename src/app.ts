import express from "express";
import dotenv from "dotenv";
import "reflect-metadata";
import cors from "cors";
import { authrouter } from "./routes/authentication.routes";
import { createConnection, ConnectionOptions } from "typeorm";
import config from "./ormconfig";
import { productrouter } from "./routes/products.routes";
import { cartrouter } from "./routes/cart.routes";
import { inforouter } from "./routes/userinfo.routes";

dotenv.config();
createConnection(config as ConnectionOptions)
  .then(async (connection) => {
    if (connection.isConnected) {
      console.log(`📅 is connected!!`);
    }
    const app = express();
    app.use(cors());
    app.use(express.json());
    app.use(express.urlencoded({ extended: false }));
    const port = process.env.PORT || 8080;
    app.set("port", port);
    app.get("/", (req, res) => {
      res.send("SHOPEX API");
    });

    //! Authentication routes
    app.use("/user", authrouter);

    //! Product routes
    app.use("/products", productrouter);

    //! Cart routes
    app.use("/cart", cartrouter);

    //! Userinfo routes
    app.use("/info", inforouter);

    //! Listening to port
    app.listen(app.get("port"), () => {
      console.log(`Server is rocking at ${app.get("port")}🚀`);
    });
  })
  .catch((error) => {
    console.log(error);
  });
