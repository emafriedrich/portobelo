import { Model } from "sequelize";

export abstract class BaseModel extends Model {
  id!: number;

  static initialize(): void {
    throw new Error("Must be override");
  }
}
