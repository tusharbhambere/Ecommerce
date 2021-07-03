import { Response, Request } from "express";
import dotenv from "dotenv";
import { getManager } from "typeorm";
import { UserInfoRepository } from "../database/user_info/repo/userinfo.repo";

dotenv.config();
export class UserInfoController {
  static async addUserInfo(req: Request, res: Response) {
    let connectionmanager =
      getManager().getCustomRepository(UserInfoRepository);
    await connectionmanager.addUserInfo(req, res);
  }
  static async showUserInfo(req: Request, res: Response) {
    let connectionmanager =
      getManager().getCustomRepository(UserInfoRepository);
    await connectionmanager.showUserInfo(req, res);
  }
  static async updateUserInfo(req: Request, res: Response) {
    let connectionmanager =
      getManager().getCustomRepository(UserInfoRepository);
    await connectionmanager.updateUserInfo(req, res);
  }
}
