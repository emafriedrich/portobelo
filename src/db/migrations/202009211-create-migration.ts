import { Migration } from "./migration.base";
import { sequelize } from '../db';

export class CreateMigration extends Migration {

  protected up(): Promise<any> {
    return sequelize.query(`
      CREATE TABLE migrations(
        id varchar(250) NOT NULL PRIMARY KEY
      );
    `, { transaction: this.transaction })
  }
  protected migrationKey(): string {
    return "202009211-create-migration";
  }
}