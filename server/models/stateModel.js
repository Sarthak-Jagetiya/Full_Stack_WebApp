module.exports = (sequelize, DataTypes) => {
  const State = sequelize.define(
    "State",
    {
      State_ID: {
        type: DataTypes.INTEGER,
        primaryKey: true,
      },
      State_Name: {
        type: DataTypes.STRING,
      },
      State_Capital: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "states",
      timestamps: false,
    }
  );

  return State;
};
