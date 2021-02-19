import jwt from "jsonwebtoken";
import jwtConfig from "../config/auth/jwt.config";
import db from "../database/models";
import { UserAttributes } from "../interfaces";

export const createUser = async (body: object) => {
  const user = await db.User.create(body);
  if (!user) throw new Error("bad user data for create");

  const publicUserData: Record<string, string> = {};

  Object.keys(user).forEach((key: string) => {
    if (key === "password") {
      return;
    }

    const { [key]: value = "" } = user as any;

    publicUserData[key] = value;
  });

  return body;
};

export const generateToken = (user: UserAttributes): string =>
  jwt.sign(
    {
      iss: user.name,
      sub: user.id_user,
      iat: new Date().getTime(),
      exp: new Date().setHours(new Date().getHours() + 8),
    },
    jwtConfig.secretOrKey
  );
