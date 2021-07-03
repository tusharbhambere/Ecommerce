import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import dotenv from "dotenv";
import { UserInfoEntity } from "../entity/userinfo.entity";
import { UserRepository } from "../../user/repository/user.repo";

dotenv.config();
@EntityRepository(UserInfoEntity)
export class UserInfoRepository extends Repository<UserInfoEntity> {
  //! Adding some user info
  async addUserInfo(req: Request, res: Response) {
    let { useremail, useraddress, userphoneno } = req.body;
    let userRepo = getCustomRepository(UserRepository);
    let user = await userRepo.findOne({ useremail: useremail });
    try {
      let userInfo = new UserInfoEntity();
      (userInfo.useraddress = useraddress),
        (userInfo.userphoneno = userphoneno),
        (userInfo.user = user!);
      await userInfo.save();
      return res.send({
        added: true,
        message: "User info added",
      });
    } catch (error) {
      console.log(error);
      if (error) {
      }
      return res.send({
        added: false,
        message: "Something went wrong",
      });
    }
  }

  //! Get user info
  async showUserInfo(req: Request, res: Response) {
    let { useremail } = req.params;
    let userRepo = getCustomRepository(UserRepository);
    let user = await userRepo.findOne({ useremail: useremail });

    try {
      let userInfoData = await this.createQueryBuilder("info")
        .leftJoinAndSelect("info.user", "user")
        .where("info.id = :id", { id: user?.id })
        .getOne();

      if (userInfoData !== undefined) {
        return res.send({
          info: userInfoData,
          filled: true,
          received: true,
        });
      } else {
        return res.send({
          info: "Fill some info first",
          received: true,
          filled: false,
        });
      }
    } catch (error) {
      if (error) {
        return res.send({
          info: "Something went wrong, Please try again",
          received: false,
        });
      }
    }
  }

  //! Updating user info
  async updateUserInfo(req: Request, res: Response) {
    let { infoId } = req.params;
    let { useraddress, userphoneno } = req.body;
    try {
      await this.createQueryBuilder("info")
        .leftJoinAndSelect("info.user", "user")
        .update(UserInfoEntity)
        .set({
          useraddress: useraddress,
          userphoneno: userphoneno,
        })
        .where("info.id = :id", { id: infoId })
        .execute()
        .then((updatedData: any) => {
          return res.send({
            updated: true,
            data: updatedData,
          });
        });
    } catch (error) {
      if (error) {
        console.log(error);
        return res.send({
          updated: false,
          data: "Something went wrong",
        });
      }
    }
  }
}
