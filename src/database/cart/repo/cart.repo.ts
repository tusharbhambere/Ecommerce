import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { CartEntity } from "../entity/cart.entity";
import { UserRepository } from "../../user/repository/user.repo";

dotenv.config();
@EntityRepository(CartEntity)
export class CartRepository extends Repository<CartEntity> {
  //! Adding data in cart
  async addToCart(req: Request, res: Response) {
    let { useremail, product_price, product_name } = req.body;
    try {
      let userRepo = getCustomRepository(UserRepository);
      let user = await userRepo.findOne({ useremail: useremail });
      if (user) {
        const cartitem = new CartEntity();
        cartitem.user = user;
        cartitem.product_name = product_name;
        cartitem.product_price = product_price;
        await cartitem.save();
        return res.json({
          added: true,
          message: "Product added to cart",
        });
      }
    } catch (err) {
      console.log(err);
      return res.send({
        added: false,
        message: "Something went wrong, try again",
      });
    }
  }

  //! Get cart prodcuts
  async getCartProducts(req: Request, res: Response) {
    let { useremail } = req.params;
    let userRepository = getCustomRepository(UserRepository);
    let user = await userRepository.findOne({ useremail: useremail });
    try {
      let cartData = await this.createQueryBuilder("cart")
        .select()
        .leftJoin("cart.user", "user")
        .where("user.id = :id", { id: user?.id })
        .getMany();

      if (cartData.length === 0) {
        return res.send({
          received: true,
          filled: false,
          data: "Oops! Cart is empty!",
        });
      }
      return res.send({
        received: true,
        filled: true,
        data: cartData,
      });
    } catch (error) {
      return res.send({
        received: false,
        filled: false,
        data: "Something went wrong, try again",
      });
    }
  }

  //! Delete Cart data
  async deleteCartData(req: Request, res: Response) {
    let { productId } = req.params;
    try {
      await this.createQueryBuilder("cart")
        .delete()
        .where("cart.product_id = :product_id", { product_id: productId })
        .execute()
        .then((data: any) => {
          return res.send({
            deleted: true,
            data: data,
          });
        });
    } catch (error) {
      console.log(error);
      return res.send({
        deleted: false,
        data: "Something went wrong, try again",
      });
    }
  }
}
