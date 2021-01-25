import { Application } from "express";
import compression from "compression";
import cors from "cors";
import helmet from "helmet";

export default (app: Application) => {
  app.use(cors());
  app.use(helmet());
  app.use(compression());
};
