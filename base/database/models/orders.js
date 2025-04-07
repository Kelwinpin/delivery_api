module.exports = (sequelize, DataTypes) => {
  const Orders = sequelize.define("orders", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    userId: {
      type: DataTypes.INTEGER,
      field: 'user_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: sequelize.fn('now'),
    },
    deliveryAt: {
      type: DataTypes.DATE,
      field: 'delivery_at',
    },
  }, {
    tableName: "orders",
    timestamps: false,
    underscored: true,
  });

  Orders.associate = function (models) {
    Orders.belongsTo(models.users, { foreignKey: "user_id", as: "user" });
    Orders.hasMany(models.orderItens, { foreignKey: "order_id", as: "items" });
  };

  return Orders;
};
