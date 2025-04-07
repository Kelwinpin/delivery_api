module.exports = (sequelize, DataTypes) => {
  const Users = sequelize.define("users", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    name: DataTypes.STRING,
    cpf: DataTypes.STRING,
    address: DataTypes.STRING,
    image: DataTypes.STRING,
    companyId: {
      type: DataTypes.INTEGER,
      field: 'company_id',
    },
    password: DataTypes.STRING,
  }, {
    tableName: "users",
    timestamps: false,
    underscored: true,
  });

  Users.associate = function (models) {
    Users.belongsTo(models.companies, { foreignKey: "company_id", as: "company" });
    Users.hasMany(models.orders, { foreignKey: "user_id", as: "orders" });
  };

  return Users;
};
