const initCarparkModel = (sequelize, DataTypes) => {
  return sequelize.define(
    "carpark",
    {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      carparkNo: {
        allowNull: false,
        type: DataTypes.TEXT,
      },
      carparkName: {
        type: DataTypes.TEXT,
      },
      lotType: {
        type: DataTypes.TEXT,
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE,
      },
    },
    {
      underscored: true,
    }
  );
};

module.exports = initCarparkModel;
