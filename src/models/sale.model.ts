import { Customer } from "./customer.model";
import { ProductSold } from "./product-sold.model";
import { Model, DataTypes } from "sequelize";

import { sequelize } from "./../db/db";

export class Sale extends Model {
  id!: number;
  date: Date = new Date();
  total: number = 0;
  customerId!: number;
  customer!: Customer;
  productsSold: ProductSold[] = [];

  static initialize() {
    Sale.init(
      {
        date: {
          type: DataTypes.DATE,
          allowNull: false,
        },
        total: {
          type: DataTypes.INTEGER,
          allowNull: false,
        },
      },
      {
        sequelize,
        tableName: "sales",
        name: {
          singular: "sale",
          plural: "sales",
        },
      }
    );
  }
}
