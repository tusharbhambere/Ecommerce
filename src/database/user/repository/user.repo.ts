import { EntityRepository, Repository } from "typeorm";
import { UserEntity } from "../entity/user.entity";
import { Request, Response } from "express";
import * as EmailValidator from "email-validator";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

dotenv.config();
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  //!Login under the application
  async login(req: Request, res: Response) {
    let { useremail, newuserpassword } = req.body;
    let isValidated = EmailValidator.validate(useremail);
    let jwt_secret = process.env.JWT_SECRET as string;

    if (!isValidated) {
      return res.send({
        authentication: false,
        data: "Invalid email",
      });
    } else {
      //! Find the user password from the database
      let findUserPasswordFromDb = await this.createQueryBuilder("users")
        .select("users.userpassword")
        .where("users.useremail = :query", { query: useremail })
        .getOne();
      //! Find the user id from the database
      let userId = await this.createQueryBuilder("users")
        .select("users.id")
        .where("users.useremail = :query", { query: useremail })
        .getOne();

      bcrypt.compare(
        newuserpassword,
        findUserPasswordFromDb?.userpassword as string,
        (error: any, isPasswordMatched: any) => {
          console.log(newuserpassword, findUserPasswordFromDb?.userpassword);
          if (error) {
            return res.send({
              authentication: false,
              data: error,
            });
          }
          if (!isPasswordMatched) {
            return res.send({
              authentication: false,
              data: "Incorrect password",
            });
          }
          if (isPasswordMatched) {
            jwt.sign(
              {
                useremail: useremail,
              },
              jwt_secret,
              {
                expiresIn: "2h",
              },
              async (error: any, authdata: any) => {
                if (error) {
                  return res.send({
                    authentication: false,
                    data: error,
                  });
                } else {
                  return res.send({
                    authentication: true,
                    data: authdata,
                  });
                }
              }
            );
          }
        }
      );
    }
  }

  //!Create a new user
  async signUp(req: Request, res: Response) {
    let { username, useremail, userpassword } = req.body;
    let isValidated = EmailValidator.validate(useremail);
    let jwt_secret = process.env.JWT_SECRET as string;

    //If the email is fraud or invalid
    if (!isValidated) {
      return res.send({
        authentication: false,
        data: "Invalid email",
      });
    }

    //!Check if the user already exists in database or not
    let emailExists =
      (await this.createQueryBuilder("users")
        .where("users.useremail = :query", { query: useremail })
        .getCount()) > 0; //Output is boolean

    if (emailExists) {
      return res.send({
        authentication: false,
        data: "Email is taken, Try another one!",
      });
    } else {
      const salt = await bcrypt.genSalt(10);
      console.log(salt);
      bcrypt.hash(
        //!HMAC
        userpassword,
        salt,
        async (error: any, hashedpassword: any) => {
          if (error) {
            return res.send({
              authentication: false,
              data: error,
            });
          } else {
            //! Creating new user
            let user = new UserEntity();
            user.username = username;
            user.userpassword = hashedpassword; //! Adding hashed password instead of plain
            user.useremail = useremail;
            //!Saving the user
            await this.save(user);
            //! Create JWT => Sign jwt
            let userid = this.createQueryBuilder("users")
              .select("users.id")
              .where("users.useremail = :query", { query: useremail })
              .getOne();

            jwt.sign(
              {
                useremail: useremail,
              },
              jwt_secret,
              {
                expiresIn: "2h",
              },
              async (error: any, authData: any) => {
                if (error) {
                  return res.send({
                    authentication: false,
                    data: error,
                  });
                } else {
                  return res.send({
                    authentication: true,
                    data: authData,
                  });
                }
              }
            );
          }
        }
      );
    }
  }

  //! Decoding users JWT
  async decodeUserData(req: Request, res: Response) {
    let jwt_secret = process.env.JWT_SECRET as string;
    let tokendata = req.headers.authorization as string;
    jwt.verify(tokendata, jwt_secret, async (error: any, userdata: any) => {
      if (error) {
        console.log(error);
        return res.send({
          received: false,
          data: null,
        });
      } else {
        return res.send({
          received: true,
          data: userdata,
        });
      }
    });
  }
}
