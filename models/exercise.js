'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    name: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true
  });
  Exercise.associate = function(models) {
    Exercise.belongsTo(models.User, {
      onDelete: "CASCADE",
      foreignKey: {
        allowNull: false
      }
    });
    Exercise.hasMany(models.Workout);
  };
  return Exercise;
};