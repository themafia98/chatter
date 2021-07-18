import { Model, ModelCtor, TEXT, UUID, fn } from "sequelize";
import crypto, { BinaryLike } from "crypto";
import { DATE, Sequelize, CHAR, UUIDV4 } from "sequelize";
import { UserAttributes, UserModel } from "../../../interfaces";

export function initUser(sequalize: Sequelize): UserModel {
  const attributes: SequelizeAttributes<UserAttributes> = {
    id_user: {
      type: UUID,
      primaryKey: true,
      allowNull: false,
      defaultValue: UUIDV4,
    },
    name: { type: TEXT, allowNull: false },

    email: { type: TEXT, allowNull: false },
    createdAt: {
      allowNull: false,
      type: DATE,
      defaultValue: fn("NOW"),
    },
    updatedAt: {
      allowNull: false,
      type: DATE,
      defaultValue: fn("NOW"),
    },
    password: {
      type: TEXT,
      allowNull: false,
      get() {
        return () => this.getDataValue("password");
      },
    },
    salt: {
      type: TEXT,
      get() {
        return () => this.getDataValue("salt");
      },
    },
    phone: { type: TEXT, allowNull: true },
    photo: { type: TEXT, allowNull: true },
    openId: { type: TEXT, allowNull: true },
  };

  const User: ModelCtor<Model<UserAttributes, any>> = sequalize.define(
    "users",
    attributes
  );

  (User as unknown as UserModel).encryptPassword = (
    plainPassword: string,
    salt: BinaryLike = crypto.randomBytes(32).toString("base64")
  ): string =>
    crypto
      .createHash("RSA-SHA256")
      .update(plainPassword)
      .update(salt)
      .digest("hex");

  (User as unknown as UserModel).generateSalt = () =>
    crypto.randomBytes(32).toString("base64");

  User.prototype.correctPassword = function (enteredPassword: string): boolean {
    return (
      (User as unknown as UserModel).encryptPassword(enteredPassword, this.salt()) ===
      this.password()
    );
  };

  const setSaltAndPassword = (user: Partial<any>) => {
    if (user.changed("password")) {
      user.salt = (User as unknown as UserModel).generateSalt();
      user.password = (User as unknown as UserModel).encryptPassword(
        user.password(),
        user.salt()
      );
    }
  };

  User.beforeCreate(setSaltAndPassword);
  User.beforeUpdate(setSaltAndPassword);

  return User as unknown as UserModel;
}
