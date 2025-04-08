module.exports = (sequelize, DataTypes) => {
    const Deliveryman = sequelize.define("deliverymans", {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        name: DataTypes.STRING,
        cpf: {
            type: DataTypes.STRING,
            unique: true,
        },
        image: DataTypes.TEXT,
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
        }
    }, {
        tableName: "deliverymans",
        timestamps: false,
        underscored: true,
    });

    Deliveryman.associate = function (models) {
        Deliveryman.belongsTo(models.companies, {
            foreignKey: "company_id",
            as: "company",
        });

        // Se quiser associar com orders também:
        Deliveryman.hasMany(models.orders, {
            foreignKey: "deliveryman_id",
            as: "orders",
        });
    };

    return Deliveryman;
};
