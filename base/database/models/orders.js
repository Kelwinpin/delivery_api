module.exports = (sequelize, DataTypes) => {
    const Orders = sequelize.define("orders", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      user_id: DataTypes.INTEGER,
      created_at: {
        type: DataTypes.DATE,
        defaultValue: sequelize.fn('now'),
      },
      delivery_at: DataTypes.DATE,
    }, {
      tableName: "orders",
      timestamps: false,
      underscored: true,
    });
  
    Orders.associate = function(models) {
      Orders.belongsTo(models.users, { foreignKey: "user_id", as: "user" });
      Orders.hasMany(models.order_itens, { foreignKey: "order_id", as: "items" });
    };
  
    return Orders;
  };
  