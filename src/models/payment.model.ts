import { sequelize } from "./../db/db";
import { Model, DataTypes } from "sequelize";

export class Payment extends Model {
  id!: number;

  static initialize() {
    Payment.init(
      {
        amount: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: "payments",
        name: {
          singular: "payment",
          plural: "payments",
        },
      }
    );
  }
}
