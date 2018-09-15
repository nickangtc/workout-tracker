'use strict';
module.exports = (sequelize, DataTypes) => {
  const workout = sequelize.define('workout', {
    workout_date: DataTypes.DATE,
    workout_date_rounded_down: DataTypes.DATE,
    reps_count: DataTypes.INTEGER,
    sets_count: DataTypes.INTEGER,
    weight_kg: DataTypes.DECIMAL
  }, {
    timestamps: true,
    underscored: true
  });
  workout.associate = function(models) {
    workout.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    }); // enables workout.getUser()
    workout.belongsTo(models.place, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    workout.belongsTo(models.exercise, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
  };
  return workout;
};