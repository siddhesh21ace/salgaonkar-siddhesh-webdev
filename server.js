var express = require('express');
var app = express();

var bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

var multer = require('multer'); // v1.0.5
var upload = multer(); // for parsing multipart/form-data

// configure a public directory to host static content
app.use(express.static(__dirname + '/public'));

require ("./test/app.js")(app);

var assignment = require("./assignment/app.js");
assignment(app);

var port = process.env.PORT || 3000;

app.listen(port);