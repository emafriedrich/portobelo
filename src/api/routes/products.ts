import * as express from "express";
import models from "../../models";

const route = express.Router();

export default (app: express.Router) => {
  app.use("/products", route);

  route.get("/", findAll);
};

async function findAll(req: express.Request, res: express.Response) {
  const where: any = {};
  if (req.query.categoryId) {
    where.categories = {
      id: req.query.categoryId,
    };
  }
  const products = await models.Product.findAll({
    where,
    include: [
      {
        model: models.Category,
        as: "categories",
        where,
      },
    ],
  });
  res.send(products);
}
