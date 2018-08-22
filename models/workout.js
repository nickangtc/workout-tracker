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
    Workout.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    }); // enables Workout.getUser()
  };
  return Workout;
};