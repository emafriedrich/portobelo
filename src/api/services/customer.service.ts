import models from "../../models";

async function findCustomers(params: { zoneId?: number }) {
  let where: any = params.zoneId ? params : {};
  const customers = await models.Customer.findAll({ where });
  return customers;
}

export default {
  findCustomers,
};
