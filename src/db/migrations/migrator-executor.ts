import { initDatabase } from '../db';
// This is a generated file. Do not modify

import { CreateMigration } from './202009211-create-migration'
import { Migration } from './migration.base';

export class MigrationExecutor {
  migrations: Migration[] = [
    new CreateMigration()
  ];

  constructor() {}

  async up() {
    await initDatabase();
    console.log('Executing migrations');
    for (const m of this.migrations) {
      try {
        await m.execute();
      } catch (error) {
        if (error.original?.code !== 'ER_DUP_FIELDNAME') {
          console.log(error);
        }
      }
    }
  }
}