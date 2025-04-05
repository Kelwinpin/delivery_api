module.exports = (sequelize, DataTypes) => {
    const Order = sequelize.define("order", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: DataTypes.INTEGER,
      created_at: DataTypes.DATE,
      delivery_at: DataTypes.DATE,
    }, {
      tableName: "order",
      timestamps: false,
      underscored: true,
    });
  
    Order.associate = function(models) {
      Order.belongsTo(models.user, { foreignKey: "user_id", as: "user" });
      Order.hasMany(models.order_item, { foreignKey: "order_id", as: "items" });
    };
  
    return Order;
  };
  