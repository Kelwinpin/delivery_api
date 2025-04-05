module.exports = (sequelize, DataTypes) => {
    const Company = sequelize.define("company", {
      id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
      },
      name: DataTypes.STRING,
      cnpj: DataTypes.STRING,
      logo: DataTypes.STRING,
      active: DataTypes.BOOLEAN,
      created_at: DataTypes.STRING,
    }, {
      tableName: "company",
      timestamps: false,
      underscored: true,
    });
  
    Company.associate = function(models) {
      Company.hasMany(models.user, { foreignKey: "company_id", as: "users" });
      Company.hasMany(models.products, { foreignKey: "company_id", as: "products" });
      Company.hasMany(models.order_item, { foreignKey: "company_id", as: "order_items" });
    };
  
    return Company;
  };
  