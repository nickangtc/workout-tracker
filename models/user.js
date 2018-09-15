'use strict';
module.exports = (sequelize, DataTypes) => {
  const user = sequelize.define('user', {
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    pw: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true
  });
  user.associate = function(models) {
    user.hasMany(models.exercise);  // enables user.getExercises()
    user.hasMany(models.workout);  // enables user.getWorkouts()
  };
  return user;
};