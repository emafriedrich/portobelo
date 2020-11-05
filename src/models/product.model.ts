import { sequelize } from './../db/db';
import { DataTypes, Model } from 'sequelize';

export class Product extends Model {
  id!: number;
  name!: string;
  price!: number;

  public static initialize() {
    Product.init({
      name: {
        type: DataTypes.STRING,
        allowNull: false
      },
      price: {
        type: DataTypes.INTEGER,
        allowNull: false
      }
    }, {
      sequelize,
      tableName: 'products',
      name: {
        singular: 'product',
        plural: 'products'
      }
    });
  }
}