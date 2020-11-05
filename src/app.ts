import express from "express";

import expressLoader from "./loaders/express";

import { initDatabase } from "./db/db";

initDatabase().then(onDatabaseInit);

const PORT = process.env.APP_PORT || "3000";

async function startServer() {
  const app = express();
  expressLoader({ app });
  app.listen(PORT, () => {
    console.info(`
      ################################################
      🛡️  Server listening on port: ${PORT} 🛡️
      ################################################
    `);
  });
}

async function onDatabaseInit() {
  console.info("Database initalized");
}

startServer();
