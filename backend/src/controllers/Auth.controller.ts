import { Request, Response, NextFunction } from "express";
import passport from "passport";
import globalConfig from "../config/global.config";
import db from "../database/models";
import { ExpressUser } from "../interfaces";

namespace AuthController {
  export const registration = async (req: Request, res: Response) => {
    console.log(req.body);

    if (!req.body || typeof req.body !== "object") {
      res.sendStatus(403);
      return;
    }

    try {
      await db.User.create(req.body);
    } catch (err) {
      console.error(err);
      res.sendStatus(403);
      return;
    }

    res.sendStatus(200);
  };

  export const logout = async (req: Request, res: Response) => {
    res.sendStatus(200);
  };

  export const login = (req: Request, res: Response, next: NextFunction) => {
    passport.authenticate(
      globalConfig.AUTH_STRATEGY,
      (err: Error, user: ExpressUser): any => {
        if (err) return next(err);

        if (!user)
          return res.json({
            redirect: "/",
            message: "Invalid username or password.",
          });

        req.logIn(user, (err: Error) => {
          if (err) return next(err);

          return res.json({ redirect: "/dashboard", message: "" });
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
