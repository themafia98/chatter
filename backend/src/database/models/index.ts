import { Sequelize } from "sequelize";
import { initUser } from "./User/User.db";
import config from "../config/config";

const env: string = process.env.NODE_ENV || "development";
const { [env]: envConfig = {} } = config as Record<string, any>;

const sequelize = new Sequelize(envConfig.url, envConfig);

const db = {
  sequelize,
  Sequelize,
  User: initUser(sequelize),
};

Object.values(db).forEach((model: { associate: (db: object) => void }) => {
  if (model.associate) {
    model.associate(db);
  }
});

export default db;