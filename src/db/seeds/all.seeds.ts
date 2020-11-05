import models from "../../models";
import faker from "faker";
import { initDatabase } from "../db";
import { Zone } from "../../models/zone.model";
import { randomElement } from "../../utils/array";

const zones: Zone[] = [];

initDatabase().then(async () => {
  await seedCategories();
  await seedZones();
  await seedCustomers();
  await seedProducts();
  await seedProductCategory();
  process.exit(0);
});

async function seedCategories() {
  await times(3, async () => {
    await models.Category.create({ name: faker.name.title() });
  });
}

async function seedCustomers() {
  const zoneIds = zones.map((zone) => zone.id);
  await times(30, async () => {
    const zoneId = randomElement(zoneIds);
    await models.Customer.create({
      name: faker.name.firstName(),
      address: faker.address.streetAddress(),
      latitude: faker.address.latitude(),
      longitude: faker.address.longitude(),
      zoneId,
    });
  });
}

async function seedProducts() {
  await times(6, async () => {
    await models.Product.create({
      name: faker.commerce.product(),
      price: Math.round(Number(faker.commerce.price()) * 100),
    });
  });
}

async function seedProductCategory() {
  const products = await models.Product.findAll();
  const categories = await models.Category.findAll();
  for (const product of products) {
    for (const cat of categories) {
      await models.ProductCategory.create({
        productId: product.id,
        categoryId: cat.id,
      });
    }
  }
}

async function seedZones() {
  await times(10, async () => {
    zones.push(await models.Zone.create({ name: faker.address.city() }));
  });
}

async function times(times: number, callback: () => void) {
  for (let i = 0; i < times; i++) {
    await callback();
  }
}
