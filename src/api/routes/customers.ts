import * as express from "express";
import customerService from "../services/customer.service";

const customerRoutes = express.Router();

export default (app: express.Router) => {
  app.use("/customers", customerRoutes);
  customerRoutes.post("/payments", registerPayment);
  customerRoutes.get("/", findAll);
};

async function registerPayment(req: express.Request, res: express.Response) {
  const newBalance = await customerService.registerPayment({
    customerId: req.body.customerId,
    amount: req.body.amount,
  });
  res.send({ newBalance });
}

async function findAll(req: express.Request, res: express.Response) {
  const customers = await customerService.findCustomers({
    zoneId: parseInt(req.query.zoneId as string),
  });
  res.send(customers);
}
