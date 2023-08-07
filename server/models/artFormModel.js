module.exports = (sequelize, DataTypes) => {
  const ArtForm = sequelize.define(
    "ArtForm",
    {
      Art_Form_ID: {
        // allowNull: false,
        // autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Art_Form: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Description: {
        type: DataTypes.STRING,
      },
      Art_Form_Images: {
        type: DataTypes.STRING,
      },
      State_ID: {
        type: DataTypes.INTEGER,
      },
      Rating: {
        type: DataTypes.INTEGER,
      },
      Tags: {
        type: DataTypes.STRING,
      },
      Year_Created: {
        type: DataTypes.STRING,
      },
    },
    {
      tableName: "art_forms",
      timestamps: false, // If your table doesn't have created_at and updated_at columns
    }
  );
  ArtForm.associate = (models) => {
    ArtForm.belongsTo(models.State, {
      foreignKey: "State_ID",
      targetKey: "State_ID",
      as: "state",
    });
  };
  return ArtForm;
};
