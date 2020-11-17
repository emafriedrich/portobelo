import models from "../../models";

async function findCustomers(params: { zoneId?: number }) {
  let where: any = params.zoneId ? params : {};
  const customers = await models.Customer.findAll({ where });
  return customers;
}

async function registerPayment(params: { customerId: number; amount: number }) {
  await models.Payment.create(params);
  const customer = await models.Customer.findByPk(params.customerId);
  //@ts-ignore
  customer.balance = customer.balance - params.amount;
  //@ts-ignore
  await customer.save();
  return customer?.balance;
}

export default {
  findCustomers,
  registerPayment,
};
