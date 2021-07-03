import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";
@Entity("cart")
export class CartEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  product_id!: string;
  @Column()
  product_name!: string;
  @Column({ type: "bigint" })
  product_price!: bigint;

  //! MTO with user
  @ManyToOne(() => UserEntity, (user) => user.item)
  user!: UserEntity;
}
