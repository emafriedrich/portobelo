import { ProductSpecialPrice } from './product-special-price';
import { sequelize } from './../db/db';
import { Model, DataTypes } from 'sequelize';

export class Category extends Model {
  id!: number;
  name!: string;
  productSpecialPrice?: ProductSpecialPrice;

  static initialize() {
    Category.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'categories',
      name: {
        singular: 'category',
        plural: 'categories'
      }
    });
  }
}