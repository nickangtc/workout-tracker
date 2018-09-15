'use strict';
module.exports = (sequelize, DataTypes) => {
  const place = sequelize.define('place', {
    name: DataTypes.STRING,
    type: DataTypes.STRING
  }, {
    timestamps: true,
    underscored: true
  });
  place.associate = function(models) {
    place.hasMany(models.workout);
  };
  return place;
};