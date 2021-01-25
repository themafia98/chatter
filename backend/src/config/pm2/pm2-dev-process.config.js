module.exports = {
  apps: [
    {
      ...require("./pm2.config"),
      env: {
        PORT: 3001,
        NODE_ENV: "development",
      },
    },
  ],
};
