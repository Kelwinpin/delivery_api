module.exports = (sequelize, DataTypes) => {
    const OrderItem = sequelize.define("order_item", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      order_id: DataTypes.INTEGER,
      product_id: DataTypes.INTEGER,
      amount: DataTypes.INTEGER,
      observation: DataTypes.STRING,
      price: DataTypes.DOUBLE,
      company_id: DataTypes.INTEGER,
    }, {
      tableName: "order_item",
      timestamps: false,
      underscored: true,
    });
  
    OrderItem.associate = function(models) {
      OrderItem.belongsTo(models.order, { foreignKey: "order_id", as: "order" });
      OrderItem.belongsTo(models.products, { foreignKey: "product_id", as: "product" });
      OrderItem.belongsTo(models.company, { foreignKey: "company_id", as: "company" });
    };
  
    return OrderItem;
  };
  