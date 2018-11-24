const express = require('express');
const router = express.Router();
const models = require('../models');

const { getTodaysDate } = require('../util/date');


router.get('/:id/edit', (req, res) => {
    models.workout.findOne({
        where: {
            user_id: 1,
            id: req.params.id,
        },
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
            'weight_kg',
        ]
    }).then((workout) => {
        res.render('workout/edit', { workout });
    }).catch((err) => res.status(500).json(err));
});

router.put('/:id', (req, res) => {
    models.workout.update(req.body, {
        where: {
            id: req.params.id,
        }
    }).then((workout) => {
        res.redirect('/');
    }).catch((err) => res.status(500).json(err));
});

router.post('/', (req, res) => {
    const exercisePromise = models.exercise.findOrCreate({
        where: {
            user_id: 1,
            name: req.body.exercise_name
        }
    });

    const placePromise = models.place.findOrCreate({
        where: {
            name: req.body.place_name,
            type: 'gym'
        }
    });

    Promise.all([exercisePromise, placePromise])
        .then(([[exercise], [place]]) => {
            return models.workout.create({
                user_id: 1,
                place_id: place.id,
                exercise_id: exercise.id,
                workout_date: Date.now(),
                workout_date_rounded_down: getTodaysDate(),
                reps_count: req.body.reps_count,
                sets_count: req.body.sets_count,
                weight_kg: req.body.weight_kg
            })
        })
        .then((workout) => {
            res.redirect('/');
        })
        .catch(err => res.status(500).json(err));
});

module.exports = router;