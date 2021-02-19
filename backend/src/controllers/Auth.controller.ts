import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import passport from "passport";
import globalConfig from "../config/global.config";
import { ExpressUser, UserAttributes } from "../interfaces";
import { STRATEGY_CONTEXT } from "../models/AuthStrategyContext/AuthStrategyContext.constant";
import { UserModel } from "../types";
import { createUser, generateToken } from "../utils/systemUtils";

namespace AuthController {
  export const registration = async (req: Request, res: Response) => {
    if (!req.body || typeof req.body !== "object") {
      res.sendStatus(403);
      return;
    }

    try {
      const response = await createUser(req.body);
      res.json({ token: generateToken(response as UserAttributes) });
      return;
    } catch (err) {
      console.error(err);
      res.sendStatus(403);
    }
  };

  export const logout = async (req: Request, res: Response) => {
    req.logout();
    res.sendStatus(200);
  };

  export const jwtAuth = (req: Request, res: Response) => {
    res.status(200).json(req.user);
  };

  export const login = async (
    req: Request,
    res: Response,
    next: NextFunction
  ) => {
    await passport.authenticate(
      STRATEGY_CONTEXT.LOCAL,
      (err: Error, user: ExpressUser, info: any): any => {
        if (!user) {
          console.warn(info.message);
        }

        if (err) return next(err);

        if (!user)
          return res.json({
            redirect: "/",
            message: "Invalid username or password.",
          });

        req.login(user, { session: false }, (err: Error) => {
          if (err) return next(err);

          return res.json({
            redirect: "/chatDashboard",
            message: "",
            token: generateToken(user as any),
          });
        });
      }
    )(req, res, next);
  };

  export const authenticate = (req: Request, res: Response) => {
    if (req.isAuthenticated()) {
      res.sendStatus(200);
    }

    res.sendStatus(403);
  };
}

export default AuthController;
