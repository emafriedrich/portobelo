import * as express from "express";
import models from "../../models";

const route = express.Router();

export default (app: express.Router) => {
  app.use("/categories", route);

  route.get("/", findAll);
};

async function findAll(req: express.Request, res: express.Response) {
  const categories = await models.Category.findAll();
  res.send(categories);
}
