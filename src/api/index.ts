import * as express from "express";
import categories from "./routes/categories";
import customers from "./routes/customers";
import products from "./routes/products";
import zones from "./routes/zones";
import sales from "./routes/sales";

export default () => {
  const router = express.Router();
  customers(router);
  categories(router);
  products(router);
  zones(router);
  sales(router);
  return router;
};
