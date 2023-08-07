module.exports = (sequelize, DataTypes) => {
  const DanceForm = sequelize.define(
    "DanceForm",
    {
      Dance_ID: {
        // allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Dance_Form: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING,
      },
      Dance_Images: {
        type: DataTypes.STRING,
      },
      State_ID: {
        type: DataTypes.INTEGER,
      },
      Tags: {
        type: DataTypes.STRING,
      },
      Rating: {
        type: DataTypes.INTEGER,
      },
      Instruments: {
        type: DataTypes.STRING,
      },
      Choreographer: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "dance_forms",
      timestamps: false, // If your table doesn't have created_at and updated_at columns
    }
  );
  DanceForm.associate = (models) => {
    DanceForm.belongsTo(models.State, {
      foreignKey: "State_ID",
      targetKey: "State_ID",
      as: "state",
    });
  };
  return DanceForm;
};
