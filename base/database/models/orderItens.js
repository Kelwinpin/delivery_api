module.exports = (sequelize, DataTypes) => {
    const OrderItens = sequelize.define("order_itens", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      order_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      observation: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      company_id: DataTypes.INTEGER,
    }, {
      tableName: "order_itens",
      timestamps: false,
      underscored: true,
    });
  
    OrderItens.associate = function(models) {
      OrderItens.belongsTo(models.orders, { foreignKey: "order_id", as: "order" });
      OrderItens.belongsTo(models.products, { foreignKey: "product_id", as: "product" });
      OrderItens.belongsTo(models.companies, { foreignKey: "company_id", as: "company" });
    };
  
    return OrderItens;
  };
  