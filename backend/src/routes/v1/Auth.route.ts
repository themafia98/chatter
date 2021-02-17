import { Router } from "express";
import multer from "multer";
import AuthController from "../../controllers/Auth.controller";

const upload = multer();

export default (router: Router) => {
  router.post("/login", AuthController.login);
  router.put("/registration", upload.none(), AuthController.registration);
  router.delete("/logout", AuthController.logout);
  router.get("/authenticate", AuthController.authenticate);
};
