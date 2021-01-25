import { Server } from "http";
import express, { Application, Router } from "express";
import socketIO from "socket.io";
import catchUncatched from "../utils/catchUncatched";
import createEndpoint from "../utils/createEndpoint";
import useGlobalMiddlewares from "../middleware/useGlobalMiddlewares";
import authRouteRegister from "../routes/v1/Auth.route";

class App {
  private instanseApp: Application;
  private router: Router;
  private server: Server | null = null;
  /** TODO: should be implement in future releases */
  private clientWs: socketIO.Server | null = null;

  constructor(port: string) {
    this.instanseApp = express();
    this.router = createEndpoint(this.instanseApp);
    this.instanseApp.set("port", port);
  }

  private defineServer(): void {
    this.server = this.instanseApp.listen(this.instanseApp.get("port"), () =>
      console.log("Server is running...")
    );

    this.clientWs = new socketIO.Server(this.server);
  }

  private registerMiddlewares(): void {
    catchUncatched(this.server as Server);
    useGlobalMiddlewares(this.instanseApp);
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