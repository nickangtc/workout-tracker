const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configurations
app.set('view engine', 'ejs');
app.use(bodyParser.json());       // to support JSON-encoded bodies
app.use(bodyParser.urlencoded({     // to support URL-encoded bodies
    extended: true
}));

// Routes
app.get('/', function (req, res) {
    console.log('GET / request received');
    res.render('index.ejs');
});

app.post('/exercises', function (req, res) {
    console.log('POST /exercises request received');
    res.json(req.body);
    // res.render('index.ejs');
});

// Run server!
app.listen(process.env.PORT || 3000);