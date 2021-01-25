import { Server } from "http";

export default (server: Server) => {
  const uncaughtEvents = (error: Error) => {
    console.log("uncaught event, server close.");
    console.error(error);

    server.close(() => process.exit(1));
  };

  process.on("uncaughtException", (error: Error) => {
    uncaughtEvents(error);
  });

  process.on("unhandledRejection", (error: Error) => {
    uncaughtEvents(error);
  });

  process.on("SIGTERM", () => {
    console.log("SIGTERM signal, server close.");
    server.close();
  });
};
