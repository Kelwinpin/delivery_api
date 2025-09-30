module.exports = (sequelize, DataTypes) => {
  const EmailValidation = sequelize.define("emailValidation", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    code: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: 'users',
        key: 'id'
      },
      onDelete: 'CASCADE'
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  }, {
    tableName: "email_validation",
    timestamps: false,
    underscored: true,
  });

  EmailValidation.associate = function (models) {
    EmailValidation.belongsTo(models.users, { foreignKey: "user_id", as: "user" });
  };

  return EmailValidation;
};