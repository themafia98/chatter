import { BinaryLike } from "crypto";
import { Model, ModelCtor } from "sequelize/types";

export interface UserAttributes {
  id_user: string;
  name: string;
  email: string;
  password: string;
  phone: string;
  photo: string;
  openId: string;
  salt: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ExpressUser extends Express.User {
  id: string;
}

export interface UserModel {
  [key: string]: any
}
