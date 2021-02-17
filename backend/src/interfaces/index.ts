import { BinaryLike } from "crypto";
import { Model, ModelCtor } from "sequelize/types";

export interface UserAttributes {
  id_user: string;
  name: string;
  email: string;
  create_date: string;
  password: string;
  phone: string;
  photo: string;
  openId: string;
  salt: string;
}

export interface ExpressUser extends Express.User {
  id: string;
}

export interface UserModel extends ModelCtor<Model<UserAttributes, any>> {
  encryptPassword(plainPassword: string, salt: BinaryLike): string;
  generateSalt(): string;
  correctPassword(enteredPassword: string): boolean;
}
