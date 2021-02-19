import passport from "passport";
import globalConfig from "../config/global.config";
import db from "../database/models";
import { ExpressUser } from "../interfaces";
import AuthStrategyContext from "../models/AuthStrategyContext/AuthStrategyContext.model";

export default () => {
  passport.serializeUser((user, done) => done(null, user));

  passport.deserializeUser(async (id, done) => {
    const currentUser = await db.User.findByPk(id as string);

    if (currentUser === null) {
      done(new Error("invalid user"));
      return;
    }

    done(null, currentUser);
  });

  new AuthStrategyContext(globalConfig.AUTH_STRATEGY).apply();
};
