import { Model, DataTypes } from 'sequelize';

import { sequelize } from './../db/db';

export class ProductCategory extends Model {
  static initialize() {
    ProductCategory.init({
      productId: {
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      categoryId: {
        primaryKey: true,
        type: DataTypes.INTEGER
      }
    }, {
      sequelize,
      tableName: 'products_categories',
      name: {
        singular: 'productCategory',
        plural: 'productsCategories'
      }
    });
  }
}