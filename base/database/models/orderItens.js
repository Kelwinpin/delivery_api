module.exports = (sequelize, DataTypes) => {
  const OrderItens = sequelize.define("orderItens", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    orderId: {
      type: DataTypes.INTEGER,
      field: 'order_id',
    },
    productId: {
      type: DataTypes.INTEGER,
      field: 'product_id',
    },
    amount: DataTypes.INTEGER,
    observation: DataTypes.STRING,
    price: DataTypes.DOUBLE,
    companyId: {
      type: DataTypes.INTEGER,
      field: 'company_id',
    },
  }, {
    tableName: "order_itens",
    timestamps: false,
    underscored: true,
  });

  OrderItens.associate = function (models) {
    OrderItens.belongsTo(models.orders, { foreignKey: "order_id", as: "order" });
    OrderItens.belongsTo(models.products, { foreignKey: "product_id", as: "product" });
    OrderItens.belongsTo(models.companies, { foreignKey: "company_id", as: "company" });
  };

  return OrderItens;
};
