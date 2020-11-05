import * as express from "express";
import salesService from "../services/sales.service";

const route = express.Router();

export default (app: express.Router) => {
  app.use("/sales", route);

  route.post("/", save);

  route.get("/byCustomer", salesByCustomer);
};

async function save(req: express.Request, res: express.Response) {
  const sale = await salesService.save(req.body);
  res.send(sale);
}

async function salesByCustomer(req: express.Request, res: express.Response) {
  const sales = await salesService.byCustomer(
    parseInt(req.query.customerId as string)
  );
  return sales;
}
