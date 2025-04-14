module.exports = (sequelize, DataTypes) => {
  const Dashboard = sequelize.define(
    'dashboard',
    {
      login: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      company_id: {
        type: DataTypes.INTEGER,
        allowNull: true,
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
  return Dashboard;
};