'use strict';
module.exports = (sequelize, DataTypes) => {
  const Exercise = sequelize.define('Exercise', {
    name: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true
  });
  Exercise.associate = function(models) {
    // associations can be defined here
  };
  return Exercise;
};