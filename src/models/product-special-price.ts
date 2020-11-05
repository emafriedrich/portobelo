import { Model, DataTypes } from 'sequelize';

import { sequelize } from './../db/db';

export class ProductSpecialPrice extends Model {

  id!: number;
  type!: 'percent' | 'final';
  value!: number;
  minimum = 0;
  maximum = 0;

  static initialize() {
    ProductSpecialPrice.init({
      type: {
        type: DataTypes.ENUM,
        values: ['percent', 'final']
      },
      value: {
        type: DataTypes.INTEGER,
        allowNull: false
      },
      minimum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 0
      },
      maximum: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1_000_000
      }
    }, {
      sequelize,
      tableName: 'products_special_price',
      name: {
        singular: 'productSpecialPrice',
        plural: 'productsSpecialPrices'
      }
    });
  }
}