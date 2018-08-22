const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configurations
app.use(require('morgan')('dev'));
app.set('view engine', 'ejs');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Routes
app.get('/', function (req, res) {
    res.render('index');
});

app.post('/exercises', function (req, res) {
    res.json(req.body);
    // res.render('index.ejs');
});

// Run server!
app.listen(process.env.PORT || 3000);