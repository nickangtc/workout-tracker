'use strict';
module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    pw: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true
  });
  User.associate = function(models) {
    User.hasMany(models.Exercise);  // enables User.getExercises()
    User.hasMany(models.Workout);  // enables User.getWorkouts()
  };
  return User;
};