"use strict";

module.exports = function(sequelize, DataTypes) {
  var User = sequelize.define('User', {
    username: {
      type: DataTypes.STRING,
      allowNull: false,            // won't allow null
      unique: true              // will allow only unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,            // won't allow null
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,            // won't allow null
    }
  }, {
    classMethods: {
      // associate: function(models) {
      //   User.hasMany(models.Task)
      // }
    }
  });

  return User;
};
