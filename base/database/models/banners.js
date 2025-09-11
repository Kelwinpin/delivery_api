module.exports = (sequelize, DataTypes) => {
  const Banners = sequelize.define("banners", {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    companyId: {
        type: DataTypes.INTEGER,
        field: "company_id",
    },
    href: DataTypes.STRING,
    type: DataTypes.STRING,
    image: DataTypes.STRING,
    createdAt: {
      type: DataTypes.DATE,
      field: 'created_at',
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
    tableName: "banners",
    timestamps: false,
    underscored: true,
  });

  Banners.associate = function (models) {
    Banners.hasMany(models.companies, { foreignKey: "company_id", as: "companies" });
  };

  return Banners;
};
