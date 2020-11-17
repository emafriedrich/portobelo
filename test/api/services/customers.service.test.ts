import customersService from "../../../src/api/services/customer.service";
import { initDatabase } from "../../../src/db/db";
import models from "../../../src/models/";

describe("customers.service.ts", () => {
  beforeAll(async () => {
    return initDatabase();
  });

  it("Register payment", async () => {
    let customers = await models.Customer.findAll({ limit: 1 });
    let customer = customers[0];
    const oldBalance = customer.balance;
    await customersService.registerPayment({ customerId: customer.id, amount: 1000 });
    //@ts-ignore
    customer = await models.Customer.findByPk(customer?.id);
    expect(oldBalance).toBeGreaterThan(customer.balance);
  });
});
