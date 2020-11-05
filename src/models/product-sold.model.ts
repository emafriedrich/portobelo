import { Model, DataTypes } from 'sequelize';

import { sequelize } from '../db/db';

export class ProductSold extends Model {

  id!: number;
  unitPrice!: number;
  quantity!: number;

  static initialize() {
    ProductSold.init({
      unitPrice: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'products_sold',
      name: {
        singular: 'productSold',
        plural: 'productsSold'
      }
    });
  }
}