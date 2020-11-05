import { sequelize } from '../db/db';
import { DataTypes, Model } from "sequelize";

export class Migration extends Model {
  id!: string;

  public static initialize() {
    Migration.init({
      id: {
        type: DataTypes.STRING,
        primaryKey: true
      }
    }, {
      sequelize: sequelize,
      tableName: 'migrations'
    });
  }
}