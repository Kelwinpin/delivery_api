module.exports = (sequelize, DataTypes) => {
  const DomAmountType = sequelize.define("domAmountType", {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    description: DataTypes.STRING,
  }, {
    tableName: "dom_amount_type",
    timestamps: false,
    underscored: true,
  });

  return DomAmountType;
};
