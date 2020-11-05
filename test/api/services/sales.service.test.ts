import { sequelize } from "./../../../src/db/db";
import salesService from "../../../src/api/services/sales.service";

import { initDatabase } from "../../../src/db/db";
import models from "../../../src/models";

describe("Sales service", () => {
  beforeAll(async () => {
    await initDatabase();
  });

  it("Save a sale from POST", async () => {
    const customer = await models.Customer.findAll({ limit: 1 });
    const products = await models.Product.findAll({ limit: 10 });
    if (customer) {
      const anySale = await models.Sale.findAll({ limit: 1 });
      const sale = await salesService.save({
        id: anySale[0].id,
        customerId: customer[0].id,
        date: new Date(),
        productsSold: products.map((p) => ({
          quantity: 1,
          unitPrice: p.price,
          productId: p.id,
        })),
      });
      expect(sale.id).toBeTruthy();
      const lengthProductsSold = await models.ProductSold.count({
        where: { saleId: sale.id },
      });
      expect(lengthProductsSold === products.length).toBe(true);
    }
    return;
  });

  it("Should be obtain sales from a customer id", async () => {
    const oneSaleInArray = await models.Sale.findAll({ limit: 1 });
    const sales = await salesService.byCustomer(oneSaleInArray[0].customerId);
    expect(sales.length > 0).toBe(true);
  });

  afterAll(async (done) => {
    await sequelize.close();
    done();
  });
});
