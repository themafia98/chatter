import { Router } from "express";
import AuthController from "../../controllers/Auth.controller";

export default (router: Router) => {
  router.post("/login",AuthController.login);
  router.put("/register", AuthController.register);
  router.delete("/logout", AuthController.logout);
};
