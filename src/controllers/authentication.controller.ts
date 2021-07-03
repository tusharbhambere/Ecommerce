import jwt from "jsonwebtoken";
import { Response, Request } from "express";
import dotenv from "dotenv";
import { getManager } from "typeorm";
import { UserRepository } from "../database/user/repository/user.repo";

dotenv.config();
export class AuthenticationController {
  static async signUp(req: Request, res: Response) {
    let connectionmanager = getManager().getCustomRepository(UserRepository);
    await connectionmanager.signUp(req, res);
  }
  static async login(req: Request, res: Response) {
    let connectionmanager = getManager().getCustomRepository(UserRepository);
    await connectionmanager.login(req, res);
  }
  static async decodeUserData(req: Request, res: Response) {
    let connectionmanager = getManager().getCustomRepository(UserRepository);
    await connectionmanager.decodeUserData(req, res);
  }
}
