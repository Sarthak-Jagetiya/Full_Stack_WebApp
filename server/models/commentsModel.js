module.exports = (sequelize, DataTypes) => {
  const Comments = sequelize.define(
    "Comments",
    {
      Comment_ID: {
        // allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      Page: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Page_ID: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      Comment: {
        type: DataTypes.STRING,
        allowNull: false,
      },
    },
    {
      tableName: "comments",
      timestamps: false, // If your table doesn't have created_at and updated_at columns
    }
  );
  // Comments.associate = (models) => {
  //   Comments.belongsTo(models.Comments, {
  //     foreignKey: "Art_ID",
  //     targetKey: "Page_ID",
  //     as: "comment",
  //   });
  // };
  return Comments;
};
