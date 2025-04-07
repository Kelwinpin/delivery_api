module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("products", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    price: DataTypes.DOUBLE,
    companyId: {
      type: DataTypes.INTEGER,
      field: 'company_id',
    },
    active: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
  }, {
    tableName: "products",
    timestamps: false,
    underscored: true,
  });

  Products.associate = function (models) {
    Products.belongsTo(models.companies, { foreignKey: "company_id", as: "company" });
    Products.hasMany(models.orderItens, { foreignKey: "product_id", as: "order_items" });
  };

  return Products;
};
