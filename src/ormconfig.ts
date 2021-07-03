import { join } from "path";
import { ConnectionOptions } from "typeorm";
import dotenev from "dotenv"
import { ProductEntity } from "./database/products/entity/products.entity";
import { UserEntity } from "./database/user/entity/user.entity";
import { UserInfoEntity } from "./database/user_info/entity/userinfo.entity";
import { CartEntity } from "./database/cart/entity/cart.entity";


dotenev.config()
const connectionOptions: ConnectionOptions = {
  url: process.env.DATABASE_URL,
  ssl :{rejectUnauthorized:false},
  type: "postgres",
  host: process.env.Host || "localhost",
  port: 5432,
  username: process.env.User ||  "tushar111",
  password: process.env.DB_Password ||  "Bunty@123",
  database: process.env.Database ||  "postgres",
  entities: [CartEntity,ProductEntity,UserEntity,UserInfoEntity],
  synchronize: true,
  dropSchema: false,
  migrationsRun: true,
  logging: false,
  logger: "debug",
  migrations: [join(__dirname, "src/migration/**/*.ts")],
};
export = connectionOptions;