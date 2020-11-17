import { Model, DataTypes } from "sequelize";

import { sequelize } from "../db/db";
import { Sale } from "./sale.model";

export class Customer extends Model {
  id!: number;
  sales: Sale[] = [];
  balance!: number;

  static initialize() {
    Customer.init(
      {
        name: {
          type: DataTypes.STRING,
          allowNull: false,
        },
        address: DataTypes.STRING,
        latitude: DataTypes.DECIMAL(10, 2),
        longitude: DataTypes.DECIMAL(10, 2),
        balance: {
          type: DataTypes.INTEGER,
          allowNull: false,
          defaultValue: 0,
        },
      },
      {
        sequelize,
        tableName: "customers",
        name: {
          singular: "customer",
          plural: "customers",
        },
      }
    );
  }
}
