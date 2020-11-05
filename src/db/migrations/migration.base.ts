import { Transaction } from "sequelize";
import { sequelize } from "../db";
import models from "../../models";

export abstract class Migration {
  transaction!: Transaction;

  async execute() {
    this.transaction = await sequelize.transaction();
    const migrationExists = await models.Migration.findByPk(
      this.migrationKey()
    );
    if (!migrationExists) {
      await this.up();
      await models.Migration.create(
        { id: this.migrationKey() },
        { transaction: this.transaction }
      );
    }
    return this.transaction.commit();
  }

  protected abstract up(): Promise<any>;
  protected abstract migrationKey(): string;
}
