import { MigrationExecutor } from './migrator-executor';

(async () => {
  const exec = new MigrationExecutor();
  await exec.up();
  process.exit();
})();
