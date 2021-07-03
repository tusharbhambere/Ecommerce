import { Response, Request } from "express";
import dotenv from "dotenv";
import { getManager } from "typeorm";
import { ProductRepository } from "../database/products/repo/products.repo";

dotenv.config();
export class ProductController {
  static async addProducts(req: Request, res: Response) {
    let connectionmanager = getManager().getCustomRepository(ProductRepository);
    await connectionmanager.addProducts(req, res);
  }
  static async showProducts(req: Request, res: Response) {
    let connectionmanager = getManager().getCustomRepository(ProductRepository);
    await connectionmanager.showProducts(req, res);
  }
  static async loadProductDetails(req: Request, res: Response) {
    let connectionmanager = getManager().getCustomRepository(ProductRepository);
    await connectionmanager.loadProductDetails(req, res);
  }
  static async deleteProduct(req: Request, res: Response) {
    let connectionmanager = getManager().getCustomRepository(ProductRepository);
    await connectionmanager.deleteProduct(req, res);
  }
}
