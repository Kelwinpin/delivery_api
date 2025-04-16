module.exports = (sequelize, DataTypes) => {
  const Dashboard = sequelize.define(
    'dashboard',
    {
      login: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      companyId: {
        type: DataTypes.INTEGER,
        allowNull: true,
        field: "company_id",
      },
      password: {
        type: DataTypes.STRING,
        allowNull: true,
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
    },
    { tableName: 'dashboard', timeStamps: false, underscored: true},
  );

  Dashboard.associate = function (models) {
    Dashboard.belongsTo(models.companies, {
      foreignKey: 'companyId',
    });
  };

  return Dashboard;
};