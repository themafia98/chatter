import passport from "passport";
import JwtStrategy, { ExtractJwt } from "passport-jwt";
import LocalStrategy from "passport-local";
import OpenIDStrategy from "passport-openid";
import { STRATEGY_CONTEXT } from "./AuthStrategyContext.constant";
import db from "../../database/models";
import openIdConfig from "../../config/auth/openId.config";
import { UserModel } from "../../types";
import jwtConfig from "../../config/auth/jwt.config";
class AuthStrategyContext {
  private strategyContext: string;

  constructor(content: string) {
    this.strategyContext = content;
  }

  private async authLocalCallback(
    email: string,
    password: string,
    done: (
      error: null | Error,
      user: UserModel | boolean,
      info?: { message: string }
    ) => void
  ) {
    const currentDefaultUser: any = await db.User.findOne({
      where: { email },
    });

    if (!currentDefaultUser) {
      done(null, false, { message: "Incorrect email." });
      return;
    }

    if (!currentDefaultUser.correctPassword(password)) {
      return done(null, false, { message: "Incorrect password." });
    }

    return done(null, currentDefaultUser);
  }

  private async authJwtCallback(
    jwt_payload: any,
    done: (
      error: null | Error,
      user: UserModel | boolean,
      info?: { message: string }
    ) => void
  ) {
    const currentDefaultUser: any = await db.User.findOne({
      where: { id_user: jwt_payload.sub || "" },
    });

    if (!currentDefaultUser) {
      done(null, false, { message: "Incorrect email." });
      return;
    }

    return done(null, currentDefaultUser);
  }

  public apply() {
    switch (this.strategyContext) {
      /** TODO: should be improve strategy middlewares, is not working now */

      case STRATEGY_CONTEXT.JWT: {
        passport.use(
          new JwtStrategy.Strategy(
            {
              jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
              secretOrKey: jwtConfig.secretOrKey,
            },
            this.authJwtCallback
          )
        );
      }

      case STRATEGY_CONTEXT.LOCAL: {
        passport.use(
          new LocalStrategy.Strategy(
            {
              usernameField: "email",
              passwordField: "password",
            },
            this.authLocalCallback
          )
        );
        break;
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
        break;
      }

      default:
        return;
    }
  }
}

export default AuthStrategyContext;
