const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const methodOverride = require('method-override');
const ejsLayouts = require('express-ejs-layouts');

const { timezone } = require('./config/global_config');
const workoutRoutes = require('./routes/workout');
const indexRoutes = require('./routes/index');
const apiV1Routes = require('./routes/api_v1');
const { keepHerokuAlive } = require('./util/heroku');

// Server configurations
process.env.TZ = timezone;

// Configurations
if (app.get('env') === 'development') {
    app.use(require('morgan')('dev'));
}
app.set('view engine', 'ejs');
app.use(ejsLayouts);
app.use(express.static(__dirname + '/public'));
app.use(methodOverride('_method'));
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Routes
app.use('/', indexRoutes);
app.use('/workouts', workoutRoutes);

// Routes for API
app.use('/api/v1', apiV1Routes);

// Run server!
// models.sequelize.sync().then(function () {
// });
app.listen(process.env.PORT || 3000, () => {
    console.info('Local dev on http://localhost:3000/');
});

// Keep alive heroku dyno
keepHerokuAlive();