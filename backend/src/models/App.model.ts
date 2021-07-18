import { Server } from "http";
import express, { Application, Router } from "express";
import catchUncatched from "../utils/catchUncatched";
import createEndpoint from "../utils/createEndpoint";
import useGlobalMiddlewares from "../middleware/useGlobalMiddlewares";
import authRouteRegister from "../routes/v1/Auth.route";
import useAuthMiddleware from "../middleware/useAuthMiddleware";
import passport from "passport";

class App {
  private instanseApp: Application;
  private router: Router;
  private server: Server | null = null;

  constructor(port: string) {
    this.instanseApp = express();

    this.instanseApp.use(passport.initialize());
    this.instanseApp.use(passport.session());

    this.router = createEndpoint(this.instanseApp);
    this.instanseApp.set("port", port);
    this.instanseApp.set("trust proxy", true);
  }

  private defineServer(): void {
    this.server = this.instanseApp.listen(
        this.instanseApp.get("port"),
        'chatter_backend',
        () =>
      console.log("Server is running...")
    );
  }

  private registerMiddlewares(): void {
    catchUncatched(this.server as Server);
    useGlobalMiddlewares(this.instanseApp);
    useAuthMiddleware();
  }

  private defineRoutes(): void {
    authRouteRegister(this.router);
  }

  public start(): void {
    this.defineServer();
    this.registerMiddlewares();
    this.defineRoutes();
  }
}

export default App;
