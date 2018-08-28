'use strict';
module.exports = (sequelize, DataTypes) => {
  const Workout = sequelize.define('Workout', {
    workout_date: DataTypes.DATE,
    workout_date_rounded_down: DataTypes.DATE,
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
    Workout.belongsTo(models.Place, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    Workout.belongsTo(models.Exercise, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return Workout;
};