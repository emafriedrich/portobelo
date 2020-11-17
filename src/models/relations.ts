import models from ".";

models.Product.hasMany(models.ProductSold);
models.Product.belongsToMany(models.Category, {
  through: models.ProductCategory,
  foreignKey: "productId",
});
models.Customer.hasMany(models.Sale);
models.Customer.hasMany(models.ProductSpecialPrice);
models.Customer.belongsTo(models.Zone);
models.Sale.hasMany(models.ProductSold);
models.Sale.belongsTo(models.Customer);
models.Payment.belongsTo(models.Customer);
