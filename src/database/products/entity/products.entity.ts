import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";

@Entity("products")
export class ProductEntity {
  @PrimaryGeneratedColumn()
  product_id!: string;
  @Column()
  product_name!: string;
  @Column()
  product_price!: string;
  @Column()
  product_image!: string;
  @Column()
  product_description!: string;
  @Column()
  product_category!: string;
}
