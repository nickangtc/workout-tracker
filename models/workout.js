'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workout = sequelize.define('Workout', {
    workout_date: DataTypes.DATE,
    reps_count: DataTypes.INTEGER,
    sets_count: DataTypes.INTEGER,
    weight_kg: DataTypes.DECIMAL
  }, {
    timestamps: true,
    underscored: true
  });
  Workout.associate = function(models) {
    // associations can be defined here
  };
  return Workout;
};