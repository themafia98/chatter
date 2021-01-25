import App from "./models/App.model";

try {
  const app = new App(process.env.PORT || "3001");
  app.start();
} catch (err) {
  console.error(err);
  process.exit(1);
}
