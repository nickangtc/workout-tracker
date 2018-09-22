const express = require('express');
const router = express.Router();
const models = require('../models');
const momentjs = require('moment');


router.get('/', (req, res) => {
    const workoutsPromise = models.workout.findAll({
        where: {
            user_id: 1,
        },
        limit: 30,
        order: [['workout_date_rounded_down', 'DESC']],
        include: [
            { model: models.place, attributes: ['id', 'name'] },
            { model: models.exercise, attributes: ['id', 'name'] }
        ],
        attributes: [
            'id',
            'workout_date',
            'workout_date_rounded_down',
            'reps_count',
            'sets_count',
            'weight_kg'
        ]
    }).then((results) => {
        const grouped = {};
        for (let i = 0; i < results.length; i++) {
            const workout = results[i];
            const date = workout.workout_date_rounded_down;

            if (Object.prototype.hasOwnProperty.call(grouped, date)) {
                grouped[date] = [...grouped[date], workout];
            } else {
                grouped[date] = [workout];
            }
        }
        return grouped;
    });

    // models.exercise.findById(1)
    //     .then(exercise => exercise.getWorkouts())
    //     .then(results => console.log(results))

    const userExercisesPromise = models.user.findById(1)
        .then(user => user.getExercises())
        .then(exercises => {
            // TODO
            // get workouts count for each exercise!
            return exercises;
        })

    Promise.all([workoutsPromise, userExercisesPromise])
        .then(([workouts, userExercises]) => {
            // res.json({ workouts, userExercises });
            res.render('index', {
                momentjs,
                workouts,
                userExercises,
            });
        })
        .catch(error => {
            res.status(500).send({ error });
        });
});

module.exports = router;