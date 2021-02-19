import { Application, Router } from "express";

export default (app: Application) => {
  const router = Router();

  app.use(`/api/${process.env.API_VERSION}`, router);

  return router;
};
