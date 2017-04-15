var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

var multer = require('multer'); // v1.0.5

/* Passport JS*/
var passport = require('passport');
var cookieParser = require('cookie-parser');
var session = require('express-session');

app.use(session({
    secret: process.env.WEBDEV_PROJECT_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(cookieParser());
app.use(passport.initialize());
app.use(passport.session());


// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require("./test/app.js")(app);

var assignment = require("./assignment/app.js");
assignment(app);

var port = process.env.PORT || 3000;

app.listen(port);