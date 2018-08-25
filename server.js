const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const models = require('./models');

// Configurations
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Routes
app.get('/', function (req, res) {
    models.User.findById(1).then((user) => {
        user.getExercises().then((userExercises) => {
            // console.log(userExercises)
            res.render('index', {userExercises});
        });
    }).catch(error => {
        res.status(500).send({ error });
    });
});

// TODO: Refactor using promise resolve to eliminate nesting
app.post('/exercises', function (req, res) {
    const exercisePromise = models.Exercise.findOrCreate({
        where: {
            user_id: 1,
            name: req.body.exercise_name
        }
    });

    const placePromise = models.Place.findOrCreate({
        where: {
            name: req.body.place_name,
            type: 'hardcoded_type'
        }
    });

    Promise.all([exercisePromise, placePromise])
        .then(([[exercise], [place]]) => {
            return models.Workout.create({
                user_id: 1,
                place_id: place.id,
                exercise_id: exercise.id,
                workout_date: Date.now(),
                reps_count: req.body.reps_count,
                sets_count: req.body.sets_count,
                weight_kg: req.body.weight_kg
            })
        })
        .then((workout) => {
            res.json(workout);
        })
        .catch(err => res.status(500).json(err));
});

// API
app.get('/api/exercises/latest', function (req, res) {
    models.Workout.findAll({
        limit: 3,
        where: {
            user_id: 1,
            exercise_id: req.query.exercise_id
        },
        order: [['created_at', 'DESC']]
    }).then((workouts) => {
        res.json({workouts});
    }).catch((error) => {
        res.status(500).send({ error });
    });
});

// Run server!
// models.sequelize.sync().then(function () {
// });
app.listen(process.env.PORT || 3000);
