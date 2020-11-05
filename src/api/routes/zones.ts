import * as express from "express";
import models from "../../models";

const route = express.Router();

export default (app: express.Router) => {
  app.use("/zones", route);

  route.get("/", all);
};

export async function all(req: express.Request, res: express.Response) {
  res.send(await models.Zone.findAll());
}
