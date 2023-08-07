module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    name: {
      type: DataTypes.STRING,
      allowNull: false
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false
    },
    email: {
      type: DataTypes.STRING,
      primaryKey: true
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: true
    }
  }, {
    instanceMethods:{
      updatePassword: function(newPass, callback){
        console.log("current pass in update: " + this.password);
        bcrypt.genSalt(10, function(err,salt){
          bcrypt.hash(newPass, salt, function(err, hashed){
            console.log("current pass: " + this.password);
            this.password = hashed;
            return callback();
          });
        });
      },
      comparePassword: function(password, callback){
        bcrypt.compare(password, this.password, function(err, isMatch){
          if(err) {
            throw err;
          }
          callback(isMatch);
        });
      }
    }