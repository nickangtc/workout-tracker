const express = require('express');
const router = express.Router();
const models = require('../models');


router.get('/exercises/:id', function (req, res) {
    models.workout.findAll({
        limit: req.query.entries || 3,
        where: {
            user_id: 1,
            exercise_id: req.params.id
        },
        order: [['created_at', 'DESC']],
        include: [
            { model: models.place, attributes: ['id', 'name', 'type'] },
        ]
    }).then((workouts) => {
        res.json({ workouts });
    }).catch((error) => {
        res.status(500).send({ error });
    });
});

module.exports = router;