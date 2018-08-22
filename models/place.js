'use strict';
module.exports = (sequelize, DataTypes) => {
  const Place = sequelize.define('Place', {
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true
  });
  Place.associate = function(models) {
    // associations can be defined here
  };
  return Place;
};