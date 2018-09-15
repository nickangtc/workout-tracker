'use strict';
module.exports = (sequelize, DataTypes) => {
  const exercise = sequelize.define('exercise', {
    name: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true
  });
  exercise.associate = function(models) {
    exercise.belongsTo(models.user, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    exercise.hasMany(models.workout);
  };
  return exercise;
};