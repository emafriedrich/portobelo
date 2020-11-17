import { Transaction } from "sequelize";
import { sequelize } from "../../db/db";
import models from "../../models";
import { Sale } from "../../models/sale.model";

async function byCustomer(customerId: number) {
  const sales = await models.Sale.findAll({
    where: {
      customerId,
    },
    include: [models.ProductSold],
  });
  return sales;
}

async function save(json: SaleJson): Promise<Sale> {
  if (json.id) {
    return update(json);
  } else {
    return create(json);
  }
}

async function create(json: SaleJson): Promise<Sale> {
  console.log(json);
  const t = await sequelize.transaction();
  const sale = await models.Sale.create(
    {
      date: json.date,
      customerId: json.customerId,
      id: json.id,
    },
    {
      transaction: t,
    }
  );
  await saveProductsSoldAndPayments(sale, json, t);
  await t.commit();
  return sale;
}

async function update(json: SaleJson) {
  const t = await sequelize.transaction();
  await models.Sale.update(
    {
      date: json.date,
      customerId: json.customerId,
    },
    {
      where: {
        id: json.id,
      },
      transaction: t,
    }
  );
  const sale = (await models.Sale.findByPk(json.id)) as Sale;
  await saveProductsSoldAndPayments(sale, json, t);
  await t.commit();
  return sale;
}

async function saveProductsSoldAndPayments(sale: Sale, json: SaleJson, t: Transaction) {
  sale.total = await setProductsSold(sale, json, t);
  await savePayment(sale, json, t);
  return await sale.save({ transaction: t });
}

type SaleJson = {
  id?: number;
  date: string | Date;
  customerId: number;
  productsSold: ProductSoldJson[];
  sold: boolean;
};

type ProductSoldJson = {
  quantity: number;
  productId: number;
  unitPrice: number;
};

async function savePayment(sale: Sale, json: SaleJson, t: Transaction) {
  if (json.sold) {
    await models.Payment.create({ amount: sale.total, customerId: json.customerId }, { transaction: t });
  }
}

async function setProductsSold(sale: Sale, json: SaleJson, t: Transaction): Promise<number> {
  let total = 0;
  await models.ProductSold.destroy({
    where: { saleId: sale.id },
    transaction: t,
  });
  for (const jsonProductSold of json.productsSold) {
    (jsonProductSold as any).saleId = sale.id;
    await models.ProductSold.upsert(jsonProductSold, { transaction: t });
    total += jsonProductSold.quantity * jsonProductSold.unitPrice;
  }
  return total;
}

export default {
  save,
  byCustomer,
};
