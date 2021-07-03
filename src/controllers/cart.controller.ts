import { Response, Request } from "express";
import dotenv from "dotenv";
import { getManager } from "typeorm";
import { CartRepository } from "../database/cart/repo/cart.repo";

dotenv.config();
export class CartController {
  static async addToCart(req: Request, res: Response) {
    let connectionmanager = getManager().getCustomRepository(CartRepository);
    await connectionmanager.addToCart(req, res);
  }
  static async getCartProducts(req: Request, res: Response) {
    let connectionmanager = getManager().getCustomRepository(CartRepository);
    await connectionmanager.getCartProducts(req, res);
  }
  static async deleteCartData(req: Request, res: Response) {
    let connectionmanager = getManager().getCustomRepository(CartRepository);
    await connectionmanager.deleteCartData(req, res);
  }
}
