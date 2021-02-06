import passport from "passport";
import { Strategy as DefaultStrategy } from "passport-local";
import { Strategy as OpenIDStrategy } from "passport-openid";
import { STRATEGY_CONTEXT } from "./AuthStrategyContext.constant";
import db from "../../database/models";
import openIdConfig from "../../config/auth/openId.config";

class AuthStrategyContext {
  private strategyContext: string;

  constructor(content: string) {
    this.strategyContext = content;
  }

  public apply() {
    if (this.strategyContext) {
      console.warn("Auth strategy already initialized");
      return;
    }

    switch (this.strategyContext) {
      /** TODO: should be improve strategy middlewares, is not working now */

      case STRATEGY_CONTEXT.DEFAULT: {
        passport.use(
          new DefaultStrategy(async (username, password, done) => {
            const currentDefaultUser = await db.User.findOne({
              where: { name: username },
            });

            if (!currentDefaultUser) {
              done(null, false, { message: "Incorrect username." });
              return;
            }

            if (!currentDefaultUser.validate() || !password) {
              return done(null, false, { message: "Incorrect password." });
            }

            return done(null, currentDefaultUser);
          })
        );
      }

      case STRATEGY_CONTEXT.OPENID: {
        passport.use(
          new OpenIDStrategy(
            openIdConfig,
            async (identifier: any, done: any) => {
              const currentOpenIdUser = await db.User.findOrCreate({
                where: { openId: identifier },
              });

              if (currentOpenIdUser === null) {
                done(new Error("openId strategy user error"));
              }
            }
          )
        );
      }

      default:
        return;
    }
  }
}

export default AuthStrategyContext;