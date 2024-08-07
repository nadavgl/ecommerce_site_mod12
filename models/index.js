// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {foreignKey:'category_id'})
// Categories have many Products
Category.hasMany(Product, {foreignKey:'category_id',
  onDelete: "cascade"

})
// Products belongToMany Tags (through ProductTag)
Product.belongsToMany(Tag, {
  foreignKey:'product_id',
  through: ProductTag,
  onDelete: "cascade"

})
// Tags belongToMany Products (through ProductTag)
Tag.belongsToMany(Product, {
  foreignKey: 'tag_id',
  through: ProductTag,
  onDelete: "cascade"
})


module.exports = {
  Product,
  Category,
  Tag,
  ProductTag,
};
