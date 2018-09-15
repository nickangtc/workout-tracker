'use strict';
module.exports = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable('workouts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      user_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'users',
          key: 'id'
        }
      },
      exercise_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'exercises',
          key: 'id'
        }
      },
      place_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: 'places',
          key: 'id'
        }
      },
      workout_date: {
        type: Sequelize.DATE
      },
      workout_date_rounded_down: {
        type: Sequelize.DATE
      },
      reps_count: {
        type: Sequelize.INTEGER
      },
      sets_count: {
        type: Sequelize.INTEGER
      },
      weight_kg: {
        type: Sequelize.DECIMAL
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable('workouts');
  }
};