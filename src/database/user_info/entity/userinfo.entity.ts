import {
  BaseEntity,
  Column,
  Entity,
  JoinColumn,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { UserEntity } from "../../user/entity/user.entity";

@Entity("info")
export class UserInfoEntity extends BaseEntity{
  @PrimaryGeneratedColumn("increment")
  id!: string;

  @Column()
  useraddress!: string;

  @Column()
  userphoneno!: string;

  //! OTO with user
  @OneToOne(() => UserEntity, (user) => user.info, {
    cascade: ["update"],
    createForeignKeyConstraints: false,
  })
  @JoinColumn()
  user!: UserEntity;
}
