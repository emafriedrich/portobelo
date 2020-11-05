import { sequelize } from "./../db/db";
import { DataTypes } from "sequelize";
import { BaseModel } from "./base.model";

export class Zone extends BaseModel {
  id!: number;
  name!: string;
  static initialize() {
    Zone.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
      },
      {
        tableName: "zones",
        name: {
          singular: "zone",
          plural: "zones",
        },
        sequelize: sequelize,
      }
    );
  }
}
