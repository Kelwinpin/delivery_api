module.exports = (sequelize, DataTypes) => {
  const Companies = sequelize.define("companies", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    name: DataTypes.STRING,
    cnpj: DataTypes.STRING,
    logo: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
      defaultValue: sequelize.fn('now'),
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
    }
  }, {
    tableName: "companies",
    timestamps: false,
    underscored: true,
  });

  Companies.associate = function (models) {
    Companies.hasMany(models.users, { foreignKey: "company_id", as: "users" });
    Companies.hasMany(models.products, { foreignKey: "company_id", as: "products" });
    Companies.hasMany(models.orderItens, { foreignKey: "company_id", as: "order_items" });
  };

  return Companies;
};
