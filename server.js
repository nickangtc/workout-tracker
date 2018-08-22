const express = require('express');
const app = express();
const bodyParser = require('body-parser');

// Configurations
app.set('view engine', 'ejs');

// Routes
app.get('/', function (req, res) {
    console.log('GET / request received');
    res.render('index.ejs');
});

// Run server!
app.listen(process.env.PORT || 3000);