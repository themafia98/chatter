import { Model } from "sequelize";
import { UserAttributes } from "../interfaces";

export type UserModel = Model<any, UserAttributes>;