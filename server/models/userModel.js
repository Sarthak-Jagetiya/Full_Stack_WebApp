module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define(
    "User",
    {
      userId: {
        // allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER,
      },
      userName: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      password: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      email: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: { isEmail: true },
      },
    }
    // {
    //   hooks: {
    //     beforeCreate: async (user) => {
    //       if (user.password) {
    //         const salt = await bcrypt.genSaltSync(10, "a");
    //         user.password = bcrypt.hashSync(user.password.toString(), salt);
    //       }
    //     },
    //     beforeUpdate: async (user) => {
    //       if (user.password) {
    //         const salt = await bcrypt.genSaltSync(10, "a");
    //         user.password = bcrypt.hashSync(user.password.toString(), salt);
    //       }
    //     },
    //   },
    //   instanceMethods: {
    //     validPassword: (password) => {
    //       return bcrypt.compareSync(password, this.password);
    //     },
    //   },
    // }
  );
  // User.prototype.validPassword = async (password, hash) => {
  //   return await bcrypt.compareSync(password, hash);
  // };
  return User;
};
