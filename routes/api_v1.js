const express = require('express');
const router = express.Router();
const models = require('../models');

const timezones = require('../util/timezones.json');


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

function getUTCOffset (tzString) {
    return timezones.find(timezone => {
      return timezone.utc.includes(tzString);
    });
}

router.get('/sessions', function (req, res) {
    const { timezoneString, days } = req.query;
    const offset = getUTCOffset(timezoneString);

    // get time now in UTC
    // minus 5 days and minus offset (eg. +8 means minus 8)
    // query by createdAt greater than that value
    const todayUTC = new Date(Date.now()).setHours(0, 0, 0, 0);

    // OR, query greedily for 1 extra day
    // return to front-end and let front-end logic convert and group

    // OR, use some library like moment or something else 
    // to handle complexity
});

module.exports = router;