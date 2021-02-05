import { Model, ModelCtor, UUID } from "sequelize";
import { DATE, Sequelize, CHAR, UUIDV4 } from "sequelize";
import { UserAttributes } from "../../../interfaces";


export function initUser(sequalize: Sequelize): ModelCtor<Model<any, any>> {

    const attributes: SequelizeAttributes<UserAttributes> = {
      id_user: { type: UUID, primaryKey: true, allowNull: false, defaultValue: UUIDV4 },
      name: { type: CHAR, allowNull: false },
      create_date: { type: DATE, allowNull: false },
      password: { type: CHAR, allowNull: false },
      phone: { type: CHAR, allowNull: true },
      photo: { type: CHAR, allowNull: true }
    };

    return sequalize.define("users", attributes);
  };