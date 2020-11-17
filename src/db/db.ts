import { Sequelize } from "sequelize";
import env from "../config/env";
import models from "../models";

env.config();

const DATABASE_URL: string = (process.env.ENV === "production"
  ? process.env.DATABASE_URL
  : process.env.DATABASE_URL_DEV) as string;

export let sequelize: Sequelize;

export async function initDatabase() {
  sequelize = new Sequelize(DATABASE_URL, {
    dialect: "postgres",
    logging: false,
  });
  await initTables();
  import("../models/relations");
  await sequelize.sync();
}

function initTables() {
  models.Migration.initialize();
  models.Product.initialize();
  models.Category.initialize();
  models.ProductCategory.initialize();
  models.Customer.initialize();
  models.Sale.initialize();
  models.ProductSold.initialize();
  models.ProductSpecialPrice.initialize();
  models.Zone.initialize();
  models.Payment.initialize();
}
