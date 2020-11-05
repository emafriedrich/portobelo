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
  await setProductsSold(sale, json, t);
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
  await setProductsSold(sale, json, t);
  await t.commit();
  return sale;
}

type SaleJson = {
  id?: number;
  date: string | Date;
  customerId: number;
  productsSold: ProductSoldJson[];
};

type ProductSoldJson = {
  quantity: number;
  productId: number;
  unitPrice: number;
};

async function setProductsSold(sale: Sale, json: SaleJson, t: Transaction) {
  sale.total = 0;
  await models.ProductSold.destroy({
    where: { saleId: sale.id },
    transaction: t,
  });
  for (const jsonProductSold of json.productsSold) {
    (jsonProductSold as any).saleId = sale.id;
    await models.ProductSold.upsert(jsonProductSold, { transaction: t });
    sale.total += jsonProductSold.quantity * jsonProductSold.unitPrice;
  }
  await sale.save({ transaction: t });
}

export default {
  save,
  byCustomer,
};
