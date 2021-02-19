import { Router } from "express";
import multer from "multer";
import passport from "passport";
import AuthController from "../../controllers/Auth.controller";

const upload = multer();

export default (router: Router) => {
  router.post("/login", upload.none(), AuthController.login);
  router.post(
    "/jwt/auth",
    passport.authenticate("jwt", { session: false }),
    AuthController.jwtAuth
  );
  router.put("/local/registration", upload.none(), AuthController.registration);
  router.delete(
    "/logout",
    passport.authenticate("jwt", { session: false }),
    AuthController.logout
  );
  router.get("/authenticate", AuthController.authenticate);
};
