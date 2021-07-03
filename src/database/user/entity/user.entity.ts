import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { CartEntity } from "../../cart/entity/cart.entity";
import { UserInfoEntity } from "../../user_info/entity/userinfo.entity";

@Entity("users")
export class UserEntity extends BaseEntity{
  @PrimaryGeneratedColumn("increment")
  id!: string;

  @Column({
    nullable: true,
    unique: false,
  })
  username!: string;
  @Column({
    nullable: true,
    unique: true,
  })
  useremail!: string;
  @Column({
    nullable: true,
    unique: false,
  })
  userpassword!: string;

  //! OTM with cart
  @OneToMany(() => CartEntity, (cart) => cart.user)
  @JoinColumn()
  item!: CartEntity[];

  //! OTO with info
  @OneToOne(() => UserInfoEntity, (info) => info.user)
  info!: UserInfoEntity;
}
