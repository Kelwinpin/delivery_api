module.exports = (sequelize, DataTypes) => {
  const Products = sequelize.define("products", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    amount: DataTypes.INTEGER,
    amountType: {
      type: DataTypes.INTEGER,
      field: 'amount_type',
    },
    price: DataTypes.DOUBLE,
    companyId: {
      type: DataTypes.INTEGER,
      field: 'company_id',
    },
    createdAt: {
      type: DataTypes.DATE,
      field: "created_at",
      defaultValue: sequelize.fn('now'),
    },
    updatedAt: {
      type: DataTypes.DATE,
      field: "updated_at",
      onUpdate: "NOW()",
    },
    deletedAt: {
      type: DataTypes.DATE,
      field: "deleted_at"
    },
    image: {
      type: DataTypes.STRING,
      field: "image",
    }
  }, {
    tableName: "products",
    timestamps: false,
    underscored: true,
  });

  Products.associate = function (models) {
    Products.belongsTo(models.companies, { foreignKey: "company_id", as: "company" });
    Products.hasMany(models.orderItens, { foreignKey: "product_id", as: "orderItems" });
    Products.belongsTo(models.domAmountType, { foreignKey: "amount_type", as: "amountTypeData" });
  };
  
  return Products;
};