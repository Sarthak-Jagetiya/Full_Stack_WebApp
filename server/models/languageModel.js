module.exports = (sequelize, DataTypes) => {
  const Language = sequelize.define(
    "Language",
    {
      Language_ID: {
        // allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Language_Name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING,
      },
      Speakers: {
        type: DataTypes.INTEGER,
      },
      Percentage: {
        type: DataTypes.STRING,
      },
      State_ID: {
        type: DataTypes.INTEGER,
      },
      Type: {
        type: DataTypes.STRING,
      },
      Translation: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "languages",
      timestamps: false, // If your table doesn't have created_at and updated_at columns
    }
  );
  Language.associate = (models) => {
    Language.belongsTo(models.State, {
      foreignKey: "State_ID",
      targetKey: "State_ID",
      as: "state",
    });
  };
  return Language;
};
