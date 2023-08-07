module.exports = (sequelize, DataTypes) => {
  const Food = sequelize.define(
    "Food",
    {
      Food_ID: {
        // allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Food_Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING,
      },
      Type: {
        type: DataTypes.STRING,
      },
      Images: {
        type: DataTypes.STRING,
      },
      Prepration_time: {
        type: DataTypes.INTEGER,
      },
      State_ID: {
        type: DataTypes.INTEGER,
      },
      Region: {
        type: DataTypes.STRING,
      },
      Course: {
        type: DataTypes.STRING,
      },
      Flavor: {
        type: DataTypes.STRING,
      },
      Ingredients: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "food",
      timestamps: false, // If your table doesn't have created_at and updated_at columns
    }
  );
  Food.associate = (models) => {
    Food.belongsTo(models.State, {
      foreignKey: "State_ID",
      targetKey: "State_ID",
      as: "state",
    });
  };
  return Food;
};
