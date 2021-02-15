import passport from "passport";
import globalConfig from "../config/global.config";
import db from "../database/models";
import { ExpressUser } from "../interfaces";
import { STRATEGY_CONTEXT } from "../models/AuthStrategyContext/AuthStrategyContext.constant";
import AuthStrategyContext from "../models/AuthStrategyContext/AuthStrategyContext.model";

export default () => {
  passport.serializeUser((user, done) => done(null, (<ExpressUser>user).id));

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