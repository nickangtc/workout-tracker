const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const models = require('./models');

// Configurations
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Routes
app.get('/', function (req, res) {
    models.User.findById(1).then((user) => {
        user.getExercises().then((userExercises) => {
            console.log(userExercises)
            res.render('index', {userExercises});
        });
    });
});

app.post('/exercises', function (req, res) {
    models.Exercise.findOrCreate({
        where: {
            user_id: 1,
            name: req.body.exercise_name
        },
        defaults: {
            user_id: 1,
            name: req.body.exercise_name
        }
    }).spread((exercise) => {
        models.Place.findOrCreate({
            where: {
                name: req.body.place_name,
                type: 'hardcoded_type'
            },
            defaults: {
                name: req.body.place_name,
                type: 'hardcoded_type'
            }
        }).spread((place) => {
            console.log('exercise:', exercise.id)
            console.log('place:', place.id)
            models.Workout.create({
                user_id: 1,
                place_id: place.id,
                exercise_id: exercise.id,
                workout_date: Date.now(),
                reps_count: req.body.reps_count,
                sets_count: req.body.sets_count,
                weight_kg: req.body.weight_kg
            }).then((workout) => {
                res.json(workout);
            })
        })
    });


    // res.json(req.body);
});

// Run server!
// models.sequelize.sync().then(function () {
// });
app.listen(process.env.PORT || 3000);
