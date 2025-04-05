module.exports = (sequelize, DataTypes) => {
    const Products = sequelize.define("products", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      amount: DataTypes.INTEGER,
      price: DataTypes.DOUBLE,
      company_id: DataTypes.INTEGER,
      active: DataTypes.BOOLEAN,
    }, {
      tableName: "products",
      timestamps: false,
      underscored: true,
    });
  
    Products.associate = function(models) {
      Products.belongsTo(models.company, { foreignKey: "company_id", as: "company" });
      Products.hasMany(models.order_item, { foreignKey: "product_id", as: "order_items" });
    };
  
    return Products;
  };
  