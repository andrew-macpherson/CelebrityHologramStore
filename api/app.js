var express = require("express");
var cors = require('cors');
var bodyParser = require("body-parser");
var hologram = require("./routes/hologram.js");
var user = require("./routes/user.js");
var app = express();

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.get("/", function (req, res) {
	res.status(200).send({ message: 'Welcome to our Celebrity Hologram' });
});

// Hologram Endpoints 
hologram(app);
user(app);

// Admin User End Points

var server = app.listen(3001, function () {
    console.log("app running on port.", server.address().port);
});


module.exports = app;