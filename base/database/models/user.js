module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define("user", {
      id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
      name: DataTypes.STRING,
      cpf: DataTypes.STRING,
      address: DataTypes.STRING,
      image: DataTypes.STRING,
      company_id: DataTypes.INTEGER,
      password: DataTypes.STRING,
    }, {
      tableName: "user",
      timestamps: false,
      underscored: true,
    });
  
    User.associate = function(models) {
      User.belongsTo(models.company, { foreignKey: "company_id", as: "company" });
      User.hasMany(models.order, { foreignKey: "user_id", as: "orders" });
    };
  
    return User;
  };
  