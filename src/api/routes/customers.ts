import * as express from "express";
import customerService from "../services/customer.service";

const route = express.Router();

export default (app: express.Router) => {
  app.use("/customers", route);

  route.get("/", findAll);
};

async function findAll(req: express.Request, res: express.Response) {
  const customers = await customerService.findCustomers({
    zoneId: parseInt(req.query.zoneId as string),
  });
  res.send(customers);
}
