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
    }).then((exercise, created) => {
        res.json(exercise);
    });


    // res.json(req.body);
});

// Run server!
app.listen(process.env.PORT || 3000);