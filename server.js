const http = require('http');
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const models = require('./models');
const sequelize = require('sequelize');
const momentjs = require('moment');
const methodOverride = require('method-override');

// Configurations
if (app.get('env') === 'development') {
    app.use(require('morgan')('dev'));
}
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// TODO: Move these helpers into separate file
const getTodaysDate = function () {
    const now = Date.now();
    let date = new Date(now);
    date.setHours(0);
    date.setMinutes(0);
    date.setSeconds(0);
    date.setMilliseconds(0);
    return date;
}

// Routes
app.get('/', function (req, res) {
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

app.get('/workouts/:id/edit', function (req, res) {
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

app.put('/workouts/:id', function (req, res) {
    models.workout.update(req.body, {
        where: {
            id: req.params.id,
        }
    }).then((workout) => {
        res.redirect('/');
    }).catch((err) => res.status(500).json(err));
});

app.post('/workouts', function (req, res) {
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

// API
app.get('/api/exercises/:id', function (req, res) {
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
        res.json({workouts});
    }).catch((error) => {
        res.status(500).send({ error });
    });
});

// Keep alive heroku dyno
function startKeepAlive() {
    setInterval(() => {
        const options = {
            host: 'limitless-oasis-97054.herokuapp.com',
            port: 80,
            path: '/'
        }
        http
            .get(options, (res) => {
                res.on('data', (chunk) => {
                    try {
                        console.log('heroku response: ' + chunk);
                    } catch (err) {
                        console.log(err.message);
                    }
                })
            })
            .on('error', (err) => {
                console.log('Error: ' + err.message);
            });
    }, 20* 60 * 1000);
}
startKeepAlive();

// Run server!
// models.sequelize.sync().then(function () {
// });
app.listen(process.env.PORT || 3000, () => {
    console.info('Local dev on http://localhost:3000/');
});
