import { EntityRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { ProductEntity } from "../entity/products.entity";

dotenv.config();
@EntityRepository(ProductEntity)
export class ProductRepository extends Repository<ProductEntity> {
  //! Add products in database
  async addProducts(req: Request, res: Response) {
    let {
      product_name,
      product_price,
      product_image,
      product_description,
      product_category,
    } = req.body;

    await this.createQueryBuilder()
      .insert()
      .into(ProductEntity)
      .values({
        product_name: product_name,
        product_price: product_price,
        product_image: product_image,
        product_description: product_description,
        product_category: product_category,
      })
      .execute()
      .catch((error: any) => {
        if (error) {
          return res.send({
            added: false,
            data: error,
          });
        }
      })
      .then((productData: any) => {
        return res.send({
          added: true,
          data: productData,
        });
      });
  }

  //! Show products to the user
  async showProducts(req: Request, res: Response) {
    let products = await this.createQueryBuilder().select().getMany();
    if (products != null) {
      if (products.length === 0) {
        return res.send({
          data: "No products available",
          filled: false,
          received: true,
        });
      }
      return res.send({
        data: products,
        filled: true,
        received: true,
      });
    } else {
      return res.send({
        data: "No products available",
        filled: false,
        received: false,
      });
    }
  }

  //! Loading products details to the user
  async loadProductDetails(req: Request, res: Response) {
    let { productId } = req.params;

    try {
      let detailedProductData = await this.createQueryBuilder()
        .select()
        .where("product_id = :productId", { productId: productId })
        .getOne();
      if (detailedProductData !== undefined) {
        return res.send({
          data: detailedProductData,
          available: true,
          received: true,
        });
      } else {
        return res.send({
          available: false,
          data: "Product is unavailable",
          received: true,
        });
      }
    } catch (error) {
      console.log(error);
      return res.send({
        received: false,
        data: "Something went wrong, Try again",
      });
    }
  }

  //! Delete products
  async deleteProduct(req: Request, res: Response) {
    let adminsecret = req.headers.authorization;
    if (adminsecret === "123456789") {
      let { product_id } = req.params;
      await this.createQueryBuilder()
        .delete()
        .where("products.product_id = :product_id", { product_id: product_id })
        .execute()
        .then((data: any) => {
          return res.send({
            deleted: true,
            message: data,
          });
        });
    } else {
      return res.send({
        deleted: false,
        message: "You are not any admin, Brush your teeth",
      });
    }
  }
}
